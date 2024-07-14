import sqlite3
from flask import Flask, jsonify, request, abort
from argparse import ArgumentParser


DB = 'db.sqlite'

def users_get_rows_as_dict(row):
    row_dict = {
        'users_id': row[0],
        'name': row[1],
        'username': row[2],
        'password': row[3],
    }
    return row_dict

def feedbacks_get_rows_as_dict(row):
    row_dict = {
        'feedbacks_id': row[0],
        'feedback': row[1],
    }

    return row_dict


def orders_get_rows_as_dict(row):
    row_dict = {
        'order_id': row[0],
        'item_id': row[1],
        'username':row[2],
    }
    return row_dict

def items_get_rows_as_dict(row):
    row_dict = {
        'item_id': row[0],
        'item_name': row[1],
        'item_desc': row[2],
        'item_price': row[3],
        'item_photo': row[4],
    }
    return row_dict

def bookings_get_rows_as_dict(row):
    row_dict = {
        'booking_id':row[0],
        'username': row[1],
        'order_id': row[2],
        'booking_date': row[3],
    }
    return row_dict

app = Flask(__name__)

@app.route('/api/users/<username>', methods=['GET'])

def get_user(username):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM users WHERE username=?', (username,))
    row = cursor.fetchone()
    db.close()

    if row:
        row_as_dict = users_get_rows_as_dict(row)
        return jsonify(row_as_dict), 200
    else:
        return jsonify(None), 200

@app.route('/api/users', methods=['POST'])
def store_user():
    if not request.json:
        abort(404)

    new_user = (
        request.json['name'],
        request.json['username'],
        request.json['password'],       
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('''
        INSERT INTO users(name,username,password)
        VALUES(?,?,?)
    ''', new_user)

    user_id = cursor.lastrowid

    db.commit()

    response = {
        'user_id': user_id,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201

@app.route('/api/users/<username>', methods=['PUT'])
def update_user(username):
    if not request.json:
        abort(400)

    if 'username' not in request.json:
        abort(400)

    if request.json['username'] != username:
        abort(400)

    update_user = (
        request.json['name'],
        request.json['password'],
        username,
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('''
        UPDATE users SET name=?, password=? WHERE username=?
    ''', update_user)

    db.commit()

    response = {
        'username': username,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201

@app.route('/api/users/<username>', methods=['DELETE'])
def delete(username):
    if not request.json:
        abort(400)

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('DELETE FROM users WHERE username=?', (username,))

    db.commit()

    response = {
        'username': username,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201
    
@app.route('/api/feedbacks', methods=['POST'])
def store_feedback():
    if not request.json:
        abort(404)

    new_feedback = (
        request.json['feedback'],     
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('''
        INSERT INTO feedbacks(feedback)
        VALUES(?)
    ''', new_feedback)

    feedback_id = cursor.lastrowid

    db.commit()

    response = {
        'feedback_id': feedback_id,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201

@app.route('/api/feedbacks', methods=['GET'])
def index():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM feedbacks ORDER BY feedback_id')
    rows = cursor.fetchall()

    print(rows)

    db.close()

    rows_as_dict = []
    for row in rows:
        row_as_dict = feedbacks_get_rows_as_dict(row)
        rows_as_dict.append(row_as_dict)

    return jsonify(rows_as_dict), 200

@app.route('/api/items', methods=['GET'])
def get_items():
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM items ORDER BY item_id')
    rows = cursor.fetchall()

    rows_as_dict = []
    for row in rows:
        rows_as_dict.append(items_get_rows_as_dict(row))

    db.close()

    return jsonify(rows_as_dict), 200

@app.route('/api/items/<item>', methods=['GET'])
def show_item(item):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM items WHERE item_id=?', (str(item),))
    row = cursor.fetchone()
    db.close()

    if row:
        row_as_dict = items_get_rows_as_dict(row)
        return jsonify(row_as_dict), 200
    else:
        abort(404)

@app.route('/api/orders/<username>', methods=['GET'])
def get_orders(username):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM orders WHERE username=? ORDER BY order_id DESC', (username,))
    row = cursor.fetchone()
    db.close()
    
    if row:
        row_as_dict = orders_get_rows_as_dict(row)
        return jsonify(row_as_dict),200
    else:
        abort(404)

@app.route('/api/orders', methods=['POST'])
def store_order():
    if not request.json:
        abort(400)

    new_order = (
        request.json['item_id'],
        request.json['username'],
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('''
        INSERT INTO orders(item_id,username) VALUES(?,?)
    ''', new_order)

    order_id = cursor.lastrowid

    db.commit()

    response = {
        'order_id': order_id,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201

@app.route('/api/bookings', methods=['POST'])
def store_booking():
    if not request.json:
        abort(400)

    new_booking = (
        request.json['username'],
        request.json['order_id'],
        request.json['booking_date'],
    )

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    cursor.execute('''INSERT INTO bookings(username, order_id, booking_date) VALUES(?,?,?)''', new_booking)

    booking_id = cursor.lastrowid

    db.commit()

    response = {
        'booking_id': booking_id,
        'affected': db.total_changes,
    }

    db.close()

    return jsonify(response), 201

@app.route('/api/bookings/<username>', methods=['GET'])
def get_booking(username):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute('SELECT * FROM bookings WHERE username=? ORDER BY booking_id DESC', (username,))
    row = cursor.fetchone()
    db.close()
    
    if row:
        row_as_dict = bookings_get_rows_as_dict(row)
        return jsonify(row_as_dict),200
    else:
        abort(404)
        
if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=5000, type=int, help='port to listen on')
    args = parser.parse_args()
    port = args.port

    app.run(host='0.0.0.0', port=port,debug=True)
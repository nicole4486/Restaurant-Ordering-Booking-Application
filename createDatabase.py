import sqlite3

db = sqlite3.connect('db.sqlite')


# Create tables
db.execute('''CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    username TEXT NOT NULL,
    password TEXT NOT NULL
)''')

db.execute('''CREATE TABLE IF NOT EXISTS items (
    item_id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_name TEXT NOT NULL,
    item_desc TEXT NOT NULL,
    item_price REAL NOT NULL,
    item_photo TEXT NOT NULL
)''')

db.execute('''CREATE TABLE IF NOT EXISTS orders (
    order_id INTEGER PRIMARY KEY AUTOINCREMENT,
    item_id INTEGER NOT NULL,
    username TEXT NOT NULL,
    FOREIGN KEY(item_id) REFERENCES items(item_id),
    FOREIGN KEY(username) REFERENCES users(username)
)''')

db.execute('''CREATE TABLE IF NOT EXISTS bookings (
    booking_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    order_id INTEGER NOT NULL,
    booking_date INTEGER NOT NULL,
    FOREIGN KEY(username) REFERENCES users(username),
    FOREIGN KEY(order_id) REFERENCES orders(order_id)
)''')

db.execute('''CREATE TABLE IF NOT EXISTS feedbacks (
    feedback_id INTEGER PRIMARY KEY AUTOINCREMENT,
    feedback TEXT NOT NULL
)''')


# Insert sample data
cursor = db.cursor()

cursor.execute('''INSERT INTO users(name, username, password)
                  VALUES('Kahing', 'kahing123', 'kahing123')''')

cursor.execute('''INSERT INTO users(name, username, password)
                  VALUES('Hito', 'Hito123', 'Hito123')''')

cursor.execute('''INSERT INTO users(name, username, password)
                  VALUES('Siaoqian', 'Siaoqian123', 'Siaoqian123')''')



cursor.execute('''INSERT INTO items(item_name, item_desc, item_price, item_photo)
                  VALUES ('Velvet Bliss Ribeye', 'A succulent, marbled masterpiece',30.90,'https://www.shutterstock.com/image-photo/beef-rump-steak-on-black-600nw-268784573.jpg ')''')

cursor.execute('''INSERT INTO items(item_name,item_desc, item_price, item_photo)
                  VALUES ('Grande Bistecca Lasagna','Layers of hearty beef bolognese',25.90,'https://assets-jpcust.jwpsrv.com/thumbnails/fnzzt541-720.jpg')''')

cursor.execute('''INSERT INTO items(item_name,item_desc, item_price, item_photo)
                  VALUES ('Harmony Chicken Chop','Crispy,juicy chicken with aromatic spices, served with flavorful rice and gravy.',25.90,'https://nandos.com.my/wp-content/uploads/2021/08/Chicken-Chop-with-2-Sides-drink-500x500-1.jpeg ')''')

cursor.execute('''INSERT INTO items(item_name,item_desc, item_price, item_photo)
                  VALUES ('Creamy Chicken Pasta Delight','Tender chicken and pasta enveloped in a rich, velvety cream sauce for ultimate comfort.',29.90,'https://hips.hearstapps.com/womansday/assets/cm/15/09/54ef83b906f63_-_shrimp-linguine-alfredo-lg.jpg ')''')

cursor.execute('''INSERT INTO items(item_name,item_desc, item_price, item_photo)
                  VALUES ('Herb-Grilled Lamb Steak','Juicy and flavorful, paired with roasted vegetables.',27.90,'https://www.americanwestbeef.com/cdn/shop/products/shutterstock_483904708_1024x1024.png?v=1581103089')''')


cursor.execute('''INSERT INTO items(item_name,item_desc, item_price, item_photo)
                  VALUES ('Epicurean Shepherds Bounty Pie','Tender lamb stewed with aromatic herbs and vegetables, encased in buttery.',22.90,'https://img.delicious.com.au/Y1SJdptN/w1200/del/2020/11/lamb-and-harissa-pie-141851-3.jpg')''')

cursor.execute('''INSERT INTO items(item_name,item_desc, item_price, item_photo)
                  VALUES ('Classic Fish and Chips','Crispy golden fish fillets served with perfectly seasoned fries, a timeless duo of crunchy satisfaction.',19.90,'https://i.pinimg.com/736x/d0/99/28/d09928c6c0cd9ed28259a47add845f0a.jpg')''')


cursor.execute('''INSERT INTO feedbacks(feedback)
                  VALUES('Good')''')



# Commit changes and close connection
db.commit()
db.close()


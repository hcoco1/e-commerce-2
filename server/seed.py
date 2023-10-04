from config import db, app
from models import User, Product, Order, order_products_association
from faker import Faker
import random

fake = Faker()

def seed_users():
    for _ in range(10):  # creates 10 users
        username = fake.user_name()
        email = fake.email()
        password = fake.password(length=10, special_chars=True, digits=True, upper_case=True, lower_case=True)
        
        user = User(
            username=username,
            email=email
        )
        user.set_password(password)
        db.session.add(user)
    db.session.commit()

def generate_product_name():
    materials = ['Steel', 'Wooden', 'Plastic', 'Ceramic', 'Leather', 'Glass', 'Silk', 'Rubber', 'Metal', 'Cotton']
    types = ['Chair', 'Table', 'Spoon', 'Cup', 'Shoe', 'Watch', 'Shirt', 'Glove', 'Knife', 'Bowl']

    return f"{random.choice(materials)} {random.choice(types)}"

def seed_products():
    for _ in range(50):  # creates 50 products
        name = generate_product_name()
        
        price = round(random.uniform(10, 500), 2)
        stock = random.randint(10, 200)
        
        product = Product(
            name=name,
            price=price,
            stock=stock
        )
        db.session.add(product)
    db.session.commit()




def seed_orders():
    users = User.query.all()
    products = Product.query.all()

    for _ in range(20):  # creates 20 orders
        user = random.choice(users)
        
        order = Order(
            user_id=user.id,
            total_price=0,  # will be updated after products are associated
            status=random.choice(['Pending', 'Completed', 'Shipped', 'Canceled'])
        )
        db.session.add(order)
        db.session.flush()  # Flush the session to get an id for the order
        
        order_products = random.sample(products, random.randint(1, 5))
        total_price = 0
        
        for product in order_products:
            quantity = random.randint(1, 5)
            total_price += product.price * quantity
            
            # Since the order now has an id, this should work
            db.session.execute(order_products_association.insert().values(order_id=order.id, product_id=product.id, quantity=quantity))
        
        order.total_price = total_price

    db.session.commit()


def reset_database():
    db.drop_all()
    db.create_all()

if __name__ == "__main__":
    with app.app_context():
        print("Deleting database...")
        reset_database()

        print("Starting seed...")
        seed_users()
        seed_products()
        seed_orders()
        print("Seeding completed!")


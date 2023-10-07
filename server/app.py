#!/usr/bin/env python3
from flask import render_template, request, jsonify, session, Flask
from flask_cors import cross_origin
import os

from dotenv import load_dotenv
from datetime import timedelta
from config import app, db
from models import User, Product, Order, order_products_association




app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI') 
load_dotenv()
app.secret_key = os.getenv("SECRET_KEY")
app.permanent_session_lifetime = timedelta(days=7)





app = Flask(
    __name__,
    static_url_path='',
    static_folder='../client/build',
    template_folder='../client/build'
)
@app.route('/')
@app.route('/productions/<int:id>')
@app.route('/productions/<int:id>/edit')
@app.route('/productions/new')
def index(id=0):
    return render_template("index.html")


# INDEX ROUTE

# SIGNUP ROUTE

@app.route('/register', methods=['POST'])
@cross_origin()
def register_user():
    user_details = request.json
    print(user_details)

    user = User.query.filter_by(email=user_details['email']).first()

    if user:
        return jsonify({"message": "User already exists!"}), 400

    new_user = User(username=user_details['username'], email=user_details['email'])

    # Here, use 'password' from user_details to hash and set
    new_user.set_password(user_details['password'])  

    db.session.add(new_user)
    db.session.commit()

    user_dict = new_user.to_dict()

    return jsonify(user_dict), 201



# LOGIN ROUTE

@app.route('/login', methods=['POST'])
@cross_origin()
def login_user():
    # Get the user details from the request
    user_details = request.json

    # Check if the user already exists
    user = User.query.filter_by(email=user_details['email']).first()

    # If the user does not exist, return an error message
    if not user:
        return jsonify({"message": "User does not exist!"}), 400

    # If the user exists, check if the password is correct using the check_password method
    if not user.check_password(user_details['password']):  # Note: We're using 'password' here, not 'password_hash'
        return jsonify({"message": "Incorrect password!"}), 400

    # Set the user_id in the session
    session['user_id'] = user.id

    # Return a success message
    return jsonify(user.to_dict()), 200


# LOGOUT ROUTE

@app.route('/logout', methods=['GET'])
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Logged out successfully'}), 200

# CHECK SESSION ROUTE

@app.route('/check_session', methods=['GET'])
def check_session():
    user_id = session.get('user_id')
    if user_id:
        user = User.query.filter_by(id=user_id).first()
        if user:
            return jsonify(user.to_dict())
    
    return jsonify({'message': '401: Not Authorized'}), 401


# UPDATE AND DELETE USER PROFILE ROUTE

@app.route('/user/<int:user_id>', methods=['PATCH', 'DELETE'])
@cross_origin()
def modify_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"message": "User does not exist!"}), 404

    # Handle PATCH request
    if request.method == 'PATCH':
        data = request.json
        for attr in data:
            # Optional: Add a check to ensure only certain attributes can be modified
            if hasattr(user, attr):
                setattr(user, attr, data.get(attr))
        db.session.commit()
        return jsonify(user.to_dict()), 200

    # Handle DELETE request
    elif request.method == 'DELETE':
        db.session.delete(user)
        db.session.commit()
        session.clear()
        return jsonify({"message": "User deleted successfully!"}), 200






# USER PROFILE ROUTE

@app.route('/user', methods=['GET'])
@cross_origin()
def get_user_by_ID():
    # Check if the user is logged in (user_id is in the session)
    if 'user_id' not in session:
        return jsonify({"message": "User is not logged in!"}), 401

    # Get the user details from the request
    user = User.query.get(session['user_id'])
    
    # If the user does not exist, return an error message
    if not user:
        return jsonify({"message": "User does not exist!"}), 400
    
    # If user is found, return the user's details with a 200 OK status
    return jsonify(user.to_dict()), 200












@app.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    products_list = [product.to_dict() for product in products]
    return jsonify(products_list), 200


@app.route('/products/<int:product_id>', methods=['GET'])
def get_product_by_id(product_id):
    product = Product.query.get(product_id)
    if not product:
        return jsonify({"message": "Product does not exist!"}), 400

    return jsonify(product.to_dict()), 200


@app.route('/orders', methods=['POST'])
def create_order():
    data = request.json

    # Create order instance
    order = Order(
        user_id=data['user_id'], 
        total_price=data.get('total_price', 0.0),
        status = data.get('status', 'Pending')

    )
    db.session.add(order)
    db.session.commit()  # Commit the order to get an id

# Adding products to order
    for item in data['products']:
        product = Product.query.get(item['product_id'])
        if product:  # Ensure product exists
            # Check if product is already associated with the order
            if product in order.products:
                # Update quantity if product is already associated
                order_product_association = db.session.query(order_products_association).filter_by(
                    order_id=order.id, product_id=product.id
                ).first()
                order_product_association.quantity = item['quantity']
            else:
                # Associate product with order and set quantity
                association = order_products_association.insert().values(
                    order_id=order.id,
                    product_id=product.id,
                    quantity=item['quantity']
                )
                db.session.execute(association)


                db.session.commit()

    return jsonify(order.to_dict()), 201







@app.route('/orders/<int:order_id>', methods=['PUT'])
def update_order(order_id):
    order = Order.query.get(order_id)
    if not order:
        return jsonify({"message": "Order does not exist!"}), 404

    data = request.json
    order.total_price = data['total_price']
    order.status = data['status']

    # Update products and their quantities as required.

    db.session.commit()

    return jsonify(order.to_dict()), 200


@app.route('/orders', methods=['GET'])
def get_orders():
    orders = Order.query.all()
    orders_list = [order.to_dict() for order in orders]
    return jsonify(orders_list), 200



@app.route('/orders/<int:order_id>', methods=['GET'])
def get_order_by_id(order_id):
    order = Order.query.get(order_id)
    if not order:
        return jsonify({"message": "Order does not exist!"}), 400

    order_dict = order.to_dict()
    
    # Adding user details
    order_dict["user"] = order.user.to_dict()

    # Adding products in the order
    order_dict["products"] = []
    for product in order.products:
        product_dict = product.to_dict()
        # Here, you need a way to get the quantity of each product in the order.
        # This part requires some direct SQL or an additional method on the Order model.
        # For this example, let's assume a method get_product_quantity is defined on Order model.
        product_dict["quantity"] = order.get_product_quantity(product.id)
        order_dict["products"].append(product_dict)

    return jsonify(order_dict), 200







if __name__ == '__main__':
    app.run(port=5555, debug=False)



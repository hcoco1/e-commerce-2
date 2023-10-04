#!/usr/bin/env python3
from flask import Flask, request, jsonify, make_response
from flask_restful import Resource
from flask_cors import cross_origin
from flask import session
import os
from dotenv import load_dotenv
from datetime import timedelta

# Local imports
from config import app, db, api
from models import User, Product, Order
import logging
logging.basicConfig(level=logging.DEBUG)


load_dotenv()
app.secret_key = os.getenv("SECRET_KEY")
app.permanent_session_lifetime = timedelta(days=7)


@app.route('/')
@cross_origin()
def index():
    return '<h1>Project Server</h1>'


@app.route('/register', methods=['POST'])
@cross_origin()
def register_user():
    # Get the user details from the request
    user_details = request.json

    # Check if the user already exists
    user = User.query.filter_by(email=user_details['email']).first()

    # If the user exists, return an error message
    if user:
        return jsonify({"message": "User already exists!"}), 400

    new_user = User(username=user_details['username'], email=user_details['email'], password_hash=user_details['password_hash'])
   

    # Add the new user to the database
    db.session.add(new_user)
    db.session.commit()

    user_dict = new_user.to_dict()

    # Return a success message
    return jsonify(user_dict), 201

@app.route('/login', methods=['POST'])
@cross_origin(origin="http://localhost:3000", supports_credentials=True)
def login_user():
    # Get the user details from the request
    user_details = request.json

    # Check if the user already exists
    user = User.query.filter_by(email=user_details['email']).first()

    # If the user does not exist, return an error message
    if not user:
        return jsonify({"message": "User does not exist!"}), 400

    # If the user exists, check if the password is correct
    if user.password_hash != user_details['password_hash']:
        return jsonify({"message": "Incorrect password!"}), 400

    # Set the user_id in the session
    session['user_id'] = user.id
    logging.debug(f"User ID {user.id} set in session")

    # Return a success message
    return jsonify(user.to_dict()), 200

@app.route('/check_session', methods=['GET'])
def check_session():
    user_id = session.get('user_id')
    if user_id:
        user = User.query.filter_by(id=user_id).first()
        if user:
            return jsonify(user.to_dict())
    
    return jsonify({'message': '401: Not Authorized'}), 401


@app.route('/logout', methods=['GET'])
def logout():
    session.pop('user_id', None)
    return jsonify({'message': 'Logged out successfully'}), 200




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

    return jsonify(order.to_dict()), 200





    
    
    



if __name__ == '__main__':
    app.run(port=5555, debug=True)




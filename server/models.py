from sqlalchemy_serializer import SerializerMixin
from config import db, bcrypt
from sqlalchemy.orm import relationship
from sqlalchemy import ForeignKey, Table, Float, DateTime, String, Integer, Column
from datetime import datetime



# Many-to-many relationship table
order_products_association = Table(
    'order_products', db.metadata,
    Column('order_id', Integer, ForeignKey('orders.id'), primary_key=True),
    Column('product_id', Integer, ForeignKey('products.id'), primary_key=True),
    Column('quantity', Integer, nullable=False)
)


class User(db.Model,  SerializerMixin):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String, unique=True, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    orders = db.relationship("Order", back_populates="user")

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }

    def __repr__(self):
        return f"<User(id={self.id}, username={self.username}, email={self.email})>"


class Product(db.Model, SerializerMixin):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    price = Column(Float, nullable=False)
    stock = Column(Integer, nullable=False)

    orders = db.relationship(
        "Order", secondary=order_products_association, back_populates="products"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'stock': self.stock
        }

    def __repr__(self):
        return f"<Product(id={self.id}, name={self.name}, price={self.price})>"


class Order(db.Model, SerializerMixin):
    __tablename__ = 'orders'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    total_price = Column(Float, nullable=False)
    status = Column(String, default="Pending")

    user = relationship("User", back_populates="orders")
    products = relationship(
        "Product", secondary=order_products_association, back_populates="orders"
    )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'created_at': self.created_at,
            'total_price': self.total_price,
            'status': self.status
        }
        
    def get_product_quantity(self, product_id):
        # Query the association table
        association_entry = db.session.query(order_products_association).filter_by(
            order_id=self.id, product_id=product_id
        ).first()
        return association_entry.quantity if association_entry else 0

    def __repr__(self):
        return f"<Order(id={self.id}, user_id={self.user_id}, total_price={self.total_price}, status={self.status})>"


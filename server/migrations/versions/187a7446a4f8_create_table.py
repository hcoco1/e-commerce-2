"""create table

Revision ID: 187a7446a4f8
Revises: 
Create Date: 2023-10-05 07:56:20.729182

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '187a7446a4f8'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('products',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('price', sa.Float(), nullable=False),
    sa.Column('stock', sa.Integer(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('email', sa.String(), nullable=False),
    sa.Column('password_hash', sa.String(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('orders',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.Column('total_price', sa.Float(), nullable=False),
    sa.Column('status', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name=op.f('fk_orders_user_id_users')),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('order_products',
    sa.Column('order_id', sa.Integer(), nullable=False),
    sa.Column('product_id', sa.Integer(), nullable=False),
    sa.Column('quantity', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['order_id'], ['orders.id'], name=op.f('fk_order_products_order_id_orders')),
    sa.ForeignKeyConstraint(['product_id'], ['products.id'], name=op.f('fk_order_products_product_id_products')),
    sa.PrimaryKeyConstraint('order_id', 'product_id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('order_products')
    op.drop_table('orders')
    op.drop_table('users')
    op.drop_table('products')
    # ### end Alembic commands ###

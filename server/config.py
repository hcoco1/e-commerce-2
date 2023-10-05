import os
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_bcrypt import Bcrypt 


app = Flask(
__name__,
static_url_path='',
static_folder='../client/build',
template_folder='../client/build'
)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URI')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SESSION_COOKIE_SECURE'] = True

app.json.compact = False

# Define metadata, instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)
bcrypt = Bcrypt(app)


from flask_cors import CORS

# Determine the allowed origins based on the environment
if app.config['ENV'] == 'development':
    # Allow requests from your development frontend (http://localhost:3000)
    allowed_origins = ['http://localhost:3000']
else:
    # Configure allowed origins for your production domain(s)
    allowed_origins = ['https://phase5-app-tyia.onrender.com']

# Configure CORS with the determined allowed origins
CORS(app, resources={r"/*": {"origins": allowed_origins}}, supports_credentials=True)






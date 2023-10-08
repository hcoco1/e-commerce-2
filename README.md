<div align="center"><h1>Ivan Arias. Full-Stack Engineering Student.</h1></div>

<div id="badges" align="center">
  <a href="https://www.linkedin.com/in/arias-ivan-hcoco1/">
    <img src="https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn Badge"/>
  </a>
  <a href="https://www.youtube.com/channel/UCban0ilP3jBC9rdmL-fPy_Q">
    <img src="https://img.shields.io/badge/YouTube-red?style=for-the-badge&logo=youtube&logoColor=white" alt="Youtube Badge"/>
  </a>
  <a href="https://twitter.com/hcoco1">
    <img src="https://img.shields.io/badge/Twitter-blue?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter Badge"/>
  </a>
</div>  


## Phase 5 Project: E-Commerce.
### Deployment link: https://phase5-app-tyia.onrender.com
##### Phase 5 Project repository link: https://github.com/hcoco1/e-commerce-2

#### Project Pitch



Welcome to the E-Commerce  repository! This project is an e-commerce platform built with React for the frontend and Python for the backend.E-Commerce  is a comprehensive e-commerce platform designed to provide users with a seamless online shopping experience. The frontend is built using React, while the backend is powered by Python.

Features
User Authentication: Register, login, and manage user details.
Product Management: Browse products, view product details, and add products to the cart.
Checkout: Seamlessly proceed to checkout and place orders.
Order Management: View and manage past orders.
Shopping Cart: Add, remove, and view products in the shopping cart.
Getting Started


<div align="center">

---

![how this app works](https://github.com/hcoco1/e-commerce-2/blob/main/e-commerce.gif?raw=true) 
 
---


</div>

## Installation instructions:
1. Fork and clone this repository.
2. Open the project directory in your terminal.
3. Install the dependencies using the following commands:
```
    pipenv install
    pipenv shell
    pip install -r requirements.txt && npm install --prefix client &

```

4. Once all of the dependencies have been installed, you can open a terminal and start the app using the following command:

```
    honcho start -f Procfile.dev
```

## How to navigate in E-Commerce:

After launching the app  using the python honcho command, users will be sent to the Home page. From here, you can:

* Sign up for an account,
* Log in to the site & remain logged in,
* Log out,
* View a list of all available products, products details, and add products to the Shopping Cart.
* Modify or delete a quantities of products in the Shopping Cart.
* Modify or delete user details.
* View past orders.
* Proceed to checkout and place orders (create new orders).
  
### **Project Structure**
  ```javascript
├── CONTRIBUTING.md
├── LICENSE.md
├── Pipfile
├── Pipfile.lock
├── Procfile.dev
├── README.md
├── client
│   ├── build
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── public
│   └── src
├── e-commerce.gif
├── requirements.txt
└── server
    ├── __pycache__
    ├── app.py
    ├── config.py
    ├── instance
    ├── migrations
    ├── models.py
    └── seed.py

9 directories, 14 files
  ```

### **Technologies Used**
* Flask/SQLAlchemy API backend with a React frontend.
* Four models on the backend (one many-to-many relationship)
* Full CRUD actions for Users (POST, GET, PATCH, and DELETE)
* Nine client-side routes using React Router, with full CRUD actions for Users.
* Password hashing and authentication
* Validations implemented on frontend and backend
* Forms and validation through Formik & Yup on all input (data type validation and string/number format validation)
* Using axios to connect the backend and frontend
* useContext  to manage global state
* posgresql database with four tables deployed on Render.
* Project fully deployed on Render


Additionally, RES uses three RESTful routing conventions:

| Route   Name    | URL             | HTTP Verb             |
|-----------------|-----------------|-----------------------| 
| UserLogin       | login           | POST                  | 
| UserRegister    | register        | POST                  | 
| UserDetails     | user/:id        | GET, PATCH, DELETE    |


Component NavBar.jsx
```javascript 
function NavigationBar({ onLogout }) {
  const { user, logout } = useContext(UserContext);

  function handleLogout() {
    api.logout()
      .then(() => {
        logout();
        onLogout();
      })
      .catch(err => {
        console.error("Error during logout:", err);
      });
  }

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        <ul className="navbar-nav" style={{ flexDirection: 'row', alignItems: 'center', listStyleType: 'none' }}>
          <li className="nav-item" style={{ marginRight: '10px' }}>

            <NavLink
              to="."
              style={({ isActive, isPending }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isPending ? "red" : "white",
                };
              }}

            >
              <FaHome /> Home
            </NavLink>
          </li>

          <li className="nav-item" style={{ marginRight: '10px' }}>
            <NavLink
              to="/products"
              style={({ isActive, isPending }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isPending ? "red" : "white",
                };
              }}

            >
              <FaIcons /> Products
            </NavLink>
          </li>

          {user && (
            <>
              <li className="nav-item" style={{ marginRight: '10px' }}>
                <NavLink
                  to="/orders"
                  style={({ isActive, isPending }) => {
                    return {
                      fontWeight: isActive ? "bold" : "",
                      color: isPending ? "red" : "white",
                    };
                  }}

                >
                  <FaListOl /> Orders
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/cart"
                  style={({ isActive, isPending }) => {
                    return {
                      fontWeight: isActive ? "bold" : "",
                      color: isPending ? "red" : "white",
                    };
                  }}

                >
                  <FaShoppingCart /> Cart
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/user"
                  style={({ isActive, isPending }) => {
                    return {
                      fontWeight: isActive ? "bold" : "",
                      color: isPending ? "red" : "white",
                    };
                  }}

                >
                  <FaSignOutAlt /> Hi, {user.username}
                </NavLink>
              </li>

              <li className="nav-item">
                <Button $primary onClick={handleLogout}>Sign Out</Button>
              </li>
            </>
          )}

          {!user && (
            <>
              <li className="nav-item" style={{ marginRight: '10px' }}>
                <NavLink
                  to="/login"
                  style={({ isActive, isPending }) => {
                    return {
                      fontWeight: isActive ? "bold" : "",
                      color: isPending ? "red" : "white",
                    };
                  }}

                >
                  <FaSignInAlt /> Sign In
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/register"
                  style={({ isActive, isPending }) => {
                    return {
                      fontWeight: isActive ? "bold" : "",
                      color: isPending ? "red" : "white",
                    };
                  }}

                >
                  <FaSignOutAlt /> Sign Up
                </NavLink>
              </li>
            </>
          )}

        </ul>
      </div>
    </nav>
  );
}

export default NavigationBar;
```

### Backend Setup

E-Commerce  uses a Flask/SQLAlchemy API backend with a React frontend. The backend is deployed on Render. The backend is a RESTful API that uses four models (one many-to-many relationship) and has full CRUD actions for Users. 


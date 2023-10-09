import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import UserContext from './UserContext';


// Styled components for the user details
const UserDetailsContainer = styled.div`
    width: 300px;
    margin: 50px auto;
    padding: 20px;
    border-radius: 5px;
    background-color: #f5f6f7;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const UserTitle = styled.h2`
    font-size: 24px;
    color: #1877f2;
    margin-bottom: 15px;
    font-weight: 500;
`;

const UserInfo = styled.p`
    font-size: 16px;
    margin-bottom: 10px;
    color: #1c1e21;
`;

const UserLabel = styled.strong`
    color: #4b4f56;
    margin-right: 5px;
`;
const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: px solid #BF4F74;
  color: #BF4F74;
  margin: 0 1em;
  padding: 0.25em 1em;
`;
const StyledMessage = styled.p`
    color: #1877F2;  // Facebook blue color for success
    font-size: 16px;  
    font-weight: bold;
    text-align: center;  
    margin-top: 20px;  
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;  
`;

const StyledErrorMessageStyle = styled(StyledMessage)`
    color: #e74c3c;  // A red color for errors
`;






function UserDetails() {
    const [operationMessage, setOperationMessage] = useState('');
    const { logout } = React.useContext(UserContext);
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // State to toggle editing mode

    useEffect(() => {
        axios.get('/user', {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true  // to include cookies with the request
        })
            .then(response => {
                const data = response.data;
                if (data.message) {
                    setError(data.message);
                } else {
                    setUserData(data);
                }
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.message) {
                    setError(error.response.data.message);
                } else {
                    setError(error.message);
                }
            });
    }, []);

    const handleUpdate = () => {
        axios.patch(`/user/${userData.id}`, userData, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
            .then(response => {
                setUserData(response.data);
                setIsEditing(false);
                setOperationMessage('User updated successfully!');
            })
            .catch(error => {
                setOperationMessage('Error updating user.');
                
            });

    };

    const handleDelete = () => {
        axios.delete(`/user/${userData.id}`, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })
            .then(() => {
                setOperationMessage('User deleted successfully!');
                logout();
                navigate('/login', { state: { message: 'User deleted successfully!' } });
            })
            .catch(error => {
                setOperationMessage('Error deleting user.');
                
            });

    };


    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <UserDetailsContainer>
            {operationMessage &&
                (operationMessage.includes('Error')
                    ? <StyledErrorMessageStyle>{operationMessage}</StyledErrorMessageStyle>
                    : <StyledMessage>{operationMessage}</StyledMessage>
                )
            }
            <UserTitle>Profile</UserTitle>
            {isEditing ? (
                <>
                    <input value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
                    <input value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
                    <button onClick={handleUpdate}>Save</button>
                </>
            ) : (
                <>
                    <UserInfo><UserLabel>Username:</UserLabel> {userData.username}</UserInfo>
                    <UserInfo><UserLabel>Email:</UserLabel> {userData.email}</UserInfo>
                    <Button onClick={() => setIsEditing(true)}>Edit</Button>
                    <Button $primary onClick={handleDelete}>Delete</Button>
                </>
            )}
        </UserDetailsContainer>
    );
}

export default UserDetails;


import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';


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

function UserDetails() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

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
    

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <UserDetailsContainer>
            <UserTitle>Profile</UserTitle>
            <UserInfo><UserLabel>Username:</UserLabel> {userData.username}</UserInfo>
            <UserInfo><UserLabel>Email:</UserLabel> {userData.email}</UserInfo>
            {/* You can add other user properties if needed */}
        </UserDetailsContainer>
    );
}

export default UserDetails;

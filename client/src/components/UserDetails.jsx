import React, { useState, useEffect } from 'react';

function UserDetails() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include' // to include cookies with the request
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.message) {
                setError(data.message);
            } else {
                setUserData(data);
            }
        })
        .catch(error => {
            setError(error.message);
        });
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!userData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>User Details</h2>
            <p><strong>Username:</strong> {userData.username}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            {/* You can add other user properties if needed */}
        </div>
    );
}

export default UserDetails;

import { useState, useEffect } from "react";

function UserProfile() {
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log("Fetching user data...");
        fetch(`http://localhost:5555/user`)
            .then((r) => {
                if (!r.ok) {
                    console.error("Error response:", r);
                    throw new Error("Network response was not ok");
                }
                return r.json();
            })
            .then((data) => {
                console.log("Data received:", data);
                setUserData(data);
            })
            .catch((error) => {
                console.error("Fetch error:", error);
                setError(error.message || "An error occurred");
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h2>User Profile</h2>
            <p><strong>Username:</strong> {userData.username}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            {/* Add other user properties if needed */}
        </div>
    );
}

export default UserProfile;




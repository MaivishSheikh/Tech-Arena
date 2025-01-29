import React, { useEffect, useState } from "react";

const App = () => {
  const [users, setUsers] = useState([]); // To store user data
  const [loading, setLoading] = useState(true); // To manage loading state
  const [error, setError] = useState(null); // To handle errors

  useEffect(() => {
    // Fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/users/");
        const result = await response.json();

        if (result.success) {
          setUsers(result.data); // Update state with user data
        } else {
          setError(result.message); // Handle error message
        }
      } catch (err) {
        setError("Failed to fetch users.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            <h3>{user.fullName}</h3>
            <p>Email: {user.email}</p>
            <img
              src={user.avatar}
              alt={`${user.fullName}'s avatar`}
              style={{ width: "100px", borderRadius: "50%" }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

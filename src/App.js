import React, { useState, useEffect } from "react";
import axios from "axios";
import UserList from "./components/UserList";
import UserForm from "./components/UserForm";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://jsonplaceholder.typicode.com/users");
        setUsers(response.data);
      } catch (error) {
        setError("Failed to fetch users. Please try again.");
      }
    };
    fetchUsers();
  }, []);

  const handleSaveUser = async (user) => {
    try {
      if (user.id) {
        const response = await axios.put(`https://jsonplaceholder.typicode.com/users/${user.id}`, user);
        setUsers(users.map((u) => (u.id === user.id ? response.data : u)));
      } else {
        const response = await axios.post("https://jsonplaceholder.typicode.com/users", user);
        setUsers([...users, { ...user, id: response.data.id }]);
      }
      setCurrentUser(null);
    } catch (error) {
      setError("Failed to save user. Please try again.");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      alert("User deleted successfully!");
    } catch (error) {
      setError("Failed to delete user. Please try again.");
    }
  };

  return (
    <div className="app-container">
      <h1>User Management</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="card">
        <UserList
          users={users}
          onEdit={(user) => setCurrentUser(user)}
          onDelete={handleDeleteUser}
        />
        <UserForm
          currentUser={currentUser}
          onSave={handleSaveUser}
          onCancel={() => setCurrentUser(null)}
        />
      </div>
    </div>
  );
};

export default App;

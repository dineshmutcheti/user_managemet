import React, { useState, useEffect } from "react";

const UserForm = ({ currentUser, onSave, onCancel }) => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    company: { name: "" },
  });

  useEffect(() => {
    if (currentUser) setUser(currentUser);
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "company") {
      setUser({ ...user, company: { name: value } });
    } else {
      setUser({ ...user, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(user);
  };

  return (
    <div>
      <h2>{currentUser ? "Edit User" : "Add User"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={user.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="company"
          placeholder="Department"
          value={user.company.name}
          onChange={handleChange}
        />
        <button type="submit">{currentUser ? "Update" : "Add"}</button>
        {currentUser && <button onClick={onCancel}>Cancel</button>}
      </form>
    </div>
  );
};

export default UserForm;

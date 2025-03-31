import { useState } from 'react';
import '../styles/Admin.css';

function Admin() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [formData, setFormData] = useState({ username: '', password: '' });
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleLogin = (e) => {
      e.preventDefault();
      // TEMP login logic
      if (formData.username === 'admin' && formData.password === 'password') {
        setLoggedIn(true);
      } else {
        alert('Invalid credentials');
      }
    };
  
    return (
      <div className="admin-page container">
        {!loggedIn ? (
          <form className="admin-login" onSubmit={handleLogin}>
            <h2>Admin Login</h2>
  
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Enter username"
                onChange={handleChange}
                required
              />
            </div>
  
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
                required
              />
            </div>
  
            <button type="submit" className="btn">Login</button>
          </form>
        ) : (
          <div className="admin-dashboard">
            <h2>Welcome, Admin</h2>
            <p>This is your dashboard. Image uploads and content management will go here.</p>
          </div>
        )}
      </div>
    );
  }

export default Admin;

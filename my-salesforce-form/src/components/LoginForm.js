import React from 'react';
import '../styles/LoginForm.css';

const LoginForm = () => {
    return (
        <div className="login-form">
            <h1>Login</h1>
            <form>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" />
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;

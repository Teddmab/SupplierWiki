import React, { useState } from 'react';
import '../styles/LoginForm.css';

const LoginForm = () => {
    // Add useState to keep track of the username and password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Add another state to keep track of validation messages
    const [validationMessage, setValidationMessage] = useState('');

    // Write a function to validate the input fields when the user submits the form
    const validateForm = () => {
        if (!username || !password) {
            setValidationMessage('Username and password are required.');
            return false;
        }
        // Add other validation checks as needed
        setValidationMessage('');
        return true;
    };

    // Add a handleSubmit function that will be called when the form is submitted
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevents the default form submit action
        if (validateForm()) {
            // If the form is valid, you can proceed to send data to the backend
            console.log('Form is valid, send data to backend');
        }
    };

    return (
        <div className="login-form">
            {validationMessage && <p className="validation-message">{validationMessage}</p>}

            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                {/* <input type="text" id="username" name="username" /> */}
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="password">Password:</label>
                {/* <input type="password" id="password" name="password" /> */}
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default LoginForm;

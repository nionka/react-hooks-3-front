import React, {useState} from 'react';
import PropTypes from 'prop-types';

function AuthForm({onAuth}) {
    const [form, setForm] = useState({ login: '', password: '' });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.login.trim() === '' || form.password.trim() === '') return null

        onAuth(form);
        setForm({ login: '', password: '' });
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm(prev => ({...prev, [name]: value}));
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <input name="login" value={form.login} onChange={handleChange} placeholder="Username"></input>
            <input name="password" value={form.password} onChange={handleChange} placeholder="Password"></input>
            <button type="submit">Login</button>
        </form>
    )
}

AuthForm.propTypes = {
    onAuth: PropTypes.func
}

export default AuthForm
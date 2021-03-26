/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import AuthForm from '../AuthForm/AuthForm';
import LoginForm from '../LoginForm/LoginForm';
import News from '../News/News';
import useStorage from '../../hooks/useStorage';


function Landing() {
    const [news, setNews] = useState();
    const [error, setError] = useState(null);
    const [token, setToken] = useStorage(localStorage, 'token')
    const [profile, setProfile] = useStorage(localStorage, 'profile', true);

    useEffect(() => {
        if (token) {
            const prof = async() => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_URL}/private/me`, {headers: {Authorization: `Bearer ${token}`}})
                    
                    if (!response.ok) {
                        throw new Error('Что-то пошло не так!!!');
                    }
                    const json = await response.json()

                    setProfile(json)
                    setError(null)

                } catch(err) {

                    if (err.name === 'TypeError') {
                        setError('Сервер не отвечает')
                    } else {
                        setError(err.message)
                    }
                    setProfile(null)
                    setToken(null)
                }
            }
            prof()
        }
    }, [token])

    useEffect(() => {
        if (token) {
            const prof = async() => {
                try {
                    const response = await fetch(`${process.env.REACT_APP_URL}/private/news`, {headers: {Authorization: `Bearer ${token}`}})
                    const json = await response.json()

                    if (!response.ok) {
                        throw new Error('Что-то пошло не так')
                    }

                    setNews(json)
                    setError(null)

                } catch(err) {

                    if (err.name === 'TypeError') {
                        setError('Сервер не отвечает')
                    } else {
                        setError(err.message)
                    }
                    setProfile(null)
                    setToken(null)
                }
            }
            prof()
        }
    }, [token])

    const onAuth = async (form) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_URL}/auth`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(form)
            });
            
            if (!response.ok) {
                throw new Error('Пользователь не найден!')
            }

            const json = await response.json()
            setToken(json.token)
            setError(null)
            
        } catch(err) {
            
            if (err.name === 'TypeError') {
                setError('Сервер не отвечает')
            } else {
                setError(err.message)
            }
        }   
    }

    const onLogout = () => {
        setProfile(null)
        setToken(null)
        setNews()
    }

    return (
        <div className="landing">
            {error && <div className="error">{error}</div>}
            <header className="header">
                <div className="logo">Neto Social</div>
                {profile ? <LoginForm {...profile} onLogout={onLogout} /> : <AuthForm onAuth={onAuth}/>}   
            </header>
            <main className="main">
                {news ? <News news={news} /> : <><h1>Neto Social</h1><p>Facebook and VK killer.</p></>}   
            </main>   
        </div>
    )
}

export default Landing
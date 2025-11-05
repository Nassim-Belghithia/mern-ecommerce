import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CSS/LoginSignup.css'
import { authAPI, setToken, setUser, getUser } from '../services/api'

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        // Login
        const response = await authAPI.login(email, password);
        setToken(response.token);
        setUser(response.user);
        navigate('/');
        window.location.reload(); // Reload to update cart
      } else {
        // Register
        if (!name) {
          setError('Please provide your name');
          setLoading(false);
          return;
        }
        const response = await authAPI.register(name, email, password);
        setToken(response.token);
        setUser(response.user);
        navigate('/');
        window.location.reload(); // Reload to update cart
      }
    } catch (error) {
      setError(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='loginsignup'>
      <div className="loginsignup-container">
        <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
        {error && <p style={{ color: 'red', marginBottom: '10px' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="loginsignup-fields">
              <input 
                type="text" 
                placeholder='Your Name' 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
              />
            </div>
          )}
          <div className="loginsignup-fields">
            <input 
              type="email" 
              placeholder='Email Address' 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input 
              type="password" 
              placeholder='Password' 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <button type="submit" disabled={loading}>
            {loading ? 'Loading...' : 'Continue'}
          </button>
        </form>
        <p className="loginsignup-login">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span onClick={() => {
            setIsLogin(!isLogin);
            setError('');
            setName('');
            setEmail('');
            setPassword('');
          }} style={{ cursor: 'pointer', color: '#ff4141' }}>
            {isLogin ? 'Sign Up here' : 'Login here'}
          </span>
        </p>
        {!isLogin && (
          <div className="loginsignup-agree">
            <input type="checkbox" name='' id='agree' required />
            <p>By continuing, i agree to the terms of use & privacy policy.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginSignup
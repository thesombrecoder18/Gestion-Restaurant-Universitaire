// src/App.js
import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const App = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      <h1>Gestion Resto</h1>
      {isLogin ? (
        <div>
          <LoginForm />
          <p>Pas encore inscrit ? <button onClick={() => setIsLogin(false)}>Inscription</button></p>
        </div>
      ) : (
        <div>
          <RegisterForm />
          <p>Déjà un compte ? <button onClick={() => setIsLogin(true)}>Connexion</button></p>
        </div>
      )}
    </div>
  );
};

export default App;

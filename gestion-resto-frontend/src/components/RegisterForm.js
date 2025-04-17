// src/components/RegisterForm.js
import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [prenom, setPrenom] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [sexe, setSexe] = useState('');
  const [dateNaissance, setDateNaissance] = useState('');
  const [role, setRole] = useState('Etudiant'); 
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Envoie une requête POST à ton API backend pour l'inscription
      const response = await axios.post('http://localhost:6001/api/etudiants/register', {
        Nom: name,
        Prenom: prenom,
        Email: email,
        Mot_de_passe: password,
        Sexe: sexe,
        dateNaissance,
        Role: role,
      });

      // Si l'inscription est réussie, affiche un message de succès
      setMessage( response.data.message ||'Inscription réussie !');
    } catch (error) {
      setMessage('Erreur lors de l\'inscription: ' + (error || ''));
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom :</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Prénom :</label>
          <input
            type="text"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Sexe :</label>
          <select
            value={sexe}
            onChange={(e) => setSexe(e.target.value)}
            required
          >
            <option value="">Sélectionnez</option>
            <option value="Homme">Homme</option>
            <option value="Femme">Femme</option>
          </select>
        </div>
        <div>
          <label>Date de naissance :</label>
          <input
            type="date"
            value={dateNaissance}
            onChange={(e) => setDateNaissance(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Rôle :</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="Etudiant">Etudiant</option>
            <option value="Admin">Admin</option>
            <option value="Gerant">Gérant</option>
          </select>
        </div>
        <button type="submit">S'inscrire</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegisterForm;

const getAllUsers = (req, res) => {
    // Ici tu récupères les utilisateurs depuis la base de données
    res.send('Liste des utilisateurs');
  };
  
  const createUser = (req, res) => {
    // Ici tu ajoutes un utilisateur à la base de données
    res.send('Utilisateur créé');
  };
  
  const getUserById = (req, res) => {
    const id = req.params.id;
    // Ici tu récupères l'utilisateur par son ID
    res.send(`Utilisateur avec ID: ${id}`);
  };
  
  module.exports = { getAllUsers, createUser, getUserById };
  
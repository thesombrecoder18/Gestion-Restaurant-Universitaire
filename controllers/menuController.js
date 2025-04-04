// Exemple en mémoire
let menus = [
    { id: 1, nom: 'Menu 1', plat: 'Plat A' },
    { id: 2, nom: 'Menu 2', plat: 'Plat B' },
  ];
  
  // Obtenir tous les menus
  const getAllMenus = (req, res) => {
    res.json(menus);
  };
  
  // Ajouter un menu
  const createMenu = (req, res) => {
    const { nom, plat } = req.body;
    const newMenu = { id: menus.length + 1, nom, plat };
    menus.push(newMenu);
    res.status(201).json(newMenu);
  };
  
  // Obtenir un menu par ID
  const getMenuById = (req, res) => {
    const menuId = parseInt(req.params.id);
    const menu = menus.find(m => m.id === menuId);
    if (!menu) return res.status(404).send('Menu non trouvé');
    res.json(menu);
  };
  
  module.exports = { getAllMenus, createMenu, getMenuById };
  
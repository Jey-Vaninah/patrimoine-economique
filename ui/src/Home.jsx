import React from 'react';
import { Link } from 'react-router-dom';
import './App.css'; // Assurez-vous d'importer votre fichier CSS personnalisé

function Home() {
  return (
    <div className="container mt-4 home-container">
      <div className="text-center">
        <h1 className="text-green mb-4">Bienvenue dans l'application de gestion de patrimoine !</h1>
        <p className="text-muted mb-4">
          Vous pouvez consulter la liste de vos possessions actuelles, ajouter de nouvelles possessions, 
          et mettre à jour les informations existantes pour avoir une vue complète de votre patrimoine.
        </p>
        <div className="btn-group mt-4">
          <Link to="/possessions" className="btn btn-dark">Liste des Possessions</Link>
          <Link to="/add" className="btn btn-light ml-2">Ajouter une Possession</Link>
        </div>
      </div>
    </div>
  );
}

export default Home;

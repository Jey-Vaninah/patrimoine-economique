import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function AddPossession() {
  const [libelle, setLibelle] = useState("");
  const [valeur, setValeur] = useState("");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState(""); 
  const [taux, setTaux] = useState("");
  const [possesseur, setPossesseur] = useState("John Doe");
  const [type, setType] = useState(""); // New state for type
  const [jour, setJour] = useState(""); // New state for jour

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newPossession = {
      possesseur: {
        nom: possesseur,
      },
      libelle,
      valeur: parseFloat(valeur),
      dateDebut: new Date(dateDebut).toISOString(), // Convert date to ISO format
      dateFin: dateFin ? new Date(dateFin).toISOString() : null,
      tauxAmortissement: taux ? parseFloat(taux) : 0,
      type, // Add type to the payload
      jour: jour ? parseInt(jour, 10) : null, // Add jour to the payload
    };

    try {
      const response = await fetch("http://localhost:5000/possession", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPossession),
      });

      if (response.ok) {
        alert("Possession ajoutée avec succès !");
        navigate("/");
      } else {
        alert("Erreur lors de l'ajout de la possession.");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la possession :", error);
      alert("Erreur lors de l'ajout de la possession.");
    }
  };

  return (
    <div className="container mt-4">
      <h1>Ajouter une Nouvelle Possession</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Libelle</Form.Label>
          <Form.Control
            type="text"
            placeholder="Entrez le libelle"
            value={libelle}
            onChange={(e) => setLibelle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Valeur</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            placeholder="Entrez la valeur"
            value={valeur}
            onChange={(e) => setValeur(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Type de Possession</Form.Label>
          <Form.Select value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="">Choisissez un type</option>
            <option value="bienMateriel">Bien Matériel</option>
            <option value="argent">Argent</option>
            <option value="courant">Courant</option>
            <option value="trainDeVie">Train de Vie</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Jour</Form.Label>
          <Form.Control
            type="number"
            placeholder="Entrez le jour"
            value={jour}
            onChange={(e) => setJour(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date Début</Form.Label>
          <Form.Control
            type="date"
            value={dateDebut}
            onChange={(e) => setDateDebut(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Date Fin</Form.Label>
          <Form.Control
            type="date"
            value={dateFin}
            onChange={(e) => setDateFin(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Taux d'Amortissement</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            placeholder="Entrez le taux d'amortissement"
            value={taux}
            onChange={(e) => setTaux(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Ajouter
        </Button>
      </Form>
    </div>
  );
}

export default AddPossession;

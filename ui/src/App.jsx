import { useState, useEffect } from "react";
import "./index.css";
import { Table, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Possession from "./../../models/possessions/Possession.js"; 

function App() {
  const [possessions, setPossessions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalValue, setTotalValue] = useState(0);
  const [totalCurrentValue, setTotalCurrentValue] = useState(0); 

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/1");
      const jsonData = await response.json();
      console.log(jsonData.data.possessions);
      const fetchedPossessions = jsonData.data.possessions;

      
      const initialTotalCurrentValue = fetchedPossessions.reduce((sum, pos) => {
        const possessionInstance = new Possession(
          pos.possesseur.nom,
          pos.libelle,
          pos.valeur,
          new Date(pos.dateDebut),
          pos.dateFin ? new Date(pos.dateFin) : null,
          pos.tauxAmortissement || 0
        );
        return sum + (possessionInstance.getValeurApresAmortissement(new Date()) || pos.valeur);
      }, 0);

      setPossessions(fetchedPossessions);
      setTotalCurrentValue(initialTotalCurrentValue);
    };

    fetchData();
  }, []);

  const applyDate = () => {
    const updatedPossessions = possessions.map(possession => {
      const possessionInstance = new Possession(
        possession.possesseur.nom,
        possession.libelle,
        possession.valeur,
        new Date(possession.dateDebut),
        possession.dateFin ? new Date(possession.dateFin) : null,
        possession.tauxAmortissement || 0
      );

      
      const valeurActuelle = possessionInstance.getValeurApresAmortissement(selectedDate);

      
      const updatedDateFin = selectedDate;

      return {
        ...possession,
        dateFin: updatedDateFin.toISOString().split('T')[0], 
        valeurActuelle: valeurActuelle
      };
    });

    setPossessions(updatedPossessions);

    
    const totalCurrent = updatedPossessions.reduce((sum, pos) => sum + (pos.valeurActuelle || pos.valeur), 0);
    setTotalCurrentValue(totalCurrent);

   
    const total = updatedPossessions.reduce((sum, pos) => sum + (pos.valeurActuelle || pos.valeur), 0);
    setTotalValue(total);
  };

  return (
    <>
    <h1>Bienvenu sur votre Patrimoine</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Possesseur</th>
            <th>Libelle</th>
            <th>Valeur initiale</th>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Amortissement</th>
            <th>Valeur Actuelle</th>
          </tr>
        </thead>
        <tbody>
          {possessions.map((poss, index) => (
            <tr key={index}>
              <td>{poss.possesseur.nom}</td>
              <td>{poss.libelle}</td>
              <td>{poss.valeur}</td>
              <td>{new Date(poss.dateDebut).toLocaleDateString()}</td>
              <td>{poss.dateFin ? new Date(poss.dateFin).toLocaleDateString() : "N/A"}</td>
              <td>{poss.tauxAmortissement ? `${poss.tauxAmortissement}%` : "N/A"}</td>
              <td>{poss.valeurActuelle !== undefined ? poss.valeurActuelle.toFixed(2) : poss.valeur.toFixed(2)}</td>
            </tr>
          ))}
          
          <tr className="total-row">
            <td colSpan="6" className="text-end font-weight-bold">Valeur Totale Actuelle Initiale:</td>
            <td className="font-weight-bold">{totalCurrentValue.toFixed(2)}</td>
          </tr>
        </tbody>
      </Table>

      <div className="date-picker-container">
        <label>Sélectionnez une date: </label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd/MM/yyyy"
        />
        <Button onClick={applyDate} style={{ marginLeft: '10px' }}>Appliquer</Button>
      </div>

      
      <div className="total-value">
        <h3>Valeur Totale: {totalValue.toFixed(2)}</h3>
      </div>
    </>
  );
}

export default App;

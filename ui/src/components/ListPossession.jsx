import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Possession from '../../../models/possessions/Possession';
import Flux from '../../../models/possessions/Flux';
import { axiosInstance } from '../utils/axios';

function ListPossession() {
  const [possessions, setPossessions] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalValue, setTotalValue] = useState(0);
  const [totalCurrentValue, setTotalCurrentValue] = useState(0);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedPossession, setSelectedPossession] = useState(null);
  const [updateForm, setUpdateForm] = useState({ libelle: '', dateFin: '' });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = await axiosInstance.get("/possession").then(response => response.data);
        if (jsonData) {
          const fetchedPossessions = jsonData;

          const updatedPossessions = fetchedPossessions.map(pos => {
            if (pos.type === "courant" || pos.type === "trainDeVie") {
              let possessionInstance = new Flux(
                pos.possesseur.nom,
                pos.libelle,
                pos.valeur,
                new Date(pos.dateDebut),
                pos.dateFin ? new Date(pos.dateFin) : null,
                pos.tauxAmortissement || 0,
                pos.jour
              );
              return {
                ...pos,
                valeurActuelle: possessionInstance.getValeur(new Date()) || pos.valeur
              };
            } else {
              let possessionInstance = new Possession(
                pos.possesseur.nom,
                pos.libelle,
                pos.valeur,
                new Date(pos.dateDebut),
                pos.dateFin ? new Date(pos.dateFin) : null,
                pos.tauxAmortissement || 0
              );
              return {
                ...pos,
                valeurActuelle: possessionInstance.getValeurApresAmortissement(new Date()) || pos.valeur
              };
            }

          });

          const initialTotalCurrentValue = updatedPossessions.reduce((sum, pos) => sum + (pos.valeurActuelle || pos.valeur), 0);

          setPossessions(updatedPossessions);
          setTotalCurrentValue(initialTotalCurrentValue);
        } else {
          console.error("Invalid data structure:", jsonData);
        }
      } catch (error) {
        console.error("Error fetching possessions:", error);
      }
    };

    fetchData();
  }, []);

  const determinePossessionType = (possession) => {
    return possession.tauxAmortissement ? 'Bien Matériel' : 'Flux';
  };

  const applyDate = () => {
    const updatedPossessions = possessions.map(possession => {
      let valeurActuelle;
      if (possession.type === "courant" || possession.type === "trainDeVie") {
        let possessionInstance = new Flux(
          possession.possesseur.nom,
          possession.libelle,
          possession.valeur,
          new Date(possession.dateDebut),
          possession.dateFin ? new Date(possession.dateFin) : null,
          possession.tauxAmortissement || 0,
          possession.jour
        );
        valeurActuelle = possessionInstance.getValeur(selectedDate);
      }
      else {
        let possessionInstance = new Possession(
          possession.possesseur.nom,
          possession.libelle,
          possession.valeur,
          new Date(possession.dateDebut),
          possession.dateFin ? new Date(possession.dateFin) : null,
          possession.tauxAmortissement || 0

        );
        valeurActuelle = possessionInstance.getValeurApresAmortissement(selectedDate);
      }

      const updatedDateFin = selectedDate;
      const possessionType = determinePossessionType(possession);

      return {
        ...possession,
        dateFin: updatedDateFin.toISOString().split('T')[0],
        valeurActuelle: valeurActuelle,
        libelle: `${possession.libelle}`
      };
    });

    setPossessions(updatedPossessions);

    const totalCurrent = updatedPossessions.reduce((sum, pos) => {
      if (pos.type === "trainDeVie") {
        return sum - (pos.valeurActuelle)
      } else {
        return sum + (pos.valeurActuelle)
      }
    }, 0);

    setTotalCurrentValue(totalCurrent);

    const total = updatedPossessions.reduce((sum, pos) => {
      if (pos.type === "trainDeVie") {
        return sum - (pos.valeurActuelle)
      } else {
        return sum + (pos.valeurActuelle)
      }
    }, 0);
    setTotalValue(total);
  };

  const handleUpdate = (poss) => {
    setSelectedPossession(poss);
    setUpdateForm({
      libelle: poss.libelle.replace(/\s*\(.*\)$/, ''),
      dateFin: poss.dateFin ? new Date(pos.dateFin).toISOString().split('T')[0] : ''
    });
    setShowUpdateModal(true);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPossession = await axiosInstance.put(`/possession/${selectedPossession.id}`, {
        libelle: updateForm.libelle,
        dateFin: updateForm.dateFin
      }).then(response => response.data);
      setPossessions(possessions.map(p => p.id === updatedPossession.id ? updatedPossession : p));
      setShowUpdateModal(false);
    } catch (error) {
      console.error('Error updating possession:', error);
    }
  };

  const handleClose = async (index) => {
    const possessionToClose = possessions[index];
    try {
      await axiosInstance.put(`/possession/${possessionToClose.id}`, {
        ...possessionToClose,
        dateFin: new Date().toISOString().split('T')[0]
      });
      const updatedPossessions = [...possessions];
      updatedPossessions[index].dateFin = new Date().toISOString().split('T')[0];
      setPossessions(updatedPossessions);
    } catch (error) {
      console.error('Error closing possession:', error);
    }
  };

  return (
    <>
      <br /><br />
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
            <th>Actions</th>
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
              <td>
                <Button onClick={() => handleClose(index)} variant="info" size="sm" style={{ marginRight: '5px' }}>Fermer</Button>
                <Button onClick={() => handleUpdate(poss)} variant="warning" size="sm" style={{ marginRight: '5px' }}>Mettre à jour</Button>
              </td>
            </tr>
          ))}
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

      <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Mettre à jour la possession</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleUpdateSubmit}>
            <Form.Group controlId="libelle">
              <Form.Label>Libelle</Form.Label>
              <Form.Control
                type="text"
                value={updateForm.libelle}
                onChange={(e) => setUpdateForm({ ...updateForm, libelle: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="dateFin">
              <Form.Label>Date Fin</Form.Label>
              <Form.Control
                type="date"
                value={updateForm.dateFin}
                onChange={(e) => setUpdateForm({ ...updateForm, dateFin: e.target.value })}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Mettre à jour
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ListPossession;









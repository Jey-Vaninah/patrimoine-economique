import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
 } from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import '../App.css';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

function LineChartPage() {
  const [query, setQuery] = useState({
    dateDebut: new Date().toISOString(),
    dateFin: new Date().toISOString(),
    jour: new Date().getDate()
  });
  const [rangeData, setRangeData] = useState({ labels: [], datasets: [] });
  const { dateDebut, dateFin, jour } = query;

  useEffect(() => {
    fetchRangeData();
  }, [dateDebut, dateFin, jour]);

  const fetchRangeData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/graphics', {
        params: {
          dateDebut,
          dateFin,
          jour: jour || 0
        },
      });
      const fetchedData = response.data;

      setRangeData({
        labels: fetchedData.map(res => new Date(res.date).toLocaleString()),
        datasets: [
          {
            label: 'Valeur du Patrimoine',
            data: fetchedData.map(res => res.value),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
          },
        ],
      });
    } catch (error) {
      console.error('Erreur lors de la récupération des données:', error);
    }
  };

  return (
    <Container>
      <h1 className="text-green mb-4">Vue d'Ensemble du Patrimoine</h1>
      <Row>
        <Col md={6}>
          <Form>
            <Form.Group controlId="dateDebut">
              <Form.Label>Date Début</Form.Label>
              <DatePicker
                selected={dateDebut}
                onChange={(date) => setQuery(prev => ({ ...prev, dateDebut: date }))}
                dateFormat="yyyy-MM-dd"
                className="form-control"
              />
            </Form.Group>
            <Form.Group controlId="dateFin">
              <Form.Label>Date Fin</Form.Label>
              <DatePicker
                selected={dateFin}
                onChange={(date) => setQuery(prev => ({ ...prev, dateFin: date }))}
                dateFormat="yyyy-MM-dd"
                className="form-control"
              />
            </Form.Group>
            <Form.Group controlId="jour">
              <Form.Label>Jour</Form.Label>
              <input
                type="number"
                value={jour}
                onChange={(event) => setQuery(prev => ({ ...prev, jour: event.target.value }))}
                className="form-control"
              />
            </Form.Group>
            <Button onClick={fetchRangeData} variant="dark" className="mt-3">Afficher les Données</Button>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <h3 className="text-green mt-4">Valeur du Patrimoine (Plage de Dates)</h3>
          <Line data={rangeData} />
        </Col>
      </Row>
    </Container>
  );
}

export default LineChartPage;

import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale } from 'chart.js';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import './App.css'; // Assurez-vous d'importer votre fichier CSS personnalisé

ChartJS.register(LineElement, CategoryScale, LinearScale);

function LineChartPage() {
  const [dateDebut, setDateDebut] = useState(new Date());
  const [dateFin, setDateFin] = useState(new Date());
  const [jour, setJour] = useState(new Date());
  const [rangeData, setRangeData] = useState({ labels: [], datasets: [] });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [singleDateData, setSingleDateData] = useState({ labels: [], datasets: [] });
  const [additionalChartData, setAdditionalChartData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    fetchRangeData();
    fetchSingleDateData();
    fetchAdditionalChartData();
  }, []);

  const fetchRangeData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/patrimoine/range', {
        params: {
          type: jour.toISOString().split('T')[0],
          dateDebut: dateDebut.toISOString(),
          dateFin: dateFin.toISOString()
        },
      });
      const fetchedData = response.data;
      setRangeData({
        labels: fetchedData.labels,
        datasets: [
          {
            label: 'Valeur du Patrimoine',
            data: fetchedData.values,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching range data:', error);
    }
  };

  const fetchSingleDateData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/patrimoine/date', {
        params: { date: selectedDate.toISOString() },
      });
      const fetchedData = response.data;
      setSingleDateData({
        labels: fetchedData.labels,
        datasets: [
          {
            label: 'Valeur du Patrimoine pour la Date Sélectionnée',
            data: fetchedData.values,
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            fill: true,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching single date data:', error);
    }
  };

  const fetchAdditionalChartData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/patrimoine/additional-data');
      const fetchedData = response.data;
      setAdditionalChartData({
        labels: fetchedData.labels,
        datasets: [
          {
            label: 'Données Complémentaires',
            data: fetchedData.values,
            borderColor: 'rgba(255, 159, 64, 1)',
            backgroundColor: 'rgba(255, 159, 64, 0.2)',
            fill: true,
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching additional chart data:', error);
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
                onChange={(date) => setDateDebut(date)}
                dateFormat="yyyy-MM-dd"
                className="form-control"
              />
            </Form.Group>
            <Form.Group controlId="dateFin">
              <Form.Label>Date Fin</Form.Label>
              <DatePicker
                selected={dateFin}
                onChange={(date) => setDateFin(date)}
                dateFormat="yyyy-MM-dd"
                className="form-control"
              />
            </Form.Group>
            <Form.Group controlId="jour">
              <Form.Label>Jour</Form.Label>
              <DatePicker
                selected={jour}
                onChange={(date) => setJour(date)}
                dateFormat="yyyy-MM-dd"
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
        <Col md={12}>
          <h3 className="text-green mt-4">Valeur du Patrimoine pour la Date Sélectionnée</h3>
          <Line data={singleDateData} />
        </Col>
        <Col md={12}>
          <h3 className="text-green mt-4">Données Complémentaires</h3>
          <Line data={additionalChartData} />
        </Col>
      </Row>
    </Container>
  );
}

export default LineChartPage;

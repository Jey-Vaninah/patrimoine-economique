import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AddPossession from './components/AddPossession';
import Navigation from './components/Navigation';
// import PossessionList from './components/PossessionList'; 
import ListPossession from './components/ListPossession';
import LineChartPage from './components/LineChartPage';

function App() {
  return (
    <Router>
      <Navigation /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/possessions" element={<ListPossession/>} />
        <Route path="/add" element={<AddPossession />} />
        <Route path="/chart" element={<LineChartPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
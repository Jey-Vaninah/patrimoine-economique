import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import PossessionList from './PossessionList';
import AddPossession from './AddPossession';
import LineChartPage from './LineChartPage';
import Navigation from './Navigation'; 

function App() {
  return (
    <Router>
      <Navigation /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/possessions" element={<PossessionList />} />
        <Route path="/add" element={<AddPossession />} />
        <Route path="/chart" element={<LineChartPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;
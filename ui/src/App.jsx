import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import AddPossession from './AddPossession';
import Navigation from './Navigation'; 
import PossessionList from './PossessionList';
import LineChartPage from './LineChartPage';


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
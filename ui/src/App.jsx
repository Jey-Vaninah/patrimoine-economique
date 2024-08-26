import { useState, useEffect } from "react";
import "./index.css";
import { Table, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Possession from "./../../models/possessions/Possession.js"; 
import PossessionList from "./PossessionList.jsx";

function App() {
  return(
    <div>
      <PossessionList />
    </div>
  )
}
  
export default App;
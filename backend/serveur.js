import { readFile, writeFile } from "../data/index.js";
import Patrimoine from "../models/Patrimoine.js";
import Personne from "../models/Personne.js";
import Flux from "../models/possessions/Flux.js";
import Possession from "../models/possessions/Possession.js";
import axios from 'axios';
import cors from 'cors';
import express from 'express';
import fs from 'node:fs';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


app.get('/possession', async (req, res) => {
  fs.readFile('./backend/dataBase.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send("Error reading the file");
    }

    try {
      let data1 = JSON.parse(data);
      let patrimoineData = data1.filter(e => e.model === "Patrimoine");
      let possessions = patrimoineData.map(e => e.data.possessions).flat();
      res.json(possessions);

    } catch (error) {
      console.error("Error parsing JSON data:", error);
      res.status(500).send("Error parsing JSON data");
    }
  });
});


app.post('/possession', async (req, res) => {
  const newPossession = req.body;

  fs.readFile('./backend/dataBase.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send("Error reading the file");
    }

    try {
      let data1 = JSON.parse(data);
      let patrimoineIndex = data1.findIndex(e => e.model === "Patrimoine");

      if (patrimoineIndex === -1) {
        return res.status(404).send("Patrimoine not found");
      }

      let patrimoineData = data1[patrimoineIndex];
      patrimoineData.data.possessions.push(newPossession);
      data1[patrimoineIndex] = patrimoineData;

      fs.writeFile('./backend/dataBase.json', JSON.stringify(data1, null, 2), (err) => {
        if (err) {
          return res.status(500).send("Error writing to the file");
        }
        res.status(201).send("Possession added successfully");
      });

    } catch (error) {
      console.error("Error parsing JSON data:", error);
      res.status(500).send("Error parsing JSON data");
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

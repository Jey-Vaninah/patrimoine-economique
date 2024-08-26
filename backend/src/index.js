import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const jsonFilePath = path.resolve(__dirname, '../dataBase.json');

app.get('/possessions', (req, res) => {
  fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('Error reading the JSON file');
      return;
    }
    const jsonData = JSON.parse(data);
    const patrimoine = jsonData.find(entry => entry.model === 'Patrimoine');
    const possessions = patrimoine ? patrimoine.data.possessions : [];
    res.json(possessions);
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:3000/possessions`);
});
import express from 'express';
import fs from 'node:fs';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Route GET pour récupérer toutes les possessions
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

// Route POST pour ajouter une nouvelle possession
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

// Route PUT pour mettre à jour une possession
app.put('/possession/:libelle', async (req, res) => {
  const libelle = req.params.libelle;
  const updatedData = req.body;

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
      let possessions = patrimoineData.data.possessions;
      let possessionIndex = possessions.findIndex(p => p.libelle === libelle);

      if (possessionIndex === -1) {
        return res.status(404).send("Possession not found");
      }

      possessions[possessionIndex] = { ...possessions[possessionIndex], ...updatedData };
      patrimoineData.data.possessions = possessions;
      data1[patrimoineIndex] = patrimoineData;

      fs.writeFile('./backend/dataBase.json', JSON.stringify(data1, null, 2), (err) => {
        if (err) {
          return res.status(500).send("Error writing to the file");
        }
        res.json(possessions[possessionIndex]);
      });

    } catch (error) {
      console.error("Error parsing JSON data:", error);
      res.status(500).send("Error parsing JSON data");
    }
  });
});

// Route DELETE pour supprimer une possession
app.delete('/possession/:libelle', async (req, res) => {
  const libelle = req.params.libelle;

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
      let possessions = patrimoineData.data.possessions;
      let newPossessions = possessions.filter(p => p.libelle !== libelle);

      if (possessions.length === newPossessions.length) {
        return res.status(404).send("Possession not found");
      }

      patrimoineData.data.possessions = newPossessions;
      data1[patrimoineIndex] = patrimoineData;

      fs.writeFile('./backend/dataBase.json', JSON.stringify(data1, null, 2), (err) => {
        if (err) {
          return res.status(500).send("Error writing to the file");
        }
        res.status(204).send();
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

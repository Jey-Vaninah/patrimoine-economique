import { readFile, writeFile } from "../data/index.js";
import Patrimoine from "../models/Patrimoine.js";
import Personne from "../models/Personne.js";
import Flux from "../models/possessions/Flux.js";
import Possession from "../models/possessions/Possession.js";
import axios from 'axios';
import cors from 'cors';
import express from 'express'
import fs from 'node:fs'

const app = express();
const PORT = 5000;
app.use(cors());
app.use(express.json());

// app.get('/possession', async (req, res) => {
//   fs.readFile('./backend/dataBase.json', 'utf8', (err, data) => {

//     try {
//       let data1 = JSON.parse(data)
//       let data2 = data1.filter(e => e.model === "Patrimoine")
//       console.log(data2);
      
//       console.log(data2);
//       res.send(data2)

//     } catch (error) {
//       console.log(err)
//     }
//   })
// })

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

app.listen(PORT,()=>{
  console.log(`serveur is runing on http://localhost:${PORT}`)
})

// const john = new Personne("John Doe");

// const macBookPro = new Possession(john, "MacBook Pro", 4000000, new Date("2023-12-25"), null, 5);
// const salaire = new Flux(john,"Alternance",500_000,new Date("2023-1-1"),null,null,1);
// const traindevie = new Flux(john,"Survie",-300_000,new Date("2023-1-1"),null,null,2)
// const possessions = [macBookPro,salaire,traindevie];


// const johnPatrimoine  = new Patrimoine(john,possessions);

// johnPatrimoine.addPossession(macBookPro);
// johnPatrimoine.addPossession(salaire);
// johnPatrimoine.addPossession(traindevie);

// function save(personne, patrimoine) {
//   const file = []
//   file.push({
//     model: "Personne",
//     data: personne
//   })
//   file.push({
//     model: "Patrimoine",
//     data: patrimoine
//   })
//   return writeFile("./fileManager/data.json", file)

// }
// function read() {
//   return readFile("./fileManager/data.json")
// }

// export {save, read}
import Personne from "./models/Personne.js";
import Patrimoine from "./models/Patrimoine.js";
import Argent from "./models/Argent.js";
import Materiel from "./models/Materiel.js";
import TrainDeVie from "./models/TrainDeVie.js";

let personne = new Personne('Ilo')
console.log("ok !");

let argent1 = new Argent(personne, 'especes', 400000, 0.05); 
let argent2 = new Argent(personne, 'Compte bancaire courant', 600000, 0.03); 
let argent3 = new Argent(personne, 'Compte bancaire epargne', 200000, 0.02); 

let materiel1 = new Materiel(personne, 'informatique', 2000000, 10); 
let materiel2 = new Materiel(personne, 'vetement', 100000, 20); 

let trainDeVie1 = new TrainDeVie(personne ,'loyer','100000')
let trainDeVie2 = new TrainDeVie(personne ,'nouriture','100000')
let trainDeVie3 = new TrainDeVie(personne ,'frais de transport','100000')
let trainDeVie4 = new TrainDeVie(personne ,'vacance','100000')


let patrimoine = new Patrimoine(personne,'09-10-24',[argent1,argent2,argent3,materiel1,materiel2,trainDeVie1,trainDeVie2,trainDeVie3,trainDeVie4])


function afficherPatrimoine(patrimoine,dateCible) {
    let possessions = patrimoine.getPossessions();
    let totalPatrimoine = 0;
    let totalArgent = 0;
    let totalDepenses = 0;
    let datePatrimoine = patrimoine.getDate();
  
   
    let tableauActuel = possessions.map(possession => {
      let montant = possession instanceof Argent ? possession.getMontant() : 0;
      let prix = possession instanceof Materiel ? possession.getPrix() : '0';
      let depense = possession instanceof TrainDeVie ? possession.getDepense() : '0';
      let benefice = possession instanceof Argent ? `${(possession.getBenefice() * 100).toFixed(2)}%` : '0';
      let accroissement = possession instanceof Materiel ? `${possession.getAccroissement()}%` : '0';
  
      if (!(possession instanceof TrainDeVie)) {
        totalPatrimoine += montant || prix || 0;
      } else {
        totalDepenses += depense || 0;
      }
  
      if (possession instanceof Argent) {
        totalArgent += montant;
      }
  
      return {
        Date: datePatrimoine,
        Type: possession.getType(),
        Libelle: possession.getLibelle(),
        Montant: montant || 'N/A',
        Prix: prix,
        Depense: depense,
        Benefice: benefice,
        Accroissement: accroissement
      };
    });
  
    console.log('PATRIMOINE ACTUEL')
    console.table(tableauActuel);
    console.log(`Total du patrimoine (hors dépenses): ${totalPatrimoine}`);
    console.log(`Total d'argent (hors dépenses): ${totalArgent}`);
   
  }
  
  afficherPatrimoine(patrimoine);



  


  

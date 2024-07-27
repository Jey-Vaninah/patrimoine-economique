import Possession from "./Possession.js";

class Materiel extends Possession {
  constructor(possesseur, libelle, prix, accroissement, dateAcquisition) {
    super(possesseur, 'Materiel', libelle, dateAcquisition);
    this.prix = prix;
    this.accroissement = accroissement;
  }

  
}

export default Materiel;


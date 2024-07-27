import Possession from "./Possession.js";

class Argent extends Possession {
  constructor(possesseur, libelle, montant, benefice, dateAcquisition) {
    super(possesseur, 'Argent', libelle, dateAcquisition);
    this.montant = montant;
    this.benefice = benefice;
  }

  
}

export default Argent;


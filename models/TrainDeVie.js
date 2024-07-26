import Possession from "./Possession.js";

class TrainDeVie extends Possession {
  constructor(possesseur, libelle, depense, dateAcquisition) {
    super(possesseur, 'TrainDeVie', libelle, dateAcquisition);
    this.depense = depense;
  }
}

export default TrainDeVie;


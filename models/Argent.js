import Possession from "./Possession.js";

class Argent extends Possession {
  constructor(possesseur, libelle, montant, benefice, dateAcquisition) {
    super(possesseur, 'Argent', libelle, dateAcquisition);
    this.montant = montant;
    this.benefice = benefice;
  }

  // Calculer la valeur future en fonction de la date cible
  calculerValeurFuture(dateCible) {
    const dateAcquisition = this.getDateAcquisition();
    const anneeDifference = dateCible.getFullYear() - dateAcquisition.getFullYear();
    const montantFuture = this.montant * Math.pow(1 + this.benefice, anneeDifference);
    return montantFuture;
  }
}

export default Argent;


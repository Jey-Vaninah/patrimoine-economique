import Possession from "./Possession.js";

class Materiel extends Possession {
  constructor(possesseur, libelle, prix, accroissement, dateAcquisition) {
    super(possesseur, 'Materiel', libelle, dateAcquisition);
    this.prix = prix;
    this.accroissement = accroissement;
  }

  // Calculer la valeur future en fonction de la date cible
  calculerValeurFuture(dateCible) {
    const dateAcquisition = this.getDateAcquisition();
    const anneeDifference = dateCible.getFullYear() - dateAcquisition.getFullYear();
    const prixFuture = this.prix * (1 + this.accroissement / 100) ** anneeDifference;
    return prixFuture;
  }
}

export default Materiel;


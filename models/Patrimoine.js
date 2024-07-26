class Patrimoine {
  constructor(possesseur, date, possessions) {
    this.possesseur = possesseur;
    this.date = new Date(date);
    this.possessions = possessions; // [Possession, Possession, ...]
  }

  getPossesseur() {
    return this.possesseur;
  }

  getDate() {
    return this.date;
  }

  getPossessions() {
    return this.possessions;
  }

  addPossession(possession) {
    this.possessions.push(possession);
  }

  removePossession(possession) {
    this.possessions = this.possessions.filter(p => p.getLibelle() !== possession.getLibelle());
  }

  calculerPatrimoineFuture(dateCible) {
    let totalPatrimoine = 0;
    let totalArgent = 0;
    let totalDepenses = 0;

    this.possessions.forEach(possession => {
      if (possession instanceof Argent) {
        totalArgent += possession.calculerValeurFuture(dateCible);
      } else if (possession instanceof Materiel) {
        totalPatrimoine += possession.calculerValeurFuture(dateCible);
      } else if (possession instanceof TrainDeVie) {
        totalDepenses += possession.getDepense();
      } else {
        totalPatrimoine += possession.getMontant() || possession.getPrix() || 0;
      }
    });

    return {
      totalPatrimoine,
      totalArgent,
      totalDepenses
    };
  }
}

export default Patrimoine;

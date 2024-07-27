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

  
}

export default Patrimoine;

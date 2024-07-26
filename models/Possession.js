class Possession {
  constructor(possesseur, type, libelle, dateAcquisition) {
    this.possesseur = possesseur;
    this.type = type;
    this.libelle = libelle;
    this.dateAcquisition = new Date(dateAcquisition); 
  }

  getPossesseur() {
    return this.possesseur;
  }

  getType() {
    return this.type;
  }

  getLibelle() {
    return this.libelle;
  }

  getDateAcquisition() {
    return this.dateAcquisition;
  }
  
  getMontant() {
    return this.montant;
  }

  getBenefice() {
    return this.benefice;
  }

  getPrix() {
    return this.prix;
  }

  getDepense() {
    return this.depense;
  }

  getAccroissement() {
    return this.accroissement;
  }
}

export default Possession;


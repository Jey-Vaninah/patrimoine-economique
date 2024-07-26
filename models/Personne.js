class Personne {
  constructor(nom) {
    this.nom = nom;
  }

  getNom(){
    console.log(this.nom)
  }
}

// module.exports = Personne;
export default Personne;
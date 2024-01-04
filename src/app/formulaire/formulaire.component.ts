import { Component } from '@angular/core';
import { Depense } from '../modeles/depense';
import { FirestoreService } from '../services/firestore.service';
import { MockDepensesService } from '../services/mock-depenses.service';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrl: './formulaire.component.css'
})
export class FormulaireComponent {

  nom: string = '';
  prix: string = '';

  constructor(private mockDepenseService: MockDepensesService,
    private firestoreService: FirestoreService) {
  }

  onSubmit() {
    if (this.isValidForm()) {
      const nouvelleDepense: Depense = { nom: this.nom, prix: parseInt(this.prix) };
      //this.mockDepenseService.addDepense(nouvelleDepense);
      this.firestoreService.addDocument(nouvelleDepense, 'dépenses');
      this.clearForm();
    }
  }

  isValidForm(): boolean {
    return this.nom.trim() !== '' && this.prix.trim() !== '';
  }

  clearForm() {
    this.nom = '';
    this.prix = '';
  }

  async printDocuments() {
    var querySnapshot = await this.firestoreService.getDocumentsFromCollection('dépenses');
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  }
}

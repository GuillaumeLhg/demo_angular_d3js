import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, getDocs, deleteDoc, doc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: Firestore) { }

  getCollection(nomCollection: string) {
    return collection(this.firestore, nomCollection);
  }

  getDocumentsFromCollection(nomCollection: string) {
    let firestoreCollection = collection(this.firestore, nomCollection);
    return getDocs(firestoreCollection);
  }

  addDocument(document: any, nomCollection: string) {
    let firestoreCollection = collection(this.firestore, nomCollection);
    return addDoc(firestoreCollection, document);
  }

  deleteDocument(id: string, nomCollection: string) {
    let documentReference = doc(this.firestore, nomCollection + '/' + id);
    return deleteDoc(documentReference);
  }

  private async printDepensesFromFirestore(): Promise<void> {
    var querySnapshot = await this.getDocumentsFromCollection('dépenses');
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
    });
  }

}

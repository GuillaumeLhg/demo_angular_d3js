import { Injectable } from '@angular/core';
import { Depense } from '../modeles/depense';

@Injectable({
  providedIn: 'root'
})
export class MockDepensesService {

  depensesArray: Depense[] = [];
  
  constructor() { }

  getDepenses(): Depense[] {
    return this.depensesArray;
  }

  addDepense(depense: Depense) {
    this.depensesArray.push(depense);
  }
}

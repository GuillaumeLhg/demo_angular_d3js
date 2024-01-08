import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GrapheCirculaireComponent } from './visualisations/graphe-circulaire/graphe-circulaire.component';
import { FirestoreService } from './services/firestore.service';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
import { PageGrapheCirculaireComponent } from './pages/page-graphe-circulaire/page-graphe-circulaire.component';
import { PageAccueilComponent } from './pages/page-accueil/page-accueil.component';
import { BarChartComponent } from './visualisations/bar-chart/bar-chart.component';

const firebaseConfig = {
  apiKey: "AIzaSyB7hhJE9E6ck3NWKkg2NklHYCI8mcBnQ-0",
  authDomain: "d3-cours-projet-10346.firebaseapp.com",
  projectId: "d3-cours-projet-10346",
  storageBucket: "d3-cours-projet-10346.appspot.com",
  messagingSenderId: "537439448989",
  appId: "1:537439448989:web:d1fcdf4e60e90f8494c974",
  measurementId: "G-MLY7BJK4QM"
};

@NgModule({
  declarations: [
    AppComponent,
    GrapheCirculaireComponent,
    FormulaireComponent,
    NavigationBarComponent,
    PageGrapheCirculaireComponent,
    PageAccueilComponent,
    BarChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [FirestoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }

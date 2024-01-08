import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageGrapheCirculaireComponent } from './pages/page-graphe-circulaire/page-graphe-circulaire.component';
import { PageAccueilComponent } from './pages/page-accueil/page-accueil.component';
import { BarChartComponent } from './visualisations/bar-chart/bar-chart.component';
import { PieChartComponent } from './visualisations/pie-chart/pie-chart.component';
import { NetworkGraphComponent } from './visualisations/network-graph/network-graph.component';

const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'accueil', component: PageAccueilComponent },
  { path: 'graphe-circulaire', component: PageGrapheCirculaireComponent },
  { path: 'bar-chart', component: BarChartComponent },
  { path: 'pie-chart', component: PieChartComponent },
  { path: 'network-graph', component: NetworkGraphComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

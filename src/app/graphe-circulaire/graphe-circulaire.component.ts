import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore.service';
import * as d3 from 'd3';
import legend from 'd3-svg-legend';
import { Depense } from '../modeles/depense';
import { onSnapshot } from '@angular/fire/firestore';

@Component({
  selector: 'app-graphe-circulaire',
  templateUrl: './graphe-circulaire.component.html',
  styleUrl: './graphe-circulaire.component.css'
})
export class GrapheCirculaireComponent implements OnInit {

  // Mise en place, pas besoin de données
  private dims = { height: 300, width: 300, radius: 150 };

  private svg: any;
  private graph: any;
  private groupeLegendes: any
  private donnee: any[] = []

  constructor(private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.createSvg();
    this.createGraph();
    this.createGroupeLegendes();
    this.listenDatabase();
  }

  private createSvg(): void {
    this.svg = d3.select('.box')
      .append('svg')
      .attr('width', this.dims.width + 150) // pour les labels
      .attr('height', this.dims.height + 150);
  }

  private createGraph(): void {
    this.graph = this.svg.append('g')
      .attr('transform', `translate(${this.dims.width / 2 + 5}, ${this.dims.height / 2 + 5})`);
  }

  private pie = d3.pie<Depense>()
    .sort(null)
    .value(d => d.prix);

  private arcPath = d3.arc()
    .outerRadius(this.dims.radius)
    .innerRadius(this.dims.radius / 2);

  // Couleur
  private couleur = d3.scaleOrdinal(d3.schemeAccent);

  // Légendes
  private createGroupeLegendes() {
    this.groupeLegendes = this.svg.append('g')
      .attr('transform', `translate(${this.dims.width + 40}, 10)`);
  }

  private legendes = legend.legendColor()
    .shape('circle')
    .scale(this.couleur);

  // Fonction de mise à jour
  private maj(donnee: any[]) {

    // Domaine des couleurs
    this.couleur.domain(donnee.map(d => d.nom));

    // Domaine
    this.groupeLegendes.call(this.legendes);
    this.groupeLegendes.selectAll('text')
      .attr('fill', '#fff');

    const paths = this.graph.selectAll('path')
      .data(this.pie(donnee));

    // Exit
    paths.exit().remove();

    // Maj du dom
    paths.attr('d', this.arcPath);

    paths.enter()
      .append('path')
      .attr('stroke', '#fff')
      .attr('stroke-width', 3)
      .attr('fill', (d: any) => this.couleur(d.data.nom))
      .transition()
      .duration(750)
      .attrTween('d', this.animEnter);

    // évènements
    this.graph.selectAll('path')
      .on('click', this.deleteClick);
  }

  // Appel de la db et être à l'écoute
  private async listenDatabase(): Promise<void> {
    var collectionReference = await this.firestoreService.getCollection('dépenses');
    onSnapshot(collectionReference, (res) => {
      res.docChanges().forEach(change => {
        const doc = { ...change.doc.data(), id: change.doc.id };
        switch (change.type) {
          case 'added':
            this.donnee.push(doc);
            break;
          case 'modified':
            const index = this.donnee.findIndex(item => item.id == doc.id);
            this.donnee[index] = doc;
            break;
          case 'removed':
            this.donnee = this.donnee.filter(item => item.id !== doc.id);
            break;
          default:
            break;
        }
      });

      this.maj(this.donnee);
    });
  }

  // Animation enter
  private animEnter = (d: any) => {
    var i = d3.interpolate(d.startAngle, d.endAngle);
    return (t: any) => {
      d.endAngle = i(t);
      // On actualise les coordonnées du Path
      return this.arcPath(d);
    }
  }

  // Fonction deleteClick
  private deleteClick = (d: any, i: any) => {
    const id = i.data.id;
    this.firestoreService.deleteDocument(id, 'dépenses');
  }
}

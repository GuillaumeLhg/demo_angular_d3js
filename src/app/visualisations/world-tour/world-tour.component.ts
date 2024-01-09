import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { queue } from 'd3-queue';
import { Feature } from 'geojson';
import * as topojson from 'topojson';

@Component({
  selector: 'app-world-tour',
  templateUrl: './world-tour.component.html',
  styleUrl: './world-tour.component.css',
  encapsulation: ViewEncapsulation.None
})
export class WorldTourComponent implements OnInit {

  ngOnInit(): void {
    var width = 960,
      height = 960;

    var projection = d3.geoOrthographic()
      .translate([width / 2, height / 2])
      .scale(width / 2 - 20)
      .clipAngle(90)
      .precision(0.6);

    var canvas = d3.select("figure#world-tour").append("canvas")
      .attr("width", width)
      .attr("height", height);

    var c = canvas.node()!.getContext("2d");

    var path = d3.geoPath()
      .projection(projection)
      .context(c);

    var title = d3.select("h1");

    /*queue()
      .defer(d3.json, "/assets/data/world-tour/world-110m.json")
      .defer(d3.tsv, "/assets/data/world-tour/world-country-names.tsv")
      .await(ready);*/

    Promise.all([
      d3.json("/assets/data/world-tour/world-110m.json"),
      d3.tsv("/assets/data/world-tour/world-country-names.tsv")
    ]).then(function (files) {
      ready(null, files[0], files[1]);
    }).catch(function (err) {
      console.log(err);
    });

    function ready(error: any, world: any, names: any) {
      if (error) throw error;

      var globe: any = { type: "Sphere" },
        land = topojson.feature(world, world.objects.land),
        countries: any = getCountries(world),
        borders = topojson.mesh(world, world.objects.countries, function (a, b) { return a !== b; }),
        i = -1,
        n = countries.length;

      function getCountries(world: any): Array<Feature> {
        var countriesFeatures: any = topojson.feature(world, world.objects.countries);
        return countriesFeatures.features;
      }

      countries = countries.filter(function (d: any) {
        return names.some(function (n: any) {
          if (d.id == n.id) return d.name = n.name;
        });
      }).sort(function (a: any, b: any) {
        return a.name.localeCompare(b.name);
      });

      (function transition() {
        d3.transition()
          .duration(1250)
          .on("start", function () {
            title.text(countries[i = (i + 1) % n].name);
          })
          .tween("rotate", function () {
            var p = d3.geoCentroid(countries[i]),
              r = d3.interpolate(projection.rotate(), [-p[0], -p[1]]);
            return function (t) {
              let arr: number[] = r(t);
              projection.rotate([arr[0], arr[1]]);
              c!.clearRect(0, 0, width, height);
              c!.fillStyle = "#ccc", c!.beginPath(), path(land), c!.fill();
              c!.fillStyle = "#f00", c!.beginPath(), path(countries[i]), c!.fill();
              c!.strokeStyle = "#fff", c!.lineWidth = .5, c!.beginPath(), path(borders), c!.stroke();
              c!.strokeStyle = "#000", c!.lineWidth = 2, c!.beginPath(), path(globe), c!.stroke();
            };
          })
          .transition()
          .on("end", transition);
      })();
    }

    d3.select(self.frameElement).style("height", height + "px");
  }

}

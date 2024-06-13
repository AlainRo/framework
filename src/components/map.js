import * as Plot from "npm:@observablehq/plot";
import * as d3 from "npm:d3";
import {button} from "npm:@observablehq/inputs";
import * as htl from "npm:htl";
import * as L from "npm:leaflet";

export function map(data, div, {width, height} = {}) {
    const map = L.map(div).setView([43.6, 1.451], 13); // higher numbers are more zoomed in
        map.options.maxZoom = 15;
        map.options.minZoom = 11;

    L.tileLayer(
        "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
        attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }
    ).addTo(map);

    L.svg().addTo(map);
    const overlay = d3.select(map.getPanes().overlayPane);
    const svg = overlay.select("svg");
  
    const color = d3
      .scaleOrdinal()
      .domain([1, 2, 3, 4, 5])
      .range(["green", "green", "#fe9929", "#d95f0e", "red"]);
  
    const intensity = d3
      .scaleOrdinal()
      .domain([0, 1, 2, 3, 4, 5])
      .range([0, 4, 8, 12, 16, 20]);
  
    const zoomcorrection = d3.scaleLinear().domain([12, 19]).range([1, 10]);
  
    const duration = d3
      .scaleLinear()
      .domain([1, 30, 60, 90]) // 3 months is the highest visible
      .clamp(true)
      .range([0, 0.4, 0.6, 1]);
  
    const colorDuration = d3
      .scaleLinear()
      .domain([1, 4, 12, 25, 52]) // nb of weeks
      .range(["green", "#fe9929", "#d95f0e", "red", "black"]);
  
    data
      .filter((d) => d.startedSince > 0) // && StartedSince(d.datefin) < 0)
      .forEach((d) => {
        let marker = L.marker({
          lng: d.geo_point_2d.lng,
          lat: d.geo_point_2d.lat
        });
     
        marker
          .bindPopup(
            `<h3>${d.prettyVoie}</h3>
            <h4>${d.prettylibelle}</h4>
                <ul>
                    <li>Encore : ${d.encore}</li>
                    <li>Circulation : ${d.circulation}</li>
                </ul>`
          )
          .addTo(map);
        marker.setOpacity(0);
      });
    //------
  
    const CS = svg
      .selectAll("circle")
      .data(data.filter((d) => d.startedSince > 0))
      .enter()
      .append("circle")
      .attr("cx", (d) => map.latLngToLayerPoint(d.geo_point_2d).x)
      .attr("cy", (d) => map.latLngToLayerPoint(d.geo_point_2d).y)
      .attr("r", (e) => {
        return sizeRadius(e);
      })
      .style("stroke-width", (e) => {
        return sizeStroke(e);
      })
      .style("stroke", (e) => {
        return color(e.duree);
      })
      .style("stroke-opacity", 1)
      .style("fill-opacity", 0)
      .style("cursor", "pointer");
  
    // Repositionne les cercles en cas de zoom
    const update = () => {
      CS.attr("cx", (d) => map.latLngToLayerPoint(d.geo_point_2d).x);
      CS.attr("cy", (d) => map.latLngToLayerPoint(d.geo_point_2d).y);
    };
  
    map.on("zoomend", update);
    //-----------------------------------------------------
  
    function size() {
      return Math.max(0, zoomcorrection(map.getZoom()));
    }
    function percentStroke(d) {
      //0 = just border
      //1 = full moon
      var alp = duration(d.duree);
      return alp;
    }
  
    function apparentRadius(d) {
      //return 0.25 * intensity(d.intensity(modeTransport)) * size();
      return 0.25 * intensity(d.duree) * size();
    }
    function sizeStroke(d) {
      var s = percentStroke(d) * apparentRadius(d);
      //if (intensity(d.intensity(modeTransport)) > 19) {
      if (intensity(d.duree) > 19) {
        return Math.max(1, s);
      }
      {
        return Math.max(2, s);
      }
    }
    function sizeRadius(d) {
      var int = apparentRadius(d);
      return int * (1 - percentStroke(d) / 2);
    }
  }
  
  
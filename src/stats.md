---
title: Statistiques
slug: distribution
theme: dashboard
toc: false
---



```js
import {loadchart} from "./components/loadchart.js"
````
```js
const raw= await FileAttachment("./data/travaux.json").json();
const date = raw.shift().datedebut // récupère la date de l'extraction
const data = raw
const pasCommence = data.filter(d => new Date(d.datedebut) -new Date() > 0).length
```
# Les statistiques des chantiers en cours
<div class="grid grid-cols-4">
  <div class="card">
    <h1>Chantiers actifs</h1>
    <span class="big">${(data.length-pasCommence).toLocaleString("fr-FR")}</span>
    <h3>Déclarés : ${data.length.toLocaleString("fr-FR")}</h3>
  </div>
    <div class="card">
    <h1>Date des données</h1>
      <span>${d3.timeFormat("%d-%b-%Y %H:%M")(new Date(date))}</span>
  </div>
  <div class="card">
    <h2>Nombre de déclarants</h2>
    <span class="big">${Array.from(d3.group(data, d => d.declarant)).length}</span>
  </div>
  <div class="card">
    ${resize((width) => 
        Plot.plot({
          title: "Par pôle",
          width,
          height: 100,
          marks: [
            Plot.barY(data, Plot.groupX({ y: "count" }, { x: "pole", fill: "pole", sort:{x:"-y"} })),
            Plot.ruleY([0])
          ]
    })) 
    }
  </div>
  <div class="card">
    ${resize((width) => 
        Plot.plot({
          title: "Par durée en j",
          width,
          height: 100,
          marks: [
            Plot.barY(data, Plot.binX({ y: "count" , filter: d=> d.length> 10}, { x: "duree"})),
            Plot.ruleY([0])
          ]
    }))}
  </div>
  <div class="card">
     <h2>Nombre de communes concernées</h2>
    <span class="big">${Array.from(d3.group(data, d => d.commune)).length}</span> 
  </div>
  <div class="card">
     <h2>Nombre de projets en retard de terminaison</h2>
    <span class="big">${data.filter(d => new Date(d.datefin) - new Date()
    <0 ).length}</span> 
  </div>
  <div class="card">
     <h2>Nombre de projets futurs pas encore commencés</h2>
    <span class="big">${pasCommence}</span> 
  </div>
</div>
  <div class="card">
     <h2>Histogramme des travaux</h2>
      ${display(loadchart(data, {width: 800,height:500}))}
      Ce diagramme est la superposition de chaque chantier [ch
      datedebut, dafefin].
  </div>

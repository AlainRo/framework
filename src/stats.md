---
title: Statistiques
slug: distribution
theme: dashboard
toc: false
---



```js

import {loadchart} from "./components/loadchart.js"
import {compare} from "./components/compare.js"
//import {download} from "./components/download.js" // Inutile pour un fichier statique


const raw = await FileAttachment("./data/travaux.json").json();
````

```js
let fileset=0
fileset = view(Inputs.select(new Map(raw.map((d, i) => [d.date, i])), {
  value: 0, label : "Date à sélectionner"}
));
localStorage.setItem("travaux", fileset.toString())

```


```js
const date = raw[fileset].date
const data = raw[fileset].value

const pasCommence = data.filter(d => new Date(d.datedebut) -new Date() > 0).length
const comp = compare(raw[fileset],raw?.[fileset+1])
const added = comp.added
const modified = comp.modified
const deleted = comp.deleted
const div = display(document.createElement("div"));
const Global = await localStorage.getItem("travaux")

//download(raw);

```


<a href="./history.json" download > History </a>
<a href="./src/data/log.txt" download > Log </a>


# Les statistiques des chantiers en cours
<div class="grid grid-cols-4">
  <div class="card">
    <h1>Chantiers actifs</h1>
    <span class="big">${(data.length-pasCommence).toLocaleString("fr-FR")}</span>
    <h3>Déclarés : ${data.length.toLocaleString("fr-FR")}</h3>
  </div>
    <div class="card">
    <h1>Au :</h1>
      <span class="big">${d3.timeFormat("%d-%b-%Y %H:%M")(new Date(date))}</span>
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
    <span class="big"><font size="7">${data.filter(d => new Date(d.datefin) - new Date()
    <0 ).length}</font></span> 
  </div>
  <div class="card">
     <h2>Nombre de projets futurs pas encore commencés</h2>
    <span class="big">${pasCommence}</span> 
  </div>
</div>
<div class="grid grid-cols-2">
  <div class="card">
     <h2>Histogramme des travaux (Reste A Faire en j)</h2>
      ${loadchart(data, {width: 800,height:500})}
      Ce diagramme est la superposition de chaque chantier [datedebut, dafefin].
  </div>
  <div class="card">
     <h2>Histogramme des travaux à 10 jours (Reste A Faire en j)</h2>
      ${loadchart(data.filter(d => Math.abs((new Date(d.datefin)-new Date())/3600/24/1000
      ) <10), {width: 800,height:500})}
  </div>
</div>
<div class="grid grid-cols-2">
  <div class="card">
     <h2>Longueur de l'historique</h2>
      <span class="big">${raw.length}</span> 
  </div>
  <div class="card">
     <h2>Nombre de travaux éliminés</h2>
      <span class="big">${deleted}</span> 
  </div>
</div>
<div class="grid grid-cols-2">
  <div class="card">
     <h2>Nombre de travaux ajoutés</h2>
      <span class="big">${added}</span> 
  </div>
  <div class="card">
     <h2>Nombre de travaux modifiés</h2>
      <span class="big">${modified}</span> 
  </div>
</div>
<div class="grid grid-cols-2">
  <div class="card">
     <h2>Global variable</h2>
      <span class="big">${fileset}</span> 
  </div>
    <div class="card">
     <h2>Local Storage</h2>
      <span class="big">${Global}</span> 
  </div>

</div>
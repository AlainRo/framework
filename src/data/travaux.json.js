//import {writeFileSync} from 'node:fs/promises'
import { writeFileSync, readFileSync } from 'node:fs';

async function json(url){
    const response = await fetch(url)
    if (!response.ok) throw new Error(`fetch failed: ${response.status}`)
    return await response.json();
}

const raw = await json(  "https://www.data.gouv.fr/fr/datasets/r/706125f9-13de-486d-96c6-cde4be2e4eff")

//const current= await json("./_file/travaux.json")


const StartedSince = (d) => {
    const b = new Date(d);
    const t = new Date();
    return Math.round((t - b) / (24 * 60 * 60 * 1000));
  }
const PrettyVoie = (d) => {
    const ddbl = (d) => {
        //élimine les duplications de voies
        const res = [];
        const list = d.split("|");
        list.forEach((d) => {
          const e = d.trim(d);
          if (!res.includes(e)) res.push(e);
        });
        return res;
      }
      function substWords(s) {
        const word = {
          AV: "avenue",
          DE: "de",
          DES: "des",
          LA: "la",
          LE: "le",
          RPT: "rond point",
          DU: "du",
          RUE: "rue",
          IMP: "impasse",
          CHEM: "chemin",
          D: "d'",
          L: "l'",
          PL: "place",
          BD: "bd",
          RTE: "route",
          ALL: "allée",
          ALLEES: "allées",
          CHE: "chemin",
          QU: "quai"
        };
        const sb = s
          //.replace("?", "'") //inutile
          .split(" ")
          .map((e) => {
            const sub = word[e];
            if (sub === undefined) return capitaliseFirstLetter(e);
            else return sub;
          });
        let rv = "";
        sb.forEach((e) => {
          rv = rv + e + " ";
        });
        return rv;
      }
    return ddbl(d).map((e) => substWords(e));
  }
const PrettyLibelle = (d) => {
    return d.replace("?", "'").split("-")[1];
  }

function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

function PrettyDuration(d) {
    function plural(e) {
      return Math.floor(e) > 1 ? "s" : "";
    }
    if (d < 0) {
      return " en retard";
    }
    if (d < 14) {
      return Math.floor(d + 0.5) + " jour" + plural(d + 0.5);
    }
    if (d > 13 && d < 60) {
      return Math.floor((d + 5) / 7) + " semaine" + plural((d + 5) / 7);
    }
    if (d > 59 && d < 500) {
      return Math.floor((d + 15) / 30) + " mois";
    }
    if (d > 499) {
      return Math.floor((d + 100) / 365) + " an" + plural((d + 100) / 365);
    }
  }
  

  
const data = raw.map((d) => {
    // Quelques adaptations et traitements
    d.geo_point_2d.lng = d.geo_point_2d.lon;
    delete d.geo_point_2d["lon"];
    d.startedSince=StartedSince(d.datedebut)
    d.encore= PrettyDuration((new Date(d.datefin) - new Date()) / (1000 * 60 * 60 * 24));
    d.prettyVoie= PrettyVoie(d.voie)
    d.prettylibelle= PrettyLibelle(d.libelle)
    delete d.voie
    delete d.libelle

    return d;
  })
// Recover history
let historyF = "[]";
try {
  historyF = readFileSync('./src/data/history.json')
}
catch (err) {
  console.error(err)
}
 const  history = JSON.parse(historyF)
 // Add the time of exact run time
 history.unshift({date: new Date(), value: data});
 const hist = JSON.stringify(history)
 try {
   writeFileSync('src/data/history.json', hist);
   // file written successfully
 } catch (err) {
   console.error(err);
 }

//console.error(content)
process.stdout.write(hist)
import * as Plot from "npm:@observablehq/plot";

export function loadchart(data, {width, height} = {}) {

    // Calcule les bornes de dates
    const rv = [];
    let cumul = 0;
    data.forEach((d) => {
      rv.push({ date: new Date(d.datedebut), val: 1, in: d.numero });
      rv.push({ date: new Date(d.datefin), val: -1, out: d.numero });
    });
    const projs = rv.sort((a, b) => a.date - b.date);
    projs.forEach((d) => {
      cumul += d.val;
      d.cumul = cumul;
    });
 
    const PROJS = new Map(data.map((d) => [d.numero, d]));

    function comp(projs) {
      function weigth(l) {
        // Pour l'instant la somme des durées des projets de l'intervalle
        return Array.from(l).reduce((acc, c) => acc + PROJS.get(c).duree, 0);
      }
      function resteAfaire(l, d) {
        // Pour l'instant la somme des restes à faire des projets à date en années/h
        return Math.floor(
          Array.from(l).reduce(
            (acc, c) =>
              acc +
              PROJS.get(c).duree -
              Math.max(
                0,
                (new Date(PROJS.get(c).datefin) - new Date(d)) / 3600 / 24 / 1000
              ),
            0
          ) / 365
        );
      }
      const rv = [];
      let i = 0;
      let date = 0;
      let sins = [];
      let sout = [];
      let cumul = 0;
      const curSet = new Set();
      while (true) {
        const current = projs[i];
        if (current.date.toString() == date.toString()) {
          if (current.val > 0) sins.push(current.in);
          if (current.val < 0) sout.push(current.out);
        } else {
          const val = sins.length - sout.length;
          sins.forEach((d) => curSet.add(d));
          sout.forEach((d) => curSet.delete(d));
          cumul += val;
          rv.push({
            date: date,
            ins: sins,
            out: sout,
            val: val,
            cumul: cumul,
            set: new Set(curSet),
            weight: weigth(curSet),
            raf: resteAfaire(curSet, date)
          });
          date = current.date;
          sins = current.in ? [current.in] : [];
          sout = current.out ? [current.out] : [];
        }
        i += 1;
        if (i === projs.length) break;
      }
      return rv.slice(1);
    }

const redux = comp(projs)
/*
    //Calcule le diagramme
    return Plot.plot({
        width,
        height,
        marks: [
          Plot.lineY(projs, { x: "date", y: "cumul", tip: true, curve: "step-after" }),
          Plot.ruleY([0])
        ]
      })
*/
return Plot.plot({
  color: { type: "linear", legend: true },
  width,
  height,
  marks: [
    Plot.areaY(
      redux,
      {
        x: "date",
        y: "cumul",
        fill: "raf",
        curve: "step-after",
        z: null,
        channels: {
          date: "date",
          raf: { value: "raf", label: "Reste à faire " },
          cumul: { value: "cumul", label: "Nombre de chantiers" }
        },
        tip: {
          format: {
            date: true,
            "Reste à faire": (d) => `: ${d} chantiersxAn`,
            "Nombre de chantiers": (d) => `: ${d}`
          }
        }
      }
    ),
    Plot.ruleY([0])
  ]
})     


    }
import * as Plot from "npm:@observablehq/plot";

export function loadchart(data, {width, height} = {}) {
  console.log('loadchart')
    // Calcule les bornes de dates
    const rv = [];
    let cumul = 0;
    data.forEach((d) => {
      rv.push({ date: new Date(d.datedebut), val: 1, in: d.numero });
      rv.push({ date: new Date(d.datefin), val: -1, out: d.numero });
    });
    const dataF = rv.sort((a, b) => a.date - b.date);
    dataF.forEach((d) => {
      cumul += d.val;
      d.cumul = cumul;
    });
    console.log(dataF)

    //Calcule le diagramme
    return Plot.plot({
        width,
        height,
        marks: [
          Plot.lineY(dataF, { x: "date", y: "cumul", curve: "step-after" }),
          Plot.ruleY([0])
        ]
      })
    }
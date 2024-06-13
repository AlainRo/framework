---
title: Table
slug: table
---

# Les chantiers Toulousains en date du ${formatDate(date)}

```js
const chantiers = await FileAttachment("./data/travaux.json").json();
const date = chantiers.shift().datedebut
const formatDate = d => d3.timeFormat("%d-%b-%Y")(new Date(d.substring(0,10)))
display(Inputs.table(chantiers, {format:{
    datedebut: d => formatDate(d),
    datefin: d => formatDate(d)}
        ,
    columns:[
        "commune",
        "datedebut",
        "datefin" ,
        "duree", 
        ],
    width: {duree: 20,
        datedebut: 30,
        datefin:30,
        commune: 30
    },
    rows: 20}
));
```


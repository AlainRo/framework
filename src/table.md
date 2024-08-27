---
title: Table
slug: table
theme: dark
---



```js
const raw = await FileAttachment("./data/travaux.json").json();
````

```js
let fileset = +localStorage.getItem("travaux")
fileset = fileset?fileset:0
const date = raw[fileset].date
const chantiers = raw[fileset].value
const formatDate = d => d3.timeFormat("%d-%b-%Y")(new Date(d.substring(0,10)))
````

# Les chantiers Toulousains en date du ${formatDate(raw?.[fileset]?.date)}

# Les chantiers Toulousains en date du ${fileset}

```js

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


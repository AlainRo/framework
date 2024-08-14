---
title: Carte
slug: travaux
toc: false
theme: wide
---

# La carte interactive des chantiers Toulousains au ${formatDate(date)}

![](./legend.svg)
```js
const raw = await FileAttachment("./data/travaux.json").json();
const date = raw[0].date
const chantiers = raw[0].value
const formatDate = d => d3.timeFormat("%d-%b-%Y")(new Date(d.substring(0,10)))
import {map} from "./components/map.js"
```

```js
const div = display(document.createElement("div"));
div.style = "height: 600px;";
map(chantiers, div, {width: width,height:800})
```



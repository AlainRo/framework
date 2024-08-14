//import { writeFileSync, readFileSync } from 'node:fs';

export function compare(present, past) {
    const PAST = new Map(past.value.map(d=> [d.numero, d]))
    const PRESENT = new Map(present.value.map(d=> [d.numero, d]))
    let added =0
    Array.from(PRESENT).forEach(d => {if (PAST.get(d[0]) === undefined) added +=1})
    let deleted =0
    Array.from(PAST).forEach(d => {if (PRESENT.get(d[0]) === undefined) deleted +=1})    

    return {added : added, deleted: deleted, modified: 0}
}

export function remove(date) {
    // load history
    let historyF = "[]";
    try {
      historyF = readFileSync('./src/data/history.json')
    }
    catch (err) {
      console.error(err)
    }
    const  history = JSON.parse(historyF)  
// remove entry
    const remo = history.filter(d => d.date !== date)
//save history
    const hist = JSON.stringify(remo)
    try {
        writeFileSync('src/data/history.json', hist);
    // file written successfully
    } catch (err) {
        console.error(err);
    }
}
export function download() {
    // load history
}
    
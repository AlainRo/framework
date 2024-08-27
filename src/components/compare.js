//import { writeFileSync, readFileSync } from 'node:fs';

export function compare(present, past) {
    if (past === undefined) return {added : 'none', deleted: 'none', modified: 'none'}
    const PAST = new Map(past.value.map(d=> [d.numero, d]))
    const PRESENT = new Map(present.value.map(d=> [d.numero, d]))
    let added =0
    Array.from(PRESENT).forEach(d => {if (PAST.get(d[0]) === undefined) added +=1})
    let deleted =0
    Array.from(PAST).forEach(d => {if (PRESENT.get(d[0]) === undefined) deleted +=1})    

    return {added : added, deleted: deleted, modified: 0}
}

export function remove(n) {
    // load history
    let history = [];
    try {
      const historyF = readFileSync('./src/data/history.json')
      history = JSON.parse(historyF)  
    }
    catch (err) {
      console.error(err)
    }

// remove entry
    const remo = history.filter((d,i) => i!== n)
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

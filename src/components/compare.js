
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


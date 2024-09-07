
export function compare(present, past) {
    if (past === undefined) return {added : 'none', deleted: 'none', modified: 'none'}
    const PAST = new Map(past.value.map(d=> [d.numero, d]))
    const PRESENT = new Map(present.value.map(d=> [d.numero, d]))
    let added = []
    let modified = []
    Array.from(PRESENT).forEach(d => 
        {const past = PAST.get(d[0])
            if (past === undefined) {added.push(past)}
            else {if (!deepEqual(d[1], past[1])) modified.push(d)}
    })


    let deleted = []
    Array.from(PAST).forEach(d => {
        const present = PRESENT.get(d[0])
        if (present === undefined) deleted.push(present)}) 
    
/*
    Array.from(PRESENT).forEach(d => {if (PAST.get(d[0]) !== undefined)
        {if (!deepEqual(d[1], PAST.get(d[0]))) modified.push(PAST.get(d[0]))}
    })
*/
    return {added : added.length, deleted: deleted.length, modified: modified.length}
}

export function deepEqual(x, y){
    if (x === y) {
      return true;
    }
    else if ((typeof x == "object" && x != null) && (typeof y == "object" && y != null)) {
      if (Object.keys(x).length != Object.keys(y).length)
        return false;
  
      for (var prop in x) {
        if (y.hasOwnProperty(prop))
        {  
          if (! deepEqual(x[prop], y[prop]))
            return false;
        }
        else
          return false;
      }
      
      return true;
    }
    else 
      return false;
  }
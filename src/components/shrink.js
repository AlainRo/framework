// Algo shrink
// Trouver le plus grand sous-ensemble qui ne change pas sur la période -> le stocker EQUAL [début, fin]
// Trouver les ajoutés groupés par date ADDED {date : , list : []}
// Trouver les éliminés groupés par data DELETED {date : , list : []}

// Il faut trier par date, de manière à n'avoir à parser que le nécessaire.

// OU ALORS:
// Juste un algo de compression/décompression utilisé avant chaque traitement

// ON INVERSE : LISTE DES CHANTIERS avec pour chaque la liste des modifs 








export function shrink_coord(data, n){
// scan every number and limit to n digits
    const isNumeric = (num) => (typeof(num) === 'number' || typeof(num) === "string" && num.trim() !== '') && !isNaN(num);
    if (isNumeric(data)) return data.toPrecision(n) 
    if (Array.isArray(data)
        return data.map(shrink_coord);
    if (typeof data === 'object' &&& data !==null)
        return Object.keys(data).map(d => shrink_coord(data[d]))
    return data
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
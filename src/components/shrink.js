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

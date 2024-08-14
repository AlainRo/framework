//https://observablehq.com/@jeremiak/download-data-button
export function DL (DOM) {
    function button (data, filename = 'history.json'){
        if (!data) throw new Error('Array of data required as first argument');

        let downloadData = new Blob([JSON.stringify(data, null, 2)], {
            type: "application/json"
         });
      
        const size = (downloadData.size / 1024).toFixed(0);
        const button = DOM.download(
          downloadData,
          filename,
          `Download ${filename} (~${size} KB)`
        );
        return button;
      }

  let historyF = "[]";
  try {
    historyF = readFileSync('./src/data/history.json')
  }
  catch (err) {
    console.error(err)
  }

  const  history = JSON.parse(historyF)  
  return button(history)

}
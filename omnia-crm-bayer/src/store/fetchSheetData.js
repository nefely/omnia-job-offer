const sheetUrl = 'https://docs.google.com/spreadsheets/d/1MLOLRW-8YpYFOFfi0A1g82XcYUuJKri844UFiPaYuB8/gviz/tq?tqx=out:json';

export const fetchSheetData = async () => {
  const response = await fetch(sheetUrl);
  const text = await response.text();
  const json = JSON.parse(text.replace("/*O_o*/\ngoogle.visualization.Query.setResponse(", "").slice(0, -2));

  const rows = json.table.rows.map(row => row.c.map(cell => (cell ? cell.v : "")));
  const rawHeaders = rows[0];

  const headers = ["Buyer" , "Date" , "Revenue" , "Cost" , "Profit" , "ROI"];

  const data = rows.map(row => {
    return row.reduce((obj, val, i) => {
      obj[headers[i]] = val;
      return obj;
    }, {});
  });

  return data;
};

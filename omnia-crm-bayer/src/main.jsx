// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import 'bootstrap/dist/css/bootstrap.min.css';

// import { createStore } from 'redux';
// import { Provider } from 'react-redux';

// const sheetUrl = 'https://docs.google.com/spreadsheets/d/1MLOLRW-8YpYFOFfi0A1g82XcYUuJKri844UFiPaYuB8/gviz/tq?tqx=out:json';

// export const fetchSheetData = async () => {
//     const response = await fetch(sheetUrl);
//     const text = await response.text();
//     const json = JSON.parse(text.replace("/*O_o*/\ngoogle.visualization.Query.setResponse(", "").slice(0, -2));
//     const rows = json.table.rows.map(row => row.c.map(cell => (cell ? cell.v : "")));
//     const headers = ["Buyer" , "Date" , "Revenue" , "Cost" , "Profit" , "ROI"];

//     const data = rows.map(row => {
//         return row.reduce((obj, val, i) => {
//             obj[headers[i]] = val;
//             return obj;
//         }, {});
//     });

//     return data; 
// };

// fetchSheetData().then((sheetData) => {
//     const defaultState = {
//         sheet: sheetData
//     };

//     const reducer = (state = defaultState, action) => {
//         switch (action.type) {
//             case "ADD_CASH":
//                 return { ...state, cash: state.cash + action.payload };
//             case "GET_CASH":
//                 return { ...state, cash: state.cash - action.payload };
//             default:
//                 return state;
//         }
//     };

//     const store = createStore(reducer);

//     createRoot(document.getElementById('root')).render(
//         <StrictMode>
//             <Provider store={store}>
//                 <App />
//             </Provider>
//         </StrictMode>
//     );
// });


import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './store.js';
import { fetchSheetData } from './fetchSheetData.js';

fetchSheetData().then((sheetData) => {
  store.dispatch({ type: "SET_SHEET_DATA", payload: sheetData });
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);




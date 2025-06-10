import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from './store/store.js';
import { fetchSheetData } from './store/fetchSheetData.js';

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




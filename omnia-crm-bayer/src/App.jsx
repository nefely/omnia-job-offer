import { useSelector } from 'react-redux';

const CrmPanel = () => {
  const sheet = useSelector(state => state.sheet); // масив об'єктів

  if (!sheet || sheet.length === 0) {
    return <p>Loading data...</p>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-3">CRM Panel</h2>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>Buyer</th>
            <th>Date</th>
            <th>Revenue ($)</th>
            <th>Cost ($)</th>
            <th>Profit ($)</th>
            <th>ROI (%)</th>
          </tr>
        </thead>
        <tbody>
          {sheet.map((row, i) => (
            <tr key={i}>
              <td>{row.Buyer}</td>
              <td>{row.Date}</td>
              <td>{row.Revenue}</td>
              <td>{row.Cost}</td>
              <td>{row.Profit}</td>
              <td>{row.ROI}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrmPanel;

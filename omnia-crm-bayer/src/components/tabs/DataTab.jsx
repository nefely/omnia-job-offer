import { useSelector } from 'react-redux';

 const TableStats = () => {
  const sheet = useSelector(state => state.sheet);

  if (!sheet || sheet.length === 0) {
    return (<div className="mt-4"><h2 className="mb-3">Data</h2><p>Loading data...</p></div>)
  }

  return (
    <div className="mt-4">
        <h2 className="mb-3">Data</h2>
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

export default TableStats


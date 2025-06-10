import { useSelector } from 'react-redux';

const DashboardStats = () => {
    const sheet = useSelector(state => state.sheet);

    if (!sheet || sheet.length === 0) {
        return (
            <div className="cards-grp cards-grp--dashbosrd-stats">
                {[...Array(8)].map((_, i) => (
                    <div className="card" key={i}>
                        <h6 className="mb-3">{[
                            "Yesterday Cost",
                            "Yesterday Revenue",
                            "Yesterday Profit",
                            "Yesterday ROI",
                            "This Month Cost",
                            "This Month Revenue",
                            "This Month Profit",
                            "This Month ROI"
                        ][i]}</h6>
                        <p className="value">Loading...</p>
                        <p className='change'>Loading...</p>
                    </div>
                ))}
            </div>
        );
    }

    // Parse date from string like "Date(2025,1,27)"
    const parseDate = (dateStr) => {
        const match = /Date\((\d+),(\d+),(\d+)\)/.exec(dateStr);
        if (!match) return null;
        const [, year, month, day] = match.map(Number);
        return new Date(year, month, day);
    };

    // Convert all rows
    const rows = sheet.map(entry => ({
        ...entry,
        parsedDate: parseDate(entry.Date)
    }));

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const yesterdayRows = rows.filter(row =>
        row.parsedDate &&
        row.parsedDate.getFullYear() === yesterday.getFullYear() &&
        row.parsedDate.getMonth() === yesterday.getMonth() &&
        row.parsedDate.getDate() === yesterday.getDate()
    );

    const thisMonthRows = rows.filter(row =>
        row.parsedDate &&
        row.parsedDate.getFullYear() === new Date().getFullYear() &&
        row.parsedDate.getMonth() === new Date().getMonth()
    );

    const sumField = (arr, field) => arr.reduce((acc, item) => acc + Number(item[field] || 0), 0);

    const yCost = sumField(yesterdayRows, 'Cost').toFixed(2);
    const yRevenue = sumField(yesterdayRows, 'Revenue').toFixed(2);
    const yProfit = sumField(yesterdayRows, 'Profit').toFixed(2);
    const yROI = sumField(yesterdayRows, 'ROI').toFixed(2);

    const mCost = sumField(thisMonthRows, 'Cost').toFixed(2);
    const mRevenue = sumField(thisMonthRows, 'Revenue').toFixed(2);
    const mProfit = sumField(thisMonthRows, 'Profit').toFixed(2);
    const mROI = sumField(thisMonthRows, 'ROI').toFixed(2);

    return (
        <div className="cards-grp cards-grp--dashbosrd-stats">
            <div className="card">
                <h6 className="mb-3">Yesterday Cost</h6>
                <p className="value">${yCost}</p>
                <p className='change'></p>
            </div>
            <div className="card">
                <h6 className="mb-3">Yesterday Revenue</h6>
                <p className="value">${yRevenue}</p>
                <p className='change'></p>
            </div>
            <div className="card">
                <h6 className="mb-3">Yesterday Profit</h6>
                <p className="value">${yProfit}</p>
                <p className='change'></p>
            </div>
            <div className="card">
                <h6 className="mb-3">Yesterday ROI</h6>
                <p className="value">{yROI}%</p>
                <p className='change'></p>
            </div>
            <div className="card">
                <h6 className="mb-3">This Month Cost</h6>
                <p className="value">${mCost}</p>
                <p className='change'></p>
            </div>
            <div className="card">
                <h6 className="mb-3">This Month Revenue</h6>
                <p className="value">${mRevenue}</p>
                <p className='change'></p>
            </div>
            <div className="card">
                <h6 className="mb-3">This Month Profit</h6>
                <p className="value">${mProfit}</p>
                <p className='change'></p>
            </div>
            <div className="card">
                <h6 className="mb-3">This Month ROI</h6>
                <p className="value">{mROI}%</p>
                <p className='change'></p>
            </div>
        </div>
    );
};

export default DashboardStats;

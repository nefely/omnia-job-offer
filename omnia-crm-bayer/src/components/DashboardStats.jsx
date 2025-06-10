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

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const dayBeforeYesterday = new Date(today);
    dayBeforeYesterday.setDate(today.getDate() - 2);

    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const lastMonth = new Date(currentYear, currentMonth - 1);

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

    const dayBeforeYesterdayRows = rows.filter(row =>
        row.parsedDate &&
        row.parsedDate.getFullYear() === dayBeforeYesterday.getFullYear() &&
        row.parsedDate.getMonth() === dayBeforeYesterday.getMonth() &&
        row.parsedDate.getDate() === dayBeforeYesterday.getDate()
    );

    const lastmonthRows = rows.filter(row =>
        row.parsedDate &&
        row.parsedDate.getFullYear() === lastMonth.getFullYear() &&
        row.parsedDate.getMonth() === lastMonth.getMonth()
    );

    const getChange = (current, previous) => {
        const curr = parseFloat(current);
        const prev = parseFloat(previous);
        if (prev === 0) return { percent: 0, direction: '' };
        const percent = ((curr - prev) / Math.abs(prev)) * 100;
        const direction = percent === 0 ? '' : percent > 0 ? true : false;
        const arrow = direction ? <i className="fa-solid fa-up-long"></i> : <i className="fa-solid fa-down-long"></i>
        return { percent: Math.abs(percent).toFixed(2), direction , arrow };
    };

    const sumField = (arr, field) => arr.reduce((acc, item) => acc + Number(item[field] || 0), 0);
    const avgField = (arr, field) => arr.length === 0 ? 0 : arr.reduce((acc, item) => acc + Number(item[field] || 0), 0) / arr.length;

    const yCost = sumField(yesterdayRows, 'Cost').toFixed(2);
    const yRevenue = sumField(yesterdayRows, 'Revenue').toFixed(2);
    const yProfit = sumField(yesterdayRows, 'Profit').toFixed(2);
    const yROI = avgField(yesterdayRows, 'ROI').toFixed(2);

    const mCost = sumField(thisMonthRows, 'Cost').toFixed(2);
    const mRevenue = sumField(thisMonthRows, 'Revenue').toFixed(2);
    const mProfit = sumField(thisMonthRows, 'Profit').toFixed(2);
    const mROI = avgField(thisMonthRows, 'ROI').toFixed(2);

    const dbCost = sumField(dayBeforeYesterdayRows, 'Cost').toFixed(2);
    const dbRevenue = sumField(dayBeforeYesterdayRows, 'Revenue').toFixed(2);
    const dbProfit = sumField(dayBeforeYesterdayRows, 'Profit').toFixed(2);
    const dbROI = avgField(dayBeforeYesterdayRows, 'ROI').toFixed(2);

    const mlCost = sumField(lastmonthRows, 'Cost').toFixed(2);
    const mlRevenue = sumField(lastmonthRows, 'Revenue').toFixed(2);
    const mlProfit = sumField(lastmonthRows, 'Profit').toFixed(2);
    const mlROI = avgField(lastmonthRows, 'ROI').toFixed(2);

    const costChange = getChange(yCost, dbCost);
    const revenueChange = getChange(yRevenue, dbRevenue);
    const profitChange = getChange(yProfit, dbProfit);
    const roiChange = getChange(yROI, dbROI);

    const monthCostChange = getChange(mCost, mlCost);
    const monthRevenueChange = getChange(mRevenue, mlRevenue);
    const monthProfitChange = getChange(mProfit, mlProfit);
    const monthRoiChange = getChange(mROI, mlROI);

    return (
        <div className="cards-grp cards-grp--dashbosrd-stats">
            <div className="card">
                <h6 className="mb-3">Yesterday Cost</h6>
                <p className="value">${yCost}</p>
                <p className={costChange.direction ? 'change text-success' : "change text-danger"}>{costChange.arrow} {costChange.percent}%</p>
            </div>
            <div className="card">
                <h6 className="mb-3">Yesterday Revenue</h6>
                <p className="value">${yRevenue}</p>
                <p className={revenueChange.direction ? 'change text-success' : "change text-danger"}>{revenueChange.arrow} {revenueChange.percent}% </p>
            </div>
            <div className="card">
                <h6 className="mb-3">Yesterday Profit</h6>
                <p className="value">${yProfit}</p>
                <p className={profitChange.direction ? 'change text-success' : "change text-danger"}>{profitChange.arrow} {profitChange.percent}%</p>
            </div>
            <div className="card">
                <h6 className="mb-3">Yesterday ROI</h6>
                <p className="value">{yROI}%</p>
                <p className={roiChange.direction ? 'change text-success' : "change text-danger"}>{roiChange.arrow} {roiChange.percent}%</p>
            </div>
            <div className="card">
                <h6 className="mb-3">This Month Cost</h6>
                <p className="value">${mCost}</p>
                <p className={monthCostChange.direction ? 'change text-success' : "change text-danger"}>{monthCostChange.arrow} {monthCostChange.percent}%</p>
            </div>
            <div className="card">
                <h6 className="mb-3">This Month Revenue</h6>
                <p className="value">${mRevenue}</p>
                <p className={monthRevenueChange.direction ? 'change text-success' : "change text-danger"}>{monthRevenueChange.arrow} {monthRevenueChange.percent}%</p>
            </div>
            <div className="card">
                <h6 className="mb-3">This Month Profit</h6>
                <p className="value">${mProfit}</p>
                <p className={monthProfitChange.direction ? 'change text-success' : "change text-danger"}>{monthProfitChange.arrow} {monthProfitChange.percent}%</p>
            </div>
            <div className="card">
                <h6 className="mb-3">This Month ROI</h6>
                <p className="value">{mROI}%</p>
                <p className={monthRoiChange.direction ? 'change text-success' : "change text-danger"}>{monthRoiChange.arrow} {monthRoiChange.percent}%</p>
            </div>
        </div>
    );
};

export default DashboardStats;

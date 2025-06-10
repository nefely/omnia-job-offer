import TableStats from "./tabs/DataTab"
import DashboardTab from "./tabs/DashboardTab"
import BayersTab from "./tabs/BayersTab"

const CrnPanel = () => {
    return (
        <>  
            <div className="container mt-4">
                <h1 className="title mb-3">CRM Panel</h1>
                <DashboardTab />
                <BayersTab />
                <TableStats />
            </div>
        </>
    )
}

export default CrnPanel
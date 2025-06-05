import {useDispatch, useSelector} from "react-redux"

export default function crnPanel() {

    const dispatch = useDispatch()
    const sheet = useSelector(state => state.sheet)

    return (
        <>
            <div className="crm-panel">
                <pre>This is CRM Panel: {JSON.stringify(sheet, null, 2)}</pre>
            </div>
        </>
    )
}
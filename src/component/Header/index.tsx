import Card from "../Card";
import AttachIcon from "@assets/svg/attach.svg"
import { TickGreenIcon } from "../../lib/icons";
import { withContext } from "../../context/appContext";
import { Link } from "react-router-dom";
function Header({context}:any) {
    const { settings } = context
    return <div className='header-app mb-4'>
        <Card className="d-flex align-items-center justify-content-between w-100 p-4 flex-row">
            <div className="d-flex align-items-center">
                <label className="d-flex align-items-center"><img src={AttachIcon} className='me-1' /> API Connection:</label>
                {settings?.ibkr ? <span className="d-flex align-items-center"><TickGreenIcon className={'me-1 connected'}/> Connected</span>:<Link className="btn btn-primary d-flex align-items-center" to='/onboarding'>Link IBKR</Link>}
            </div>
            <div className="d-flex align-items-center">
                <label>Wallet:</label>
                {settings?.metamask_address ? <span className="d-flex align-items-center"><TickGreenIcon className={'me-1 connected'}/> Connected</span>:<Link className="btn btn-primary d-flex align-items-center" to='/onboarding'>Link Wallet</Link>}
            </div>
        </Card>
    </div>
}
export default withContext(Header)
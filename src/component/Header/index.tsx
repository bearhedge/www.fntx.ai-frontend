import Card from "../Card";
import TickIcon from "@assets/svg/tick.svg"
import AttachIcon from "@assets/svg/attach.svg"
import { TickGreenIcon } from "../../lib/icons";
export default function Header() {
    return <div className='header-app mb-4'>
        <Card className="d-flex align-items-center justify-content-between w-100 p-4 flex-row">
            <div className="d-flex align-items-center">
                <label className="d-flex align-items-center"><img src={AttachIcon} className='me-1' /> API Connection:</label>
                <span className="d-flex align-items-center"><TickGreenIcon className={'me-1'}/> Connected</span>
            </div>
            <div className="d-flex align-items-center">
                <label>Wallet:</label>
                <span className="d-flex align-items-center"><TickGreenIcon className={'me-1'}/> Connected</span>
            </div>
        </Card>
    </div>
}
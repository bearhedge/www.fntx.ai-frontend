import Card from "../Card";
import TickIcon from "@assets/svg/tick.svg"
import AttachIcon from "@assets/svg/attach.svg"
export default function Header() {
    return <div className='header-app'>
        <Card className="d-flex align-items-center justify-content-between w-100 flex-row">
            <div className="d-flex align-items-center">
                <label className="d-flex align-items-center"><img src={AttachIcon} className='me-1' /> API Connection:</label>
                <span className="d-flex align-items-center"><img src={TickIcon} className='me-1' /> Connected</span>
            </div>
            <div className="d-flex align-items-center">
                <label>Wallet:</label>
                <span className="d-flex align-items-center"><img src={TickIcon} className='me-1' /> Connected</span>
            </div>
        </Card>
    </div>
}
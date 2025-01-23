import { TickGreenIcon } from "../../../lib/icons";
import { onKeyPress } from "../../../lib/utilits";
import RadioCheckboxOption from "../../RadioCheckbox";
import Card from "../../Card";
import Button from "../../form/button";
import Input from "../../form/input";
interface Iprops {
    handleTabChange: () => void;
    handleTabPrevious: (value: number) => void;
}
export default function Manage({ handleTabChange, handleTabPrevious }: Iprops) {
    return <div className="system-trade">
        <Card>
            <div className="row mb-3">
                <div className="col-12 mb-3">
                    <div className="switch d-flex align-items-center justify-content-end">
                        <input type="checkbox" /> <span className="ms-3">IDE</span>
                    </div>
                </div>
                <div className="col-12 mt-1">
                    <h4 className="mb-3 pb-3">Inventory Profit & Loss</h4>
                </div>
                <div className="col-12 col-25 mb-1">
                    <RadioCheckboxOption
                        type="checkbox"
                        label="Contract"
                        value="Contract"
                        id="Contract"
                    />
                </div>
                <div className="col-12 col-25 mb-1">
                    <RadioCheckboxOption
                        type="checkbox"
                        label="Volume"
                        value="Volume"
                        id="Volume"
                    />
                </div>
                <div className="col-12 col-25 mb-1">
                    <RadioCheckboxOption
                        type="checkbox"
                        label="Price Sold"
                        value="Price Sold"
                        id="PriceSold"
                    />
                </div>
                <div className="col-12 col-25 mb-1">
                    <RadioCheckboxOption
                        type="checkbox"
                        label="Current Price"
                        value="Current Price"
                        id="CurrentPrice"
                    />
                </div>
                <div className="col-12 col-25 mb-1">
                    <RadioCheckboxOption
                        type="checkbox"
                        label="PnL"
                        value="PnL"
                        id="PnL"
                    />
                </div>
                <div className="col-12 col-25 mb-1">
                    <RadioCheckboxOption
                        type="checkbox"
                        label="Contract"
                        value="Contract"
                        id="Contract"
                    />
                </div>
                <div className="col-12 col-25 mb-1">
                    <RadioCheckboxOption
                        type="checkbox"
                        label="Volume"
                        value="Volume"
                        id="Volume"
                    />
                </div>
                <div className="col-12 col-25 mb-1">
                    <RadioCheckboxOption
                        type="checkbox"
                        label="Price Sold"
                        value="Price Sold"
                        id="PriceSold"
                    />
                </div>
                <div className="col-12 col-25 mb-1">
                    <RadioCheckboxOption
                        type="checkbox"
                        label="Current Price"
                        value="Current Price"
                        id="CurrentPrice"
                    />
                </div>
                <div className="col-12 col-25 mb-1">
                    <RadioCheckboxOption
                        type="checkbox"
                        label="PnL"
                        value="PnL"
                        id="PnL"
                    />
                </div>
            </div>
        </Card>
        <Card className="mt-4">
            <div className="row mb-3">
                <div className="col-12">
                    <h4 className="mb-3 pb-3">Trade management</h4>
                </div>
                <div className="col-12 col-md-6">
                    <div className="system-trade-card p-4">
                        <h5>Call Contract Bracket Order</h5>
                        <div className="d-flex gap-3 align-items-center system-trade-card-check">
                            <input type='radio' className="d-none" id='limit-sell' />
                            <label htmlFor="limit-sell">
                                <div className="circle"></div>
                                <TickGreenIcon />
                            </label>
                            <div className="system-trade-card-btn mb-0 d-flex align-items-center justify-content-center">Limit Sell</div>
                            <Input type='text' onKeyPress={onKeyPress} />
                        </div>
                        <div className="d-flex gap-3  align-items-center system-trade-card-check">
                            <input type='radio' className="d-none" id='limit-sell' />
                            <label htmlFor="limit-sell">
                                <div className="circle"></div>
                                <TickGreenIcon />
                            </label>
                            <div className="system-trade-card-btn mb-0 d-flex align-items-center justify-content-center">Stop-Loss</div>
                            <Input type='text' onKeyPress={onKeyPress} />
                        </div>
                        <div className="d-flex gap-3  align-items-center system-trade-card-check">
                            <input type='radio' className="d-none" id='limit-sell' />
                            <label htmlFor="limit-sell">
                                <div className="circle"></div>
                                <TickGreenIcon />
                            </label>
                            <div className="system-trade-card-btn mb-0 d-flex align-items-center justify-content-center">Take-profit</div>
                            <Input type='text' onKeyPress={onKeyPress} />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="system-trade-card p-4">
                        <h5>Put Contract Bracket Order</h5>
                        <div className="d-flex gap-3 align-items-center system-trade-card-check">
                            <input type='radio' className="d-none" id='limit-sell' />
                            <label htmlFor="limit-sell">
                                <div className="circle"></div>
                                <TickGreenIcon />
                            </label>
                            <div className="system-trade-card-btn mb-0 d-flex align-items-center justify-content-center">Limit Sell</div>
                            <Input type='text' onKeyPress={onKeyPress} />
                        </div>
                        <div className="d-flex gap-3  align-items-center system-trade-card-check">
                            <input type='radio' className="d-none" id='limit-sell' />
                            <label htmlFor="limit-sell">
                                <div className="circle"></div>
                                <TickGreenIcon />
                            </label>
                            <div className="system-trade-card-btn mb-0 d-flex align-items-center justify-content-center">Stop-Loss</div>
                            <Input type='text' onKeyPress={onKeyPress} />
                        </div>
                        <div className="d-flex gap-3  align-items-center system-trade-card-check">
                            <input type='radio' className="d-none" id='limit-sell' />
                            <label htmlFor="limit-sell">
                                <div className="circle"></div>
                                <TickGreenIcon />
                            </label>
                            <div className="system-trade-card-btn mb-0 d-flex align-items-center justify-content-center">Take-profit</div>
                            <Input type='text' onKeyPress={onKeyPress} />
                        </div>
                    </div>
                </div>
            </div>
            <Button
                className="btn btn-primary btn-next-step mx-auto mt-4"
                onClick={handleTabChange}
            >
                Adjust
            </Button>
        </Card>
        <Card className="mt-4">
            <h4 className="mb-3 pb-3">Strategic Options</h4>
            <div className="system-trade-card p-4 mb-3">
                <div className="row mb-3">
                    <div className="col-12 col-md-4">
                        <h5>Call Contract</h5>
                    </div>
                    <div className="col-12 col-md-4">
                    </div>
                    <div className="col-12 col-md-4">
                        <h5>Put Contract</h5>
                    </div>
                    <div className="col-12 col-md-4">
                        <RadioCheckboxOption
                            type="checkbox"
                            label="Stop-loss"
                            value="Stop-loss"
                            id="Stop-loss"
                            className="font-bold pb-1"
                        />
                        <RadioCheckboxOption
                            type="checkbox"
                            label="Take-profit"
                            value="Take-profit"
                            id="Take-profit"
                            className="font-bold pb-1"
                        />
                    </div>
                    <div className="col-12 col-md-4">
                        <RadioCheckboxOption
                            type="checkbox"
                            label="Close Position"
                            value="Close Position"
                            id="ClosePosition"
                            className="font-bold pb-1"
                        />
                    </div>
                    <div className="col-12 col-md-4">
                        <RadioCheckboxOption
                            type="checkbox"
                            label="Stop-loss"
                            value="Stop-loss"
                            id="Stop-loss"
                            className="font-bold pb-1"
                        />
                        <RadioCheckboxOption
                            type="checkbox"
                            label="Take-profit"
                            value="Take-profit"
                            id="Take-profit"
                            className="font-bold pb-1"
                        />
                    </div>
                </div>
            </div>
            <div className="d-flex align-items-cener justify-content-center mt-4">
                <Button
                    className="btn btn-primary btn-next-step me-2"
                    onClick={() => handleTabPrevious(5)}
                >
                    Previous
                </Button>
                <Button
                    className="btn btn-primary btn-next-step "
                    onClick={handleTabChange}
                >
                    Execute
                </Button>
            </div>
        </Card>
    </div>
}
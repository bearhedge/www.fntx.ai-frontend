import { SystemPagesProps } from "../../../common/type";
import { TickGreenIcon } from "../../../lib/icons";
import { onKeyPress } from "../../../lib/utilits";
import Card from "../../Card";
import Button from "../../form/button";
import Input from "../../form/input";
import RangeSlider from "../RangeSlider";

export default function Trade({ handleTabChange }: SystemPagesProps) {
    return <div className="system-trade">
        <Card>
            <div className="row mb-3">
                <div className="col-12 mb-4">
                    <div className="switch d-flex align-items-center justify-content-end">
                        <input type="checkbox" /> <span className="ms-3">IDE</span>
                    </div>
                </div>
                <div className="col-12 col-md-6 pt-3">
                    <div className="system-trade-card p-4">
                        <h5>Call Bracket Order</h5>
                        <div className="d-flex gap-3">
                            <div className="system-trade-card-btn d-flex align-items-center justify-content-center">Number of Contracts</div>
                            <Input type='text' onKeyPress={onKeyPress} />
                        </div>
                        <div className="d-flex gap-3">
                            <div className="system-trade-card-btn d-flex align-items-center justify-content-center">Limit Sell</div>
                            <Input type='text' onKeyPress={onKeyPress} />
                        </div>
                        <div className="d-flex">
                            <div className="system-trade-card-btn d-flex align-items-center justify-content-center">Stop-Loss</div>
                            <RangeSlider className='mx-3' count={11} oddNumbers={true} />
                            <Input type='text' onKeyPress={onKeyPress} />
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-6 pt-3">
                    <div className="system-trade-card p-4">
                        <h5>Put Bracket Order</h5>
                        <div className="d-flex gap-3">
                            <div className="system-trade-card-btn d-flex align-items-center justify-content-center">Number of Contracts</div>
                            <Input type='text' onKeyPress={onKeyPress} />
                        </div>
                        <div className="d-flex gap-3">
                            <div className="system-trade-card-btn d-flex align-items-center justify-content-center">Limit Sell</div>
                            <Input type='text' onKeyPress={onKeyPress} />
                        </div>
                        <div className="d-flex">
                            <div className="system-trade-card-btn d-flex align-items-center justify-content-center">Stop-Loss</div>
                            <RangeSlider className='mx-3' count={11} oddNumbers={true} />
                            <Input type='text' onKeyPress={onKeyPress} />
                        </div>
                    </div>
                </div>
            </div>
            <Button
                className="btn btn-primary btn-next-step mx-auto mt-4"
            >
                Execute
            </Button>
        </Card>
        <Card className="mt-4">
            <div className="row mb-3">
                <div className="col-12 col-md-6">
                    <div className="system-trade-card p-4">
                        <h5>Call Contract</h5>
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
                    </div>
                </div>
                <div className="col-12 col-md-6">
                    <div className="system-trade-card p-4">
                        <h5>Put Contract</h5>
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
                    </div>
                </div>
            </div>
            <Button
                className="btn btn-primary btn-next-step mx-auto mt-4"
                onClick={handleTabChange}
            >
                Next
            </Button>
        </Card>
    </div>
}
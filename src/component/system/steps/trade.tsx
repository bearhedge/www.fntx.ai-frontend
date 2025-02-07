import * as React from "react";
import { useEffect, useState } from "react";
import Fetch from "../../../common/api/fetch";
import { arrayString, onKeyPress } from "../../../lib/utilits";
import { TickGreenIcon } from "../../../lib/icons";
import Card from "../../Card";
import Button from "../../form/button";
import Input from "../../form/input";
import DialogConfirm from "../../modal";
import RangeSlider from "../RangeSlider";
import Required from "../../form/required";
interface Iprops {
    handleTabChange: () => void;
    selectedOrder: any
    handleTabPrevious: (value: number) => void;
    state: any,
    id:string
}
interface orderList {
    conid: number | null,
    price: number,
    quantity: number,
    limit_sell: number | null,
    stop_loss: number,
    take_profit: number,
    desc?:string
    optionType: string
}
const intialState = {
    conid: null,
    price: 0,
    quantity: 1,
    limit_sell: null,
    stop_loss: 100,
    take_profit: 0,
    optionType: ''
}
export default function Trade({ handleTabChange, handleTabPrevious, selectedOrder, state, id }: Iprops) {
    const [tradeState, setState] = useState<Array<orderList>>([])
    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState('')
    const [errorMessage, setErrorMsg] = useState('')
    useEffect(() => {
        let data: Array<orderList> = []
        if (!selectedOrder?.call && !selectedOrder?.put) {
            handleTabPrevious(4)
        }
        if (selectedOrder.call) {
            const val = selectedOrder?.call?.live_data?.length && selectedOrder?.call?.live_data[0][31]?.replace('C', '')
            data = [...data, { ...intialState, conid: selectedOrder?.call?.conid,desc: selectedOrder?.call?.desc2,price: +val, optionType: 'call' }]
        }
        if (selectedOrder.put) {
            const val = selectedOrder?.put?.live_data?.length && selectedOrder?.put?.live_data[0][31]?.replace('C', '')
            data = [...data, { ...intialState, conid: selectedOrder?.put?.conid,desc: selectedOrder?.put?.desc2, price: +val, optionType: 'put' }]
        }
        setState(data)
    }, [selectedOrder])
    console.log(tradeState);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, key: number) => {
        const { name, value } = e.target
        const param: any = [...tradeState]
        if (name === 'limit_sell') {
            if (/^\d*\.?\d*$/.test(value)) {
                param[key][name] = value
            }
        } else {
            param[key][name] = +value
        }
        setState(param)
    }
    const handlePlaceOrder = () => {
        setIsOpen(!isOpen)
    }
    const handleConfirmOrder = () => {
        Fetch('ibkr/place-order/', { 
            order: tradeState.map((items: any) => { return { ...items, limit_sell: +items.limit_sell,system_data:id  } }),
          },
            
            { method: 'post' }).then(res => {
            if (res.status) {
                handlePlaceOrder()
                setMessage(res.data.message)
                setTimeout(()=>{
                    setMessage('')
                    handleTabChange()
                },3000)
            }else{
                let resErr = arrayString(res);
        setErrorMsg(resErr.error)
            }
        })
    }
    return <div className="system-trade">
        <Card>
            <div className="row mb-3">
                <div className="col-12 mb-4">
                    <div className="switch d-flex align-items-center justify-content-end">
                        <input type="checkbox" /> <span className="ms-3">IDE</span>
                    </div>
                </div>
                {
                    tradeState?.map((items: orderList, key: number) => <div key={key} className="col-12 col-md-6 pt-3">
                        <div className="system-trade-card p-4">
                            <h5>{items.optionType} Bracket Order</h5>
                            <div className="d-flex gap-3">
                                <div className="system-trade-card-btn d-flex align-items-center justify-content-center">Number of Contracts</div>
                                <Input name='quantity' type='text' value={items.quantity} min='1' onKeyPress={onKeyPress} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, key)} />
                            </div>
                            <div className="d-flex gap-3">
                                <div className="system-trade-card-btn d-flex align-items-center justify-content-center">Limit Sell</div>
                                <Input type='text' value={items.limit_sell} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, key)} name='limit_sell' onKeyPress={(e: KeyboardEvent) => onKeyPress(e, /^[0-9]*\.?[0-9]*$/)} />
                            </div>
                            <div className="d-flex">
                                <div className="system-trade-card-btn d-flex align-items-center justify-content-center">Stop-Loss</div>
                                <RangeSlider name='stop_loss' handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, key)} className='mx-3' min={100} max={600} count={11} oddNumbers={true} val={0} />
                                <Input type='text' value={items.stop_loss + '%'} onKeyPress={onKeyPress} disabled />
                            </div>
                            <div className="d-flex">
                                <div className="system-trade-card-btn d-flex align-items-center justify-content-center">Take-Profit</div>
                                <RangeSlider name='take_profit' handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e, key)} className='mx-3' min={0} max={50} count={11} oddNumbers={true} val={0} />
                                <Input type='text' value={items?.take_profit + '%'} onKeyPress={onKeyPress} disabled />
                            </div>
                        </div>
                    </div>)
                }
            </div>
            <Required errorText={errorMessage} />
            <div className="d-flex align-items-cener justify-content-center mt-4">
                <Button
                    className="btn btn-primary btn-next-step me-2"
                    onClick={() => handleTabPrevious(4)}
                >
                    Previous
                </Button>
                <Button
                    disabled={!(state.timer?.place_order === 'N' && tradeState.every((item: any) => item.take_profit !== 0 && item.stop_loss !== 0 && item.limit_sell !== 0))}
                    onClick={handlePlaceOrder}
                    className="btn btn-primary btn-next-step"
                >
                    Execute & Next
                </Button>
            </div>
        </Card>
        <DialogConfirm isOpen={isOpen} title={'Are you sure?'} des={'Are you sure you want to place the order with all the values you have prompted?'} onClose={handlePlaceOrder}>
            <div className="d-flex align-items-center">
                <Button type='button' className="btn w-100 me-1" onClick={handlePlaceOrder}>Cancel</Button>
                <Button className="btn btn-primary w-100 me-2" onClick={handleConfirmOrder}>Confirm</Button>
            </div>
        </DialogConfirm>
        <DialogConfirm isOpen={message?.length} title={''} IconCom={TickGreenIcon} des={message}>
        </DialogConfirm>
        {/* <Card className="mt-4">
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
        </Card> */}
    </div>
}
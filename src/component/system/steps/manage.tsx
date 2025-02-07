import { TickGreenIcon, DeleteIcon, CrossRedIcon } from "../../../lib/icons";
import RadioCheckboxOption from "../../RadioCheckbox";
import Fetch from "../../../common/api/fetch";
import Card from "../../Card";
import Button from "../../form/button";
import Input from "../../form/input";
import { useEffect, useState } from "react";
import Alert from "../../Alert";
import { decodeToken } from "../../../common/utilits";


export default function Manage() {
  const [placeOrders, setPlaceOrders] = useState<any>([
    { optionType: "put", type: "Limit-sell", value: "", id: "" },
    { optionType: "put", type: "Take-profit", value: "", id: "" },
    { optionType: "put", type: "Stop-loss", value: "", id: "" },
    { optionType: "call", type: "Limit-sell", value: "", id: "" },
    { optionType: "call", type: "Take-profit", value: "", id: "" },
    { optionType: "call", type: "Stop-loss", value: "", id: "" },
  ]);
  const [tradeData, setTradeData] = useState<any>([]);
  const [err, setErr] = useState<string>("");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [disabledId, setdisabledId] = useState<string | null>(null);
  const [callOrder, setCallOrder] = useState<boolean>(false);
  const [putOrder, setPutOrder] = useState<boolean>(false);
  const [inventoryData, setInventoryData] = useState<any>([]);
  useEffect(() => {
    const id = decodeToken(localStorage.token)?.user_id;
    const wsTrades = new WebSocket(
      `${import.meta.env.VITE_API_SOCKET_URL}trades-management?user_id=${id}`
    );
    wsTrades.onopen = () => {
      console.log("websocket opened");
    };
    wsTrades.onmessage = (event: any) => {
      const data = JSON.parse(event.data);
      if(data.contract){
        setInventoryData((prevData:any) => {
          const existingIndex = prevData.findIndex((item:any) => item.order_id === data.order_id);
          
          if (existingIndex !== -1) {
            // Agar order_id match kar raha hai, toh usko update karo
            const updatedData = [...prevData];
            updatedData[existingIndex] = data;
            return updatedData;
          } else {
            // Nahi hai toh naye data ko add kar do
            return [...prevData, data];
          }
        });
      }else{
        setTradeData(data);

      }
    };
  

    // When the WebSocket encounters an error
    wsTrades.onerror = (error) => {
      console.log("WebSocket error:", error);
    };

    Fetch("ibkr/place-order").then((res: any) => {
      const orders = res.data.data;
      setPutOrder(res.data.put_orders)
      setCallOrder(res.data.call_orders)
      const updatedOrders = placeOrders.map((order: any) => {
        const matchingApiOrder = orders.find((apiOrder: any) => {
          let orderTypeMatch = null;
          if (apiOrder.orderType === "LMT" && apiOrder.side === "SELL") {
            orderTypeMatch = "Limit-sell";
          } else if (apiOrder.orderType === "LMT" && apiOrder.side === "BUY") {
            orderTypeMatch = "Take-profit";
          } else if (apiOrder.orderType === "STP" && apiOrder.side === "BUY") {
            orderTypeMatch = "Stop-loss";
          }
          return (
            order.optionType === apiOrder.optionType &&
            order.type === orderTypeMatch
          );
        });
        if (matchingApiOrder) {
          if (order.type === "Limit-sell") {
            return {
              ...order,
              value: matchingApiOrder.limit_sell,
              id: matchingApiOrder.id,

            };
          } else if (order.type === "Take-profit") {
            return {
              ...order,
              value: matchingApiOrder.take_profit,
              id: matchingApiOrder.id,
            };
          } else if (order.type === "Stop-loss") {
            return {
              ...order,
              value: matchingApiOrder.stop_loss,
              id: matchingApiOrder.id,
            };
          }
        }

        return order;
      });

      // Update the state with the modified orders
      setPlaceOrders(updatedOrders);
    });
  }, []);

  const DeleteBracketOrder = (id: string) => {
    setdisabledId(id);
    Fetch(`ibkr/place-order/${id}/`, {}, { method: "delete" }).then(
      (res: any) => {
        setdisabledId(null);
        if (res.status === false) {
          setErr(res.error);
        } else {
          setErr(res.error);
        }
      }
    );
  };
  const onOrderChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const updatedOrders = [...placeOrders];
    updatedOrders[id] = { ...updatedOrders[id], value: e.target.value };
    setPlaceOrders(updatedOrders);
  };
  const submitOrder = (id: string, value: string, type: string) => {
    setLoadingId(id);
    setdisabledId(id);
const params: {
  id: string;
  limit_sell: string | null;
  take_profit: string | null;
  stop_loss: string | null;
} = {
  id: id,
  limit_sell: null,
  take_profit: null,
  stop_loss: null,
};

    if (type === "Limit-sell") {
      params.limit_sell = value;
    } else if (type === "Take-profit") {
      params.take_profit = value;
    } else {
      params.stop_loss = value;
    }
     
    Fetch(`ibkr/place-order/${id}/`, params, { method: "patch" }).then(
      (res: any) => {
        setLoadingId(null);
        setdisabledId(null);

        if (res.status === false) {
          setErr(res.error);
        } else {
          setErr(res.error);
        }
      }
    );
  };
  const checkDefault = (id: string, check: string) => {
    const status = tradeData.find(
      (order: any) => Object.keys(order)[0] === id
    )?.[id];
    return check === "status"
      ? status === "Cancelled" || status === "Submitted"
      : status;
  };
  return (
    <div className="system-trade">
{inventoryData.length > 0 && (
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
      {inventoryData.map((item:any) => (
        <div key={item.order_id} className="col-12">
          <div className="row mb-1">
            <div className="col-12 col-25 mb-1">
              <RadioCheckboxOption
                type="checkbox"
                disabled
                label={item.contract}
                value={item.contract}
                id={`Contract-${item.order_id}`}
              />
            </div>
            <div className="col-12 col-25 mb-1">
              <RadioCheckboxOption
                type="checkbox"
                label={item.volume}
                value={item.volume}
                id={`Volume-${item.order_id}`}
              />
            </div>
            <div className="col-12 col-25 mb-1">
              <RadioCheckboxOption
                type="checkbox"
                label={item.sold_price}
                value={item.sold_price}
                id={`PriceSold-${item.order_id}`}
              />
            </div>
            <div className="col-12 col-25 mb-1">
              <RadioCheckboxOption
                type="checkbox"
                label={item.current_price}
                value={item.current_price}
                id={`CurrentPrice-${item.order_id}`}
              />
            </div>
            <div className="col-12 col-25 mb-1">
              <RadioCheckboxOption
                type="checkbox"
                label={item.pnl}
                value={item.pnl}
                id={`PnL-${item.order_id}`}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  </Card>
)}


      <Card className="mt-4">
        <div className="row mb-3">
          <div className="col-12">
            <h4 className="mb-3 pb-3">Trade management</h4>
          </div>
          {
            callOrder ? (
    <div className="system-trade-card p-4">
    <h5>Call Contract Bracket Order</h5>
    {placeOrders.map((num: any, id: number) => {
      if (num.optionType === "call") {
        return (
          <>
            <div
              className="d-flex gap-3 align-items-center system-trade-card-check  "
              key={num.id}
            >
              <input
                type="radio"
                className="d-none"
                id={`order-${id}`}
                defaultChecked={checkDefault(num.id, "input")}
                disabled
              />
              <label htmlFor={`order-${id}`}>
                <div className="circle"></div>
                {checkDefault(num.id, "circle") === "Submitted" ? (
                  <TickGreenIcon />
                ) : (
                  <CrossRedIcon />
                )}
              </label>

              <div className="d-flex flex-column gap-4 contract-track-order">
                <div className="d-flex align-items-center gap-5">
                  <div className="w-23 system-trade-card-btn mb-0 d-flex align-items-center justify-content-center contract-label btn-adjust">
                    {num.type}
                  </div>
                  <div className="btn-adjust">
                    <Input
                      type="text"
                      onChange={(
                        e: React.ChangeEvent<HTMLInputElement>
                      ) => onOrderChange(e, id)}
                      value={num.value}
                      placeholder="Enter value"
                    />
                  </div>
                  <Button
                    className="btn btn-primary btn-adjust"
                    onClick={() =>
                      submitOrder(num.id, num.value, num.type)
                    }
                    isLoading={loadingId === num.id}
                    disabled={
                      disabledId === num.id ||
                      checkDefault(num.id, "circle") === "Cancelled"
                    }
                  >
                    Adjust
                  </Button>
                  <div
                    onClick={() => DeleteBracketOrder(num.id)}
                    style={{
                      opacity:
                        disabledId === num.id ||
                        checkDefault(num.id, "circle") === "Cancelled"
                          ? 0.5
                          : 1,
                      pointerEvents:
                        disabledId === num.id ||
                        checkDefault(num.id, "circle") === "Cancelled"
                          ? "none"
                          : "auto",
                    }}
                  >
                    <DeleteIcon />
                  </div>
                </div>
              </div>
            </div>
          </>
        );
      } else {
        return null; // Optionally handle the case where `optionType` is not "call"
      }
    })}
  </div>
  ) : null
}
     

          
{putOrder ? (
  <div className="system-trade-card p-4">
    <h5>Put Contract Bracket Order</h5>
    {placeOrders.map((num: any, id: number) => {
      if (num.optionType === "put") {
        return (
          <div
            className="d-flex gap-3 align-items-center system-trade-card-check"
            key={num.id}
          >
            <input
              type="radio"
              className="d-none"
              id={`order-${id}`}
              defaultChecked={checkDefault(num.id, "input")}
              disabled
            />
            <label htmlFor={`order-${id}`}>
              <div className="circle"></div>
              {checkDefault(num.id, "circle") === "Submitted" ? (
                <TickGreenIcon />
              ) : (
                <CrossRedIcon />
              )}
            </label>

            <div className="d-flex flex-column gap-4 contract-track-order">
              <div className="d-flex align-items-center gap-5">
                <div className="w-23 system-trade-card-btn mb-0 d-flex align-items-center justify-content-center contract-label btn-adjust">
                  {num.type}
                </div>
                <div className="btn-adjust">
                  <Input
                    type="text"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      onOrderChange(e, id)
                    }
                    value={num.value}
                    placeholder="Enter value"
                  />
                </div>
                <Button
                  className="btn btn-primary btn-adjust"
                  onClick={() => submitOrder(num.id, num.value, num.type)}
                  isLoading={loadingId === num.id}
                  disabled={
                    disabledId === num.id ||
                    checkDefault(num.id, "circle") === "Cancelled"
                  }
                >
                  Adjust
                </Button>
                <div
                  onClick={() => DeleteBracketOrder(num.id)}
                  style={{
                    opacity:
                      disabledId === num.id ||
                      checkDefault(num.id, "circle") === "Cancelled"
                        ? 0.5
                        : 1,
                    pointerEvents:
                      disabledId === num.id ||
                      checkDefault(num.id, "circle") === "Cancelled"
                        ? "none"
                        : "auto",
                  }}
                >
                  <DeleteIcon />
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        return null; // Optionally handle the case where `optionType` is not "put"
      }
    })}
    <Alert type="danger" label={err} />
  </div>
) : null}

        </div>
      </Card>
      {/* <Card className="mt-4">
        <h4 className="mb-3 pb-3">Strategic Options</h4>
        <div className="system-trade-card p-4 mb-3">
          <div className="row mb-3">
            <div className="col-12 col-md-4">
              <h5>Call Contract</h5>
            </div>
            <div className="col-12 col-md-4"></div>
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
      </Card> */}
    </div>
  );
}

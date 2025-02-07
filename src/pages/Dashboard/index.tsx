import { useEffect, useState } from "react";
import Card from "../../component/Card";
import CircularButton from "../../component/system/CircularButton";
import RangeSlider from "../../component/system/RangeSlider";
import AppLayout from "../../layout/appLayout";
import Fetch from "../../common/api/fetch";
import Button from "../../component/form/button";
import { convertToIST } from "../../common/utilits";
import Required from "../../component/form/required";
export default function Dashboard() {
  const [data, setData] = useState<any>({});
  const [ordersData, setOrdersData] = useState<any>({});
  const[errorMessage, setErrorMsg] = useState<string>('')
  useEffect(() => {
    Fetch(`ibkr/dashboard`, {}, { method: "get" }).then((res: any) => {
      if(res.error){
        setErrorMsg(res.error)
      }else{
        setData(res.data);

      }
    });
  }, []);
  const getTakeProfitValue = (
    orders: any,
    type: string,
    orderType: string,
    optionType: string
  ) => {
    const order = orders?.find(
      (item: any) =>
        item.orderType === orderType &&
        item.side === "BUY" &&
        item.optionType === optionType
    );
    return order
      ? type === "stop_loss"
        ? order.stop_loss
        : order.take_profit
      : "";
  };

  const submitOrder = () => {
    Fetch(`ibkr/place-order/${ordersData.id}/`, ordersData, {
      method: "patch",
    }).catch((error:any)=>{
       console.log(error)
    })
  };

  const handleChange = (e: any, orderType: any, optionType: any) => {
    const { name, value } = e.target;

    const order = data?.orders?.find(
      (item: any) =>
        item.orderType === orderType &&
        item.side === "BUY" &&
        item.optionType === optionType
    );
    const params = {
      id: order.id,
      limit_sell: null,
      take_profit: null,
      stop_loss: null,
    };

    if (name === "Limit-sell") {
      params.limit_sell = value;
    } else if (name === "take_profit") {
      params.take_profit = value;
    } else {
      params.stop_loss = value;
    }
    setOrdersData(params);
  };

  const getLastMonth = (sections: any) => {
    const optSection = sections?.find((s: any) => s.secType === "OPT");
    if (!optSection?.months) return null;
  
    const months = optSection.months.split(";").pop();
    const monthMap = {
      JAN: "January",
      FEB: "February",
      MAR: "March",
      APR: "April",
      MAY: "May",
      JUN: "June",
      JUL: "July",
      AUG: "August",
      SEP: "September",
      OCT: "October",
      NOV: "November",
      DEC: "December",
    };
  
    const monthKey = months?.slice(0, 3).toUpperCase() as keyof typeof monthMap;
  
    return monthKey ? `${monthMap[monthKey]} 20${months.slice(3)}` : null;
  };
  

  const addExtraTime =(time: string, minutesToAdd: number) => {
    const [hours, minutes] = time.split(":").map(Number);
    const date = new Date();

    date.setHours(hours);
    date.setMinutes(minutes + minutesToAdd);

    const newHours = date.getHours().toString().padStart(2, "0");
    const newMinutes = date.getMinutes().toString().padStart(2, "0");

    return `${newHours}:${newMinutes}`;
};
  return (
    <AppLayout>
      <div className="dashboard">
      <div className="text-center" >
     <Required errorText={errorMessage} />
     </div>
        <div className="row mb-4 d-flex justify align ml-3">
          { data && data?.ticker_data?.symbol &&
          <div className="col-md-6 ml-3">
            <Card className="d-flex align-items-center flex-row ml-3">
              <h5>Ticker</h5>
              <div className="system-trade-card-btn ms-3 mb-0 d-flex align-items-center justify-content-center">
                {data?.ticker_data?.symbol}
              </div>
            </Card>
          </div>
            }
            { data &&  data?.ticker_data?.sections  && 
          <div className="col-md-6">
            <Card className="d-flex align-items-center flex-row">
              <h5>Expiry</h5>
              <div className="system-trade-card-btn ms-3 mb-0 d-flex align-items-center justify-content-center">
                {getLastMonth(data?.ticker_data?.sections)}
              </div>
            </Card>
          </div>
            }
        </div>
        {data?.timer && Object.keys(data.timer).length > 0 && (

        <div className="row mb-4">
          <div className="col-md-6">
            <Card>
              <div className="d-flex align-items-center flex-row mb-4 gap-4">
              {data?.confidence_level && (
                <div className="system-trade-card-btn mb-0 d-flex align-items-center justify-content-center">
                  Confidence Level
                </div>
                        )}
                {data?.confidence_level && (
                  <div className="system-trade-card-btn mb-0 d-flex align-items-center justify-content-center">
                    {`${data.confidence_level} %`}
                  </div>
                )}
              </div>
              <div className="d-flex align-items-center flex-row gap-4">
                <div className="system-trade-card-btn mb-0 d-flex align-items-center justify-content-center">
                  Start & End Time
                </div>
                <div className="system-trade-card-btn mb-0 d-flex align-items-center justify-content-center">
                
                  {convertToIST(data?.timer?.original_time_start)}
                  {} -{" "}
                  {addExtraTime(convertToIST(data?.timer?.original_time_start), 160)}
               
                </div>
              </div>
            </Card>
          </div>
          <div className="col-md-6 ">
            <div className="row">
              <div className="col-md-4 mr-5 d-flex justify-content-center">
                <CircularButton
                  text={"P"}
                  bgColor={data?.timer?.place_order === "P" ? "green" : ""}
                />
              </div>
              <div className="col-md-4 d-flex justify-content-center">
                <CircularButton
                  text={"N"}
                  bgColor={data?.timer?.place_order === "N" ? "green" : ""}
                />
              </div>
              <div className="col-md-4 d-flex justify-content-center">
                <CircularButton
                  text={"D"}
                  bgColor={data?.timer?.place_order === "D" ? "green" : ""}
                />
              </div>
            </div>
          </div>
        </div>
        )}
        <div className="row mb-4">
         
            {data?.orders?.map((order: any) => {
              if (
                order?.orderType === "STP" &&
                order?.optionType === "call" &&
                order?.side === "BUY"
              ) {
                return (
                  <div className="col-md-6">
                  <Card key={order.id} className="">
                    <div className="d-flex align-items-center mb-3">
                      <h5>Call Strike</h5>
                      <div className="system-trade-card-btn ms-3 mb-0 d-flex align-items-center justify-content-center">
                        {order.con_desc2.match(/(\d+)\s+Call/)?.[1] || ""}
                      </div>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <h5>Unit Price</h5>
                      <div className="system-trade-card-btn ms-3 mb-0 d-flex align-items-center justify-content-center">
                        {order.price}
                      </div>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <h5>Volume</h5>
                      <div className="system-trade-card-btn ms-3 mb-0 d-flex align-items-center justify-content-center">
                        {order.quantity}
                      </div>
                    </div>
                  </Card>
                  </div>
                );
              }
              return null; // return null if the condition is not met
            })}
      
          <div className="col-md-6">
            {data?.orders?.map((order: any) => {
              if (
                order?.orderType === "STP" &&
                order?.optionType === "put" &&
                order?.side === "BUY"
              ) {
                return (
                  <Card key={order.id} className="">
                    <div className="d-flex align-items-center mb-3">
                      <h5>Put Strike</h5>
                      <div className="system-trade-card-btn ms-3 mb-0 d-flex align-items-center justify-content-center">
                        {order.con_desc2.match(/(\d+)\s+Put/)?.[1] || ""}
                      </div>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <h5>Unit Price</h5>
                      <div className="system-trade-card-btn ms-3 mb-0 d-flex align-items-center justify-content-center">
                        {order.price}
                      </div>
                    </div>
                    <div className="d-flex align-items-center mb-3">
                      <h5>Volume</h5>
                      <div className="system-trade-card-btn ms-3 mb-0 d-flex align-items-center justify-content-center">
                        {order.quantity}
                      </div>
                    </div>
                  </Card>
                );
              }
              return null; // return null if the condition is not met
            })}
          </div>
        </div>
   

    
 
        <div className="row mb-4">

        {data && data?.orders?.find(
                            (order: { con_desc2: string | string[] }) =>
                              order.con_desc2.includes("Call")
                          )?.con_desc2 && (
                  <div className="col-md-6">

            <Card>
              <h4 className="ml-5">Trade Managment</h4>
                  <div className="d-flex flex-row">
                    <h5 className="mt-3">Call Contract</h5>

                    <div className="system-trade-card-btn ms-3 mb-0 d-flex align-items-center justify-content-center">
                      {data?.orders?.length
                        ? data.orders.find(
                            (order: { con_desc2: string | string[] }) =>
                              order.con_desc2.includes("Call")
                          )?.con_desc2 || "No orders available"
                        : "No orders available"}
                    </div>

                  </div>
                  <div className="d-flex align-items-center mt-4">
                    <h5>Stop Loss</h5>
                    <RangeSlider
                      name="stop_loss"
                      className="mx-3"
                      min={100}
                      max={600}
                      count={11}
                      val={getTakeProfitValue(
                        data?.orders,
                        "stop_loss",
                        "LMT",
                        "call"
                      )}
                      handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(e, "LMT", "call")
                      }
                      oddNumbers={true}
                    />
                    <div className="system-trade-card-btn ms-3 mb-0 d-flex align-items-center justify-content-center">
                      {getTakeProfitValue(
                        data?.orders,
                        "stop_loss",
                        "LMT",
                        "call"
                      )}
                    </div>
                    <Button
                      className="btn btn-primary btn-adjust m-2"
                      onClick={() => submitOrder()}
                    >
                      Adjust
                    </Button>
                  </div>
                  <div className="d-flex align-items-center mt-4">
                    <h5>Take Profit</h5>
                    <RangeSlider
                      name="take_profit"
                      className="mx-3"
                      min={0}
                      max={50}
                      count={11}
                      val={getTakeProfitValue(
                        data?.orders,
                        "take_profit",
                        "STP",
                        "call"
                      )}
                      handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(e, "STP", "call")
                      }
                      oddNumbers={true}
                    />
                    <div className="system-trade-card-btn ms-3 mb-0 d-flex align-items-center justify-content-center">
                      {getTakeProfitValue(
                        data?.orders,
                        "take_profit",
                        "STP",
                        "call"
                      )}
                    </div>
                    <Button
                      className="btn btn-primary btn-adjust m-2"
                      onClick={() => submitOrder()}
                    >
                      Adjust
                    </Button>
                  </div>

              
            </Card>
            </div>

        )}


     <div className="col-md-6">
        {data && data?.orders?.find(
                            (order: { con_desc2: string | string[] }) =>
                              order.con_desc2.includes("Put")
                          )?.con_desc2 && (
            <Card>
              <h4 className="ml-5">Trade Managment</h4>
                  <div className="d-flex flex-row">
                    <h5 className="mt-3">Put Contract</h5>

                    <div className="system-trade-card-btn ms-3 mb-0 d-flex align-items-center justify-content-center">
                      {data?.orders?.length
                        ? data.orders.find(
                            (order: { con_desc2: string | string[] }) =>
                              order.con_desc2.includes("Put")
                          )?.con_desc2 || "No orders available"
                        : "No orders available"}
                    </div>

                  </div>
                  <div className="d-flex align-items-center mt-4">
                    <h5>Stop Loss</h5>
                    <RangeSlider
                      name="stop_loss"
                      className="mx-3"
                      min={100}
                      max={600}
                      count={11}
                      val={getTakeProfitValue(
                        data?.orders,
                        "stop_loss",
                        "LMT",
                        "put"
                      )}
                      handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(e, "LMT", "put")
                      }
                      oddNumbers={true}
                    />
                    <div className="system-trade-card-btn ms-3 mb-0 d-flex align-items-center justify-content-center">
                      {getTakeProfitValue(
                        data?.orders,
                        "stop_loss",
                        "LMT",
                        "put"
                      )}
                    </div>
                    <Button
                      className="btn btn-primary btn-adjust m-2"
                      onClick={() => submitOrder()}
                    >
                      Adjust
                    </Button>
                  </div>
                  <div className="d-flex align-items-center mt-4">
                    <h5>Take Profit</h5>
                    <RangeSlider
                      name="take_profit"
                      className="mx-3"
                      min={0}
                      max={50}
                      count={11}
                      val={getTakeProfitValue(
                        data?.orders,
                        "take_profit",
                        "STP",
                        "put"
                      )}
                      handleChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleChange(e, "STP", "put")
                      }
                      oddNumbers={true}
                    />
                    <div className="system-trade-card-btn ms-3 mb-0 d-flex align-items-center justify-content-center">
                      {getTakeProfitValue(
                        data?.orders,
                        "take_profit",
                        "STP",
                        "put"
                      )}
                    </div>
                    <Button
                      className="btn btn-primary btn-adjust m-2"
                      onClick={() => submitOrder()}
                    >
                      Adjust
                    </Button>
                  </div>

              
            </Card>
        )}
     </div>
     </div>
   


      </div>
    
    </AppLayout>
  );
}

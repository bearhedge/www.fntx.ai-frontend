import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { ChartCanvas, Chart } from "react-stockcharts";
import { BarSeries, CandlestickSeries } from "react-stockcharts/lib/series";
import { XAxis, YAxis } from "react-stockcharts/lib/axes";
import {
    CrossHairCursor,
    MouseCoordinateX,
    MouseCoordinateY
} from "react-stockcharts/lib/coordinates";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
// import { OHLCTooltip } from "react-stockcharts/lib/tooltip";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";
import * as React from "react";
interface DataItem {
    date: Date;
    high: number;
    low: number;
    open: number;
    close: number;
    volume: number;
    spli?: string
    dividen?: string
    absoluteChang?: string
    percentChang?: string
}
// Define types for props
interface CandleStickChartWithCHMousePointerProps {
    type: "svg" | "canvas";
    data: any;
    width: number;
    ratio: number;
}
interface State {
    suffix: number;
}
class CandleStickChartWithCHMousePointer extends React.Component<CandleStickChartWithCHMousePointerProps, State> {
    constructor(props: CandleStickChartWithCHMousePointerProps) {
        super(props);
        this.state = {
            suffix: 1
        }
        this.handleReset = this.handleReset.bind(this);
    }
    handleReset() {
        this.setState((prevState) => ({
            suffix: prevState.suffix + 1,
        }));
    }
    render() {
        const mouseMoveEvent = true
        const panEvent = true
        const zoomEvent = true
        const { data: initialData, width } = this.props;
        const { suffix } = this.state;
        const xScaleProvider = discontinuousTimeScaleProvider.inputDateAccessor(
            (d: any) => {
                return typeof d.date === "string" ? new Date(d.date) : d.date;
            }
        );

        const { data, xScale, xAccessor, displayXAccessor } = xScaleProvider(
            initialData
        );

        const start = xAccessor(last(data));
        const end = xAccessor(data[Math.max(0, data.length - 150)]);

        const xExtents = [start, end];
        const margin = { left: 0, right: 70, top: 0, bottom: 0 };

        const height = 400;
    
        const gridHeight = height - margin.top - margin.bottom;
        const gridWidth = width - margin.left - margin.right;
    
        const showGrid = true;
        const yGrid = showGrid
          ? { innerTickSize: -1 * gridWidth, tickStrokeOpacity: 0.1 }
          : {};
        const xGrid = showGrid
          ? { innerTickSize: -1 * gridHeight, tickStrokeOpacity: 0.1 }
          : {};
        return (
                <ChartCanvas
                    height={400}
                    ratio={2}
                    width={width}
                    margin={{ left: 60, right: 70, top: 10, bottom: 30 }}
                    seriesName={`MSFT_${suffix}`}
                    mouseMoveEvent={mouseMoveEvent}
                    type='svg'
                    panEvent={panEvent}
                    zoomEvent={zoomEvent}
                    clamp={false}
                    data={data}
                    xScale={xScale}
                    xAccessor={xAccessor}
                    displayXAccessor={displayXAccessor}
                    xExtents={xExtents}
                >
                    <Chart id={1} yExtents={[(d: DataItem) => [d.high, d.low]]}>
                    {/* <LineSeries
            yAccessor={ema20.accessor()}
            stroke={ema20.stroke()}
            highlightOnHover
          />
          <LineSeries
            yAccessor={ema50.accessor()}
            stroke={ema50.stroke()}
            highlightOnHover
          /> */}
                        <XAxis axisAt="bottom" stroke='transparent' orient="bottom" zoomEnabled={zoomEvent} {...xGrid}/>
                        <YAxis fill='#000' stroke='transparent' axisAt="right" orient="right" ticks={5} zoomEnabled={zoomEvent} {...yGrid}/>
                        <MouseCoordinateY at="right" orient="right" displayFormat={format(".2f")} />
                        <CandlestickSeries opacity={1} stroke='#000' wickStroke='#000' fill={(d: any) => (d.close > d.open ? "#b1b1b1" : "#000")} />
                        {/* <OHLCTooltip forChart={1} origin={[-40, 0]} /> */}
                        {/* <ZoomButtons onReset={this.handleReset} /> */}
                    </Chart>
                    <Chart
                        id={2}
                        height={150}
                        yExtents={(d: any) => {
                            return d.volume
                        }}
                        origin={(h: number) => {
                            return [0, h - 750]
                        }}
                    >
                        <YAxis fill='#000' stroke='transparent' tickFormat={format(".2s")} axisAt="left" orient="left" ticks={5} zoomEnabled={zoomEvent} />
                        <MouseCoordinateX at="bottom" orient="bottom" displayFormat={timeFormat("%Y-%m-%d")} />
                        <MouseCoordinateY at="left" orient="left" displayFormat={format(".4s")} />
                        <BarSeries
                        opacity={1}
                        stroke={true}
                            yAccessor={(d) => d.volume}
                            fill={(d) => (d.close > d.open ? "#b1b1b1" : "#000")}
                        />
                    </Chart>
                    <CrossHairCursor />
                </ChartCanvas>
        );
    }
}

export default fitWidth(CandleStickChartWithCHMousePointer);

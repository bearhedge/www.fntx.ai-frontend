
declare module "react-stockcharts" {
  import { Component } from "react";

  export interface ChartCanvasProps {
    width?: number;
    height: number;
    margin?: { left: number; right: number; top: number; bottom: number };
    type?: "svg" | "canvas";
    seriesName?: string;
    mouseMoveEvent?:boolean
    panEvent?:boolean
    zoomEvent?:boolean
    clamp?:boolean
    data: any[];
    xScale?: any;
    xAccessor?: any;
    displayXAccessor?: any;
    xExtents?: any;
    ratio?: number;
    children:React.ReactNode
  }

  export class ChartCanvas extends Component<ChartCanvasProps> {}
  export class ZoomButtons extends Component<any> {}
  export class Chart extends Component<{ id: number; yExtents?: any; height?: number; origin?: any, children:React.ReactNode }> {}
}

declare module "react-stockcharts/lib/series" {
  import { Component } from "react";

  export class CandlestickSeries extends Component<any> {}
  export class BarSeries extends Component<{ yAccessor: (d: any) => number;opacity?:number;stroke?:boolean;width?:number; fill?: (d: any) => string }> {}
}

declare module "react-stockcharts/lib/axes" {
  import { Component } from "react";

  export class XAxis extends Component<any> {}
  export class YAxis extends Component<any> {}
}

declare module "react-stockcharts/lib/coordinates" {
  import { Component } from "react";

  export class MouseCoordinateX extends Component<any> {}
  export class MouseCoordinateY extends Component<any> {}
  export class CrossHairCursor extends Component<any> {}
}

declare module "react-stockcharts/lib/tooltip" {
  import { Component } from "react";

  export class OHLCTooltip extends Component<{ forChart: number; origin: [number, number] }> {}
}

declare module "react-stockcharts/lib/scale" {
  export const discontinuousTimeScaleProvider: any;
}

declare module "react-stockcharts/lib/helper" {
  import { Component } from "react";

  export function fitWidth(Component: any): any;
  // Type for the function passed to TypeChooser
  type TypeChooserChild = (type: string) => JSX.Element;

  // TypeChooser props
  export interface TypeChooserProps {
    type?: string;
    onChange?: (type: string) => void;
    children: TypeChooserChild;  // child function expecting a `type`
  }
  export class TypeChooser extends Component<TypeChooserProps> {}
}

declare module "react-stockcharts/lib/utils" {
  export function last(data: any[]): any;
}
export interface Column {
  id: string;
  label: string;
  formatHtmls?: (value: any) => any;
}

export interface SystemPagesProps {
  handleTabChange: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
export interface TickerList {
  [key: string]: InstrumentsProps[];
}
export interface InstrumentsProps {
  instrument: string;
  id: string;
}
export interface ConidsProps {
  companyHeader: string;
  companyName: string;
  conid: string;
  description: string;
  restricted: string | null;
  symbol: string;
  sections: sectionsProps[];
}

export interface sectionsProps{
  secType?:string
  exchange?:string
  months?:string
}
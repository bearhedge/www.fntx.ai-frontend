export interface Column {
  id: string;
  label: string;
  formatHtmls?: (value: any) => any;
}

export interface SystemPagesProps {
  handleTabChange: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

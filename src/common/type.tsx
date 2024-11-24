export interface Column {
    id: string;
    label: string;
    formatHtmls?: (value: any) => any;
}
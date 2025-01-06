import { useEffect, useState } from "react";

type StockTableProps = {
  title: string;
  className?: string;
  columns?: any
  selected?:number
  handleSelected?: (row: any) => void
  rows: Array<Array<string | number>>;
  showStrike?: boolean;
};

const StockTable: React.FC<StockTableProps> = ({
  title,
  className,
  showStrike,
  rows,
  selected,
  handleSelected,
  columns,
}) => {
  const [selectedRow,setSelectedRow] = useState<number | null | undefined>(null)
  const handleSelectRow = (item:any, index:number)=>{
  if(showStrike){
    return;
  }
    setSelectedRow(index)
    handleSelected && handleSelected({...item, selected:index})
  }
  useEffect(()=>{
    setSelectedRow(selected)
  },[selected])
  return (
    <div className="stock-table">
      <label className="fw-600 mb-3">{title}</label>
      <div className="table-responsive">
        <table>
          <thead>
            <tr>
              {columns.map((column: any) => (
                <th
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column?.minWidth,
                    maxWidth: column?.maxWidth,
                  }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className={className}>
            {rows.map((row, index) => (
              <tr key={index} className={selectedRow === index ? 'active' :''} onClick={() => handleSelectRow(row, index)}>
                {columns.map((column: any, cellIndex: number) => {
                  const value = row[column.id];
                  return <td key={cellIndex}>
                    {column.formatHtmls
                      ? column.formatHtmls(row)
                      : value
                        ? value
                        : "-"}
                  </td>
                })}
                {/* {showStrike && <td className="strike-bg">-</td>} */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StockTable;

type StockTableProps = {
  title: string;
  className?: string;
  columns?: any
  rows: Array<Array<string | number>>;
  showStrike?: boolean;
};

const StockTable: React.FC<StockTableProps> = ({
  title,
  className,
  rows,
  columns,
}) => {
  return (
    <div className="stock-table">
      <label className="fw-600 mb-3">{title}</label>
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
            <tr key={index}>
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
  );
};

export default StockTable;

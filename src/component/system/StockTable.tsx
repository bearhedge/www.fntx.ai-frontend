type StockTableProps = {
  title: string;
  className?: string;
  rows: Array<Array<string | number>>;
  showStrike?: boolean;
};

const StockTable: React.FC<StockTableProps> = ({
  title,
  className,
  rows,
  showStrike = false,
}) => {
  return (
    <div className="stock-table">
      <label className="fw-600 mb-3">{title}</label>
      <table>
        <thead>
          <tr>
            <th>Last Price</th>
            <th>Change</th>
            <th>%Change</th>
            <th>Volume</th>
            <th>Open Interest</th>
            {showStrike && <th>Strike</th>}
          </tr>
        </thead>

        <tbody className={className}>
          {rows.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
              {showStrike && <td className="strike-bg">-</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;

import { useState } from "react";
import { Column } from "../../common/type";
import Pagination from "./pagination";
interface IPorps {
    columns: Column[]
    rows: any
    rowsPerPage?: number;
}
const DynamicTable = ({ columns, rows, rowsPerPage = 0 }: IPorps) => {
    const [currentPage, setCurrentPage] = useState(1);
    // Pagination logic
    const totalPages = Math.ceil(rows.length / rowsPerPage);
    const startIndex = (currentPage - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;
    const paginatedData = rows.slice(startIndex, endIndex);
    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };
    return (
        <div className="table">
            <table>
                <thead>
                    <tr>
                        {columns.map((col: Column) => (
                            <th key={col.id}>
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((row: any, rowIndex: any) => (
                        <tr key={rowIndex}>
                            {columns.map((col: Column) => (
                                <td key={col.id}>
                                    {col.formatHtmls
                                        ? col.formatHtmls(row)
                                        : row[col.id]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
        </div>
    );
};

export default DynamicTable;
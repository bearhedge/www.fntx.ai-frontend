import { memo } from "react";
import { ArrowIco } from "../../lib/icons";

interface PaginationProps {
    currentPage?: number;
    totalPages?: number;
    onPageChange?: (page: number) => void | undefined;
}

const Pagination: React.FC<PaginationProps> = memo(
    ({ currentPage = 0, totalPages = 1, onPageChange }) => {
        const pages = Array.from({ length: totalPages }, (_, index) => index + 1);
        return (
            <div className="table__pagination">
                <button
                    onClick={() => onPageChange && onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className='table__pagination__ico table__pagination__prev'
                >
                    <ArrowIco />
                </button>
                {pages.map((page) => (
                    <button
                        key={page}
                        className='table__pagination__count'
                        onClick={() => onPageChange && onPageChange(page)}
                        disabled={page === currentPage}
                        style={{
                            color: page === currentPage ? "#b1b1b1" : "#007bff",
                            cursor: page === currentPage ? "not-allowed" : "pointer",
                        }}
                    >
                        {page}
                    </button>
                ))}
                <button
                    onClick={() => onPageChange && onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className='table__pagination__ico table__pagination__next'

                >
                    <ArrowIco />
                </button>
            </div>
        );
    }
);
export default Pagination
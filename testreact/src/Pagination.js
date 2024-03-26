import React, { useState } from 'react';

const Pagination = ({
    currentPage,
    totalItems,
    pageSize,
    onPageChange,
}) => {
    const [totalPages, setTotalPages] = useState(
        Math.ceil(totalItems / pageSize)
    );

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const renderPages = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <li
                    key={i}
                    className={currentPage === i ? 'active' : ''}
                    onClick={() => handlePageChange(i)}
                >
                    {i}
                </li>
            );
        }
        return pages;
    };

    return (
        <div className="pagination">
            <ul>
                <li
                    className={currentPage === 1 ? 'disabled' : ''}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    ‹
                </li>
                {renderPages()}
                <li
                    className={currentPage === totalPages ? 'disabled' : ''}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    ›
                </li>
            </ul>
        </div>
    );
};

export default Pagination;
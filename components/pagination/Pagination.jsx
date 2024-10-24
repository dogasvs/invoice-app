"use client";
import { useState } from "react";

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
}) {
  const visiblePages = 5; // Gösterilecek sayfa sayısı

  const handlePageSizeChange = (e) => {
    onPageSizeChange(Number(e.target.value));
    onPageChange(1); // Sayfa boyutu değiştiğinde sayfayı 1'e sıfırlayın
  };

  const handlePageClick = (page) => {
    onPageChange(page);
  };

  const renderPageNumbers = () => {
    if (totalPages <= 1) return null; // Sayfa numaralarını sadece birden fazla sayfa varsa göster

    const pages = [];
    const half = Math.floor(visiblePages / 2);
    let start = Math.max(1, currentPage - half);
    let end = Math.min(totalPages, currentPage + half);

    if (currentPage + half > totalPages) {
      start = Math.max(1, totalPages - visiblePages + 1);
    }

    if (currentPage - half < 1) {
      end = Math.min(totalPages, visiblePages);
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`pagination-button ${i === currentPage ? "active" : ""}`}
        >
          {i}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="pagination-container">
      <div className="page-size-selector">
        <label htmlFor="pageSize">Sayfa Başına:</label>
        <select id="pageSize" value={pageSize} onChange={handlePageSizeChange}>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={15}>15</option>
          <option value={20}>20</option>
        </select>
      </div>
      {totalPages > 1 && (
        <div className="page-numbers">
          <button
            onClick={() => handlePageClick(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            &laquo;
          </button>
          {renderPageNumbers()}
          <button
            onClick={() => handlePageClick(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="pagination-button"
          >
            &raquo;
          </button>
        </div>
      )}
      <style jsx>{`
        .pagination-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
        }
        .page-size-selector {
          display: flex;
          align-items: center;
        }
        .page-size-selector label {
          margin-right: 10px;
        }
        .page-numbers {
          display: flex;
          align-items: center;
        }
        .pagination-button {
          margin: 0 5px;
          padding: 5px 10px;
          border: none;
          background-color: #f0f0f0;
          cursor: pointer;
        }
        .pagination-button.active {
          background-color: #0070f3;
          color: white;
        }
        .pagination-button:disabled {
          background-color: #e0e0e0;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}

import React from 'react';
import './ResultsTable.scss';

const ResultsTable = ({ columns = [], rows = [] }) => {
  if (!columns.length || !rows.length) {
    return (
      <div className="empty-results">
        <p>No data to display</p>
      </div>
    );
  }

  return (
    <div className="results-table-container">
      <table className="results-table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>{row[column] !== undefined ? String(row[column]) : 'NULL'}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {rows.length >= 10 && (
        <div className="table-footer">
          <p>Showing {Math.min(10, rows.length)} of {rows.length} rows</p>
        </div>
      )}
    </div>
  );
};

export default ResultsTable;
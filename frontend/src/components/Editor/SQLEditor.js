import React from 'react';
import './SQLEditor.scss';

// Simple textarea editor for now (we'll add Monaco Editor later)
const SQLEditor = ({ value, onChange, height = '300px' }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="sql-editor">
      <div className="editor-header">
        <div className="editor-tabs">
          <button className="editor-tab active">query.sql</button>
        </div>
      </div>
      <textarea
        className="editor-textarea"
        value={value}
        onChange={handleChange}
        placeholder="Write your SQL query here..."
        style={{ height }}
        spellCheck="false"
      />
      <div className="editor-footer">
        <span className="editor-info">Press Ctrl+Enter to execute</span>
      </div>
    </div>
  );
};

export default SQLEditor;
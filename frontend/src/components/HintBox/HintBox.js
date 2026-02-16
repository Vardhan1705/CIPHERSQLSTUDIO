import React from 'react';
import './HintBox.scss';

const HintBox = ({ hint }) => {
  return (
    <div className="hint-box">
      <div className="hint-header">
        <h3>💡 Need Help?</h3>
        <span className="hint-badge">Hint</span>
      </div>
      <div className="hint-content">
        <p>{hint || "Click 'Get Hint' for guidance on solving this assignment"}</p>
      </div>
      <div className="hint-footer">
        <small>Remember: Practice makes perfect! Try different approaches.</small>
      </div>
    </div>
  );
};

export default HintBox;
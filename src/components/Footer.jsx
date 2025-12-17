
// src/components/Footer.jsx
import React from 'react';

const Footer = ({ showPrintStick }) => {
  const footerClassName = `footer ${showPrintStick ? 'show-print-stick' : ''}`;
  return (
    <footer className={footerClassName}>

        {showPrintStick && (
        <div className="print-stick">
          <div className="print-stick-content">
            如何导出简历？<br />
            1）右键选择“打印” <br />
            2）目标打印机设置为“另存为PDF”
          </div>
        </div>
      )}

       <div className="powered-by">
          Powered by <a href="https://github.com/ethanwwan/wan-resume" target="_blank" rel="noopener noreferrer">wan-resume</a>
        </div>
      
    </footer>
  );
};

export default Footer;
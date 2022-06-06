import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

function Modal({ show, onClose, children, title }) {
    const [isBrowser, setIsBrowser] = useState(false);
  
    useEffect(() => {
      setIsBrowser(true);
    }, []);

    const handleCloseClick = (e) => {
      e.preventDefault();
      onClose();
    };

    const modalContent = show ? (
      <div>
        <div>
          <div>
            <a href="#" onClick={handleCloseClick}>
              x
            </a>
          </div>
          {title && <h1>{title}</h1>}
          <div>{children}</div>
        </div>
      </div>
    ) : null;

    if (isBrowser) {
        return ReactDOM.createPortal(
            modalContent, 
            document.getElementById("modal-root")
        );
      } else {
        return null;
      }    
  
}

export default Modal;
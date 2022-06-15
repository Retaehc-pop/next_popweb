import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styles from "../styles/Layout.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Modal({ open, onClose, children }) {
    const [isBrowser, setIsBrowser] = useState(false);
  
    useEffect(() => {
      setIsBrowser(true);
    }, []);

    const handleCloseClick = (e) => {
      if (e.target.id != "backdrop"){
        return;
      }
      e.preventDefault();
      onClose();
    };

    const modalContent =(open ? 
      <div className={styles.modal} id="backdrop" onClick={handleCloseClick}>
        <span id="backdrop">
            <FontAwesomeIcon id="backdrop" onClick={handleCloseClick} icon={faXmark} size="2x"/>
        </span>
        <section onClick={()=>{}}>
          {children}
        </section>
      </div>:null)

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
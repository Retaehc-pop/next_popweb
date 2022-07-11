import ToIcon from "./toIcon";
import { useState } from "react";
import styles from "../styles/Layout.module.scss";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
const HexagonalTile = (props) => {
  const [hexItem, setHexItem] = useState(props.hexitem);
  const [test,setTest] = useState([
    {
      name:"test",
      icon: <FontAwesomeIcon icon={faUser} />,
      onClick:()=>{}
    }
  ]);
  return (
    <div className={styles.hex}>
      {hexItem.map((item,index) =>
       
        index === 0 || index === 5 ? (
            <>
          <div key={item.name}>
            <div style={{ background: "transparent" }}></div>
          </div>
          <div key={item.name}>
            <div onClick={item.onClick}>
              <i>
                {item.icon}
              </i>
              <p>{item.name}</p>
            </div>
          </div>
          </>
        ) : (
          <div key={item.name}>
            <div onClick={item.onClick}>
              <i>
                {item.icon}
              </i>
              <p>{item.name}</p>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default HexagonalTile;

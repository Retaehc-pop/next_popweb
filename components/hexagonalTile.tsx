import ToIcon from "./toIcon";
import { useState } from "react";
import styles from "../styles/Layout.module.scss";
import React from "react";
const HexagonalTile = (props) =>{
  const [hexItem, setHexItem] = React.useState([{
    name:"",
    onClick:()=>{},
  }]);
    return(
      <div className={styles.hex}>
      {hexItem.map((item) =>
        item.name === "none" ? (
          <div key={item.name}>
            <div style={{ background: "transparent" }}></div>
          </div>
        ) : (
          <div key={item.name}>
            <div>
              <i>
                <ToIcon icon={item.name}/>
              </i>
              <p>{item.name}</p>
            </div>
          </div>
        )
      )}
    </div>
    )
}

export default HexagonalTile;
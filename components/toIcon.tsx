import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCplusplus, faNextJs, faPrisma, faTypeScript } from "./icons";
import { useState, useEffect } from "react";
import {
  faCss3,
  faHtml5,
  faJs,
  faPython,
  IconDefinition,
  faGit,
  faNodeJs,
  faNode,
  faRaspberryPi,
  faSass,
  faReact,
} from "@fortawesome/free-brands-svg-icons";
import { fa0, faC, faDatabase, faInfinity } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Layout.module.scss";
import { SizeProp } from "@fortawesome/fontawesome-svg-core";
const Icon = (props: { icon: IconDefinition; name: string; animation:boolean;size:SizeProp}) => {
  return (
    <div className={props.animation? styles.iconholder:styles.iconholder_noanimation}>
      <i>
        <FontAwesomeIcon icon={props.icon} size={props.size} />
      </i>
      {
        props.animation?
        <p>{props.name}</p>:
        <></>
      }
    </div>
  );
};

const defaultProps = {
  icon:"",
  animation:true,
  size:"2x"
}
const ToIcon = (props: { icon: string ;animation:boolean;size:SizeProp}) => {
  const [icon,setIcon] = useState<IconDefinition>(fa0);
  useEffect(()=>{
    switch (props.icon) {
      case "typescript":
        setIcon(faTypeScript);
        break;
      case "css":
        setIcon(faCss3);
        break;
      case "html":
        setIcon(faHtml5);
        break;
      case "javascript":
        setIcon(faJs);
        break;
      case "python":
        setIcon(faPython);
        break;
      case "sql":
        setIcon(faDatabase);
        break;
      case "prisma":
        setIcon(faPrisma);
        break;
      case "git":      
        setIcon(faGit)
        break;
      case "Nodejs":
        setIcon(faNodeJs)
        break;
      case "C++":
        setIcon(faCplusplus)
        break;
      case "C":
        setIcon(faC)
        break;
      case "raspberrypi":
        setIcon(faRaspberryPi)
        break;
      case "arduino":
        setIcon(faInfinity)
        break;
      case "node":
        setIcon(faNode)
        break;
      case "scss":
        setIcon(faSass)
        break;
      case "nextjs":
        setIcon(faNextJs)
        break;
      case "react":
        setIcon(faReact)
        break;
      // case ""
      default:
        setIcon(fa0)
    }
  },[props.icon]);
  return <FontAwesomeIcon icon={icon} size={props.size}/>
};
ToIcon.defaultProps = defaultProps
export default ToIcon;

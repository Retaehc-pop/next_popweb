import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPrisma, faTypeScript } from "./icons";
import {
  faCss3,
  faHtml5,
  faJs,
  faPython,
  IconDefinition,
  faGit,
  faNodeJs
} from "@fortawesome/free-brands-svg-icons";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Layout.module.scss";
const Icon = (props: { icon: IconDefinition,name:string }) => {
  return (
    <div className={styles.iconholder}>
      <i><FontAwesomeIcon icon={props.icon} size="3x" /></i>
      <p>{props.name}</p>
    </div>
  );
};

const ToIcon = (props: { icon: string }) => {
  switch (props.icon) {
    case "typescript":
      return <Icon icon={faTypeScript} name={props.icon}/>;
    case "css":
      return <Icon icon={faCss3} name={props.icon}/>;
    case "html":
      return <Icon icon={faHtml5} name={props.icon}/>;
    case "javascript":
      return <Icon icon={faJs} name={props.icon}/>;
    case "python":
      return <Icon icon={faPython} name={props.icon}/>;
    case "sql":
      return <Icon icon={faDatabase} name={props.icon}/>;
    case "prisma":
      return <Icon icon={faPrisma} name={props.icon}/>;
    case "git":
      return <Icon icon={faGit} name={props.icon}/>;
    case "nodejs":
      return <Icon icon={faNodeJs} name={props.icon}/>;
    default:
      return <></>;
  }
};
export default ToIcon;

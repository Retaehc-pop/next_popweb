import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as faStarFill } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/Layout.module.scss";
const Rating: React.FC<{star: number}> = ({ star }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <i><FontAwesomeIcon
        key={i}
        icon={i < star ? faStarFill : faStar}
      /></i>
    );
  }
  return <div className={styles.rating}>{stars}</div>;
};

export default Rating;

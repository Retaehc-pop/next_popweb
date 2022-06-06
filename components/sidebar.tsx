import styles from "../styles/Layout.module.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser,faCode,faDiagramProject,faCrown,faAddressCard } from "@fortawesome/free-solid-svg-icons";

export default function SideBar({ onClickContact }){
  const date = new Date();
  return (
      <section className={styles.sidebar}>
          <div className={styles.header}>
            <img src="favicon.ico" />
            <h1>Pop</h1>
          </div>
          <div className={styles.menu}>
            <Link href="#about" passHref>
            <span onClick={() => onClickContact()}>
              <FontAwesomeIcon icon={faUser} />
              <p>About me</p>
            </span>
            </Link>
            <Link href="/contact" passHref>
            <span>
              <FontAwesomeIcon icon={faCode} />
              <p>Experties</p>
            </span>
            </Link>
            <Link href="/project" passHref>
            <span>
              <FontAwesomeIcon icon={faDiagramProject} />
              <p>Projects</p>
            </span>
            </Link>
            
            <Link href="/contact" passHref>
            <span>
              <FontAwesomeIcon icon={faCrown} />
              <p>Experience</p>
            </span>
            </Link>
          </div>
          <div>
            <Link href="/contact" passHref>
            <span>
              <FontAwesomeIcon icon={faAddressCard} />
              <p>Contact</p>
            </span>
            </Link>
          </div>
          <div>
            <p>©{date.getFullYear()}</p>
          </div>
        </section>
  )
}
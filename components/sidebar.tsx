import styles from "../styles/Layout.module.scss";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCode,
  faDiagramProject,
  faCrown,
  faAddressCard,
  faLock,
  faArrowRightFromBracket,
  faCubes,
} from "@fortawesome/free-solid-svg-icons";
import { signIn, signOut, useSession } from "next-auth/react";
export default function SideBar() {
  const date = new Date();
  const { data, status } = useSession();
  console.log(data, status);
  return (
    <section className={styles.sidebar}>
      <div className={styles.header}>
        <img src="favicon.ico" />
        <h1>Pop</h1>
      </div>
      <div className={styles.menu}>
        <Link href="#about" passHref>
          <span>
            <FontAwesomeIcon icon={faUser} />
            <p>About me</p>
          </span>
        </Link>
        <Link href="#Experties" passHref>
          <span>
            <FontAwesomeIcon icon={faCode} />
            <p>Experties</p>
          </span>
        </Link>
        <Link href="#project" passHref>
          <span>
            <FontAwesomeIcon icon={faDiagramProject} />
            <p>Projects</p>
          </span>
        </Link>

        <Link href="#Experience" passHref>
          <span>
            <FontAwesomeIcon icon={faCrown} />
            <p>Experience</p>
          </span>
        </Link>
      </div>
      <div>
        <Link href="#contact" passHref>
          <span>
            <FontAwesomeIcon icon={faAddressCard} />
            <p>Contact</p>
          </span>
        </Link>
        {status === "authenticated" ? (
          <>
          <Link href="/dashboard" passHref>
            <span>
              <FontAwesomeIcon icon={faCubes} />
              <p>Dashboard</p>
            </span>
          </Link>
          <span onClick={() => signOut()}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
            <p>Logout</p>
          </span>
          </>
        ) : (
          <span onClick={() => signIn("github")}>
            <FontAwesomeIcon icon={faLock} />
            <p>Sign In</p>
          </span>
        )}
      </div>
      <div>
        <p>©{date.getFullYear()}</p>
      </div>
    </section>
  );
}

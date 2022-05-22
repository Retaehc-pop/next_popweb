import Link from "next/link";
import styles from "../styles/Layout.module.scss";
import { useState, useEffect } from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin,faGithub,faInstagram,faStackOverflow,faDiscord} from "@fortawesome/free-brands-svg-icons";
import { faPhone, faEnvelope, faAdjust} from "@fortawesome/free-solid-svg-icons";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [burger, setBurger] = useState(false);
  const [darkTheme, setDarkTheme] = useState(undefined);
  const date = new Date();

  const storeUserSetPreference = (pref) => {
		localStorage.setItem("theme",pref);
	}

  const getMediaQueryPreference = () =>{
		const mediaQuery = "(prefers-color-scheme: dark)";
		const mql = window.matchMedia(mediaQuery);
		const hasPreference = typeof mql.matches === 'boolean';

		if (hasPreference){
			return mql.matches ? "dark":"light";
		}
	};

  useEffect(() => {
		const root = document.documentElement;
		const initialColorValue = root.style.getPropertyValue("--initial-color-mode");
		setDarkTheme(initialColorValue === "dark");
	}, []);

  useEffect(() => {
		const root = document.documentElement;
		if (darkTheme !== undefined) {
			if (darkTheme) {
				root.setAttribute("data-theme", "dark");
				storeUserSetPreference("dark");
			} 
			else {
				root.removeAttribute("data-theme");
				storeUserSetPreference("light");
			}
	}
	}, [darkTheme]);

  return (
    <>
      <nav className={styles.nav}>
        <Link href="/" passHref>
          <img src="/favicon.ico" width={50} height={50}/>
        </Link>
        <ul style={burger ? { transform: "translateX(0)" } : {}}>
          <li>
            <Link href="/" passHref>
              <a>ABOUT</a>
            </Link>
          </li>
          <li>
            <Link href="/" passHref>
              <a>PROJECTS</a>
            </Link>
          </li>
          <li>
            <Link href="/" passHref>
              <a>CONTACT</a>
            </Link>
          </li>
          <li>
            <a><FontAwesomeIcon className={styles.icon} onClick={() => setDarkTheme(!darkTheme)} icon={faAdjust}/></a>
          </li>
        </ul>
        <div className={styles.burger} onClick={() => setBurger(!burger)}>
          <div
            style={
              burger ? { transform: "rotate(45deg) translate(5px,6px)" } : {}
            }
          ></div>
          <div style={burger ? { opacity: "0" } : {}}></div>
          <div
            style={
              burger ? { transform: "rotate(-45deg) translate(5px,-6px)" } : {}
            }
          ></div>
        </div>
      </nav>
      {children}
      <footer className={styles.footer}>
        <section>
          <p>Papop Lekhapanyaporn ; Pop ; Retaehc</p>
          <p>© {date.getFullYear()} Retaehc, All rights reserved</p>
        </section>
        <div>
          <h3 className={styles.icon}>
            <Link href="mailto:papop2003@gmail.com" passHref>
              <a>
                <FontAwesomeIcon icon={faEnvelope} size="2x" />
              </a>
            </Link>
          </h3>
          <h3 className={styles.icon}>
            <Link href="https://www.instagram.com/pop.pxp/" passHref>
              <a>
                <FontAwesomeIcon icon={faInstagram} size="2x" />
              </a>
            </Link>
          </h3>
          <h3 aria-hidden="true" className={styles.icon}>
            <Link href="https://github.com/Retaehc-pop" passHref>
              <a>
                <FontAwesomeIcon icon={faGithub} size="2x" />
              </a>
            </Link>
          </h3>
          <h3 aria-hidden="true" className={styles.icon}>
            <Link href="tel:+66898118068" passHref>
              <a>
                <FontAwesomeIcon icon={faPhone} size="2x" />
              </a>
            </Link>
          </h3>
          <h3 className={styles.icon}>
            <Link
              href="https://stackoverflow.com/users/14537225/papop-lekhapanyaporn"
              passHref
            >
              <a>
                <FontAwesomeIcon icon={faStackOverflow} size="2x" />
              </a>
            </Link>
          </h3>
          <h3 className={styles.icon}>
            <Link
              href="https://www.linkedin.com/in/papop-lekhapanyaporn-2386b5229/"
              passHref
            >
              <a>
                <FontAwesomeIcon icon={faLinkedin} size="2x" />
              </a>
            </Link>
          </h3>
          <h3 className={styles.icon}>
            <Link
              href="https://discordapp.com/users/267572826418970624"
              passHref
            >
              <a>
                <FontAwesomeIcon icon={faDiscord} size="2x" />
              </a>
            </Link>
          </h3>
        </div>
      </footer>
    </>
  );
}

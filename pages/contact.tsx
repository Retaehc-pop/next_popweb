import type {NextPage} from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Contact.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { faDiscord, faGithub, faInstagram, faLinkedin, faStackOverflow } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone, faWindowMaximize } from "@fortawesome/free-solid-svg-icons";
const Contact: NextPage = () => {
  return(
    <>
    <Head>
      <title>POP</title>
      <meta name="description" content="Papop Lekhapanyaporn Portfolio" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className={styles.main}>
      <section className={styles.orbit}>
          <div className={styles.center}>
            <Image src="favicon.ico" alt="logo" />
          </div>
          <ul>
            <li>
              <div>
                <FontAwesomeIcon className={styles.icon} icon={faGithub} />
              </div>
              <Link href="https://github.com/Retaehc-pop">
              <p>Github</p>
              </Link>
            </li>
            <li>
              <div>
                <FontAwesomeIcon className={styles.icon} icon={faInstagram} />
              </div>
              <Link href="https://www.instagram.com/pop.pxp/">
                <p>Instagram</p>
              </Link>
            </li>
            <li>
              <div>
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={faDiscord}
                />
              </div>
              <Link href="https://discordapp.com/users/267572826418970624" passHref>
              <p>Discord</p>
              </Link>
            </li>
            <li>
              <div>
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={faLinkedin}
                />
              </div>
              <Link href="https://www.linkedin.com/in/papop-lekhapanyaporn-2386b5229/" passHref>
              <p>Linkedin</p>
              </Link>
            </li>
            <li>
              <div>
                <FontAwesomeIcon className={styles.icon} icon={faEnvelope} />
              </div>
              <Link href="mailto:papop2003@gmail.com">
              <p>Email</p>
              </Link>
            </li>
            <li>
              <div>
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={faPhone}
                />
              </div>
              <Link href="tel:+66898118068">
              <p>Phone</p>
              </Link>
            </li>
            <li>
            <div>
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={faStackOverflow}
                />
              </div>
              <Link href="https://stackoverflow.com/users/14537225/papop-lekhapanyaporn">
              <p>StackOverflow</p>
              </Link>
              
            </li>
            <li>
            <div>
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={faWindowMaximize}
                />
              </div>
              <Link href="/" passHref>
                <p>My website</p>
              </Link>
            </li>
          </ul>
        </section>
    </main>
    </>
  )
}

export default Contact;
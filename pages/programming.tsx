import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/layout";
import styles from "../styles/Programming.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faDatabase,
} from "@fortawesome/free-solid-svg-icons";
import {
  faPython,
  faRaspberryPi,
  faJs,
  faSass,
  faCss3Alt,
  faReact,
  faHtml5,
  faGithub,
  faEthereum,
  faNode,
  faUbuntu,
  faNodeJs,
} from "@fortawesome/free-brands-svg-icons";
import { faC, faInfinity } from "@fortawesome/free-solid-svg-icons";
import { faCplusplus,faTypeScript,faNextJs,faPrisma} from "../components/icons/";

const Web: NextPage = () => {
  return (
    <>
      <Head>
        <title>POP</title>
        <meta name="description" content="Papop Lekhapanyaporn Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* <Layout> */}
        <main className={styles.main}>
          <section className={styles.first}>
            <div>
              <div style={{background:"transparent"}}></div>
            </div>
            <div>
              <div><i><FontAwesomeIcon icon={faDatabase}  className={styles.icon}/></i></div>
            </div>
            <div>
              <div><i><FontAwesomeIcon icon={faPrisma}  className={styles.icon}/></i></div>
            </div>
            <div>
              <div><i><FontAwesomeIcon icon={faCplusplus}  className={styles.icon}/></i></div>
            </div>
            <div>
              <div style={{background:"transparent"}}></div>
            </div>


            <div>
              <div><i><FontAwesomeIcon icon={faNextJs}  className={styles.icon}/></i></div>
            </div>
            <div>
              <div><i><FontAwesomeIcon icon={faHtml5}  className={styles.icon}/></i></div>
            </div>
            <div>
              <div><i><FontAwesomeIcon icon={faC}  className={styles.icon}/></i></div>
            </div>
            <div>
              <div><i><FontAwesomeIcon icon={faInfinity}  className={styles.icon}/></i></div>
            </div>
            <div>
              <div style={{background:"transparent"}}></div>
            </div>


            <div>
              <div><i><FontAwesomeIcon icon={faReact}  className={styles.icon}/></i></div>
            </div>
            <div>
              <div><i><FontAwesomeIcon icon={faJs}  className={styles.icon}/></i></div>
            </div>
            <div>
              <div><i><FontAwesomeIcon icon={faCode}  className={styles.icon}/></i></div>
            </div>
            <div>
              <div><i><FontAwesomeIcon icon={faPython}  className={styles.icon}/></i></div>
            </div>
            <div>
              <div><i><FontAwesomeIcon icon={faRaspberryPi}  className={styles.icon}/></i></div>
            </div>


            <div>
              <div><i><FontAwesomeIcon icon={faTypeScript}  className={styles.icon}/></i></div>
            </div>
            <div>
              <div><i><FontAwesomeIcon icon={faCss3Alt}  className={styles.icon}/></i></div>
            </div>
            <div>
              <div><i><FontAwesomeIcon icon={faGithub}  className={styles.icon}/></i></div>
            </div>
            <div>
              <div><i><FontAwesomeIcon icon={faUbuntu}  className={styles.icon}/></i></div>
            </div>
            <div>
              <div style={{background:"transparent"}}></div>
            </div>
            <div>
              <div style={{background:"transparent"}}></div>
            </div>
            
            <div>
              <div><i><FontAwesomeIcon icon={faSass}  className={styles.icon}/></i></div>
            </div>
            <div>
              <div><i><FontAwesomeIcon icon={faNodeJs}  className={styles.icon}/></i></div>
            </div>
            <div>
              <div><i><FontAwesomeIcon icon={faEthereum}  className={styles.icon}/></i></div>
            </div>
            <div>
              <div style={{background:"transparent"}}></div>
            </div>
          </section>
        </main>
      {/* </Layout> */}
    </>
  );
};

export default Web;

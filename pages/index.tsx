import type { NextPage } from "next";
import React, { useState, useRef, useEffect } from "react";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import Link from "next/link";
import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLogo } from "../components/icons";
import {
  Spring,
  animated,
  useChain,
  useTrail,
  useTransition,
  useSpringRef,
  useSpring,
  config,
} from "react-spring";
import VisibilitySensor from "react-visibility-sensor";
import {
  faChevronDown,
  faCode,
  faCrown,
  faDiagramProject,
  faUser,
  faC,
  faInfinity,
  faDatabase,
  faR,
  faWindowMaximize,
  faFire,
  faPhone,
  faLocationPin,
  faMapPin,
  faChevronLeft,
  faChevronRight,
  faCircleChevronRight,
  faCircleChevronLeft,
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
  faStackOverflow,
  faInstagram,
  faLinkedin,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCplusplus,
  faTypeScript,
  faNextJs,
  faPrisma,
} from "../components/icons/";
import Modal from "../components/modal";

const Trail = ({ open, children }: { open: boolean; children: any }) => {
  const items = React.Children.toArray(children);
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  });
  return (
    <>
      {trail.map(({ height, ...style }, index) => (
        <animated.div key={index} style={style}>
          <animated.div style={{ height }}>{items[index]}</animated.div>
        </animated.div>
      ))}
    </>
  );
};

const projects = [
  {
    id: 1,
    name: "proj1",
    description: "lorem ipsum",
    image: [
      "/static/profile.jpg",
      "/static/profile.jpg",
      "/static/profile.jpg",
      "/static/profile.jpg",
    ],
  },
  {
    id: 2,
    name: "proj2",
    description: "lorem ipsum",
    image: [
      "/static/profile.jpg",
      "/static/profile.jpg",
      "/static/profile.jpg",
      "/static/profile.jpg",
    ],
  },
  {
    id: 3,
    name: "proj3",
    description: "lorem ipsum",
    image: [
      "/static/profile.jpg",
      "/static/profile.jpg",
      "/static/profile.jpg",
      "/static/profile.jpg",
    ],
  },
  {
    id: 4,
    name: "proj4",
    description: "lorem ipsum",
    image: [
      "/static/profile.jpg",
      "/static/profile.jpg",
      "/static/profile.jpg",
      "/static/profile.jpg",
    ],
  },
  {
    id: 5,
    name: "proj5",
    description: "lorem ipsum",
    image: [
      "/static/profile.jpg",
      "/static/profile.jpg",
      "/static/profile.jpg",
      "/static/profile.jpg",
    ],
  },
  {
    id: 6,
    name: "proj6",
    description: "lorem ipsum",
    image: [
      "/static/profile.jpg",
      "/static/profile.jpg",
      "/static/profile.jpg",
      "/static/profile.jpg",
    ],
  },
  {
    id: 7,
    name: "proj7",
    description: "lorem ipsum",
    image: [
      "/static/profile.jpg",
      "/static/profile.jpg",
      "/static/profile.jpg",
      "/static/profile.jpg",
    ],
  },
];
const Home: NextPage = () => {
  const date = new Date();
  const parallax = useRef<IParallax>(null!);
  const [project, setProject] = useState({
    id:0,
    name:"",
    description:"",
    image: [],
  });
  const [openProject, setOpenProject] = useState(false);
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <section className={styles.sidebar}>
          <div className={styles.header}>
            <img src="favicon.ico" />
            <h1>Pop</h1>
          </div>
          <div className={styles.menu}>
            <Link href="#about" passHref>
              <span onClick={() => parallax.current.scrollTo(1)}>
                <FontAwesomeIcon icon={faUser} />
                <p>About me</p>
              </span>
            </Link>
            <Link href="#Experties" passHref>
              <span onClick={() => parallax.current.scrollTo(3)}>
                <FontAwesomeIcon icon={faCode} />
                <p>Experties</p>
              </span>
            </Link>
            <Link href="#Projects" passHref>
              <span onClick={() => parallax.current.scrollTo(4)}>
                <FontAwesomeIcon icon={faDiagramProject} />
                <p>Projects</p>
              </span>
            </Link>

            <Link href="#Experience" passHref>
              <span onClick={() => parallax.current.scrollTo(5)}>
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
          <div className={styles.footer}>
            <p>© {date.getFullYear()}</p>
          </div>
        </section>
        <section className={styles.parallax}>
          <Parallax ref={parallax} pages={10}>
            <ParallaxLayer offset={0} speed={0.1} className={styles.landing}>
              <VisibilitySensor partialVisibility>
                {({ isVisible }) => (
                  <Spring delay={300} to={{ opacity: isVisible ? 1 : 0 }}>
                    {(props) => (
                      <animated.div style={{ ...props }}>
                        <h1>
                          Hi,
                          <br />
                          I'm Pop,
                          <br />
                          Software developer
                        </h1>
                      </animated.div>
                    )}
                  </Spring>
                )}
              </VisibilitySensor>
              <FontAwesomeIcon icon={faLogo} className={styles.icon} />
            </ParallaxLayer>

            <ParallaxLayer offset={0} speed={0.5} className={styles.chevron}>
              <FontAwesomeIcon
                icon={faChevronDown}
                onClick={() => parallax.current.scrollTo(1)}
              />
            </ParallaxLayer>

            <ParallaxLayer offset={1} speed={0.6} className={styles.about}>
              <section>
                <h1>Papop Lekhapanyaporn</h1>
                <h3>Pop</h3>
                <h3>
                  {new Date().getFullYear() -
                    new Date("March 20, 2003 00:00:00").getFullYear()}{" "}
                  Years Old
                </h3>
                <h3>From Bangkok,Thailand</h3>
                <p>
                  <FontAwesomeIcon icon={faMapPin} /> Bangkok,Thailand
                </p>
                <div>
                  <Link href="mailto:papop2003@gmail.com" passHref>
                    <span>
                      <FontAwesomeIcon icon={faEnvelope} size="2x" />
                      <p>E-mail</p>
                    </span>
                  </Link>
                  <Link href="https://www.instagram.com/__pop.p/" passHref>
                    <span>
                      <FontAwesomeIcon icon={faInstagram} size="2x" />
                      <p>Instagram</p>
                    </span>
                  </Link>
                  <Link href="https://github.com/Retaehc-pop" passHref>
                    <span>
                      <FontAwesomeIcon icon={faGithub} size="2x" />
                      <p>Github</p>
                    </span>
                  </Link>
                  <Link href="tel:+66898118068" passHref>
                    <span>
                      <FontAwesomeIcon icon={faPhone} size="2x" />
                      <p>Phone</p>
                    </span>
                  </Link>
                  <Link
                    href="https://stackoverflow.com/users/14537225/papop-lekhapanyaporn"
                    passHref
                  >
                    <span>
                      <FontAwesomeIcon icon={faStackOverflow} size="2x" />
                      <p>Stack overflow</p>
                    </span>
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/papop-lekhapanyaporn-2386b5229/"
                    passHref
                  >
                    <span>
                      <FontAwesomeIcon icon={faLinkedin} size="2x" />
                      <p>Linked In</p>
                    </span>
                  </Link>
                  <Link
                    href="https://discordapp.com/users/267572826418970624"
                    passHref
                  >
                    <span>
                      <FontAwesomeIcon icon={faDiscord} size="2x" />
                      <p>Discord</p>
                    </span>
                  </Link>
                </div>
              </section>
              <section>
                <img src="static/profile.jpg" />
              </section>
            </ParallaxLayer>
            {/* <ParallaxLayer offset={1} speed={0.5} className={styles.chevron}>
              <FontAwesomeIcon
                icon={faChevronDown}
                onClick={() => parallax.current.scrollTo(2)}
              />
            </ParallaxLayer> */}
            <ParallaxLayer offset={2} speed={0.7} className={styles.education}>
              <VisibilitySensor partialVisibility>
                {({ isVisible }) => (
                  <section>
                    <Spring
                      delay={300}
                      to={{
                        transform: isVisible
                          ? "translateX(0)"
                          : "translateX(400px)",
                        opacity: isVisible ? 1 : 0,
                      }}
                    >
                      {(props) => (
                        <animated.div style={{ ...props }}>
                          <h1>Education</h1>
                        </animated.div>
                      )}
                    </Spring>
                    <Trail open={isVisible}>
                      <div>
                        <span>
                          <h3>Present</h3>
                        </span>
                        <span>
                          <h2>RWTH Aachen University</h2>
                          <h4>Bachlor of Science Computer Sciene</h4>
                        </span>
                        <span>
                          <img src="/static/RWTHAachen.jpg" />
                        </span>
                      </div>

                      <div>
                        <span>
                          <h3>2022</h3>
                        </span>
                        <span>
                          <h2>Assumption College</h2>
                          <h4>Science - Engineering</h4>
                          <p>GPAX:3.64</p>
                        </span>
                        <span>
                          <img src="/static/AssumptionCollege.jpg" />
                        </span>
                      </div>
                    </Trail>
                  </section>
                )}
              </VisibilitySensor>
            </ParallaxLayer>
            <ParallaxLayer offset={3} speed={0.6} className={styles.experties}>
              <div>
                <h1>Experties</h1>
              </div>
              <section style={{ justifyItems: "center" }}>
                <h3>Coding</h3>
                <h3>since</h3>
                <h3>2015</h3>
              </section>
              <section>
                <div className={styles.first}>
                  <div>
                    <div style={{ background: "transparent" }}></div>
                  </div>
                  <div>
                    <div>
                      <i>
                        <FontAwesomeIcon icon={faPython} />
                      </i>
                      <p>python</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <i>
                        <FontAwesomeIcon icon={faDatabase} />
                      </i>
                      <p>MySQL</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <i>
                        <FontAwesomeIcon icon={faUbuntu} />
                      </i>
                      <p>Linux</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <i>
                        <FontAwesomeIcon icon={faCode} />
                      </i>
                      <p>Coding</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <i>
                        <FontAwesomeIcon icon={faC} />
                      </i>
                      <p>C</p>
                    </div>
                  </div>
                  <div>
                    <div style={{ background: "transparent" }}></div>
                  </div>
                  <div>
                    <div>
                      <i>
                        <FontAwesomeIcon icon={faCplusplus} />
                      </i>
                      <p>C++</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <i>
                        <FontAwesomeIcon icon={faGithub} />
                      </i>
                      <p>Github</p>
                    </div>
                  </div>
                </div>

                <div className={styles.first}>
                  <div>
                    <div style={{ background: "transparent" }}></div>
                  </div>
                  <div>
                    <div>
                      <i>
                        <FontAwesomeIcon icon={faPrisma} />
                      </i>
                      <p>Prisma.io</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <i>
                        <FontAwesomeIcon icon={faTypeScript} />
                      </i>
                      <p>TypeScript</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <i>
                        <FontAwesomeIcon icon={faJs} />
                      </i>
                      <p>JavaScript</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <i>
                        <FontAwesomeIcon icon={faWindowMaximize} />
                      </i>
                      <p>Web Dev</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <i>
                        <FontAwesomeIcon icon={faSass} />
                      </i>
                      <p>Sass/Scss</p>
                    </div>
                  </div>
                  <div>
                    <div style={{ background: "transparent" }}></div>
                  </div>
                  <div>
                    <div>
                      <i>
                        <FontAwesomeIcon icon={faHtml5} />
                      </i>
                      <p>HTML</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <i>
                        <FontAwesomeIcon icon={faCss3Alt} />
                      </i>
                      <p>CSS</p>
                    </div>
                  </div>
                </div>
                <div className={styles.first}>
                  <div>
                    <div style={{ background: "transparent" }}></div>
                  </div>
                  <div>
                    <div>
                      <i>
                        <FontAwesomeIcon icon={faRaspberryPi} />
                      </i>
                      <p>RaspberryPi</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <i>
                        <FontAwesomeIcon icon={faInfinity} />
                      </i>
                      <p>Ardino</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <i>
                        <FontAwesomeIcon icon={faEthereum} />
                      </i>
                      <p>Solidity</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <i>
                        <FontAwesomeIcon icon={faNodeJs} />
                      </i>
                      <p>Node.Js</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <i>
                        <FontAwesomeIcon icon={faFire} />
                      </i>
                      <p>Pytorch</p>
                    </div>
                  </div>
                  <div>
                    <div style={{ background: "transparent" }}></div>
                  </div>
                  <div>
                    <div>
                      <i>
                        <FontAwesomeIcon icon={faNextJs} />
                      </i>
                      <p>Next.js</p>
                    </div>
                  </div>
                  <div>
                    <div>
                      <i>
                        <FontAwesomeIcon icon={faReact} />
                      </i>
                      <p>React</p>
                    </div>
                  </div>
                </div>
              </section>
            </ParallaxLayer>

            <ParallaxLayer offset={4} speed={0.5} className={styles.projects}>
              <section>
                <h1>Project</h1>
              </section>
              <section className={styles.imagegallary}>
                <div>
                  <i>
                    <FontAwesomeIcon icon={faCode} size="4x" />
                  </i>
                </div>
                <section>
                  <span>
                    <p>{projects.length}</p>
                    <h4>Project</h4>
                  </span>
                  <span>
                    <p>2</p>
                    <h4>On-going</h4>
                  </span>
                  <span>
                    <p>5</p>
                    <h4>Competition</h4>
                  </span>
                </section>
                {
                projects.map((project, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      setProject(project);
                      setOpenProject(true);
                    }}
                  >
                    <img
                      src={
                        project.image.length !== 0
                          ? project.image[0]
                          : "/static/AssumptionCollege.jpg"
                      }
                    />
                  </div>
                ))
                }
                <Modal onClose={()=>setOpenProject(false)} open={openProject}>
                  <div className={styles.modal}>
                    <div className={styles.img}>
                      <img src={project.image[0]}/>
                      <i style={{left:"5%"}}><FontAwesomeIcon icon={faCircleChevronLeft}/></i>
                      <i style={{right:"45%"}}><FontAwesomeIcon icon={faCircleChevronRight}/></i>
                    </div>
                    <div className={styles.description}>
                      <h1>{project.name}</h1>
                      <p>{project.description}</p>
                    </div>
                  </div>
                </Modal>
              </section>
            </ParallaxLayer>

            <ParallaxLayer offset={5} speed={0.5} className={styles.projects}>
              <section>
                <h1>Experience</h1>
              </section>
              <section>
                <div>
                  <span>a</span>
                  <span>a</span>
                  <span>a</span>
                </div>
              </section>
            </ParallaxLayer>
          </Parallax>
        </section>
      </main>
    </>
  );
};

export default Home;

import type { NextPage } from "next";
import React, { useState, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.scss";
import Link from "next/link";
import { Parallax, ParallaxLayer, IParallax } from "@react-spring/parallax";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLogo } from "../components/icons";
import {
  Spring,
  animated
} from "react-spring";
import VisibilitySensor from "react-visibility-sensor";
import {
  faCode,
  faCrown,
  faDiagramProject,
  faUser,
  faC,
  faInfinity,
  faDatabase,
  faWindowMaximize,
  faFire,
  faPhone,
  faMapPin,
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
  faUbuntu,
  faNodeJs,
  faStackOverflow,
  faInstagram,
  faLinkedin,
  faDiscord,
  IconDefinition,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCplusplus,
  faTypeScript,
  faNextJs,
  faPrisma,
} from "../components/icons/";
import Modal from "../components/modal";
import SideBar, { SideBarProps } from "../components/sidebar";
import { Project } from "@prisma/client";
import { fullProject } from "../components/prisma"

export async function getServerSideProps() {
  const project = await fetch("http://localhost:3000/api/project");
  const projectData = await project.json();
  return {
    props: {
      projects: projectData,
    },
  };
}

const Home: NextPage = ({projects}:{projects: fullProject[];}) => {
  const date = new Date();
  const parallax = useRef<IParallax>(null!);

  const parallaxScrollTo = (page) => {
    if (parallax.current !== null) {
      parallax.current.scrollTo(page);
    }
  };

  const sidebarItem: SideBarProps[] = [
    {
      name: "About me",
      href: "#about",
      icon: faUser,
      onClick: () => parallaxScrollTo(1),
    },
    {
      name: "Experties",
      href: "#Experties",
      icon: faCode,
      onClick: () => parallaxScrollTo(2),
    },
    {
      name: "Projects",
      href: "#Projects",
      icon: faDiagramProject,
      onClick: () => parallaxScrollTo(3),
    },
    {
      name: "Experience",
      href: "#Experience",
      icon: faCrown,
      onClick: () => parallaxScrollTo(4),
    },
    {
      name: "Contact",
      href: "#contact",
      icon: faAddressCard,
      onClick: () => parallaxScrollTo(5),
    },
  ];

  const hexagonalTile = (props) => {
    const [hexItem, setHexItem] = React.useState(props);
    return (
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
                  <FontAwesomeIcon icon={item.icon} />
                </i>
                <p>{item.name}</p>
              </div>
            </div>
          )
        )}
      </div>
    );
  };
  const [project, setProject] = useState<fullProject>();
  console.log(projects);
  const [openProject, setOpenProject] = useState(false);
  return (
    <>
      <Head>
        <title>Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SideBar item={sidebarItem} name="Home" />
      <main className={styles.main}>
        <section className={styles.parallax}>
          <Parallax ref={parallax} pages={5}>
            <ParallaxLayer offset={0} speed={0.1} className={styles.landing}>
              <VisibilitySensor partialVisibility>
                {({ isVisible }) => (
                  <Spring delay={300} to={{ opacity: isVisible ? 1 : 0 }}>
                    {(props) => (
                      <animated.div style={{ ...props }}>
                        <h1>
                          Hi,
                          <br />
                          I&apos;m Pop,
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

            <ParallaxLayer offset={1} speed={0.6} className={styles.about}>
              <VisibilitySensor partialVisibility>
                {({ isVisible }) => (
                  <Spring
                    delay={300}
                    to={{
                      transform: isVisible
                        ? "translateX(0)"
                        : "translateY(400px)",
                      opacity: isVisible ? 1 : 0,
                    }}
                  >
                    {(props) => (
                      <animated.section style={{ ...props }}>
                        <h2>Papop Lekhapanyaporn</h2>
                        <h3>Pop</h3>
                        <h3>
                          {new Date().getFullYear() -
                            new Date(
                              "March 20, 2003 00:00:00"
                            ).getFullYear()}{" "}
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
                          <Link
                            href="https://www.instagram.com/__pop.p/"
                            passHref
                          >
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
                              <FontAwesomeIcon
                                icon={faStackOverflow}
                                size="2x"
                              />
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
                      </animated.section>
                    )}
                  </Spring>
                )}
              </VisibilitySensor>
              <VisibilitySensor partialVisibility>
                {({ isVisible }) => (
                  <section>
                    <Spring
                      delay={300}
                      to={{
                        borderRadius: isVisible ? "50%" : "0%",
                        opacity: isVisible ? 1 : 0,
                      }}
                    >
                      {(props) => (
                        <animated.img
                          style={{ ...props }}
                          alt="profilepic"
                          src="static/profile.jpg"
                        />
                      )}
                    </Spring>
                  </section>
                )}
              </VisibilitySensor>
            </ParallaxLayer>
            <ParallaxLayer offset={2} speed={0.6} className={styles.experties}>
              <div>
                <h1>Experties</h1>
              </div>
              <section>
                {
                hexagonalTile([{name: "none",icon: null},
                    {name: "Python",icon: faPython},
                    {name: "mySQL",icon: faDatabase},
                    {name: "ubuntu",icon: faUbuntu},
                    {name: "Coding",icon: faCode},
                    {name: "C",icon: faC},
                    {name: "none",icon: null},
                    {name: "C++",icon: faCplusplus},
                    {name: "github",icon: faGithub},])
                }{
                  hexagonalTile([{name: "none",icon: null},
                      {name: "Prisma.io",icon: faPrisma},
                      {name: "TypeScript",icon: faTypeScript},
                      {name: "JavaScript",icon: faJs},
                      {name: "Web Dev",icon: faWindowMaximize},
                      {name: "Sass/Scss",icon: faSass},
                      {name: "none",icon: null},
                      {name: "HTML5",icon: faHtml5},
                      {name: "CSS",icon: faCss3Alt},])
                  }
                  {
                  hexagonalTile([{name: "none",icon: null},
                      {name: "RaspberryPi",icon: faRaspberryPi},
                      {name: "Ardino",icon: faInfinity},
                      {name: "Solidity",icon: faEthereum},
                      {name: "Node.Js",icon: faNodeJs},
                      {name: "Pytorch",icon: faFire},
                      {name: "none",icon: null},
                      {name: "Next.js",icon: faNextJs},
                      {name: "React",icon: faReact},])
                  }
              </section>
            </ParallaxLayer>

            <ParallaxLayer offset={3} speed={0.5} className={styles.projects}>
                <h1>Project</h1>
                <section>

                </section>
                {/* <section className={styles.showcase}>
                  {projects.map((project, index) => (
                    <div key={project.id} onClick={() => {setProject(project);setOpenProject(true);}}>
                      <Image src={
                          project.images ?
                            project.images[0].url
                            : "/static/AssumptionCollege.jpg"
                        }
                        width="100%"
                        height="100%"
                        alt={project.name}
                      />
                    </div>
                  ))}
                </section> */}
                {/* <Modal onClose={() => setOpenProject(false)} open={openProject}>
                  <div className={styles.modal}>
                    <div className={styles.img}>
                      <Image
                        src={project.images[0].url}
                        className={styles.image}
                        objectFit="contain"
                        width="100%"
                        height="100%"
                        alt={project.name}
                      />
                      <i style={{ left: "5%" }}>
                        <FontAwesomeIcon icon={faCircleChevronLeft} />
                      </i>
                      <i style={{ right: "45%" }}>
                        <FontAwesomeIcon icon={faCircleChevronRight} />
                      </i>
                    </div>
                    <div className={styles.description}>
                      <h1>{project.name}</h1>
                      <p>{project.description}</p>
                    </div>
                  </div>
                </Modal> */}
            </ParallaxLayer>

            <ParallaxLayer offset={4} speed={0.5} className={styles.experience}>
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

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
import { Spring, animated } from "react-spring";
import VisibilitySensor from "react-visibility-sensor";
import {
  faCode,
  faCrown,
  faDiagramProject,
  faUser,
  faC,
  faInfinity,
  faDatabase,
  faFire,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import {
  faPython,
  faRaspberryPi,
  faSass,
  faReact,
  faHtml5,
  faGithub,
  faNodeJs,
  faInstagram,
  faDiscord,
  IconDefinition,
} from "@fortawesome/free-brands-svg-icons";
import {
  faCplusplus,
  faTypeScript,
  faNextJs,
  faPrisma,
} from "../components/icons/";
import { useRouter } from "next/router";
import SideBar, { SideBarProps } from "../components/sidebar";
import { fullProject } from "../components/prisma";
import HexagonalTile from "../components/hexagonalTile";
import prisma from "../components/prisma";


export async function getServerSideProps() {
  const res = await prisma.project.findMany({
    where:{
      showcase:true
    },
    include:{
      languages:{
        select:{
          language:true
        }
      },
      categories:{
        select:{
          category:true
        }
      },
      images:true
    }
  })
  return {
    props: {
      projects: JSON.parse(JSON.stringify(res)),
    },
  };
}

const Home: NextPage = ({ projects }: { projects: fullProject[] }) => {
  const date = new Date();
  const parallax = useRef<IParallax>(null!);
  const router = useRouter();

  const parallaxScrollTo = (page) => {
    if (parallax.current !== null) {
      parallax.current.scrollTo(page);
    }
  };

  const sidebarItem: SideBarProps[] = [
    {
      name: "About me",
      href: "#about",
      icon: <FontAwesomeIcon icon={faUser} />,
      onClick: () => parallaxScrollTo(1),
    },
    {
      name: "Experties",
      href: "#Experties",
      icon: <FontAwesomeIcon icon={faCode} />,
      onClick: () => parallaxScrollTo(2),
    },
    {
      name: "Projects",
      href: "#Projects",
      icon: <FontAwesomeIcon icon={faDiagramProject} />,
      onClick: () => parallaxScrollTo(3),
    },
    {
      name: "Experience",
      href: "#Experience",
      icon: <FontAwesomeIcon icon={faCrown} />,
      onClick: () => parallaxScrollTo(4),
    }
  ];

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
            <ParallaxLayer offset={0} speed={0.1} className={styles.landing} onClick={() => parallaxScrollTo(1)}>
              <div>
                <h1>
                  Hi,
                  <br />
                  I&apos;m Pop,
                  <br />
                  Software developer
                </h1>
                <div className={styles.contact}>
                  <Link href="mailto:papop2003@gmail.com" passHref>
                    <div>
                      <i>
                        <FontAwesomeIcon icon={faEnvelope} size="2x" />
                      </i>
                      <p>E-mail</p>
                    </div>
                  </Link>
                  <Link href="https://www.instagram.com/__pop.p/" passHref>
                    <div>
                      <i>
                        <FontAwesomeIcon icon={faInstagram} size="2x" />
                      </i>
                      <p>Instagram</p>
                    </div>
                  </Link>
                  <Link href="https://github.com/Retaehc-pop" passHref>
                    <div>
                      <i>
                        <FontAwesomeIcon icon={faGithub} size="2x" />
                      </i>
                      <p>Github</p>
                    </div>
                  </Link>
                  <Link
                    href="https://discordapp.com/users/267572826418970624"
                    passHref
                  >
                    <div>
                      <i>
                        <FontAwesomeIcon icon={faDiscord} size="2x" />
                      </i>
                      <p>Discord</p>
                    </div>
                  </Link>
                </div>
              </div>
              <FontAwesomeIcon icon={faLogo} className={styles.icon} />
            </ParallaxLayer>

            <ParallaxLayer offset={1} speed={0.6} className={styles.about}>
              <section style={{padding:"2rem"}}>
                <h2>Papop Lekhapanyaporn</h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati temporibus quaerat expedita libero nihil accusantium! Atque modi soluta velit. Magnam quam pariatur molestias, asperiores eligendi iusto ipsa fugit assumenda veritatis?</p>
              </section>
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
                <HexagonalTile
                  hexitem={[
                    {
                      name: "Python",
                      icon: <FontAwesomeIcon icon={faPython}/>,
                      onClick: () => {
                        router.push("/language#python");
                      },
                    },
                    {
                      name: "MySQL",
                      icon: <FontAwesomeIcon icon={faDatabase}/>,
                      onClick: () => {
                        router.push("/language#mysql");
                      },
                    },
                    {
                      name:"Prisma.io",
                      icon: <FontAwesomeIcon icon={faPrisma}/>,
                      onClick: () => {
                        router.push("/language#prisma");
                      }
                    },
                    {
                      name: "TypeScript",
                      icon: <FontAwesomeIcon icon={faTypeScript}/>,
                      onClick: () => {
                        router.push("/language#typescript");
                      },
                    },
                    {
                      name: "C",
                      icon: <FontAwesomeIcon icon={faC}/>,
                      onClick: () => {
                        router.push("/language#cplusplus");
                      },
                    },
                    {
                      name: "C++",
                      icon: <FontAwesomeIcon icon={faCplusplus}/>,
                      onClick: () => {
                        router.push("/language#cplusplus");
                      }
                    },
                    {
                      name: "Sass/Scss",
                      icon: <FontAwesomeIcon icon={faSass}/>,
                      onClick: () => {
                        router.push("/language#sass");
                      }
                    }
                  ]}
                />
                <HexagonalTile
                  hexitem={[
                    {
                      name: "RaspberryPi",
                      icon: <FontAwesomeIcon icon={faRaspberryPi}/>,
                      onClick: () => {
                        router.push("/language#raspberrypi");
                      },
                    },
                    {
                      name: "Arduino",
                      icon: <FontAwesomeIcon icon={faInfinity}/>,
                      onClick: () => {
                        router.push("/language#arduino");
                      },
                    },
                    {
                      name:"HTML5",
                      icon: <FontAwesomeIcon icon={faHtml5}/>,
                      onClick: () => {
                        router.push("/language#html");
                      }
                    },
                    {
                      name: "Node.js",
                      icon: <FontAwesomeIcon icon={faNodeJs}/>,
                      onClick: () => {
                        router.push("/language#nodejs");
                      },
                    },
                    {
                      name: "Pytorch",
                      icon: <FontAwesomeIcon icon={faFire}/>,
                      onClick: () => {
                        router.push("/language#pytorch");
                      },
                    },
                    {
                      name: "Next.js",
                      icon: <FontAwesomeIcon icon={faNextJs}/>,
                      onClick: () => {
                        router.push("/language#nextjs");
                      }
                    },
                    {
                      name: "React",
                      icon: <FontAwesomeIcon icon={faReact}/>,
                      onClick: () => {
                        router.push("/language#react");
                      }
                    }
                  ]}
                />
              </section>
            </ParallaxLayer>

            <ParallaxLayer offset={3} speed={0.5} className={styles.projects}>
              <h1>Project</h1>
              <h3>My best project</h3>
              <section>
                {projects.map((project) => (
                  <div key={project.name} className={styles.project}>
                    <Image
                      src={project.images[0].url}
                      alt={project.name}
                      className={styles.image}
                      layout="fill"
                      objectFit="cover"
                    />
                    <div>
                      <h3>{project.name}</h3>
                      <Link href={`/project/${project.name}`} passHref>
                        <p>View Project <FontAwesomeIcon icon={faArrowRight}/></p>
                      </Link>
                    </div>
                  </div>
                ))}
              </section>
              <Link href="/project" passHref>
                <h3 className={styles.link}>
                  More Project
                  <FontAwesomeIcon icon={faArrowRight} />
                </h3>
              </Link>
            </ParallaxLayer>

            <ParallaxLayer offset={4} speed={0.5} className={styles.experience}>
              <section>
                <h1>Experience</h1>
              </section>
              <section></section>
            </ParallaxLayer>
          </Parallax>
        </section>
      </main>
    </>
  );
};

export default Home;

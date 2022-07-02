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
import SideBar, { SideBarProps } from "../components/sidebar";
import { fullProject } from "../components/prisma";

export async function getServerSideProps() {
  const project = await fetch("http://localhost:3000/api/project",{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body:JSON.stringify({showcase:true}),
  });
  const projectData = await project.json();
  return {
    props: {
      projects: projectData,
    },
  };
}

const Home: NextPage = ({ projects }: { projects: fullProject[] }) => {
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
                  <Link href="https://discordapp.com/users/267572826418970624" passHref>
                    <div>
                      <i><FontAwesomeIcon icon={faDiscord} size="2x" /></i>
                      <p>Discord</p>
                    </div>
                  </Link>
                </div>
              </div>
              <FontAwesomeIcon icon={faLogo} className={styles.icon} />
            </ParallaxLayer>

            <ParallaxLayer offset={1} speed={0.6} className={styles.about}>
                <section>
                  <h2>Papop Lekhapanyaporn</h2>
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
                {hexagonalTile([
                  { name: "none", icon: null },
                  { name: "Python", icon: faPython },
                  { name: "mySQL", icon: faDatabase },
                  { name: "Prisma.io", icon: faPrisma },
                  { name: "TypeScript", icon: faTypeScript },
                  { name: "C", icon: faC },
                  { name: "none", icon: null },
                  { name: "C++", icon: faCplusplus },
                  { name: "Sass/Scss", icon: faSass },
                ])}
                {hexagonalTile([
                  { name: "none", icon: null },
                  { name: "RaspberryPi", icon: faRaspberryPi },
                  { name: "Ardino", icon: faInfinity },
                  { name: "HTML5", icon: faHtml5 },
                  { name: "Node.Js", icon: faNodeJs },
                  { name: "Pytorch", icon: faFire },
                  { name: "none", icon: null },
                  { name: "Next.js", icon: faNextJs },
                  { name: "React", icon: faReact },
                ])}
              </section>
            </ParallaxLayer>

            <ParallaxLayer offset={3} speed={0.5} className={styles.projects}>
              <h1>Project</h1>
              <section>
                <Link href="/project">
                  <h4>Explore Project<FontAwesomeIcon icon={faArrowRight}/></h4>
                </Link>
              </section>
            </ParallaxLayer>

            <ParallaxLayer offset={4} speed={0.5} className={styles.experience}>
              <section>
                <h1>Experience</h1>
              </section>
              <section>
              </section>
            </ParallaxLayer>
          </Parallax>
        </section>
      </main>
    </>
  );
};

export default Home;

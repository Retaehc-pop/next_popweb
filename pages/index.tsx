import type { NextPage } from "next";
import React, { useState, useRef,useEffect} from "react";
import Head from "next/head";
import styles from "../styles/Home.module.scss";
import Link from "next/link";
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faCode, faCrown, faDiagramProject, faUser } from "@fortawesome/free-solid-svg-icons";
import { faAddressCard } from "@fortawesome/free-regular-svg-icons";
import { faLogo } from "../components/icons";
import { Spring, animated, useChain, useTrail, useTransition,useSpringRef,useSpring, config } from 'react-spring'
import VisibilitySensor from "react-visibility-sensor";



const Trail: React.FC<{ open: boolean }> = ({ open, children }) => {
  const items = React.Children.toArray(children)
  const trail = useTrail(items.length, {
    config: { mass: 5, tension: 2000, friction: 200 },
    opacity: open ? 1 : 0,
    x: open ? 0 : 20,
    height: open ? 110 : 0,
    from: { opacity: 0, x: 20, height: 0 },
  })
  return (
    <div>
      {trail.map(({ height, ...style }, index) => (
        <animated.div key={index} className={styles.trailsText} style={style}>
          <animated.div style={{ height }}>{items[index]}</animated.div>
        </animated.div>
      ))}
    </div>
  )
}
const Home: NextPage = () => {
  const date = new Date();
  const parallax = useRef<IParallax>(null!)

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
          <div className={styles.footer}>
            <p>© {date.getFullYear()}</p>
          </div>
        </section>
        <section className={styles.parallax}>
          <Parallax ref={parallax} pages={5}>

            <ParallaxLayer offset={0} speed={0.1} className={styles.landing}>
              <VisibilitySensor partialVisibility>
              {({ isVisible }) => (
                <Spring delay={300} to={{ opacity: isVisible ? 1 : 0 }}>
                  {(props) => (
                  <animated.div style={{...props}}>
                    <h1>Hi,<br/>I'm Pop,<br/>Student developer</h1>
                  </animated.div>
                  )}
                </Spring>
                )}
              </VisibilitySensor>
              <FontAwesomeIcon icon={faLogo} className={styles.icon}/>
            </ParallaxLayer>

            <ParallaxLayer offset={0} speed={0.5} className={styles.chevron}>
                <FontAwesomeIcon icon={faChevronDown} onClick={() => parallax.current.scrollTo(1)}/>
            </ParallaxLayer>

            <ParallaxLayer offset={1} speed={0.6} className={styles.about}>
              <h1>Papop<br/>Lekhapanyaporn</h1>
          
            </ParallaxLayer>

            <ParallaxLayer offset={2} speed={0.6} className={styles.education__header}>
              <VisibilitySensor partialVisibility>
                {
                  ({ isVisible }) => (
                    <Spring delay={300}
                    to={{ transform: isVisible ? "translateX(0)" : "translateX(400px)",
                    opacity: isVisible? 1:0}}>
                      {(props) => (
                        <animated.div style={{...props}}>
                          <h1>
                          Education
                          </h1>
                        </animated.div>
                      )}
                    </Spring>
                  )
                }
              </VisibilitySensor>
            </ParallaxLayer>
            <ParallaxLayer offset={2} speed={0.6} className={styles.education}>
              <VisibilitySensor partialVisibility>
                {
                  ({ isVisible }) => (
                    <section>
                     <Trail open={isVisible}>
                        <span>a</span>
                        <span>b</span>
                        <span>c</span>
                        <span>d</span>
                      </Trail>
                       <div>
                        <h3>2022-Present</h3>
                        <h2>RWTH Aachen University</h2>
                        <h4>Bachlor of science Computer sciene</h4>
                       </div>
                       <div>
                       <h3>2015-2022</h3>
                        <h2>RWTH Aachen University</h2>
                        <h4>Science-Engineer</h4>
                        <h4>GPAX:3.64</h4>
                       </div>
                     </section>
                  )
                }
              </VisibilitySensor>
            </ParallaxLayer>
            </Parallax>
        </section>
      </main>
    </>
  );
};

export default Home;

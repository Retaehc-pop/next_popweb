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
import Image from "next/image";
import { signIn, signOut, useSession } from "next-auth/react";
import { IParallax } from "@react-spring/parallax";
import React from "react";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

export interface SideBarProps {
  name: string;
  icon: IconDefinition;
  href: string;
  onClick?: any;
}

const SideBar = (props: { item; name }) => {
  const [sideBar, setSideBar] = React.useState<SideBarProps[]>(props.item);
  const date = new Date();
  const { data, status } = useSession();
  return (
    <section className={styles.sidebar}>
      <div className={styles.header}>
        <Image src="/favicon.ico" alt="logo" width={60} height={60} objectFit="contain" />
        <h1>{props.name}</h1>
      </div>
      <div className={styles.menu}>
        {sideBar.map((item) => {
          return (
            <Link key={item.name} href={item.href} passHref>
              <span className={styles.button} onClick={item.onClick}>
                <FontAwesomeIcon icon={item.icon} />
                <p>{item.name}</p>
              </span>
            </Link>
          );
        })}
      </div>
      <div>
        {status === "authenticated" ? (
          <>
            <Link href="/dashboard" passHref>
              <span className={styles.button}>
                <FontAwesomeIcon icon={faCubes} />
                <p>Dashboard</p>
              </span>
            </Link>
            <span className={styles.button} onClick={() => signOut()}>
              <FontAwesomeIcon icon={faArrowRightFromBracket} />
              <p>Logout</p>
            </span>
          </>
        ) : (
          <span className={styles.button} onClick={() => signIn("github")}>
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
};
export default SideBar;

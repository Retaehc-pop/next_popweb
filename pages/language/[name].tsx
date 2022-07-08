import { Language } from "@prisma/client";
import type { NextPage,GetStaticPaths,GetStaticProps } from "next";
import { fullLanguage, fullProject } from "../../components/prisma";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/Language.module.scss";
import SideBar, {SideBarProps} from "../../components/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faLanguage } from "@fortawesome/free-solid-svg-icons";
import ToIcon from "../../components/toIcon";
import Project from "../project";
import Rating from "../../components/rating";
const sideBarItem: SideBarProps[] = [
  {
    name: "Language",
    href: "/language",
    icon: <></>,
    onClick: () => {}
  }
]
const Language:NextPage = ({language}: {language:fullLanguage}) => {
  console.log(language);
  return (
    <>
    <Head>
      <title>{language.name}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <SideBar item={sideBarItem} name={language.name}/>
    <main className={styles.main}>
      <section className={styles.header}>
        <div>
        <ToIcon icon={language.name}/>
        <h1>{language.name}</h1>
        </div>
        <Rating star={language.experties}/>
      </section>
      <section className={styles.showcase}>
        <div className={styles.projects}>
        {
          language.projects.map((project) => (
            <Link key={project.project.id} href={`/project/${project.project.name}`}>
              <div className={styles.project}>
                <Image className={styles.image} src={project.project.images[0].url} alt={project.project.name} layout="fill" objectFit="cover"/>
                <p>{project.project.name}</p>
              </div>
            </Link>
          ))
        }
        </div>
      </section>
    </main>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res =  await fetch("http://localhost:3000/api/language");
  const languages = await res.json();
  const paths = languages.map((language: Language) => ({ params: { name: language.name } }));
  return {
    paths: paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params;
  const res = await fetch(`http://localhost:3000/api/language/${name}`);
  const language = await res.json();
  return {
    props: {
      language: language
    }
  }
}

export default Language;
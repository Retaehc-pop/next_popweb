import type { NextPage, GetStaticPaths, GetStaticProps } from "next";
import prisma, { fullProject } from "../../components/prisma";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import SideBar, { SideBarProps } from "../../components/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  fa0,
  faProjectDiagram,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Carousel from "../../components/carousel";
import styles from "../../styles/Project.module.scss";
import { faStar as faStarFill } from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import ToIcon from "../../components/toIcon";

const sidebarItem: SideBarProps[] = [];

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = await prisma.project.findMany({
    select: {
      name: true,
    },
  });
  const paths = projects.map((project) => ({ params: { name: project.name } }));

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params;
  const res:fullProject = await prisma.project.findUnique({
    where: {
      name:`${name}`,
    },
    include:{
      languages: {
        select: {
          language: true,
        },
      },
      categories: {
        select: {
          category: true,
        }
      },
      images: true,
    }
  })
  return {
    props: { project:JSON.parse(JSON.stringify(res))},
  };
};

const Project: NextPage = ({ project }: { project: fullProject }) => {
  console.log(project);
  return (
    <>
      <Head>
        <title>{project.name}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SideBar item={sidebarItem} name={project.name} />
      <main className={styles.main}>
        <section className={styles.images}>
          <Carousel slides={project.images} />
        </section>
        <section className={styles.infos}>
          <div>
            <h1>{project.name}</h1>
            {project.showcase ? (
              <FontAwesomeIcon
                icon={faStarFill}
                style={{ color: "var(--color-star)" }}
                size="2x"
              />
            ) : (
              <FontAwesomeIcon icon={faStar} size="2x" />
            )}
          </div>
          <div style={project.started&&project.ended ? {}:{display:"none"}}>
            {project.started ? (
              <h2>
                {new Date(project.started).getDate()}/
                {new Date(project.started).getMonth()}/
                {new Date(project.started).getFullYear()}-
              </h2>
            ) : (
              <></>
            )}
            {project.ended ? (
              <h2>
                {new Date(project.ended).getDate()}/
                {new Date(project.ended).getMonth()}/
                {new Date(project.ended).getFullYear()}
              </h2>
            ) : (
              <></>
            )}
          </div>
          <div>
            <p>{project.description}</p>
          </div>
          <div className={styles.languages}>
            {project.languages.map((language) => (
              <ToIcon key={language.language.id} icon={language.language.name} />
            ))}
          </div>
          <div className={styles.categories}>
            <h4>tag:</h4>
            {project.categories.map((category) => (
              <Link key={category.category.id} href="" passHref>
                <p>{category.category.name}</p>
              </Link>
            ))}
          </div>
          <div>
            <Link href={project.github} passHref>
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </Link>
            <p style={{marginLeft:"1rem"}}>{project.github}</p>
          </div>
        </section>
      </main>
    </>
  );
};

export default Project;

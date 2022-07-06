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

const sidebarItem: SideBarProps[] = [
  {
    name: "test",
    icon: fa0,
    href: "test",
    onClick: () => {},
  },
];
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
  const res = await fetch(`http://localhost:3000/api/project/${name}`);
  const project = await res.json();
  return {
    props: { project },
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
          <div>
            {project.started ? (
              <h2>
                {new Date(project.started).getDate()}/
                {new Date(project.started).getMonth()}/
                {new Date(project.started).getFullYear()}
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
          <div>
            {project.languages.map((language) => (
              <ToIcon icon={language.language.name} />
            ))}
          </div>
          <div>
            <p>tag:</p>
            {project.categories.map((category) => (
              <h5>{category.category.name}</h5>
            ))}
          </div>
          <div>
            <h2>Source Code</h2>
            <Link href={project.github} passHref>
              <FontAwesomeIcon icon={faGithub} size="2x" />
            </Link>
          </div>
        </section>
      </main>
    </>
  );
};

export default Project;

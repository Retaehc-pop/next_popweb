import type { NextPage } from "next";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import SideBar,{SideBarProps} from "../../components/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faProjectDiagram, faUser,faLanguage,faGroupArrowsRotate, faPlus } from "@fortawesome/free-solid-svg-icons";
import prisma from "../../components/prisma";
import { Category } from "@prisma/client";
import styles from "../../styles/Dashboard.module.scss";
const sideBarItem: SideBarProps[] = [
  {
    name: "Project",
    icon: <FontAwesomeIcon icon={faProjectDiagram} />,
    href: "/dashboard",
  },
  {
    name: "faUser",
    icon: <FontAwesomeIcon icon={faUser} />,
    href: "/dashboard/user",
  },
  {
    name: "Language",
    icon: <FontAwesomeIcon icon={faLanguage} />,
    href: "/dashboard/language",
  },
  {
    name: "Category",
    icon: <FontAwesomeIcon icon={faGroupArrowsRotate} />,
    href: "/dashboard/category",
  },
];

const Category: NextPage = ({categories}:{categories:Category[]}) => {
  return (
    <>
    <Head>
      <title>Dashboard:Category</title>
    </Head>
    <SideBar item={sideBarItem} name="Dashboard"/>
    <main className={styles.main}>
      <section className={styles.header}>
        <h1>Category</h1>
        <button><FontAwesomeIcon icon={faPlus}/>{" "}Create New</button>
      </section>
      <section className={styles.list}>

      </section>
    </main>
    </>
  )
}

export async function getServerSideProps() {
  const res = await prisma.category.findMany();
  return {
    props: {categories: JSON.parse(JSON.stringify(res))},
  };
}

export default Category;
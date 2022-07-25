import type { NextPage } from "next";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import SideBar,{SideBarProps} from "../../components/sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faProjectDiagram, faUser,faLanguage,faGroupArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import prisma from "../../components/prisma";
import { Language } from "@prisma/client";

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

const Language: NextPage = ({languages}:{languages:Language[]}) => {
  return (
    <>
    <Head>
      <title>Dashboard:Language</title>
    </Head>
    <SideBar item={sideBarItem} name="Dashboard"/>
    <main>
      </main>
    </>
  )
}

export const getServerSideProps:GetServerSideProps = async () => {
  const res = await prisma.language.findMany();
  return {
    props: {languages: JSON.parse(JSON.stringify(res))},
  };
}

export default Language;
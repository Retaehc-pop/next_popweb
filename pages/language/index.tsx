import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SideBar,{SideBarProps} from "../../components/sidebar";
import { fullLanguage,fullProject } from "../../components/prisma";

const Language: NextPage = () => {
  const router = useRouter();
  const [currentProjects, setCurrentProjects] = useState<SideBarProps[]>([]);
  async function getProjects(){
    const res = await fetch('/api/projects');
    const data = await res.json();
    return data;
  }
  return (
    <>
      <Head>
        <title>Papop: Language</title>
      </Head>
      <main>
        <h1>Language</h1>
      </main>
    </>
  );
}

export default Language;
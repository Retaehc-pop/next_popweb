import { Language } from "@prisma/client";
import type { NextPage,GetServerSideProps } from "next";
import SideBar, {SideBarProps} from "../../components/sidebar";
import Head from "next/head";
import Link from "next/link";
import styles from "../../styles/Languages.module.scss";
import { HexagonalTile } from "..";
import ToIcon from "../../components/toIcon";
export const getServerSideProps: GetServerSideProps = async () => {
  const res =  await fetch("http://localhost:3000/api/language");
  const languages = await res.json();
  return {
    props: {
      languages: languages
    }
  }
}


const Languages: NextPage = ({languages}:{languages:Language[]}) => {
  const sidebarItem: SideBarProps[] = []
  return (
  <>
  <Head>
    <title>Languages</title>
    <link rel="icon" href="/favicon.ico" />
  </Head>
  <SideBar item={sidebarItem} name="Languages"/>
  <main className={styles.main}>
    <section className={styles.languages}>
      {
        languages.map(
          item=>(
            <ToIcon icon={item.name} size="2x" animation/>
          )
        )
      }
    </section>
  </main>
  </>
  );
}

export default Languages
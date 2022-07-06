import { Language } from "@prisma/client";
import type { NextPage,GetStaticPaths,GetStaticProps } from "next";
import { fullLanguage, fullProject } from "../../components/prisma";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

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

const Language:NextPage = ({language}: {language:fullLanguage}) => {
  console.log(language);
  return (
    <>
    <Head>
      <title>{language.name}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main>

    </main>
    </>
  );
}

export default Language;
import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../styles/Backend.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClose,
  faGroupArrowsRotate,
  faLanguage,
  faPlus,
  faProjectDiagram,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { Category, Language, Project } from "@prisma/client";

export async function getServerSideProps() {
  const project = await fetch("http://localhost:3000/api/project");
  const language = await fetch("http://localhost:3000/api/language");
  const category = await fetch("http://localhost:3000/api/category");

  const languageData = await language.json();
  const projectData = await project.json();
  const categoryData = await category.json();

  return {
    props: {
      project: languageData,
      language: languageData,
      category: categoryData,
    },
  };
}

const Backend: NextPage = ({project,language,category}:{project:Project,language:Language,category:Category}) => {
  const date = new Date();
  return (
    <>
      <Head>
        <title>Backend</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <section className={styles.sidebar}>
          <div className={styles.header}>
            <img src="favicon.ico" />
            <h2>Dashboard</h2>
          </div>
          <div className={styles.menu}>
            <Link href="#Project" passHref>
              <span>
                <FontAwesomeIcon icon={faProjectDiagram} />
                <p>Project</p>
              </span>
            </Link>
            <Link href="#user" passHref>
              <span>
                <FontAwesomeIcon icon={faUser} />
                <p>User</p>
              </span>
            </Link>
            <Link href="#language" passHref>
              <span>
                <FontAwesomeIcon icon={faLanguage} />
                <p>Language</p>
              </span>
            </Link>
            <Link href="#Category" passHref>
              <span>
                <FontAwesomeIcon icon={faGroupArrowsRotate} />
                <p>Category</p>
              </span>
            </Link>
            <Link href="#Experience" passHref>
              <span>
                <FontAwesomeIcon icon={faGroupArrowsRotate} />
                <p>Experience</p>
              </span>
            </Link>
            <Link href="#Experience" passHref>
              <span>
                <FontAwesomeIcon icon={faGroupArrowsRotate} />
                <p>Experience</p>
              </span>
            </Link>
          </div>
          <div>
            <Link href="/contact" passHref>
              <span>
                <p>Contact</p>
              </span>
            </Link>
          </div>
          <div className={styles.footer}>
            <p>© {date.getFullYear()}</p>
          </div>
        </section>
        <Project />
        <Language languages={language}/>
      </main>
    </>
  );
};

const Project = () => {
  const [project, setProject] = useState({
    name: "",
    description: "",
    image: [],
    category: [],
    language: [],
    github: "",
  });
  return (
    <>
      <section id="project">
        <h1>Project</h1>
        <input type="text" placeholder="Search" />
      </section>
    </>
  );
};
const User = () => {
  return (
    <>
      <section id="project">
        <h1>Project</h1>
        <input type="text" placeholder="Search" />
      </section>
    </>
  );
};
const Language = ({languages}) => {
  const [language, setLanguage] = useState(languages);
  const [toDelete, setToDelete] = useState([]);
  const [toAdd, setToAdd] = useState([]);
  const [newLanguage, setNewLanguage] = useState("");

  async function deleteLanguage(){
    toDelete.forEach(async (lang)=>{
      fetch(`http://localhost:3000/api/language/${lang.name}`,{
        method: "DELETE",
      }).then(res=>res.json()).then(res=>console.log(res))
    });
    return "done";
  }
  
  async function addLanguage(){
    toAdd.forEach(async (lang)=>{
      fetch(`http://localhost:3000/api/language`,{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name:lang})
      }).then(res=>res.json()).then(res=>console.log(res))
    });
    return "done";
  }

  async function saveLanguage(){
    addLanguage().then(res=>deleteLanguage()).then(res=>alert("done")).then(
      res=>{
        setToDelete([])
        setToAdd([])
      }
    )
  }

  return (
    <>
      <section className={styles.language} id="language">
        <span>
          <h1>Language</h1>
          <button onClick={()=>saveLanguage()}>save</button>
        </span>
        <div>
          <h6>Delete : </h6>
          {
            toDelete.map((lang) => (
              <span key={lang.name}>
                <p>{lang.name}</p>
                <FontAwesomeIcon onClick={()=>{
                setToDelete(toDelete.filter(item => item.id !== lang.id))
                setLanguage([...language,lang])
              }}icon={faClose}/>
              </span>
            ))
          }
        </div>
        <div>
          {language.map((lang) => (
            <span key={lang.id}>
              <h2>{lang.name}</h2>
              <FontAwesomeIcon onClick={()=>{
                languages.some(
                  item => {
                    if(item.name === lang.name){
                      setToDelete([...toDelete,lang])
                    }
                  }
                )
                setLanguage(language.filter(item => item.id !== lang.id))
              }}icon={faClose}/>
            </span>
          ))}
          <span>
            <input value={newLanguage} onChange={(e)=>{setNewLanguage(e.target.value)}}/>
            <FontAwesomeIcon onClick={()=>{
              setToAdd([...toAdd,newLanguage]);
              setLanguage([...language,{id:language.length+1,name:newLanguage}])
              setNewLanguage("");
              }} icon={faPlus}/>
          </span>
        </div>
      </section>
    </>
  );
};
export default Backend;

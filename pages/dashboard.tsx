import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../styles/Dashboard.module.scss";
import { useRouter } from "next/router";
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

const Dashboard: NextPage = ({project,language,category}:{project:Project,language:Language,category:Category}) => {
  const router = useRouter();
  const date = new Date();
  return (
    <>
      <Head>
        <title>Backend</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <nav className={styles.sidebar}>
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
        </nav>
        <Project projects={project}/>
        <Tag name={"language"} type={language}/>
        <Tag name={"category"} type={category}/>
        
      </main>
    </>
  );
};

const Project = ({projects}) => {
  const [project, setProject] = useState({
    name: "",
    description: "",
    image: new FileList,
    category: [],
    language: [],
    github: "",
  });
  console.log(project);
  const [isNew, setIsNew] = useState(true);
  return (
    <>
      <section className={styles.project} id="project">
        <div>
        <h1>Project</h1>
        </div>
        <div>
        {
          isNew ? (
          <>
          <input type="text" placeholder="Name" value={project.name} onChange={e=>{setProject({...project,name:e.target.value})}}/>
          <textarea placeholder="description" value={project.description} onChange={e=>{setProject({...project,description:e.target.value})}}/>
          <input type="text" placeholder="https://github.com/" value={project.github} onChange={e=>{setProject({...project,github:e.target.value})}}/>
          <input type="file" placeholder="Name" onChange={e=>setProject({...project,image:e.target.files})} multiple/>
          </>
            
          ):(
            <input type="text" placeholder="Search" />
            
            )
        }
        </div>
      </section>
    </>
  );
};


const Tag = ({name,type}:{name:string,type:any}) => {
  const [item, setItem] = useState(type);
  const [toDelete, setToDelete] = useState([]);
  const [toAdd, setToAdd] = useState([]);
  const [newItem, setNewItem] = useState("");

  async function deleteItem(){
    toDelete.forEach(async (lang)=>{
      console.log(`http://localhost:3000/api/${name}/${lang.name}`);
      fetch(`http://localhost:3000/api/${name}/${lang.name}`,{
        method: "DELETE",
        headers : { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
         },
      }).then(res=>res.json()).then(res=>console.log(res))
    });
    return "done";
  }
  
  async function addItem(){
    toAdd.forEach(async (lang)=>{
      fetch(`http://localhost:3000/api/${name}`,{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({name:lang})
      }).then(res=>res.json()).then(res=>console.log(res))
    });
    return "done";
  }

  async function saveItem(){
    addItem().then(res=>deleteItem()).then(res=>alert("done")).then(
      res=>{
        setToDelete([])
        setToAdd([])
      }
    )
  }

  return (
    <>
      <section className={styles.tags} id={name}>
        <span>
          <h1>{name}</h1>
          <button onClick={()=>saveItem()}>save</button>
        </span>
        <div className={styles.delete}>
          <h6>Delete : </h6>
          {
            toDelete.map((lang) => (
              <span key={lang.name}>
                <p>{lang.name}</p>
                <FontAwesomeIcon onClick={()=>{
                setToDelete(toDelete.filter(item => item.id !== lang.id))
                setItem([...item,lang])
              }}icon={faClose}/>
              </span>
            ))
          }
        </div>
        <div>
          {item.map((lang) => (
            <span key={lang.id}>
              <h2>{lang.name}</h2>
              <FontAwesomeIcon onClick={()=>{
                type.some(
                  item => {
                    if(item.name === lang.name){
                      setToDelete([...toDelete,lang])
                    }
                  }
                )
                setItem(item.filter(item => item.id !== lang.id))
              }}icon={faClose}/>
            </span>
          ))}
          <span>
            <input value={newItem} onChange={(e)=>{setNewItem(e.target.value)}}/>
            <FontAwesomeIcon onClick={()=>{
              setToAdd([...toAdd,newItem]);
              setItem([...item,{id:item.length+1,name:newItem}])
              setNewItem("");
              }} icon={faPlus}/>
          </span>
        </div>
      </section>
    </>
  );
};


export default Dashboard;

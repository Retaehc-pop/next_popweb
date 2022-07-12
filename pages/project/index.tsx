import type { NextPage, NextApiRequest, NextApiResponse } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "../../styles/Projects.module.scss";
import { useRouter } from "next/router";
import Sidebar,{SideBarProps} from "../../components/sidebar";
import { fullProject } from "../../components/prisma";
import { fa0,faFilter,faProjectDiagram,faSearch, faSort } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../../components/modal";
import { faGit, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faTypeScript } from "../../components/icons";
import ToIcon from "../../components/toIcon";
import Carousel from "../../components/carousel";

const sidebarItem:SideBarProps[] = [
  {
    name:"search",
    icon: <FontAwesomeIcon icon={faSearch}/>,
    href:"",
    onClick:()=>{}
  },
  {
    name:"filter",
    icon: <FontAwesomeIcon icon={faFilter}/>,
    href:"",
    onClick:()=>{}
  },
  {
    name:"sort",
    icon: <FontAwesomeIcon icon={faSort}/>,
    href:"",
    onClick:()=>{}
  },
  
]

const Project: NextPage = ({projects}:{projects: fullProject[];}) => {
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();
  const { pathname, query } = router
  const [search,setSearch] = useState("");


  const searchValue = ({search}) => {
    const href = `${pathname}/?search=${search}`;
    router.push(href, href, {shallow: true});
  }


  const [selectedProject, setSelectedProject] = useState<fullProject>({
    id: 1,
    name: "",
    github:"",
    published:false,
    description: "",
    started: new Date(),
    ended: new Date(),
    showcase: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    categories:[],
    languages:[],
    images:[{
      id:"1",
      url:"",
      alt:"",
      projectId:0
    }],
  });


  return (
    <>
      <Head>
        <title>Project</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Sidebar item={sidebarItem} name="Project" />
      <main className={styles.main}>
      <section className={styles.landing}>
        <div className={styles.search}>
          <FontAwesomeIcon icon={faSearch}/>
          <input type="text" value={search} onChange={(e)=>{
            setSearch(e.target.value);
            searchValue({search:e.target.value});
          }}/>
        </div>
        {/* <div className={styles.header}>
          <div className={styles.icon} style={{gridArea:"1/1/2/2"}}>
            <h1><FontAwesomeIcon icon={faProjectDiagram}/></h1>
          </div>
          <div className={styles.infos} style={{gridArea:"1/2/2/4",justifyContent:"space-around"}}>
            <span>
              <h2>{projects.length}</h2>
              <h2>Project</h2>
            </span>
            <span>
              <h2>1</h2>
              <h2>showcase</h2>
            </span>
          </div>
        </div> */}
      </section>
      <section className={styles.showcase}>
        {
          projects.map(project=>(
            <div className={styles.project__container} key={project.name} onClick={()=>{setOpenModal(true);setSelectedProject(project)}}>
              <Image src={project.images[0].url} alt={project.images[0].alt} width={"300px"} height={"300px"}/>
              <p>{project.name}</p>
            </div>
          ))
        }
        
        <Modal open={openModal} onClose={()=>setOpenModal(false)}>
          <section className={styles.modal}>
            <section className={styles.images}>
              <Carousel slides={selectedProject.images} />
            </section>
            <section className={styles.infos}>
              <Link href={`/project/${selectedProject.name}`} passHref>
                <h1>{selectedProject.name}</h1>
              </Link>
              {
                selectedProject.started && selectedProject.ended ?
                <p>{new Date(selectedProject.started).getMonth()}/{new Date(selectedProject.started).getFullYear()}-{new Date(selectedProject.ended).getMonth()}/{new Date(selectedProject.ended).getFullYear()}</p>:
                <p></p>
              }
              <p>{selectedProject.description}</p>
              <div className={styles.icons}>
                {selectedProject.languages.map(language=>(
                  <ToIcon icon={language.language.name}/>
                ))}
              </div>
              <div className={styles.categories}>
                <p>tag:</p>
                {selectedProject.categories.map(category=>(
                    <h5>{category.category.name}</h5>
                ))}
              </div>
              <Link href={selectedProject.github}>
                <FontAwesomeIcon icon={faGithub} size="3x"/>
              </Link>
            </section>
          </section>
        </Modal>
      </section> 
      </main>
    </>
  );
};

export async function getServerSideProps() {
  const project = await fetch("http://localhost:3000/api/project?published=true");
  const projectData = await project.json();
  return {
    props: {
      projects: projectData,
    },
  };
}

export default Project;

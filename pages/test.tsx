import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import SideBar,{SideBarProps} from "../components/sidebar";
import styles from "../styles/Test.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGroupArrowsRotate,faProjectDiagram,faUser,faLanguage, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Carousel } from 'primereact/carousel';
import { Button } from 'primereact/button';
import Modal from "../components/modal";
import { Project } from "@prisma/client";

const sideBarItem: SideBarProps[] = [
  {
    name: "Project",
    icon: faProjectDiagram,
    href: "#project",
  },
  {
    name: "faUser",
    icon: faUser,
    href: "#user",
  },
  {
    name: "Language",
    icon: faLanguage,
    href: "#language",
  },
  {
    name: "Category",
    icon: faGroupArrowsRotate,
    href: "#category",
  },
];

const projectTemplate = (project) => {
 const [open,setOpen] = useState(false);
  return (
    <div>
        <div onClick={() => setOpen(true)}>
          <img src={project.image}/>
        </div>
        <div>
          <h3>{project.name}</h3>
        </div>
        <Modal onClose={() => {setOpen(false)}} open={open}>
          <div>
            <h1>
              {project.name}
            </h1>
            <h2>{open}</h2>
          </div>
        </Modal>
    </div>
  )
}
const responsiveOptions = [
  {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1
  },
  {
      breakpoint: '600px',
      numVisible: 2,
      numScroll: 1
  },
  {
      breakpoint: '480px',
      numVisible: 1,
      numScroll: 1
  }
];

const Test:NextPage = () => {
  const [project, setProject] = useState([
    {
      name: "Product 1",
      price: "$100",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Product 2",
      price: "$100",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Product 3",
      price: "$100",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Product 4",
      price: "$100",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Product 4",
      price: "$100",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Product 4",
      price: "$100",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Product 4",
      price: "$100",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Product 4",
      price: "$100",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Product 4",
      price: "$100",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "https://via.placeholder.com/150",
    }
  ]);
  const [openModal,setOpenModal] = useState(false);
  const [selectProject,setSelectProject] = useState<Project>({
    id: 0,
    name: "string",
    description: "string",
    published: true,
    github: "lorem ipsum",
    createdAt: new Date(),
    updatedAt: new Date(),
});
  
  return (
  <>
  <Head>
    <title>Test</title>
  </Head>
  <SideBar item={sideBarItem} name="dashboard" />
  <main className={styles.main}>
    <section className={styles.project}>
      <div className={styles.header}>
        <h1>Test</h1>
        <button><FontAwesomeIcon icon={faPlus}/> Creat New Project</button>
      </div>
      <div className={styles.child}>
        {
        project.map(item=>(
          <div key={item.name} onClick={()=>{setProject(item)}}>
            <img src={item.image}/>
            <p>{item.name}</p>
          </div>
        ))
        }
        <Modal onClose={() => {setOpenModal(false)}} open={openModal}>
          <>
          </>
        </Modal>
      </div>
    </section>
    <section className={styles.project}>
      <h1>Test</h1>
    </section>
    <section className={styles.project}>
      <h1>Test</h1>
    </section>
  </main>
  </>);
}

export default Test;
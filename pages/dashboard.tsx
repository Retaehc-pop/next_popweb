import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import SideBar, { SideBarProps } from "../components/sidebar";
import styles from "../styles/Dashboard.module.scss";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGroupArrowsRotate,
  faProjectDiagram,
  faUser,
  faLanguage,
  faPlus,
  faToggleOn,
  faToggleOff,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { Carousel } from "primereact/carousel";
import { Button } from "primereact/button";
import Modal from "../components/modal";
import { Project, Language, Category } from "@prisma/client";
import Link from "next/link";
import { ActionMeta, OnChangeValue } from "react-select";
import { faGit, faGithub } from "@fortawesome/free-brands-svg-icons";
import { FileUploader } from "react-drag-drop-files";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { fullProject } from "../components/prisma";

const sideBarItem: SideBarProps[] = [
  {
    name: "Project",
    icon: <FontAwesomeIcon icon={faProjectDiagram} />,
    href: "#project",
  },
  {
    name: "faUser",
    icon: <FontAwesomeIcon icon={faUser} />,
    href: "#user",
  },
  {
    name: "Language",
    icon: <FontAwesomeIcon icon={faLanguage} />,
    href: "#language",
  },
  {
    name: "Category",
    icon: <FontAwesomeIcon icon={faGroupArrowsRotate} />,
    href: "#category",
  },
];

export async function getServerSideProps() {
  const project = await fetch("http://localhost:3000/api/project");
  const language = await fetch("http://localhost:3000/api/language");
  const category = await fetch("http://localhost:3000/api/category");

  const languageData = await language.json();
  const projectData = await project.json();
  const categoryData = await category.json();

  return {
    props: {
      projects: projectData,
      languages: languageData,
      categories: categoryData,
    },
  };
}

const Test: NextPage = ({projects,languages,categories,}: {projects: fullProject[];languages: Language[];categories: Category[];}) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectProject, setSelectProject] = useState<fullProject>({
    id: 1,
    name: "Product 1",
    published: false,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    images: [],
    started: new Date(),
    ended: new Date(),
    showcase: false,
    github: "github test link",
    languages: [],
    categories: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const [isNew, setIsNew] = useState(false);
  const [toCreate,setToCreate] = useState({
    images:[],
    languages:[],
    categories:[]
  });

  useEffect(() => {
    console.log(selectProject);
    console.log(toCreate)
  }, [selectProject]);

  async function uploadImage(image: File) {
    var formData = new FormData();
    formData.append("image", image, image.name);
    const result = await fetch("http://localhost:3000/api/image", {
      method: "POST",
      body: formData,
    });
    if (result.status === 201) {
      alert("Image uploaded");
    }
    else{
      alert("Image not uploaded");
    }
    const data = await result.json();
    return data;
  }

  async function createTag(item, tag:string) {
    const res = await fetch(`http://localhost:3000/api/${tag}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: item }),
    });
    if (res.status === 200) {
      alert(`Created ${item}`)
    } else {
      alert("something went wrong");
    }
    return res.json();
  }

  async function createProject() {
    console.log(toCreate);
    console.log(selectProject)
    new Promise((resolve, reject) => {
      toCreate.images.forEach(async (item, index) => {
        selectProject.images.push(await uploadImage(item));
        if (index === toCreate.images.length-1) resolve(1);
      });
    }).then(res=>{
      return {
        ...selectProject,
        started:selectProject.started.toISOString(),
        ended: selectProject.ended.toISOString(),
      }
    }).then(res=>{
      return fetch("http://localhost:3000/api/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(res),
      });
    }).then(res=>{
      if (res.status === 201){
        setOpenModal(false);
        setToCreate({...toCreate,images: []})
        setIsNew(false);
        projects.push(selectProject);
        alert("Created Project")
      }
      else{
        alert("something went wrong")
      }
    })
  }

  async function saveProject() {
    console.log(1)
    new Promise((resolve, reject) => {
      if (toCreate.images.length>0){
        toCreate.images.forEach(async (item, index) => {
          selectProject.images.push(await uploadImage(item));
          if (index === toCreate.images.length-1) resolve(1);
        });
      }
      else{
        resolve(1);
      }
    }).then(res=>{
      console.log(2)
      return {
        ...selectProject,
        started: selectProject.started? selectProject.started.toISOString():null,
        ended: selectProject.ended? selectProject.ended.toISOString():null,
      }
    })
    .then(res=>{
      console.log(3)
      return fetch(`http://localhost:3000/api/project/${selectProject.name}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify(res),
        }
      )
    }).then(res=>res.json()).then(res=>{
      console.log(res)
    })
  }

  async function deleteProject() {
    if (confirm("Are you sure you want to delete this project?")) {
      const res = await fetch(
        `http://localhost:3000/api/project/${selectProject.name}`,
        {
          method: "DELETE",
        }
      );

      if (res.status === 200) {
        projects.filter((item) => item.name !== selectProject.name);
        setToCreate({...toCreate,images: []})
        setIsNew(false);
        setOpenModal(false)
        alert(`Project ${selectProject.name} is deleted`);
      } else {
        alert("Something went wrong");
      }
    } 
    else {
      return;
    }
  }
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
            <button
              onClick={() => {
                setOpenModal(true);
                setSelectProject({
                  id: 0,
                  name: "",
                  published: false,
                  description: "",
                  images: [],
                  github: "",
                  started: new Date(),
                  ended: new Date(),
                  showcase: false,
                  languages: [],
                  categories: [],
                  createdAt: new Date(),
                  updatedAt: new Date(),
                });
                setToCreate({images: [],languages:[],categories:[]});
                setIsNew(true);
              }}
            >
              <FontAwesomeIcon icon={faPlus} /> Creat New Project
            </button>
          </div>
          <div className={styles.child}>
            {projects.map((item) => (
              <div
                key={item.id}
                className={styles.projects}
                onClick={() => {
                  setSelectProject(item);
                  setOpenModal(true);
                  setToCreate({images: [],languages:[],categories:[]});
                  setIsNew(false);
                }}
              >
                {item.images[0] ? (
                  <img src={item.images[0].url} alt={item.images[0].alt} />
                ) : (
                  <img src="http://via.placeholder.com/150"></img>
                )}
                <p>{item.name}</p>
              </div>
            ))}
            <Modal onClose={()=>setOpenModal(false)}open={openModal}>
              <div className={styles.modal}>
                <div className={styles.img}>
                  <section className={styles.image}>
                    {selectProject.images.map((item) => (
                      <div key={item.url}>
                        <Image src={item.url} alt={item.alt} layout="fill" objectFit="cover"/>
                      </div>
                    ))}
                  </section>
                  <section className={styles.upload}>
                    {toCreate.images.map((item, index) => (
                      <span key={index}>
                        <div>
                          <Image src={URL.createObjectURL(item)} alt={item} layout="fill" objectFit="cover"/>
                        </div>
                        <p>{item.name}</p>
                        <FontAwesomeIcon
                          icon={faXmark}
                          onClick={() => setToCreate({...toCreate,images: toCreate.images.filter((img) => img !== item)})                          }
                        />
                      </span>
                    ))}
                    <FileUploader handleChange={(e) => {setToCreate({...toCreate,images: [...e]})}} multiple/>
                  </section>
                </div>
                <div className={styles.info}>
                  <section>
                    <p>Name</p>
                    <input
                      value={selectProject.name}
                      onChange={(e) => {
                        setSelectProject({
                          ...selectProject,
                          name: e.target.value,
                        });
                      }}
                    />
                    <p>off</p>
                    <span
                      className={styles.published}
                      onClick={() => {
                        setSelectProject({
                          ...selectProject,
                          published: !selectProject.published,
                        });
                      }}
                    >
                      {selectProject.published ? (
                        <FontAwesomeIcon
                          icon={faToggleOn}
                          size="2x"
                        ></FontAwesomeIcon>
                      ) : (
                        <FontAwesomeIcon
                          icon={faToggleOff}
                          size="2x"
                        ></FontAwesomeIcon>
                      )}
                    </span>
                    <p>on</p>
                  </section>
                  <section>
                    <textarea
                      placeholder="Description"
                      style={{ width: "100%" }}
                      value={selectProject.description}
                      onChange={(e) => {
                        setSelectProject({
                          ...selectProject,
                          description: e.target.value,
                        });
                      }}
                    />
                  </section>
                  <section>
                    <div>
                      <p>started</p>
                      <input
                        type="date"
                        value={
                          selectProject.started
                            ? new Date(selectProject.started).toISOString().split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          // console.log(new Date(e.target.valueAsDate))
                          setSelectProject({
                            ...selectProject,
                            started: new Date(e.target.valueAsDate)
                          })
                        }
                      />
                    </div>
                    <div>
                      <p>ended</p>
                      <input
                        type="date"
                        value={
                          selectProject.ended
                            ? new Date(selectProject.ended).toISOString().split("T")[0]
                            : ""
                        }
                        onChange={(e) =>
                          setSelectProject({
                            ...selectProject,
                            ended: new Date(e.target.valueAsDate),
                          })
                        }
                      />
                    </div>
                  </section>
                  <section>
                    <p>Showcase?</p>
                    <span
                      className={styles.showcase}
                      onClick={() => {
                        setSelectProject({
                          ...selectProject,
                          showcase: !selectProject.showcase,
                        });
                      }}
                    >
                      {selectProject.showcase ? (
                        <FontAwesomeIcon
                          icon={faToggleOn}
                          size="2x"
                        ></FontAwesomeIcon>
                      ) : (
                        <FontAwesomeIcon
                          icon={faToggleOff}
                          size="2x"
                        ></FontAwesomeIcon>
                      )}
                    </span>
                  </section>
                  <section>
                    <Link href={selectProject.github}>
                      <FontAwesomeIcon icon={faGithub} size="2x" />
                    </Link>
                    <input
                      value={selectProject.github}
                      placeholder="github"
                      onChange={(e) => {
                        setSelectProject({
                          ...selectProject,
                          github: e.target.value,
                        });
                      }}
                    />
                  </section>
                  <section>
                    <p>Language</p>
                    <CreatableSelect
                      isClearable
                      isMulti
                      defaultValue={selectProject.languages.map((item) => ({id:item.language.id,name:item.language.name,experties:item.language.experties}))}
                      options={languages}
                      getNewOptionData={(inputValue: string,optionLabel: ReactNode)=>{
                        return {id:0,name:inputValue,experties:0}
                      }}
                      onChange={async (newValue: OnChangeValue<Language, true>,actionMeta: ActionMeta<Language>) => {
                        if (actionMeta.action === "create-option"){
                          var newlang = await createTag(actionMeta.option.name,"language")
                          setSelectProject({...selectProject,languages: [...selectProject.languages,{language:newlang}]})
                        }
                        else{
                          setSelectProject({...selectProject,languages: newValue.map(item=>({language:item}))})
                        }

                      }}
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => option.name}
                    />
                  </section>
                  <section>
                    <p>Catagory</p>
                    <CreatableSelect
                      isClearable
                      isMulti
                      defaultValue={selectProject.categories.map((item) => ({id:item.category.id,name:item.category.name}))}
                      options={categories}
                      getNewOptionData={(inputValue: string,optionLabel: ReactNode)=>{
                        return {id:0,name:inputValue}
                      }}
                      onChange={async(newValue: OnChangeValue<Category, true>,actionMeta: ActionMeta<Category>) => {
                        if (actionMeta.action === "create-option"){
                          var newcat = await createTag(actionMeta.option.name,"category")
                          setSelectProject({...selectProject,categories: [...selectProject.categories,{category:newcat}]})
                        }
                        else{
                          setSelectProject({...selectProject,categories: newValue.map(item=>({category:item}))})
                        }
                      }}
                      getOptionLabel={(option) => option.name}
                      getOptionValue={(option) => option.name}
                    />
                  </section>
                  <section>
                    {isNew ? (
                      <button onClick={() => createProject()}>Create</button>
                    ) : (
                      <>
                        <button onClick={() => saveProject()}>Save</button>
                        <button onClick={() => deleteProject()}>Delete</button>
                      </>
                    )}
                    <button onClick={() => setOpenModal(false)}>Cancle</button>
                  </section>
                </div>
              </div>
            </Modal>
          </div>
        </section>
      </main>
    </>
  );
};

export default Test;

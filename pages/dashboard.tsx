import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../styles/Dashboard.module.scss";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import {
  faClose,
  faGroupArrowsRotate,
  faLanguage,
  faPlus,
  faProjectDiagram,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import { FileUploader } from "react-drag-drop-files";
import { FileUpload } from "primereact/fileupload";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { Category, Language, Project } from "@prisma/client";
import SideBar, { SideBarProps } from "../components/sidebar";
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

const Dashboard: NextPage = ({
  project,
  language,
  category,
}: {
  project: Project;
  language: Language;
  category: Category;
}) => {
  const router = useRouter();
  const date = new Date();
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

  return (
    <>
      <Head>
        <title>Backend</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SideBar item={sideBarItem} name="dashboard" />
      <main className={styles.main}>
        <Project
          projects={project}
          categories={category}
          languages={language}
        />
        <Tag name={"language"} type={language} />
        <Tag name={"category"} type={category} />
      </main>
    </>
  );
};

const Project = ({ projects, categories, languages }) => {
  const [project, setProject] = useState({
    name: "",
    description: "",
    image: null,
    category: [],
    language: [],
    github: "",
  });

  function remapObjectToSelect(obj: any) {
    let toselect = [];
    for (let i = 0; i < obj.length; i++) {
      toselect.push({
        value: obj[i].name,
        label: obj[i].name,
      });
    }
    return toselect;
  }
  const [isNew, setIsNew] = useState(false);
  async function tessst(resi){
    let formData = new FormData();
    formData.append('demo', resi);
    const response = await fetch(`api/image`,
        {
            method: 'POST',
            body: formData
        },  
    );
  }
  async function uploadFile(event) {
    const file = event.formData;
    const imgs = [];
    // console.log(file)
    console.log(event.xhr.response);
    console.log(event.files);
    // file.forEach((item)=>imgs.push(item.name)).then(console.log(imgs))
    // const fileReader = new FileReader();
    // let formData = new FormData();
    // formData.append("demo", file);
    // const response = await fetch(`api/image`,
    //     {
    //         method: 'POST',
    //         body: formData
    //     });
    // const res = await response.json();
    // alert(res)
  }

  return (
    <>
      <section className={styles.project} id="project">
        <div className={styles.header}>
          <h1>Project</h1>
          <div>
            <button
              style={
                isNew
                  ? {
                      backgroundColor: "var(--color-primary)",
                      color: "var(--color-background)",
                    }
                  : {}
              }
              onClick={() => setIsNew(true)}
            >
              New Project
            </button>
            <button
              style={
                isNew
                  ? {}
                  : {
                      backgroundColor: "var(--color-primary)",
                      color: "var(--color-background)",
                    }
              }
              onClick={() => setIsNew(false)}
            >
              Existed Project
            </button>
          </div>
        </div>
        <div style={{ width: "100%" }}>
          {!isNew ? (
            <></>
          ) : (
            <div className={styles.form}>
              <div className={styles.form__item}>
                <section className={styles.text}>
                  <div className={styles.formcol}>
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Name"
                      value={project.name}
                      onChange={(e) => {
                        setProject({ ...project, name: e.target.value });
                      }}
                    />
                  </div>

                  <div className={styles.formcol}>
                    <label htmlFor="description">Description</label>
                    <textarea
                      placeholder="description"
                      id="description"
                      name="description"
                      value={project.description}
                      onChange={(e) => {
                        setProject({ ...project, description: e.target.value });
                      }}
                    />
                  </div>

                  <div className={styles.formcol}>
                    <label htmlFor="github">Github</label>
                    <input
                      type="text"
                      id="github"
                      name="github"
                      placeholder="https://github.com/"
                      value={project.github}
                      onChange={(e) => {
                        setProject({ ...project, github: e.target.value });
                      }}
                    />
                  </div>
                  <div className={styles.formcol}>
                    <label htmlFor="category">category</label>
                    <Select isMulti options={remapObjectToSelect(categories)} onChange={(e)=>setProject({...project,category:e.map(item=>item.value)})} />
                  </div>

                  <div className={styles.formcol}>
                    <label htmlFor="language">language</label>
                    <Select isMulti options={remapObjectToSelect(languages)} onChange={(e)=>setProject({...project,language:e.map(item=>item.value)})} />
                  </div>
                </section>
                <section className={styles.dragdrop}>
                  {/* <FileUploader
                    multiple={true}
                    handleChange={(file) =>
                      setProject({ ...project, image: file })
                    }
                    name="file"
                    types={["JPEG", "PNG", "GIF"]}
                  /> */}
                  <FileUpload name="image" url="/api/image" onUpload={uploadFile} multiple></FileUpload>
                  {/* {project.image ? (
                    <div className={styles.imageuploaded}>
                      {[...project.image].map((file, index) => (
                        <img key={file.name} src={URL.createObjectURL(file)} />
                      ))}
                    </div>
                  ) : (
                    <p>No file selected</p>
                  )} */}
                </section>
              </div>
              <div className={styles.form__button}>
                <button type="submit">Submit</button>
                <button
                  onClick={() => {
                    setProject({
                      name: "",
                      description: "",
                      image: null,
                      category: [],
                      language: [],
                      github: "",
                    });
                  }}
                >
                  clear
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

const Tag = ({ name, type }: { name: string; type: any }) => {
  const [item, setItem] = useState(type);
  const [toDelete, setToDelete] = useState([]);
  const [toAdd, setToAdd] = useState([]);
  const [newItem, setNewItem] = useState("");

  async function deleteItem() {
    toDelete.forEach(async (lang) => {
      console.log(`http://localhost:3000/api/${name}/${lang.name}`);
      fetch(`http://localhost:3000/api/${name}/${lang.name}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => console.log(res));
    });
    return "done";
  }

  async function addItem() {
    toAdd.forEach(async (lang) => {
      fetch(`http://localhost:3000/api/${name}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: lang }),
      })
        .then((res) => res.json())
        .then((res) => console.log(res));
    });
    return "done";
  }

  async function saveItem() {
    addItem()
      .then((res) => deleteItem())
      .then((res) => alert("done"))
      .then((res) => {
        setToDelete([]);
        setToAdd([]);
      });
  }

  return (
    <>
      <section className={styles.tags} id={name}>
        <span>
          <h1>{name}</h1>
          <button onClick={() => saveItem()}>save</button>
        </span>
        <div className={styles.delete}>
          <h6>Delete : </h6>
          {toDelete.map((lang) => (
            <span key={lang.name}>
              <p>{lang.name}</p>
              <FontAwesomeIcon
                onClick={() => {
                  setToDelete(toDelete.filter((item) => item.id !== lang.id));
                  setItem([...item, lang]);
                }}
                icon={faClose}
              />
            </span>
          ))}
        </div>
        <div>
          {item.map((lang) => (
            <span key={lang.id}>
              <h2>{lang.name}</h2>
              <FontAwesomeIcon
                onClick={() => {
                  type.some((item) => {
                    if (item.name === lang.name) {
                      setToDelete([...toDelete, lang]);
                    }
                  });
                  setItem(item.filter((item) => item.id !== lang.id));
                }}
                icon={faClose}
              />
            </span>
          ))}
          <span>
            <input
              value={newItem}
              onChange={(e) => {
                setNewItem(e.target.value);
              }}
            />
            <FontAwesomeIcon
              onClick={() => {
                setToAdd([...toAdd, newItem]);
                setItem([...item, { id: item.length + 1, name: newItem }]);
                setNewItem("");
              }}
              icon={faPlus}
            />
          </span>
        </div>
      </section>
    </>
  );
};

export default Dashboard;

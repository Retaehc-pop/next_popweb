import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import SideBar, { SideBarProps } from "../components/sidebar";
import styles from "../styles/Dashboard.module.scss";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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

const Test: NextPage = ({
  projects,
  languages,
  categories,
}: {
  projects: any[];
  languages: Language[];
  categories: Category[];
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [selectProject, setSelectProject] = useState({
    id: 1,
    name: "Product 1",
    published: false,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    images: [],
    github: "github test link",
    languages: [],
    categories: [],
  });
  const [isNew, setIsNew] = useState(false);
  const languageOption = remapObjectToSelect(languages);
  const categoryOption = remapObjectToSelect(categories);
  const [imageHolder, setImageHolder] = useState([]);

  async function uploadImage(image: File) {
    var formData = new FormData();
    formData.append("image", image, image.name);
    const result = await fetch("http://localhost:3000/api/image", {
      method: "POST",
      body: formData,
    });
    const data = await result.json();
    return data;
  }

  async function createTag(item, tag) {
    const res = await fetch(`http://localhost:3000/api/${tag}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: item }),
    });
    if (res.status === 200){
      const data = await res.json();
      if (tag==="categories"){
        categories.push({id:data.id, name: item});
      }
      else if (tag==="languages"){
        languages.push({id:data.id, name: item});
      }
    }
    else{
      alert("something went wrong");
    }
    return res.json();
  }

  async function createProject() {
    selectProject.languages.forEach((item) => {
      if (item.hasOwnProperty("__isNew__")) {
        createTag(item.value, "language").then((res) => console.log(res));
      }
    });
    selectProject.categories.forEach((item) => {
      if (item.hasOwnProperty("__isNew__")) {
        createTag(item.value, "category").then((res) => console.log(res));
      }
    });

    new Promise((resolve, reject) => {
      imageHolder.forEach(async (item, index) => {
        selectProject.images.push(await uploadImage(item));
        if (selectProject.images.length === imageHolder.length) resolve(1);
      });
    })
      .then((res) => {
        return {
          ...selectProject,
          languages: [...selectProject.languages.map((item) => item.value)],
          categories: [...selectProject.categories.map((item) => item.value)],
        };
      })
      .then((newProject) => {
        fetch("http://localhost:3000/api/project", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProject),
        }).then((res) => {
          if (res.status === 200) {
            setOpenModal(false);
            setImageHolder([]);
            setIsNew(false);
            projects.push(selectProject);
            alert("Project created");
          } else {
            alert("Error creating project");
          }
        });
      });
  }

  async function saveProject() {
    selectProject.languages.forEach((item) => {
      if (item.hasOwnProperty("__isNew__")) {
        createTag(item.value, "language").then((res) => console.log(res));
      }
    });
    selectProject.categories.forEach((item) => {
      if (item.hasOwnProperty("__isNew__")) {
        createTag(item.value, "category").then((res) => console.log(res));
      }
    });

    new Promise((resolve, reject) => {
      imageHolder.forEach(async (item, index) => {
        selectProject.images.push(await uploadImage(item));
        if (selectProject.images.length === imageHolder.length) resolve(1);
      });
    }).then((res) => {
      return {
          ...selectProject,
          languages: [...selectProject.languages.map((item) => item.value)],
          categories: [...selectProject.categories.map((item) => item.value)],
      };
    }).then((newProject) => {
      fetch(`http://localhost:3000/api/project/${selectProject.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProject),
      }).then((res) => {
        if (res.status === 200) {
          setOpenModal(false);
          setImageHolder([]);
          setIsNew(false);
          alert("Project saved");
        } else {
          alert("Error saving project");
        }
      });
    }
    );
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
        setImageHolder([]);
        setIsNew(false);
        alert(`Project ${selectProject.name} is deleted`);
      } else {
        alert("Something went wrong");
      }
    } else {
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
                  languages: [],
                  categories: [],
                });
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
                  setImageHolder([]);
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
            <Modal
              onClose={() => {
                setOpenModal(false);
              }}
              open={openModal}
            >
              <div className={styles.modal}>
                <div className={styles.img}>
                  <section className={styles.image}>
                    {selectProject.images.map((item) => (
                      <img src={item.url} alt={item.alt} />
                    ))}
                  </section>
                  <section className={styles.upload}>
                    {imageHolder.map((item, index) => (
                      <span key={index}>
                        <img src={URL.createObjectURL(item)} />
                        <p>{item.name}</p>
                        <FontAwesomeIcon
                          icon={faXmark}
                          onClick={() =>
                            setImageHolder(
                              imageHolder.filter((img) => img !== item)
                            )
                          }
                        />
                      </span>
                    ))}
                    <FileUploader
                      handleChange={(e) => {
                        setImageHolder([...e]);
                      }}
                      multiple
                    />
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
                      defaultValue={selectProject.languages.map((item) => {
                        return {
                          label: item.languageName,
                          value: item.languageName,
                        };
                      })}
                      options={languageOption}
                      onChange={(
                        newValue: OnChangeValue<Language, true>,
                        actionMeta: ActionMeta<Language>
                      ) => {
                        let temp = [];
                        newValue.forEach((item) => {
                          temp.push(item);
                        });
                        setSelectProject({ ...selectProject, languages: temp });
                      }}
                    />
                  </section>
                  <section>
                    <p>Catagory</p>
                    <CreatableSelect
                      isClearable
                      isMulti
                      defaultValue={selectProject.categories.map((item) => {
                        return {
                          label: item.categoryName,
                          value: item.categoryName,
                        };
                      })}
                      options={categoryOption}
                      onChange={(
                        newValue: OnChangeValue<Category, true>,
                        actionMeta: ActionMeta<Category>
                      ) => {
                        let temp = [];
                        newValue.forEach((item) => {
                          temp.push(item);
                        });
                        setSelectProject({
                          ...selectProject,
                          categories: temp,
                        });
                      }}
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

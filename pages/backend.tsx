import type { NextPage } from "next";
import Link from "next/link";
import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "../styles/Backend.module.scss";
function uploadImage(){

}

const Backend: NextPage = () => {
  // var dialog:HTMLDialogElement = document.querySelector("dialog");
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
    <Head>
      <title>Backend</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <main className={styles.main}>
      <h1>Backend</h1>
      <h1>Backend</h1>
      <h1>Backend</h1>
      <h1>Backend</h1>
      {/* <button onClick={() => dialog.showModal()}>asdasdasdasd</button> */}
      <dialog id="dialog" open={isOpen}>
        <div>
          <input type="file" onChange={uploadImage}/>
        </div>
      </dialog>
    </main>
    </>
  )
}

export default Backend;
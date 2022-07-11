import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import HexagonalTile from "../components/hexagonalTile";
import styles from "../styles/Test.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSackDollar } from "@fortawesome/free-solid-svg-icons";
const Test: NextPage = () => {
  return (
    <>
      <Head>
        <title>Papop: Test</title>
      </Head>
      <main className={styles.main}>
        <HexagonalTile
          hexitem={[
            {
              name: "test",
              icon: <FontAwesomeIcon icon={faSackDollar} />,
              onClick: () => {},
            },
            {
              name: "tests",
              icon: <FontAwesomeIcon icon={faSackDollar} />,
              onClick: () => {},
            },
            {
              name: "testss",
              icon: <FontAwesomeIcon icon={faSackDollar} />,
              onClick: () => {},
            },
            {
              name: "testsss",
              icon: <FontAwesomeIcon icon={faSackDollar} />,
              onClick: () => {},
            },
            {
              name: "testssss",
              icon: <FontAwesomeIcon icon={faSackDollar} />,
              onClick: () => {},
            },
            {
              name: "testsssss",
              icon: <FontAwesomeIcon icon={faSackDollar} />,
              onClick: () => {},
            },
            {
              name: "testssssss",
              icon: <FontAwesomeIcon icon={faSackDollar} />,
              onClick: () => {},
            },
          ]}
        />
      </main>
    </>
  );
};

export default Test;

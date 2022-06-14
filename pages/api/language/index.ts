import prisma from "../../../components/prisma";
import { Language } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  return new Promise((resolve) => {
    switch (req.method) {
      case "POST":
        handlePost(req, res)
          .then(() => {
            resolve(res);
          })
          .catch((err) => {
            return res.status(400).json({ error: err.message });
          });
        break;
      case "GET":
        handleGet(req, res)
          .then(() => {
            resolve(res);
          })
          .catch((err) => {
            return res.status(400).json({ error: err.message });
          });
        break;
      default:
        res.status(400).json({
          error: "Method not allowed",
        });
        resolve(res);
    }
  });
}

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  try {
    // const data = JSON.parse(req.body);

    const data = req.body;
    const name: string = data.name;
    if (!name) throw new Error(data);

    const languageData = await prisma.language.findUnique({
      where: {
        name: name,
      },
    });
    if (languageData) {
      return res.status(400).json({
        error: "Language already exists",
      });
    } else {
      const result = await prisma.language.create({
        data: {
          name: name,
        },
      });
      return res.status(200).json(result);
    }
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const result:Language[] = await prisma.language.findMany();
  return res.json(result);
}

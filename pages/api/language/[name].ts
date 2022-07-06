import prisma from "../../../components/prisma";
import { Language, LanguageOnProject, Project } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return new Promise((resolve) => {
    switch (req.method) {
      case "DELETE":
        handleDelete(req, res)
          .then(() => {
            resolve(res);
          })
          .catch((err) => {
            return res.status(400).json({
              error: err.message,
            });
          });
        break;
      case "GET":
        handleGet(req, res)
          .then(() => {
            resolve(res);
          })
          .catch((err) => {
            return res.status(400).json({
              error: err.message,
            });
          });
        break;
      case "PATCH":
        handlePatch(req, res)
          .then(() => {
            resolve(res);
          })
          .catch((err) => {
            return res.status(400).json({
              error: err.message,
            });
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

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  const name = `${req.query.name}`;
  const result = await prisma.language.findUnique({
    where: {
      name: name,
    },
    select:{
      name: true,
      experties:true,
      project:{
        where:{
          project:{
            published:true
          }
        },
        include:{
          project:{
            include:{
              languages:{
                include:{
                  language:true
                }
              },
              categories:{
                include:{
                  category:true
                }
              },
              images:true,
            }
          }
        }
        }
      },
  });
  return res.status(200).json(result);
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  const name = `${req.query.name}`;
  const language = await prisma.language.findUnique({
    where: {
      name: name,
    },
  });
  if (!language) {
    return res.status(404).json({
      error: "Language not found",
    });
  } else {
    const result: Language = await prisma.language.delete({
      where: {
        name: name,
      },
    });
    return res.status(200).json(result);
  }
}

async function handlePatch(req: NextApiRequest, res: NextApiResponse) {
  const name = `${req.query.name}`;
  const newName = `${req.query.name}`;
  const result: Language = await prisma.language.update({
    where: {
      name: name,
    },
    data: {
      name: newName,
    },
  });
}

import prisma from "../../../components/prisma";
import { Project } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


export default async function(req:NextApiRequest,res:NextApiResponse){
  return new Promise(resolve => {
    switch(req.method){
      case "DELETE":
        handleDelete(req,res).then(() => {
          resolve(res);
        }).catch(err => {
          return res.status(400).json({
            error: err.message
            })
            });
        break;
      case "GET":
        handleGet(req,res).then(() => {
          resolve(res);
        }).catch(err => {
          return res.status(400).json({
            error: err.message
            })
            });
        break;
      case "PATCH":
        handlePatch(req,res).then(() => {
          resolve(res);
        }).catch(err => {
          return res.status(400).json({
            error: err.message
            })
            });
        break;
      default:
        res.status(400).json({
          error:"Method not allowed"
        });
        resolve(res);
    }
    }
  )
}

async function handleGet(req:NextApiRequest,res:NextApiResponse){
  const name = `${req.query.name}`;
  const result:Project = await prisma.project.findUnique({
    where:{
      name:name
    }
  });
  return res.status(200).json(result);
}

async function handlePatch(req:NextApiRequest,res:NextApiResponse){
  const name = `${req.query.name}`;

}

async function handleDelete(req:NextApiRequest,res:NextApiResponse){
  const name = `${req.query.name}`;
  const result = await prisma.project.delete({
    where:{
      name:name
    }
  });
  return res.status(200).json(result);
}
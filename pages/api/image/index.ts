import type { NextApiRequest,NextApiResponse } from "next";
import { Image } from "@prisma/client";
export default async function handle(req:NextApiRequest,res:NextApiResponse){
  return new Promise(resolve => {
    switch(req.method){
      case "POST":
        handlePost(req,res).then(() => {
          resolve(res);
        }
        ).catch(err => {
          return res.status(400).json({
            error: err.message
          })
        }
        );
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
async function handlePost(req:NextApiRequest,res:NextApiResponse){


}
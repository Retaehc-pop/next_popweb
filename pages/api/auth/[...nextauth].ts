import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
// import GoogleProvider from "next-auth/providers/google"
// import EmailProvider from "next-auth/providers/email"
// import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import prisma from "../../../components/prisma"

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXT_AUTH_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.NEXTAUTH_GITHUB_CLIENT_ID,
      clientSecret: process.env.NEXTAUTH_GITHUB_CLIENT_SECRET,
    }),
  ],
})
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
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
  theme: {
    colorScheme: "light", // "auto" | "dark" | "light"
    brandColor: "#30365a", // Hex color code
    logo: "/favicon.ico", // Absolute URL to image
  },
  callbacks:{
    async redirect({ url, baseUrl}){
      if (url.startsWith("/api/auth/callback")) return `${baseUrl}${url}`
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    }
  }
})
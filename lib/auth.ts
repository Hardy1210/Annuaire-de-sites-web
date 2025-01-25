import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import NextAuth from "next-auth"
import authConfig from "./auth.config"

//pour inscrire le client dans la DB
const prisma = new PrismaClient()

 //confuigure et gere l'autehntification d'un utilisateur
 //handlers: les fonctions qui gerent les requetes d'authentification
 //auth middleware: gere l'authentification de l'utilisateur
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),

  //stocker token cote client plutot que dans la basse de donnees pou
  //la facilite d'integracion avec serverless 
  //moins de requete serveur
  //bon securite
  session: { strategy: "jwt" }, 

    ...authConfig
})
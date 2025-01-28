import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs' // Para verificar contraseñas
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import authConfig from './auth.config'

const prisma = new PrismaClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: 'jwt' },
  providers: [
    // Proveedor de credenciales para email y contraseña
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Buscar el usuario en la base de datos
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        // Verificar si el usuario existe y si la contraseña es correcta
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return user
        } else {
          return null // Si las credenciales son inválidas
        }
      },
    }),
    // Otros proveedores (GitHub, Google) importados desde authConfig
    ...authConfig.providers,
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id // Agregar el ID del usuario al token
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id // Agregar el ID del usuario a la sesión
      return session
    },
  },
})

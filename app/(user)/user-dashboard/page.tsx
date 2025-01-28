'use client'
//import { useSession } from 'next-auth/react'
//import { useState } from 'react'
import NavBar from '@/app/_components/nav_bar/NavBar'

export default function DashboardPage() {
  // const { data: session } = useSession()

  return (
    <div>
      <NavBar />
      <h3 className="text-5xl">dashboard utilisateur</h3>
    </div>
  )
}

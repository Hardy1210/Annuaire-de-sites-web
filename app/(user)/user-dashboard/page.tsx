'use client'
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';



export default function DashboardPage () {
    const { data: session } = useSession(); 

    return (
        <>
        {session?.user? (
            <>
            {session?.user?.image && (
                <Image src={session.user.image}
                alt="user avatar"
                width={50}
                height={50}
                className="rounded-full"
                />
            )}
            {session.user.image && (
                <span>{session.user.name}</span>
            )}
            <button onClick={() => signOut()}>Déconnection</button>
            </>

        ) : (
            <Link href="/login"><button>Connection</button></Link>
        )}
        </>
    )
} 
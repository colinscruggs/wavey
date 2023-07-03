'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import styles from "./Buttons.module.css";


export function SignInButton() {
    const { data: session, status } = useSession();
    console.log(session, status);

    if (status === 'loading') {
        return <>...</>
    }
    if (status === 'authenticated') {
        return (
            <Link href={'/dashboard'} className={styles.signIn}>
                <img
                    src={session.user?.image ?? './next.svg'}
                    width={32}
                    height={32}
                    alt="avatar"
                />
                <h6>Welcome, {session.user?.name}</h6>
            </Link>
        )
    }
    return (
        <button onClick={() => signIn()}>Sign In</button>
    )
}

export function SignOutButton() {
    return (
        <button onClick={() => signOut()}>Sign Out</button>
    )
}
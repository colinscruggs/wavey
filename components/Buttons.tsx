'use client';

import { useSession, signIn, signOut } from "next-auth/react";
import Link from "next/link";
import styles from "./Buttons.module.css";

export function SignInButton() {
    const { data: session, status } = useSession();

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
        <button onClick={() => signIn('spotify', {
            callbackUrl: '/dashboard',
        })}>Sign In</button>
    )
}

export function SignOutButton() {
    return (
        <button onClick={() => signOut({
            callbackUrl: '/',
        })}>Sign Out</button>
    )
}

export function LandingPageButton() {
    const handleLandingPageButton = () => {
        // this is scuffed; handles the both authenticated and unauthenticated cases, resulting in signing in either way
        // TODO: figure out how to redirect to dashboard if authenticated to avoid duplicate sign in
        return signIn('spotify', {
            callbackUrl: '/dashboard',
        });
    };

    return (
        <button onClick={() => handleLandingPageButton()}>Get Started</button>
    )
}
import Link from "next/link";
import Image from "next/image";
import styles from "./Navigation.module.css";
import { SignInButton, SignOutButton } from "@/components/Buttons";
import AuthCheck from "@/components/AuthCheck";

export default function Navigation() {

    return (
        <nav className={styles.nav}>
            <Link href="/">
                <Image src="/next.svg" alt="logo" width={216} height={30} />
            </Link>
            <ul className={styles.links}>
                {
                    /* TODO: add about to footer in root layout
                    <li>
                        <Link href={'/about'}>About</Link>
                    </li>
                    */
                }
                <li>
                    <SignInButton />
                </li>
                <li>
                    <AuthCheck>
                        <SignOutButton />
                    </AuthCheck>
                </li>
            </ul>
        </nav>
    )
}
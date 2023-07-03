import { getServerSession } from "next-auth";
import Favorites from "./(album-lists)/favorites/page";
import RecentlyListened from "./(album-lists)/recently-listened/page";
import styles from "./page.module.css";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const session = await getServerSession();
    if (!session) {
        // redirect to sign in page if not authenticated
        redirect("/api/auth/signin");
    }

    return (
        <div className={styles.container}>
            <h2>Search or select an album to continue</h2>
            <Favorites />
            <RecentlyListened />
        </div>
    )
}
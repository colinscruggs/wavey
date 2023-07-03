import styles from "./page.module.css";

// this is the homepage; first shown when arriving to the app authenticated or not
export default function Home() {
	return <main className={styles.main}>
		<div>
			<h1>Wavey</h1>
		</div>
	</main>;
}

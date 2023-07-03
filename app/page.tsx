import styles from "./page.module.css";
import { LandingPageButton } from "@/components/Buttons";

// this is the homepage; first shown when arriving to the app authenticated or not
export default function Home() {
	return <main className={styles.main}>
		<div>
			<h1>Wavey</h1>
			<p>Visualize your favorite albums track by track with their waveforms</p>
			<LandingPageButton />
		</div>
	</main>;
}

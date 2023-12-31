
import Navigation from "@/components/Navigation";
import "./globals.css";
import { Inter } from "next/font/google";
import AuthProvider from "./AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Wavey",
	description: "Visualize your favorite albums"
};

export default function RootLayout({
	children
}: {
	children: React.ReactNode;
}) {
	return (
		<AuthProvider>
			<html lang="en">
				<body className={inter.className} suppressHydrationWarning={true}>
					<Navigation />
					{children}
					{ /* TODO: add footer with about page and related info */ }
				</body>
			</html>
		</AuthProvider>
	);
}

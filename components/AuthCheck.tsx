"use client";

import { useSession } from "next-auth/react";

// can wrap any client-side component to check if the user is authenticated
export default function AuthCheck({ children }: { children: React.ReactNode }) {
	const { data: session, status } = useSession();

	console.log(session, status);

	if (status === "authenticated") {
		return <>{children}</>;
	} else {
		return <></>;
	}
}

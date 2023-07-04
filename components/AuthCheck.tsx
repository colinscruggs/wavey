"use client";

import { useSession } from "next-auth/react";

// can wrap any client-side component to check if the user is authenticated
// note: used to immediately hide any specific client-side action that requires authentication
export default function AuthCheck({ children }: { children: React.ReactNode }) {
	const { data: session, status } = useSession();

	console.log({...session}, 'current session details');

	if (status === "authenticated") {
		return <>{children}</>;
	} else {
		return <></>;
	}
}

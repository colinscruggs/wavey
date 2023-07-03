import type { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export const authOptions: NextAuthOptions = {
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID!,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
            profile: (profile) => {
                console.log('In profile');
                console.log(profile.id);
                 return {
                  id: profile.id,
                  name: profile.display_name,
                  email: profile.email,
                  image: profile.images.length > 0 ? profile.images[0].url : undefined
                }
              }
        }),
    ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
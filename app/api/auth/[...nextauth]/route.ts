import NextAuth from "next-auth";
import SpotifyProvider, { SpotifyProfile } from "next-auth/providers/spotify";

export const authOptions: any = {
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID!,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
            authorization: { params: { scope: "user-read-email user-read-private user-top-read user-read-recently-played" } },
            profile: (profile: SpotifyProfile) => {
                 return {
                  id: profile.id,
                  name: profile.display_name,
                  email: profile.email,
                  image: profile.images.length > 0 ? profile.images[0].url : undefined
                }
              },
        }),
    ],
    callbacks: {
        async jwt({ token, account }: any) {
            // Persist the OAuth access_token and or the user id to the token right after signin
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }: any) {
            // Send properties to the client, like an access_token from a provider.
            session.accessToken = token.accessToken;
            return session;
        }
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
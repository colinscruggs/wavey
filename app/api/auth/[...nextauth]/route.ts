import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import SpotifyProvider, { SpotifyProfile } from "next-auth/providers/spotify";

const SPOTIFY_REFRESH_TOKEN_URL = 'https://accounts.spotify.com/api/token'
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

async function refreshAccessToken(token: JWT): Promise<JWT> {
    try {
		console.log('refreshing access token');
		const basicAuth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
			'base64'
		);
		const { data } = await axios.post(
			SPOTIFY_REFRESH_TOKEN_URL,
			{
			  grant_type: 'refresh_token',
			  refresh_token: token.refreshToken,
			},
			{
			  headers: {
				Authorization: `Basic ${basicAuth}`,
				'Content-Type': 'application/x-www-form-urlencoded',
			  },
			}
		);
		return {
			...token,
			accessToken: data.access_token,
			accessTokenExpires: Date.now() + data.expires_in * 1000,
		};
	} catch (error) {
		console.log(error, 'there has been an error refreshing access token');
		return {
			...token,
			error: 'RefreshAccessTokenError',
		}
    }
  }

export const authOptions: NextAuthOptions = {
    providers: [
        SpotifyProvider({
            clientId: CLIENT_ID!,
            clientSecret: CLIENT_SECRET!,
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
				token.refreshToken = account.refresh_token;
				token.accessTokenExpires = Date.now() + account.expires_at * 1000;
            }

			if (token.accessTokenExpires && Date.now() < token.accessTokenExpires) {
				return token;
			}
			
			const newToken = await refreshAccessToken(token);
			return newToken;
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
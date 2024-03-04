import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { setCookie } from "nookies";
import { getTokenCookie } from "../../../lib/auth";

// Function to refresh access token using refresh token
const refreshAccessToken = async (refreshToken: string) => {
  try {
    const response = await axios.post("http://localhost:5000/refresh-token", {
      refreshToken,
    });
    const data = response.data;
    if (data.accessToken) {
      return data.accessToken;
    }
    return null;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
};

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials, req) {
        try {
          const response = await axios.post(
            "http://localhost:5000/login",
            credentials
          );
          const data = response.data;
          if (data.accessToken && data.refreshToken) {
            console.log(1);
            setCookie(null, "refreshToken", data.refreshToken, {
              maxAge: 60 * 60 * 24,
              path: "/",
            });

            return data;
          }
        } catch (error) {
          console.error("Error authorizing user:", error);
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt(params) {
      const { token, user, account, profile, isNewUser } = params;
      // Check if token is expired
      if (token && Date.now() > Date.now() - 60 * 60 * 1000) {
        const refreshToken = getTokenCookie();
        if (refreshToken) {
          const newAccessToken = await refreshAccessToken(refreshToken);
          if (newAccessToken) {
            token.accessToken = newAccessToken;
            token.exp = Math.floor(Date.now() / 1000) + 60 * 60; // Assuming 1 hour expiration
          }
        }
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };

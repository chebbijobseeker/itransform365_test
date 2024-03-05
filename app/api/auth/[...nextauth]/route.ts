import NextAuth, { Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

// Define the extended Session type
interface CustomSession extends Session {
  accessToken?: string;
  accessTokenExpiry?: number;
  error?: string | null;
}

// Define the Token type
interface Token {
  accessToken: string;
  accessTokenExpiry: number;
  refreshToken: string;
  error?: string | null;
  user?: any;
}

type JWT = {
  accessToken: string;
  accessTokenExpiry: number;
  refreshToken: string;
  user?: any;
};

async function refreshAccessToken(tokenObject: Token): Promise<Token> {
  try {
    const tokenResponse = await axios.post<{
      accessToken: string;
      accessTokenExpiry: number;
      refreshToken: string;
    }>("" + "auth/refreshToken", {
      token: tokenObject.refreshToken,
    });

    return {
      ...tokenObject,
      accessToken: tokenResponse.data.accessToken,
      accessTokenExpiry: tokenResponse.data.accessTokenExpiry,
      refreshToken: tokenResponse.data.refreshToken,
    };
  } catch (error) {
    return {
      ...tokenObject,
      error: "RefreshAccessTokenError",
    };
  }
}

const providers = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: {},
      password: {},
    },
    authorize: async (credentials, req) => {
      try {
        const user = await axios.post("http://localhost:5000/login", {
          password: credentials?.password,
          email: credentials?.email,
        });

        if (user.data.accessToken) {
          return user.data;
        }

        return null;
      } catch (e) {
        throw new Error("error");
      }
    },
  }),
];

const callbacks = {
  jwt: async ({ token, user }: { token: Token; user: any }) => {
    if (user) {
      console.log("this is user ", user);
      token.accessToken = user.accessToken;
      token.accessTokenExpiry = user?.data?.accessTokenExpiry;
      token.refreshToken = user.refreshToken;
      token.user = user.user;
    }

    const shouldRefreshTime = Math.round(
      token.accessTokenExpiry - 60 * 60 * 1000 - Date.now()
    );

    if (shouldRefreshTime > 0) {
      return Promise.resolve(token);
    }

    token = await refreshAccessToken(token);
    return Promise.resolve(token);
  },
  session: async ({
    session,
    token,
  }: {
    session: CustomSession;
    token: JWT;
  }): Promise<CustomSession> => {
    session.accessToken = token.accessToken;
    session.accessTokenExpiry = token.accessTokenExpiry;
    session.user = token.user;
    // session.error = token.error;

    return session;
  },
};

const options = {
  session: {
    strategy: "jwt" as const, // Define session strategy as 'jwt'
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    ...callbacks,
  },
  providers: providers,
  secret: process.env.NEXTAUTH_SECRET,
};
// @ts-ignore
const handler = NextAuth({ ...options });

export { handler as GET, handler as POST };

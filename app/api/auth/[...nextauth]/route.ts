import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

NextAuth({
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
          if (data.status === 200) {
            return data.user;
          }
        } catch (error) {
          console.error("Error authorizing user:", error);
        }
        return null;
      },
    }),
  ],
});

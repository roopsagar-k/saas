import NextAuth, { AuthError } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import Discord from "next-auth/providers/discord";
import { db } from "./lib/drizzle/db";
import { UserTable } from "./lib/drizzle/schema";
import { count, eq } from "drizzle-orm";
import bcypt from "bcryptjs";
import { User } from "lucide-react";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: { params: { access_type: "offline", prompt: "consent" } },
    }),
    Discord({
      clientId: process.env.AUTH_DISCORD_ID,
      clientSecret: process.env.AUTH_DISCORD_SECRET,
      authorization: { params: { access_type: "offline", prompt: "consent" } },
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log("Received credentials:", credentials);
        const user = await db
          .select()
          .from(UserTable)
          .where(eq(UserTable.email, credentials.email as string));

        console.log("User found in database:", user);

        if (user.length === 0) {
          console.log("User not found");
          throw new AuthError("User not found.");
        }

        const isValidPassword = await bcypt.compare(
          credentials.password as string,
          user[0].password
        );

        console.log("Password comparison result:", isValidPassword);

        if (!isValidPassword) {
          throw new AuthError("Invalid password, try again!");
        }

        return isValidPassword ? user[0] : null;
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile, user }) {
      console.log("user: ", user);
      console.log("account: ", account);
      console.log("proflie: ", profile);
      const allUsers = await db.select().from(UserTable);
      const totalUsers = allUsers.length;
      if (account?.provider === "google") {
        if (profile?.email_verified) {
          const result = await db
            .select()
            .from(UserTable)
            .where(eq(UserTable.email, profile?.email!));
          if (result.length === 0) {
            await db.insert(UserTable).values({
              id: user.id,
              email: profile?.email!,
              password: "google-auth",
              name: profile?.name!,
              userName:
                (profile?.given_name! + profile?.family_name).toLowerCase() +
                (totalUsers + 1).toString(),
            });
          } else {
            await db
              .update(UserTable)
              .set({
                id: user.id,
                password: "google-auth",
              })
              .where(eq(UserTable.email, profile?.email!));
          }
          return true;
        }
        return false;
      }
      if (account?.provider === "discord") {
        if (profile?.verified) {
          const result = await db
            .select()
            .from(UserTable)
            .where(eq(UserTable.email, profile?.email!));
          console.log("result: ", result);
          if (result.length === 0) {
            await db.insert(UserTable).values({
              id: user.id,
              email: profile?.email!,
              password: "discord-auth",
              name: profile?.global_name as string,
              userName: profile?.username + (totalUsers + 1).toString(),
            });
          } else {
            await db
              .update(UserTable)
              .set({
                id: user.id,
                password: "discord-auth",
                name: profile?.name!,
              })
              .where(eq(UserTable.email, profile?.email!));
          }
          return true;
        }
        return false;
      }
    },
    async jwt({ token, user, account }) {
      if (account?.provider === "google" || account?.provider === "discord") {
        const User = await db
          .select()
          .from(UserTable)
          .where(eq(UserTable.email, token?.email!));
        if (User.length > 0) {
          console.log("User found from jwt: ", User);
          token.id = User[0].id?.toString();
          console.log("token from jwt: ", token);
        }
      }

      if (user) {
        token.id = user.id?.toString();
        token.email = user.email?.toString();
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id?.toString()!;
        session.user.email = token.email?.toString()!;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});

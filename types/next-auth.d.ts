import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string | number; // koristi `number` ako koristiš INT u bazi
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string | number;
  }
}

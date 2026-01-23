import { DefaultSession } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      address?: string | null;
      /**
       * By default the user object will not include the user's id.
       */
      id: string;
      idToken?: string;
    } & DefaultSession["user"];
  }

  interface User {
    address?: string | null;
  }
}

import { auth } from "@/auth";
import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default async function SettingsPage() {
  const session = await auth();
  return (
    <div>
      {JSON.stringify(session)}
      <div>UserName : {session?.user.name};</div>
      <div>email : {session?.user.email};</div>

      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button type="submit">Sign out</Button>
      </form>
    </div>
  );
}

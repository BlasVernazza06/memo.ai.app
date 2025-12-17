import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import ProfileView from "./components/profile-view";

export default async function ProfilePage() {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    const user = session?.user;

    return <ProfileView user={user} />;
}

import Navbar from "@/components/navbar";
import { SignOut } from "@/components/signout-button";
import useAuthStore from "@/store/auth";

export default function Home() {
  const { user } = useAuthStore();
  return (
    <div>
      <Navbar />
      <h1>Home</h1>
      <h1>{user?.name}</h1>
      <SignOut />
    </div>
  );
}

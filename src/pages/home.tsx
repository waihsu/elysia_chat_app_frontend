import Navbar from "@/components/navbar";
import { SignOut } from "@/components/signout-button";

export default function Home() {
  return (
    <div>
      <Navbar />
      <h1>Home</h1>
      {/* <h1>{user?.name}</h1> */}
      <SignOut />
    </div>
  );
}

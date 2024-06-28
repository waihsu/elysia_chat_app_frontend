import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import PrivateRoute from "./routes/private-route";
import { Login } from "./components/login";
import { Signup } from "./components/signup";
import Empty from "./pages/empty";
import Messages from "./components/messages";
import { useEffect } from "react";
import useAuthStore from "./store/auth";
import { RequestFriends } from "./store/requestFriends";
import { SentFriendRequest } from "./store/sentFriendRequest";
import { FriendLists } from "./store/friends";

function App() {
  const { user } = useAuthStore();
  const { addFriendLists, removeFriendList } = FriendLists();
  const { addedRequest, removeRequest } = RequestFriends();
  const { removeSentRequest } = SentFriendRequest();
  const socket = new WebSocket(
    `ws://localhost:3000/api/user/friends/${user?.id}`
  );

  useEffect(() => {
    socket.onopen = () => {
      console.log("connected");
    };
    socket.onmessage = (ev) => {
      const data = JSON.parse(ev.data);
      if (data.type === "addfriend") {
        addedRequest(data.user);
      }
      if (data.type === "canclefriend") {
        removeRequest(data.user);
      }
      if (data.type === "removeFriendrequest") {
        removeSentRequest(data.user);
      }
      if (data.type === "acceptFriend") {
        addFriendLists(data.user);
      }
      if (data.type === "unfriend") {
        removeFriendList(data.user);
      }
    };
  }, []);
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" Component={Home} />
        {/* <Route path="/Empty" Component={Empty} /> */}
        <Route path="/conversations" Component={Empty} />
        <Route path="/search" Component={Empty} />
        <Route path="/friends" Component={Empty} />
        <Route path="/request" Component={Empty} />
        <Route path="/conversations/:id" Component={Messages} />
      </Route>
      <Route path="/sign-in" Component={Login} />
      <Route path="/sign-up" Component={Signup} />
    </Routes>
  );
}

export default App;

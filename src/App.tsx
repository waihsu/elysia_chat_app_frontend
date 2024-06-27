import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import PrivateRoute from "./routes/private-route";
import { Login } from "./components/login";
import { Signup } from "./components/signup";
import Empty from "./pages/empty";
import Messages from "./components/messages";

function App() {
  console.log("app");
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

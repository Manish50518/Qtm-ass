import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import RegisterUser from "./RegisterUser";
import UserDetails from "./UserDetails";
import { Toaster } from "./components/ui/sonner";
import RequriedAuth from "./RequriedAuth";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterUser />} />
        <Route element={<RequriedAuth />}>
          <Route path="/userDetails" element={<UserDetails />} />
        </Route>{" "}
      </Routes>
      <Toaster position="top-center" />
    </BrowserRouter>
  );
}

export default App;

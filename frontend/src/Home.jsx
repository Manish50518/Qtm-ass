import {
  Bell,
  CalendarDays,
  CircleCheck,
  LogIn,
  MoveDown,
  MoveRight,
  Rotate3d,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import emailImage from "./assets/email.svg";

function Home() {
  const navigate = useNavigate();

  const breafing = [
    {
      icon: <CircleCheck strokeWidth={3} />,
      title: "Register with user details",
      color: "#6fff00",
    },
    {
      icon: <Bell strokeWidth={3} />,
      title: "Login with the credentials",
      color: "#ffff00",
    },
    {
      icon: <CalendarDays strokeWidth={3} />,
      title: "View the user details",
      color: "#f003e0",
    },
  ];

  return (
    <div className="flex flex-col md:flex-row  ">
      <section className="flex-1">
        <h1>Welcome to Quantum IT</h1>
        <h4 className="w-1/2">
          Here is a simple demonstration of React and Node.js where a user can
          register with their credentials. After logging in, if authenticated,
          they will be redirected to the user detail page which displays their
          information.
        </h4>

        <div className="grid sm:grid-cols-2 grid-cols-1 w-3/4 mt-8 gap-4">
          {breafing.map((item, id) => (
            <div key={id} className="flex gap-3 items-center">
              <p style={{ color: item.color }} className="font-bold">
                {item.icon}
              </p>
              <p className="font-extrabold">{item.title}</p>
            </div>
          ))}
        </div>

        <h2 className="flex items-center gap-5 mt-6">
          Demo
          <MoveRight />
        </h2>

        <div className="flex gap-4 mt-4">
          <button
            className="p-4 bg-white text-black rounded-sm font-bold hover:bg-[#2b2b2b] hover:text-white cursor-pointer flex gap-3"
            onClick={() => navigate("/login")}
          >
            Login <LogIn />
          </button>
          <button
            className="p-4 bg-[#2b2b2b] text-white rounded-sm font-bold cursor-pointer flex gap-3"
            onClick={() => navigate("/register")}
          >
            Register
            <Rotate3d />
          </button>
        </div>
      </section>

      <section className="flex-1">
        <img
          src={emailImage}
          alt="Email Illustration"
          className="w-[700px] h-screen object-contain"
        />
      </section>
    </div>
  );
}

export default Home;

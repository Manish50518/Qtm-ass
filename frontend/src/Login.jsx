import { X } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./components/ui/button";
import leaf from "./assets/plant-5.svg";
import { loginUser } from "./services/login";
import { toast } from "sonner";

function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const userDetails = { email: userEmail, password: pass };
      console.log({ userEmail, pass });
      const response = await loginUser(userDetails);

      if (response && response.token) {
        setUserEmail("");
        setPass("");
        toast("Loged in Sucessfully 🎉", {
          action: { label: "Undo" },
          description: <p className="mb-0 text-sm">Your now logded in 🥳</p>,
        });
        navigate("/userDetails");
      } else {
        setError("Login failed: No token received");
      }
    } catch (err) {
      setError(err.message);
      toast.error("Registration Failed ❌", {
        description: <p className="text-sm">{err.message}</p>,
      });
    }
  }

  return (
    <>
      <div className="relative bg-[#090808] p-8 border border-zinc-900 rounded-lg w-full max-w-sm mx-auto md:mt-30 mt-20 z-9">
        <Button
          onClick={() => navigate(-1)}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition border border-[#4b4b4b]"
          aria-label="Close"
        >
          <X className="" />
        </Button>

        <h2 className="text-2xl font-semibold text-center mb-6 text-white">
          Welcome!
        </h2>

        <p className="text-center">Login to your account 🥳</p>

        {error && <p className="text-center text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-white mb-1">
              Username
            </label>
            <input
              type="email"
              id="username"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="Enter username"
              required
              className="w-full px-4 py-2 border border-[#4b4b4b] bg-[#1b1b1b] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-white mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              placeholder="Enter password"
              required
              className="w-full px-4 py-2 border border-[#4b4b4b] bg-[#1b1b1b] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="p-8 bg-zinc-600 text-white py-2 rounded-sm hover:bg-green-700 transition duration-300 border-1 border-zinc-900"
            >
              Login
            </button>
          </div>
          <p className="text-center mt-4">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 underline">
              Sign up
            </a>
          </p>
        </form>
      </div>
      <div>
        <img
          src={leaf}
          alt="leaf"
          className="absolute -top-35 left-12 rotate-20 w-3/4 h-screen opacity-30 p-0"
        />
      </div>
    </>
  );
}

export default Login;

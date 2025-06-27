import { CalendarIcon, ChevronDownIcon, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./components/ui/button";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import leaf from "./assets/plant-5.svg";
import { registerUsers } from "./services/registerUser";
import { toast } from "sonner";

function RegisterUser() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [pass, setPass] = useState("");
  const [conformPass, setConformPass] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    if (pass !== conformPass) {
      setError("Passwords do not match Please correct");
      return;
    }

    setError("");

    registerUsers({
      name: firstName,
      dob: selectedDate,
      email: userEmail,
      password: pass,
    });

    toast.success("You have Registered Sucessfully 🥳", {
      action: { label: "Undo" },
      description: (
        <p className="mb-0 text-sm">
          Kindly login with the registered Email and Password do not forget it
          😉
        </p>
      ),
    });
    navigate("/login");
  }

  function handleDateChange(date) {
    const formatted = format(date, "yyyy-MM-dd");
    setSelectedDate(formatted);
  }

  return (
    <>
      <div className="relative bg-[#090808] p-8 rounded-lg w-full max-w-sm mx-auto mt-2 z-9 border border-zinc-900">
        <Button
          onClick={() => navigate(-1)}
          className="absolute top-3 right-3 text-gray-400 hover:text-white transition border border-[#4b4b4b]"
          aria-label="Close"
        >
          <X className="" />
        </Button>

        <h2 className="text-2xl font-semibold text-center mb-6 text-white">
          Register Your credentials 😉😉
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="firstName"
              className="block text-sm font-medium text-white mb-1"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Enter First Name"
              required
              className="w-full px-4 py-2 border border-[#4b4b4b] bg-[#1b1b1b] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="lastName"
              className="block text-sm font-medium text-white mb-1"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Enter Last Name"
              required
              className="w-full px-4 py-2 border border-[#4b4b4b] bg-[#1b1b1b] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
          </div>
          <div className="flex flex-col gap-2 relative w-full mb-4">
            <label htmlFor="date" className="text-sm font-medium text-white ">
              Select Date
            </label>
            <DatePicker
              id="date"
              selected={selectedDate ? new Date(selectedDate) : null}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              placeholderText="YYYY-MM-DD"
              showMonthDropdown
              showYearDropdown
              required
              dropdownMode="select"
              className="border border-[#4b4b4b] rounded px-10 bg-[#1b1b1b] py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-white"
            />
            <CalendarIcon className="absolute top-10 left-3 text-white w-4 h-4 pointer-events-none" />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-white mb-1"
            >
              Email
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
            <label
              htmlFor="password"
              className="block text-sm font-medium text-white mb-1"
            >
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
          <div className="mb-4">
            <label
              htmlFor="conformPass"
              className="block text-sm font-medium text-white mb-1"
            >
              Conform Password
            </label>
            <input
              type="password"
              id="conformPass"
              value={conformPass}
              onChange={(e) => setConformPass(e.target.value)}
              placeholder="Enter password again"
              required
              className="w-full px-4 py-2  border border-[#4b4b4b] bg-[#1b1b1b] rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
            />
            {error && (
              <span className="text-sm text-red-600 font-bold mt-1">
                {error}
              </span>
            )}
          </div>
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="p-8 bg-zinc-600 text-white py-2 rounded-sm hover:bg-blue-700 transition duration-300"
            >
              Sign In
            </button>
          </div>{" "}
          <p className="text-center mt-4">
            Allready have an account?{" "}
            <a href="/login" className="text-blue-600 underline">
              Sign In
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

export default RegisterUser;

import { useState, useEffect } from "react";
import { usersColumns } from "./components/table/UserColoumn";
import { DataTable } from "./components/table/UserTable";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function UserDetails() {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchUsers() {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found in localStorage");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:5000/api/auth/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUsersData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  function handleSignout() {
    localStorage.clear();

    toast.success("Logged Out Successfully");
    navigate("/");
  }

  if (loading) return <div className="container mx-auto py-10">Loading...</div>;
  if (error)
    return <div className="container mx-auto py-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">
          All Registered Users
        </h1>
        <p className="text-muted-foreground">
          Manage and view all users in the system
        </p>
      </div>
      <div className="flex justify-end mb-4">
        <button className="bg-blue-500 p-3 rounded-sm " onClick={handleSignout}>
          Sign out
        </button>
      </div>

      <DataTable columns={usersColumns} data={usersData} />
    </div>
  );
}

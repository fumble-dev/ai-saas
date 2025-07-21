import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";
import CreationItem from "../components/CreationItem";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getToken } = useAuth();

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/user/get-user-creations", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
      setLoading(false);
    
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="h-full p-4 overflow-y-auto">
      {/* Summary Cards */}
      <div className="flex flex-wrap gap-4">
        <div className="flex flex-col justify-center items-center w-64 p-4 border rounded text-center">
          <p className="text-sm text-gray-600">Total Creations</p>
          <h2 className="text-lg font-medium">
            {loading ? "..." : creations.length}
          </h2>
        </div>

        <div className="flex flex-col justify-center items-center w-64 p-4 border rounded text-center">
          <p className="text-sm text-gray-600">Active Plan</p>
          <h2 className="text-lg font-medium">Premium</h2>
        </div>
      </div>

      {/* Recent Creations */}
      {loading ? (
        <p className="text-sm text-gray-500 mt-6">Loading your creations...</p>
      ) : creations.length === 0 ? (
        <p className="text-sm text-gray-500 mt-6">No creations yet.</p>
      ) : (
        <div className="mt-6 space-y-3">
          <p className="text-sm">Recent Creations</p>
          {creations.map((item) => (
            <CreationItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

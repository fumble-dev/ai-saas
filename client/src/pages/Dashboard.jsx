import React, { useEffect, useState } from 'react';
import { dummyCreationData } from '../assets/assets';
import { Protect } from '@clerk/clerk-react';
import CreationItem from '../components/CreationItem';

const Dashboard = () => {
  const [creations, setCreations] = useState([]);

  const getDashboardData = async () => {
    setCreations(dummyCreationData);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="h-full p-4 overflow-y-auto">
      {/* Summary Cards */}
      <div className="flex flex-wrap gap-4">
        {/* Total Creations */}
        <div className="flex flex-col justify-center items-center w-64 p-4 border rounded text-center">
          <p className="text-sm">Total Creations</p>
          <h2 className="text-lg">{creations.length}</h2>
        </div>

        {/* Active Plan */}
        <div className="flex flex-col justify-center items-center w-64 p-4 border rounded text-center">
          <p className="text-sm">Active Plan</p>
          <h2 className="text-lg">
            <Protect plan="premium" fallback="Free">Premium</Protect>
          </h2>
        </div>
      </div>

      {/* Recent Creations */}
      <div className="mt-6 space-y-3">
        <p className="text-sm">Recent Creations</p>
        {creations.map((item) => (
          <CreationItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

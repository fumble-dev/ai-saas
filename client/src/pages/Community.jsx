import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { dummyPublishedCreationData } from "../assets/assets";

const Community = () => {
  const [creations, setCreations] = useState([]);
  const { user } = useUser();

  const fetchCreations = async () => {
    setCreations(dummyPublishedCreationData);
  };

  useEffect(() => {
    if (user) {
      fetchCreations();
    }
  }, [user]);

  return (
    <div className="p-4 flex flex-col gap-4 h-full">
      <h2 className="text-base">Creations</h2>

      <div className="flex flex-wrap gap-4 overflow-y-auto">
        {creations.map((creation, index) => (
          <div
            key={index}
            className="w-full max-w-xs border rounded p-2 bg-white flex flex-col gap-2"
          >
            <img
              src={creation.content}
              alt="creation"
              className="w-full h-48 object-cover rounded"
            />

            <p className="text-sm text-gray-700">{creation.prompt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;

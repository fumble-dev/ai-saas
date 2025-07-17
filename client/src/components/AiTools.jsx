import React from 'react';
import { AiToolsData } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const AiTools = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <div className="px-4 my-20">
      <div className="text-center mb-8">
        <h2 className="text-xl text-gray-800">Powerful AI Tools</h2>
        <p className="text-sm text-gray-600 max-w-md mx-auto">
          Everything you need to create, enhance, and optimize your content with cutting-edge AI technology
        </p>
      </div>

      <div className="flex flex-wrap justify-center">
        {AiToolsData.map((tool, index) => (
          <div
            key={index}
            className="p-4 m-3 w-64 border rounded cursor-pointer"
            onClick={() => user && navigate(tool.path)}
          >
            <tool.Icon className="w-8 h-8 mb-3" />
            <h3 className="text-base mb-1">{tool.title}</h3>
            <p className="text-xs text-gray-500">{tool.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiTools;

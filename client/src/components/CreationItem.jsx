import React, { useState } from 'react';
import Markdown from 'react-markdown';

const CreationItem = ({ item }) => {
    const [expanded,setExpanded] = useState(false)

  return (
    <div onClick={()=>setExpanded(!expanded)} className="p-3 border rounded cursor-pointer">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-sm">{item.prompt}</h2>
          <p className="text-xs text-gray-500">
            {item.type} - {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>
        <button className="px-2 py-1 text-xs border rounded">
          {item.type}
        </button>
      </div>
      {
        expanded &&(
            <div>
                {item.type === 'image' ? (
                    <div>
                        <img src={item.content} alt="image" className='mt-3 w-full max-w-md'/>
                    </div>
                ): (
                    <div className='mt-3 f-full overflow-y-scroll text-sm text-slate-700'>
                        <div>
                            <Markdown>
                                {item.content}
                            </Markdown>
                        </div>
                    </div>
                )}
            </div>
        )
      }
    </div>
  );
};

export default CreationItem;

import React from 'react';

function ApprovedSessionActions({ session }) {
  return (
    <div className="mt-4 flex gap-3">
      <button
        className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
        onClick={() => alert(`Starting Video Call for ${session.topic}`)}
      >
        Video Call
      </button>
      <button
        className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
        onClick={() => alert(`Starting Audio Call for ${session.topic}`)}
      >
        Audio Call
      </button>
      <button
        className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700"
        onClick={() => alert(`Opening Chat for ${session.topic}`)}
      >
        Messages
      </button>
    </div>
  );
}

export default ApprovedSessionActions;

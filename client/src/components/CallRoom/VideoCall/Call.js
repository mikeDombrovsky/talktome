import { useState } from "react";
import CallRoom from "./CallRoom";
import React from "react";

const Call = () => {
  const [joined, setJoined] = useState(false);
  return (
    <>
      <div className="text-center">
        <h1>WDJ Virtual Call</h1>
        {joined ? (
         <CallRoom />
        ) : (
           <button onClick={() => setJoined(true)}>Join Room</button>
        )}
      </div>
    </>
  );
};

export default Call;

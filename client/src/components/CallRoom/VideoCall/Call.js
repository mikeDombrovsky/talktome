import { useEffect, useState } from "react";
import CallRoom from "./CallRoom";
import React from "react";

const Call = () => {
  const [joined, setJoined] = useState(false);
  
  return (
    <>
      <div
        className="text-center d-flex flex-column justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <h1>Virtual Call</h1>
        {joined ? (
          <>
            <CallRoom />
            <button
              className="btn btn-success m-3"
              onClick={() => {
                setJoined(false);
                window.location.replace("/call/");
              }}
            >
              left Room
            </button>
          </>
        ) : (
          <button
            className="btn btn-success m-3"
            onClick={() => setJoined(true)}
          >
            Join Room
          </button>
        )}
      </div>
    </>
  );
};

export default Call;

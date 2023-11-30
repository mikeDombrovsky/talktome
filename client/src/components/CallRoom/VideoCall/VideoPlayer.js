import { useEffect, useRef } from "react";

export const VideoPlayer = ({ user }) => {
  const ref = useRef();
  useEffect(() => {
    console.log(user);
    user.videoTrack.play(ref.current);
  }, []);
  return (
    <div className="card m-2">
      <div
        className="card-img-top"
        ref={ref}
        style={{ width: "200px", height: "200px" }}
      ></div>
      <div className="card-body">
        <h5 className="card-title"> Uid:{user.uid}</h5>
      </div>
    </div>
  );
};

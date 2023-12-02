import { useEffect, useRef } from "react";

export const VideoPlayer = ({ user }) => {
  const ref = useRef();
  useEffect(() => {
    console.log(user);
    if (user) {
      user.videoTrack.play(ref.current);
    }else{
      ref.target.parentNode.remove();
    }
  }, [user]);
  return (
    <div className="card m-1 h-100">
      <div
        className="card-img-top w-100 h-100"
        ref={ref}
        // style={{ width: "50vw", height: "100vh" }}
      ></div>
      <div className="card-body">
        <h5 className="card-title"> Uid:{user.uid}</h5>
      </div>
    </div>
  );
};

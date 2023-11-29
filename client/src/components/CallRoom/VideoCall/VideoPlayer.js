import { useEffect, useRef } from "react";

export const VideoPlayer = ({user}) => {
  const ref = useRef();
  useEffect(() => {
    console.log(user);
    user.videoTrack.play(ref.current);
  }, []);
  return (
    <div>
      Uid:{user.uid}
      <div ref={ref} style={{display:'inline-block', width: "200px", height: "200px" }}></div>
    </div>
  );
};

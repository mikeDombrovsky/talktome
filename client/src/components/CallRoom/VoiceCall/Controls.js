// import { useState } from "react";
// import { useClient } from "./settings";

// import React from "react";

// const Controls = ({ tracks, setStart, setInCall }) => {
//   const client = useClient();
//   const [trackState, setTrackstate] = useState({ video: true, audio: true });
//   const blue = "btn btn-primary ";
//   const red = "btn btn-danger ";

//   const mute = async (type) => {
//     if (type === "audio") {
//       await tracks[0].setEnabled(!trackState.audio);
//       setTrackstate((prev) => {
//         return { ...prev, audio: !prev.audio };
//       });
//     }else if(type === 'video'){
//          await tracks[1].setEnabled(!trackState.video);
//          setTrackstate((prev) => {
//            return { ...prev, video: !prev.video };
//          });
//     }
//   };

//   const leaveChannel = async () => {
//     await client.leave();
//     client.removeAllListeners();
//     tracks[0].close();
//     tracks[1].close();
//     setStart(false);
//     setInCall(false);
//   };

//   return (
//     <div>
//       <span>
//         <button
//           className={trackState.audio ? blue : red}
//           onClick={() => mute("audio")}
//         >
//           {trackState.audio ? " mic on" : "mic off"}
//         </button>
//       </span>
//       <span>
//         <button
//           className={trackState.video ? blue : red}
//           onClick={() => mute("video")}
//         >
//           {trackState.video ? "cam on" : "cam off"}
//         </button>
//       </span>
//       <span>
//         <button className={blue} onClick={() => leaveChannel()}>
//           Leave
//         </button>
//       </span>
//     </div>
//   );
// };

// export default Controls;

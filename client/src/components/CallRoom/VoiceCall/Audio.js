// import React, { useState, useEffect } from "react";
// import { AgoraVideoPlayer } from "agora-rtc-react";

// const Audio = ({ users, tracks }) => {
//   const [spacing, setSpacing] = useState(12);

//   useEffect(() => {
//     setSpacing(Math.max(Math.floor(12 / (users.length + 1))), 4);
//   }, [users, tracks]);

//   return (
//     <div style={{ height: "100%" }}>
//       <div>
//         <AgoraVideoPlayer
//           videoTrack={tracks[1]}
//           style={{ height: "100%", width: "100%" }}
//         />
//       </div>
//       <div>
//         {users.length > 0 &&
//           users.map((user) => {
//             if (user.videoTrack) {
//               return (
//                 <div>
//                   <AgoraVideoPlayer
//                     videoTrack={user.videoTrack}
//                     key={user.uid}
//                     style={{ height: "100%", width: "100%" }}
//                   />
//                 </div>
//               );
//             } else {
//               return null;
//             }
//           })}
//       </div>
//     </div>
//   );
// };

// export default Audio;

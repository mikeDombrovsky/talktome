// import React, { useState, useEffect } from "react";
// import {
//   config,
//   useClient,
//   useMicrophoneAndCameraTracks,
//   channelName,
// } from "./settings.js";
// import Controls from "./Controls.js";
// import Audio from './Audio.js';

// const VoiceCall = ({ setInCall }) => {
//   const [users, setUsers] = useState([]);
//   const [start, setStart] = useState(false);
//   const client = useClient();
//   const { ready, tracks } = useMicrophoneAndCameraTracks();

//   useEffect(() => {
//     let init = async (name) => {
//       client.on("user-published", async (user, mediaType) => {
//         await client.subscribe(user, mediaType);
//         if (mediaType === "video") {
//           setUsers((prevUsers) => {
//             //if prevusers > 1 do not for 2 users hint?
//             return [...prevUsers, user];
//           });
//         }
//         if (mediaType === "audio") {
//           user.audioTrack.play();
//         }
//       });

//       client.on("user-unpublished", (user, mediaType) => {
//         if (mediaType === "audio") {
//           if (user.audioTrack) {
//             user.audioTrack.stop();
//           }
//         }
//         if (mediaType === "video") {
//           setUsers((prevUsers) => {
//             return prevUsers.filter((User) => User.uid !== user.uid);
//           });
//         }
//       });

//       client.on("user-left", (user) => {
//         setUsers((prevUsers) => {
//           return prevUsers.filter((User) => User.uid !== user.uid);
//         });
//       });

//       try {
//         //set here id of user instead of null
//         await client.join(config.appId,name, config.token, null);
//       } catch (err) {
//         console.log(err);
//       }

//       if (tracks) {
//         await client.publish([tracks[0], tracks[1]]);
//       }
//       setStart(true);
//     };

//     if (ready && tracks) {
//       try {
//         init(channelName);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//   }, [channelName, client, ready, tracks]);

//   return (
//     <div className="d-flex flex-column " style={{ height: "100%" }}>
//       <div className="" style={{ height: "5%" }}>
//         {ready && tracks && (
//           <Controls tracks={tracks} setStart={setStart} setInCall={setInCall} />
//         )}
//       </div>
//       <div className="" style={{ height: "95%" }}>
//         {ready && tracks && <Audio tracks={tracks} users={users} />}
//       </div>
//     </div>
//   );
// };

// export default VoiceCall;

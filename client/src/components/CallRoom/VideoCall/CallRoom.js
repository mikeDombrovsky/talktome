import AgoraRTC from "agora-rtc-sdk-ng";
import { useEffect, useState, useRef } from "react";
import { VideoPlayer } from "./VideoPlayer";
import LoadingScreen from "../../LoadingScreen";

const APP_ID = "04f7d4f4224544adaa8d63366f7071dd";
const TOKEN =
  "007eJxTYJj/N2zejgvcAUW6kon7JHcYRJfaWkz757NyAhcnw8WE0GwFBgOTNPMUkzQTIyMTUxOTxJTERIsUM2NjM7M0cwNzw5QUW9Hs1IZARoZnLzqYGRkgEMRnZihPyWJgAACPTBzp";
//it must be shared betwen interlocuters
const CHANNEL = "wdj";

console.log(process.env);

const client = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});

const CallRoom = ({ setJoined }) => {
  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const myCard = useRef();

  const handleUserJoined = async (user, mediaType) => {
    await client.subscribe(user, mediaType);
    if (mediaType === "video") {
      if (users.length == 2) {
        console.log(users);
      }
      setUsers((previousUsers) => {
        return [...previousUsers, user];
      });
    }

    if (mediaType === "audio") {
      user.audioTrack.play();
    }
  };

  const handleUserLeft = (user, mediaType) => {
    if (mediaType === "audio") {
      if (user.audioTrack) {
        user.audioTrack.stop();
      }
    }
    if (mediaType === "video") {
      setUsers((previousUsers) =>
        previousUsers.filter((u) => u.id !== user.uid)
      );
    }
  };

  useEffect(() => {
    client.on("user-published", handleUserJoined);
    client.on("user-unpublished", handleUserLeft);
    client.on("user-left", handleUserLeft);
    //null below for uid - to generate
    let tracks;
    const setUpTracks = async () => {
      const uid = await client.join(APP_ID, CHANNEL, TOKEN, null);
      tracks = await AgoraRTC.createMicrophoneAndCameraTracks();
      const [audioTrack, videoTrack] = tracks;

      setLocalTracks(tracks);

      setUsers((previousUsers) => [
        ...previousUsers,
        {
          uid,
          videoTrack,
          audioTrack,
        },
      ]);
      client.publish(tracks);
    };
    setUpTracks();
    setLoading(false);
    return async () => {
      for (let localTrack of localTracks) {
        localTrack.stop();
        localTrack.close();
      }
      client.off("user-published", handleUserJoined);
      client.off("user-left", handleUserLeft);
      client.off();
      await client.unpublish(tracks);
      client.leave();
    };
  }, []);

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width:'100%'
          }}
        >
          <div
            className="row align-items-center h-100 w-100"
          >
            {users.map((user) => {
              return <VideoPlayer key={user.uid} user={user} />;
            })}
          </div>
          <button
            className="btn btn-success m-3"
            onClick={(e) => {
              setJoined(false);
              e.target.parentNode.remove()

              window.location.replace("/call/");
            }}
          >
            left Room
          </button>
        </div>
      )}
    </>
  );
};

export default CallRoom;

import AgoraRTC from "agora-rtc-sdk-ng";
import { useEffect, useState } from "react";
import { VideoPlayer } from "./VideoPlayer";

const APP_ID = "04f7d4f4224544adaa8d63366f7071dd";
const TOKEN =
  "007eJxTYPj3PmW51/dTV8x+6FjpGuk6aFYZv+Ffb/39ZnPNTK1dMyYrMBiYpJmnmKSZGBmZmJqYJKYkJlqkmBkbm5mlmRuYG6akXDbLSG0IZGQo4DrNysgAgSA+M0N5ShYDAwBlWB9K";
const CHANNEL = "wdj";

console.log(process.env);

const client = AgoraRTC.createClient({
  mode: "rtc",
  codec: "vp8",
});

const CallRoom = () => {
  const [users, setUsers] = useState([]);
  const [localTracks, setLocalTracks] = useState([]);

  const handleUserJoined = async (user, mediaType) => {
    await client.subscribe(user, mediaType);
    if (mediaType === "video") {
      setUsers((previousUsers) => {
        if (previousUsers.length == 2) {
          handleUserLeft(user, mediaType);
          return previousUsers;
        }
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
    client.on("user-left", handleUserLeft);
    //null below for uid - to generate
    let tracks;
    const setUpTracks = async () => {
      const uid = await client.join(APP_ID, CHANNEL, TOKEN, null);
      tracks = await AgoraRTC.createMicrophoneAndCameraTracks();
      const [audioTrack, videoTrack] = tracks;

      setLocalTracks(tracks);

      console.log(uid, videoTrack);
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}>
        {users.map((user) => {
          return <VideoPlayer key={user.uid} user={user} />;
        })}
      </div>
    </div>
  );
};

export default CallRoom;

import AgoraRTC from "agora-rtc-sdk-ng";
import { useEffect, useState } from "react";
import { VideoPlayer } from "./VideoPlayer";

const APP_ID = "04f7d4f4224544adaa8d63366f7071dd";
const TOKEN =
  "007eJxTYGDm2/hQvvLwqSmpC49nrr3Ru33dqhVfmnbqZbQsuhu4b4WQAoOBSZp5ikmaiZGRiamJSWJKYqJFipmxsZlZmrmBuWFKilF+empDICND9+k/jIwMEAjiMzOUp2QxMAAA134hbQ==";
const CHANNEL = "wdj";

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
      setUsers((previousUsers) => [...previousUsers, user]);
    }

    if (mediaType === "audio") {
      // user.audioTrack.play()
    }
  };
  const handleUserLeft = (user) => {
    setUsers((previousUsers) => previousUsers.filter((u) => u.id !== user.uid));
  };

  useEffect(() => {
    client.on("user-published", handleUserJoined);
    client.on("user-left", handleUserLeft);
    //null below for uuid - to generate
    const setUpTracks = async () => {
      const uid = await client.join(APP_ID, CHANNEL, TOKEN, null);
      const tracks = await AgoraRTC.createMicrophoneAndCameraTracks();
      const [audioTrack, videoTrack] = tracks;

      setLocalTracks(tracks)

      console.log(uid, videoTrack);
      setUsers((previousUsers) => [
        ...previousUsers,
        {
          uid,
          videoTrack,
          audioTrack
        },
      ]);
      client.publish(tracks);
    };
    setUpTracks();

    return async () => {
        for(let localTrack of localTracks){
            localTrack.stop()
            localTrack.close()
        }
        client.off("user-published", handleUserJoined);
        client.off("user-left", handleUserLeft);
        client.off()
        await client.unpublish(tracks)
        client.leave()
    }
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 200px)" }}>
        {users.map((user) => {
          return <VideoPlayer key={user.uid} user={user} />;
        })}
      </div>
    </div>
  );
};

export default CallRoom;

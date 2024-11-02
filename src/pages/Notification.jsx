import React, { useEffect, useRef } from "react";
import Not from "../assets/not.mp3";

const Notification = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    audio.play();

    return () => {
      // Cleanup: Pause the audio when the component unmounts
      audio.pause();
    };
  }, []);

  return (
    <div>
      <audio ref={audioRef} src={Not} />
    </div>
  );
};

export default Notification;

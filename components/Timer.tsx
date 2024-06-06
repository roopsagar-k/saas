import React, { useEffect, useState } from "react";
import classNames from "classnames";

interface TimerProps {
  timeInMinutes: number;
}

const Timer: React.FC<TimerProps> = ({ timeInMinutes }) => {
  console.log("Timer component renderedm timeInMinutes: ", timeInMinutes);
  const [countdown, setCountdown] = useState(Number(timeInMinutes) * 60);

  useEffect(() => {
    setCountdown(timeInMinutes * 60);
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [timeInMinutes]);

  const minutes = Math.floor(countdown / 60);
  const seconds = countdown % 60;

  const formattedSeconds = countdown < 0 ? Math.abs(seconds) : seconds;

  return (
    <div
      className={classNames(
        "px-4 py-2 border border-primary rounded bg-accent dark:bg-black text-3xl font-semibold tracking-tight transition-colors first:mt-0",
        {
          "text-red-500": countdown < 0,
        }
      )}
    >
      {minutes} :
      {formattedSeconds < 10 ? ` 0${formattedSeconds}` : formattedSeconds}
    </div>
  );
};

export default Timer;

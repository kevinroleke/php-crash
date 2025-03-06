import { useState, useEffect } from 'react';

export default({ targetDate, onFinish }: { targetDate: Date, onFinish: () => void }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = Math.floor((+(targetDate) - +(new Date())) / 1000);
      return difference > 0 ? difference : 0;
    };

    setSeconds(calculateTimeLeft());

    const timer = setInterval(() => {
      const timeLeft = calculateTimeLeft();
      setSeconds(timeLeft);

      if (timeLeft === 0) {
        clearInterval(timer);
        onFinish();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return <span>{seconds}</span>;
};

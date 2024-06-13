import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(new Date());
  const clockRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getRotation = (handType) => {
    const degrees = {
      hour: (time.getHours() % 12) * 30 + time.getMinutes() * 0.5,
      minute: time.getMinutes() * 6 + time.getSeconds() * 0.1,
      second: time.getSeconds() * 6,
    };

    return degrees[handType];
  };

  // Calculate translation values dynamically based on clock size
  const calculateTranslation = () => {
    if (!clockRef.current) return '0';

    const clockSize = clockRef.current.offsetWidth;
    const translation = -(clockSize * 0.4);

    return `${translation}px`;
  };

  return (
    <>
      
      <div className="App">
        <div className="clock" ref={clockRef}>
          {[...Array(12).keys()].map((hour) => (
            <div
              key={hour}
              className="hour-number"
              style={{
                transform: `rotate(${hour * 30}deg) translate(0, ${calculateTranslation()}) rotate(-${hour * 30}deg)`,
              }}
            >
              {hour === 0 ? 12 : hour}
            </div>
          ))}
          <div
            className="hand hour-hand"
            style={{ transform: `rotate(${getRotation('hour')}deg)` }}
          ></div>
          <div
            className="hand minute-hand"
            style={{ transform: `rotate(${getRotation('minute')}deg)` }}
          ></div>
          <div
            className="hand second-hand"
            style={{ transform: `rotate(${getRotation('second')}deg)` }}
          ></div>
          <div className="center-circle"></div>
        </div>
      </div>
    </>
  );
}

export default App;

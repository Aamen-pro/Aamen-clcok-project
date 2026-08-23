import React, { useState, useEffect } from "react";

function AnalogClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const hours = now.getHours() % 12;
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  const hourAngle = hours * 30 + minutes * 0.5;
  const minuteAngle = minutes * 6 + seconds * 0.1;
  const secondAngle = seconds * 6;

  const numbers = Array.from({ length: 12 }, (_, i) => (i === 0 ? 12 : i));

  // Layout constants (matches a 400x400 viewBox)
  const cx = 200;
  const cy = 200;
  const faceR = 180;
  const numberR = 148;
  const tickOuter = 172;
  const tickInnerMinor = 162;
  const tickInnerHour = 152;

  const toXY = (angleDeg, r) => {
    const rad = (angleDeg - 90) * (Math.PI / 180);
    return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
  };
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <svg
        viewBox="0 0 100 400"
        width="100%"
        height="100%"
        className="drop-shadow-xl"
      >
        {/* Outer bezel */}
        <circle cx={cx} cy={cy} r={195} fill="#111111" />
        <circle cx={cx} cy={cy} r={186} fill="#050505" />

        {/* Clock face */}
        <circle cx={cx} cy={cy} r={faceR} fill="#ffffff" stroke="#e5e5e5" strokeWidth="1" />

        {/* Minute ticks */}
        {Array.from({ length: 60 }, (_, i) => {
          const isHour = i % 5 === 0;
          const angle = i * 6;
          const outer = toXY(angle, tickOuter);
          const inner = toXY(angle, isHour ? tickInnerHour : tickInnerMinor);
          return (
            <line
              key={`tick-${i}`}
              x1={outer.x}
              y1={outer.y}
              x2={inner.x}
              y2={inner.y}
              stroke="#111111"
              strokeWidth={isHour ? 3 : 1.5}
              strokeLinecap="round"
            />
          );
        })}

        {/* Numbers */}
        {numbers.map((num, i) => {
          const angle = (i + 1) * 30;
          const { x, y } = toXY(angle, numberR);
          return (
            <text
              key={`num-${num}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              fontFamily="Arial, Helvetica, sans-serif"
              fontWeight="700"
              fontSize={num === 12 ? 40 : 36}
              fill="#111111"
            >
              {num}
            </text>
          );
        })}

        {/* Hour hand */}
        <g transform={`rotate(${hourAngle} ${cx} ${cy})`}>
          <polygon
            points={`${cx - 6},${cy + 20} ${cx + 6},${cy + 20} ${cx + 3},${cy - 95} ${cx - 3},${cy - 95}`}
            fill="#111111"
          />
        </g>

        {/* Minute hand */}
        <g transform={`rotate(${minuteAngle} ${cx} ${cy})`}>
          <polygon
            points={`${cx - 4},${cy + 24} ${cx + 4},${cy + 24} ${cx + 2},${cy - 140} ${cx - 2},${cy - 140}`}
            fill="#111111"
          />
        </g>

        {/* Second hand */}
        <g transform={`rotate(${secondAngle} ${cx} ${cy})`}>
          <line x1={cx} y1={cy + 40} x2={cx} y2={cy - 150} stroke="#d21f1f" strokeWidth="2.5" strokeLinecap="round" />
        </g>

        {/* Center hub */}
        <circle cx={cx} cy={cy} r={8} fill="#111111" />
        <circle cx={cx} cy={cy} r={3} fill="#d21f1f" />
      </svg>
    </div>
  );
}

export default AnalogClock;
import MyDigitalclock from "./MyDigitalclock";
import Stopwatch from "./StopWatch/Stopwatch";
import AnalogClock from "./AnalogClock";

function App() {
  return (
    <div className="app-layout">
      <div className="digital-clock-container">
        <MyDigitalclock />
      </div>
      <div className="stopwatch-container">
        <Stopwatch />
      </div>
      <div className="analog-clock-container">
        <AnalogClock />
      </div>
    </div>
  );
}

export default App

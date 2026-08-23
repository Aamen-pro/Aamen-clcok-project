import React,{useState , useEffect ,useRef} from 'react';
import styles from './StopWatch.module.css';

function Stopwatch(){
    const [isRunning,setIsRunning] = useState(false);
    const [elapsedTime,setElapsedTime] = useState(0);
    const intervalRef = useRef(null);
    const startTimeRef = useRef(0);
    
    useEffect(()=>{
        if(isRunning){
            intervalRef.current = setInterval(()=>{
                setElapsedTime(Date.now() - startTimeRef.current)
            },10)
        }
        return () => clearInterval(intervalRef.current);
    },[isRunning])

    function Start(){
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;

    }
    function Stop(){
        setIsRunning(false);
    }
    function Reset(){
        setIsRunning(false);
        setElapsedTime(0);
    }
    function formatetime(){
        let hours       = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes     = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds     = Math.floor(elapsedTime / 1000 % 60);
        let milliseconds= Math.floor((elapsedTime % 1000) / 10);

        return (
            `${String(hours).padStart(2, "0")}:` +
            `${String(minutes).padStart(2, "0")}:` +
            `${String(seconds).padStart(2, "0")}:` +
            `${String(milliseconds).padStart(2, "0")}`
        );
    }

    return(
        <div className={styles.stopwatch}>
            <div className={styles.display}>{formatetime()}</div>
            <div className={styles.controls}>
                <button onClick={Start} className={styles['start-button']}>Start</button>
                <button onClick={Stop} className={styles['stop-button']}>Stop</button>
                <button onClick={Reset} className={styles['reset-button']}>Reset</button>
            </div>
        
        </div>
    );
}

export default Stopwatch
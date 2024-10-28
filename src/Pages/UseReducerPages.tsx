import React,{useEffect,useState} from 'react'



const temporizador = 1000;

    
const UseReducerPages: React.FC = () => {
    const [count, setCount] = useState(0);
    const [isRunning, setIsRunning] = useState(false);    


    useEffect(() => {
        if (isRunning) {
            const interval = setInterval(() => {
                setCount((count) => count + 1);
            }, temporizador);
            return () => clearInterval(interval);
        }
    }, [isRunning]);


    const handleStart = () => {
        setIsRunning(true);
    };
    const handleStop = () => {
        setIsRunning(false);
    };
    return (
        <div>
            <h1>Temporizador</h1>
                <button onClick={handleStart}>Start</button>
                <button onClick={handleStop}>Stop</button>
                <p>Count: {count}</p>
                <p>Count: {count}</p>
                    <p>Is Running: {isRunning}</p>
                    <p>Is Running: {isRunning}</p>

                
        </div>
    )
}

export default UseReducerPages

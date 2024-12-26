
import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState(["hi there", "hello"]);
  const wsRef = useRef<WebSocket | undefined>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const ws = new WebSocket("http://localhost:8080");

    wsRef.current = ws;  

    ws.onopen = () => {
      console.log("Inside OnOpen ");
      ws.send(JSON.stringify({    // Converts Object into String, as WS only accepts string/html
        type: "join",
        payload: {
          roomId: "red"
        }
      }))
    }

    ws.onmessage = (event) => {
      console.log("Inside OnMess " + JSON.stringify(event.data) );
      setMessages(m => [...m, event.data])    // ws.send() where ?
    }

    return () => {
      console.log("Before Closing the WS");
      ws.close()
    }
  }, []);

  return (
    <div className='h-screen bg-yellow-200'>
      <br /><br /><br />
      <div className='h-[85vh]'>
        {messages.map(mess => <div key={mess} className='m-8'> 
          <span className='bg-white text-blue rounded p-4 '>            
            {mess} 
          </span>
        </div>)}
      </div>
      <div className='w-full bg-white flex'>
        <input ref={inputRef} className="bg-green-200 text-black flex-1 p-4" placeholder='InputMessage'></input>
        <button onClick={() => {
          const inpMessage = inputRef.current?.value;
          wsRef.current?.send(JSON.stringify({
            type: "chat",
            payload: {
              message: inpMessage
            }
          }))

        }} className='bg-purple-600 text-white p-4'>
          Send message
        </button>
      </div>
    </div>
  )
}

export default App

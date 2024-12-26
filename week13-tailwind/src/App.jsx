import { useState } from 'react'
import './App.css'
import { OTPcopy } from './component/OTPcopy'

function App() {
  const [count, setCount] = useState(0)

  // color hex
  return (
    <div>
    <div className="grid grid-cols-10">
      <div className="col-span-3 bg-blue-500 text-green-300 rounded-md text-xs flex justify-center">
        Hi there from 1st div
      </div>
      <div className="col-span-5 bg-yellow-200 text-red-600 rounded-lg text-lg flex justify-center">
        Hi there from 2nd div
      </div>
      <div className="col-span-2 bg-green-300 text-blue-700 rounded-full text-xl flex justify-center">
        Hi there from 3rd div
      </div>
    </div>
    <div className='h-screen bg-gray-700'>
    <OTPcopy number={7}/>
    </div>
    </div>
  )
}

export default App

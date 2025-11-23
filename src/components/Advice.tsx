import { useEffect, useState } from "react"
import Loading from "./Loading"
import {motion, AnimatePresence} from "framer-motion"
export default function Advice() {
  const [advice, setAdvice] = useState('')
  const [loading, setLoading] = useState(false)
  async function fetchAdvice(){
    setLoading(true)
    try {
      const response = await fetch('https://api.adviceslip.com/advice')
      const data = await response.json();
      setAdvice(data.slip.advice)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchAdvice()
  }, [])

  return (
    <div className="flex flex-col justify-center items-center ">
      <AnimatePresence mode='wait'>
     {loading ? <Loading/>: <motion.h1 className="px-3 py-1 rounded-xl font-bold text-2xl text-center bg-amber-900" 
     initial={{scale: 0.5, opacity: 0}}
     animate={{scale: 1, opacity: 1}}
     exit={{scale: 0.5, opacity: 0}}
     transition={{duration: 0.9s}}
     >{advice}</motion.h1>
    }
      <button className='px-3 py-1 rounded-full bg-green-700 text-white font-bold hover:bg-transparent hover:border-2 cursor-pointer mt-6' onClick={fetchAdvice} disabled={loading}>Fetch More </button>
    </AnimatePresence/>
    </div>
  )
}

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
<AnimatePresence mode="wait">
  {loading ? (
    <motion.div
      key="loader"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Loading />
    </motion.div>
  ) : (
    <motion.h1
      key="advice"
      className="px-3 py-1 rounded-xl font-bold text-2xl text-center bg-amber-900"
      initial={{ scale: 0.5, opacity: 0, translateY: -100 }}
      animate={{ scale: 1, opacity: 1, translateY: 0 }}
      exit={{ scale: 0.5, opacity: 0, translateY: 100 }}
      transition={{ duration: 0.9 }}
    >
      {advice}
    </motion.h1>
  )}
</AnimatePresence>

      <button className='px-3 py-1 rounded-full bg-green-700 text-white font-bold hover:bg-transparent hover:border-2 cursor-pointer mt-6' onClick={fetchAdvice} disabled={loading}>Fetch More </button>
    </div>
  )
}

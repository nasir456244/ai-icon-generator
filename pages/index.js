import React, { useState } from 'react'
import Card from '@/components/Card';
import Loading from '@/components/Loading';
import Image from 'next/image';

const Home = () => {
  const [text, settext] = useState("")
  const [icon, setIcon] = useState(null)
  const colors = ["cyan", "orange", "yellow", "red","pink", "purple", "blue", "green"]
  const shapes = ["rounded", "square", "hexagon", "circular"];
  const styles = ["clay", "gradient", "isometric", "metallic", "neon", "pixelated", "3D"]
  const [selectedColor, setSelectedColor] = useState("");
  const [selectStyle, setselectStyle] = useState("")
  const [selectShape, setselectShape] = useState("")
  const [amount, setAmount] = useState(1)
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true)
    const response = await fetch('/api/generate-icon/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ text, selectShape, selectedColor, amount, selectStyle })
    })
    const {image_url} = await response.json()
    setIcon(image_url)
    setLoading(false)
  }

  return (
    <div className="flex flex-col gap-4 p-5 items-center">
        <h1 className='bg-blue-500 font-bold text-white text-4xl mb-6 w-fit'>Let&apos;s generate your icon.</h1>
        <span className='text-white w-[650px] text-2xl'>1. Describe your icon</span>
        <input value={text} onChange={(e) => settext(e.target.value)} placeholder='a sad donkey' className="outline-none border-2 border-cyan-400 p-2 w-[650px] text-lg" type="text" required />
        
        <div className="flex max-w-[650px] flex-wrap items-center gap-3">
          <span className='text-white text-2xl'>2. Select a primary color for your icon</span>
          <div className='flex flex-wrap gap-5'>
            {colors.map((color) => (
                <span onClick={() => setSelectedColor(color)} style={{backgroundColor: color}} key={color} className={`p-11 rounded-lg cursor-pointer hover:opacity-100 ${selectedColor === color ? "opacity-100 scale-110 " : "opacity-40"}`} />
            ))}
          </div>
        </div>

        <Card title="3. Select a style for your icon" array={styles} state={selectStyle} setstate={setselectStyle} />
        <Card title="4. Select the shape of your icon" array={shapes} state={selectShape} setstate={setselectShape} />
        <span className='text-white text-lg'>5. How many images do you want</span>
        <input min={1} max={10} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder='1' className="outline-none border-2 border-cyan-400 p-2 w-[650px] text-lg" type="number" required />
        
        <button 
          disabled={!text || !selectedColor || !selectShape || !selectStyle || !amount || amount > 10 || loading} 
          onClick={handleSubmit} className='bg-cyan-400 p-4 text-xl font-semibold text-white disabled:cursor-not-allowed disabled:opacity-40 w-[650px]' type="submit">
          Generate
        </button>
    
    {loading ? <Loading /> : icon && <div className='fixed h-screen w-screen top-0 left-0 flex flex-col gap-5 items-center justify-center'> <h1 className='text-white text-3xl font-semibold z-50'>Your icon</h1><Image className='rounded-lg z-50' alt={text} height={96} width={96} src={icon} /> <div className="w-screen h-screen fixed z-40 bg-[#000] opacity-80 left-0 top-0 p-6" /> </div>}
  </div>
  )
}

export default Home
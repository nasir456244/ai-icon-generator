import { openai } from "@/lib/OpenAi.config";

export default async function handler(req, res) {
  if(req.method === "POST") {
    const {text, selectShape, selectedColor, amount, selectStyle} = req.body
    if(!text || !selectShape || !selectedColor || !selectStyle) return res.status(400).send('body cant be empty')
    const response = await openai.createImage({
      prompt: `generate ${text} icon that is ${selectedColor} color, ${selectShape === "square" ? "rounded square" : selectShape} shape, cool ${selectStyle} style and a background ${selectedColor} color`,
      n: 1,
      size: "1024x1024",
    });
    const image_url = response?.data?.data[0]?.url;
    res.status(200).json({image_url})
  }
  else {
    return res.status(400).send("Bad method")
  }
}
"use client"

import { useState } from "react"
import axios from "axios"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function AvatarUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
      console.log("file: ", e.target.files[0]);

    }
  }

  const handleUpload = async () => {
    if (!file) return
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("image", file)

      const res = await axios.post("http://localhost:5000/api/images/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })

      console.log("imagen", res.data.imageUrl)
      setImageUrl(res.data.imageUrl)


    } catch (err) {
      console.error("Upload failed:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <Input type="file" onChange={handleFileChange} />
      <Button onClick={handleUpload} disabled={loading || !file}>
        {loading ? "Subiendo..." : "Subir Avatar"}
      </Button>
      {imageUrl && (
        <div>
          <p className="text-sm text-muted-foreground">Imagen subida:</p>
          <img
            src={imageUrl}
            alt="Avatar"
            className="w-20 h-20 rounded-full object-cover"
          />
        </div>
      )}
    </div>
  )
}

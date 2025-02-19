"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import ProgressBar from "@/components/ProgressBar"
import { saveSectionData } from "@/lib/googleSheets"
import { motion } from "framer-motion"

export default function Demographics() {
  console.log("Rendering Demographics page")
  const router = useRouter()
  const [formData, setFormData] = useState({
    ign: "",
    email: "",
    age: "",
    gender: "",
    city: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    console.log("Demographics page mounted")
    return () => {
      console.log("Demographics page unmounted")
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted")
    setIsSubmitting(true)
    try {
      await saveSectionData(formData.email, "Demographics", formData)
      localStorage.setItem("email", formData.email)
      localStorage.setItem("age", formData.age)
      localStorage.setItem("gender", formData.gender)
      router.push("/demographics-l2")
    } catch (error) {
      console.error("Error saving data:", error)
      alert("There was an error saving your data. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      {console.log("Rendering Demographics page content")}
      <ProgressBar currentStep={1} totalSteps={7} />
      <h1 className="text-3xl font-bold mb-6 text-primary">Basic Demographics</h1>
      <h2 className="text-xl mb-8">Who's the Player Behind the Screen?</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        {/* Form fields */}
        <motion.div whileTap={{ scale: 0.95 }} whileHover={{ scale: 1.05 }}>
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saving..." : "Next"}
          </Button>
        </motion.div>
      </form>
    </div>
  )
}


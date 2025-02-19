"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import ProgressBar from "@/components/ProgressBar"
import { saveSectionData } from "@/lib/googleSheets"
import { motion } from "framer-motion"

export default function GamingLevel2() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    startedGaming: "",
    playFrequency: "",
    gamePreference: "",
    gamePurchase: "",
    modifiedControllers: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const email = localStorage.getItem("email") || ""
      await saveSectionData(email, "Gaming Level 2", formData)
      router.push("/gaming-lifestyle")
    } catch (error) {
      console.error("Error saving data:", error)
      alert("There was an error saving your data. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white text-gray-900">
      <ProgressBar currentStep={4} totalSteps={7} />
      <h1 className="text-3xl font-bold mb-6 text-primary">Gaming Level 2</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <div>
          <Label>When did you first start gaming?</Label>
          <RadioGroup
            value={formData.startedGaming}
            onValueChange={(value) => setFormData({ ...formData, startedGaming: value })}
          >
            {["Less than a year ago", "1-3 years ago", "3-5 years ago", "More than 5 years ago"].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`started-${option}`} />
                <Label htmlFor={`started-${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div>
          <Label>How often do you play?</Label>
          <RadioGroup
            value={formData.playFrequency}
            onValueChange={(value) => setFormData({ ...formData, playFrequency: value })}
          >
            {["Daily", "A few times a week", "Occasionally"].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`frequency-${option}`} />
                <Label htmlFor={`frequency-${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div>
          <Label>Do you prefer single-player or multiplayer games?</Label>
          <RadioGroup
            value={formData.gamePreference}
            onValueChange={(value) => setFormData({ ...formData, gamePreference: value })}
          >
            {["Single-player", "Multiplayer", "Both"].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`preference-${option}`} />
                <Label htmlFor={`preference-${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div>
          <Label>Do you prefer buying a game (disk, online) or using a cracked version?</Label>
          <RadioGroup
            value={formData.gamePurchase}
            onValueChange={(value) => setFormData({ ...formData, gamePurchase: value })}
          >
            {["Buy physical copy", "Buy online", "Use cracked version offline"].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`purchase-${option}`} />
                <Label htmlFor={`purchase-${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div>
          <Label>Do you use modified/experimental gaming controllers?</Label>
          <RadioGroup
            value={formData.modifiedControllers}
            onValueChange={(value) => setFormData({ ...formData, modifiedControllers: value })}
          >
            {["Yes", "No"].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`controllers-${option}`} />
                <Label htmlFor={`controllers-${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
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
    </main>
  )
}


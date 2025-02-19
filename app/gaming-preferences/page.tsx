"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ProgressBar from "@/components/ProgressBar"
import { saveSectionData } from "@/lib/googleSheets"
import { motion } from "framer-motion"
import { gamesList } from "../page"

export default function GamingPreferences() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    platforms: [] as string[],
    favoriteGames: ["", "", ""],
    nextExcitedGame: "",
    spendMoney: "",
    upgradeFrequency: "",
    purchaseLocation: "",
    familiarWithKreo: "",
    setupSpending: "",
    gearFeatures: ["", "", "", "", ""],
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const email = localStorage.getItem("email") || ""
      await saveSectionData(email, "Gaming Preferences", formData)
      router.push("/gaming-level-2")
    } catch (error) {
      console.error("Error saving data:", error)
      alert("There was an error saving your data. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handlePlatformChange = (platform: string) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter((p) => p !== platform)
        : [...prev.platforms, platform],
    }))
  }

  const gearFeatureOptions = ["Performance", "Aesthetics", "Durability", "Price", "Brand"]

  const getRemainingGearFeatures = (index: number) => {
    const selectedFeatures = formData.gearFeatures.slice(0, index)
    return gearFeatureOptions.filter((feature) => !selectedFeatures.includes(feature))
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white text-gray-900">
      <ProgressBar currentStep={3} totalSteps={7} />
      <h1 className="text-3xl font-bold mb-6 text-primary">Gaming Preferences & Setup</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <div>
          <Label>Which platform(s) do you play on? (Select all that apply)</Label>
          {["Mobile", "PC", "PlayStation", "Xbox", "Laptop"].map((platform) => (
            <div key={platform} className="flex items-center space-x-2">
              <Checkbox
                id={platform}
                checked={formData.platforms.includes(platform)}
                onCheckedChange={() => handlePlatformChange(platform)}
              />
              <Label htmlFor={platform}>{platform}</Label>
            </div>
          ))}
        </div>
        <div>
          <Label>Top 3 favorite games?</Label>
          {[0, 1, 2].map((index) => (
            <Select
              key={index}
              value={formData.favoriteGames[index]}
              onValueChange={(value) => {
                const newFavoriteGames = [...formData.favoriteGames]
                newFavoriteGames[index] = value
                setFormData({ ...formData, favoriteGames: newFavoriteGames })
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder={`Favorite game ${index + 1}`} />
              </SelectTrigger>
              <SelectContent>
                {gamesList.map((game) => (
                  <SelectItem key={game} value={game}>
                    {game}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
        </div>
        <div>
          <Label htmlFor="nextExcitedGame">Next game you are excited about?</Label>
          <Input
            id="nextExcitedGame"
            value={formData.nextExcitedGame}
            onChange={(e) => setFormData({ ...formData, nextExcitedGame: e.target.value })}
            placeholder="Enter game name"
          />
        </div>
        <div>
          <Label>Do you spend money on games?</Label>
          <RadioGroup
            value={formData.spendMoney}
            onValueChange={(value) => setFormData({ ...formData, spendMoney: value })}
          >
            {["Yes, regularly", "Occasionally", "No, I play free games only"].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`spend-${option}`} />
                <Label htmlFor={`spend-${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div>
          <Label>How often do you upgrade your gaming gear?</Label>
          <Select
            value={formData.upgradeFrequency}
            onValueChange={(value) => setFormData({ ...formData, upgradeFrequency: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {["Every year", "Every 2-3 years", "Rarely", "Only when necessary"].map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Where do you purchase your gaming gear from?</Label>
          <Select
            value={formData.purchaseLocation}
            onValueChange={(value) => setFormData({ ...formData, purchaseLocation: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {[
                "Blinkit, Instamart, Zepto - I want it super quick!",
                "Local retailers - Need to feel it",
                "Second-hand market - Need it cheap",
                "Online Marketplace",
                "Brand website - Genuine stuff only!",
              ].map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>Are you familiar with Kreo products?</Label>
          <RadioGroup
            value={formData.familiarWithKreo}
            onValueChange={(value) => setFormData({ ...formData, familiarWithKreo: value })}
          >
            {["Yes", "No"].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`kreo-${option}`} />
                <Label htmlFor={`kreo-${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div>
          <Label>How much do you spend on your gaming setup (PC, console, accessories) per year?</Label>
          <Select
            value={formData.setupSpending}
            onValueChange={(value) => setFormData({ ...formData, setupSpending: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {[
                "₹0 - I use what I have",
                "₹5,000-20,000 - Basic setup upgrades",
                "₹20,000-50,000 - Serious investment",
                "₹50,000+ - Pro-level rig",
              ].map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>What features matter most in gaming gear? (Rank from most to least important)</Label>
          {[0, 1, 2, 3, 4].map((index) => (
            <div key={index} className="flex items-center space-x-2 mt-2">
              <Select
                value={formData.gearFeatures[index]}
                onValueChange={(value) => {
                  const newGearFeatures = [...formData.gearFeatures]
                  newGearFeatures[index] = value
                  setFormData({ ...formData, gearFeatures: newGearFeatures })
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder={`Rank ${index + 1}`} />
                </SelectTrigger>
                <SelectContent>
                  {getRemainingGearFeatures(index).map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Label>{formData.gearFeatures[index] || `Feature ${index + 1}`}</Label>
            </div>
          ))}
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


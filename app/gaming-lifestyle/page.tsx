"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import ProgressBar from "@/components/ProgressBar"
import { saveSectionData } from "@/lib/googleSheets"
import { motion } from "framer-motion"

export default function GamingLifestyle() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    otherInterests: [],
    customPeripherals: "",
    guiltyGamingFood: "",
    gamingContentTime: "",
    favoriteCreator: "",
    esportsTournament: "",
    createContent: "",
    streamingPlatforms: [],
    inGamePurchases: "",
    merchandisePurchases: "",
    collectGamingItems: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const email = localStorage.getItem("email") || ""
      await saveSectionData(email, "Gaming Lifestyle", formData)
      router.push("/gaming-family")
    } catch (error) {
      console.error("Error saving data:", error)
      alert("There was an error saving your data. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const interestOptions = [
    "Anime",
    "Esports",
    "Streaming",
    "Fitness",
    "Technology",
    "Music",
    "Cosplay",
    "Collectibles",
    "Board Games",
    "Fantasy Sports",
    "Coding",
    "Movies",
    "TV Shows",
    "Fashion",
    "Travel",
    "Photography",
  ]

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white text-gray-900">
      <ProgressBar currentStep={5} totalSteps={7} />
      <h1 className="text-3xl font-bold mb-6 text-primary">Gaming Lifestyle & Habits</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <div>
          <Label>Apart from gaming, what do you follow?</Label>
          <div className="grid grid-cols-2 gap-2">
            {interestOptions.map((interest) => (
              <div key={interest} className="flex items-center space-x-2">
                <Checkbox
                  id={`interest-${interest}`}
                  checked={formData.otherInterests.includes(interest)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormData({ ...formData, otherInterests: [...formData.otherInterests, interest] })
                    } else {
                      setFormData({
                        ...formData,
                        otherInterests: formData.otherInterests.filter((i) => i !== interest),
                      })
                    }
                  }}
                />
                <Label htmlFor={`interest-${interest}`}>{interest}</Label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Label>Do you use custom peripherals? Would you like to?</Label>
          <RadioGroup
            value={formData.customPeripherals}
            onValueChange={(value) => setFormData({ ...formData, customPeripherals: value })}
          >
            {["Yes, already use", "Would like to try", "Not interested", "What is a custom peripheral?"].map(
              (option) => (
                <div key={option} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`peripherals-${option}`} />
                  <Label htmlFor={`peripherals-${option}`}>{option}</Label>
                </div>
              ),
            )}
          </RadioGroup>
        </div>
        <div>
          <Label>Guilty gaming food?</Label>
          <Select
            value={formData.guiltyGamingFood}
            onValueChange={(value) => setFormData({ ...formData, guiltyGamingFood: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your guilty gaming food" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Fast food">Fast food (McDonald's, KFC, Dominos)</SelectItem>
              <SelectItem value="Snacks">Snacks (Lays, Kurkure, Pringles)</SelectItem>
              <SelectItem value="Healthy options">Healthy options (Nuts, Protein bars, Fruits)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label>How much time do you spend watching gaming content?</Label>
          <RadioGroup
            value={formData.gamingContentTime}
            onValueChange={(value) => setFormData({ ...formData, gamingContentTime: value })}
          >
            {["Daily", "Few times a week", "Rarely"].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`content-time-${option}`} />
                <Label htmlFor={`content-time-${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div>
          <Label htmlFor="favoriteCreator">Favorite gaming creator, streamer?</Label>
          <Input
            id="favoriteCreator"
            value={formData.favoriteCreator}
            onChange={(e) => setFormData({ ...formData, favoriteCreator: e.target.value })}
            placeholder="Enter name"
          />
        </div>
        <div>
          <Label>Have you ever participated in an eSports tournament?</Label>
          <RadioGroup
            value={formData.esportsTournament}
            onValueChange={(value) => setFormData({ ...formData, esportsTournament: value })}
          >
            {["Yes, regularly", "Occasionally", "No, but I want to", "No, not interested"].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`esports-${option}`} />
                <Label htmlFor={`esports-${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div>
          <Label>Do you stream or create gaming content?</Label>
          <RadioGroup
            value={formData.createContent}
            onValueChange={(value) => setFormData({ ...formData, createContent: value })}
          >
            {["Yes, full-time", "Yes, part-time", "No, but I want to", "No, not interested"].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`create-content-${option}`} />
                <Label htmlFor={`create-content-${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div>
          <Label>Which platforms do you use for streaming/watching gaming content?</Label>
          <div className="grid grid-cols-2 gap-2">
            {["YouTube", "Twitch", "Facebook Gaming", "Kick", "Other"].map((platform) => (
              <div key={platform} className="flex items-center space-x-2">
                <Checkbox
                  id={`platform-${platform}`}
                  checked={formData.streamingPlatforms.includes(platform)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setFormData({ ...formData, streamingPlatforms: [...formData.streamingPlatforms, platform] })
                    } else {
                      setFormData({
                        ...formData,
                        streamingPlatforms: formData.streamingPlatforms.filter((p) => p !== platform),
                      })
                    }
                  }}
                />
                <Label htmlFor={`platform-${platform}`}>{platform}</Label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <Label>How much do you spend on in-game purchases per month?</Label>
          <RadioGroup
            value={formData.inGamePurchases}
            onValueChange={(value) => setFormData({ ...formData, inGamePurchases: value })}
          >
            {[
              "₹0 - I'm strictly F2P",
              "₹100-500 - Casual spender",
              "₹500-2000 - Invested in the grind",
              "₹2000+ - Take my money, devs!",
            ].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`in-game-${option}`} />
                <Label htmlFor={`in-game-${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div>
          <Label>How much do you spend on gaming merchandise per year?</Label>
          <RadioGroup
            value={formData.merchandisePurchases}
            onValueChange={(value) => setFormData({ ...formData, merchandisePurchases: value })}
          >
            {[
              "₹0 - I don't buy merch",
              "₹500-2000 - Occasional buyer",
              "₹2000-5000 - Enthusiast",
              "₹5000+ - Hardcore collector",
            ].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`merch-${option}`} />
                <Label htmlFor={`merch-${option}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div>
          <Label>Do you collect gaming-related items?</Label>
          <RadioGroup
            value={formData.collectGamingItems}
            onValueChange={(value) => setFormData({ ...formData, collectGamingItems: value })}
          >
            {["Yes, actively", "Occasionally", "No, not interested"].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`collect-${option}`} />
                <Label htmlFor={`collect-${option}`}>{option}</Label>
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


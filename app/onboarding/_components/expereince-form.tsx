"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight, Plus, Trash2 } from "lucide-react"

interface ExperienceFormProps {
  onSubmit: (data: any) => void
}

export function ExperienceForm({ onSubmit }: ExperienceFormProps) {
  const [experiences, setExperiences] = useState([
    {
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      currentlyWorking: false,
      description: "",
    },
  ])

  const handleChange = (index: number, field: string, value: string | boolean) => {
    const updatedExperiences = [...experiences]
    updatedExperiences[index] = { ...updatedExperiences[index], [field]: value }
    setExperiences(updatedExperiences)
  }

  const handleAddExperience = () => {
    setExperiences([
      ...experiences,
      {
        title: "",
        company: "",
        location: "",
        startDate: "",
        endDate: "",
        currentlyWorking: false,
        description: "",
      },
    ])
  }

  const handleRemoveExperience = (index: number) => {
    if (experiences.length > 1) {
      const updatedExperiences = experiences.filter((_, i) => i !== index)
      setExperiences(updatedExperiences)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ experiences })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {experiences.map((experience, index) => (
        <div key={index} className="rounded-lg border border-[#DDDDFB] p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium text-[#141414]">Experience #{index + 1}</h3>
            {experiences.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveExperience(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`title-${index}`}>Job Title</Label>
              <Input
                id={`title-${index}`}
                placeholder="e.g. Software Engineer"
                value={experience.title}
                onChange={(e) => handleChange(index, "title", e.target.value)}
                required
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`company-${index}`}>Company</Label>
                <Input
                  id={`company-${index}`}
                  placeholder="e.g. Acme Inc."
                  value={experience.company}
                  onChange={(e) => handleChange(index, "company", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`location-${index}`}>Location</Label>
                <Input
                  id={`location-${index}`}
                  placeholder="e.g. New York, NY"
                  value={experience.location}
                  onChange={(e) => handleChange(index, "location", e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`start-date-${index}`}>Start Date</Label>
                <Input
                  id={`start-date-${index}`}
                  type="month"
                  value={experience.startDate}
                  onChange={(e) => handleChange(index, "startDate", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`end-date-${index}`}>End Date</Label>
                <Input
                  id={`end-date-${index}`}
                  type="month"
                  value={experience.endDate}
                  onChange={(e) => handleChange(index, "endDate", e.target.value)}
                  disabled={experience.currentlyWorking}
                  required={!experience.currentlyWorking}
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`current-${index}`}
                checked={experience.currentlyWorking}
                onCheckedChange={(checked) => handleChange(index, "currentlyWorking", !!checked)}
              />
              <Label htmlFor={`current-${index}`} className="text-sm font-normal">
                I currently work here
              </Label>
            </div>
            <div className="space-y-2">
              <Label htmlFor={`description-${index}`}>Description</Label>
              <Textarea
                id={`description-${index}`}
                placeholder="Describe your responsibilities and achievements..."
                value={experience.description}
                onChange={(e) => handleChange(index, "description", e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={handleAddExperience}
        className="w-full border-dashed border-[#DDDDFB] text-[#141414]"
      >
        <Plus className="mr-2 h-4 w-4" /> Add Another Experience
      </Button>

      <Button type="submit" className="w-full bg-[#1418EB] text-white hover:bg-[#1418EB]/90">
        Continue <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  )
}

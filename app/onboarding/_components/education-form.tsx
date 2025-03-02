"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Plus, Trash2 } from "lucide-react"

interface EducationFormProps {
  onSubmit: (data: any) => void
}

export function EducationForm({ onSubmit }: EducationFormProps) {
  const [educations, setEducations] = useState([
    {
      institution: "",
      degree: "",
      fieldOfStudy: "",
      startYear: "",
      endYear: "",
      currentlyStudying: false,
    },
  ])

  const handleChange = (index: number, field: string, value: string | boolean) => {
    const updatedEducations = [...educations]
    updatedEducations[index] = { ...updatedEducations[index], [field]: value }
    setEducations(updatedEducations)
  }

  const handleAddEducation = () => {
    setEducations([
      ...educations,
      {
        institution: "",
        degree: "",
        fieldOfStudy: "",
        startYear: "",
        endYear: "",
        currentlyStudying: false,
      },
    ])
  }

  const handleRemoveEducation = (index: number) => {
    if (educations.length > 1) {
      const updatedEducations = educations.filter((_, i) => i !== index)
      setEducations(updatedEducations)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ educations })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {educations.map((education, index) => (
        <div key={index} className="rounded-lg border border-[#DDDDFB] p-4">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium text-[#141414]">Education #{index + 1}</h3>
            {educations.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveEducation(index)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor={`institution-${index}`}>Institution</Label>
              <Input
                id={`institution-${index}`}
                placeholder="University/College/School Name"
                value={education.institution}
                onChange={(e) => handleChange(index, "institution", e.target.value)}
                required
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`degree-${index}`}>Degree</Label>
                <Select onValueChange={(value) => handleChange(index, "degree", value)} defaultValue={education.degree}>
                  <SelectTrigger id={`degree-${index}`}>
                    <SelectValue placeholder="Select degree" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high_school">High School</SelectItem>
                    <SelectItem value="associate">Associate's Degree</SelectItem>
                    <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                    <SelectItem value="master">Master's Degree</SelectItem>
                    <SelectItem value="doctorate">Doctorate</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor={`field-${index}`}>Field of Study</Label>
                <Input
                  id={`field-${index}`}
                  placeholder="e.g. Computer Science"
                  value={education.fieldOfStudy}
                  onChange={(e) => handleChange(index, "fieldOfStudy", e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor={`start-year-${index}`}>Start Year</Label>
                <Input
                  id={`start-year-${index}`}
                  placeholder="YYYY"
                  value={education.startYear}
                  onChange={(e) => handleChange(index, "startYear", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor={`end-year-${index}`}>End Year (or Expected)</Label>
                <Input
                  id={`end-year-${index}`}
                  placeholder="YYYY"
                  value={education.endYear}
                  onChange={(e) => handleChange(index, "endYear", e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={handleAddEducation}
        className="w-full border-dashed border-[#DDDDFB] text-[#141414]"
      >
        <Plus className="mr-2 h-4 w-4" /> Add Another Education
      </Button>

      <Button type="submit" className="w-full bg-[#1418EB] text-white hover:bg-[#1418EB]/90">
        Continue <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  )
}

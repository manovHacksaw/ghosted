"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ArrowRight, Plus, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"

interface SkillsFormProps {
  onSubmit: (data: any) => void
}

export function SkillsForm({ onSubmit }: SkillsFormProps) {
  const [skillInput, setSkillInput] = useState("")
  const [skills, setSkills] = useState<{ name: string; proficiency: number }[]>([])

  const handleAddSkill = () => {
    if (skillInput.trim() && !skills.some((s) => s.name.toLowerCase() === skillInput.toLowerCase())) {
      setSkills([...skills, { name: skillInput.trim(), proficiency: 3 }])
      setSkillInput("")
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddSkill()
    }
  }

  const handleRemoveSkill = (skillToRemove: string) => {
    setSkills(skills.filter((skill) => skill.name !== skillToRemove))
  }

  const handleProficiencyChange = (index: number, value: number[]) => {
    const updatedSkills = [...skills]
    updatedSkills[index].proficiency = value[0]
    setSkills(updatedSkills)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ skills })
  }

  const skillCategories = [
    {
      name: "Technical Skills",
      examples: ["Programming", "Data Analysis", "Web Development", "Machine Learning", "UI/UX Design"],
    },
    {
      name: "Soft Skills",
      examples: ["Communication", "Leadership", "Teamwork", "Problem Solving", "Time Management"],
    },
    {
      name: "Languages",
      examples: ["English", "Spanish", "French", "German", "Mandarin"],
    },
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Add a skill (e.g. Python, Leadership, Spanish)"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button
            type="button"
            onClick={handleAddSkill}
            className="shrink-0 bg-[#1418EB] text-white hover:bg-[#1418EB]/90"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        <div className="rounded-lg border border-[#DDDDFB] p-4">
          <h3 className="mb-4 text-lg font-medium text-[#141414]">Your Skills</h3>
          {skills.length === 0 ? (
            <p className="text-[#141414]/60">No skills added yet. Add some skills above.</p>
          ) : (
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={index} className="rounded-lg border border-[#DDDDFB] p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Badge className="bg-[#00EDBE] text-[#141414] hover:bg-[#00EDBE]/90">{skill.name}</Badge>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveSkill(skill.name)}
                        className="h-6 w-6 p-0 text-[#141414]/60 hover:text-[#141414]"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <span className="text-sm text-[#141414]/60">
                      {skill.proficiency === 1
                        ? "Beginner"
                        : skill.proficiency === 2
                          ? "Intermediate"
                          : skill.proficiency === 3
                            ? "Advanced"
                            : skill.proficiency === 4
                              ? "Expert"
                              : "Master"}
                    </span>
                  </div>
                  <div className="px-2">
                    <Label className="mb-2 text-xs text-[#141414]/60">Proficiency Level</Label>
                    <Slider
                      value={[skill.proficiency]}
                      min={1}
                      max={5}
                      step={1}
                      onValueChange={(value) => handleProficiencyChange(index, value)}
                      className="py-2"
                    />
                    <div className="flex justify-between text-xs text-[#141414]/60">
                      <span>Beginner</span>
                      <span>Master</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-lg border border-[#DDDDFB] p-4">
          <h3 className="mb-4 text-lg font-medium text-[#141414]">Suggested Skills</h3>
          <div className="space-y-4">
            {skillCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h4 className="mb-2 text-sm font-medium text-[#141414]">{category.name}</h4>
                <div className="flex flex-wrap gap-2">
                  {category.examples.map((example, exampleIndex) => (
                    <Badge
                      key={exampleIndex}
                      variant="outline"
                      className="cursor-pointer border-[#DDDDFB] hover:bg-[#F5F5F5]"
                      onClick={() => {
                        setSkillInput(example)
                      }}
                    >
                      {example}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full bg-[#1418EB] text-white hover:bg-[#1418EB]/90">
        Continue <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  )
}

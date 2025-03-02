"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

interface CareerAssessmentProps {
  onSubmit: (data: any) => void
}

export function CareerAssessment({ onSubmit }: CareerAssessmentProps) {
  const questions = [
    {
      id: "q1",
      question: "I prefer working with:",
      options: [
        { value: "a", label: "Data and numbers" },
        { value: "b", label: "People and relationships" },
        { value: "c", label: "Ideas and concepts" },
        { value: "d", label: "Physical objects and tools" },
      ],
    },
    {
      id: "q2",
      question: "When solving problems, I tend to:",
      options: [
        { value: "a", label: "Analyze data and look for patterns" },
        { value: "b", label: "Discuss with others to find solutions" },
        { value: "c", label: "Think creatively and outside the box" },
        { value: "d", label: "Take a hands-on, practical approach" },
      ],
    },
    {
      id: "q3",
      question: "I find the most satisfaction in:",
      options: [
        { value: "a", label: "Organizing and structuring information" },
        { value: "b", label: "Helping and supporting others" },
        { value: "c", label: "Creating something new and innovative" },
        { value: "d", label: "Building or fixing things" },
      ],
    },
    {
      id: "q4",
      question: "In a team, I usually take on the role of:",
      options: [
        { value: "a", label: "The analyst who examines the details" },
        { value: "b", label: "The communicator who keeps everyone connected" },
        { value: "c", label: "The visionary who generates new ideas" },
        { value: "d", label: "The implementer who gets things done" },
      ],
    },
    {
      id: "q5",
      question: "I learn best by:",
      options: [
        { value: "a", label: "Reading and researching" },
        { value: "b", label: "Discussing and collaborating" },
        { value: "c", label: "Exploring and experimenting" },
        { value: "d", label: "Doing and practicing" },
      ],
    },
    {
      id: "q6",
      question: "I value work environments that:",
      options: [
        { value: "a", label: "Are structured and organized" },
        { value: "b", label: "Promote teamwork and collaboration" },
        { value: "c", label: "Encourage innovation and creativity" },
        { value: "d", label: "Allow for independence and autonomy" },
      ],
    },
    {
      id: "q7",
      question: "I'm most motivated by:",
      options: [
        { value: "a", label: "Achieving measurable results" },
        { value: "b", label: "Making a positive impact on others" },
        { value: "c", label: "Exploring new possibilities" },
        { value: "d", label: "Mastering practical skills" },
      ],
    },
    {
      id: "q8",
      question: "When faced with a challenge, I typically:",
      options: [
        { value: "a", label: "Break it down into smaller, manageable parts" },
        { value: "b", label: "Seek advice and input from others" },
        { value: "c", label: "Look for alternative, unconventional solutions" },
        { value: "d", label: "Roll up my sleeves and tackle it head-on" },
      ],
    },
    {
      id: "q9",
      question: "I prefer jobs that involve:",
      options: [
        { value: "a", label: "Analysis, research, and planning" },
        { value: "b", label: "Teaching, counseling, or customer service" },
        { value: "c", label: "Design, writing, or strategic thinking" },
        { value: "d", label: "Building, repairing, or working outdoors" },
      ],
    },
    {
      id: "q10",
      question: "My ideal career would allow me to:",
      options: [
        { value: "a", label: "Solve complex problems and make data-driven decisions" },
        { value: "b", label: "Help others and make a difference in their lives" },
        { value: "c", label: "Express my creativity and innovate" },
        { value: "d", label: "Work with my hands and see tangible results" },
      ],
    },
  ]

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value })
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ answers })
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="mb-4 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#141414]/60">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm font-medium text-[#141414]">{progress.toFixed(0)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="rounded-lg border border-[#DDDDFB] p-6">
        <h3 className="mb-6 text-xl font-medium text-[#141414]">{questions[currentQuestion].question}</h3>

        <RadioGroup
          value={answers[questions[currentQuestion].id] || ""}
          onValueChange={(value) => handleAnswer(questions[currentQuestion].id, value)}
          className="space-y-3"
        >
          {questions[currentQuestion].options.map((option) => (
            <div
              key={option.value}
              className={`flex cursor-pointer items-center rounded-lg border border-[#DDDDFB] p-4 transition-colors hover:bg-[#F5F5F5] ${
                answers[questions[currentQuestion].id] === option.value ? "border-[#1418EB] bg-[#1418EB]/5" : ""
              }`}
              onClick={() => handleAnswer(questions[currentQuestion].id, option.value)}
            >
              <RadioGroupItem
                value={option.value}
                id={`${questions[currentQuestion].id}-${option.value}`}
                className="mr-3"
              />
              <Label
                htmlFor={`${questions[currentQuestion].id}-${option.value}`}
                className="w-full cursor-pointer font-normal"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="flex justify-between">
        {currentQuestion > 0 ? (
          <Button type="button" variant="outline" onClick={handlePrevious} className="border-[#DDDDFB] text-[#141414]">
            Previous
          </Button>
        ) : (
          <div></div>
        )}

        {currentQuestion < questions.length - 1 ? (
          <Button
            type="button"
            onClick={handleNext}
            disabled={!answers[questions[currentQuestion].id]}
            className="bg-[#1418EB] text-white hover:bg-[#1418EB]/90"
          >
            Next
          </Button>
        ) : (
          <Button
            type="submit"
            disabled={!answers[questions[currentQuestion].id]}
            className="bg-[#1418EB] text-white hover:bg-[#1418EB]/90"
          >
            Submit Assessment <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </form>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, CheckCircle } from "lucide-react"
import { ProfileForm } from "./_components/profile-form"
import { EducationForm } from "./_components/education-form"
import { SkillsForm } from "./_components/skills-form"
import { InterestsForm } from "./_components/interests-form"
import { ExperienceForm } from "./_components/expereince-form"
import { CareerAssessment } from "./_components/carrer-assessment"
import { ProcessingResults } from "./_components/processing-result"
import Navbar from "@/components/navbar"

const steps = [
 
  { id: "education", title: "Education" },
  { id: "skills", title: "Skills" },
  { id: "interests", title: "Interests" },
  { id: "experience", title: "Experience" },
  { id: "assessment", title: "Career Assessment" },
  { id: "results", title: "Results" },
]

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    account: {},
    education: {},
    skills: {},
    interests: {},
    experience: {},
    assessment: {},
  })

  const [isProcessing, setIsProcessing] = useState(false)

  const handleNext = (data: any) => {
    const currentStepId = steps[currentStep].id
    setFormData((prev) => ({ ...prev, [currentStepId]: data }))

    if (currentStep === steps.length - 2) {
      // Before showing results, simulate AI processing
      setIsProcessing(true)
      setTimeout(() => {
        setIsProcessing(false)
        setCurrentStep(currentStep + 1)
      }, 3000)
    } else {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
  }

  const renderStep = () => {
    switch (steps[currentStep].id) {
      
      case "education":
        return <EducationForm onSubmit={handleNext} />
      case "skills":
        return <SkillsForm onSubmit={handleNext} />
      case "interests":
        return <InterestsForm onSubmit={handleNext} />
      case "experience":
        return <ExperienceForm onSubmit={handleNext} />
      case "assessment":
        return <CareerAssessment onSubmit={handleNext} />
      case "results":
        return <ProcessingResults formData={formData} />
      default:
        return null
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#F5F5F5]">
      
      <main className="container mx-auto flex-1 px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-[#141414]">
                {currentStep === steps.length - 1 ? "Your Career Recommendations" : "Create Your Profile"}
              </h1>
              <div className="text-sm text-[#141414]/60">
                Step {currentStep + 1} of {steps.length}
              </div>
            </div>
            {currentStep < steps.length - 1 && (
              <div className="mt-4 overflow-hidden rounded-full bg-[#DDDDFB]">
                <div
                  className="h-2 rounded-full bg-[#1418EB] transition-all duration-300"
                  style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                ></div>
              </div>
            )}
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`flex items-center rounded-full px-3 py-1 text-sm ${
                  index === currentStep
                    ? "bg-[#1418EB] text-white"
                    : index < currentStep
                      ? "bg-[#DDDDFB] text-[#141414]"
                      : "bg-[#F5F5F5] text-[#141414]/40"
                }`}
              >
                {index < currentStep && <CheckCircle className="mr-1 h-3 w-3" />}
                {step.title}
              </div>
            ))}
          </div>

          <Card className="border-[#DDDDFB] shadow-sm">
            <CardHeader>
              <CardTitle>{steps[currentStep].title}</CardTitle>
              <CardDescription>
                {currentStep === steps.length - 1
                  ? "Based on your profile and assessment, here are your personalized career recommendations."
                  : `Please provide your ${steps[currentStep].title.toLowerCase()} information.`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isProcessing ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="mb-4 h-16 w-16 animate-pulse rounded-full bg-[#00EDBE]"></div>
                  <h3 className="mb-2 text-xl font-semibold text-[#141414]">Processing Your Data</h3>
                  <p className="text-center text-[#141414]/70">
                    Our AI is analyzing your profile and assessment results to generate personalized career
                    recommendations.
                  </p>
                </div>
              ) : (
                renderStep()
              )}
            </CardContent>
          </Card>

          {currentStep > 0 && currentStep < steps.length - 1 && (
            <div className="mt-6 flex justify-between">
              <Button variant="outline" onClick={handleBack} className="border-[#DDDDFB] text-[#141414]">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

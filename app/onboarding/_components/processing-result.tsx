"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Download, ExternalLink } from "lucide-react"
import Link from "next/link"

interface ProcessingResultsProps {
  formData: any
}

export function ProcessingResults({ formData }: ProcessingResultsProps) {
  // This would normally come from the Gemini API
  const careerRecommendations = [
    {
      title: "Software Developer",
      match: 95,
      description:
        "Software developers design, build, and maintain computer programs. They work in a variety of industries, including technology, finance, healthcare, and entertainment.",
      skills: {
        have: ["Problem Solving", "JavaScript", "HTML/CSS"],
        need: ["React", "Node.js", "Database Management"],
      },
      education: ["Bachelor's in Computer Science or related field", "Coding Bootcamp"],
      outlook: "Excellent job growth expected over the next decade with high demand for skilled developers.",
      resources: [
        { name: "React Documentation", url: "https://reactjs.org/docs/getting-started.html" },
        { name: "Node.js Tutorials", url: "https://nodejs.org/en/learn" },
        { name: "MongoDB University", url: "https://university.mongodb.com/" },
      ],
    },
    {
      title: "UX/UI Designer",
      match: 88,
      description:
        "UX/UI designers create user-friendly interfaces for websites, apps, and other digital products. They focus on creating intuitive, accessible, and enjoyable user experiences.",
      skills: {
        have: ["Creativity", "HTML/CSS", "Communication"],
        need: ["Figma", "User Research", "Prototyping"],
      },
      education: ["Bachelor's in Design or related field", "UX/UI Design Bootcamp"],
      outlook: "Growing demand as companies increasingly prioritize user experience in their digital products.",
      resources: [
        { name: "Figma Tutorials", url: "https://www.figma.com/resources/learn-design/" },
        { name: "Nielsen Norman Group", url: "https://www.nngroup.com/articles/" },
        { name: "Interaction Design Foundation", url: "https://www.interaction-design.org/" },
      ],
    },
    {
      title: "Data Analyst",
      match: 82,
      description:
        "Data analysts collect, process, and analyze data to help organizations make better decisions. They work across industries including finance, healthcare, retail, and technology.",
      skills: {
        have: ["Problem Solving", "Critical Thinking", "Communication"],
        need: ["SQL", "Python", "Data Visualization"],
      },
      education: ["Bachelor's in Statistics, Mathematics, Computer Science, or related field"],
      outlook: "Strong demand as organizations increasingly rely on data-driven decision making.",
      resources: [
        { name: "SQL Tutorial", url: "https://www.w3schools.com/sql/" },
        { name: "Python for Data Science", url: "https://www.datacamp.com/courses/intro-to-python-for-data-science" },
        { name: "Tableau Public", url: "https://public.tableau.com/en-us/s/" },
      ],
    },
  ]

  const skillGaps = [
    {
      skill: "React",
      importance: 90,
      resources: [
        { name: "React Documentation", url: "https://reactjs.org/docs/getting-started.html" },
        { name: "React Course on Codecademy", url: "https://www.codecademy.com/learn/react-101" },
      ],
    },
    {
      skill: "Node.js",
      importance: 85,
      resources: [
        { name: "Node.js Documentation", url: "https://nodejs.org/en/docs/" },
        { name: "Node.js Course on Udemy", url: "https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/" },
      ],
    },
    {
      skill: "SQL",
      importance: 80,
      resources: [
        { name: "SQL Tutorial", url: "https://www.w3schools.com/sql/" },
        { name: "SQL Course on Khan Academy", url: "https://www.khanacademy.org/computing/computer-programming/sql" },
      ],
    },
    {
      skill: "Figma",
      importance: 75,
      resources: [
        { name: "Figma Tutorials", url: "https://www.figma.com/resources/learn-design/" },
        { name: "Figma Course on YouTube", url: "https://www.youtube.com/watch?v=FTFaQWZBqQ8" },
      ],
    },
    {
      skill: "Python",
      importance: 70,
      resources: [
        { name: "Python Documentation", url: "https://docs.python.org/3/" },
        { name: "Python Course on Coursera", url: "https://www.coursera.org/learn/python" },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-[#1418EB]/10 p-4 border border-[#1418EB]/20">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#1418EB]"></div>
          <div>
            <h3 className="text-lg font-medium text-white">AI Analysis Complete</h3>
            <p className="text-sm text-white/70">
              Based on your profile and assessment, we've generated personalized career recommendations.
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="careers" className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-black/50">
          <TabsTrigger value="careers" className="data-[state=active]:bg-[#1418EB] text-white">Career Recommendations</TabsTrigger>
          <TabsTrigger value="skills" className="data-[state=active]:bg-[#1418EB] text-white">Skill Development</TabsTrigger>
        </TabsList>
        <TabsContent value="careers">
          {careerRecommendations.map((career, index) => (
            <Card key={index} className="overflow-hidden border-[#DDDDFB]/20 bg-black/50 backdrop-blur-md mb-4">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-white">Recommended Education</h4>
                    <ul className="list-inside list-disc space-y-1 text-sm text-white/70">
                      {career.education.map((edu, eduIndex) => (
                        <li key={eduIndex}>{edu}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-white">Job Outlook</h4>
                    <p className="text-sm text-white/70">{career.outlook}</p>
                  </div>
                  <div>
                    <h4 className="mb-2 text-sm font-medium text-white">Learning Resources</h4>
                    <ul className="space-y-1">
                      {career.resources.map((resource, resourceIndex) => (
                        <li key={resourceIndex}>
                          <Link
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-sm text-[#00EDBE] hover:text-[#00EDBE]/80"
                          >
                            {resource.name}
                            <ExternalLink className="ml-1 h-3 w-3" />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <div className="flex justify-center">
            <Button className="bg-[#1418EB] text-white hover:bg-[#1418EB]/80">
              <Download className="mr-2 h-4 w-4" /> Download Full Career Report
            </Button>
          </div>
        </TabsContent>
        <TabsContent value="skills">
          <Card className="border-[#DDDDFB]/20 bg-black/50 backdrop-blur-md">
            <CardHeader>
              <CardTitle className="text-white">Skills Gap Analysis</CardTitle>
              <CardDescription className="text-white/70">
                Based on your profile and career interests, we've identified key skills for you to develop.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {skillGaps.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-white">{skill.skill}</h4>
                      <span className="text-sm text-white/60">Importance: {skill.importance}%</span>
                    </div>
                    <Progress value={skill.importance} className="h-2" />
                    <div className="rounded-lg bg-black/50 border border-[#DDDDFB]/20 p-3">
                      <h5 className="mb-2 text-sm font-medium text-white">Learning Resources</h5>
                      <ul className="space-y-1">
                        {skill.resources.map((resource, resourceIndex) => (
                          <li key={resourceIndex}>
                            <Link
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center text-sm text-[#00EDBE] hover:text-[#00EDBE]/80"
                            >
                              {resource.name}
                              <ExternalLink className="ml-1 h-3 w-3" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <div className="flex justify-center mt-6">
            <Button className="bg-[#1418EB] text-white hover:bg-[#1418EB]/80">
              <Download className="mr-2 h-4 w-4" /> Download Personalized Learning Plan
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      <div className="rounded-lg border border-[#DDDDFB]/20 bg-black/50 backdrop-blur-md p-4">
        <h3 className="mb-2 text-lg font-medium text-white">What's Next?</h3>
        <p className="mb-4 text-white/70">Continue your career journey with these recommended next steps:</p>
        <div className="grid gap-4 sm:grid-cols-2">
          <Button variant="outline" className="border-[#DDDDFB]/20 text-white hover:bg-[#DDDDFB]/10">
            Explore Job Listings
          </Button>
          <Button variant="outline" className="border-[#DDDDFB]/20 text-white hover:bg-[#DDDDFB]/10">
            Connect with Mentors
          </Button>
          <Button variant="outline" className="border-[#DDDDFB]/20 text-white hover:bg-[#DDDDFB]/10">
            Browse Learning Resources
          </Button>
          <Button variant="outline" className="border-[#DDDDFB]/20 text-white hover:bg-[#DDDDFB]/10">
            Schedule Career Counseling
          </Button>
        </div>
      </div>
    </div>
  )
}

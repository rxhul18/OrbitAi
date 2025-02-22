"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BotIcon, CornerDownLeft, FileIcon, FileText, FileTextIcon, FileType, Link2Icon, NotebookPen, TableIcon, TableProperties } from 'lucide-react'
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// Define the type for our button data
type FilterButton = {
  id: string
  label: string
  icon: React.ReactNode
}

const filterButtons: FilterButton[] = [
  {
    id: "notes",
    label: "Notes",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    id: "text",
    label: "Text",
    icon: <NotebookPen className="h-4 w-4" />,
  },
  {
    id: "pdf",
    label: "Pdf",
    icon: <FileType className="h-4 w-4" />,
  },
  {
    id: "csv",
    label: "Csv",
    icon: <TableProperties className="h-4 w-4" />,
  },
  {
    id: "links",
    label: "Links",
    icon: <Link2Icon className="h-4 w-4" />,
  },
]

// Add these dummy data arrays after the filterButtons array
const notesData = [
  { id: 1, title: "Meeting Notes", content: "Discussed project timeline and goals." },
  { id: 2, title: "Ideas for Blog", content: "List of potential topics for next month." },
  { id: 3, title: "Team Brainstorm", content: "Ideas for the upcoming marketing campaign." },
  { id: 4, title: "Conference Takeaways", content: "Key points from the industry conference." },
  { id: 5, title: "Weekly Review", content: "Summary of this week's progress and next steps." },
];

const textData = [
  { id: 1, title: "Chapter 1.txt", content: "It was the best of times, it was the worst of times..." },
  { id: 2, title: "Grocery List.txt", content: "Milk, eggs, bread, cheese" },
  { id: 3, title: "To-Do List.txt", content: "Finish report, call client, buy groceries" },
  { id: 4, title: "Journal Entry.txt", content: "Today was a productive day. I completed all my tasks." },
  { id: 5, title: "Recipe.txt", content: "Ingredients: 2 cups flour, 1 cup sugar, 1/2 cup butter" },
];

const pdfData = [
  { id: 1, title: "Annual Report.pdf", pages: 24 },
  { id: 2, title: "User Manual.pdf", pages: 56 },
  { id: 3, title: "Research Paper.pdf", pages: 12 },
  { id: 4, title: "Financial Statement.pdf", pages: 30 },
  { id: 5, title: "Project Proposal.pdf", pages: 18 },
];

const csvData = [
  { id: 1, title: "Sales Data.csv", rows: 1000, columns: 5 },
  { id: 2, title: "Customer List.csv", rows: 500, columns: 8 },
  { id: 3, title: "Inventory Data.csv", rows: 1200, columns: 6 },
  { id: 4, title: "Employee Records.csv", rows: 300, columns: 10 },
  { id: 5, title: "Survey Results.csv", rows: 800, columns: 7 },
];

const linksData = [
  { id: 1, title: "Awesome Article", url: "https://example.com/article" },
  { id: 2, title: "Useful Tool", url: "https://example.com/tool" },
  { id: 3, title: "Tech Blog", url: "https://example.com/tech-blog" },
  { id: 4, title: "Design Inspiration", url: "https://example.com/design" },
  { id: 5, title: "Learning Resources", url: "https://example.com/learn" },
];

export default function Page() {
  const [activeFilter, setActiveFilter] = useState("notes")
  return (
    <div className="min-h-full p-4 md:p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Search bar */}
        <div className="w-full max-w-3xl mx-auto mt-8">
          <div className="relative flex items-center">
            <div className="absolute left-3 flex items-center pointer-events-none">
              <BotIcon className="h-7 w-7 text-gray-400" />
            </div>
            <Input type="text" placeholder="Search in your brain..."
              className="pl-14 text-xsm md:text-xl pr-32 h-12 bg-gray-50/80 border-0 ring-1 ring-gray-200/70 placeholder:text-gray-400 rounded-2xl shadow-sm"
            />
            <div className="absolute right-2">
              <Button className="bg-[#6466f1] border border-[#484ac1] hover:bg-[#595ce6] text-white rounded-xl px-4 h-9">
                Ask Brain
                <CornerDownLeft className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2">
          {filterButtons.map((button) => (
            <Button
              key={button.id}
              variant="outline"
              size="sm"
              className={`gap-2 rounded-lg ${activeFilter === button.id
                  ? "bg-slate-50 hover:bg-muted shadow-sm md:shadow-md md:scale-105"
                  : "hover:bg-muted/50"
                }`}
              onClick={() => setActiveFilter(button.id)}
            >
              {button.icon}
              {button.label}
            </Button>
          ))}
        </div>

        {/* Content area */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {activeFilter === "notes" &&
            notesData.map((note) => (
              <Card key={note.id} className="overflow-hidden">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileTextIcon className="h-5 w-5 text-blue-500" />
                    {note.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-3">{note.content}</p>
                </CardContent>
              </Card>
            ))}
          {activeFilter === "text" &&
            textData.map((text) => (
              <Card key={text.id} className="overflow-hidden">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileIcon className="h-5 w-5 text-green-500" />
                    {text.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-3">{text.content}</p>
                </CardContent>
              </Card>
            ))}
          {activeFilter === "pdf" &&
            pdfData.map((pdf) => (
              <Card key={pdf.id} className="overflow-hidden">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileTextIcon className="h-5 w-5 text-red-500" />
                    {pdf.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground">{pdf.pages} pages</p>
                </CardContent>
              </Card>
            ))}
          {activeFilter === "csv" &&
            csvData.map((csv) => (
              <Card key={csv.id} className="overflow-hidden">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <TableIcon className="h-5 w-5 text-yellow-500" />
                    {csv.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-sm text-muted-foreground">
                    {csv.rows} rows, {csv.columns} columns
                  </p>
                </CardContent>
              </Card>
            ))}
          {activeFilter === "links" &&
            linksData.map((link) => (
              <Card key={link.id} className="overflow-hidden">
                <CardHeader className="p-4">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Link2Icon className="h-5 w-5 text-purple-500" />
                    {link.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 hover:underline truncate block"
                  >
                    {link.url}
                  </a>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>
    </div>
  )
}
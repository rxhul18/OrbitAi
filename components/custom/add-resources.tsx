/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/context/auth.context"
import { CirclePlus, Pencil, SaveAll } from "lucide-react"
import { useEffect, useState } from "react"
import { ResourceType } from "./res-type"
import { Textarea } from "../ui/textarea"
import { SelectSpace } from "./select-space";
import { CreateSpace } from "./create-space";

export function AddResources() {

    const { user } = useAuth();
    const [open, setOpen] = useState(false);
    const [ph, setPh] = useState<string | null>(null);
    const [title, setTitle] = useState<string | null>(null);
    const [space, setSpace] = useState<string | null>(null);
    const [content, setContent] = useState<string | null>(null);
    const [contentType, setContentType] = useState<string | null>(null)

    useEffect(() => {
        if (contentType === "pdf") {
            setPh("Provide your pdf url.");
        } else if (contentType === "csv") {
            setPh("Provide your csv url.");
        } else if (contentType === "txt") {
            setPh("Enter your text.");
        } else if (contentType === "html") {
            setPh("Provide your webpage url.");
        }
    }, [contentType]);


    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "q" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    return (
        <Dialog>
            <DialogTrigger>
                <Button className="bg-[#6466f1] border border-[#484ac1] hover:bg-[#595ce6] text-white h-8" variant={"default"}>
                    <Pencil className="h-5 w-5" /> Add Resource
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-primary-foreground">
                <DialogHeader>
                    <DialogTitle>Add your resources!</DialogTitle>
                    <DialogDescription>
                        Give me anything, I will remember for you.
                    </DialogDescription>
                </DialogHeader>
                <Label htmlFor="title">Title (Optional)</Label>
                <Input
                    id="title"
                    placeholder="Enter the title."
                    className="border border-muted rounded-xl"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setTitle(e.target.value)
                    }
                />
                <Label htmlFor="space">Select a space *</Label>
                <div className="flex gap-3 justify-between">
                    <SelectSpace />
                    <CreateSpace />
                </div>
                <Label htmlFor="resource">Select content type *</Label>
                <ResourceType onRtypeSelect={(rtype) => setContentType(rtype)} />
                <Label htmlFor="message">Your content *</Label>
                <Textarea
                    placeholder={ph || "Enter your content."}
                    id="message"
                    className="border border-muted rounded-xl"
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setContent(e.target.value)
                    }
                />
                <DialogFooter>
                    <Button type="button" onClick={() => (console.log({ title, space, content, contentType }))}>
                        <SaveAll className="size-5 mr-2" />
                        Save
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

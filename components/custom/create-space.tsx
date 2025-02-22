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
import { Textarea } from "../ui/textarea"
import { useState } from "react"
import { PencilLine } from "lucide-react"

export function CreateSpace() {
    
    const [open,setOpen] = useState(false);

    const handleSubmit = () => {
        setOpen((open) => !open);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="bg-[#6466f1] border border-[#484ac1] hover:bg-[#595ce6]"><PencilLine className="w-5 h-5"/> Create new Space</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create new space</DialogTitle>
                    <DialogDescription>
                        Create a new space to organize your resources.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {/* <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input id="name" value="Pedro Duarte" className="col-span-3" />
                    </div> */}
                    <div className="flex flex-col items-start gap-2">
                        <Label htmlFor="name" className="text-left">Name *</Label>
                        <Input id="name" placeholder="Enter the name" className="col-span-3" />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <Label htmlFor="description" className="text-left">Description</Label>
                        <Textarea
                            placeholder={ "Enter your content."}
                            id="description"
                            className="border border-muted rounded-xl"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSubmit}>Create</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

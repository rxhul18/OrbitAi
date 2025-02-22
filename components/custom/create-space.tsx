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
import { useAuth } from "@/context/auth.context"
import { storeSpace } from "@/func/func"
import { toast } from "sonner"

interface CreateSpaceProps {
    onSpaceCreated?: (spaceName: string) => void;
}

export function CreateSpace({ onSpaceCreated }: CreateSpaceProps) {
    const {user} = useAuth();
    const [title, setTitle] = useState<string | null>(null);
    const [desc, setDesc] = useState<string | null>(null);
    const [open,setOpen] = useState(false);

    const handleSubmit = async () => {
        if(user && title){
            const uid = user?.id;
            await storeSpace(uid, title, desc!)
            toast.success("Your space is created!")
            if (onSpaceCreated) {
                onSpaceCreated(title);
            }
            setOpen(false);
        }
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
                    <div className="flex flex-col items-start gap-2">
                        <Label htmlFor="name" className="text-left">Name *</Label>
                        <Input id="name" placeholder="Enter the name" className="col-span-3" onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setTitle(e.target.value)
                    } />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <Label htmlFor="description" className="text-left">Description</Label>
                        <Textarea
                            placeholder={ "Enter your content."}
                            id="description"
                            className="border border-muted rounded-xl"
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                                setDesc(e.target.value)
                            }
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

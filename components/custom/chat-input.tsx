"use client";

import { Button } from "@/components/ui/button";
import { ArrowUp, Mic, Plus } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { SearchInSpace } from "./sidebar/serach-space";

export default function ChatInput() {
  return (
    <div className="w-full pb-4 flex items-center justify-center">
      <div className="relative w-full max-w-5xl bg-[#1c1c1c] rounded-md">
        <Textarea
          placeholder="Was mach ich in Berlin wenn es regnet?"
          className="w-full bg-[#1c1c1c] border-none text-white resize-none placeholder:text-gray-400 p-3  rounded-2xl focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        <div className="w-full flex justify-between p-3">
          <div className="flex gap-3 items-center">
            <Button
              size="icon"
              className="min-h-10 min-w-10 rounded-full bg-[#2c2c2c] hover:bg-[#3c3c3c] border-none"
            >
              <Plus className="h-8 w-8 text-gray-400" />
            </Button>
            <SearchInSpace />
          </div>
          <div className="gap-2 flex">
            <Button
              size="icon"
              className="h-10 w-10 rounded-full bg-[#2c2c2c] hover:bg-[#3c3c3c] border-none"
            >
              <Mic className="h-8 w-8 text-gray-400" />
            </Button>
            <Button
              size="icon"
              className="h-10 w-10 rounded-full bg-[#2c2c2c] hover:bg-[#3c3c3c] border-none"
            >
              <ArrowUp className="h-8 w-8 text-gray-400" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

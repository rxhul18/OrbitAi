
import ChatInput from "@/components/custom/chat-input"
import DataViwer from "@/components/custom/resources"

export default function Page() {
  return (
    <div className="min-h-full p-4 md:p-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <ChatInput />
        {/* Filter tabs */}
        <DataViwer />
      </div>
    </div>
  )
}
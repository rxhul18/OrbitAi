
import ChatInput from "@/components/custom/chat-input"
import DataViwer from "@/components/custom/resources"

export default function Page() {
  return (
    <div className="h-fit p-4 md:p-6">
      <div className="mx-auto max-w-5xl space-y-6 mt-48">
        <h2 className="w-full text-center text-6xl py-16 font-serif">How can i help you??</h2>
        <ChatInput />
        {/* Filter tabs */}
        <DataViwer />
      </div>
    </div>
  )
}
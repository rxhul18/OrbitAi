
import Image from "next/image"
import storeNotes from "./images/store-all-notes-c.webp"
import sementicImage from "./images/semantic-search.webp"
import imageTagging from "./images/image-tagging-c.webp"
import reminderImage from "./images/reminders-c.webp"
import brainAction from './images/brain-actions.webp'
import chormeExtension from './images/extension-c.webp'
import { Badge } from "@/components/ui/badge"
import ClickSpark from "@/components/custom/click-sparke"
import Footer from "@/components/custom/footer"
import Navbar from "@/components/custom/navbar"
import { BentoDemo } from "@/components/custom/bento"
import { FeatureList } from "@/components/custom/feature-notifiaction"
import Hero from "@/components/custom/hero"

const content = [{
  title: "Store Every Thought",
  description: "Take notes your way—text, links, images, and more. Brain keeps it all, easy to recall anytime.",
  image: storeNotes,
  commingSoon: false
}, {
  title: "Sementic Search",
  description: "Brain works like your brain and remember things like you remember them.",
  image: sementicImage,
  commingSoon: false
}, {
  title: "Smart auto tagging",
  description: "Brain understand images. Any images you save are automatically remembered, requiring little to no context to make sense of it.",
  image: imageTagging,
  commingSoon: true
}, {
  title: "Create Reminders",
  description: "We tend to save things and forget. Auto-create reminders on Brain so you don't.",
  image: reminderImage,
  commingSoon: true
}, {
  title: "Brain Actions",
  description: "Need to update your notes on the fly? Just tell Brain and it will do them for you.",
  image: brainAction,
  commingSoon: true
}
]

export default function Home() {
  return (
    <div className="min-h-screen relative bg-background">
      <Navbar />
      <main className="border border-dashed border-t-0 bg-background">
        <Hero />
        <div className="w-full flex justify-center border border-dashed border-b-0 bg-background relative">
          <BentoDemo />
        </div>
        <div className="w-full flex justify-center border border-dashed border-y-0 bg-background relative overflow-hidden">
          <FeatureList />
        </div>
        <section className="border border-dashed border-b-0 relative">
          <div className=" border border-dashed border-y-0 container items-center mx-auto px-4 text-center pt-16 md:py-24 md:pb-10 pb-16 bg-gradient-to-b from-gray-50 dark:from-background from-90% to-[#cdd7e2] dark:to-background to-1%">
            <h2 className="text-4xl md:text-[2.7rem] font-serif mb-3 text-[#334155] dark:text-white font-extralight tracking-tight">Works like your brain. Does more.</h2>
            {content.map((item, index) => (
              <>
                <div className="flex relative flex-col md:flex-row-reverse select-none rounded-3xl bg-black dark:bg-primary-foreground dark:border dark:shadow-xl dark lg:max-w-[70%] text-white mx-auto my-16" key={index}>
                  <div className="min-w-[60%] relative flex items-center justify-center">
                    <Image
                      src={item.image}
                      alt="Sample Image"
                      className="w-full h-full object-cover rounded-t-3xl md:rounded-r-3xl"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t dark:bg-gradient-to-r from-black dark:from-primary-foreground from-1% to-transparent to-10% md:bg-none"></div>
                  </div>
                  <div className="w-auto px-10 py-10 md:py-16 text-start ">
                    <h2 className="font-serif text-xl font-thin mb-3">{item.title}</h2>
                    <p className="font-light text-white/90">{item.description}</p>
                    {item.commingSoon && <Badge className="absolute bottom-3 right-3 md:bottom-8 md:left-10 w-fit mt-3 text-black" variant={"secondary"}>Comming soon</Badge>}
                  </div>
                </div>
              </>
            ))}

            <h2 className="text-4xl md:text-[2.7rem] font-serif mb-3 text-[#334155] dark:text-white font-extralight tracking-tight">Works like your brain. Does more.</h2>

            <div className="flex relative flex-col md:flex-row-reverse select-none rounded-3xl bg-black lg:max-w-[70%] text-white mx-auto mt-16">
              <div className="min-w-[60%] relative flex items-center justify-center">
                <Image
                  src={chormeExtension}
                  alt="Sample Image"
                  className="w-full h-full object-cover rounded-t-3xl md:rounded-r-3xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black from-1% to-transparent to-10% md:bg-none"></div>
              </div>
              <div className="w-auto px-10 py-10 md:py-16 text-start ">
                <h2 className="font-serif text-xl font-thin mb-3">Chrome Extension</h2>
                <p className="font-light text-white/80">Come across something worth keeping? Save it instantly with the Brain Chrome extension. Simplify how you manage your online content with just one click.</p>
                <Badge className="absolute bottom-3 right-3 md:bottom-8 md:left-10 w-fit mt-3 text-black" variant={"secondary"}>Comming soon</Badge>
              </div>
            </div>
          </div>

          <ClickSpark />
        </section>
        <div className="w-full flex justify-center">
        </div>
        <Footer />
      </main>
    </div>
  )
}


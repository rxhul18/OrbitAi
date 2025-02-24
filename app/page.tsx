import Footer from "@/components/custom/footer";
import Navbar from "@/components/custom/navbar";
import { BentoDemo } from "@/components/custom/bento";
import { FeatureList } from "@/components/custom/feature-notifiaction";
import Hero from "@/components/custom/hero";

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
        <div className="w-full flex justify-center"></div>
        <Footer />
      </main>
    </div>
  );
}

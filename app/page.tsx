// app/page.tsx
import Navbar from "@/components/Navbar";
import Slide from "@/components/Slide";
import IntroScene from '@/components/IntroScene';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="h-screen snap-y snap-mandatory overflow-scroll scroll-smooth">
        <Slide title="Welcome to AC&DL" color="bg-white" animation="typewriter">
          <IntroScene />
        </Slide>
        {/* другие слайды */}
      </div>
    </>
  );
}

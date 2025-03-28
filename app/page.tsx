// app/page.tsx
import Navbar from "@/components/Navbar";
import SlideHome from "@/components/SlideHome";
import IntroScene from '@/components/IntroScene';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="h-screen snap-y snap-mandatory overflow-scroll scroll-smooth">
        <SlideHome title="Welcome to AC&DL" color="bg-white" animation="typewriter">
          <IntroScene />
        </SlideHome>
        {/* другие слайды */}
      </div>
    </>
  );
}

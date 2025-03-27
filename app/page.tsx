// app/page.tsx
import Navbar from "@/components/Navbar";
import Slide from "@/components/Slide";
import IntroScene from '@/components/IntroScene';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="h-screen snap-y snap-mandatory overflow-scroll scroll-smooth">
        <Slide title="Добро пожаловать в AC&DL" color="bg-white">
          <IntroScene />
        </Slide>
        {/* другие слайды */}
      </div>
    </>
  );
}

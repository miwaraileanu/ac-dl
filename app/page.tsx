// app/page.tsx
import Navbar from "@/components/Navbar";
import Slide from "@/components/Slide";
import ThreeScene from "@/components/ThreeScene";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="h-screen snap-y snap-mandatory overflow-scroll scroll-smooth">
        <Slide title="Welcome to AC&DL" color="bg-white" animation="typewriter" />
        <div className="snap-center h-screen">
          <ThreeScene />
        </div>
        <Slide title="Наши услуги" color="bg-gray-100" animation="slideUp" />
        <Slide title="Почему мы?" color="bg-white" animation="zoomIn" />
        <Slide title="Связаться с нами" color="bg-gray-100" animation="flipIn" />
      </div>
    </>
  );
}

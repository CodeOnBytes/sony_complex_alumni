import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import WhyJoin from "../components/sections/WhyJoin";
import Events from "../components/sections/Events";
import Programs from "../components/sections/Programs";
import Initiatives from "../components/sections/Initiatives";
import Testimonials from "../components/sections/Testimonials";
import CtaBanner from "../components/sections/CtaBanner";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <WhyJoin />
      <Events />
      <Programs />
      <Initiatives />
      <Testimonials />
      <CtaBanner />
    </>
  );
}

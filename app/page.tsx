import { Hero } from "@/components/hero";
import { Spine } from "@/components/spine";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Awards } from "@/components/awards";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";

export default function Home() {
  return (
    <main id="main">
      <Spine />
      <Hero />
      <About />
      <Experience />
      <Awards />
      <Projects />
      <Skills />
      <Contact />
    </main>
  );
}

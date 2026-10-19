import Nav from "./site/Nav";
import Hero from "./site/Hero";
import Disciplines from "./site/Disciplines";
import CommunityPoll from "./site/CommunityPoll";
import Heritage from "./site/Heritage";
import Gatherings from "./site/Gatherings";
import Comms from "./site/Comms";
import Principles from "./site/Principles";
import Students from "./site/Students";
import Faq from "./site/Faq";
import FinalCta from "./site/FinalCta";
import Footer from "./site/Footer";
import { JoinProvider } from "./site/JoinContext";
import Reveal from "./site/Reveal";

export default function App() {
  return (
    <JoinProvider>
      <div className="min-h-screen bg-lab font-sans text-graphite antialiased selection:bg-signal/40 selection:text-carbon">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-carbon focus:px-4 focus:py-2.5 focus:font-mono focus:text-[12px] focus:text-signal"
        >
          Skip to main content
        </a>

        <Nav />

        <main id="main">
          <Hero />
          <Disciplines />

          <CommunityPoll />

          <Heritage />
          <Gatherings />
          <Comms />
          <Principles />
          <Students />
          <Faq />
          <FinalCta />
        </main>

        <Footer />
      </div>
    </JoinProvider>
  );
}

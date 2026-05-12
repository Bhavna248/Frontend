import ContactForm from '../components/ContactForm'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import Navbar from '../components/Navbar'
import Services from '../components/Services'
import TechTabs from '../components/TechTabs'

export default function Landing() {
  return (
    <div className="min-h-svh antialiased bg-earth-cream text-earth-pine dark:bg-earth-pine dark:text-earth-cream">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10 opacity-[0.35] dark:opacity-[0.12]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
        }}
      />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <TechTabs />
        <ContactForm />
      </main>
      <Footer />
    </div>
  )
}

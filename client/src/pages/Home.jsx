import usePageMeta from '../hooks/usePageMeta'
import Hero from '../components/sections/Hero'
import FeaturedProjects from '../components/sections/FeaturedProjects'
import SelectedProjects from '../components/sections/SelectedProjects'
import AboutSummary from '../components/sections/AboutSummary'
import Technologies from '../components/sections/Technologies'
import Contact from '../components/sections/Contact'

export default function Home() {
  usePageMeta()
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <SelectedProjects />
      <AboutSummary />
      <Technologies />
      <Contact />
    </>
  )
}

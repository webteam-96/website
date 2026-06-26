import Hero from '../components/Hero'
import QuickLinks from '../components/QuickLinks'
import FeaturedProjects from '../components/FeaturedProjects'
import Counters from '../components/Counters'
import InfoRow from '../components/InfoRow'
import Dignitaries from '../components/Dignitaries'

export default function Home() {
  return (
    <>
      <Hero />
      <Counters />
      <QuickLinks />
      <section className="bg-mesh bg-canvas py-12">
        <div className="container-x">
          <FeaturedProjects />
        </div>
      </section>
      <InfoRow />
      <Dignitaries />
    </>
  )
}

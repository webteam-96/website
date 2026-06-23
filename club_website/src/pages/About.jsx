import Breadcrumb from '../components/Breadcrumb'
import Reveal from '../components/Reveal'
import SplitText from '../components/SplitText'
import TiltedCard from '../components/TiltedCard'

function SectionHeading({ children }) {
  return (
    <div className="mb-5">
      <SplitText
        as="h2"
        text={children}
        charDelay={22}
        className="font-heading text-xl font-extrabold uppercase tracking-wide text-navy md:text-2xl"
      />
      <Reveal variant="left" delay={150} className="mt-2 h-1 w-14 rounded-full bg-gold" />
    </div>
  )
}

export default function About() {
  return (
    <>
      <Breadcrumb
        eyebrow="About Us"
        title="Rotary Club of Thane Hills"
        trail={[
          { label: 'Home', href: '#/' },
          { label: 'About Us' },
        ]}
      />

      <div className="bg-white">
        <div className="container-x py-14 md:py-16">
          {/* ABOUT ROTARY CLUB OF THANE HILLS */}
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_360px]">
            <div>
              <SectionHeading>About Rotary Club of Thane Hills</SectionHeading>
              <div className="space-y-4 text-[15px] leading-relaxed text-muted">
                <Reveal as="p" variant="up">
                  Rotary Club of Thane Hills (RCTH) was chartered on May 20, 1991. The idea of this
                  club was sown around October 1990 when a group of like-minded professionals and
                  businessmen came together to form a new Rotary Club.
                </Reveal>
                <Reveal as="p" variant="up" delay={120}>
                  Over the years, RCTH has grown from strength to strength and today stands as one of
                  the leading clubs in the District and the Rotary world.
                </Reveal>
                <Reveal as="p" variant="up" delay={240}>
                  With over 100+ members and a legacy of impactful projects, we continue to serve the
                  community with passion, integrity and dedication.
                </Reveal>
              </div>
            </div>

            {/* Rotary logo card */}
            <TiltedCard className="flex items-center justify-center rounded-xl bg-[#FBF6EC] p-10">
              <img
                src="/images/logo/rcth-wordmark.png"
                alt="Rotary Club of Thane Hills"
                className="w-full max-w-[260px]"
              />
            </TiltedCard>
          </div>

          <hr className="my-12 border-gray-200" />

          {/* OUR JOURNEY */}
          <div>
            <SectionHeading>Our Journey</SectionHeading>
            <div className="space-y-4 text-[15px] leading-relaxed text-muted">
              <Reveal as="p" variant="up">
                The initial meetings of this group were held at Mr. Bhoomreddi&apos;s residence and
                after the initial work of 7 months, the club got its charter. RCTH started its journey
                under the able leadership of PP Late Vasant Zalani as the Club President and PP (Dr.)
                Suhas Kulkarni as the Club Secretary.
              </Reveal>
              <Reveal as="p" variant="up" delay={120}>
                In the last 30 years of its existence, RCTH has grown by leaps and bounds and has
                turned into a strong tree from a sapling sown 30 years back. Today, the club&apos;s
                strength has risen to 105 members and growing steadily with every passing year.
              </Reveal>
              <Reveal as="p" variant="up" delay={240}>
                Every year, RCTH has undertaken numerous projects for the community welfare. In 2000,
                RCTH founded a charitable Trust called Triumph Foundation and executes various social
                initiatives and community-based projects through this foundation.
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

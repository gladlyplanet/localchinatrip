import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "@/components/SiteChrome";
import { StructuredData } from "@/components/StructuredData";
import { absoluteUrl, breadcrumbSchema, createMetadata } from "@/lib/seo";

const path = "/guides/10-days-in-china";
const title = "10 Days in China: 3 Realistic First-Time Routes | Local China Trip";
const description = "Planning 10 days in China? Compare three realistic first-time routes for classic history, slower local culture or food and pandas—and see what each itinerary gives up.";

export const metadata: Metadata = createMetadata({ title, description, path });

const faqs = [
  {
    question: "Is 10 days enough for China?",
    answer: "Yes. Ten days is enough for a strong first trip if you choose a clear route and accept that China cannot be covered in one visit. Two or three main bases usually leave enough time for major sights, local neighbourhoods and realistic transfers.",
  },
  {
    question: "How many cities should I visit in China in 10 days?",
    answer: "Three main bases is a sensible maximum for many first-time visitors. Two bases create a slower trip with more day-trip and free-time options. Four cities can work for travelers who enjoy movement, but every extra stop reduces flexibility and adds another hotel change.",
  },
  {
    question: "Can I visit Beijing, Xi'an and Shanghai in 10 days?",
    answer: "Yes. A broad structure of four days in Beijing, two in Xi'an and four in Shanghai creates a classic first route. The exact balance depends on arrival and departure timing, and the two major intercity transfers still need to be treated as part of the itinerary.",
  },
  {
    question: "Should I add Chengdu to a 10-day China itinerary?",
    answer: "Chengdu can be a good choice when pandas, Sichuan food and teahouse culture are important to you. It also creates a longer cross-regional route, so compare rail and flight options door to door and decide what other destination or free time you are willing to give up.",
  },
  {
    question: "Is Beijing, Suzhou and Shanghai a good first China trip?",
    answer: "Yes, especially for travelers who want major Beijing history followed by a slower view of Jiangnan culture and modern Shanghai. Suzhou is not a substitute for Xi'an; it creates a different journey with gardens, crafts, neighbourhoods and fewer large regional transfers after reaching eastern China.",
  },
] as const;

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "10 Days in China: 3 Realistic Routes for First-Time Visitors",
  description,
  url: absoluteUrl(path),
  mainEntityOfPage: absoluteUrl(path),
  datePublished: "2026-09-21",
  dateModified: "2026-09-21",
  author: { "@type": "Organization", name: "Local China Trip", url: absoluteUrl("/about") },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

const routeComparisons = [
  {
    name: "Beijing + Xi'an + Shanghai",
    rows: [
      ["Main strength", "A classic historical arc from imperial Beijing to the ancient capital and modern Shanghai"],
      ["Pace", "Balanced to active"],
      ["History", "The strongest of these three routes"],
      ["Local culture", "Hutongs, Xi'an food and Shanghai neighbourhoods"],
      ["Food", "Northern, northwest and Shanghai flavours"],
      ["Nature / animals", "Not a central focus"],
      ["Major transfers", "Two"],
      ["Free time", "Moderate when arrival and departure days are protected"],
      ["Best for", "First-time visitors who put iconic history ahead of a slower pace"],
    ],
  },
  {
    name: "Beijing + Suzhou + Shanghai",
    rows: [
      ["Main strength", "Major history followed by gardens, crafts, Jiangnan life and modern Shanghai"],
      ["Pace", "The calmest of these three routes"],
      ["History", "Strong in Beijing, lighter afterward"],
      ["Local culture", "A central part of the Suzhou and Shanghai days"],
      ["Food", "Jiangnan and Shanghai food with room for unhurried meals"],
      ["Nature / animals", "Gardens and nearby water landscapes rather than wildlife"],
      ["Major transfers", "One large regional move, then a shorter eastern-China connection"],
      ["Free time", "The easiest route for adding neighbourhood and buffer time"],
      ["Best for", "Travelers who prefer depth, photography, crafts and local rhythm"],
    ],
  },
  {
    name: "Beijing + Chengdu + Shanghai",
    rows: [
      ["Main strength", "Three very different city identities, with pandas and Sichuan food in the middle"],
      ["Pace", "Balanced, with long regional movement"],
      ["History", "Concentrated mainly in Beijing"],
      ["Local culture", "Teahouses, markets, food and Chengdu social life"],
      ["Food", "The strongest food emphasis of these three routes"],
      ["Nature / animals", "Pandas are the clear focus"],
      ["Major transfers", "Two long cross-regional legs"],
      ["Free time", "Moderate if transport is chosen carefully"],
      ["Best for", "Travelers who care about pandas, food and contrasting city culture"],
    ],
  },
] as const;

const routeChoices = [
  {
    title: "Choose Beijing + Xi'an + Shanghai if...",
    points: ["The Terracotta Warriors are a priority", "Headline historical sights matter most", "You enjoy structured sightseeing", "A busier pace is acceptable"],
  },
  {
    title: "Choose Beijing + Suzhou + Shanghai if...",
    points: ["You prefer depth over checklist travel", "Local life and traditional culture matter", "You want fewer big transfers", "You enjoy gardens, crafts and neighbourhoods"],
  },
  {
    title: "Choose Beijing + Chengdu + Shanghai if...",
    points: ["Pandas are a priority", "Food is a major reason for traveling", "You want a less history-heavy middle section", "You enjoy city culture and relaxed social spaces"],
  },
] as const;

export default function TenDaysInChinaGuide() {
  return (
    <>
      <StructuredData data={[
        articleSchema,
        breadcrumbSchema([{ name: "Home", path: "/" }, { name: "10 Days in China", path }]),
        faqSchema,
      ]} />
      <Header />
      <main className="bg-cream pt-[124px] text-ink xl:pt-20">
        <article>
          <header className="paper-texture border-b hairline px-5 py-14 sm:px-8 lg:px-24 lg:py-20">
            <div className="mx-auto max-w-5xl">
              <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-mist">
                <Link href="/" className="hover:text-moss">Home</Link><span aria-hidden="true">/</span>
                <Link href="/travel-planning" className="hover:text-moss">Travel Planning</Link><span aria-hidden="true">/</span>
                <span>10 Days in China</span>
              </nav>
              <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-gold">First-trip route decisions</p>
              <p className="mt-3 text-sm text-mist">Last reviewed: September 2026</p>
              <h1 className="safe-wrap mt-5 max-w-5xl font-serif text-4xl font-semibold leading-[1.08] sm:text-6xl lg:text-7xl">10 Days in China: 3 Realistic Routes for First-Time Visitors</h1>
              <p className="safe-wrap mt-7 max-w-3xl text-lg leading-8 text-mist sm:text-xl">Three routes can all be sensible and still create completely different trips. The useful question is not which one wins, but which trade-offs match you.</p>

              <section aria-labelledby="quick-answer" className="mt-10 rounded-lg border border-gold/40 bg-white p-6 shadow-card sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Quick answer</p>
                <h2 id="quick-answer" className="safe-wrap mt-3 font-serif text-2xl font-semibold sm:text-3xl">Ten days is enough for a strong first trip—not for all of China</h2>
                <p className="safe-wrap mt-5 text-lg leading-8">Ten days is enough for a strong first trip to China, but it is still not enough to see everything. For most first-time visitors, a sensible maximum is three main bases. Four cities can work, but each additional stop means another hotel change, another transfer and less time to actually experience the place.</p>
                <p className="safe-wrap mt-4 leading-7 text-mist">Instead of asking “What is the best 10-day China itinerary?”, it is more useful to ask what you want the trip to feel like.</p>
                <ul className="mt-5 space-y-3 leading-7 text-mist">
                  <li className="safe-wrap"><strong className="text-ink">Classic history:</strong> Beijing + Xi&apos;an + Shanghai</li>
                  <li className="safe-wrap"><strong className="text-ink">Slower and more local:</strong> Beijing + Suzhou + Shanghai</li>
                  <li className="safe-wrap"><strong className="text-ink">Food and pandas:</strong> Beijing + Chengdu + Shanghai</li>
                </ul>
                <p className="safe-wrap mt-5 border-s-2 border-gold ps-4 font-semibold leading-7 text-moss">All three can make sense. They simply prioritize different parts of China.</p>
              </section>
            </div>
          </header>

          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-24">
            <section aria-labelledby="real-days">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Start with the calendar</p>
              <h2 id="real-days" className="safe-wrap mt-4 font-serif text-3xl font-semibold leading-tight sm:text-5xl">First, count real travel days</h2>
              <p className="safe-wrap mt-6 text-lg leading-8 text-mist">Ten calendar days may include an international arrival, an international departure, jet lag, intercity transfers and several hotel changes. That does not mean the trip is too short; it means ten days should not be treated as ten identical sightseeing blocks.</p>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">A four-hour train or a two-hour flight is not the full cost of changing cities. The journey begins when you leave the hotel and includes reaching the station or airport, security, waiting, boarding, arrival, luggage and the transfer to a new hotel.</p>
              <p className="safe-wrap mt-5 border-s-2 border-gold ps-5 text-lg font-semibold leading-8">Count door-to-door travel, not timetable travel.</p>
            </section>

            <section aria-labelledby="how-many" className="mt-20">
              <h2 id="how-many" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">How many cities fit comfortably into 10 days?</h2>
              <div className="mt-9 divide-y border-y hairline">
                <div className="grid gap-4 py-7 md:grid-cols-[170px_1fr]"><h3 className="font-serif text-2xl font-semibold">2 main bases</h3><p className="safe-wrap leading-7 text-mist">A relaxed structure for slow travel, families, older parents, deeper neighbourhood exploration and day trips. It gives jet lag and weather less power over the whole itinerary.</p></div>
                <div className="grid gap-4 py-7 md:grid-cols-[170px_1fr]"><h3 className="font-serif text-2xl font-semibold">3 main bases</h3><p className="safe-wrap leading-7 text-mist">The most useful balance for many first-time visitors: major history, modern city life and one additional interest such as Xi&apos;an, Suzhou or Chengdu.</p></div>
                <div className="grid gap-4 py-7 md:grid-cols-[170px_1fr]"><h3 className="font-serif text-2xl font-semibold">4 main bases</h3><p className="safe-wrap leading-7 text-mist">Possible, but free time, slow mornings, flexibility, recovery and neighbourhood time begin to shrink. The fourth city needs a clear purpose.</p></div>
                <div className="grid gap-4 py-7 md:grid-cols-[170px_1fr]"><h3 className="font-serif text-2xl font-semibold">5+ cities</h3><p className="safe-wrap leading-7 text-mist">Possible on paper, but it usually turns the trip into a sequence of arrivals and departures. Travelers who genuinely enjoy fast movement may still choose it knowingly.</p></div>
              </div>
            </section>

            <section aria-labelledby="route-one" className="mt-20 border-t hairline pt-14">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Route 1 · Classic history</p>
              <h2 id="route-one" className="safe-wrap mt-4 font-serif text-3xl font-semibold leading-tight sm:text-5xl">Beijing + Xi&apos;an + Shanghai — the classic first trip</h2>
              <p className="safe-wrap mt-6 text-lg leading-8 text-mist">A broad shape of Beijing for four days, Xi&apos;an for two and Shanghai for four creates a strong historical sweep without pretending every day should be full. Beijing carries the Great Wall, imperial history, the Forbidden City and hutong neighbourhoods. Xi&apos;an adds the Terracotta Warriors, ancient-capital context, food and the city-wall area. Shanghai brings the Bund, neighbourhood life, modern China and room for a nearby excursion or free day.</p>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">The advantage is range: the route connects several of the places first-time visitors most often care about. The trade-off is two major intercity transfers, three hotels and a faster rhythm than a two-city journey. It suits travelers for whom iconic sights matter more than slow travel.</p>
              <p className="safe-wrap mt-5 leading-7 text-mist">Two days in Xi&apos;an describes the role of the stop, not a promise that every arrival pattern works the same way. A late arrival or early onward departure can make it feel like one usable day. If the Terracotta Warriors are central to the trip, protect that day before adding optional city sights.</p>
            </section>

            <section aria-labelledby="route-two" className="mt-20 border-t hairline pt-14">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Route 2 · Local culture</p>
              <h2 id="route-two" className="safe-wrap mt-4 font-serif text-3xl font-semibold leading-tight sm:text-5xl">Beijing + Suzhou + Shanghai — slower, more local and easier to breathe</h2>
              <p className="safe-wrap mt-6 text-lg leading-8 text-mist">Think of Beijing for four days, Suzhou for two or three, and Shanghai for three or four. Beijing provides the national historical landmarks. Suzhou changes the scale through gardens, traditional culture, crafts and Jiangnan life. Shanghai closes the route with modern China, neighbourhoods and flexible city time.</p>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">Suzhou is not a replacement for Xi&apos;an. It creates a different trip. Once the route reaches eastern China, Suzhou and Shanghai are relatively concentrated, reducing the need for another large cross-regional move. A ten-day version can add buffer and independent time in any of the three places instead of filling every available day.</p>
              <p className="safe-wrap mt-5 leading-7 text-mist">This route suits travelers interested in local life, gardens, traditional crafts, photography and a slower rhythm. See the existing <Link href="/travel-planning/china-culture-7" className="font-semibold text-moss underline decoration-moss/40 underline-offset-4">Beijing–Suzhou–Shanghai cultural journey</Link> as a starting structure, not a fixed ten-day program.</p>
            </section>

            <section aria-labelledby="route-three" className="mt-20 border-t hairline pt-14">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Route 3 · Food and pandas</p>
              <h2 id="route-three" className="safe-wrap mt-4 font-serif text-3xl font-semibold leading-tight sm:text-5xl">Beijing + Chengdu + Shanghai — history, food and pandas</h2>
              <p className="safe-wrap mt-6 text-lg leading-8 text-mist">A broad structure of three or four days in Beijing, three in Chengdu and three or four in Shanghai creates three cities with very different identities. Beijing holds the major historical landmarks. Chengdu shifts the trip toward pandas, Sichuan food, tea culture and a more relaxed social rhythm. Shanghai brings modern urban China, flexible city days and a practical place to finish many international routes.</p>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">The variety is the main strength. The trade-off is distance: Beijing–Chengdu–Shanghai is a broad cross-regional route. Depending on the date and route, flying may make more sense for one of the longer legs. Compare the full door-to-door journey rather than assuming rail or air is always better.</p>
              <p className="safe-wrap mt-5 leading-7 text-mist">Chengdu earns its place most clearly when your interest extends beyond one panda visit to food, markets, teahouses and the city&apos;s everyday social culture. If the middle stop is there for only one attraction, compare that experience with the time and energy the regional move requires.</p>
            </section>
          </div>

          <section className="bg-ink px-5 py-16 text-cream sm:px-8 lg:px-24 lg:py-20">
            <div className="mx-auto max-w-5xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Same length, different priorities</p>
              <h2 className="safe-wrap mt-4 font-serif text-3xl font-semibold leading-tight sm:text-5xl">Three routes, three different trips</h2>
              <p className="safe-wrap mt-5 max-w-4xl text-lg leading-8 text-cream/75">The comparison uses the same dimensions for every route. It is not a scorecard and there is no winner.</p>
              <div className="mt-10 grid items-start gap-6 lg:grid-cols-3">
                {routeComparisons.map(({ name, rows }) => (
                  <section key={name} className="min-w-0 rounded-lg border border-white/15 bg-charcoal p-6">
                    <h3 className="safe-wrap font-serif text-2xl font-semibold">{name}</h3>
                    <dl className="mt-6 divide-y divide-white/10 border-t border-white/10">
                      {rows.map(([term, value]) => <div key={term} className="py-4"><dt className="text-xs font-semibold uppercase tracking-[0.12em] text-gold">{term}</dt><dd className="safe-wrap mt-2 text-sm leading-6 text-cream/75">{value}</dd></div>)}
                    </dl>
                  </section>
                ))}
              </div>
            </div>
          </section>

          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-24">
            <section aria-labelledby="route-chooser">
              <h2 id="route-chooser" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">Which 10-day China route fits you?</h2>
              <div className="mt-9 grid gap-6 lg:grid-cols-3">
                {routeChoices.map(({ title: choiceTitle, points }) => <section key={choiceTitle} className="min-w-0 rounded-lg border bg-white p-6 hairline"><h3 className="safe-wrap font-serif text-2xl font-semibold">{choiceTitle}</h3><ul className="mt-5 space-y-3 leading-7 text-mist">{points.map(point=><li key={point} className="safe-wrap flex gap-3"><span className="text-gold" aria-hidden="true">•</span><span>{point}</span></li>)}</ul></section>)}
              </div>
            </section>

            <section aria-labelledby="two-cities" className="mt-20 rounded-lg bg-bone p-7 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">A slower alternative</p>
              <h2 id="two-cities" className="safe-wrap mt-4 font-serif text-3xl font-semibold leading-tight sm:text-5xl">The option people forget: only two cities</h2>
              <p className="safe-wrap mt-6 text-lg leading-8 text-mist">Ten days can work very well as Beijing for five days and Shanghai for five, with one or two day trips chosen around your interests. This is not “wasting” ten days. It creates more room for jet lag, local food, photography, repeat visits to a favourite neighbourhood and changes caused by weather or energy.</p>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">A two-city route can suit families, older travelers, food-focused visitors, photographers, repeat visitors and anyone who dislikes packing. It is not limited to one type of traveler.</p>
              <p className="safe-wrap mt-5 border-s-2 border-gold ps-5 text-lg font-semibold leading-8">More days does not automatically mean more cities.</p>
              <p className="safe-wrap mt-5 leading-7 text-mist">If walking comfort, rest and fewer hotel changes are priorities, read the guide to <Link href="/guides/china-with-older-parents" className="font-semibold text-moss underline decoration-moss/40 underline-offset-4">traveling China with older parents</Link>.</p>
            </section>

            <section aria-labelledby="another-city" className="mt-20">
              <h2 id="another-city" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">Before adding another city, ask what it adds</h2>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">Zhangjiajie, Guilin, Hangzhou or Chongqing may all be meaningful additions. Fame alone is not enough reason to put one into an already full Beijing–Xi&apos;an–Chengdu–Shanghai plan.</p>
              <ul className="mt-8 grid gap-x-10 gap-y-4 rounded-lg border bg-white p-6 hairline sm:grid-cols-2 sm:p-8">
                {["What specific experience does this city add?","Could I get something similar without another hotel change?","How much door-to-door time will it cost?","Which existing day will I remove?","Do I still have a buffer day?"].map(item=><li key={item} className="safe-wrap flex gap-3 leading-7 text-mist"><span className="text-gold" aria-hidden="true">?</span><span>{item}</span></li>)}
              </ul>
              <p className="safe-wrap mt-7 font-semibold leading-7 text-moss">Every new city needs to earn its place in a 10-day itinerary.</p>
            </section>

            <section aria-labelledby="seven-vs-ten" className="mt-20">
              <h2 id="seven-vs-ten" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">What changes when you have 10 days instead of 7?</h2>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">A <Link href="/guides/7-days-in-china" className="font-semibold text-moss underline decoration-moss/40 underline-offset-4">seven-day China route</Link> usually requires harder choices. With ten days, the most valuable use of the extra time is not automatically another city.</p>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">Three extra days can become an extra Beijing day, a slower transfer, an overnight in Suzhou, a free Shanghai day, a food experience, rest, a weather buffer or time in a local neighbourhood.</p>
              <p className="safe-wrap mt-5 border-s-2 border-gold ps-5 text-lg font-semibold leading-8">Three extra days can improve depth as much as breadth.</p>
            </section>
          </div>

          <section className="bg-ink px-5 py-14 text-cream sm:px-8 lg:px-24">
            <div className="mx-auto grid max-w-5xl gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
              <div><h2 className="safe-wrap font-serif text-3xl font-semibold sm:text-4xl">Want to compare these ideas with real route structures?</h2><p className="safe-wrap mt-4 max-w-3xl leading-7 text-cream/75">Browse the <Link href="/travel-planning" className="font-semibold text-gold underline decoration-gold/50 underline-offset-4">Travel Planning library</Link> to see how duration, transport and daily rhythm change across China.</p></div>
              <Link href="/travel-planning" className="inline-flex min-h-12 items-center justify-center rounded-md bg-cream px-7 py-3 text-center text-sm font-semibold text-ink transition hover:bg-gold">Explore Travel Planning <span className="ms-2">→</span></Link>
            </div>
          </section>

          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-24">
            <section aria-labelledby="private-support">
              <h2 id="private-support" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">Ten days does not mean ten guided days</h2>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">A hybrid plan might use a guide for the Great Wall and a historically dense day, keep Shanghai independent, arrange one private cultural experience and leave evenings free. Support can be concentrated where it changes the experience rather than attached to every day.</p>
              <p className="safe-wrap mt-5 leading-7 text-mist">See <Link href="/guides/do-you-need-a-tour-guide-in-china" className="font-semibold text-moss underline decoration-moss/40 underline-offset-4">Do You Need a Tour Guide in China?</Link> for the full comparison.</p>
            </section>

            <section className="mt-16 border-y hairline py-10">
              <h2 className="safe-wrap font-serif text-3xl font-semibold sm:text-4xl">How the route changes the budget</h2>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">More cities can mean more vehicles, domestic transport, station or airport transfers, hotel changes and guided coordination. Fewer cities may shift more of the budget toward hotels, experiences or independent time.</p>
              <p className="safe-wrap mt-4 leading-7 text-mist">For service scope and planning ranges, read the <Link href="/guides/private-china-tour-cost" className="font-semibold text-moss underline decoration-moss/40 underline-offset-4">2026 private China tour cost guide</Link>. Practical preparation questions are covered in the <Link href="/faq-for-foreign-travelers" className="font-semibold text-moss underline decoration-moss/40 underline-offset-4">FAQ for foreign travelers</Link>.</p>
            </section>

            <section aria-labelledby="my-rule" className="mt-20 rounded-lg border-s-4 border-gold bg-bone p-7 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">A local planning view</p>
              <h2 id="my-rule" className="safe-wrap mt-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl">My rule for a 10-day China trip</h2>
              <p className="safe-wrap mt-6 text-lg leading-8 text-mist">For ten days, I usually want every city to have a clear reason to be there.</p>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">If two places offer the same role in the trip, I would rather keep one and use the extra time for a slower day, a local experience or simply room to change the plan.</p>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">A good itinerary should feel different from city to city without feeling like you are constantly checking out of hotels.</p>
            </section>

            <section aria-labelledby="too-tiring" className="mt-20">
              <h2 id="too-tiring" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">What usually makes a 10-day China itinerary too tiring?</h2>
              <ul className="mt-9 divide-y border-y hairline">
                {["Four or five hotel changes","Treating transfer days as full sightseeing days","Flying across China for one attraction","Early starts every morning","No free evening","Adding a destination because it is famous rather than because it fits the trip","Changing hotels for places that work as day trips","No buffer for weather, jet lag or tiredness"].map((item,index)=><li key={item} className="grid gap-3 py-5 sm:grid-cols-[48px_1fr]"><span className="text-sm font-semibold text-gold">{String(index+1).padStart(2,"0")}</span><span className="safe-wrap leading-7 text-mist">{item}</span></li>)}
              </ul>
            </section>

            <section aria-labelledby="ten-day-faq" className="mt-20">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Practical questions</p>
              <h2 id="ten-day-faq" className="safe-wrap mt-4 font-serif text-3xl font-semibold leading-tight sm:text-5xl">10 days in China FAQ</h2>
              <div className="mt-9 divide-y overflow-hidden rounded-lg border bg-white hairline">
                {faqs.map(({question,answer})=><details key={question} className="group p-6 open:bg-bone sm:p-8"><summary className="safe-wrap cursor-pointer list-none font-serif text-xl font-semibold leading-8 sm:text-2xl">{question}</summary><p className="safe-wrap mt-4 leading-7 text-mist">{answer}</p></details>)}
              </div>
            </section>
          </div>

          <section className="bg-ink px-5 py-16 text-cream sm:px-8 lg:px-24 lg:py-20">
            <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div><h2 className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">Have 10 days in China but too many places on your list?</h2><p className="safe-wrap mt-5 max-w-3xl text-lg leading-8 text-cream/75">Send me your dates, arrival and departure cities, group size and the experiences you care about most. I can help you turn the list into a route that actually fits the time.</p></div>
              <Link href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-md bg-cream px-7 py-3 text-center text-sm font-semibold text-ink transition hover:bg-gold">Plan My China Trip <span className="ms-2">→</span></Link>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}

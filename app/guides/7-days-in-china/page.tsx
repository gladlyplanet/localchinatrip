import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "@/components/SiteChrome";
import { StructuredData } from "@/components/StructuredData";
import { absoluteUrl, breadcrumbSchema, createMetadata } from "@/lib/seo";

const path = "/guides/7-days-in-china";
const title = "7 Days in China: A Realistic First-Time Itinerary | Local China Trip";
const description = "Seven days in China is enough for a rewarding first trip—but not for everything. Compare realistic 2-city and 3-city routes, travel pace and transfer time before choosing your itinerary.";

export const metadata: Metadata = createMetadata({
  title,
  description,
  path,
});

const faqs = [
  {
    question: "Is 7 days enough for China?",
    answer: "Yes. Seven days is enough for a rewarding first trip if you choose a focused route and accept that you will not see everything. Two major bases usually give you more usable sightseeing time, while three cities can work for travelers who prefer variety and a faster pace.",
  },
  {
    question: "How many cities should I visit in China in 7 days?",
    answer: "For most first-time visitors, two or three cities is a realistic range. Two cities mean fewer hotel changes and more breathing room. Three cities add variety but require tighter transport planning, lighter luggage and less spontaneous time. Four or more usually turns too much of the week into moving and checking in.",
  },
  {
    question: "Can I do Beijing, Xi'an and Shanghai in 7 days?",
    answer: "Yes, it is doable for travelers who actively enjoy a busy itinerary. The route covers imperial history, the Terracotta Warriors and modern urban China, but it also involves two major city transfers and three hotels. Arrival and departure timing can make the plan significantly tighter.",
  },
  {
    question: "Is Beijing and Shanghai enough for a first trip to China?",
    answer: "Yes. Beijing and Shanghai create a clear first introduction to China, with major historical landmarks, the Great Wall and contrasting urban life. With only one major intercity transfer, the route also leaves more time for neighbourhoods, a day trip or a slower final day.",
  },
  {
    question: "Should I choose Xi'an or Suzhou for a 7-day China trip?",
    answer: "Choose Xi'an if iconic history and the Terracotta Warriors are central to your first trip. Choose Suzhou if you prefer a slower view of Jiangnan culture, gardens, crafts and an easier geographic connection with Shanghai. Neither is the better choice for everyone; they create different weeks.",
  },
] as const;

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "7 Days in China: What Can You Realistically See?",
  description,
  url: absoluteUrl(path),
  mainEntityOfPage: absoluteUrl(path),
  datePublished: "2026-09-21",
  dateModified: "2026-09-21",
  author: {
    "@type": "Organization",
    name: "Local China Trip",
    url: absoluteUrl("/about"),
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: answer,
    },
  })),
};

const routeChoices = [
  {
    title: "Choose Beijing + Shanghai if...",
    points: [
      "This is your first China trip and you want a clear introduction",
      "You prefer fewer transfers and hotel changes",
      "Free time and neighbourhood wandering matter",
      "You are traveling with children, older parents or heavier luggage",
    ],
  },
  {
    title: "Choose Beijing + Xi'an + Shanghai if...",
    points: [
      "Iconic historical sights are the priority",
      "The Terracotta Warriors are non-negotiable",
      "You are comfortable with early starts and transfer days",
      "You do not mind a packed week with less unplanned time",
    ],
  },
  {
    title: "Choose Beijing + Suzhou + Shanghai if...",
    points: [
      "Culture and everyday local life matter as much as landmarks",
      "You prefer a calmer rhythm after Beijing",
      "Jiangnan gardens, neighbourhoods and crafts interest you",
      "You want strong contrast without another long-distance leg",
    ],
  },
] as const;

export default function SevenDaysInChinaGuide() {
  return (
    <>
      <StructuredData
        data={[
          articleSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "7 Days in China", path },
          ]),
          faqSchema,
        ]}
      />
      <Header />
      <main className="bg-cream pt-[124px] text-ink xl:pt-20">
        <article>
          <header className="paper-texture border-b hairline px-5 py-14 sm:px-8 lg:px-24 lg:py-20">
            <div className="mx-auto max-w-5xl">
              <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-mist">
                <Link href="/" className="hover:text-moss">Home</Link>
                <span aria-hidden="true">/</span>
                <Link href="/travel-planning" className="hover:text-moss">Travel Planning</Link>
                <span aria-hidden="true">/</span>
                <span>7 Days in China</span>
              </nav>
              <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-gold">One-week China planning</p>
              <p className="mt-3 text-sm text-mist">Last reviewed: September 2026</p>
              <h1 className="safe-wrap mt-5 max-w-4xl font-serif text-4xl font-semibold leading-[1.08] sm:text-6xl lg:text-7xl">
                7 Days in China: What Can You Realistically See?
              </h1>
              <p className="safe-wrap mt-7 max-w-3xl text-lg leading-8 text-mist sm:text-xl">
                A first trip should feel like a journey through China, not a race between airports, stations and hotel lobbies. Here is how to choose a week that fits your priorities and your pace.
              </p>

              <section aria-labelledby="quick-answer" className="mt-10 rounded-lg border border-gold/40 bg-white p-6 shadow-card sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Quick answer</p>
                <h2 id="quick-answer" className="safe-wrap mt-3 font-serif text-2xl font-semibold sm:text-3xl">Seven days is enough—if the route respects the clock</h2>
                <p className="safe-wrap mt-5 text-lg leading-8">
                  Seven days is enough for a very good first trip to China, but the number of cities matters more than the number of attractions. Two major bases usually create a more relaxed journey. Three cities can work if you accept a faster pace, carefully chosen transport and less free time.
                </p>
                <p className="safe-wrap mt-4 leading-7 text-mist">For most first-time visitors, I would think about the week in one of three ways:</p>
                <ul className="mt-4 space-y-3 leading-7 text-mist">
                  <li className="safe-wrap"><strong className="text-ink">Beijing + Shanghai:</strong> the simplest and most relaxed option</li>
                  <li className="safe-wrap"><strong className="text-ink">Beijing + Xi&apos;an + Shanghai:</strong> the classic highlights at a faster pace</li>
                  <li className="safe-wrap"><strong className="text-ink">Beijing + Suzhou + Shanghai:</strong> iconic China with more local texture</li>
                </ul>
                <p className="safe-wrap mt-5 border-s-2 border-gold ps-4 font-semibold leading-7 text-moss">
                  The mistake is not choosing the “wrong” city. It is forgetting how much time and energy each transfer actually costs.
                </p>
              </section>
            </div>
          </header>

          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-24">
            <section aria-labelledby="full-days">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Start with the calendar</p>
              <h2 id="full-days" className="safe-wrap mt-4 font-serif text-3xl font-semibold leading-tight sm:text-5xl">First question: do you really have seven full days?</h2>
              <p className="safe-wrap mt-6 text-lg leading-8 text-mist">
                “Seven days in China” can describe very different amounts of usable time. If Day 1 is an international arrival and Day 7 is the flight home, you may have only five complete sightseeing days. Immigration, airport transfers, hotel check-in and jet lag can make the first day deliberately light. The final day needs enough margin to reach the departure airport without turning the end of the trip into a gamble.
              </p>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">
                Intercity travel also takes more than the time printed on a ticket. You still need to leave the hotel, reach the station or airport, pass security, wait to board, collect your luggage, reach the next hotel and check in again. A transfer that looks like “a five-hour train” on paper is not only five hours of your holiday.
              </p>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">
                Think door to door, not platform to platform. The exact cost depends on the city, station, traffic, departure time and how lightly you travel, so a useful itinerary protects part of the transfer day instead of promising a full sightseeing schedule on both sides.
              </p>
            </section>

            <section aria-labelledby="two-or-three" className="mt-20">
              <h2 id="two-or-three" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">Two cities or three?</h2>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">This is the decision that shapes the whole week. Attractions can be adjusted later; hotel changes and long transfers are harder to hide.</p>
              <div className="mt-9 grid gap-6 md:grid-cols-2">
                <section className="min-w-0 rounded-lg border bg-white p-6 hairline sm:p-8">
                  <h3 className="font-serif text-2xl font-semibold">Two-city trip</h3>
                  <p className="safe-wrap mt-3 leading-7 text-mist">Best when you want the journey to contain empty space as well as landmarks.</p>
                  <ul className="mt-6 space-y-3 leading-7 text-mist">
                    <li>• Fewer hotel changes and less luggage handling</li>
                    <li>• More time for neighbourhoods, meals and unplanned discoveries</li>
                    <li>• Easier to absorb jet lag or a delayed arrival</li>
                    <li>• More flexibility for weather or changing energy</li>
                    <li>• Usually easier with children or older travelers</li>
                    <li>• Room for a day trip without changing hotels</li>
                  </ul>
                </section>
                <section className="min-w-0 rounded-lg border border-moss/30 bg-bone p-6 sm:p-8">
                  <h3 className="font-serif text-2xl font-semibold">Three-city trip</h3>
                  <p className="safe-wrap mt-3 leading-7 text-mist">Best when variety and particular must-see places matter more than free time.</p>
                  <ul className="mt-6 space-y-3 leading-7 text-mist">
                    <li>• More regional and historical variety</li>
                    <li>• A wider set of iconic sights in one visit</li>
                    <li>• A tighter schedule with more fixed commitments</li>
                    <li>• More luggage handling, station time and hotel changes</li>
                    <li>• Less space for spontaneous neighbourhood time</li>
                    <li>• Small delays affect more of the itinerary</li>
                  </ul>
                </section>
              </div>
              <p className="safe-wrap mt-7 border-s-2 border-gold ps-5 text-lg font-semibold leading-8">Neither is automatically better. The question is whether you value coverage or breathing room.</p>
            </section>

            <section aria-labelledby="route-one" className="mt-20 border-t hairline pt-14">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Option 1 · Fewer transfers</p>
              <h2 id="route-one" className="safe-wrap mt-4 font-serif text-3xl font-semibold leading-tight sm:text-5xl">Beijing + Shanghai — the simplest first trip</h2>
              <p className="safe-wrap mt-6 text-lg leading-8 text-mist">
                This is the clearest choice for a first-time visitor who wants major landmarks and city life without changing hotels every couple of nights. Beijing provides imperial history, hutongs and access to the Great Wall. Shanghai offers a different view through the Bund, historic streets, contemporary neighbourhoods and time to explore at your own pace.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-md bg-bone p-5"><p className="text-xs font-semibold text-gold">DAYS 1–3</p><h3 className="mt-2 font-serif text-xl font-semibold">Beijing</h3><p className="safe-wrap mt-3 text-sm leading-6 text-mist">Arrival and orientation, historic Beijing, then a Great Wall day. The order stays flexible around your actual arrival and current reservations.</p></div>
                <div className="rounded-md border border-gold/40 bg-white p-5"><p className="text-xs font-semibold text-gold">DAY 4</p><h3 className="mt-2 font-serif text-xl font-semibold">Transfer</h3><p className="safe-wrap mt-3 text-sm leading-6 text-mist">Treat the move as part of the itinerary. Leave space for checkout, the station journey, boarding and the new hotel.</p></div>
                <div className="rounded-md bg-bone p-5"><p className="text-xs font-semibold text-gold">DAYS 5–7</p><h3 className="mt-2 font-serif text-xl font-semibold">Shanghai</h3><p className="safe-wrap mt-3 text-sm leading-6 text-mist">The Bund and historic centre, neighbourhood life, then free time or an optional Suzhou or water-town-style day trip if the schedule allows.</p></div>
              </div>
              <p className="safe-wrap mt-7 leading-7 text-mist"><strong className="text-ink">Why it works:</strong> there is only one major intercity transfer, so more of the week belongs to the destinations rather than the route between them.</p>
              <p className="safe-wrap mt-3 leading-7 text-mist"><strong className="text-ink">The tradeoff:</strong> it leaves out Xi&apos;an and the inland contrast that many travelers associate with a classic first trip.</p>
            </section>

            <section aria-labelledby="route-two" className="mt-20 border-t hairline pt-14">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Option 2 · Classic highlights</p>
              <h2 id="route-two" className="safe-wrap mt-4 font-serif text-3xl font-semibold leading-tight sm:text-5xl">Beijing + Xi&apos;an + Shanghai — classic, but fast</h2>
              <p className="safe-wrap mt-6 text-lg leading-8 text-mist">
                It is easy to understand why this is a popular first route. Beijing brings the Great Wall and imperial history. Xi&apos;an adds the Terracotta Warriors and an ancient-capital perspective. Shanghai closes the week with modern urban China. The three places tell a strong story together, and some visitors would regret leaving one out.
              </p>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">
                The real cost is not that the route is “wrong.” It is that two major city transfers, three hotels and several fixed bookings leave less recovery time. A simple outline might be Days 1–3 in Beijing, Days 4–5 in Xi&apos;an and Days 6–7 in Shanghai, but arrival and departure times can make this significantly tighter. A late first-day arrival or early flight home changes what those labels mean.
              </p>
              <div className="mt-8 rounded-lg border bg-white p-6 hairline sm:p-8">
                <h3 className="font-serif text-2xl font-semibold">Who it suits</h3>
                <p className="safe-wrap mt-4 leading-7 text-mist">This route is doable for travelers who actively prefer a busy trip, travel reasonably light and are happy to use transfer days efficiently. I would not choose it for someone who wants slow mornings, long neighbourhood walks or much flexibility. The reward is coverage; the price is pace.</p>
              </div>
            </section>
          </div>

          <section className="bg-ink px-5 py-16 text-cream sm:px-8 lg:px-24 lg:py-20">
            <div className="mx-auto max-w-5xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Option 3 · Local texture</p>
              <h2 className="safe-wrap mt-4 max-w-4xl font-serif text-3xl font-semibold leading-tight sm:text-5xl">Beijing + Suzhou + Shanghai — iconic China with more local texture</h2>
              <p className="safe-wrap mt-6 max-w-4xl text-lg leading-8 text-cream/80">
                This route keeps Beijing&apos;s major historical landmarks, then shifts to eastern China for two places that are geographically closer to each other. Suzhou brings gardens, traditional culture, Jiangnan life and a slower rhythm. Shanghai provides the modern urban contrast. After the long move from Beijing to eastern China, the remaining geography is more concentrated than a route that adds another cross-country-scale leg.
              </p>
              <p className="safe-wrap mt-5 max-w-4xl text-lg leading-8 text-cream/80">
                It is not the standard answer to a “must-see cities” ranking, and that is the point. It suits travelers who prefer depth over checklist travel, are interested in local neighbourhoods and traditional crafts, and do not need to collect every famous city on one trip. Suzhou is not presented as a substitute for Xi&apos;an; it creates a different kind of week.
              </p>
              <div className="mt-9 rounded-lg border border-white/15 bg-charcoal p-6 sm:p-8">
                <h3 className="font-serif text-2xl font-semibold">A workable shape</h3>
                <p className="safe-wrap mt-4 leading-7 text-cream/80">Begin with Beijing&apos;s historical scale, move to Suzhou for gardens, culture and a more intimate pace, then finish in Shanghai with urban neighbourhoods and a flexible departure. The full plan keeps enough structure to be useful without pretending every traveler should follow the same hour-by-hour program.</p>
                <Link href="/travel-planning/china-culture-7" className="safe-wrap mt-6 inline-flex min-h-12 items-center justify-center rounded-md bg-cream px-6 py-3 text-center text-sm font-semibold text-ink transition hover:bg-gold">See the full 7-day Beijing–Suzhou–Shanghai journey <span className="ms-2">→</span></Link>
              </div>
            </div>
          </section>

          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-24">
            <section aria-labelledby="route-chooser">
              <h2 id="route-chooser" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">Which 7-day route fits you?</h2>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">Use your priorities to choose the structure. There is no score and no universal winner.</p>
              <div className="mt-9 grid gap-6 lg:grid-cols-3">
                {routeChoices.map(({ title: choiceTitle, points }) => (
                  <section key={choiceTitle} className="min-w-0 rounded-lg border bg-white p-6 hairline">
                    <h3 className="safe-wrap font-serif text-2xl font-semibold">{choiceTitle}</h3>
                    <ul className="mt-5 space-y-3 leading-7 text-mist">
                      {points.map((point) => <li key={point} className="safe-wrap flex gap-3"><span className="text-gold" aria-hidden="true">•</span><span>{point}</span></li>)}
                    </ul>
                  </section>
                ))}
              </div>
            </section>

            <section aria-labelledby="wrong" className="mt-20">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Common planning traps</p>
              <h2 id="wrong" className="safe-wrap mt-4 font-serif text-3xl font-semibold leading-tight sm:text-5xl">What usually goes wrong in a 7-day China itinerary?</h2>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">Most difficult weeks are not caused by one terrible choice. They come from several reasonable ideas being placed too close together.</p>
              <ol className="mt-9 divide-y border-y hairline">
                {[
                  ["Counting arrival and departure as full sightseeing days", "Those days may contain useful time, but international travel, airport margins and jet lag make them unreliable foundations for major plans."],
                  ["Adding four or five cities", "A long list can look efficient until hotel changes and transfers take over the week. A place visited only between check-in and checkout rarely feels like a real stop."],
                  ["Treating train time as the whole transfer", "The ticket shows the ride, not the complete door-to-door move through checkout, local transport, security, waiting and the next hotel."],
                  ["Booking every hour before experiencing jet lag", "A tightly timed first morning may work, but it leaves no graceful answer if the group sleeps badly or the inbound flight changes."],
                  ["Changing hotels too often", "Every change creates packing, checkout, luggage and orientation work. Staying two or three nights can be more valuable than adding another pin to the map."],
                  ["Assuming famous attractions will fit any day", "Reservations, capacity controls and closure rules can change. Check current official information before fixing the surrounding route."],
                  ["Leaving no buffer", "Weather, tiredness, delays—or simply liking a place more than expected—are normal parts of travel. A little space protects the parts you care about most."],
                ].map(([itemTitle, body], index) => (
                  <li key={itemTitle} className="grid gap-3 py-6 sm:grid-cols-[48px_1fr] sm:gap-5">
                    <span className="text-sm font-semibold text-gold">{String(index + 1).padStart(2, "0")}</span>
                    <div><h3 className="safe-wrap font-serif text-2xl font-semibold">{itemTitle}</h3><p className="safe-wrap mt-2 leading-7 text-mist">{body}</p></div>
                  </li>
                ))}
              </ol>
            </section>

            <section aria-labelledby="my-rule" className="mt-20 rounded-lg border-s-4 border-gold bg-bone p-7 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">A local planning view</p>
              <h2 id="my-rule" className="safe-wrap mt-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl">My rule for a one-week China trip</h2>
              <p className="safe-wrap mt-6 text-xl leading-9 text-moss">If you only have one week, I would rather remove one city than remove every quiet hour.</p>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">China&apos;s scale can make a route look efficient on a map while still feeling exhausting in real life. A good seven-day itinerary should leave enough space to notice the place, not just reach it.</p>
            </section>

            <section aria-labelledby="more-cities" className="mt-20">
              <h2 id="more-cities" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">What if I really want three or more cities?</h2>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">Then design the route around movement instead of pretending movement is invisible. A faster trip can still be rewarding when the pace is a deliberate preference.</p>
              <ul className="mt-8 grid gap-x-10 gap-y-4 rounded-lg border bg-white p-6 hairline sm:grid-cols-2 sm:p-8">
                {[
                  "Use open-jaw international flights where possible so you do not return to the starting city only to fly home",
                  "Avoid backtracking and keep the cities in a logical geographic sequence",
                  "Choose one key sight or experience per city before adding optional extras",
                  "Travel light enough that stations and hotel changes stay manageable",
                  "Consider a flight when rail would consume most of the usable day",
                  "Avoid checking in and out every single night",
                  "Keep arrival and departure days deliberately light",
                  "Protect one flexible block that can absorb delay, tiredness or a changed priority",
                ].map((item) => <li key={item} className="safe-wrap flex gap-3 leading-7 text-mist"><span className="text-gold" aria-hidden="true">✓</span><span>{item}</span></li>)}
              </ul>
            </section>
          </div>

          <section className="bg-ink px-5 py-14 text-cream sm:px-8 lg:px-24">
            <div className="mx-auto grid max-w-5xl gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="safe-wrap font-serif text-3xl font-semibold sm:text-4xl">Want a route you can compare with these options?</h2>
                <p className="safe-wrap mt-4 max-w-3xl leading-7 text-cream/75">Browse the existing <Link href="/travel-planning/china-culture-7" className="font-semibold text-gold underline decoration-gold/50 underline-offset-4">7-day Beijing–Suzhou–Shanghai journey</Link>, then explore more <Link href="/travel-planning" className="font-semibold text-gold underline decoration-gold/50 underline-offset-4">China travel-planning ideas</Link>.</p>
              </div>
              <Link href="/travel-planning" className="inline-flex min-h-12 items-center justify-center rounded-md bg-cream px-7 py-3 text-center text-sm font-semibold text-ink transition hover:bg-gold">Explore Travel Planning <span className="ms-2">→</span></Link>
            </div>
          </section>

          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-24">
            <section aria-labelledby="private-support">
              <h2 id="private-support" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">Does a one-week trip need private support?</h2>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">A seven-day trip is exactly where selective private support can sometimes make more sense than hiring a guide every day. Help on an arrival transfer, a Great Wall day, a complex historical day or a Suzhou cultural experience can protect the difficult parts of the week. A free Shanghai day may be better kept independent.</p>
              <p className="safe-wrap mt-5 leading-7 text-mist">The right mix depends on how confidently you book transport, manage reservations and adapt when plans change. Read <Link href="/guides/do-you-need-a-tour-guide-in-china" className="font-semibold text-moss underline decoration-moss/40 underline-offset-4">Do You Need a Tour Guide in China?</Link> for a fuller comparison.</p>
            </section>

            <section className="mt-16 border-y hairline py-10">
              <h2 className="safe-wrap font-serif text-3xl font-semibold sm:text-4xl">Planning the budget</h2>
              <p className="safe-wrap mt-4 text-lg leading-8 text-mist">If you are comparing a fully independent trip with selected or complete private support, see the <Link href="/guides/private-china-tour-cost" className="font-semibold text-moss underline decoration-moss/40 underline-offset-4">2026 private China tour cost guide</Link>. Compare the service scope, not only the total.</p>
              <p className="safe-wrap mt-4 leading-7 text-mist">For practical questions that affect a short first visit, the <Link href="/faq-for-foreign-travelers" className="font-semibold text-moss underline decoration-moss/40 underline-offset-4">FAQ for foreign travelers</Link> is another useful starting point.</p>
            </section>

            <section aria-labelledby="seven-day-faq" className="mt-20">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Practical questions</p>
              <h2 id="seven-day-faq" className="safe-wrap mt-4 font-serif text-3xl font-semibold leading-tight sm:text-5xl">7 days in China FAQ</h2>
              <div className="mt-9 divide-y overflow-hidden rounded-lg border bg-white hairline">
                {faqs.map(({ question, answer }) => (
                  <details key={question} className="group p-6 open:bg-bone sm:p-8">
                    <summary className="safe-wrap cursor-pointer list-none font-serif text-xl font-semibold leading-8 sm:text-2xl">{question}</summary>
                    <p className="safe-wrap mt-4 leading-7 text-mist">{answer}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <section className="bg-ink px-5 py-16 text-cream sm:px-8 lg:px-24 lg:py-20">
            <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <h2 className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">Only have seven days in China?</h2>
                <p className="safe-wrap mt-5 max-w-3xl text-lg leading-8 text-cream/75">Tell me your arrival city, departure city, dates, group size and the places you care about most. I can help you work out what realistically fits—and what is better saved for the next trip.</p>
              </div>
              <Link href="/contact" className="inline-flex min-h-12 items-center justify-center rounded-md bg-cream px-7 py-3 text-center text-sm font-semibold text-ink transition hover:bg-gold">Plan My China Trip <span className="ms-2">→</span></Link>
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </>
  );
}

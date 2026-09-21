import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "@/components/SiteChrome";
import { StructuredData } from "@/components/StructuredData";
import { absoluteUrl, breadcrumbSchema, createMetadata } from "@/lib/seo";

const path = "/guides/do-you-need-a-tour-guide-in-china";
const title = "Do You Need a Tour Guide in China? | Local China Trip";
const description = "Most travelers do not need a guide every day in China. Compare independent travel, group tours and private guides, and see where local support is actually worth paying for.";

export const metadata: Metadata = createMetadata({
  title,
  description,
  path,
});

const faqs = [
  {
    question: "Do tourists need a guide in China?",
    answer: "No, not for most mainstream routes. Many visitors arrange hotels, trains, flights and straightforward city days independently. A guide is most useful when reservations, transport, interpretation or the needs of the group make a particular day more complicated.",
  },
  {
    question: "Can I travel China independently without speaking Chinese?",
    answer: "Yes, but preparation matters. Translation, mapping, payment and transport apps make independent travel realistic, while some ticketing systems and unexpected changes can still be difficult without Chinese. Set up essential tools before arrival and allow extra time on unfamiliar days.",
  },
  {
    question: "Is a private guide worth it in Beijing?",
    answer: "It can be. Beijing is possible independently, but a guide can add value at the Forbidden City, the Great Wall and historically dense sites where timing, transport and cultural context matter. A relaxed neighbourhood or shopping day may not need one.",
  },
  {
    question: "Should I book a guide for every day of my China trip?",
    answer: "Usually not. Many trips work better with guided support on complex or interpretation-heavy days and independent time for neighbourhoods, meals, shopping, rest and simple transfers.",
  },
  {
    question: "Is a private tour better than a group tour in China?",
    answer: "It depends on your budget, independence, preferred pace and how much planning you want to do. Group tours offer a predictable shared structure, while private support offers personal pacing and flexibility. Neither is automatically the better choice for every traveler.",
  },
] as const;

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Do You Need a Tour Guide in China?",
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

const comparisonOptions = [
  {
    name: "DIY travel",
    summary: "You arrange and manage the journey yourself.",
    rows: [
      ["Cost", "Lowest service cost; you pay suppliers directly."],
      ["Freedom", "Maximum control over timing and daily choices."],
      ["Planning effort", "Highest: research, booking and problem-solving stay with you."],
      ["Local explanation", "Depends on your own reading, audio guides or occasional local help."],
      ["Flexibility", "Very flexible when tickets and transport allow changes."],
      ["Transport coordination", "You handle stations, transfers and route changes."],
      ["Families / older travelers", "Possible, but the organizer carries more responsibility for pace and access."],
      ["Best for", "Confident travelers who enjoy research and independent decisions."],
    ],
  },
  {
    name: "Group tour",
    summary: "You join a shared route with a fixed structure.",
    rows: [
      ["Cost", "Shared services can make the overall budget more predictable."],
      ["Freedom", "Lower: departure times and stops follow the group plan."],
      ["Planning effort", "Low once the itinerary and inclusions are understood."],
      ["Local explanation", "A guide explains the scheduled places for the whole group."],
      ["Flexibility", "Limited because changes affect other travelers."],
      ["Transport coordination", "Usually organized within the published itinerary."],
      ["Families / older travelers", "Convenient if the group pace and walking level suit everyone."],
      ["Best for", "Travelers who prefer a clear schedule and do not want to plan each step."],
    ],
  },
  {
    name: "Private guide / support",
    summary: "Guiding and logistics are shaped around your own group.",
    rows: [
      ["Cost", "Higher service cost, especially with a guide and vehicle on many days."],
      ["Freedom", "Personal control within booking and transport constraints."],
      ["Planning effort", "Lower when more of the journey is arranged for you."],
      ["Local explanation", "Detailed context and conversation matched to your interests."],
      ["Flexibility", "Good for pacing, rest stops and reasonable day-of adjustments."],
      ["Transport coordination", "Transfers and moving parts can be coordinated around the itinerary."],
      ["Families / older travelers", "Useful when walking, meals, rest and boarding points need personal adjustment."],
      ["Best for", "Complex days, limited time, deeper context or travelers wanting personal pacing."],
    ],
  },
] as const;

export default function TourGuideInChinaGuide() {
  return (
    <>
      <StructuredData
        data={[
          articleSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Do You Need a Tour Guide in China?", path },
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
                <span>Guide or independent travel?</span>
              </nav>
              <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-gold">China travel decisions</p>
              <p className="mt-3 text-sm text-mist">Last reviewed: September 2026</p>
              <h1 className="safe-wrap mt-5 max-w-4xl font-serif text-4xl font-semibold leading-[1.08] sm:text-6xl lg:text-7xl">
                Do You Need a Tour Guide in China?
              </h1>
              <p className="safe-wrap mt-7 max-w-3xl text-lg leading-8 text-mist sm:text-xl">
                An honest comparison of independent travel, group tours, private support and the hybrid option that sits between them.
              </p>

              <section aria-labelledby="quick-answer" className="mt-10 rounded-lg border border-gold/40 bg-white p-6 shadow-card sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Quick answer</p>
                <h2 id="quick-answer" className="safe-wrap mt-3 font-serif text-2xl font-semibold sm:text-3xl">No—you usually do not need a private guide every day</h2>
                <p className="safe-wrap mt-5 text-lg leading-8">
                  For most mainstream destinations in China, foreign visitors can travel independently without hiring a private guide or joining a tour group. Beijing, Shanghai, Xi&apos;an, Chengdu and Suzhou can all be visited independently if you are comfortable arranging transport, tickets, payments and navigation yourself.
                </p>
                <p className="safe-wrap mt-4 leading-7 text-mist">
                  A guide becomes more useful when a trip involves complicated reservations, limited time, cultural interpretation, remote locations, children, older travelers or days where several moving parts need to work smoothly.
                </p>
                <p className="safe-wrap mt-4 leading-7 text-mist">
                  For many travelers, the best answer is not “guided or unguided.” It is a mix of independent days and private support where it actually adds value.
                </p>
                <p className="safe-wrap mt-5 border-s-2 border-gold ps-4 text-sm leading-6 text-moss">
                  Some destinations or special regions can have separate permit or travel requirements, so always check current official rules for your specific route.
                </p>
              </section>
            </div>
          </header>

          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-24">
            <section aria-labelledby="independent-travel">
              <h2 id="independent-travel" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">Can foreigners travel around China independently?</h2>
              <p className="safe-wrap mt-6 text-lg leading-8 text-mist">
                Yes, for most common tourist routes. Hotels, high-speed rail, domestic flights, ride-hailing, maps, attraction tickets, mobile payments and translation can usually be arranged without joining a tour. Travelers who enjoy planning can build a very good trip around the major cities and rail network.
              </p>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">
                That does not mean every step is effortless. Some ticketing systems can be confusing, passport-based booking occasionally adds friction, and language differences still matter. Payment, mapping and translation tools need to be set up, while large stations and popular attractions can feel overwhelming on a first visit. Plans can also change quickly when tickets sell out, weather shifts or a train connection is missed.
              </p>
              <p className="safe-wrap mt-5 font-semibold leading-7 text-moss">China is very possible independently. It is not always friction-free.</p>
            </section>

            <section aria-labelledby="comparison" className="mt-20">
              <h2 id="comparison" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">DIY vs group tour vs private guide</h2>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">Each style solves a different problem. Compare the service and responsibility involved rather than looking for a universal winner.</p>
              <div className="mt-9 grid items-start gap-6 lg:grid-cols-3">
                {comparisonOptions.map((option) => (
                  <section key={option.name} className="min-w-0 rounded-lg border bg-white p-6 hairline sm:p-7">
                    <h3 className="safe-wrap font-serif text-2xl font-semibold">{option.name}</h3>
                    <p className="safe-wrap mt-3 min-h-0 leading-7 text-mist lg:min-h-14">{option.summary}</p>
                    <dl className="mt-6 divide-y hairline border-t hairline">
                      {option.rows.map(([term, value]) => (
                        <div key={term} className="py-4">
                          <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-gold">{term}</dt>
                          <dd className="safe-wrap mt-2 text-sm leading-6 text-mist">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </section>
                ))}
              </div>
            </section>

            <section aria-labelledby="no-guide" className="mt-20 rounded-lg bg-bone p-7 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Independent time matters</p>
              <h2 id="no-guide" className="safe-wrap mt-4 font-serif text-3xl font-semibold leading-tight sm:text-5xl">When you probably do NOT need a guide</h2>
              <p className="safe-wrap mt-6 text-lg leading-8 text-mist">Paying for a guide simply because you are in China does not automatically make the trip better. If a day is easy to navigate and you enjoy exploring alone, independent time can be part of a better private itinerary.</p>
              <ul className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {[
                  "A relaxed day exploring central Shanghai",
                  "Shopping, cafés and neighbourhood wandering",
                  "Free evenings with no fixed program",
                  "Simple point-to-point high-speed rail journeys",
                  "Attractions you mainly want to see rather than study in depth",
                  "Days deliberately left open for rest or spontaneous choices",
                ].map((item) => <li key={item} className="safe-wrap flex gap-3 leading-7 text-mist"><span className="text-gold" aria-hidden="true">•</span><span>{item}</span></li>)}
              </ul>
            </section>

            <section aria-labelledby="support-worth" className="mt-20">
              <h2 id="support-worth" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">When a private guide or local support is worth considering</h2>
              <div className="mt-9 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                <div className="border-t border-gold/50 pt-5">
                  <h3 className="font-serif text-2xl font-semibold">1. Your first day in China</h3>
                  <p className="safe-wrap mt-3 leading-7 text-mist">After a long international flight, someone helping with the airport transfer, hotel arrival, payment setup and the first orientation can remove several small problems at once.</p>
                </div>
                <div className="border-t border-gold/50 pt-5">
                  <h3 className="font-serif text-2xl font-semibold">2. A Great Wall day</h3>
                  <p className="safe-wrap mt-3 leading-7 text-mist">The Wall can be visited independently, but choosing a section, arranging transport and matching the walking plan to your time and fitness make local support useful.</p>
                </div>
                <div className="border-t border-gold/50 pt-5">
                  <h3 className="font-serif text-2xl font-semibold">3. Complex timed-entry attractions</h3>
                  <p className="safe-wrap mt-3 leading-7 text-mist">Popular attractions, museums and multi-stop days can involve fixed entry times and careful sequencing. A guide does not create special access, but good coordination can protect the rest of the day.</p>
                </div>
                <div className="border-t border-gold/50 pt-5">
                  <h3 className="font-serif text-2xl font-semibold">4. Cultural context</h3>
                  <p className="safe-wrap mt-3 leading-7 text-mist">You can visit the Forbidden City, Terracotta Warriors, temples, historic neighbourhoods and craft studios alone. Good explanation can still change what you notice and how the places connect.</p>
                </div>
                <div className="border-t border-gold/50 pt-5">
                  <h3 className="font-serif text-2xl font-semibold">5. Traveling with children</h3>
                  <p className="safe-wrap mt-3 leading-7 text-mist">Shorter attention spans, meals, toilets, tiredness and last-minute changes are easier to handle when the day is not tied to a large group schedule.</p>
                </div>
                <div className="border-t border-gold/50 pt-5">
                  <h3 className="font-serif text-2xl font-semibold">6. Traveling with older parents</h3>
                  <p className="safe-wrap mt-3 leading-7 text-mist">Reducing unnecessary walking, choosing practical drop-off points, allowing lunch and rest time, and changing the plan when energy drops can matter more than fitting in another attraction.</p>
                  <p className="safe-wrap mt-3 text-sm leading-6 text-mist">Planning China with older parents? Read the <Link href="/guides/china-with-older-parents" className="font-semibold text-moss underline decoration-moss/40 underline-offset-4">comfortable travel guide</Link>.</p>
                </div>
                <div className="border-t border-gold/50 pt-5">
                  <h3 className="font-serif text-2xl font-semibold">7. Countryside and remote areas</h3>
                  <p className="safe-wrap mt-3 leading-7 text-mist">Public transport may be limited, local information may be harder to confirm, and the value often comes from introductions or context rather than transport alone.</p>
                </div>
                <div className="border-t border-gold/50 pt-5">
                  <h3 className="font-serif text-2xl font-semibold">8. A tight itinerary</h3>
                  <p className="safe-wrap mt-3 leading-7 text-mist">On a five-to-seven-day trip, losing half a day to a small booking or transfer problem is costly. Coordination is more valuable when there is little recovery time.</p>
                </div>
              </div>
            </section>
          </div>

          <section className="bg-ink px-5 py-16 text-cream sm:px-8 lg:px-24 lg:py-20">
            <div className="mx-auto max-w-5xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">A flexible middle ground</p>
              <h2 className="safe-wrap mt-4 max-w-4xl font-serif text-3xl font-semibold leading-tight sm:text-5xl">The option many travelers overlook: a hybrid trip</h2>
              <p className="safe-wrap mt-6 max-w-4xl text-lg leading-8 text-mist">A trip does not need to be fully independent or fully guided. You can arrange private help only on the days when timing, transport or local knowledge changes the experience.</p>
              <ol className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  ["Day 1", "Arrival support and a simple city orientation"],
                  ["Day 2", "A guided historical day"],
                  ["Day 3", "An independent neighbourhood day"],
                  ["Day 4", "A private day trip outside the city"],
                  ["Day 5", "A free day with no arranged service"],
                  ["Day 6", "A guided cultural experience"],
                ].map(([day, plan]) => (
                  <li key={day} className="rounded-md border border-white/10 bg-charcoal p-5">
                    <span className="text-xs font-semibold text-gold">{day}</span>
                    <p className="safe-wrap mt-2 leading-7 text-cream/85">{plan}</p>
                  </li>
                ))}
              </ol>
              <p className="safe-wrap mt-8 border-s-2 border-gold ps-5 text-lg font-semibold leading-8">You pay for local help where it genuinely improves the trip, and keep your independence where it does not.</p>
            </div>
          </section>

          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-24">
            <section aria-labelledby="route-example">
              <h2 id="route-example" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">Example: a 7-day Beijing–Suzhou–Shanghai trip</h2>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">The existing <Link href="/travel-planning/china-culture-7" className="font-semibold text-moss underline decoration-moss/40 underline-offset-4">Beijing–Suzhou–Shanghai cultural route</Link> shows how a hybrid plan can work without rewriting the whole journey around a guide.</p>
              <div className="mt-9 space-y-5 border-s-2 border-gold/50 ps-6 sm:ps-8">
                <div><h3 className="font-semibold">Beijing historical day</h3><p className="safe-wrap mt-2 leading-7 text-mist">A guide adds context and helps sequence a major historical visit. If the Great Wall is chosen, private transport and local planning can also save time.</p></div>
                <div><h3 className="font-semibold">High-speed rail transfer</h3><p className="safe-wrap mt-2 leading-7 text-mist">Support is optional for confident travelers. Others may value station pickup, boarding guidance and luggage help.</p></div>
                <div><h3 className="font-semibold">Suzhou cultural experience</h3><p className="safe-wrap mt-2 leading-7 text-mist">A guide or local host can explain garden design, living crafts and the context behind a workshop instead of turning the day into a list of stops.</p></div>
                <div><h3 className="font-semibold">Shanghai neighbourhood time</h3><p className="safe-wrap mt-2 leading-7 text-mist">Independent exploration and a free evening work well when the traveler wants to walk, eat or change plans without a fixed schedule.</p></div>
              </div>
            </section>

            <section className="mt-20 rounded-lg border border-moss/30 bg-white p-7 shadow-card sm:p-10">
              <h2 className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-4xl">Not sure how much of your China trip needs private support?</h2>
              <p className="safe-wrap mt-5 max-w-3xl text-lg leading-8 text-mist">Tell me your dates, cities, group size and how independently you like to travel. I can help you work out which days are worth arranging and which days you can comfortably keep for yourself.</p>
              <Link href="/contact" className="mt-7 inline-flex min-h-12 items-center justify-center rounded-md bg-moss px-7 py-3 text-center text-sm font-semibold text-cream transition hover:bg-ink">Plan My China Trip <span className="ms-2">→</span></Link>
            </section>

            <section aria-labelledby="right-style" className="mt-20">
              <h2 id="right-style" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">Which travel style is right for you?</h2>
              <div className="mt-9 grid gap-5 sm:grid-cols-2">
                <div className="rounded-lg border bg-white p-6 hairline"><h3 className="font-serif text-2xl font-semibold">Choose mostly DIY if...</h3><ul className="mt-4 space-y-2 leading-7 text-mist"><li>• You enjoy research and booking</li><li>• You are comfortable solving small problems</li><li>• Freedom matters more than explanation</li><li>• Your route follows well-connected cities</li></ul></div>
                <div className="rounded-lg border bg-white p-6 hairline"><h3 className="font-serif text-2xl font-semibold">Choose a group tour if...</h3><ul className="mt-4 space-y-2 leading-7 text-mist"><li>• You prefer a published schedule</li><li>• You do not want to plan the logistics</li><li>• A shared pace suits you</li><li>• Predictable inclusions help with budgeting</li></ul></div>
                <div className="rounded-lg border bg-white p-6 hairline"><h3 className="font-serif text-2xl font-semibold">Choose private support if...</h3><ul className="mt-4 space-y-2 leading-7 text-mist"><li>• Your time is limited</li><li>• Personal pacing matters</li><li>• The route includes complex or remote days</li><li>• You want deeper local explanation</li></ul></div>
                <div className="rounded-lg border border-moss/30 bg-bone p-6"><h3 className="font-serif text-2xl font-semibold">Choose a hybrid trip if...</h3><ul className="mt-4 space-y-2 leading-7 text-mist"><li>• You value both support and independence</li><li>• Only some days are complicated</li><li>• You want to control service costs</li><li>• Free time is part of the experience</li></ul></div>
              </div>
            </section>

            <section className="mt-20 border-y hairline py-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Planning the budget</p>
              <h2 className="safe-wrap mt-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl">Wondering what private support costs?</h2>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">Costs vary with party size, hotels, cities, transport and how many days actually need private support. See the full <Link href="/guides/private-china-tour-cost" className="font-semibold text-moss underline decoration-moss/40 underline-offset-4">2026 private China tour cost guide</Link> rather than assuming every day requires the same service.</p>
            </section>

            <section aria-labelledby="local-view" className="mt-20 rounded-lg border-s-4 border-gold bg-bone p-7 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">A local planning view</p>
              <h2 id="local-view" className="safe-wrap mt-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl">Decide day by day, not by label</h2>
              <p className="safe-wrap mt-6 text-lg leading-8 text-mist">I do not think every day of a China trip needs a guide. Some days benefit greatly from local knowledge and coordination. Other days are better when you have the freedom to walk, eat, shop or simply change your mind.</p>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">When I plan a private journey, I prefer to decide day by day where local support genuinely improves the trip.</p>
              <p className="safe-wrap mt-5 leading-7 text-mist">You can learn more about the <Link href="/about" className="font-semibold text-moss underline decoration-moss/40 underline-offset-4">Local China planning approach</Link>, browse <Link href="/travel-planning" className="font-semibold text-moss underline decoration-moss/40 underline-offset-4">route ideas</Link>, or read the <Link href="/faq-for-foreign-travelers" className="font-semibold text-moss underline decoration-moss/40 underline-offset-4">FAQ for foreign travelers</Link>.</p>
            </section>

            <section aria-labelledby="guide-faq" className="mt-20">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Practical questions</p>
              <h2 id="guide-faq" className="safe-wrap mt-4 font-serif text-3xl font-semibold leading-tight sm:text-5xl">Tour guide in China FAQ</h2>
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
                <h2 className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">Build the right mix for your trip</h2>
                <p className="safe-wrap mt-5 max-w-3xl text-lg leading-8 text-mist">Tell me your dates, cities, group size and how independently you like to travel. We can identify the days where private help adds real value and keep the rest open.</p>
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

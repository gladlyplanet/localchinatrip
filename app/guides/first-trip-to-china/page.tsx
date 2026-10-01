import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "@/components/SiteChrome";
import { StructuredData } from "@/components/StructuredData";
import { absoluteUrl, breadcrumbSchema, createMetadata } from "@/lib/seo";

const path = "/guides/first-trip-to-china";
const title = "First Trip to China: How to Plan Your Journey | Local China Trip";
const headline = "First Trip to China: How to Plan Your Journey";
const description = "Planning your first trip to China? Start with your time, route, travel style, budget and pace — then build the details around the way you actually want to travel.";

export const metadata: Metadata = createMetadata({ title, description, path });

const planningOrder = [
  "Count your full travel days",
  "Choose two or three main bases",
  "Decide how independent you want to be",
  "Set the budget around that travel style",
  "Adjust for the people traveling",
  "Prepare the essential practical systems",
  "Leave some space unplanned",
] as const;

type GuideFaq = {
  question: string;
  answer: string;
  link?: { href: string; text: string };
};

const faqs: GuideFaq[] = [
  {
    question: "How many days are enough for a first trip to China?",
    answer: "Seven days can work for a focused trip with limited movement. Ten days allows more breathing room, while a longer trip can add depth or another region. Count full days on the ground and time spent moving between places before deciding how much to include.",
  },
  {
    question: "What cities should I visit on my first trip to China?",
    answer: "Choose around your time and interests rather than a fixed list of cities. Two or three main bases are often easier to enjoy than a route that tries to cover too much. There is no single correct first-time route: history, food, local life, landscapes or another interest can lead to different choices.",
  },
  {
    question: "Can I travel around China independently?",
    answer: "Yes, many travelers can arrange their own transport, hotels, bookings and daily plans. Some days or places may still benefit from local help, and you can combine independent time with selected support.",
    link: { href: "/guides/do-you-need-a-tour-guide-in-china", text: "Read Do You Need a Tour Guide in China?" },
  },
  {
    question: "Do I need a private tour for my first trip to China?",
    answer: "No. Private arrangements can be useful when pace, dates, mobility, logistics or special interests need more flexibility. Independent or group travel may work well when you are comfortable with the planning involved or with a shared schedule.",
  },
  {
    question: "What should I prepare before traveling to China?",
    answer: "Confirm entry requirements, payment options, connectivity, maps and translation, intercity transport, and your hotel and arrival details. Rules and digital tools change, so check current official requirements and provider information close to departure.",
  },
];

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline,
  description,
  url: absoluteUrl(path),
  mainEntityOfPage: absoluteUrl(path),
  datePublished: "2026-10-01",
  dateModified: "2026-10-01",
  author: {
    "@type": "Organization",
    name: "Local China Trip",
    url: absoluteUrl("/about"),
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map(({ question, answer, link }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: {
      "@type": "Answer",
      text: [answer, link?.text].filter(Boolean).join(" "),
    },
  })),
};

export default function FirstTripToChinaGuide() {
  return (
    <>
      <StructuredData
        data={[
          articleSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Travel Planning", path: "/travel-planning" },
            { name: headline, path },
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
                <span>{headline}</span>
              </nav>
              <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-gold">Start here</p>
              <p className="mt-3 text-sm text-mist">Last reviewed: October 2026</p>
              <h1 className="safe-wrap mt-5 max-w-5xl font-serif text-4xl font-semibold leading-[1.08] sm:text-6xl lg:text-7xl">{headline}</h1>
              <p className="safe-wrap mt-7 max-w-3xl text-lg leading-8 text-mist sm:text-xl">A first journey begins with a few useful decisions. Start with the shape of your trip, then use the detailed guides when you need them.</p>

              <section aria-labelledby="quick-answer" className="mt-10 rounded-lg border border-gold/40 bg-white p-6 shadow-card sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Quick answer</p>
                <h2 id="quick-answer" className="safe-wrap mt-3 font-serif text-2xl font-semibold sm:text-3xl">Plan the shape before the details</h2>
                <p className="safe-wrap mt-5 text-lg leading-8">For a first trip to China, start with the number of full days you actually have, then choose two or three main bases, decide how much support you want, and only then fill in the details.</p>
                <p className="safe-wrap mt-4 leading-7 text-mist">Do not try to solve every city, booking and app at once. A good first trip is usually less about seeing as much of China as possible and more about building a route with enough time to actually experience it.</p>
              </section>
            </div>
          </header>

          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-24">
            <section aria-labelledby="planning-order" className="rounded-lg border bg-bone p-6 hairline sm:p-8">
              <h2 id="planning-order" className="safe-wrap font-serif text-2xl font-semibold sm:text-3xl">Your first China trip, in order</h2>
              <ol className="mt-6 list-decimal space-y-3 ps-6 leading-7 text-mist marker:font-semibold marker:text-moss">
                {planningOrder.map((step) => <li key={step} className="safe-wrap ps-2">{step}</li>)}
              </ol>
            </section>

            <section aria-labelledby="full-travel-days" className="mt-20">
              <h2 id="full-travel-days" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">1. Start with your time, not your city list</h2>
              <p className="safe-wrap mt-6 text-lg leading-8 text-mist">Write down your arrival and departure times, then count the full days you have on the ground. An evening arrival is not a sightseeing day, and an early departure may leave little usable time. This gives you a more honest starting point than the number of dates on your booking.</p>
              <p className="safe-wrap mt-6 border-s-2 border-gold ps-4 text-lg font-semibold leading-8">Count door-to-door travel, not timetable travel.</p>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">A five-hour train journey takes more than five hours of your day. You still need to check out, reach the station, allow for security and waiting, arrive, travel to the next hotel and settle in. Put that whole move into the plan before adding another visit.</p>
              <p className="safe-wrap mt-5 leading-7 text-mist">If you have about one week, use our <Link href="/guides/7-days-in-china" className="font-semibold text-moss underline decoration-moss/40 underline-offset-4">7-day China planning guide</Link> to judge what fits. If you have about ten days, the <Link href="/guides/10-days-in-china" className="font-semibold text-moss underline decoration-moss/40 underline-offset-4">10-day China guide</Link> looks at how extra time changes the route.</p>
            </section>

            <section aria-labelledby="main-bases" className="mt-20">
              <h2 id="main-bases" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">2. Decide how many places you actually need</h2>
              <p className="safe-wrap mt-6 border-s-2 border-gold ps-4 text-lg font-semibold leading-8">Every new city needs to earn its place.</p>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">Two main bases can give you a more comfortable trip and time to notice a place beyond its highlights. Three can bring more variety, but also more movement. Each extra city adds hotel changes, transfers, packing, finding your bearings and time that is no longer available for exploring.</p>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">Ask what the next stop adds that matters to you. A different landscape, a particular historical interest or time with local food and crafts may justify the move. Adding a famous name simply because it appears on many itineraries may not.</p>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">There is no single correct first-time route. You do not have to combine Beijing, Xi&apos;an and Shanghai, or follow anyone else&apos;s city list. Let your interests and the time between places shape the choice.</p>
            </section>

            <section aria-labelledby="travel-support" className="mt-20">
              <h2 id="travel-support" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">3. Decide how much help you actually need</h2>
              <p className="safe-wrap mt-6 text-lg leading-8 text-mist">You do not have to choose between doing everything yourself and having someone beside you every day. Decide which parts you are comfortable arranging and where support would make the journey easier.</p>
              <div className="mt-8 space-y-7">
                <div className="border-t border-gold/50 pt-5">
                  <h3 className="font-serif text-2xl font-semibold">Independent</h3>
                  <p className="safe-wrap mt-3 leading-7 text-mist">You handle transport, hotels, reservations and daily plans. This suits travelers who enjoy making their own decisions and are comfortable working through unfamiliar systems.</p>
                </div>
                <div className="border-t border-gold/50 pt-5">
                  <h3 className="font-serif text-2xl font-semibold">Hybrid</h3>
                  <p className="safe-wrap mt-3 leading-7 text-mist">You arrange help for more complex days or places and travel independently when things are simpler. Decide where the help matters before assuming it is needed throughout the trip.</p>
                </div>
                <div className="border-t border-gold/50 pt-5">
                  <h3 className="font-serif text-2xl font-semibold">Organized</h3>
                  <p className="safe-wrap mt-3 leading-7 text-mist">A private or group travel service coordinates more of the journey. You still need to understand the route, daily pace and inclusions, and decide how much flexibility you want.</p>
                </div>
              </div>
              <p className="safe-wrap mt-6 leading-7 text-mist">For that first decision, read <Link href="/guides/do-you-need-a-tour-guide-in-china" className="font-semibold text-moss underline decoration-moss/40 underline-offset-4">Do You Need a Tour Guide in China?</Link> If you prefer an organized trip, our <Link href="/guides/private-china-tour-vs-group-tour" className="font-semibold text-moss underline decoration-moss/40 underline-offset-4">private tour vs group tour comparison</Link> explains the next choice.</p>
            </section>

            <section aria-labelledby="travel-budget" className="mt-20">
              <h2 id="travel-budget" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">4. Set your budget after you know your travel style</h2>
              <p className="safe-wrap mt-6 text-lg leading-8 text-mist">A rough spending limit helps from the start, but a useful trip budget needs a clearer idea of how you will travel. The same ten days in China can have very different cost structures when you arrange everything independently, combine selected support with free time, or use private services throughout.</p>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">The main factors are the number of travelers and cities, hotel level, private vehicle use, guide days, included experiences and route complexity. Decide which of these matter to your trip before comparing totals.</p>
              <p className="safe-wrap mt-5 leading-7 text-mist">Our <Link href="/guides/private-china-tour-cost" className="font-semibold text-moss underline decoration-moss/40 underline-offset-4">guide to private China tour costs</Link> explains those budget choices in more detail.</p>
            </section>

            <section aria-labelledby="traveling-together" className="mt-20">
              <h2 id="traveling-together" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">5. Plan around the people traveling</h2>
              <p className="safe-wrap mt-6 text-lg leading-8 text-mist">The right route is not only about where you want to go. It is also about how the people traveling with you want to move through the day. Talk about energy, mobility, interests, pace, meal habits and rest needs, rather than using age alone as a guide.</p>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">A couple may need to balance different interests; a solo traveler may want both independence and occasional company. Families can plan around children&apos;s attention and meal times, while friends may need to agree on how many activities to share and when to split up.</p>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">With older parents, start with their actual comfort and interests, then check how walking, transfers and rest fit each day. Our guide to <Link href="/guides/china-with-older-parents" className="font-semibold text-moss underline decoration-moss/40 underline-offset-4">traveling to China with older parents</Link> covers those practical decisions.</p>
            </section>

            <section aria-labelledby="practical-systems" className="mt-20">
              <h2 id="practical-systems" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">6. Prepare the practical systems — without turning the trip into a checklist</h2>
              <p className="safe-wrap mt-6 text-lg leading-8 text-mist">Before departure, confirm your entry and visa requirements, payment options including mobile payment, internet and connectivity, maps and translation tools, intercity transport, and hotel and arrival details. Know how you will reach your first hotel and keep the essential booking information accessible.</p>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">Rules and digital tools change. Check current official requirements close to departure, and confirm that the services and tools you plan to use will work for you. You can prepare these essentials without turning every hour of the journey into another task.</p>
            </section>

            <section aria-labelledby="unplanned-china" className="mt-20">
              <h2 id="unplanned-china" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">7. Leave room for the China you did not plan</h2>
              <p className="safe-wrap mt-6 text-lg leading-8 text-mist">The Forbidden City, Great Wall, Bund and other historic sites are worth making time for when they fit your route. They can sit in the same journey as a breakfast street, a neighbourhood walk or an afternoon in a tea house. You do not need to choose one kind of China over the other.</p>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">At Local China Trip, we like to leave some room around the planned visits. A community park, a local restaurant, a market, a craft studio or an unexpected place found along the way can change what you remember about a day. Leave enough time to follow that interest without rushing to the next booking.</p>
              <p className="safe-wrap mt-7 border-s-2 border-gold ps-4 font-serif text-2xl font-semibold leading-9 text-moss">Tourist China is interesting.<br />Local China is what stays with you.</p>
            </section>

            <section aria-labelledby="first-trip-faq" className="mt-20">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Practical questions</p>
              <h2 id="first-trip-faq" className="safe-wrap mt-4 font-serif text-3xl font-semibold leading-tight sm:text-5xl">First Trip to China: FAQ</h2>
              <div className="mt-9 divide-y overflow-hidden rounded-lg border bg-white hairline">
                {faqs.map(({ question, answer, link }) => (
                  <details key={question} className="group p-6 open:bg-bone sm:p-8">
                    <summary className="safe-wrap cursor-pointer list-none font-serif text-xl font-semibold leading-8 sm:text-2xl">{question}</summary>
                    <p className="safe-wrap mt-4 leading-7 text-mist">{answer}{link ? <> <Link href={link.href} className="font-semibold text-moss underline decoration-moss/40 underline-offset-4">{link.text}</Link></> : null}</p>
                  </details>
                ))}
              </div>
            </section>
          </div>

          <section className="bg-ink px-5 py-16 text-cream sm:px-8 lg:px-24 lg:py-20">
            <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <h2 className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">Still not sure how to put the pieces together?</h2>
                <p className="safe-wrap mt-5 max-w-3xl text-lg leading-8 text-cream/90">Tell us your dates, travelers, interests and preferred pace, and we can help you shape a first China trip around the way you actually want to travel.</p>
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

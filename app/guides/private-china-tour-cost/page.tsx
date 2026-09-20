import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "@/components/SiteChrome";
import { StructuredData } from "@/components/StructuredData";
import { absoluteUrl, breadcrumbSchema, createMetadata } from "@/lib/seo";

const path = "/guides/private-china-tour-cost";
const title = "Private China Tour Cost 2026 | Local China Trip";
const description = "See realistic 2026 private China tour cost ranges, what affects your quote, what is usually included, and how group size, hotels and route choices change the price.";

export const metadata: Metadata = createMetadata({
  title,
  description,
  path,
});

const faqs = [
  {
    question: "How much is a private tour in China per day?",
    answer: "A useful planning range from publicly listed 2026 multi-day private-tour prices is roughly US$150–350 per person per day, excluding international flights. Premium trips can cost more, and the real quote depends on the group, hotels, route and service scope.",
  },
  {
    question: "Is a private China tour cheaper for four people than for two?",
    answer: "The total trip will usually cost more for four people, but the per-person price can be lower because a vehicle, driver and some local services are shared. The exact difference depends on room arrangements and the route.",
  },
  {
    question: "Do I need a private guide every day in China?",
    answer: "No. Independent time works well for many neighbourhood walks, shopping, free evenings and straightforward city days. A guide is more valuable when reservations, transfers, cultural interpretation or the needs of children and older travelers make the day more complicated.",
  },
  {
    question: "Are hotels included in private China tour prices?",
    answer: "Sometimes. Some quotes combine hotels with transport and guiding, while others cover only local services. Check the hotel category, location, room type, breakfast and cancellation terms rather than assuming they are included.",
  },
  {
    question: "Can I plan part of the trip myself and use a guide only on certain days?",
    answer: "Yes. A mixed plan can combine your own hotel or rail bookings with private support for the Great Wall, complex attractions, remote areas, special experiences or difficult transfers.",
  },
] as const;

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How Much Does a Private China Tour Cost in 2026?",
  description,
  url: absoluteUrl(path),
  mainEntityOfPage: absoluteUrl(path),
  datePublished: "2026-09-20",
  dateModified: "2026-09-20",
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

const includedRows = [
  ["Itinerary planning", "Often part of an arranged journey", "Major redesigns or planning-only work may be priced separately"],
  ["Private guide", "On the guided days named in the itinerary", "Free days and independently explored days"],
  ["Private vehicle and driver", "On the vehicle days named in the itinerary", "Extra hours, route changes or days using public transport"],
  ["Hotel", "Sometimes included in a complete quote", "Room upgrades, city taxes or independently booked stays"],
  ["Breakfast", "Often included when the hotel is included", "Other hotel plans or early departures"],
  ["Attraction tickets", "Often included when specific visits are agreed", "Optional or added activities"],
  ["High-speed rail", "May be included in a complete arrangement", "Seat upgrades or journeys you book yourself"],
  ["Domestic flights", "Sometimes included on long routes", "Baggage differences, upgrades or schedule changes"],
  ["Lunch and dinner", "Sometimes included for selected experiences", "Most flexible daily meal choices"],
  ["Special experiences", "Included when specifically named", "Optional workshops, performances or private access arrangements"],
  ["Travel insurance", "Usually arranged by the traveler", "Check the policy in your own country or region"],
  ["International flights", "Normally outside the land quote", "Booked separately by the traveler"],
] as const;

export default function PrivateChinaTourCostGuide() {
  return (
    <>
      <StructuredData
        data={[
          articleSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Private China Tour Cost Guide", path },
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
                <span>Cost guide</span>
              </nav>
              <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-gold">2026 planning guide</p>
              <p className="mt-3 text-sm text-mist">Last reviewed: September 2026</p>
              <h1 className="safe-wrap mt-5 max-w-4xl font-serif text-4xl font-semibold leading-[1.08] sm:text-6xl lg:text-7xl">
                How Much Does a Private China Tour Cost in 2026?
              </h1>
              <p className="safe-wrap mt-7 max-w-3xl text-lg leading-8 text-mist sm:text-xl">
                A practical way to read prices, compare quotes and decide where private support will genuinely improve your trip.
              </p>

              <section aria-labelledby="quick-answer" className="mt-10 rounded-lg border border-gold/40 bg-white p-6 shadow-card sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Quick answer</p>
                <h2 id="quick-answer" className="safe-wrap mt-3 font-serif text-2xl font-semibold sm:text-3xl">A realistic starting range, not a fixed price</h2>
                <p className="safe-wrap mt-5 text-lg leading-8">
                  Current publicly listed 2026 prices for multi-day private China trips commonly suggest a useful planning range of roughly <strong>US$150–350 per person per day</strong>, excluding international flights. Premium or luxury trips can cost more.
                </p>
                <p className="safe-wrap mt-4 leading-7 text-mist">
                  There is no honest single daily price for every China trip. Party size, hotel level, cities, intercity transport, private vehicle use and the number of guided days can change a quote substantially.
                </p>
                <p className="safe-wrap mt-5 border-s-2 border-gold ps-4 text-sm font-semibold leading-6 text-moss">
                  Planning reference, not a fixed Local China Trip quote.
                </p>
                <aside className="mt-6 border-t hairline pt-5 text-sm leading-6 text-mist" aria-label="Market reference sources">
                  <p><strong className="text-ink">Market reference.</strong> This planning range was checked against publicly listed 2026 private-tour prices from several China travel operators in September 2026. It is a market reference, not an official industry average and not a fixed Local China Trip price.</p>
                  <p className="mt-2">
                    Sources:{" "}
                    <a href="https://www.travelchinaguide.com/tour/" target="_blank" rel="noopener noreferrer" className="underline decoration-mist/50 underline-offset-4 hover:text-moss">TravelChinaGuide</a>,{" "}
                    <a href="https://www.cloongtrip.com/china-private-tour-cost-2026/" target="_blank" rel="noopener noreferrer" className="underline decoration-mist/50 underline-offset-4 hover:text-moss">ShenYou / CloongTrip</a>, and{" "}
                    <a href="https://chinafantasytravel.com/how-much-does-a-private-china-tour-cost/" target="_blank" rel="noopener noreferrer" className="underline decoration-mist/50 underline-offset-4 hover:text-moss">China Fantasy Travel</a>. These are public operator examples only; Local China Trip has no stated partnership with them.
                  </p>
                </aside>
              </section>
            </div>
          </header>

          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-24">
            <section aria-labelledby="meaning">
              <h2 id="meaning" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">What does “private China tour” actually mean?</h2>
              <p className="safe-wrap mt-6 text-lg leading-8 text-mist">
                It is not one standard product. One quote may cover a complete journey, while another covers only selected local services. Depending on the plan, it may include itinerary design, guides on agreed days, a private vehicle and driver, hotels, attraction tickets, high-speed trains or domestic transport, airport and station transfers, local experiences and on-the-ground support.
              </p>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">
                That is why two quotes with a similar total can represent very different trips. Before comparing prices, compare exactly what each quote asks someone else to arrange for you.
              </p>
            </section>

            <section aria-labelledby="price-factors" className="mt-20">
              <h2 id="price-factors" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">What changes the price most?</h2>
              <div className="mt-9 grid gap-5 sm:grid-cols-2">
                <div className="rounded-lg border bg-white p-6 hairline">
                  <h3 className="font-serif text-2xl font-semibold">Party size</h3>
                  <p className="safe-wrap mt-3 leading-7 text-mist">A vehicle, driver and some local services are fixed or partly fixed costs. A four-person trip does not simply cost twice as much as a two-person trip, so the per-person figure often falls when a family or group of friends shares those services. Room arrangements still matter.</p>
                </div>
                <div className="rounded-lg border bg-white p-6 hairline">
                  <h3 className="font-serif text-2xl font-semibold">Hotel level</h3>
                  <p className="safe-wrap mt-3 leading-7 text-mist">A comfortable local three-star hotel, a four-star stay and a five-star or premium property can produce very different totals. Location and room type matter too, especially in Beijing, Shanghai and busy travel periods.</p>
                </div>
                <div className="rounded-lg border bg-white p-6 hairline">
                  <h3 className="font-serif text-2xl font-semibold">Number of cities</h3>
                  <p className="safe-wrap mt-3 leading-7 text-mist">Beijing and Shanghai are not the same logistical task as Beijing, Xi’an, Chengdu, Zhangjiajie and Shanghai. More cities mean more rail or flights, station transfers, hotel changes and coordination.</p>
                </div>
                <div className="rounded-lg border bg-white p-6 hairline">
                  <h3 className="font-serif text-2xl font-semibold">Season</h3>
                  <p className="safe-wrap mt-3 leading-7 text-mist">Major Chinese holidays and popular travel periods affect hotel availability, transport, attraction reservations and private vehicles. A flexible date can sometimes matter more than changing one small activity.</p>
                </div>
                <div className="rounded-lg border bg-white p-6 hairline sm:col-span-2">
                  <h3 className="font-serif text-2xl font-semibold">How many days need a guide or private vehicle</h3>
                  <p className="safe-wrap mt-3 leading-7 text-mist">Not every day needs full private support. A relaxed Shanghai neighbourhood day may be perfectly reasonable on your own. Complicated transfers, timed reservations, cultural interpretation, remote places, tight schedules, or travel with children and older parents can benefit much more from a local guide or driver.</p>
                </div>
              </div>
            </section>

            <section aria-labelledby="included" className="mt-20">
              <h2 id="included" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">What is usually included—and what may be extra?</h2>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">There is no industry-wide inclusion list. The table shows common patterns, but the written quote should always take priority.</p>
              <div className="mt-8 overflow-x-auto rounded-lg border hairline bg-white">
                <table className="w-full min-w-[760px] border-collapse text-start text-sm">
                  <thead className="bg-ink text-cream">
                    <tr>
                      <th scope="col" className="px-5 py-4 text-start font-semibold">Item</th>
                      <th scope="col" className="px-5 py-4 text-start font-semibold">Often included when</th>
                      <th scope="col" className="px-5 py-4 text-start font-semibold">Sometimes or often extra</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y hairline">
                    {includedRows.map(([item, included, extra]) => (
                      <tr key={item} className="align-top">
                        <th scope="row" className="px-5 py-4 text-start font-semibold">{item}</th>
                        <td className="px-5 py-4 leading-6 text-mist">{included}</td>
                        <td className="px-5 py-4 leading-6 text-mist">{extra}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section aria-labelledby="budget-shape" className="mt-20">
              <h2 id="budget-shape" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">A useful way to think about the budget</h2>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">You do not have to choose between arranging everything yourself and buying private service every day.</p>
              <div className="mt-9 grid gap-5 lg:grid-cols-3">
                <div className="rounded-lg border bg-bone p-6 hairline">
                  <p className="text-xs font-semibold text-gold">01</p>
                  <h3 className="safe-wrap mt-3 font-serif text-2xl font-semibold">Independent travel + occasional local help</h3>
                  <p className="safe-wrap mt-4 leading-7 text-mist">Useful for cost-conscious travelers who are happy booking hotels and rail, but want help for one complicated day or a particular local experience.</p>
                </div>
                <div className="rounded-lg border border-moss/30 bg-white p-6 shadow-card">
                  <p className="text-xs font-semibold text-gold">02</p>
                  <h3 className="safe-wrap mt-3 font-serif text-2xl font-semibold">Private support on selected days</h3>
                  <p className="safe-wrap mt-4 leading-7 text-mist">A good fit when most city time is independent, while the Great Wall, complex transport, cultural visits or remote areas receive local support.</p>
                </div>
                <div className="rounded-lg border bg-bone p-6 hairline">
                  <p className="text-xs font-semibold text-gold">03</p>
                  <h3 className="safe-wrap mt-3 font-serif text-2xl font-semibold">Fully arranged private journey</h3>
                  <p className="safe-wrap mt-4 leading-7 text-mist">Best for travelers who want hotels, transport, transfers, reservations and the daily route coordinated as one plan, with the exact service scope agreed in advance.</p>
                </div>
              </div>
            </section>
          </div>

          <section className="bg-ink px-5 py-14 text-cream sm:px-8 lg:px-24">
            <div className="mx-auto grid max-w-5xl gap-7 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <h2 className="safe-wrap font-serif text-3xl font-semibold sm:text-4xl">Start with the route, then decide what is worth arranging</h2>
                <p className="safe-wrap mt-4 max-w-3xl leading-7 text-mist">See how a real sequence of cities and travel days changes the service you may need. The <Link href="/travel-planning/china-culture-7" className="font-semibold text-gold underline decoration-gold/50 underline-offset-4">7-day Beijing–Suzhou–Shanghai itinerary</Link> is one useful example.</p>
              </div>
              <Link href="/travel-planning" className="inline-flex min-h-12 items-center justify-center rounded-md bg-cream px-7 py-3 text-center text-sm font-semibold text-ink transition hover:bg-gold">Explore Travel Planning <span className="ms-2">→</span></Link>
            </div>
          </section>

          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-24">
            <section aria-labelledby="worth-paying">
              <h2 id="worth-paying" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">Where is private support actually worth paying for?</h2>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">The answer depends on the traveler, not only the place. Pay for help where it removes a real difficulty or adds understanding—not simply because every day has an empty box on an itinerary.</p>
              <div className="mt-9 grid gap-6 md:grid-cols-2">
                <div className="rounded-lg bg-moss p-6 text-cream sm:p-8">
                  <h3 className="font-serif text-2xl font-semibold">Worth considering private support</h3>
                  <ul className="mt-5 space-y-3 leading-7 text-cream/90">
                    <li>• Your first day after a long international flight</li>
                    <li>• A Great Wall day</li>
                    <li>• Complicated timed-entry attractions</li>
                    <li>• Travel with children or older parents</li>
                    <li>• Remote countryside and difficult local transfers</li>
                    <li>• Cultural experiences needing explanation or introductions</li>
                    <li>• Tight schedules and complex airport or station transfers</li>
                  </ul>
                </div>
                <div className="rounded-lg border bg-white p-6 hairline sm:p-8">
                  <h3 className="font-serif text-2xl font-semibold">Often reasonable to do independently</h3>
                  <ul className="mt-5 space-y-3 leading-7 text-mist">
                    <li>• Relaxed exploration in central Shanghai</li>
                    <li>• Neighbourhood walks and shopping</li>
                    <li>• Free evenings</li>
                    <li>• Straightforward high-speed rail journeys</li>
                    <li>• Days deliberately kept open for rest or spontaneous choices</li>
                  </ul>
                </div>
              </div>
            </section>

            <section aria-labelledby="compare-quotes" className="mt-20">
              <h2 id="compare-quotes" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">How to compare two private China tour quotes</h2>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">Do not compare only the total. Put the two written proposals side by side and check the details below.</p>
              <ul className="mt-8 grid gap-x-8 gap-y-3 rounded-lg border bg-white p-6 hairline sm:grid-cols-2 sm:p-8">
                {[
                  "Hotel category, location and room type",
                  "Exactly how many guided days",
                  "Private vehicle days and permitted hours",
                  "Attraction tickets",
                  "High-speed rail class",
                  "Domestic flights and baggage",
                  "Airport and station transfers",
                  "Included meals",
                  "Optional experiences",
                  "Cancellation terms",
                  "Payment schedule",
                  "Whether shopping stops are included",
                  "What happens if the itinerary changes",
                ].map((item) => <li key={item} className="safe-wrap flex gap-3 leading-7 text-mist"><span className="text-gold" aria-hidden="true">✓</span><span>{item}</span></li>)}
              </ul>
            </section>

            <section aria-labelledby="local-view" className="mt-20 rounded-lg border-s-4 border-gold bg-bone p-7 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">A local planning view</p>
              <h2 id="local-view" className="safe-wrap mt-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl">Private should not mean paying for a guide and car every hour</h2>
              <p className="safe-wrap mt-6 text-lg leading-8 text-mist">Sometimes the best itinerary mixes private support, independent time and local experiences. This is how I prefer to plan China journeys: spend money where local help genuinely improves the trip, and leave space where you do not need it.</p>
              <p className="safe-wrap mt-5 leading-7 text-mist">You can read more about the <Link href="/about" className="font-semibold text-moss underline decoration-moss/40 underline-offset-4">Local China planning approach</Link>, or review practical questions in the <Link href="/faq-for-foreign-travelers" className="font-semibold text-moss underline decoration-moss/40 underline-offset-4">FAQ for foreign travelers</Link>.</p>
              <p className="safe-wrap mt-4 leading-7 text-mist">Wondering whether you need a guide every day? Read: <Link href="/guides/do-you-need-a-tour-guide-in-china" className="font-semibold text-moss underline decoration-moss/40 underline-offset-4">Do You Need a Tour Guide in China?</Link></p>
            </section>

            <section aria-labelledby="cost-faq" className="mt-20">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Practical questions</p>
              <h2 id="cost-faq" className="safe-wrap mt-4 font-serif text-3xl font-semibold leading-tight sm:text-5xl">Private China tour cost FAQ</h2>
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
                <h2 className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">Planning a private trip to China?</h2>
                <p className="safe-wrap mt-5 max-w-3xl text-lg leading-8 text-mist">Send me your travel dates, group size, cities you are considering and the pace you prefer. I can help you work out which parts are worth arranging privately and which parts you can comfortably do on your own.</p>
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

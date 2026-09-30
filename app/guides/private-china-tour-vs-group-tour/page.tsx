import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "@/components/SiteChrome";
import { StructuredData } from "@/components/StructuredData";
import { absoluteUrl, breadcrumbSchema, createMetadata } from "@/lib/seo";

const path = "/guides/private-china-tour-vs-group-tour";
const title = "Private China Tour vs Group Tour: Which Fits Your Trip? | Local China Trip";
const headline = "Private China Tour vs Group Tour: Which Fits Your Trip?";
const description = "Compare private and group tours in China by cost, pace, flexibility, guides, transport and travel style — and see which option fits your trip.";

export const metadata: Metadata = createMetadata({
  title,
  description,
  path,
});

const comparisonRows = [
  ["Dates", "Your dates", "Fixed departures"],
  ["Route", "Flexible", "Predetermined"],
  ["Pace", "Adjustable", "Group pace"],
  ["Guide", "Dedicated or arranged as needed", "Shared"],
  ["Transport", "Usually private", "Shared"],
  ["Hotels", "More choice", "Usually preset"],
  ["Meals", "Easier to personalize", "Often arranged"],
  ["Social side", "Your own party", "Meet other travelers"],
  ["Cost", "Usually higher for 1–2 travelers", "Usually lower per person"],
  ["Best suited to", "Families, older travelers, special interests and complex trips", "Solo travelers, budget-focused travelers and classic routes"],
] as const;

const travelerScenarios = [
  {
    traveler: "Solo traveler",
    group: "A group tour can reduce the per-person cost, remove much of the planning and provide company during a first trip.",
    private: "Private support may suit a solo traveler with limited time, a specialist interest or a route that is difficult to organize alone.",
  },
  {
    traveler: "Couple",
    group: "A group can work well when both travelers are comfortable with the same fixed route and want to keep the budget predictable.",
    private: "A private trip becomes more useful when the couple wants particular hotels, slower mornings, food-focused days or more time in selected places.",
  },
  {
    traveler: "Family with children",
    group: "A family-friendly group can be simple if the departure times, walking level and meal arrangements suit the children.",
    private: "Private pacing makes it easier to shorten a museum visit, change lunch, add a break or respond when a child is tired.",
  },
  {
    traveler: "Traveling with older parents",
    group: "A group is reasonable when everyone is comfortable with its walking demands, boarding points and daily timetable.",
    private: "Private arrangements help when rest time, mobility, practical drop-off points and day-by-day energy need closer attention.",
  },
  {
    traveler: "Friends traveling together",
    group: "Friends may enjoy joining a larger group when social travel and a lower per-person price matter more than changing the route.",
    private: "As the party grows, sharing a private vehicle and guide can make customized travel more practical while keeping the group together.",
  },
  {
    traveler: "Special-interest traveler",
    group: "A themed group can be a good match when its published focus already fits the interest, such as history, photography or food.",
    private: "Private planning can be more useful when the interest is very specific or requires craft studios, local introductions, unusual timing or less-standard places.",
  },
] as const;

const faqs = [
  {
    question: "Are private tours in China worth it?",
    answer: "They can be when personal pacing, flexible dates, easier logistics or specific interests materially improve the trip. They may not be worth the extra cost when you are happy with a classic fixed route and do not need much customization.",
  },
  {
    question: "Are group tours cheaper than private tours in China?",
    answer: "Group tours are usually cheaper per person because transport, guiding and some other services are shared. The difference depends on party size, hotels, inclusions and route: a private trip shared by several relatives or friends can have a different cost pattern from a private trip for one person.",
  },
  {
    question: "Is a private China tour better for older travelers?",
    answer: "It can be more suitable when walking distance, rest time, meals, vehicle access or daily energy need adjustment. A group tour can still work if its pace and physical demands are clearly explained and genuinely suit everyone traveling.",
  },
  {
    question: "Can I combine private touring with independent travel in China?",
    answer: "Yes. A hybrid trip might include airport pickup, guided days in historically complex cities, a private car for selected day trips and independent time for Shanghai, free evenings or simple rail journeys.",
  },
  {
    question: "Do private China tours have fixed itineraries?",
    answer: "They normally have an agreed route because hotels, trains, tickets and guides may need advance booking. The difference is that the route can be designed around your party, and reasonable daily adjustments are often easier than they are on a shared group departure.",
  },
] as const;

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline,
  description,
  url: absoluteUrl(path),
  mainEntityOfPage: absoluteUrl(path),
  datePublished: "2026-09-30",
  dateModified: "2026-09-30",
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

export default function PrivateChinaTourVsGroupTourGuide() {
  return (
    <>
      <StructuredData
        data={[
          articleSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
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
                <span>Private tour or group tour?</span>
              </nav>
              <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-gold">China travel decisions</p>
              <p className="mt-3 text-sm text-mist">Last reviewed: September 2026</p>
              <h1 className="safe-wrap mt-5 max-w-5xl font-serif text-4xl font-semibold leading-[1.08] sm:text-6xl lg:text-7xl">
                {headline}
              </h1>
              <p className="safe-wrap mt-7 max-w-3xl text-lg leading-8 text-mist sm:text-xl">
                A practical comparison of cost, pace, flexibility and the kind of support each travel style provides.
              </p>

              <section aria-labelledby="quick-answer" className="mt-10 rounded-lg border border-gold/40 bg-white p-6 shadow-card sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Quick answer</p>
                <h2 id="quick-answer" className="safe-wrap mt-3 font-serif text-2xl font-semibold sm:text-3xl">Choose around the way you want to travel</h2>
                <p className="safe-wrap mt-5 text-lg leading-8">
                  A group tour usually makes more sense if price, simplicity and meeting other travelers matter most.
                </p>
                <p className="safe-wrap mt-4 leading-7 text-mist">
                  A private tour usually makes more sense when you need more flexibility around dates, pace, mobility, food, hotels or personal interests.
                </p>
                <p className="safe-wrap mt-4 font-semibold leading-7 text-moss">
                  Neither is automatically better. The right choice depends on how you want to travel.
                </p>
              </section>
            </div>
          </header>

          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-24">
            <section aria-labelledby="comparison-table">
              <h2 id="comparison-table" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">Private tour vs group tour at a glance</h2>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">The table describes common arrangements, not rules that apply to every operator or itinerary. Read the exact inclusions and daily schedule before booking.</p>
              <div className="mt-8 overflow-hidden rounded-lg border hairline bg-white">
                <table className="w-full table-fixed border-collapse text-start text-[12px] sm:text-sm">
                  <thead className="bg-ink text-cream">
                    <tr>
                      <th scope="col" className="w-[24%] break-words px-2 py-4 text-start font-semibold sm:px-5">Compare</th>
                      <th scope="col" className="w-[38%] break-words px-2 py-4 text-start font-semibold sm:px-5">Private tour</th>
                      <th scope="col" className="w-[38%] break-words px-2 py-4 text-start font-semibold sm:px-5">Group tour</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y hairline">
                    {comparisonRows.map(([item, privateTour, groupTour]) => (
                      <tr key={item} className="align-top">
                        <th scope="row" className="break-words px-2 py-4 text-start font-semibold sm:px-5">{item}</th>
                        <td className="break-words px-2 py-4 leading-5 text-mist sm:px-5 sm:leading-6">{privateTour}</td>
                        <td className="break-words px-2 py-4 leading-5 text-mist sm:px-5 sm:leading-6">{groupTour}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="safe-wrap mt-6 border-s-2 border-gold ps-4 text-lg font-semibold leading-8">Here is when paying for a private tour genuinely changes the trip — and when it probably does not.</p>
            </section>

            <section aria-labelledby="group-tour" className="mt-20">
              <h2 id="group-tour" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">1. When a group tour makes more sense</h2>
              <p className="safe-wrap mt-6 text-lg leading-8 text-mist">A group tour is not simply a lesser version of a private trip. Shared transport, guiding and fixed departures can lower the per-person cost and remove many planning decisions. Once you understand the itinerary and inclusions, the main logistics are already organized.</p>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">That structure suits travelers who prefer a clear schedule, enjoy meeting other people and are comfortable moving at the group&apos;s pace. It can work especially well on a classic first-time route where the main priorities are well-known places and the traveler does not need particular hotels, meals or daily adjustments.</p>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">A published seven- or ten-day itinerary also makes the trade-off easier to judge. Compare the amount of movement in our <Link href="/guides/7-days-in-china" className="font-semibold text-moss underline decoration-moss/40 underline-offset-4">7-day China guide</Link> and <Link href="/guides/10-days-in-china" className="font-semibold text-moss underline decoration-moss/40 underline-offset-4">10-day China guide</Link> with the pace promised by the group departure.</p>
            </section>

            <section aria-labelledby="private-tour" className="mt-20 rounded-lg bg-bone p-7 sm:p-10">
              <h2 id="private-tour" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">2. When a private tour makes more sense</h2>
              <p className="safe-wrap mt-6 text-lg leading-8 text-mist">The practical value of private travel is not luxury. It is control over the trip: which dates work, how quickly the day moves, where you stay, what you eat and which interests receive more time.</p>
              <div className="mt-8 grid gap-x-10 gap-y-7 sm:grid-cols-2">
                {[
                  ["Dates and pace", "Choose dates around your own flights and adjust mornings, walking time and rest without asking a larger group to change."],
                  ["Children and older travelers", "Build the day around attention spans, energy, toilets, meal timing, practical boarding points and mobility needs."],
                  ["Food and hotels", "Choose hotel location and comfort level, then handle dietary preferences or local restaurant interests more deliberately."],
                  ["Specific interests", "Give more time to history, food, tea, technology, crafts, architecture or another subject instead of following a general highlights route."],
                  ["Less-standard places", "Combine major sights with neighbourhoods, markets, tea houses, craft studios and local routines that may not fit a fixed group program."],
                  ["Changes during the trip", "Respond more easily when weather, tiredness or a new local recommendation makes a reasonable change worthwhile."],
                ].map(([heading, text]) => (
                  <div key={heading} className="border-t border-gold/50 pt-5">
                    <h3 className="font-serif text-2xl font-semibold">{heading}</h3>
                    <p className="safe-wrap mt-3 leading-7 text-mist">{text}</p>
                  </div>
                ))}
              </div>
            </section>

            <section aria-labelledby="daily-difference" className="mt-20">
              <h2 id="daily-difference" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">3. What actually changes during the day</h2>
              <p className="safe-wrap mt-6 text-lg leading-8 text-mist">“Flexible” can sound vague until the two styles are placed in the same day. On a group Great Wall visit, the meeting time, vehicle, lunch and departure are coordinated for everyone. That efficiency is useful, but one traveler cannot normally decide to leave later or stay much longer.</p>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">On a private day, your party might start later after a long flight, select a Wall section that fits its walking ability and return when an older traveler has had enough. In Beijing or Shanghai, a group may use one restaurant and leave each stop at the agreed time. A private party can linger over a good conversation in a tea house, shorten a place that holds little interest, or replace it with a market, neighbourhood or local restaurant when the bookings allow.</p>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">The famous sights still matter. Private travel simply makes it easier to place the Forbidden City, Great Wall or Bund beside slower moments of daily life, rather than treating one as more “real” than the other.</p>
            </section>
          </div>

          <section className="bg-ink px-5 py-16 text-cream sm:px-8 lg:px-24 lg:py-20">
            <div className="mx-auto max-w-5xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">A flexible middle ground</p>
              <h2 className="safe-wrap mt-4 max-w-4xl font-serif text-3xl font-semibold leading-tight sm:text-5xl">4. Private does not mean guided every minute</h2>
              <p className="safe-wrap mt-6 max-w-4xl text-lg leading-8 text-mist">A private journey does not require a guide from breakfast until bedtime. It can combine airport pickup, guided days in more complex cities, a private car where it saves time, independent days, selected local experiences and free evenings.</p>
              <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  "Arrival pickup and practical orientation",
                  "A guided historical day in Beijing",
                  "A private vehicle for the Great Wall",
                  "A self-guided Shanghai day",
                  "A selected cultural experience in Suzhou",
                  "Free evenings and simple rail journeys",
                ].map((item) => <div key={item} className="rounded-md border border-white/10 bg-charcoal p-5 leading-7 text-cream/85">{item}</div>)}
              </div>
              <p className="safe-wrap mt-8 border-s-2 border-gold ps-5 text-lg font-semibold leading-8">You pay for local help where it genuinely improves the trip, and keep your independence where it does not.</p>
              <p className="safe-wrap mt-6 max-w-4xl leading-7 text-mist">For a fuller explanation of independent days, guided days and hybrid travel, read <Link href="/guides/do-you-need-a-tour-guide-in-china" className="font-semibold text-gold underline decoration-gold/50 underline-offset-4">Do You Need a Tour Guide in China?</Link></p>
            </div>
          </section>

          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-24">
            <section aria-labelledby="price">
              <h2 id="price" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">5. What about price?</h2>
              <p className="safe-wrap mt-6 text-lg leading-8 text-mist">Group tours are often less expensive per person because services are shared. Private-trip pricing changes with the number of travelers, cities, hotel level, private vehicle use, guide days, route complexity and included experiences. A family or group of friends can share some private service costs, while a solo traveler carries them alone.</p>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">Price only becomes comparable when the inclusions are comparable. Check hotels, transport, tickets, meals, guide days, shopping stops and change terms rather than judging two trips by the headline total.</p>
              <p className="safe-wrap mt-5 leading-7 text-mist"><Link href="/guides/private-china-tour-cost" className="font-semibold text-moss underline decoration-moss/40 underline-offset-4">See our guide to private China tour costs.</Link></p>
            </section>

            <section aria-labelledby="who-should-choose" className="mt-20">
              <h2 id="who-should-choose" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">6. Who should choose what?</h2>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">Use your actual party and route to make the decision. None of these traveler types has an automatic winner.</p>
              <div className="mt-9 grid gap-6 md:grid-cols-2">
                {travelerScenarios.map(({ traveler, group, private: privateTour }) => (
                  <section key={traveler} className="rounded-lg border bg-white p-6 hairline sm:p-8">
                    <h3 className="font-serif text-2xl font-semibold">{traveler}</h3>
                    <p className="safe-wrap mt-5 leading-7 text-mist"><strong className="text-ink">Group may fit when:</strong> {group}</p>
                    <p className="safe-wrap mt-4 leading-7 text-mist"><strong className="text-ink">Private may fit when:</strong> {privateTour}</p>
                    {traveler === "Traveling with older parents" ? (
                      <p className="safe-wrap mt-4 text-sm leading-6 text-mist">For more detail, read <Link href="/guides/china-with-older-parents" className="font-semibold text-moss underline decoration-moss/40 underline-offset-4">Traveling to China with Older Parents</Link>.</p>
                    ) : null}
                  </section>
                ))}
              </div>
            </section>

            <section aria-labelledby="tour-style-faq" className="mt-20">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Practical questions</p>
              <h2 id="tour-style-faq" className="safe-wrap mt-4 font-serif text-3xl font-semibold leading-tight sm:text-5xl">Private vs Group Tours in China: FAQ</h2>
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
                <h2 className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">Still deciding how much support your trip needs?</h2>
                <p className="safe-wrap mt-5 max-w-3xl text-lg leading-8 text-mist">Tell us your dates, group, cities, interests and preferred pace. We can help you identify where private arrangements would change the trip and where a simpler option may be enough.</p>
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

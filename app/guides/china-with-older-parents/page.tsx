import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Header } from "@/components/SiteChrome";
import { StructuredData } from "@/components/StructuredData";
import { absoluteUrl, breadcrumbSchema, createMetadata } from "@/lib/seo";

const path = "/guides/china-with-older-parents";
const title = "China With Older Parents: A Comfortable Travel Guide | Local China Trip";
const description = "Planning a China trip with older parents? Learn how to reduce walking, hotel changes and rushed transfers while keeping the journey interesting, flexible and comfortable.";

export const metadata: Metadata = createMetadata({
  title,
  description,
  path,
});

const faqs = [
  {
    question: "Is China suitable for older travelers?",
    answer: "It can be. China offers comfortable hotels, extensive rail and flight connections, private transport and a wide range of cultural experiences. The route still needs to match the individual traveler’s walking tolerance, preferred pace and recovery time. Large sites, stairs, standing and frequent hotel changes deserve particular attention.",
  },
  {
    question: "How many cities should older travelers visit in China?",
    answer: "There is no fixed number, but two or three bases often work well for a 7–10 day first trip. Fewer bases reduce packing, station transfers and repeated check-in. Travelers who recover quickly and enjoy a busy pace may choose more, while others may prefer longer stays and day trips.",
  },
  {
    question: "Is high-speed rail comfortable for older travelers in China?",
    answer: "It can be comfortable, especially on routes where stations are more convenient than airports and the journey is not excessively long. The complete experience also includes reaching a large station, security, boarding and luggage handling, so compare the full door-to-door journey rather than the seat time alone.",
  },
  {
    question: "Do older travelers need a private car in China?",
    answer: "Not every day. A private car can be valuable for airport arrivals, the Great Wall, suburban sights, countryside trips or days when drop-off points and rest timing need flexibility. On an easy central-city day, a taxi, ride-hailing service or short walk may be perfectly reasonable.",
  },
  {
    question: "Is a private guide useful when traveling with older parents?",
    answer: "A private guide can help adjust walking, explain large historical sites, coordinate entrances and change the day when energy drops. That does not mean every day needs guiding. Many families combine private support on complex days with independent meals, neighbourhood time and rest.",
  },
] as const;

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Traveling China With Older Parents: How to Plan a Comfortable Trip",
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

const planningQuestions = [
  "How long can they comfortably walk on level ground?",
  "Are stairs manageable?",
  "Is standing harder than walking?",
  "How often do they need to sit?",
  "Can they manage luggage in a large station?",
  "Are early mornings difficult?",
  "Do they normally need recovery time after a long day?",
  "Do they use a cane, walker or wheelchair?",
] as const;

export default function ChinaWithOlderParentsGuide() {
  return (
    <>
      <StructuredData
        data={[
          articleSchema,
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "China With Older Parents", path },
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
                <span>China With Older Parents</span>
              </nav>
              <p className="mt-10 text-xs font-semibold uppercase tracking-[0.2em] text-gold">Comfortable China travel planning</p>
              <p className="mt-3 text-sm text-mist">Last reviewed: September 2026</p>
              <h1 className="safe-wrap mt-5 max-w-5xl font-serif text-4xl font-semibold leading-[1.08] sm:text-6xl lg:text-7xl">
                Traveling China With Older Parents: How to Plan a Comfortable Trip
              </h1>
              <p className="safe-wrap mt-7 max-w-3xl text-lg leading-8 text-mist sm:text-xl">
                The goal is not to make the trip less interesting. It is to remove avoidable effort so your family can enjoy the places that matter.
              </p>

              <section aria-labelledby="quick-answer" className="mt-10 rounded-lg border border-gold/40 bg-white p-6 shadow-card sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Quick answer</p>
                <h2 id="quick-answer" className="safe-wrap mt-3 font-serif text-2xl font-semibold sm:text-3xl">China can work very well—if the itinerary is built around real comfort</h2>
                <p className="safe-wrap mt-5 text-lg leading-8">
                  China can work very well for a trip with older parents, but a standard fast-paced itinerary often does not. The biggest planning mistakes are usually too many cities, too much walking, frequent hotel changes and assuming that every famous attraction fits comfortably into the same day.
                </p>
                <p className="safe-wrap mt-4 leading-7 text-mist">
                  A better route usually means fewer bases, centrally located hotels, lighter arrival days, one main sightseeing focus at a time and enough flexibility to shorten or change a day when energy drops.
                </p>
                <p className="safe-wrap mt-4 leading-7 text-mist">
                  Age alone should not decide the itinerary. Walking tolerance, stairs, standing time, luggage handling and recovery time matter more.
                </p>
                <p className="safe-wrap mt-5 border-s-2 border-gold ps-4 text-sm font-semibold leading-6 text-moss">This is travel-planning guidance, not medical advice.</p>
              </section>
            </div>
          </header>

          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-24">
            <section aria-labelledby="not-age">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Start with the traveler</p>
              <h2 id="not-age" className="safe-wrap mt-4 font-serif text-3xl font-semibold leading-tight sm:text-5xl">Do not plan the trip by age alone</h2>
              <p className="safe-wrap mt-6 text-lg leading-8 text-mist">
                Two people who are both 65, 70 or 75 can have completely different travel habits. One may walk for hours but dislike standing still. Another may handle museums easily but need a slow morning after a transfer. Someone who uses a mobility aid may know exactly what works for them, while a very active parent may still find repeated early starts exhausting.
              </p>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">Before choosing cities, ask practical questions rather than making assumptions:</p>
              <ul className="mt-8 grid gap-x-10 gap-y-3 rounded-lg border bg-white p-6 hairline sm:grid-cols-2 sm:p-8">
                {planningQuestions.map((question) => <li key={question} className="safe-wrap flex gap-3 leading-7 text-mist"><span className="text-gold" aria-hidden="true">•</span><span>{question}</span></li>)}
              </ul>
              <p className="safe-wrap mt-7 border-s-2 border-gold ps-5 text-lg font-semibold leading-8">Plan around energy and mobility, not the number on a passport.</p>
            </section>

            <section aria-labelledby="fewer-cities" className="mt-20">
              <h2 id="fewer-cities" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">Fewer cities usually make a better trip</h2>
              <p className="safe-wrap mt-6 text-lg leading-8 text-mist">
                Beijing, Xi&apos;an, Chengdu, Suzhou and Shanghai can look like a logical list on a map. In practice, every change of city means packing, checkout, a station or airport transfer, security, waiting, luggage handling, another local transfer, a new hotel and unfamiliar surroundings. For an older traveler, the transfer day itself can be one of the most tiring parts of the journey even when the train or flight goes smoothly.
              </p>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">
                For a 7–10 day trip, two or three bases can often feel much better than four or five. This is planning guidance rather than a rule: a family that travels light and enjoys movement may prefer more variety. The important part is to count every transfer as a real day with a physical and mental cost.
              </p>
              <p className="safe-wrap mt-5 leading-7 text-mist">If the trip is only one week, the <Link href="/guides/7-days-in-china" className="font-semibold text-moss underline decoration-moss/40 underline-offset-4">7 Days in China guide</Link> compares realistic two-city and three-city routes.</p>
            </section>

            <section aria-labelledby="one-focus" className="mt-20 rounded-lg bg-bone p-7 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Protect the rhythm</p>
              <h2 id="one-focus" className="safe-wrap mt-4 font-serif text-3xl font-semibold leading-tight sm:text-5xl">One main experience is often enough for a good day</h2>
              <p className="safe-wrap mt-6 text-lg leading-8 text-mist">
                The Forbidden City, Temple of Heaven, Summer Palace, a hutong walk and a night show may all belong on a Beijing wish list. That does not mean they belong on the same day. A more comfortable structure gives the morning to one major sight, protects time for a proper seated lunch, and uses the afternoon for a lighter neighbourhood, café, short experience or hotel rest.
              </p>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">
                Keep the evening optional. If everyone still feels good, enjoy dinner out, a riverfront walk or a show. If energy drops, canceling one optional plan should not make the whole itinerary feel as if it failed.
              </p>
            </section>

            <section aria-labelledby="walking" className="mt-20">
              <h2 id="walking" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">The real issue is often walking and standing</h2>
              <p className="safe-wrap mt-6 text-lg leading-8 text-mist">
                Many famous places in China are large. The day may include long entrances, security lines, stone surfaces, stairs, bridges and a meaningful distance between the vehicle drop-off point and the attraction itself. Seating can be limited in some areas, and standing in one place may be harder for a traveler than moving slowly.
              </p>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">
                A place can look “easy” on Google Maps while still requiring a long walk from the vehicle to the part you actually came to see. Accessibility also differs by site, entrance, route and current operating arrangements. Check the specific place rather than assuming every attraction offers the same access.
              </p>
              <p className="safe-wrap mt-5 leading-7 text-mist">When possible, identify the longest walking day before the trip and avoid placing another demanding day immediately after it.</p>
            </section>
          </div>

          <section className="bg-ink px-5 py-16 text-cream sm:px-8 lg:px-24 lg:py-20">
            <div className="mx-auto max-w-5xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Transport decisions</p>
              <h2 className="safe-wrap mt-4 max-w-4xl font-serif text-3xl font-semibold leading-tight sm:text-5xl">When a private car makes a real difference</h2>
              <p className="safe-wrap mt-6 max-w-4xl text-lg leading-8 text-cream/80">
                The practical value of a private car is not luxury. It can reduce walking between the hotel and transport, keep luggage easier to manage, make an early return possible, and allow lunch or rest timing to change without rebuilding the day. It is especially useful for some Great Wall routes, suburban sights, countryside days and situations where a station transfer would add unnecessary effort.
              </p>
              <p className="safe-wrap mt-5 max-w-4xl text-lg leading-8 text-cream/80">
                Private cars are not necessary every day. In central Shanghai or another easy urban day, a taxi, ride-hailing service and a short walk can sometimes be perfectly reasonable. The service should solve a real problem rather than fill every empty hour.
              </p>
              <Link href="/private-car" className="safe-wrap mt-7 inline-flex min-h-12 items-center justify-center rounded-md bg-cream px-6 py-3 text-center text-sm font-semibold text-ink transition hover:bg-gold">See private car and driver options <span className="ms-2">→</span></Link>
            </div>
          </section>

          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-24">
            <section aria-labelledby="train-flight">
              <h2 id="train-flight" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">Train or flight with older parents?</h2>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">Neither is always better. Compare the physical work, waiting and local transfers involved in the complete journey.</p>
              <div className="mt-9 grid gap-6 md:grid-cols-2">
                <section className="min-w-0 rounded-lg border bg-white p-6 hairline sm:p-8">
                  <h3 className="font-serif text-2xl font-semibold">High-speed rail</h3>
                  <p className="safe-wrap mt-4 leading-7 text-mist">Rail often provides a convenient city-to-city connection, a generally steady ride and more freedom to move around onboard.</p>
                  <p className="safe-wrap mt-4 leading-7 text-mist">The drawbacks can be large stations, long walking routes, luggage, security and boarding. A long rail journey can still consume most of the day and require energy before and after the train.</p>
                </section>
                <section className="min-w-0 rounded-lg border border-moss/30 bg-bone p-6 sm:p-8">
                  <h3 className="font-serif text-2xl font-semibold">Domestic flight</h3>
                  <p className="safe-wrap mt-4 leading-7 text-mist">Flying can make sense across very long distances and may reduce the total journey when rail would take most of a day.</p>
                  <p className="safe-wrap mt-4 leading-7 text-mist">Airports are often farther from the city, and security, waiting, delays and boarding remain part of the experience. The shortest scheduled time is not automatically the easiest choice.</p>
                </section>
              </div>
              <p className="safe-wrap mt-7 border-s-2 border-gold ps-5 text-lg font-semibold leading-8">Compare the full door-to-door journey, not only the scheduled train or flight time.</p>
            </section>

            <section aria-labelledby="hotel-location" className="mt-20">
              <h2 id="hotel-location" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">Hotel location can matter more than another star</h2>
              <p className="safe-wrap mt-6 text-lg leading-8 text-mist">
                A centrally located hotel near practical restaurants, with easy vehicle access and a short route back for rest, may be more useful than a more luxurious property far from the day&apos;s activities. Returning to the hotel for an hour should not require another complicated journey.
              </p>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">
                Look beyond the hotel category. Ask whether the entrance is easy to reach, whether breakfast and nearby meals are convenient, how far the lift is from the room, and whether the day&apos;s transport can collect the family without an unnecessarily long walk. The right answer depends on the actual itinerary, not a universal hotel list.
              </p>
            </section>

            <section aria-labelledby="different-stops" className="mt-20">
              <h2 id="different-stops" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">How different China stops feel for older travelers</h2>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">These are planning characteristics, not a ranking of “best” cities.</p>
              <div className="mt-9 divide-y border-y hairline">
                <div className="grid gap-4 py-7 md:grid-cols-[150px_1fr]"><h3 className="font-serif text-2xl font-semibold">Beijing</h3><p className="safe-wrap leading-7 text-mist">Its great strength is imperial history and major icons. The challenge is scale: large sites, substantial walking and Great Wall logistics. More private transport and fewer big sights per day can make the experience much easier.</p></div>
                <div className="grid gap-4 py-7 md:grid-cols-[150px_1fr]"><h3 className="font-serif text-2xl font-semibold">Xi&apos;an</h3><p className="safe-wrap leading-7 text-mist">The Terracotta Warriors and the city&apos;s historical identity make a powerful stop. The Warriors are outside the central city and the site is large, so avoid stacking too much into the same day.</p></div>
                <div className="grid gap-4 py-7 md:grid-cols-[150px_1fr]"><h3 className="font-serif text-2xl font-semibold">Suzhou</h3><p className="safe-wrap leading-7 text-mist">Gardens, culture and a slower Jiangnan rhythm work well with Shanghai. Individual gardens can still include steps, bridges and uneven areas, so select the route inside each site with care.</p></div>
                <div className="grid gap-4 py-7 md:grid-cols-[150px_1fr]"><h3 className="font-serif text-2xl font-semibold">Shanghai</h3><p className="safe-wrap leading-7 text-mist">It is easy to create lighter days around restaurants, cafés, neighbourhoods and the riverfront. It remains a very large city, so hotel location and the distance between activities still matter.</p></div>
              </div>
            </section>

            <section aria-labelledby="comfortable-day" className="mt-20 rounded-lg border bg-white p-7 hairline sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">An example rhythm</p>
              <h2 id="comfortable-day" className="safe-wrap mt-4 font-serif text-3xl font-semibold leading-tight sm:text-5xl">What a comfortable day can look like</h2>
              <p className="safe-wrap mt-5 leading-7 text-mist">These times show a possible rhythm, not a fixed schedule. A later start may suit your family better.</p>
              <ol className="mt-8 border-t hairline">
                {[
                  ["08:30–09:30", "Easy breakfast and a slower start"],
                  ["Morning", "One main cultural sight, with the route inside the site chosen carefully"],
                  ["Lunch", "A proper seated meal close to the morning route"],
                  ["Early afternoon", "A lighter neighbourhood, café or short cultural experience"],
                  ["Mid-afternoon", "Hotel rest, tea or a flexible break"],
                  ["Evening", "Optional dinner, river cruise or short walk if everyone still has energy"],
                ].map(([time, plan]) => <li key={time} className="grid gap-2 border-b hairline py-5 sm:grid-cols-[150px_1fr] sm:gap-6"><span className="font-semibold text-gold">{time}</span><span className="safe-wrap leading-7 text-mist">{plan}</span></li>)}
              </ol>
            </section>

            <section aria-labelledby="support" className="mt-20">
              <h2 id="support" className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">Where private support can be worth paying for</h2>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">You do not need private support every day. It is most useful where coordination or interpretation removes a real source of effort.</p>
              <ul className="mt-8 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                {[
                  "Airport arrival after a long international journey",
                  "A Great Wall day",
                  "Complex station transfers with luggage",
                  "Large historical sites",
                  "Countryside or suburban day trips",
                  "Cultural activities needing interpretation",
                  "Days when walking needs active adjustment",
                  "Multi-generation family days with different pacing needs",
                ].map((item) => <li key={item} className="safe-wrap flex gap-3 leading-7 text-mist"><span className="text-gold" aria-hidden="true">•</span><span>{item}</span></li>)}
              </ul>
              <p className="safe-wrap mt-6 leading-7 text-mist">For a fuller comparison of independent, group and private travel, read <Link href="/guides/do-you-need-a-tour-guide-in-china" className="font-semibold text-moss underline decoration-moss/40 underline-offset-4">Do You Need a Tour Guide in China?</Link></p>
            </section>

            <section aria-labelledby="independent-time" className="mt-16 border-y hairline py-10">
              <h2 id="independent-time" className="safe-wrap font-serif text-3xl font-semibold sm:text-4xl">Where independent time can still work very well</h2>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">Traveling with older parents does not mean every minute needs supervision. A relaxed Shanghai neighbourhood day, café or shopping afternoon, hotel-rest afternoon, free evening, simple riverfront walk or easy local meal can work well independently.</p>
              <p className="safe-wrap mt-4 leading-7 text-mist">Free time lets everyone make a small decision without protecting a full arranged schedule. It can also keep private services focused on the days where they add the most value.</p>
            </section>
          </div>

          <section className="bg-ink px-5 py-16 text-cream sm:px-8 lg:px-24 lg:py-20">
            <div className="mx-auto max-w-5xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Route shape, not a fixed package</p>
              <h2 className="safe-wrap mt-4 font-serif text-3xl font-semibold leading-tight sm:text-5xl">A comfortable first-trip shape</h2>
              <p className="safe-wrap mt-5 max-w-4xl text-lg leading-8 text-cream/80">These 10–12 day frameworks represent different priorities. They are starting points, not the only routes that work.</p>
              <div className="mt-9 grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border border-white/15 bg-charcoal p-6 sm:p-8">
                  <h3 className="font-serif text-2xl font-semibold">Beijing 4 days · Xi&apos;an 2–3 days · Shanghai 4 days</h3>
                  <p className="safe-wrap mt-4 leading-7 text-cream/80">This version gives more space to iconic history, including the Terracotta Warriors, while still limiting the trip to three bases. It has another long-distance leg and benefits from careful transfer planning.</p>
                </div>
                <div className="rounded-lg border border-white/15 bg-charcoal p-6 sm:p-8">
                  <h3 className="font-serif text-2xl font-semibold">Beijing 4 days · Suzhou 2–3 days · Shanghai 4 days</h3>
                  <p className="safe-wrap mt-4 leading-7 text-cream/80">This version reduces long-distance movement after reaching eastern China and creates a slower cultural rhythm around gardens, neighbourhoods and Shanghai.</p>
                </div>
              </div>
              <p className="safe-wrap mt-7 leading-7 text-cream/75">Neither framework is automatically better. Explore the existing <Link href="/travel-planning/china-culture-7" className="font-semibold text-gold underline decoration-gold/50 underline-offset-4">Beijing–Suzhou–Shanghai journey</Link> or browse more <Link href="/travel-planning" className="font-semibold text-gold underline decoration-gold/50 underline-offset-4">travel-planning ideas</Link>.</p>
            </div>
          </section>

          <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8 lg:py-24">
            <section aria-labelledby="harder-than-expected">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Avoidable effort</p>
              <h2 id="harder-than-expected" className="safe-wrap mt-4 font-serif text-3xl font-semibold leading-tight sm:text-5xl">What usually makes the trip harder than expected?</h2>
              <ol className="mt-9 divide-y border-y hairline">
                {[
                  ["Too many hotel changes", "Packing, checkout, luggage and new surroundings repeat more often than the itinerary suggests."],
                  ["Treating transfer days as sightseeing days", "The complete door-to-door move leaves less reliable energy than the ticket time implies."],
                  ["Long standing time", "Queues and waiting can be harder than a slow walk, especially when seating is limited."],
                  ["Scheduling two giant attractions together", "Each may be manageable alone but exhausting when the walking is combined."],
                  ["Very early starts every day", "One early departure may be worthwhile; making every morning compulsory removes recovery time."],
                  ["No midday rest", "A planned break can protect the afternoon and evening instead of ending the day early."],
                  ["Carrying luggage through stations", "The rail journey may be easy while the station and transfer remain demanding."],
                  ["Booking restaurants far from the day route", "A special meal is less enjoyable when reaching it creates another long transfer."],
                  ["Making every evening mandatory", "Optional evenings give the family permission to stop without feeling that something was lost."],
                  ["No backup plan when energy changes", "A lighter alternative keeps the day enjoyable when the original plan no longer fits."],
                ].map(([itemTitle, body], index) => <li key={itemTitle} className="grid gap-3 py-6 sm:grid-cols-[48px_1fr] sm:gap-5"><span className="text-sm font-semibold text-gold">{String(index + 1).padStart(2, "0")}</span><div><h3 className="safe-wrap font-serif text-2xl font-semibold">{itemTitle}</h3><p className="safe-wrap mt-2 leading-7 text-mist">{body}</p></div></li>)}
              </ol>
            </section>

            <section aria-labelledby="local-view" className="mt-20 rounded-lg border-s-4 border-gold bg-bone p-7 sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">A local planning view</p>
              <h2 id="local-view" className="safe-wrap mt-4 font-serif text-3xl font-semibold leading-tight sm:text-4xl">Remove unnecessary effort, not meaningful experiences</h2>
              <p className="safe-wrap mt-6 text-lg leading-8 text-mist">When I plan for parents or older travelers, I do not begin by removing interesting places. I begin by removing unnecessary effort.</p>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">A good route can still include the Great Wall, gardens, museums and local neighbourhoods. The difference is how the day is paced, how often hotels change, and whether there is an easy way to stop early.</p>
              <p className="safe-wrap mt-5 leading-7 text-mist">If you are comparing independent arrangements with selected private support, the <Link href="/guides/private-china-tour-cost" className="font-semibold text-moss underline decoration-moss/40 underline-offset-4">2026 private China tour cost guide</Link> explains what changes the budget.</p>
            </section>

            <section aria-labelledby="medical-boundary" className="mt-16 rounded-lg border bg-white p-7 hairline sm:p-10">
              <h2 id="medical-boundary" className="safe-wrap font-serif text-3xl font-semibold sm:text-4xl">Health and mobility decisions need personal advice</h2>
              <p className="safe-wrap mt-5 text-lg leading-8 text-mist">This guide does not assess whether someone is medically fit to travel.</p>
              <p className="safe-wrap mt-4 leading-7 text-mist">If a traveler has a health condition that could affect flying, altitude, mobility, medication or emergency care, they should discuss the trip with their own medical professional before travel. High-altitude destinations need separate assessment and greater caution; this page does not provide medical thresholds or individual clearance.</p>
              <p className="safe-wrap mt-4 leading-7 text-mist">For general non-medical trip preparation, see the <Link href="/faq-for-foreign-travelers" className="font-semibold text-moss underline decoration-moss/40 underline-offset-4">FAQ for foreign travelers</Link>.</p>
            </section>

            <section aria-labelledby="parents-faq" className="mt-20">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Practical questions</p>
              <h2 id="parents-faq" className="safe-wrap mt-4 font-serif text-3xl font-semibold leading-tight sm:text-5xl">China with older parents FAQ</h2>
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
                <h2 className="safe-wrap font-serif text-3xl font-semibold leading-tight sm:text-5xl">Planning a China trip with your parents?</h2>
                <p className="safe-wrap mt-5 max-w-3xl text-lg leading-8 text-cream/75">Tell me their preferred pace, walking comfort, your dates and the places your family most wants to see. I can help shape a route that keeps the important experiences and removes unnecessary rushing.</p>
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

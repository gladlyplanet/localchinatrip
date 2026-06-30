import Link from "next/link";
import { Footer, Header } from "@/components/SiteChrome";

export default function ThankYouPage() {
  return (
    <>
      <Header />
      <main className="paper-texture min-h-screen bg-cream px-5 pb-20 pt-44 text-ink sm:px-8 xl:pt-36">
        <section className="mx-auto max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">Enquiry sent</p>
          <h1 className="mt-5 font-serif text-5xl font-semibold leading-tight sm:text-7xl">Thank you.</h1>
          <p className="mt-7 text-xl leading-9 text-mist">
            Your message has been sent. I will reply by email or WhatsApp as soon as possible.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/" className="inline-flex rounded-full bg-moss px-7 py-3 text-sm font-semibold text-cream">
              Back to home
            </Link>
            <Link href="/contact" className="inline-flex rounded-full border hairline px-7 py-3 text-sm font-semibold text-ink">
              Send another enquiry
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

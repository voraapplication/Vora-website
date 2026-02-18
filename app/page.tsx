export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="text-lg font-semibold tracking-tight">Vora</div>
        <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
          <a href="#how" className="hover:text-white">How it works</a>
          <a href="#features" className="hover:text-white">Benefits</a>
          <a href="#faq" className="hover:text-white">FAQ</a>
        </nav>
        <a
          href="#waitlist"
          className="rounded-full bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90"
        >
          Join waitlist
        </a>
      </header>

      <section className="mx-auto w-full max-w-6xl px-6 pb-20 pt-10">
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <p className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white/70">
              Launching in Sydney • Early access opening soon
            </p>

            <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
              Find people to play with.
              <span className="block text-white/70">Turn sport into your social life.</span>
            </h1>

            <p className="mt-5 text-base leading-relaxed text-white/70 md:text-lg">
              Vora helps you discover local sessions, join instantly, and meet great people —
              from padel and tennis to runs, swims, and hikes.
            </p>

            <div id="waitlist" className="mt-8 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="h-11 w-full rounded-full border border-white/15 bg-white/5 px-4 text-sm text-white placeholder:text-white/40 outline-none focus:border-white/30"
              />
              <button className="h-11 rounded-full bg-white px-6 text-sm font-medium text-black hover:bg-white/90">
                Get early access
              </button>
            </div>

            <p className="mt-3 text-xs text-white/50">
              No spam. Just launch updates + early access.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-gradient-to-tr from-white/10 via-white/5 to-transparent blur-2xl" />
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 p-6">
              <div className="grid gap-4">
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <div className="text-xs text-white/50">Tonight</div>
                  <div className="mt-1 text-lg font-semibold">Padel • Surry Hills</div>
                  <div className="mt-1 text-sm text-white/60">4 spots • 7:00 PM • Social</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <div className="text-xs text-white/50">Tomorrow</div>
                  <div className="mt-1 text-lg font-semibold">Ocean Swim • Bondi</div>
                  <div className="mt-1 text-sm text-white/60">All levels • 6:30 AM</div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <div className="text-xs text-white/50">This weekend</div>
                  <div className="mt-1 text-lg font-semibold">Tennis • Inner West</div>
                  <div className="mt-1 text-sm text-white/60">Doubles • Beginner-friendly</div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between text-xs text-white/50">
                <span>Designed for micro-communities</span>
                <span>Fast • Simple • Social</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="mx-auto w-full max-w-6xl px-6 py-16">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">How it works</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { title: "Discover", desc: "Browse sessions near you by sport, time, and vibe." },
            { title: "Join", desc: "Tap in — see details, spots left, and who’s going." },
            { title: "Play", desc: "Show up, move your body, meet people. Repeat." },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-white/15 bg-white/5 p-6">
              <div className="text-lg font-semibold">{item.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="features" className="mx-auto w-full max-w-6xl px-6 pb-16">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">Built for consistency</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {[
            { title: "Never train alone", desc: "Find your people — even on a random Tuesday night." },
            { title: "Quality sessions", desc: "Clear descriptions, levels, spots, and expectations." },
            { title: "Host with confidence", desc: "Fill sessions faster and build a real community." },
            { title: "Less scrolling, more playing", desc: "Simple UX that gets you out the door." },
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-white/15 bg-white/5 p-6">
              <div className="text-lg font-semibold">{item.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="faq" className="mx-auto w-full max-w-6xl px-6 pb-20">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">FAQ</h2>
        <div className="mt-8 grid gap-4">
          {[
            {
              q: "When does Vora launch?",
              a: "We’re starting in Sydney with early access, then expanding sport-by-sport and city-by-city.",
            },
            {
              q: "Is Vora free?",
              a: "Joining and browsing will be free. Some sessions may have a small fee set by hosts/venues.",
            },
            {
              q: "What sports are supported?",
              a: "Padel, tennis, runs, gym meetups, swims, hikes, basketball and more — based on demand.",
            },
          ].map((item) => (
            <div key={item.q} className="rounded-3xl border border-white/15 bg-white/5 p-6">
              <div className="text-sm font-semibold">{item.q}</div>
              <p className="mt-2 text-sm leading-relaxed text-white/70">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 text-sm text-white/60 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} Vora</div>
          <div className="flex gap-4">
            <a className="hover:text-white" href="#">Instagram</a>
            <a className="hover:text-white" href="#">X</a>
            <a className="hover:text-white" href="mailto:hello@vora.app">hello@vora.app</a>
          </div>
        </div>
      </footer>
    </main>
  );
}

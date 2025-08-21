import React from "react";
import { motion } from "framer-motion";
import { Music4, Mic2, CalendarDays, Users2, Sparkles, PlayCircle, Instagram, Ticket, ShieldCheck, MapPin, Clock, Star, ChevronRight, PlusCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

// --- Mock data ---
const battles = [
  { id: 1, city: "Praha", venue: "Cross Club", date: "2025-09-12", start: "20:00", slots: 8, status: "open" },
  { id: 2, city: "Brno", venue: "Fléda", date: "2025-10-03", start: "19:30", slots: 8, status: "open" },
  { id: 3, city: "Ostrava", venue: "BrickHouse", date: "2025-11-07", start: "19:00", slots: 8, status: "soon" },
  { id: 4, city: "Plzeň", venue: "Depo2015", date: "2025-12-05", start: "20:00", slots: 8, status: "soon" },
];

const judges = [
  { name: "DJ Neon", role: "Beatmaker / Host", bio: "10+ let na scéně, milovník battle formátu.", rating: 4.9 },
  { name: "Lilka", role: "MC / Porotkyně", bio: "Rychlá dikce, tvrdé punchlines, férové hodnocení.", rating: 4.8 },
  { name: "Mirek Flow", role: "Freestyler", bio: "Mistr improvizace, vychoval řadu nováčků.", rating: 4.7 },
];

const faqs = [
  {
    q: "Co je UnderRapNights?",
    a: "Série večerů, kde začínající rapeři stojí proti sobě v přátelských, ale ostrých battlích. Publikum i porota rozhodují o vítězi."
  },
  { q: "Jak se přihlásím?", a: "Vyber akci, vyplň přihlášku a nahraj ukázku. Dostaneš potvrzení do e‑mailu." },
  { q: "Kolik to stojí?", a: "Pro účinkující zdarma. Diváci kupují lístky online nebo na místě (pokud zbydou)." },
  { q: "Jaká jsou pravidla?", a: "Žádná hate speech, žádné fyzické kontakty. Punchlines ano, nesnášenlivost ne. Čas na kolo: 60–90 s." }
];

function Stat({ icon: Icon, label, value }) {
  return (
    <Card className="bg-neutral-900/60 backdrop-blur border-neutral-800">
      <CardContent className="flex items-center gap-3 p-4">
        <div className="p-2 rounded-2xl bg-neutral-800">
          <Icon className="h-5 w-5" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-neutral-400">{label}</div>
          <div className="text-xl font-semibold">{value}</div>
        </div>
      </CardContent>
    </Card>
  );
}

function BattleCard({ b }) {
  const statusBadge = b.status === "open" ? (
    <Badge className="bg-emerald-600 hover:bg-emerald-600">Přihlášky otevřené</Badge>
  ) : (
    <Badge className="bg-neutral-700 hover:bg-neutral-700">Brzy</Badge>
  );

  return (
    <Card className="bg-neutral-900/60 border-neutral-800">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <MapPin className="h-4 w-4" />{b.city} · <span className="font-normal text-neutral-400">{b.venue}</span>
          </CardTitle>
          {statusBadge}
        </div>
      </CardHeader>
      <CardContent className="grid gap-3">
        <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-300">
          <div className="flex items-center gap-2"><CalendarDays className="h-4 w-4" /> {new Date(b.date).toLocaleDateString("cs-CZ")}</div>
          <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> {b.start}</div>
          <div className="flex items-center gap-2"><Users2 className="h-4 w-4" /> {b.slots} slots</div>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="rounded-2xl"><PlusCircle className="h-4 w-4 mr-2"/>Přihlásit rapera</Button>
            </DialogTrigger>
            <SignupDialog city={b.city} date={b.date} venue={b.venue} />
          </Dialog>
          <Button size="sm" variant="secondary" className="rounded-2xl"><Ticket className="h-4 w-4 mr-2"/>Lístky</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function SignupDialog({ city, date, venue }) {
  return (
    <DialogContent className="bg-neutral-950/90 text-neutral-50 border-neutral-800">
      <DialogHeader>
        <DialogTitle>Přihláška – {city}</DialogTitle>
        <DialogDescription>
          {venue} · {new Date(date).toLocaleDateString("cs-CZ")}
        </DialogDescription>
      </DialogHeader>
      <form className="grid gap-3">
        <div className="grid md:grid-cols-2 gap-3">
          <Input placeholder="Stage jméno" />
          <Input type="email" placeholder="E‑mail" />
        </div>
        <div className="grid md:grid-cols-2 gap-3">
          <Input placeholder="Telefon" />
          <Select>
            <SelectTrigger className="bg-neutral-900 border-neutral-800"><SelectValue placeholder="Kategorie"/></SelectTrigger>
            <SelectContent className="bg-neutral-950 border-neutral-800">
              <SelectItem value="freestyle">Freestyle</SelectItem>
              <SelectItem value="psane">Psané kolo</SelectItem>
              <SelectItem value="mix">Mix</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Textarea placeholder="Krátké bio (max 300 znaků)" />
        <Input type="url" placeholder="Odkaz na ukázku (YouTube/Drive)" />
        <div className="flex items-center justify-between">
          <div className="text-xs text-neutral-400">Odesláním souhlasíš s pravidly akce.</div>
          <Button type="submit" className="rounded-2xl">Odeslat přihlášku</Button>
        </div>
      </form>
    </DialogContent>
  );
}

export default function UnderRapNights() {
  const [cityFilter, setCityFilter] = React.useState("vše");

  const filtered = battles.filter(b => cityFilter === "vše" ? true : b.city === cityFilter);

  return (
    <div className="min-h-screen bg-black text-neutral-100">
      {/* Glow background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-[60vw] h-[60vw] rounded-full blur-3xl opacity-20 bg-fuchsia-600"/>
        <div className="absolute top-1/3 -right-10 w-[50vw] h-[50vw] rounded-full blur-3xl opacity-20 bg-violet-600"/>
        <div className="absolute bottom-0 left-1/4 w-[40vw] h-[40vw] rounded-full blur-3xl opacity-10 bg-emerald-500"/>
      </div>

      {/* Navbar */}
      <nav className="sticky top-0 z-40 backdrop-blur bg-black/50 border-b border-neutral-900">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Music4 className="h-6 w-6"/>
            <span className="font-extrabold tracking-wide">Under<span className="text-fuchsia-400">Rap</span>Nights</span>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <a href="#battles" className="px-3 py-2 text-sm hover:text-white text-neutral-300">Battles</a>
            <a href="#how" className="px-3 py-2 text-sm hover:text-white text-neutral-300">Jak to funguje</a>
            <a href="#judges" className="px-3 py-2 text-sm hover:text-white text-neutral-300">Porota</a>
            <a href="#faq" className="px-3 py-2 text-sm hover:text-white text-neutral-300">FAQ</a>
            <Button size="sm" className="rounded-2xl"><PlusCircle className="h-4 w-4 mr-2"/>Přihlásit se</Button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="relative">
        <div className="max-w-6xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-extrabold leading-tight">
              Začni. Zabojuj. <span className="text-fuchsia-400">Zazáři.</span>
            </motion.h1>
            <p className="mt-4 text-neutral-300 max-w-xl">
              UnderRapNights je nightly battle platforma pro začínající MCs. Přihlásíš se, postavíš se soupeři a ukážeš bars před publikem.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="rounded-2xl"><Mic2 className="h-5 w-5 mr-2"/>Chci do battlu</Button>
                </DialogTrigger>
                <SignupDialog city="Praha" date={new Date().toISOString()} venue="TBA" />
              </Dialog>
              <a href="#battles"><Button variant="secondary" className="rounded-2xl"><CalendarDays className="h-5 w-5 mr-2"/>Termíny</Button></a>
            </div>

            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3">
              <Stat icon={Users2} label="Nováčků přihlášeno" value="120+" />
              <Stat icon={PlayCircle} label="Odehraných kol" value="60" />
              <Stat icon={Star} label="Celkové hodnocení" value="4.9/5" />
              <Stat icon={ShieldCheck} label="Fair‑play rules" value="100%" />
            </div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.1 }} className="relative">
            <div className="aspect-video rounded-2xl bg-gradient-to-br from-fuchsia-600/30 to-violet-600/30 border border-neutral-800 p-1">
              <div className="h-full w-full rounded-xl bg-neutral-950 grid place-items-center">
                <div className="text-center p-6">
                  <Mic2 className="mx-auto h-12 w-12 mb-3"/>
                  <div className="font-semibold">Highlight video</div>
                  <p className="text-sm text-neutral-400">Vlož sem odkaz na YouTube / Reels</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 rotate-2">
              <Badge className="bg-fuchsia-600 text-white rounded-2xl px-3 py-1">#underrapnights</Badge>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Battles */}
      <section id="battles" className="py-14 border-t border-neutral-900">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">Nadcházející battles</h2>
              <p className="text-neutral-400">Vyber město a přihlas se do bracketu.</p>
            </div>
            <div className="flex items-center gap-2">
              <Select value={cityFilter} onValueChange={setCityFilter}>
                <SelectTrigger className="w-40 bg-neutral-900 border-neutral-800 rounded-2xl">
                  <SelectValue placeholder="Filtrovat město"/>
                </SelectTrigger>
                <SelectContent className="bg-neutral-950 border-neutral-800">
                  <SelectItem value="vše">Všechna města</SelectItem>
                  {[...new Set(battles.map(b=>b.city))].map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {filtered.map(b => <BattleCard key={b.id} b={b} />)}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-14 border-t border-neutral-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Jak to funguje</h2>
          <Tabs defaultValue="format" className="w-full">
            <TabsList className="bg-neutral-900 border border-neutral-800 rounded-2xl">
              <TabsTrigger value="format">Formát</TabsTrigger>
              <TabsTrigger value="pravidla">Pravidla</TabsTrigger>
              <TabsTrigger value="divaci">Diváci</TabsTrigger>
            </TabsList>
            <TabsContent value="format" className="mt-6">
              <div className="grid md:grid-cols-3 gap-4">
                {[{
                  icon: Mic2, title: "1v1 bracket", text: "8 MCs, pavouk, semifinále a finále. Každé kolo 60–90 s."
                }, {
                  icon: PlayCircle, title: "Beaty na místě", text: "DJ vytahuje náhodné beaty – freestyle nebo psané texty, jak chceš."
                }, {
                  icon: Users2, title: "Hlasování", text: "Porota 60 %, publikum 40 %. Rozstřel při rovnosti."
                }].map((f,i)=> (
                  <Card key={i} className="bg-neutral-900/60 border-neutral-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2"><Sparkles className="h-4 w-4"/> {f.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-neutral-300 flex items-start gap-3">
                      <f.icon className="h-5 w-5 mt-0.5"/>
                      <p>{f.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="pravidla" className="mt-6">
              <ul className="grid md:grid-cols-2 gap-3 text-neutral-300">
                <li className="flex items-start gap-2"><ShieldCheck className="h-5 w-5 mt-0.5"/> Žádná nenávist na základě rasy, pohlaví, orientace apod.</li>
                <li className="flex items-start gap-2"><ShieldCheck className="h-5 w-5 mt-0.5"/> Bez fyzických kontaktů a poškození vybavení.</li>
                <li className="flex items-start gap-2"><ShieldCheck className="h-5 w-5 mt-0.5"/> Respekt k časovým limitům a hostům.</li>
                <li className="flex items-start gap-2"><ShieldCheck className="h-5 w-5 mt-0.5"/> Texty: explicit ok, ale držme kulturu.</li>
              </ul>
            </TabsContent>
            <TabsContent value="divaci" className="mt-6">
              <Card className="bg-neutral-900/60 border-neutral-800">
                <CardContent className="p-6 grid md:grid-cols-2 gap-6 items-center">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Buď součást rozhodování</h3>
                    <p className="text-neutral-300">Každý lístek = unikátní hlasovací kód. Po battlu naskenuješ QR a dáš hlas svému favoritovi.</p>
                  </div>
                  <div className="flex gap-2">
                    <Button className="rounded-2xl"><Ticket className="h-4 w-4 mr-2"/>Koupit lístek</Button>
                    <Button variant="secondary" className="rounded-2xl"><Instagram className="h-4 w-4 mr-2"/>Sleduj nás</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Judges */}
      <section id="judges" className="py-14 border-t border-neutral-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Porota & hosté</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {judges.map((j, i) => (
              <Card key={i} className="bg-neutral-900/60 border-neutral-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{j.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-neutral-400">{j.role}</div>
                  <p className="mt-2 text-neutral-300">{j.bio}</p>
                  <div className="mt-3 text-sm flex items-center gap-2"><Star className="h-4 w-4"/> {j.rating}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-14 border-t border-neutral-900">
        <div className="max-w-6xl mx-auto px-4">
          <Card className="bg-gradient-to-br from-neutral-900/70 to-neutral-900/30 border-neutral-800">
            <CardContent className="p-6 grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-xl font-semibold">Nepropásni další noc</h3>
                <p className="text-neutral-300">Zapiš se do newsletteru a první budeš vědět o nových termínech a registracích.</p>
              </div>
              <form className="flex gap-2">
                <Input type="email" placeholder="tvuj@email.cz" className="bg-neutral-950 border-neutral-800"/>
                <Button className="rounded-2xl"><Mail className="h-4 w-4 mr-2"/>Odebírat</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-14 border-t border-neutral-900">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">FAQ</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {faqs.map((f, i) => (
              <Card key={i} className="bg-neutral-900/60 border-neutral-800">
                <CardHeader className="pb-2"><CardTitle className="text-lg">{f.q}</CardTitle></CardHeader>
                <CardContent className="text-neutral-300">{f.a}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-900">
        <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Music4 className="h-5 w-5"/>
              <span className="font-bold">UnderRapNights</span>
            </div>
            <p className="text-sm text-neutral-400">Community battles pro novou generaci MCs.</p>
          </div>
          <div className="text-sm text-neutral-300">
            <div className="font-semibold mb-2">Kontakt</div>
            <ul className="space-y-1">
              <li>E‑mail: hello@underrapnights.cz</li>
              <li>IG: @underrapnights</li>
            </ul>
          </div>
          <div className="text-sm text-neutral-300">
            <div className="font-semibold mb-2">Organizátor</div>
            <p>UnderRap Crew z.s. · IČO 12345678</p>
          </div>
        </div>
        <div className="text-xs text-neutral-500 text-center pb-6">© {new Date().getFullYear()} UnderRapNights. Všechna práva vyhrazena.</div>
      </footer>

      {/* Floating CTA */}
      <div className="fixed bottom-6 right-6 flex gap-2">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" className="rounded-2xl shadow-lg shadow-fuchsia-500/20">
              <Mic2 className="h-5 w-5 mr-2"/>Přihlásit rapera
            </Button>
          </DialogTrigger>
          <SignupDialog city="Praha" date={new Date().toISOString()} venue="TBA" />
        </Dialog>
        <a href="#battles"><Button variant="secondary" size="lg" className="rounded-2xl"><CalendarDays className="h-5 w-5 mr-2"/>Termíny</Button></a>
      </div>
    </div>
  );
}

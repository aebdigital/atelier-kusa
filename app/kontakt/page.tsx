import Link from "next/link";

export default function Contact() {
  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-4rem)]">
      <div className="w-full md:w-1/3 p-8 md:p-12 lg:p-16">
        <h1 className="text-3xl font-light mb-12 uppercase tracking-widest">Kontakt</h1>

        <div className="space-y-8 text-base font-light">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-3 text-gray-400">Fakturačná adresa a údaje</h2>
            <p className="font-medium">ATELIÉR KUSÁ, s.r.o.</p>
            <p>Prievozská 37,</p>
            <p>821 09 Bratislava</p>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-3 text-gray-400">Sídlo kancelárie</h2>
            <p className="font-medium">ATELIÉR KUSÁ, s.r.o.</p>
            <p>Partizánska 2,</p>
            <p>811 03 Bratislava</p>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-3 text-gray-400">Kontakt</h2>
            <p>
              <a href="tel:+421905227307" className="hover:underline">+421 905 227 307</a>
            </p>
            <p>
              <a href="mailto:atelierkusa@gmail.com" className="hover:underline">atelierkusa@gmail.com</a>
            </p>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest mb-3 text-gray-400">Firemné údaje</h2>
            <p>IČO: 36656691</p>
            <p>IČ DPH: SK2022217637</p>
          </div>

          <div className="pt-4">
            <Link
              href="/ochrana-osobnych-udajov"
              className="text-sm uppercase tracking-widest text-gray-500 hover:text-black transition-colors underline"
            >
              Ochrana osobných údajov
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full md:w-2/3 h-64 md:h-auto min-h-[400px] md:min-h-0">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2661.5876!2d17.1094!3d48.1436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476c8943c7!2sPartiz%C3%A1nska%202%2C%20Bratislava!5e0!3m2!1ssk!2ssk!4v1704067200000!5m2!1ssk!2ssk"
          width="100%"
          height="100%"
          style={{ border: 0, minHeight: "100%" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full"
        />
      </div>
    </div>
  );
}

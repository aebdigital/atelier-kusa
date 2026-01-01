import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl p-4 md:p-12 lg:p-16">
      <Link
        href="/kontakt"
        className="text-xs uppercase tracking-widest text-gray-400 hover:text-black transition-colors mb-8 block"
      >
        ← Späť na kontakt
      </Link>

      <h1 className="text-3xl font-light mb-8 uppercase tracking-widest">
        Ochrana osobných údajov
      </h1>

      <div className="mb-12 text-gray-600">
        <p className="font-medium text-black">ATELIÉR KUSÁ, s.r.o.</p>
        <p>Prievozská 37, 821 09 Bratislava</p>
        <p>IČO: 36656691, DIČ: 2022217637</p>
        <p>E-mail: <a href="mailto:atelierkusa@gmail.com" className="hover:underline">atelierkusa@gmail.com</a></p>
        <p>Tel.: <a href="tel:+421905227307" className="hover:underline">+421 905 227 307</a></p>
      </div>

      <p className="text-gray-600 mb-12 leading-relaxed">
        Tieto Zásady ochrany osobných údajov (ďalej len „Zásady") popisujú, aké osobné údaje spracúvame v súvislosti s používaním našej webovej stránky a kontaktných formulárov.
      </p>

      <div className="space-y-12">
        <section>
          <h2 className="text-xl font-medium mb-6 uppercase tracking-wide">I. Kontaktný formulár</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Na stránke www.atelierkusa.sk prevádzkujeme kontaktný formulár, ktorého účelom je umožniť vám:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-6 space-y-1">
            <li>Položiť otázku k našim produktom a službám</li>
            <li>Požiadať o cenovú ponuku</li>
          </ul>

          <h3 className="font-medium mb-3">Rozsah spracúvaných údajov:</h3>
          <ul className="list-disc list-inside text-gray-600 mb-6 space-y-1">
            <li>Meno a priezvisko</li>
            <li>E-mailová adresa</li>
            <li>Telefónne číslo</li>
          </ul>

          <h3 className="font-medium mb-3">Účel spracovania:</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Spracúvame uvedené údaje, aby sme vás mohli kontaktovať a reagovať na váš dopyt.
          </p>

          <h3 className="font-medium mb-3">Právny základ:</h3>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Článok 6 ods. 1 písm. b) GDPR – plnenie opatrení pred uzavretím zmluvy na žiadosť dotknutej osoby.
          </p>

          <h3 className="font-medium mb-3">Doba uchovávania:</h3>
          <p className="text-gray-600 leading-relaxed">
            Osobné údaje budeme uchovávať maximálne 10 rokov od odozvy na váš dopyt, pokiaľ nevznikne ďalší zmluvný vzťah.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-6 uppercase tracking-wide">II. Súbory cookies</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Na našej webovej stránke používame cookies výlučne na nasledujúce účely:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-6 space-y-1">
            <li><strong>Nevyhnutné cookies</strong> – zabezpečujú základnú funkčnosť stránky (napr. ukladanie relácie, nastavení prehliadača).</li>
            <li><strong>Štatistické (analytické) cookies</strong> – pomáhajú nám pochopiť, ako návštevníci stránku používajú (nasadzujeme ich len so súhlasom používateľa).</li>
          </ul>

          <h3 className="font-medium mb-3">Správa súhlasov:</h3>
          <p className="text-gray-600 leading-relaxed">
            Používateľ môže kedykoľvek odvolať súhlas s využívaním štatistických cookies prostredníctvom nastavení cookie lišty alebo priamo v prehliadači.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium mb-6 uppercase tracking-wide">III. Práva dotknutej osoby</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Podľa nariadenia GDPR máte nasledujúce práva:
          </p>
          <ul className="list-disc list-inside text-gray-600 mb-6 space-y-1">
            <li>Prístup k osobným údajom, ktoré spracúvame</li>
            <li>Oprava nepresných alebo neúplných údajov</li>
            <li>Vymazanie („právo zabudnutia"), ak na spracovanie už nie je právny základ</li>
            <li>Obmedzenie spracovania</li>
            <li>Prenosnosť údajov</li>
            <li>Odvolanie súhlasu – stane sa účinným dňom odvolania</li>
            <li>Podanie sťažnosti u Úradu na ochranu osobných údajov SR (Hraničná 12, 820 07 Bratislava, <a href="https://www.dataprotection.gov.sk" target="_blank" rel="noopener noreferrer" className="underline hover:text-black">www.dataprotection.gov.sk</a>)</li>
          </ul>

          <p className="text-gray-600 leading-relaxed">
            V prípade otázok alebo uplatnenia Vašich práv nás môžete kontaktovať na{" "}
            <a href="mailto:atelierkusa@gmail.com" className="underline hover:text-black">atelierkusa@gmail.com</a>{" "}
            alebo telefónnom čísle{" "}
            <a href="tel:+421905227307" className="underline hover:text-black">+421 905 227 307</a>.
          </p>
        </section>

        <div className="pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Tieto Zásady nadobúdajú účinnosť dňom 10. 6. 2025.
          </p>
        </div>
      </div>
    </div>
  );
}

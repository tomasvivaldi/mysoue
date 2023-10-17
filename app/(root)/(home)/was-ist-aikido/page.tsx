import Head from "next/head";
import Image from "next/image";

const WhatIsAikido = () => {
  const quotes = [
    {
      text: "Möglichkeiten des Aikido-Training sind jedoch so vielseitig und verlangen einen derartigen Einsatz aller geistigen und körperlichen Kräfte dass wir diese Kunst beliebig lang praktizieren können, ohne jedes Gefühl zu haben, wir hätten alles gelernt, was Aikido uns lehren kann, noch hätten wir alles geleistet, was uns möglich ist.",
      author:
        "Adele Westbrook / Oscar Ratti: Aikidõ und die dynamische Sphäre. 2003, S. 20",
    },
    {
      text: "In der Kunst des Friedens gibt es keinen Streit. Ein wahrer Krieger ist unbesiegbar, weil er oder sie mit nichts streitet. Besiegen bedeutet, den Geist des Streites, den wir in unserem Inneren tragen, zu besiegen.",
      author: "Morihei Ueshiba: Die Kraft des Friedens on the go. 1992, S. 63",
    },
    // Add the rest of your quotes here...
  ];

  return (
    <>
      <Head>
        <title>Was ist Aikido? - Details</title>
      </Head>
      <div className="flex flex-col">
        <div className="h-[40%] min-h-[40vh] flex x-paddings">
          <div className="absolute top-0 left-0 w-full h-[40%] -z-10">
            <Image
              src="/hero1.webp"
              alt="Was ist Aikido"
              layout="fill"
              objectFit="cover"
              objectPosition="top"
            />
            <div className="absolute inset-0 bg-gray-800 opacity-50" />
          </div>

          <h1 className=" relative heading1 mb-6 mt-32 text-slate-100">
            Was ist Aikido?
          </h1>
        </div>

        {/* Introduction Section */}
        <section className="my-8 flex flex-row p-4 x-paddings lg:x-paddings2">
          <div className="flex flex-col gap-4">
            <h2 className="heading2 mb-4 ">Einführung in Aikido</h2>
            <div className="flex flex-row gap-4">
              <div className="flex flex-col max-w-3xl">
                {/* Brief Overview */}
                <div className="mb-6">
                  <h3 className="heading3 mb-2">Ein kurzer Überblick</h3>
                  <p className="body-regular">
                    Aikido, eine zeitgenössische Kampfkunst, verwebt Philosophie
                    und physische Techniken, um nicht nur den Körper, sondern
                    auch den Geist zu kultivieren.
                  </p>
                </div>

                {/* Origins of Aikido */}
                <div className="mb-6">
                  <h3 className="heading3 mb-2">Ursprung des Aikido</h3>
                  <ul className="list-disc list-inside body-regular">
                    <li>
                      Gegründet von Morihei Ueshiba in den frühen 20.
                      Jahrhunderten.
                    </li>
                    <li>
                      Stark beeinflusst durch die Kriegerkunst der Samurai und
                      die Philosophie von Harmonie und Frieden.
                    </li>
                    <li>
                      Entwickelt, um Angreifer ohne ernsthaften Schaden
                      abzuwehren.
                    </li>
                  </ul>
                </div>

                {/* Global Presence */}
                <div className="mb-6">
                  <h3 className="heading3 mb-2">Globale Präsenz</h3>
                  <p className="body-regular">
                    Aikido hat weltweite Anerkennung und Präsenz erlangt, mit
                    Praktizierenden und Dojos in
                    <strong> über 140 Ländern</strong> rund um den Globus.
                  </p>
                </div>

                {/* Founder’s Vision */}
                <div className="mb-6">
                  <h3 className="heading3 mb-2">Die Vision des Gründers</h3>
                  <p className="body-regular">
                    Morihei Ueshiba sah Aikido nicht nur als körperliche Praxis,
                    sondern als Weg zur
                    <strong> spirituellen Erleuchtung</strong> und zur{" "}
                    <strong>Förderung des globalen Friedens</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:block relative  rounded-lg h-[600px] mx-auto mb-8">
            <Image
              src="/kanji.png"
              alt="about us image"
              width={364}
              height={1159}
              className=" rounded-lg xl:ml-24 ml-12 h-[600px] w-fit"
            />
          </div>
        </section>

        {/* Quotes Section */}
        <section className="my-8 p-8 rounded-lg shadow-lg gradient_blue-purple text-slate-100 mx-8">
          <h2 className="heading2 mb-4">Zitate</h2>
          {quotes.map((quote, index) => (
            <blockquote
              key={index}
              className="mb-6 px-2 py-1 sm:p-4 border-l-4 border-sky-500 paragraph-regular italic"
            >
              <p className="mb-4 text-xs sm:text-sm">{quote.text}</p>
              <cite className="text-sm md:text-base">{quote.author}</cite>
            </blockquote>
          ))}
        </section>
      </div>
    </>
  );
};

export default WhatIsAikido;

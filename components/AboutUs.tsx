import React from "react";
import Image from "next/image";

const AboutUs = () => {
  return (
    <div id="aboutus" className="flex flex-col  paddings flex-center">
      <div className="flex flex-col  lg:flex-row items-center   ">
        {/* Image Section */}
        <div className="relative rounded-lg h-[350px] sm:h-[500px] w-[80%] lg:w-[40%] max-w-[80%] mx-auto  mb-8 lg:mb-0">
          <Image
            src="/hero1.webp"
            alt="about us image"
            layout="fill"
            objectFit="cover"
            className=" rounded-lg "
          />
        </div>

        {/* Text Section */}
        <div className="lg:w-1/2 lg:pl-8 flex flex-col mx-8">
          <div className="flex flex-col">
            <div className="">
              <h3 className="heading2 mb-4">Über uns</h3>

              <p className="paragraph-regular  text-gray-700 mb-4">
                Wir sind ein kleiner Verein, der Aikido im Stil von Seigo
                Yamaguchi trainiert. Die bekanntesten Vertreter dieses Stils
                sind Seishiro Endo, Masatoshi Yasuno, Christian Tissier, Frank
                Noël, Bruno Zanotti.
              </p>
            </div>
          </div>
          <div className=" mt-8">
            <h3 className="heading3 mb-4">Trainingszeiten</h3>
            <div className="paragraph-regular">
              <p className=" text-gray-700">
                Wir trainieren zu folgenden Zeiten:
              </p>
              <div className="my-4 font-light flex flex-col gap-2 bg-slate-100 hover:bg-slate-200 border border-slate-400 shadow-lg rounded-lg w-fit px-4 py-2">
                <p>dienstags 19:00 – 20:30 Uhr</p>

                <p>freitags 19:30 – 21:00 Uhr</p>
              </div>
              <p>
                Ein Einstieg auch für Anfänger ist jederzeit möglich, ebenso wie
                ein kostenloses Probetraining. Es empfiehlt sich eine kurze
                Anmeldung per E-Mail.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className=" mx-8 mt-32">
          <h3 className="heading2 mb-4">Wo Sie uns finden</h3>

          <p className="paragraph-regular  text-gray-700 mb-1">
            Sie finden unseren Übungsraum in Karlsruhe in der Steinstr. 23 im
            Gewerbehof in einem der Hintergebäude. Der Eingang befindet sich im
            Hof auf der rechten Seite, hinter dem Fahrradladen. Im 2. OG geht es
            nach links in den Gang. <br />
          </p>
          <p className="paragraph-regular  text-gray-700 mb-4">
            Für Ortskundige: Das Dojo ist zwei Stockwerke über dem Café Palaver.
          </p>

          <h3 className="heading3 mb-4 mt-8">Kontakt</h3>

          <p className="paragraph-regular text-gray-700 mb-4">
            Kontakt: 0721 13 27 417 –{" "}
            <a
              href="mailto:mail@aikido-jiyukan.de"
              className="text-sky-600 hover:underline"
            >
              mail@aikido-jiyukan.de
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;

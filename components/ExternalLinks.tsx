// components/ExternalLinks.js
import Image from "next/image";

const ExternalLinks = () => {
  const links = [
    {
      image: "your-image-url",
      title: "Web Site der Aikido-Föderation Deutschland",
      description:
        "Explore the Aikido Federation in Germany through their official website.",
      url: "https://www.aikido-foederation.de/",
    },
    {
      image: "your-second-image-url",
      title: "Die unabhängigen Seiten für AIKIDO in Deutschland",
      description: "Find independent pages for AIKIDO in Germany.",
      url: "https://www.aikido.de/",
    },
    {
      image: "your-third-image-url",
      title: "Aikido Journal",
      description:
        "Stay updated with the latest happenings in the world of Aikido with the Aikido Journal.",
      url: "https://www.aikidojournal.de/",
    },
    {
      image: "your-fourth-image-url",
      title: "Aikikai Foundation",
      description:
        "Explore Aikikai Foundation and its dedicated endeavors for Aikido.",
      url: "http://www.aikikai.or.jp/eng/",
    },
    {
      image: "your-fifth-image-url",
      title: "Stefan Stenudd: Aikido. Die friedliche Kampfkunst",
      description:
        "Dive into Stefan Stenudd's perspective on Aikido as a peaceful martial art.",
      url: "https://www.stenudd.com/aikido/deutsch/",
    },
  ];

  return (
    <div className="p-4 md:p-8 paddings">
      <h2 className="mb-4 heading2">Wo bekomme ich weitere Infos?</h2>
      {/* <p className="paragraph-regular mb-6"></p> */}

      <section className="grid md:grid-cols-3 gap-4 sm:gap-4">
        {links.map((link, idx) => (
          <div
            key={idx}
            className="space-y-0 shadow group md:hover:shadow-lg p-2 sm:space-y-4 sm:p-4 border border-slate-200 rounded-lg"
          >
            <img
              src={link.image}
              alt={link.title}
              width={200}
              height={300}
              className="rounded-lg hidden "
            />
            <h3 className="font-semibold">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-600 hover:underline hover:text-sky-700 group-hover:underline"
              >
                {link.title}
              </a>
            </h3>
            <p>{link.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default ExternalLinks;

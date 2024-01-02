// components/ExternalLinks.js
import Image from "next/image";

const CardsSection = () => {
  const links = [
    {
      image: "your-image-url",
      title: "Card Title - and sub title",
      description: "more info about the card content",
      url: "/",
    },
    {
      image: "your-image-url",
      title: "Card Title - and sub title",
      description: "more info about the card content",
      url: "/",
    },
    {
      image: "your-image-url",
      title: "Card Title - and sub title",
      description: "more info about the card content",
      url: "/",
    },
    {
      image: "your-image-url",
      title: "Card Title - and sub title",
      description: "more info about the card content",
      url: "/",
    },
    {
      image: "your-image-url",
      title: "Card Title - and sub title",
      description: "more info about the card content",
      url: "/",
    },
    {
      image: "your-image-url",
      title: "Card Title - and sub title",
      description: "more info about the card content",
      url: "/",
    },
  ];

  return (
    <div className="sticky p-4 md:p-8 paddings">
      <h2 className="mb-4 heading2">Cards Section</h2>
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

export default CardsSection;

import Image from "next/image";

const Banner2 = () => {
  return (
    <div className="sm:-mx-16 -mx-4 relative flex flex-col justify-center items-center text-center text-white py-16 mb-8">
      {/* Background Image */}
      <Image
        src="/banner2.png"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        alt="Our Mission And Vision"
        priority
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-20" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <h2
          className="heading2 mb-4"
          style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}
        >
          Our Mission And Vision
        </h2>
        <p className="text-lg">
          Our Mission Is To Help Everyone Create And Share Wishlists In The
          Simplest Way Possible. We Envision A World Where Every Desire, Every
          Wish, Is Just A Click Away.
        </p>
      </div>
    </div>
  );
};

export default Banner2;
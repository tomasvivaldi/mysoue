import React from "react";

const QuoteComponent = () => {
  return (
    <div className="flex flex-col items-center mt-12 p-8 text-center">
      <div className="max-w-3xl">
        <h3 className="heading2 mb-4 ">
          "Die Kunst des Friedens besteht darin, das zu erfüllen, was fehlt."
        </h3>

        <p className="sm:text-lg font-medium text-gray-700">
          – Morihei Ueshiba
        </p>

        <p className="mt-6 text-gray-600/80  paragraph-regular">
          Ueshiba identifiziert Aikido als Mittel, um das zu vervollständigen,
          was fehlt, möglicherweise in Bezug auf das Fehlen von Frieden,
          Harmonie und Versöhnung in der Welt. Aikido tritt daher ein, um diese
          Lücken zu füllen und webt ein Gobelin der Ruhe und Verbindung.
        </p>
      </div>
    </div>
  );
};

export default QuoteComponent;

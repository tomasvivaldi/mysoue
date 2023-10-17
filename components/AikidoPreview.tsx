// components/AikidoPreview.js
import Link from "next/link";

const AikidoPreview = () => {
  return (
    <div className="flex flex-col inner-width x-paddings py-8 mb-8 gradient_blue-purple text-white gap-8">
      <h2 className="heading2">Was ist Aikido?</h2>

      <p className="paragraph-regular max-w-3xl">
        Aikido ist eine defensive, moderne japanische Kampfkunst, entwickelt von
        Ueshiba Morihei, mit dem Ziel, einem Angriff durch Leiten der
        Angriffskraft zu begegnen.
      </p>
      <a
        href="/what-is-aikido"
        className="body-medium text-slate-200 self-end
      hover:underline hover:text-slate-100"
      >
        Erfahren Sie mehr über Aikido →
      </a>
    </div>
  );
};

export default AikidoPreview;

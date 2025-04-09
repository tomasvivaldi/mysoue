import Image from "next/image";
import Link from "next/link";

interface ProductCard2Props {
  href: string;
  imageUrl: string;
  name: string;
  price: number | null;
  isGiftReserved: boolean;
  additionalDescription?: string;
}

const ProductCard2: React.FC<ProductCard2Props> = ({
  href,
  imageUrl,
  name,
  price,
  isGiftReserved,
  additionalDescription,
}) => {
  return (
    <Link href={href} passHref key={href}>
      <div className="bg-white h-[350px] rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg">
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={name}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-2 max-h-[150px] overflow-y-auto">
          <h2 className="text-lg font-semibold text-gray-800 mb-2">{name}</h2>
          <div className="flex justify-between items-center">
          </div>
          {additionalDescription && (
            <p className="text-sm text-gray-600 mt-2">
              Additional Info: {additionalDescription}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard2;
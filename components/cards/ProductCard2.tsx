import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface ProductCard2Props {
  href: string;
  imageUrl: string;
  name: string;
  price: number | null;
  status: 'reserved' | 'purchased' | 'unreserved';
  additionalDescription?: string;
}

const ProductCard2: React.FC<ProductCard2Props> = ({
  href,
  imageUrl,
  name,
  price,
  status,
  additionalDescription,
}) => {
  const t = useTranslations("Dashboard-MyGifts");
  
  // Function to determine badge color based on status
  const getStatusBadgeColor = () => {
    switch (status) {
      case 'reserved':
        return 'bg-yellow-100 text-yellow-800';
      case 'purchased':
        return 'bg-green-100 text-green-800';
      case 'unreserved':
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Function to get status text
  const getStatusText = () => {
    switch (status) {
      case 'reserved':
        return t('reserved');
      case 'purchased':
        return t('purchased');
      case 'unreserved':
      default:
        return t('unreserved');
    }
  };

  return (
    <Link href={href} passHref key={href}>
      <div className="bg-white h-[350px] rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-lg relative">
        {/* Status Badge */}
        <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor()}`}>
          {getStatusText()}
        </div>
        
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
            {price !== null && (
              <span className="text-lg font-bold text-gray-900">
                ${price.toFixed(2)}
              </span>
            )}
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
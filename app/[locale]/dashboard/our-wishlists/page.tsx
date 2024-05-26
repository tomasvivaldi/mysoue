import Card from "@/components/Card";
import { useTranslations } from "next-intl";
import Head from "next/head";

const Login = () => {
  const t = useTranslations("Dashboard-OurWishlists");
  const wishlists = [
    {
      id: 1,
      title: "Christmas",
      description: "Short List Descriptions",
      imageUrl: "/xmas.jpg",
    },
    {
      id: 2,
      title: "Baby Shower",
      description: "Short List Descriptions",
      imageUrl: "/baby.jpg",
    },
    {
      id: 1,
      title: "Christmas",
      description: "Short List Descriptions",
      imageUrl: "/xmas.jpg",
    },
    {
      id: 2,
      title: "Baby Shower",
      description: "Short List Descriptions",
      imageUrl: "/baby.jpg",
    },
    {
      id: 1,
      title: "Christmas",
      description: "Short List Descriptions",
      imageUrl: "/xmas.jpg",
    },
    {
      id: 2,
      title: "Baby Shower",
      description: "Short List Descriptions",
      imageUrl: "/baby.jpg",
    },
    // ... more wishlists
  ];
  return (
    <>
      <Head>
        <title>{t("pageTitle")}</title>
      </Head>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-regular">{t("ourWishlists")}</h1>
          <button className="bg-black text-white px-4 py-2 rounded hover:shadow-lg transition duration-300">
            <a href="/dashboard/create-new-wishlist">
              {t("createNewWishlist")}
            </a>
          </button>
        </div>

        <div className="flex flex-row flex-wrap gap-8 justify-center sm:justify-start">
          {wishlists.map((wishlist) => (
            <Card
              key={wishlist.id}
              img={wishlist.imageUrl}
              activity={wishlist.title}
              type={" list type"}
              date={" list date"}
              postpreview={wishlist.description}
              id={`${wishlist.id}`}
            />
          ))}
        </div>

        <div className="flex justify-center mt-6">
          {/* Pagination would go here */}
          <button className="mx-1 px-4 py-2 text-sm bg-gray-300 rounded">
            Previous
          </button>
          {/* Map over page numbers and render page buttons */}
          <button className="mx-1 px-4 py-2 text-sm bg-gray-300 rounded">
            1
          </button>
          <button className="mx-1 px-4 py-2 text-sm bg-gray-300 rounded">
            2
          </button>
          {/* ... */}
          <button className="mx-1 px-4 py-2 text-sm bg-gray-300 rounded">
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;

"use client";

import client from "@/apollo-client";
import LoadingBox from "@/components/LoadingBox";
import { GET_PRODUCT_BY_ID } from "@/graphql/queries";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Product {
  id: string;
  product_name: string;
  product_description: string;
  image_url: string;
  price: number;
  received: boolean;
}

interface Reservation {
  reserver_name: string;
  reserver_email: string;
  message: string;
  date_reserved: string;
}

const ProductDetails: React.FC = () => {
  const t = useTranslations("MyGifts");
  const params = useParams();
  const productId = params.product_id;

  const [productDetails, setProductDetails] = useState<Product | null>(null);
  const [reservationDetails, setReservationDetails] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(false);

  // import { GET_WISHLIST_RESERVATIONS } from "@/graphql/queries"; // Add this GraphQL query

  // useEffect(() => {
  //   const fetchReservedGifts = async () => {
  //     try {
  //       if (wishlistId) {
  //         const { data } = await client.query({
  //           query: GET_WISHLIST_RESERVATIONS,
  //           variables: { wishlistId },
  //         });

  //         setReservedGifts(data.reservedGifts || []);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching reserved gifts:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchReservedGifts();
  // }, [wishlistId]);

  // if (loading) {
  //   return (
  //     <LoadingBox
  //       imageSrc="/Symbol/Logo-Mysoue-Symbol_2.png"
  //       imageAlt={t("loading")}
  //       imageClassName=""
  //       containerClassName="h-[80vh]"
  //     />
  //   );
  // }

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        if (productId) {
          // Simulate API call
          setTimeout(() => {
            setProductDetails({
              id: "123",
              product_name: "Smart Watch",
              product_description: "A high-tech smart watch with fitness tracking.",
              image_url: "/mock/smartwatch.jpg",
              price: 250.99,
              received: false,
            });

            // Mock reservation data
            setReservationDetails({
              reserver_name: "Jane Doe",
              reserver_email: "jane.doe@example.com",
              message: "Hope you like this surprise! 🎁",
              date_reserved: "2024-02-19",
            });

            setLoading(false);
          }, 1000); // Simulated delay
        }
      } catch (error) {
        console.error("Failed to fetch product data:", error);
        setLoading(false);
      }
    };

    loadData();
  }, [productId]);

  if (loading) {
    return (
      <LoadingBox
        imageSrc="/Symbol/Logo-Mysoue-Symbol_2.png"
        imageAlt={t("loading")}
        imageClassName=""
        containerClassName="h-[80vh]"
      />
    );
  }

  if (!productDetails) {
    return <div>{t("productNotFound")}</div>;
  }

  return (
    <div className="w-full">
      <div className="mt-4 flex flex-col md:flex-row justify-around w-full">
        <div>
          <img
            alt="Product Image"
            className="rounded-lg"
            src={productDetails.image_url || "/placeholder.svg"}
            width="400"
            height="400"
            style={{ aspectRatio: "400 / 400", objectFit: "cover" }}
          />
        </div>
        <div className="w-1/2 flex flex-col mb-auto mt-12">
          <h1 className="text-3xl font-bold">{productDetails.product_name}</h1>
          <p className="mt-2 text-xl font-light">
            {productDetails.price.toFixed(2)} THB
          </p>
          <p className="mt-4 text-base text-gray-700">
            {productDetails.product_description}
          </p>

          {/* Reservation Details Section */}
          {reservationDetails && (
            <div className="my-8 flex flex-col w-full gap-3 p-4 bg-[#A5282C] rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-white">{t("reservedGift")}</h2>
              <p className="text-gray-100">
                <strong>{t("reservedBy")}:</strong> {reservationDetails.reserver_name}
              </p>
              <p className="text-gray-100">
                <strong>{t("reserverEmail")}:</strong> {reservationDetails.reserver_email}
              </p>
              <p className="text-gray-100">
                <strong>{t("privateMessage")}:</strong> "{reservationDetails.message}"
              </p>
              <p className="text-gray-100">
                <strong>{t("dateReserved")}:</strong> {reservationDetails.date_reserved}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
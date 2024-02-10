import { supabase } from "@/lib/supabase";
import Banner from "@/components/Banner";
import FAQSection from "@/components/FAQ";
import HeroSection from "@/components/HeroSection";
import HowItWorks from "@/components/HowItWorks";
import OurLists from "@/components/OurLists";
import TestimonialCarousel from "@/components/TestimonialCarousel";

const HomePage = () => {
  const testimonials = [
    {
      text: "Orci Vel Eget In Eu. Integer Amet Porttitor Hendrerit Etiam Arcu, Aliquet Duis Pretium Consequat. Semper Sed Viverra Enim Ut Nunc.",
      author: "Courtney Henry",
      avatarUrl: "/avatars/courtney-henry.png", // Replace with path to your image assets
      rating: 5,
    },
    {
      text: "Tincidunt Risus, Blandit Proin Semper. Tellus Ac Pellentesque Convallis Vitae. Lorem Enim Cursus Et Consequat Viverra Id Justo Ullamcorper. Vel.",
      author: "Darrell Steward",
      avatarUrl: "/avatars/darrell-steward.png", // Replace with path to your image assets
      rating: 4,
    },
    {
      text: "Fusce Egestas Tellus Rutrum Tellus Pellentesque Eu Tincidunt Tortor Aliquam. Nulla Pellentesque Dignissim Enim Sit Amet Venenatis.",
      author: "Theresa Webb",
      avatarUrl: "/avatars/theresa-webb.png", // Replace with path to your image assets
      rating: 5,
    },
    {
      text: "Maecenas Sed Enim Ut Sem Viverra Aliquet. Nec Sagittis Aliquam Malesuada Bibendum Arcu Vitae Elementum Curabitur.",
      author: "Cody Fisher",
      avatarUrl: "/avatars/cody-fisher.png", // Replace with path to your image assets
      rating: 4,
    },
    {
      text: "Sed Risus Pretium Quam Vulputate Dignissim Suspendisse In Est Ante In Nibh Mauris Cursus Mattis.",
      author: "Esther Howard",
      avatarUrl: "/avatars/esther-howard.png", // Replace with path to your image assets
      rating: 5,
    },
  ];
  // const setNewUser = async () => {
  //   // Example user data, replace values as needed
  //   const userData = {
  //     email: "user@example.com",
  //     password_hash: "hashed_password",
  //     username: "newuser",
  //     // Optionally include other fields as needed
  //     profile_picture_url: null, // or provide a URL
  //     created_at: new Date().toISOString(),
  //     updated_at: new Date().toISOString(),
  //     oauth_provider: null, // or specify the provider
  //   };

  //   const { data, error } = await supabase
  //     .from("users")
  //     .insert([userData])
  //     .single();

  //   console.log("*****");
  //   if (data) console.log("Insert successful:", data);
  //   if (error) console.log("Insert failed:", error);
  // };

  // setNewUser();
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <OurLists />

      {/* Responsive ; Need Final Copy */}
      <Banner />

      {/* Responsive ; Need Final Copy */}
      <TestimonialCarousel testimonials={testimonials} />

      <FAQSection />
    </>
  );
};

export default HomePage;

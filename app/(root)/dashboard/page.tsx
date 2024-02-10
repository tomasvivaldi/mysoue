import Head from "next/head";

const Login = () => {
  const wishlists = [
    {
      id: 1,
      title: "Christmas",
      description: "Short List Descriptions",
      imageUrl: "path_to_christmas_image.jpg",
    },
    {
      id: 2,
      title: "Baby Shower",
      description: "Short List Descriptions",
      imageUrl: "path_to_baby_shower_image.jpg",
    },
    // ... more wishlists
  ];
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-regular">My Wishlists</h1>
          <button className="bg-black text-white px-4 py-2 rounded hover:shadow-lg transition duration-300">
            Create New Wishlist
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlists.map((wishlist) => (
            <div
              key={wishlist.id}
              className="bg-white rounded shadow p-4 flex flex-col items-center"
            >
              <img
                src={wishlist.imageUrl}
                alt={wishlist.title}
                className="w-full h-32 object-cover rounded"
              />
              <h2 className="mt-2 font-semibold">{wishlist.title}</h2>
              <p>{wishlist.description}</p>
              <button className="mt-auto bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300">
                View List
              </button>
            </div>
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

"use client";

interface UserListsProps {
  lists: { name: string }[];
  onEdit: (listName: string) => void;
  onAddNewList: () => void;
}

const UserLists: React.FC<UserListsProps> = ({ lists, onEdit, onAddNewList }) => {
  return (
    <div className="bg-white w-full rounded-lg shadow-lg">
      {/* Heading */}
      <h2 className="text-3xl font-semibold text-black mb-4">YOUR LISTS</h2>
      <hr className="border-t border-[#C6B8A2] mb-6" />

      {/* Lists */}
      <ul className="space-y-4">
        {lists.map((list, index) => (
          <li
            key={index}
            className="flex items-center justify-between text-black text-sm"
          >
            <span className="font-semibold text-xl">{list.name}</span>
            <button
              onClick={() => onEdit(list.name)}
              className="text-[#C6B8A2] hover:underline transition"
            >
              edit
            </button>
          </li>
        ))}
      </ul>

      {/* Add New Wishlist Button */}
      <div className="mt-8">
        <button
          onClick={onAddNewList}
          className="w-full bg-transparent border border-[#C6B8A2] rounded-full py-2 text-[#C6B8A2] font-bold hover:bg-[#C6B8A2]/10 transition"
        >
          ADD NEW WISHLIST
        </button>
      </div>
    </div>
  );
};

export default UserLists;
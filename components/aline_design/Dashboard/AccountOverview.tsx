interface AccountOverviewProps {
  name: string;
  email: string;
}

const AccountOverview: React.FC<AccountOverviewProps> = ({ name, email }) => {
  return (
    <div className="bg-white min-h-screen ml-7 xs:ml-4 p-2 xs:p-8 sm:ml-0 flex flex-col items-start">
      <h1 className="text-3xl font-bold mb-2">HI, {name.toUpperCase()}</h1>
      <hr className="border-t border-[#C6B8A2] w-full mb-6" />

      <div className="w-full">
        <h2 className="text-lg font-bold text-black mb-4">YOUR PERSONAL INFO</h2>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 text-left">
          {/* Name */}
          <div className="flex flex-col">
            <h3 className="text-sm font-bold">NAME</h3>
            <p className="text-base text-black">{name}</p>
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <h3 className="text-sm font-bold">EMAIL</h3>
            <p className="text-base text-black">{email}</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button className="border border-[#C6B8A2] text-[#C6B8A2] font-bold rounded-full px-6 py-2 hover:bg-[#C6B8A2]/10 transition">
          CHANGE INFO
        </button>
      </div>
    </div>
  );
};

export default AccountOverview;
import { useState } from "react";
import EditAccountInfo from "./EditAccountInfo";
import { useTranslations } from "next-intl"; // Import next-intl for translations

interface AccountOverviewProps {
  first_name?: string;
  last_name?: string;
  username: string;
  email: string;
  birthdate?: string;
  gender?: string;
}

const AccountOverview: React.FC<AccountOverviewProps> = ({
  first_name,
  last_name,
  username,
  email,
  birthdate,
  gender,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const displayName = first_name && last_name ? `${first_name} ${last_name}` : username;
  
  const t = useTranslations("AccountOverview"); // Get translations for this component

  return (
    <div className=" h-fit ml-7 xs:ml-4 p-2 xs:p-8 sm:ml-0 flex flex-col items-start">
      <h1 className="text-3xl font-bold mb-2">{t("greeting", { name: displayName.toUpperCase() })}</h1>
      <hr className="border-t border-[#C6B8A2] w-full mb-6" />

      {/* If in Edit Mode, show EditAccountInfo */}
      {isEditing ? (
        <EditAccountInfo
          first_name={first_name}
          last_name={last_name}
          username={username}
          email={email}
          birthdate={birthdate}
          gender={gender}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          <div className="w-full">
            <h2 className="text-lg font-bold text-black mb-4">{t("personalInfo")}</h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-12 text-left flex-wrap">
              {/* Name */}
              <div className="flex flex-col">
                <h3 className="text-sm font-bold">{t("name")}</h3>
                <p className="text-base text-black">{displayName}</p>
              </div>

              {/* Email */}
              <div className="flex flex-col">
                <h3 className="text-sm font-bold">{t("email")}</h3>
                <p className="text-base text-black">{email}</p>
              </div>

              {/* Birthdate */}
             
                <div className="flex flex-col">
                  <h3 className="text-sm font-bold">{t("birthdate")}</h3>
                  {birthdate ? ( <p className="text-base text-black">{new Date(birthdate).toLocaleDateString()}</p>) : (<p>-</p>) }
                </div>
            

              {/* Gender */}
              
                <div className="flex flex-col">
                  <h3 className="text-sm font-bold">{t("gender")}</h3>
                  {gender ? (<p className="text-base text-black capitalize">{gender}</p>) : (<p>-</p>)}
                </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={() => setIsEditing(true)}
              className="border border-[#C6B8A2] text-[#C6B8A2] font-bold rounded-full px-6 py-2 hover:bg-[#C6B8A2]/10 transition"
            >
              {t("changeInfo")}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AccountOverview;
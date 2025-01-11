import { Heading } from "@/components/heading";
import { getAuth } from "@/features/auth/queries/get-auth";
import ProfileCard from "../../../../features/userprofile/components/profile-card";
import { AccountTabs } from "../_navigation/tabs";

const ProfilePage = async () => {
  const { user } = await getAuth();

  return (
    <div className="flex-1 flex flex-col gap-y-8">
      <Heading
        title="Profile"
        description="View and edit your profile information"
        tabs={<AccountTabs />}
      />

      <div className="max-w-4xl mx-auto mt-6 w-full px-4">
        <ProfileCard user={user!} />
      </div>
    </div>
  );
};

export default ProfilePage;

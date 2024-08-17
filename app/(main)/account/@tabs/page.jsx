import PersonalDetails from "../component/personal-details";
import ChangePassword from "../component/change-password";
import { getUserByEmail } from "@/queries/users";
import { auth } from "@/auth";

async function Profile() {
	const session = await auth();
	const loggedInUser = await getUserByEmail(session?.user?.email);

	return (
		<>
			<PersonalDetails userInfo={loggedInUser} />
			<div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900 mt-[30px]">
				<ChangePassword email={loggedInUser?.email} />
			</div>
		</>
	);
}

export default Profile;
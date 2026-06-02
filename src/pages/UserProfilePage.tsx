import { useCurrentUserDataQuery } from "../queries";

export function UserProfilePage() {
	const { data, isLoading, isError } = useCurrentUserDataQuery();

	const user_email = data?.email
	const user_name = data?.username

	if (isLoading) {
		return (
			<div className="flex justify-center items-center min-h-[60vh]">
				<p className="text-lg">Loading profile...</p>
			</div>
		);
	}

	if (isError) {
		return (
			<div className="flex justify-center items-center min-h-[60vh]">
				<p className="text-red-500">Failed to load profile.</p>
			</div>
		);
	}

	return (
		<div className="flex justify-center items-center py-12 px-4 m-auto">

			<div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
				<div className="flex flex-col items-center">
					<img
						src="/avatar.png"
						alt="User Avatar"
						className="w-28 h-28 rounded-full object-cover border-4 border-gray-100 shadow-md"
					/>

					<h1 className="mt-5 text-2xl font-bold text-gray-900">
						{user_name || "Unknown User"}
					</h1>

					<p className="mt-1 text-gray-500">
						{user_email || "No email available"}
					</p>
				</div>
			</div>
		</div>
	);
}
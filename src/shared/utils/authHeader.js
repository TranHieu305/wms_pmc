// Returns the Authorization header with the user's access token if available, otherwise returns an empty object.
export default function authHeader() {
	const user = JSON.parse(localStorage.getItem("user"));
	if (user && user.accessToken) {
		return { Authorization: "Bearer " + user.accessToken };
	} else {
		return {};
	}
}

function convertEnumToSelectOption(emum) {
	if (!emum) {
		return;
	}
	return Object.entries(emum).map(([key, value]) => ({
		value: value,
		label: value,
	}));
}

function convertArrToSelectOption(arr) {
	if (!Array.isArray(arr)) {
		return null;
	}
	const optionsArr = arr.map((item) => {
		return {
			value: item.id,
			label: item.name,
		};
	});

	return optionsArr;
}

function convertUserMentionsToIds(value, cacheUsers) {
	// Extract all usernames after '@'
	const usernames = value.match(/@(\w+(\.\w+)?)/g)?.map((mention) => mention.slice(1)) || [];
	// Map usernames to IDs
	const userIds = usernames.map((username) => {
		const user = cacheUsers.find((user) => user.username === username);
		return user ? user.id : null; // Return `null` if user not found
	});
	return userIds;
}

function covertIdsToUserMentions(ids, cacheUsers) {
	if (!ids || !cacheUsers) {
		return [];
	}
	// Map IDs to usernames and format as mentions
	const mentions = ids.map((id) => {
		const user = cacheUsers.find((user) => user.id === id);
		return user ? `@${user.username}` : null; // Return `null` if ID not found
	});

	// Filter out any `null` values and join mentions into a string
	return mentions.filter(Boolean).join(" ");
}

const inputHelper = {
	convertEnumToSelectOption,
	convertArrToSelectOption,
	convertUserMentionsToIds,
	covertIdsToUserMentions,
};

export default inputHelper;

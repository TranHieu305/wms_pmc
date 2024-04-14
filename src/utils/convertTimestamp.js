import moment from "moment-timezone";

/**
 * Convert timestamp to GTM+7
 * @param {timestamp} timestamp
 */
function convertTimestamp(timestamp) {
	const date = moment(timestamp);

	// Convert to GMT+7 time zone
	const gmtPlus7Date = date.tz("Asia/Bangkok");

	// Format the date string
	const formattedDate = gmtPlus7Date.format("DD-MM-YYYY HH:mm:ss");

	return formattedDate;
}

export default convertTimestamp;

import moment from "moment-timezone";

function formatCurrency(amount) {
	const formatter = new Intl.NumberFormat("vi-VN", {
		style: "currency",
		currency: "VND",
	});

	return formatter.format(amount);
}

function formatTaxRate(taxRate) {
	const formattedTaxRate = (taxRate * 100).toFixed(2); // Convert to percentage and keep 2 decimal places
	return `${formattedTaxRate}%`;
}

function formatDate(datetime) {
	if (!datetime) {
		return "---";
	}
	const date = moment(datetime);

	// Convert to GMT+7 time zone
	const gmtPlus7Date = date.tz("Asia/Bangkok");

	// Format the date string
	const formattedDate = gmtPlus7Date.format("DD/MM/YYYY");

	return formattedDate;
}

function formatDateTime(datetime) {
	if (!datetime) {
		return "---";
	}
	const date = moment(datetime);

	// Convert to GMT+7 time zone
	const gmtPlus7Date = date.tz("Asia/Bangkok");

	// Format the date string
	const formattedDate = gmtPlus7Date.format("DD-MM-YYYY HH:mm:ss");

	return formattedDate;
}

function formatQuantity(quantity) {
	return quantity ? quantity.toFixed(2) : null;
}

const dataHelper = {
	formatCurrency,
	formatTaxRate,
	formatDate,
	formatDateTime,
	formatQuantity,
};

export default dataHelper;

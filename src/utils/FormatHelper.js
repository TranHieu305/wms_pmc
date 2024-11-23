import moment from "moment-timezone";

export default class FormatHelper {
	static formatCurrency(amount) {
		const formatter = new Intl.NumberFormat("vi-VN", {
			style: "currency",
			currency: "VND",
		});

		return formatter.format(amount);
	}

	static formatTaxRate(taxRate) {
		const formattedTaxRate = (taxRate * 100).toFixed(2); // Convert to percentage and keep 2 decimal places
		return `${formattedTaxRate}%`;
	}

	static formatDate(datetime) {
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

	static formatDateTime(datetime) {
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

	static formatQuantity(quantity) {
		console.log(quantity);
		return quantity ? quantity.toFixed(2) : null;
	}
}

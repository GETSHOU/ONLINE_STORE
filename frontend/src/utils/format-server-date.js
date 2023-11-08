export const formatServerDate = dateFromServer => {
	let date = new Date(dateFromServer);

	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");

	const hours = String(date.getHours()).padStart(2, "0");
	const mins = String(date.getMinutes()).padStart(2, "0");
	const secs = String(date.getSeconds()).padStart(2, "0");

	const timezoneOffset = -date.getTimezoneOffset() / 60;
	const timezone = String(timezoneOffset).padStart(2, "0");

	return `${day}.${month}.${year}, ${hours}:${mins}:${secs}, +${timezone}:00`;
};

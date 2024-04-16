export function extractTime(dateString: string) {
	let date = new Date(dateString); 
	const year = date.getFullYear();
	const month = padZero(date.getMonth() + 1);
	const day = padZero(date.getDate());
	const hours = padZero(date.getHours());
	const minutes = padZero(date.getMinutes());
	return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function padZero(number: number) {
	return number.toString().padStart(2, "0");
}

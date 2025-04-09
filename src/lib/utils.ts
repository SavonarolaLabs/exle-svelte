export function shortenAddress(str: string) {
	if (str) {
		return str.slice(0, 5) + '...' + str.slice(-5);
	} else {
		return '';
	}
}

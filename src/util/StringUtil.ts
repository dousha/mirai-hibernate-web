export function replaceCenter(str: string, chr: string, fixedStringLength = 0) {
	if (fixedStringLength === 0) {
		return `${str.charAt(0)}${chr.repeat(str.length - 2)}${str.charAt(str.length - 1)}`;
	} else {
		return `${str.charAt(0)}${chr.repeat(fixedStringLength - 2)}${str.charAt(str.length - 1)}`;
	}
}

export function randomString(length: number = 16): string {
	const alphabet = '0123456789abcdefghijklmnopqrstuvwxyz';
	const result = new Array(length);
	for (let i = 0; i < length; i++) {
		result[i] = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
	}
	return result.toString();
}

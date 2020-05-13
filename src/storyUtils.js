export function enumValues(obj) {
	const m = {};
	Object.keys(obj).forEach((k) => {
		m[`${k} (${obj[k]})`] = obj[k];
	});
	return m;
}

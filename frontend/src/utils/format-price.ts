function formatPrice(
	data?: unknown,
	options: Record<string, string | number> = {}
) {
	const formatterOptions = {
		style: 'currency' as const,
		maximumFractionDigits: 2,
		minimumFractionDigits: 2,
		currency: 'NGN' as const,
		...options,
	};
	const NairaFormatter = new Intl.NumberFormat('en-NG', formatterOptions);

	if (
		!data ||
		(typeof data !== 'number' && typeof data !== 'string') ||
		isNaN(+data)
	)
		return { price: '0.00', value: NairaFormatter.format(0) };

	const priceValue = data as string | number;

	if (typeof priceValue === 'string') {
		const parsedValue = parseFloat(priceValue.trim());
		if (isNaN(parsedValue))
			return { price: priceValue, value: NairaFormatter.format(0) };
	}

	const value =
		typeof priceValue === 'string' ? parseFloat(priceValue.trim()) : priceValue;

	return {
		price: value.toFixed(formatterOptions.minimumFractionDigits),
		value: NairaFormatter.format(value), // returns with the currency icon
	};
}

export default formatPrice;

export const TOKENS = [
	{
		tokenId: '03faf2cb329f2e90d6d23b58d91bbb6c046aa143261cc21f52fbe2824bfcbf04',
		decimals: 2,
		name: 'SigmaUSD',
		ticker: 'SigUSD',
		project: 'Sigma USD',
		description: 'Algorithmic stablecoin',
		defaultAmount: 10_00n
	}
];

export function tokenByTicker(ticker: string) {
	return TOKENS.find((t) => t.ticker == ticker);
}

export function decimalsByTokenId(tokenId: string): number {
	return TOKENS.find((t) => t.tokenId == tokenId)!.decimals;
}

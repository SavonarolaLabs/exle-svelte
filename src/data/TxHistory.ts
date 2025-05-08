import { isExleTx, txToHistoryItem } from '$lib/exle/exle';
import { loanHistoryTxs } from '$lib/exle/loanHistory.mockdata';

export const transactions = loanHistoryTxs
	.filter((tx) => isExleTx(tx))
	.map((tx) => txToHistoryItem(tx));

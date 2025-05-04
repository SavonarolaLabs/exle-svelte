import { describe, it, expect } from 'vitest';
import { loanHistoryTxs } from './loanHistory.mockdata';

describe('bob history', () => {
	it('has 10 entries', () => {
		expect(loanHistoryTxs.length).toBe(10);
	});
});

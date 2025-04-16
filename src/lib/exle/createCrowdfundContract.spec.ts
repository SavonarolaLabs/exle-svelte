import { describe, it, expect, vi } from 'vitest';
import { createCrowdfundContract } from './exle';
import { SByte, SColl, SLong } from '@fleet-sdk/serializer';

describe('createCrowdfundContract', () => {
	it('should return a string address', () => {
		const tid = 'f60bff91f7ae3f3a5f0c2d35b46ef8991f213a61d7f7e453d344fa52a42d9f9a';
		const params = {
			_MinFee: SLong(110_000n),
			_MaxByteBoxFee: SLong(10000n),
			_LoanId: SColl(SByte, tid),
			_SLTCFTokenId: SColl(SByte, tid),
			_SLTRepaymentTokenId: SColl(SByte, tid)
		};
		const result = createCrowdfundContract(params);
		expect(typeof result).toBe('string');
	});
});

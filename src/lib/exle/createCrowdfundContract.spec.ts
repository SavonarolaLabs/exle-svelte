import { describe, it, expect, vi } from 'vitest';
import { createCrowdfundContract, EXLE_MAX_BYTE_BOX_FEE, EXLE_MINING_FEE } from './exle';
import { SByte, SColl, SLong } from '@fleet-sdk/serializer';

describe('createCrowdfundContract', () => {
	it('should return a string address', () => {
		const params = {
			_MinFee: SLong(EXLE_MINING_FEE),
			_MaxByteBoxFee: SLong(EXLE_MAX_BYTE_BOX_FEE),
			_LoanId: SColl(SByte, signedTx.ouputs[1].assets[1].tokenId),
			_SLTCFTokenId: SColl(SByte, signedTx.ouputs[0].boxId),
			_SLTRepaymentTokenId: SColl(SByte, userInput.loanTokenId)
		};
		const result = createCrowdfundContract(params);
	});
});

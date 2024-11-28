export type Repayment = {
	loanId: string;
	loanType: string;
	loanTitle: string;
	loanDescription: string;
	repaymentPeriod: string;
	interestRate: string;
	fundingGoal: string;
	repaidAmount: string;
	repaidPercentage: number;
	daysLeft: number;
	creator: string;
};

export const repayments: Repayment[] = [
	{
		loanId: '545271...2067cc',
		loanType: 'Crowdfund',
		loanTitle: 'Sweetwaters Shop',
		loanDescription: 'Requesting for $1000 loan to increase my store stock...',
		repaymentPeriod: '90 Days Repayment Period',
		interestRate: '4.5% Interest Rate',
		fundingGoal: '1,500.00 SigUSD',
		repaidAmount: '$1,142',
		repaidPercentage: 76,
		daysLeft: 31,
		creator: '9eq6S...QXssg'
	},
	{
		loanId: '674582...3072ab',
		loanType: 'Crowdfund',
		loanTitle: 'Tropic Market Expansion',
		loanDescription: 'Seeking funds to expand Tropic Market...',
		repaymentPeriod: '60 Days Repayment Period',
		interestRate: '3.8% Interest Rate',
		fundingGoal: '2,000.00 SigUSD',
		repaidAmount: '$1,500',
		repaidPercentage: 75,
		daysLeft: 15,
		creator: 'user123...XZgqr'
	}
];

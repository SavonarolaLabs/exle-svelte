export interface Loan {
	loanId: string;
	loanType: string;
	loanTitle: string;
	loanDescription: string;
	repaymentPeriod: string;
	interestRate: string;
	fundingGoal: string;
	fundedAmount: string;
	fundedPercentage: number;
	daysLeft: number;
	creator: string;
}

export const loans: Loan[] = [
	{
		loanId: '545271...2067cc',
		loanType: 'Crowdloan',
		loanTitle: 'Sweetwaters Shop',
		loanDescription:
			'Requesting for $1000 loan to increase my store stock and product ranges to draw more customers during this Christmas shopping season.',
		repaymentPeriod: '90 Days',
		interestRate: '4.5%',
		fundingGoal: '1,500.00 SigUSD',
		fundedAmount: '$1,142',
		fundedPercentage: 76,
		daysLeft: 31,
		creator: '9eq6S...QXssg'
	},
	{
		loanId: '453231...2078dd',
		loanType: 'Crowdloan',
		loanTitle: 'Village Bakery',
		loanDescription:
			'Looking for a $500 loan to modernize equipment and improve product quality for local customers.',
		repaymentPeriod: '60 Days',
		interestRate: '3.5%',
		fundingGoal: '500.00 SigUSD',
		fundedAmount: '$300',
		fundedPercentage: 60,
		daysLeft: 20,
		creator: '8pd6T...QXndg'
	},
	{
		loanId: '348912...1267ab',
		loanType: 'Crowdloan',
		loanTitle: 'Tech Startup Expansion',
		loanDescription:
			'Seeking $10,000 to expand our innovative tech startup, increasing production capacity and market presence.',
		repaymentPeriod: '120 Days',
		interestRate: '6.5%',
		fundingGoal: '10,000.00 SigUSD',
		fundedAmount: '$7,500',
		fundedPercentage: 75,
		daysLeft: 45,
		creator: '7fg3S...XHdga'
	},
	{
		loanId: '897321...1190aa',
		loanType: 'Crowdloan',
		loanTitle: 'Local Farm Sustainability',
		loanDescription:
			'Raising $2,000 to invest in eco-friendly farming tools and practices for better yield and sustainability.',
		repaymentPeriod: '90 Days',
		interestRate: '4.0%',
		fundingGoal: '2,000.00 SigUSD',
		fundedAmount: '$1,300',
		fundedPercentage: 65,
		daysLeft: 28,
		creator: '4op6G...QWerr'
	},
	{
		loanId: '657823...3145bb',
		loanType: 'Crowdloan',
		loanTitle: 'Bookstore Renovation',
		loanDescription:
			'Looking for $1,200 to renovate our family-owned bookstore and attract more customers.',
		repaymentPeriod: '60 Days',
		interestRate: '3.8%',
		fundingGoal: '1,200.00 SigUSD',
		fundedAmount: '$800',
		fundedPercentage: 66,
		daysLeft: 15,
		creator: '2ty7U...QRffe'
	},
	{
		loanId: '234921...7644cc',
		loanType: 'Crowdloan',
		loanTitle: 'Artisan Coffee Expansion',
		loanDescription: 'Seeking $5,000 to expand our coffee business to more locations in the city.',
		repaymentPeriod: '120 Days',
		interestRate: '5.0%',
		fundingGoal: '5,000.00 SigUSD',
		fundedAmount: '$3,400',
		fundedPercentage: 68,
		daysLeft: 38,
		creator: '3kl9T...QErfg'
	},
	{
		loanId: '874562...5412dd',
		loanType: 'Crowdloan',
		loanTitle: 'Community Gym Equipment',
		loanDescription: 'Requesting $3,000 to upgrade gym equipment for our community fitness center.',
		repaymentPeriod: '90 Days',
		interestRate: '4.2%',
		fundingGoal: '3,000.00 SigUSD',
		fundedAmount: '$2,500',
		fundedPercentage: 83,
		daysLeft: 12,
		creator: '6nm1H...QRsad'
	},
	{
		loanId: '974563...7655ee',
		loanType: 'Crowdloan',
		loanTitle: 'Solar Energy Project',
		loanDescription:
			'Looking for $15,000 to set up solar panels and promote renewable energy solutions in our town.',
		repaymentPeriod: '180 Days',
		interestRate: '7.0%',
		fundingGoal: '15,000.00 SigUSD',
		fundedAmount: '$10,000',
		fundedPercentage: 67,
		daysLeft: 60,
		creator: '8lo5R...QXcfd'
	},
	{
		loanId: '176234...9806ff',
		loanType: 'Crowdloan',
		loanTitle: 'Mobile App Development',
		loanDescription:
			'Seeking $8,000 to launch a mobile app that connects small businesses with local customers.',
		repaymentPeriod: '120 Days',
		interestRate: '6.0%',
		fundingGoal: '8,000.00 SigUSD',
		fundedAmount: '$6,000',
		fundedPercentage: 75,
		daysLeft: 35,
		creator: '5rd3L...QKffd'
	},
	{
		loanId: '238764...5632gg',
		loanType: 'Crowdloan',
		loanTitle: 'Eco Clothing Line',
		loanDescription:
			'Raising $3,500 to launch an eco-friendly clothing line made from sustainable materials.',
		repaymentPeriod: '90 Days',
		interestRate: '4.8%',
		fundingGoal: '3,500.00 SigUSD',
		fundedAmount: '$2,000',
		fundedPercentage: 57,
		daysLeft: 25,
		creator: '9as3T...QWeer'
	},
	{
		loanId: '325614...4365hh',
		loanType: 'Crowdloan',
		loanTitle: 'Culinary School Startup',
		loanDescription:
			'Requesting $7,500 to start a culinary school focused on underprivileged youth.',
		repaymentPeriod: '150 Days',
		interestRate: '5.5%',
		fundingGoal: '7,500.00 SigUSD',
		fundedAmount: '$5,500',
		fundedPercentage: 73,
		daysLeft: 42,
		creator: '3lo8T...QJqqd'
	},
	{
		loanId: '543219...2311ii',
		loanType: 'Crowdloan',
		loanTitle: 'Music Studio Upgrade',
		loanDescription:
			'Looking for $4,000 to upgrade our music studio equipment for better production quality.',
		repaymentPeriod: '90 Days',
		interestRate: '4.5%',
		fundingGoal: '4,000.00 SigUSD',
		fundedAmount: '$3,000',
		fundedPercentage: 75,
		daysLeft: 30,
		creator: '4lk6R...QWeew'
	}
];

//Ensure this is always the same as the backend
export enum ExperienceLevel {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Expert = 'Expert',
}

export enum InvestmentTimeframe {
  DayTrader = 'Day Trader (1 day - 1 week)',
  ShortTermInvestor = 'Short Term Investor (1-6 months)',
  MediumTermInvestor = 'Medium Term Investor (6 -12 months)',
  LongTermInvestor = 'Long Term Investor (1 - 5 years+)',
}

export enum InvestorType {
  ShortTermTrader = 'Short Term Trader',
  ValueInvestor = 'Value Investor',
  GrowthInvestor = 'Growth Investor',
  DividendInvestor = 'Dividend Investor',
  QualityInvestor = 'Quality Investor',
  NoStrategyInvestor = 'No Strategy Investor',
  Other = 'Other',
}

export interface OnboardingData {
  name: string
  age: number
  experienceLevel: ExperienceLevel
  investmentTimeframe: InvestmentTimeframe
  investorType: InvestorType
  isOnboarded: boolean
}

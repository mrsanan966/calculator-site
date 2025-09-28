
// Financial calculation utilities

// Calculate monthly mortgage payment
export const calculateMortgagePayment = (principal, interestRate, loanTermYears) => {
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTermYears * 12;
  
  if (monthlyRate === 0) return principal / numberOfPayments;
  
  const monthlyPayment = 
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
  
  return monthlyPayment;
};

// Calculate loan payment
export const calculateLoanPayment = (principal, interestRate, loanTermMonths) => {
  const monthlyRate = interestRate / 100 / 12;
  
  if (monthlyRate === 0) return principal / loanTermMonths;
  
  const monthlyPayment = 
    (principal * monthlyRate * Math.pow(1 + monthlyRate, loanTermMonths)) / 
    (Math.pow(1 + monthlyRate, loanTermMonths) - 1);
  
  return monthlyPayment;
};

// Calculate auto loan payment
export const calculateAutoLoanPayment = (principal, interestRate, loanTermMonths, downPayment = 0) => {
  const loanAmount = principal - downPayment;
  return calculateLoanPayment(loanAmount, interestRate, loanTermMonths);
};

// Calculate HELOC payment and borrowing power
export const calculateHeloc = (homeValue, currentMortgageBalance, creditLimit, interestRate, drawPeriodYears = 10) => {
  const equity = homeValue - currentMortgageBalance;
  const maxCreditLine = Math.min(equity * 0.85, creditLimit); // Usually 85% of equity
  const monthlyInterestOnly = (maxCreditLine * (interestRate / 100)) / 12;
  const monthlyPrincipalAndInterest = calculateLoanPayment(maxCreditLine, interestRate, (25 - drawPeriodYears) * 12);
  
  return {
    availableEquity: equity,
    maxCreditLine,
    monthlyInterestOnly,
    monthlyPrincipalAndInterest,
  };
};

// Calculate student loan payment with different repayment plans
export const calculateStudentLoan = (principal, interestRate, loanTermYears, repaymentPlan = 'standard') => {
  const monthlyRate = interestRate / 100 / 12;
  const numberOfPayments = loanTermYears * 12;
  
  switch (repaymentPlan) {
    case 'income-based':
      // Simplified income-based calculation (15% of discretionary income)
      return principal * 0.15 / 12;
    case 'graduated':
      // Start with lower payment, increases every 2 years
      const standardPayment = calculateLoanPayment(principal, interestRate, numberOfPayments);
      return standardPayment * 0.6; // Starts at 60% of standard payment
    default: // standard
      return calculateLoanPayment(principal, interestRate, numberOfPayments);
  }
};

// Calculate margin requirements and buying power
export const calculateMargin = (accountValue, marginRequirement, stockPrice) => {
  const initialMargin = marginRequirement / 100;
  const maintenanceMargin = initialMargin * 0.75;
  const buyingPower = accountValue / initialMargin;
  const maxShares = Math.floor(buyingPower / stockPrice);
  
  return {
    buyingPower,
    maxShares,
    maintenanceMarginAmount: accountValue * maintenanceMargin,
    initialMarginAmount: accountValue * initialMargin
  };
};

// Calculate profit margins
export const calculateProfitMargins = (revenue, costOfGoods, operatingExpenses) => {
  const grossProfit = revenue - costOfGoods;
  const operatingProfit = grossProfit - operatingExpenses;
  
  return {
    grossMargin: (grossProfit / revenue) * 100,
    operatingMargin: (operatingProfit / revenue) * 100,
    netMargin: (operatingProfit / revenue) * 100 // Simplified, not including taxes/interest
  };
};

// Calculate gross margin
export const calculateGrossMargin = (revenue, costOfGoods) => {
  const grossProfit = revenue - costOfGoods;
  return (grossProfit / revenue) * 100;
};

// Calculate ADP paycheck
export const calculateAdpPaycheck = (
  grossPay,
  payFrequency,
  federalFilingStatus,
  state,
  allowances,
  additional = { k401: 0, insurance: 0, other: 0 }
) => {
  // Simplified tax calculations
  const federalTax = grossPay * 0.22; // Example rate
  const stateTax = grossPay * 0.05; // Example rate
  const socialSecurity = grossPay * 0.062;
  const medicare = grossPay * 0.0145;
  
  const totalDeductions = 
    federalTax + 
    stateTax + 
    socialSecurity + 
    medicare + 
    additional.k401 + 
    additional.insurance + 
    additional.other;
  
  return {
    grossPay,
    federalTax,
    stateTax,
    socialSecurity,
    medicare,
    totalDeductions,
    netPay: grossPay - totalDeductions
  };
};

// Calculate California paycheck
export const calculateCaliforniaPaycheck = (
  grossPay,
  payFrequency,
  filingStatus,
  allowances,
  additional = { k401: 0, insurance: 0, sdi: true }
) => {
  // California specific calculations
  const federalTax = grossPay * 0.22; // Example rate
  const stateTax = grossPay * 0.06; // CA specific rate
  const socialSecurity = grossPay * 0.062;
  const medicare = grossPay * 0.0145;
  const sdi = additional.sdi ? grossPay * 0.009 : 0; // CA SDI rate
  
  const totalDeductions = 
    federalTax + 
    stateTax + 
    socialSecurity + 
    medicare + 
    sdi + 
    additional.k401 + 
    additional.insurance;
  
  return {
    grossPay,
    federalTax,
    stateTax,
    socialSecurity,
    medicare,
    sdi,
    totalDeductions,
    netPay: grossPay - totalDeductions
  };
};

// Calculate CIT Bank Platinum Savings earnings
export const calculateCitPlatinumSavings = (
  principal,
  monthlyDeposit,
  years,
  apy = 5.05 // Current APY as of calculation
) => {
  const monthlyRate = apy / 100 / 12;
  const months = years * 12;
  let balance = principal;
  
  for (let i = 0; i < months; i++) {
    balance = balance * (1 + monthlyRate) + monthlyDeposit;
  }
  
  return {
    finalBalance: balance,
    totalDeposits: principal + (monthlyDeposit * months),
    totalInterest: balance - (principal + (monthlyDeposit * months))
  };
};

// Calculate odds conversion and probability
export const calculateOdds = (odds, format = 'decimal') => {
  let decimal, american, fractional, probability;
  
  switch (format) {
    case 'american':
      american = odds;
      decimal = american > 0 ? (american / 100) + 1 : (100 / Math.abs(american)) + 1;
      break;
    case 'fractional':
      const [num, den] = odds.split('/').map(Number);
      decimal = (num / den) + 1;
      american = decimal >= 2 ? ((decimal - 1) * 100) : (-100 / (decimal - 1));
      break;
    default: // decimal
      decimal = odds;
      american = decimal >= 2 ? ((decimal - 1) * 100) : (-100 / (decimal - 1));
  }
  
  probability = (1 / decimal) * 100;
  
  return {
    decimal,
    american,
    probability
  };
};

// Calculate parlay odds and payout
export const calculateParlay = (odds) => {
  // Convert all odds to decimal format
  const decimalOdds = odds.map(odd => {
    if (typeof odd === 'string' && odd.includes('/')) {
      const [num, den] = odd.split('/').map(Number);
      return (num / den) + 1;
    }
    if (typeof odd === 'number') {
      return odd > 0 ? (odd / 100) + 1 : (100 / Math.abs(odd)) + 1;
    }
    return odd;
  });
  
  // Calculate total odds and payout
  const totalOdds = decimalOdds.reduce((acc, curr) => acc * curr, 1);
  
  return {
    totalOdds,
    impliedProbability: (1 / totalOdds) * 100
  };
};

// Calculate refinance savings
export const calculateRefinanceSavings = (
  currentLoanBalance,
  currentInterestRate,
  currentRemainingMonths,
  newInterestRate,
  newLoanTermMonths,
  closingCosts
) => {
  // Calculate current monthly payment
  const currentMonthlyPayment = calculateLoanPayment(
    currentLoanBalance,
    currentInterestRate,
    currentRemainingMonths
  );
  
  // Calculate new monthly payment
  const newMonthlyPayment = calculateLoanPayment(
    currentLoanBalance,
    newInterestRate,
    newLoanTermMonths
  );
  
  // Monthly savings
  const monthlySavings = currentMonthlyPayment - newMonthlyPayment;
  
  // Total cost of current loan (remaining)
  const currentTotalCost = currentMonthlyPayment * currentRemainingMonths;
  
  // Total cost of new loan
  const newTotalCost = newMonthlyPayment * newLoanTermMonths + closingCosts;
  
  // Lifetime savings
  const lifetimeSavings = currentTotalCost - newTotalCost;
  
  // Break-even point in months
  const breakEvenMonths = closingCosts / monthlySavings;
  
  return {
    monthlySavings,
    lifetimeSavings,
    breakEvenMonths,
    currentMonthlyPayment,
    newMonthlyPayment
  };
};

// Calculate amortization schedule
export const calculateAmortizationSchedule = (principal, interestRate, loanTermMonths) => {
  const monthlyRate = interestRate / 100 / 12;
  const monthlyPayment = calculateLoanPayment(principal, interestRate, loanTermMonths);
  
  let balance = principal;
  const schedule = [];
  
  for (let month = 1; month <= loanTermMonths; month++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    
    balance -= principalPayment;
    
    // Adjust for final payment rounding
    if (month === loanTermMonths) {
      balance = 0;
    }
    
    schedule.push({
      month,
      payment: monthlyPayment,
      principalPayment,
      interestPayment,
      balance: Math.max(0, balance),
      totalInterest: schedule.reduce((sum, payment) => sum + payment.interestPayment, 0) + interestPayment
    });
  }
  
  return schedule;
};

// Calculate simple tax estimate (very basic implementation)
export const calculateIncomeTax = (income, filingStatus) => {
  // This is a simplified tax calculation for demonstration
  // In a real application, you would use actual tax brackets and rates
  let taxRate = 0;
  
  if (filingStatus === 'single') {
    if (income <= 10000) taxRate = 0.1;
    else if (income <= 40000) taxRate = 0.12;
    else if (income <= 85000) taxRate = 0.22;
    else if (income <= 165000) taxRate = 0.24;
    else if (income <= 210000) taxRate = 0.32;
    else if (income <= 520000) taxRate = 0.35;
    else taxRate = 0.37;
  } else if (filingStatus === 'married') {
    if (income <= 20000) taxRate = 0.1;
    else if (income <= 80000) taxRate = 0.12;
    else if (income <= 170000) taxRate = 0.22;
    else if (income <= 330000) taxRate = 0.24;
    else if (income <= 420000) taxRate = 0.32;
    else if (income <= 620000) taxRate = 0.35;
    else taxRate = 0.37;
  }
  
  return income * taxRate;
};

// Calculate future value of investment
export const calculateFutureValue = (principal, monthlyContribution, annualInterestRate, years) => {
  const monthlyRate = annualInterestRate / 100 / 12;
  const months = years * 12;
  
  let futureValue = principal;
  
  for (let i = 0; i < months; i++) {
    futureValue = futureValue * (1 + monthlyRate) + monthlyContribution;
  }
  
  return futureValue;
};

// Format currency
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

// Format percentage
export const formatPercentage = (percentage) => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(percentage / 100);
};

// Format number with commas
export const formatNumber = (number) => {
  return new Intl.NumberFormat('en-US').format(number);
};

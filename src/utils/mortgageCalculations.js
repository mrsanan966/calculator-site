export const calculateMortgage = (formData) => {
  const {
    homePrice,
    downPayment,
    interestRate,
    loanTerm,
    propertyTax = 0,
    insurance = 0,
    pmi = 0
  } = formData;

  // Convert inputs to numbers
  const principal = Number(homePrice) - Number(downPayment);
  const annualRate = Number(interestRate) / 100;
  const monthlyRate = annualRate / 12;
  const numberOfPayments = Number(loanTerm) * 12;

  // Calculate monthly mortgage payment
  const monthlyPayment = principal * 
    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  // Calculate total payment and interest
  const totalPayment = monthlyPayment * numberOfPayments;
  const totalInterest = totalPayment - principal;

  // Add monthly property tax and insurance
  const monthlyPropertyTax = Number(propertyTax) / 12;
  const monthlyInsurance = Number(insurance) / 12;
  const monthlyPMI = Number(pmi);

  const totalMonthlyPayment = monthlyPayment + monthlyPropertyTax + monthlyInsurance + monthlyPMI;

  return {
    monthlyPayment: totalMonthlyPayment,
    totalPayment: totalMonthlyPayment * numberOfPayments,
    totalInterest,
    loanAmount: principal
  };
};

export const calculateAmortizationSchedule = (formData) => {
  const {
    homePrice,
    downPayment,
    interestRate,
    loanTerm
  } = formData;

  const principal = Number(homePrice) - Number(downPayment);
  const annualRate = Number(interestRate) / 100;
  const monthlyRate = annualRate / 12;
  const numberOfPayments = Number(loanTerm) * 12;

  const monthlyPayment = principal * 
    (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
    (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

  let remainingBalance = principal;
  const schedule = [];

  for (let month = 1; month <= numberOfPayments; month++) {
    const interestPayment = remainingBalance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    remainingBalance -= principalPayment;

    schedule.push({
      month,
      payment: monthlyPayment,
      principalPayment,
      interestPayment,
      remainingBalance: Math.max(0, remainingBalance)
    });
  }

  return schedule;
};

export const calculateLoanToValue = (homePrice, downPayment) => {
  const loanAmount = Number(homePrice) - Number(downPayment);
  return (loanAmount / Number(homePrice)) * 100;
};

export const calculateDownPaymentPercentage = (homePrice, downPayment) => {
  return (Number(downPayment) / Number(homePrice)) * 100;
};

export const calculatePMI = (homePrice, downPayment) => {
  const ltv = calculateLoanToValue(homePrice, downPayment);
  if (ltv <= 80) return 0;
  
  // PMI typically ranges from 0.5% to 1% of the loan amount annually
  const annualPMIRate = 0.01; // 1%
  const loanAmount = Number(homePrice) - Number(downPayment);
  return (loanAmount * annualPMIRate) / 12; // Monthly PMI
}; 
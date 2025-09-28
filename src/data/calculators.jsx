import React from "react";
import { Home, Calculator as LoanIcon, DollarSign, Car, Briefcase, RefreshCw, CreditCard, Building, Mountain, CloudSnow, ShoppingBasket as Basketball, Edit3, UserCheck, Sigma, Clock, Home as HelocIcon, Dice2 as Dice, Calculator, Wallet, TrendingUp, PieChart, BarChart, GraduationCap, DollarSign as PaycheckIcon, Wallet as Bank, PiggyBank, Scale, Home as PropertyIcon, Briefcase as SalaryIcon, Car as CarIcon, Car as CarPaymentIcon, Home as LivingIcon, CreditCard as DebtIcon, CreditCard as DebtPayoffIcon, Calculator as ComparisonIcon, Home as ZillowIcon, Database, Heart, Rocket, PiggyBank as SavingsIcon, Briefcase as BudgetIcon, Car as CarAffordabilityIcon, Home as CostOfLivingIcon, CreditCard as DebtConsolidationIcon, CreditCard as DebtPayoffIcon2, Calculator as LoanComparisonIcon, Briefcase as SalaryIcon2, PiggyBank as SavingsIcon2 } from 'lucide-react';

export const calculators = [
  {
    title: "Zillow Home Value Calculator",
    description: "Estimate your home's current market value based on location, features, and market conditions.",
    icon: <ZillowIcon />,
    path: "/zillow-home-value-calculator",
    color: "bg-blue-100 dark:bg-blue-900/30",
    category: "Financial"
  },
  {
    title: "Zillow Mortgage Calculator",
    description: "Calculate mortgage payments, view amortization schedules, and estimate total costs.",
    icon: <ZillowIcon />,
    path: "/zillow-mortgage-calculator",
    color: "bg-blue-100 dark:bg-blue-900/30",
    category: "Financial"
  },
  {
    title: "Zillow Rent Calculator",
    description: "Calculate affordable rent based on your income and expenses.",
    icon: <ZillowIcon />,
    path: "/zillow-rent-calculator",
    color: "bg-blue-100 dark:bg-blue-900/30",
    category: "Financial"
  },
  {
    title: "Zillow ROI Calculator",
    description: "Calculate real estate investment returns and analyze property ROI.",
    icon: <ZillowIcon />,
    path: "/zillow-roi-calculator",
    color: "bg-blue-100 dark:bg-blue-900/30",
    category: "Financial"
  },
  {
    title: "Mortgage Calculator",
    description: "Calculate monthly payments and view amortization schedules.",
    icon: <Home />,
    path: "/mortgage",
    color: "bg-blue-100 dark:bg-blue-900/30",
    category: "Financial"
  },
  {
    title: "HELOC Calculator",
    description: "Calculate home equity line of credit payments and borrowing power.",
    icon: <HelocIcon />,
    path: "/heloc",
    color: "bg-emerald-100 dark:bg-emerald-900/30",
    category: "Financial"
  },
  {
    title: "Loan Calculator",
    description: "Determine payments and total interest for various loan types.",
    icon: <LoanIcon />,
    path: "/loan",
    color: "bg-green-100 dark:bg-green-900/30",
    category: "Financial"
  },
  {
    title: "Student Loan Calculator",
    description: "Plan your student loan repayment and understand total costs.",
    icon: <GraduationCap />,
    path: "/student-loan",
    color: "bg-violet-100 dark:bg-violet-900/30",
    category: "Financial"
  },
  {
    title: "Land Loan Calculator",
    description: "Estimate payments for purchasing land or undeveloped lots.",
    icon: <Mountain />,
    path: "/land-loan",
    color: "bg-lime-100 dark:bg-lime-900/30",
    category: "Financial"
  },
  {
    title: "Auto Loan Calculator",
    description: "Calculate car loan payments and compare financing options.",
    icon: <Car />,
    path: "/auto-loan",
    color: "bg-yellow-100 dark:bg-yellow-900/30",
    category: "Financial"
  },
  {
    title: "Tax Calculator",
    description: "Estimate your income tax liability based on filing status.",
    icon: <DollarSign />,
    path: "/tax",
    color: "bg-red-100 dark:bg-red-900/30",
    category: "Financial"
  },
  {
    title: "Refinance Calculator",
    description: "Analyze potential savings from refinancing your mortgage.",
    icon: <RefreshCw />,
    path: "/refinance",
    color: "bg-purple-100 dark:bg-purple-900/30",
    category: "Financial"
  },
  {
    title: "Personal Loan Calculator",
    description: "Calculate payments for unsecured personal loans.",
    icon: <CreditCard />,
    path: "/personal-loan",
    color: "bg-indigo-100 dark:bg-indigo-900/30",
    category: "Financial"
  },
  {
    title: "Investment Growth",
    description: "Calculate future value of investments and savings.",
    icon: <Briefcase />,
    path: "/finance",
    color: "bg-pink-100 dark:bg-pink-900/30",
    category: "Financial"
  },
  {
    title: "Margin Calculator",
    description: "Calculate trading margins and potential returns.",
    icon: <TrendingUp />,
    path: "/margin",
    color: "bg-cyan-100 dark:bg-cyan-900/30",
    category: "Financial"
  },
  {
    title: "Profit Margin Calculator",
    description: "Calculate and analyze your business profit margins.",
    icon: <PieChart />,
    path: "/profit-margin",
    color: "bg-rose-100 dark:bg-rose-900/30",
    category: "Financial"
  },
  {
    title: "Gross Margin Calculator",
    description: "Determine gross margins and pricing strategies.",
    icon: <BarChart />,
    path: "/gross-margin",
    color: "bg-amber-100 dark:bg-amber-900/30",
    category: "Financial"
  },
  {
    title: "ADP Paycheck Calculator",
    description: "Estimate your take-home pay after deductions.",
    icon: <PaycheckIcon />,
    path: "/adp-paycheck",
    color: "bg-slate-100 dark:bg-slate-900/30",
    category: "Financial"
  },
  {
    title: "California Paycheck Calculator",
    description: "Calculate CA state-specific take-home pay.",
    icon: <Wallet />,
    path: "/california-paycheck",
    color: "bg-blue-100 dark:bg-blue-900/30",
    category: "Financial"
  },
  {
    title: "CIT Bank Platinum Savings",
    description: "Calculate potential earnings with CIT Bank Platinum Savings.",
    icon: <Bank />,
    path: "/cit-platinum-savings",
    color: "bg-emerald-100 dark:bg-emerald-900/30",
    category: "Financial"
  },
  {
    title: "Odds Calculator",
    description: "Calculate probability and odds for various scenarios.",
    icon: <Calculator />,
    path: "/odds",
    color: "bg-violet-100 dark:bg-violet-900/30",
    category: "Probability"
  },
  {
    title: "Parlay Calculator",
    description: "Calculate potential payouts for parlay bets.",
    icon: <Dice />,
    path: "/parlay",
    color: "bg-purple-100 dark:bg-purple-900/30",
    category: "Probability"
  },
  {
    title: "Grade Calculator",
    description: "Calculate your course grade based on assignments and weights.",
    icon: <Edit3 />,
    path: "/grade",
    color: "bg-teal-100 dark:bg-teal-900/30",
    category: "Academic & Utility"
  },
  {
    title: "Age Calculator",
    description: "Calculate your exact age or the age of anything.",
    icon: <UserCheck />,
    path: "/age",
    color: "bg-sky-100 dark:bg-sky-900/30",
    category: "Academic & Utility"
  },
  {
    title: "GPA Calculator",
    description: "Calculate your Grade Point Average based on grades and credits.",
    icon: <Sigma />,
    path: "/gpa",
    color: "bg-fuchsia-100 dark:bg-fuchsia-900/30",
    category: "Academic & Utility"
  },
  {
    title: "Time Calculator",
    description: "Add, subtract, and calculate durations between times.",
    icon: <Clock />,
    path: "/time",
    color: "bg-rose-100 dark:bg-rose-900/30",
    category: "Academic & Utility"
  },
  {
    title: "Snow Day Calculator",
    description: "Predict the likelihood of a snow day based on forecast.",
    icon: <CloudSnow />,
    path: "/snow-day",
    color: "bg-cyan-100 dark:bg-cyan-900/30",
    category: "Fun"
  },
  {
    title: "Dunk Calculator",
    description: "Estimate if you can dunk based on your reach and jump.",
    icon: <Basketball />,
    path: "/dunk",
    color: "bg-amber-100 dark:bg-amber-900/30",
    category: "Fun"
  },
  {
    title: "Auto Loan Refinance Calculator",
    description: "Calculate potential savings from refinancing your auto loan.",
    icon: <RefreshCw />,
    path: "/auto-loan-refinance",
    color: "bg-blue-100 dark:bg-blue-900/30",
    category: "Financial"
  },
  {
    title: "Budget Calculator",
    description: "Plan and track your monthly budget and expenses.",
    icon: <PiggyBank />,
    path: "/budget",
    color: "bg-green-100 dark:bg-green-900/30",
    category: "Financial"
  },
  {
    title: "Car Affordability Calculator",
    description: "Determine how much car you can afford based on your income.",
    icon: <CarIcon />,
    path: "/car-affordability",
    color: "bg-yellow-100 dark:bg-yellow-900/30",
    category: "Financial"
  },
  {
    title: "Car Payment Calculator",
    description: "Calculate your monthly car payment and total cost.",
    icon: <CarPaymentIcon />,
    path: "/car-payment",
    color: "bg-orange-100 dark:bg-orange-900/30",
    category: "Financial"
  },
  {
    title: "Cost of Living Calculator",
    description: "Compare living expenses between different locations.",
    icon: <LivingIcon />,
    path: "/cost-of-living",
    color: "bg-purple-100 dark:bg-purple-900/30",
    category: "Financial"
  },
  {
    title: "Debt Consolidation Calculator",
    description: "Calculate potential savings from consolidating your debts.",
    icon: <DebtIcon />,
    path: "/debt-consolidation",
    color: "bg-red-100 dark:bg-red-900/30",
    category: "Financial"
  },
  {
    title: "Debt Payoff Calculator",
    description: "Create a plan to pay off your debts efficiently.",
    icon: <DebtPayoffIcon />,
    path: "/debt-payoff",
    color: "bg-pink-100 dark:bg-pink-900/30",
    category: "Financial"
  },
  {
    title: "Loan Comparison Calculator",
    description: "Compare different loan options and their costs.",
    icon: <ComparisonIcon />,
    path: "/loan-comparison",
    color: "bg-indigo-100 dark:bg-indigo-900/30",
    category: "Financial"
  },
  {
    title: "Salary Calculator",
    description: "Calculate your take-home pay and tax deductions.",
    icon: <SalaryIcon />,
    path: "/salary",
    color: "bg-cyan-100 dark:bg-cyan-900/30",
    category: "Financial"
  },
  {
    title: "Savings Calculator",
    description: "Plan your savings goals and track your progress.",
    icon: <PiggyBank />,
    path: "/savings",
    color: "bg-emerald-100 dark:bg-emerald-900/30",
    category: "Financial"
  },
  {
    title: "BigQuery Cost Calculator",
    description: "Estimate your Google BigQuery usage costs and optimize your queries.",
    icon: <Database />,
    path: "/bigquery-cost",
    color: "bg-blue-100 dark:bg-blue-900/30",
    category: "Utility"
  },
  {
    title: "CIT Bank Calculator",
    description: "Calculate potential earnings with CIT Bank accounts.",
    icon: <Bank />,
    path: "/cit-bank",
    color: "bg-emerald-100 dark:bg-emerald-900/30",
    category: "Financial"
  },
  {
    title: "CIT Bank High Yield Savings",
    description: "Calculate returns on CIT Bank High Yield Savings accounts.",
    icon: <Bank />,
    path: "/cit-high-yield-savings",
    color: "bg-emerald-100 dark:bg-emerald-900/30",
    category: "Financial"
  },
  {
    title: "CIT HYSA Calculator",
    description: "Calculate potential earnings with CIT Bank High Yield Savings Account.",
    icon: <Bank />,
    path: "/cit-hysa",
    color: "bg-emerald-100 dark:bg-emerald-900/30",
    category: "Financial"
  },
  {
    title: "Rocket Mortgage Calculator",
    description: "Calculate mortgage payments and refinancing options with Rocket Mortgage.",
    icon: <Rocket />,
    path: "/rocket-mortgage",
    color: "bg-orange-100 dark:bg-orange-900/30",
    category: "Financial"
  },
  {
    title: "Auto Loan Refinance Calculator",
    description: "Calculate potential savings from refinancing your auto loan.",
    icon: <CarIcon />,
    path: "/auto-loan-refinance",
    color: "bg-yellow-100 dark:bg-yellow-900/30",
    category: "Financial"
  },
  {
    title: "Budget Calculator",
    description: "Create and manage your personal or household budget.",
    icon: <BudgetIcon />,
    path: "/budget",
    color: "bg-green-100 dark:bg-green-900/30",
    category: "Financial"
  },
  {
    title: "Car Affordability Calculator",
    description: "Determine how much car you can afford based on your income and expenses.",
    icon: <CarAffordabilityIcon />,
    path: "/car-affordability",
    color: "bg-yellow-100 dark:bg-yellow-900/30",
    category: "Financial"
  },
  {
    title: "Car Payment Calculator",
    description: "Calculate monthly car payments and total cost of ownership.",
    icon: <CarPaymentIcon />,
    path: "/car-payment",
    color: "bg-yellow-100 dark:bg-yellow-900/30",
    category: "Financial"
  },
  {
    title: "Cost of Living Calculator",
    description: "Compare cost of living between different cities and locations.",
    icon: <CostOfLivingIcon />,
    path: "/cost-of-living",
    color: "bg-blue-100 dark:bg-blue-900/30",
    category: "Financial"
  },
  {
    title: "Debt Consolidation Calculator",
    description: "Calculate potential savings from consolidating your debts.",
    icon: <DebtConsolidationIcon />,
    path: "/debt-consolidation",
    color: "bg-red-100 dark:bg-red-900/30",
    category: "Financial"
  },
  {
    title: "Debt Payoff Calculator",
    description: "Create a debt payoff plan and track your progress.",
    icon: <DebtPayoffIcon2 />,
    path: "/debt-payoff",
    color: "bg-red-100 dark:bg-red-900/30",
    category: "Financial"
  },
  {
    title: "Loan Comparison Calculator",
    description: "Compare different loan options and find the best deal.",
    icon: <LoanComparisonIcon />,
    path: "/loan-comparison",
    color: "bg-green-100 dark:bg-green-900/30",
    category: "Financial"
  },
  {
    title: "Salary Calculator",
    description: "Calculate your take-home pay and understand your salary breakdown.",
    icon: <SalaryIcon2 />,
    path: "/salary",
    color: "bg-green-100 dark:bg-green-900/30",
    category: "Financial"
  },
  {
    title: "Savings Calculator",
    description: "Plan your savings goals and track your progress.",
    icon: <SavingsIcon2 />,
    path: "/savings",
    color: "bg-emerald-100 dark:bg-emerald-900/30",
    category: "Financial"
  }
];

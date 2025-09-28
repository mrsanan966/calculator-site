import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HomePage from "@/pages/HomePage";
import MortgageCalculatorPage from "@/pages/MortgageCalculatorPage";
import HelocCalculatorPage from "@/pages/HelocCalculatorPage";
import LoanCalculatorPage from "@/pages/LoanCalculatorPage";
import StudentLoanCalculatorPage from "@/pages/StudentLoanCalculatorPage";
import AutoLoanCalculatorPage from "@/pages/AutoLoanCalculatorPage";
import TaxCalculatorPage from "@/pages/TaxCalculatorPage";
import RefinanceCalculatorPage from "@/pages/RefinanceCalculatorPage";
import PersonalLoanCalculatorPage from "@/pages/PersonalLoanCalculatorPage";
import InvestmentGrowthCalculatorPage from "@/pages/InvestmentGrowthCalculatorPage";
import MarginCalculatorPage from "@/pages/MarginCalculatorPage";
import ProfitMarginCalculatorPage from "@/pages/ProfitMarginCalculatorPage";
import GrossMarginCalculatorPage from "@/pages/GrossMarginCalculatorPage";
import AdpPaycheckCalculatorPage from "@/pages/AdpPaycheckCalculatorPage";
import CaliforniaPaycheckCalculatorPage from "@/pages/CaliforniaPaycheckCalculatorPage";
import CitPlatinumSavingsCalculatorPage from "@/pages/CitPlatinumSavingsCalculatorPage";
import OddsCalculatorPage from "@/pages/OddsCalculatorPage";
import ParlayCalculatorPage from "@/pages/ParlayCalculatorPage";
import LandLoanCalculatorPage from "@/pages/LandLoanCalculatorPage";
import SnowDayCalculatorPage from "@/pages/SnowDayCalculatorPage";
import DunkCalculatorPage from "@/pages/DunkCalculatorPage";
import PrivacyPolicyPage from "@/pages/PrivacyPolicyPage";
import TermsOfServicePage from "@/pages/TermsOfServicePage";
import ContactUsPage from "@/pages/ContactUsPage";
import AboutUsPage from "@/pages/AboutUsPage";
import GradeCalculatorPage from "@/pages/GradeCalculatorPage";
import AgeCalculatorPage from "@/pages/AgeCalculatorPage";
import GpaCalculatorPage from "@/pages/GpaCalculatorPage";
import TimeCalculatorPage from "@/pages/TimeCalculatorPage";
import BigQueryCostCalculatorPage from "@/pages/BigQueryCostCalculatorPage";
import CitBankCalculatorPage from "@/pages/CitBankCalculatorPage";
import CitBankHighYieldSavingsCalculatorPage from "@/pages/CitBankHighYieldSavingsCalculatorPage";
import CitHysaCalculatorPage from "@/pages/CitHysaCalculatorPage";
import RocketMortgageCalculatorPage from "@/pages/RocketMortgageCalculatorPage";
import AutoLoanRefinanceCalculatorPage from "@/pages/AutoLoanRefinanceCalculatorPage";
import BudgetCalculatorPage from "@/pages/BudgetCalculatorPage";
import CarAffordabilityCalculatorPage from "@/pages/CarAffordabilityCalculatorPage";
import CarPaymentCalculatorPage from "@/pages/CarPaymentCalculatorPage";
import CostOfLivingCalculatorPage from "@/pages/CostOfLivingCalculatorPage";
import DebtConsolidationCalculatorPage from "@/pages/DebtConsolidationCalculatorPage";
import DebtPayoffCalculatorPage from "@/pages/DebtPayoffCalculatorPage";
import LoanComparisonCalculatorPage from "@/pages/LoanComparisonCalculatorPage";
import SalaryCalculatorPage from "@/pages/SalaryCalculatorPage";
import SavingsCalculatorPage from "@/pages/SavingsCalculatorPage";
import ScrollToTop from "@/components/ScrollToTop";
import ZillowHomeValueCalculatorPage from "@/pages/ZillowHomeValueCalculatorPage";
import ZillowMortgageCalculatorPage from "@/pages/ZillowMortgageCalculatorPage";
import ZillowRentCalculatorPage from "@/pages/ZillowRentCalculatorPage";
import ZillowRoiCalculatorPage from "@/pages/ZillowRoiCalculatorPage";
import BmiCalculatorPage from "@/pages/BmiCalculatorPage";
import NotFoundPage from '@/pages/NotFoundPage';
import CalculatorsPage from "@/pages/CalculatorsPage";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="flex min-h-screen flex-col bg-background">
          <Header />
          <main className="flex-1">
            <Routes>
              {/* Redirect root to home with trailing slash */}
              <Route path="/" element={<Navigate to="/home" replace />} />
              
              {/* Home page */}
              <Route path="/home" element={<HomePage />} />
              
              {/* Calculator pages with trailing slashes */}
              <Route path="/mortgage" element={<MortgageCalculatorPage />} />
              <Route path="/heloc" element={<HelocCalculatorPage />} />
              <Route path="/loan" element={<LoanCalculatorPage />} />
              <Route path="/student-loan" element={<StudentLoanCalculatorPage />} />
              <Route path="/auto-loan" element={<AutoLoanCalculatorPage />} />
              <Route path="/tax" element={<TaxCalculatorPage />} />
              <Route path="/refinance" element={<RefinanceCalculatorPage />} />
              <Route path="/personal-loan" element={<PersonalLoanCalculatorPage />} />
              <Route path="/finance" element={<InvestmentGrowthCalculatorPage />} />
              <Route path="/margin" element={<MarginCalculatorPage />} />
              <Route path="/profit-margin" element={<ProfitMarginCalculatorPage />} />
              <Route path="/gross-margin" element={<GrossMarginCalculatorPage />} />
              <Route path="/adp-paycheck" element={<AdpPaycheckCalculatorPage />} />
              <Route path="/california-paycheck" element={<CaliforniaPaycheckCalculatorPage />} />
              <Route path="/cit-platinum-savings" element={<CitPlatinumSavingsCalculatorPage />} />
              <Route path="/odds" element={<OddsCalculatorPage />} />
              <Route path="/parlay" element={<ParlayCalculatorPage />} />
              <Route path="/land-loan" element={<LandLoanCalculatorPage />} />
              <Route path="/snow-day" element={<SnowDayCalculatorPage />} />
              <Route path="/dunk" element={<DunkCalculatorPage />} />
              
              {/* Legal and info pages */}
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-of-service" element={<TermsOfServicePage />} />
              <Route path="/contact-us" element={<ContactUsPage />} />
              <Route path="/about-us" element={<AboutUsPage />} />
              
              {/* Other calculator pages */}
              <Route path="/grade" element={<GradeCalculatorPage />} />
              <Route path="/age" element={<AgeCalculatorPage />} />
              <Route path="/gpa" element={<GpaCalculatorPage />} />
              <Route path="/time" element={<TimeCalculatorPage />} />
              <Route path="/bigquery-cost" element={<BigQueryCostCalculatorPage />} />
              <Route path="/cit-bank" element={<CitBankCalculatorPage />} />
              <Route path="/cit-high-yield-savings" element={<CitBankHighYieldSavingsCalculatorPage />} />
              <Route path="/cit-hysa" element={<CitHysaCalculatorPage />} />
              <Route path="/rocket-mortgage" element={<RocketMortgageCalculatorPage />} />
              <Route path="/auto-loan-refinance" element={<AutoLoanRefinanceCalculatorPage />} />
              <Route path="/budget" element={<BudgetCalculatorPage />} />
              <Route path="/car-affordability" element={<CarAffordabilityCalculatorPage />} />
              <Route path="/car-payment" element={<CarPaymentCalculatorPage />} />
              <Route path="/cost-of-living" element={<CostOfLivingCalculatorPage />} />
              <Route path="/debt-consolidation" element={<DebtConsolidationCalculatorPage />} />
              <Route path="/debt-payoff" element={<DebtPayoffCalculatorPage />} />
              <Route path="/loan-comparison" element={<LoanComparisonCalculatorPage />} />
              <Route path="/salary" element={<SalaryCalculatorPage />} />
              <Route path="/savings" element={<SavingsCalculatorPage />} />
              <Route path="/zillow-home-value-calculator" element={<ZillowHomeValueCalculatorPage />} />
              <Route path="/zillow-mortgage-calculator" element={<ZillowMortgageCalculatorPage />} />
              <Route path="/zillow-rent-calculator" element={<ZillowRentCalculatorPage />} />
              <Route path="/zillow-roi-calculator" element={<ZillowRoiCalculatorPage />} />
              <Route path="/bmi" element={<BmiCalculatorPage />} />
              <Route path="/calculators" element={<CalculatorsPage />} />
              
              {/* 404 catch-all route */}
              <Route path="*" element={<NotFoundPage />} />
              
              {/* Redirect non-trailing slash URLs to trailing slash versions */}
              <Route path=":path" element={<Navigate to="/:path" replace />} />
            </Routes>
          </main>
          <Toaster />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;

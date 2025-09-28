
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Briefcase, DollarSign, Percent, Calendar } from "lucide-react";
import { formatNumber } from "@/utils/calculators";

const InvestmentForm = ({
  initialInvestment, setInitialInvestment,
  monthlyContribution, setMonthlyContribution,
  annualInterestRate, setAnnualInterestRate,
  years, setYears,
  setShowResults
}) => {

  const handleInitialInvestmentChange = (e) => {
    setInitialInvestment(parseFloat(e.target.value.replace(/,/g, '')) || 0);
    setShowResults(false);
  };
  const handleMonthlyContributionChange = (e) => {
    setMonthlyContribution(parseFloat(e.target.value.replace(/,/g, '')) || 0);
    setShowResults(false);
  };
  const handleAnnualInterestRateChange = (e) => {
    setAnnualInterestRate(parseFloat(e.target.value) || 0);
    setShowResults(false);
  };
  const handleYearsChange = (e) => {
    setYears(parseInt(e.target.value) || 0);
    setShowResults(false);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Briefcase className="mr-2 h-5 w-5 text-primary" />
          Investment Details
        </CardTitle>
        <CardDescription>
          Enter your initial investment, contributions, rate, and time frame.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="initialInvestment">Initial Investment</Label>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <Input id="initialInvestment" type="text" value={formatNumber(initialInvestment)} onChange={handleInitialInvestmentChange} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="monthlyContribution">Monthly Contribution</Label>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <Input id="monthlyContribution" type="text" value={formatNumber(monthlyContribution)} onChange={handleMonthlyContributionChange} />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="annualInterestRate">Estimated Annual Rate (%)</Label>
            <div className="flex items-center space-x-2">
              <Percent className="h-4 w-4 text-muted-foreground" />
              <Input id="annualInterestRate" type="number" value={annualInterestRate} onChange={handleAnnualInterestRateChange} step="0.1" min="0" />
            </div>
            <Slider value={[annualInterestRate]} min={0} max={20} step={0.1} onValueChange={(v) => { setAnnualInterestRate(v[0]); setShowResults(false); }} className="mt-2"/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="years">Investment Period (Years)</Label>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <Input id="years" type="number" value={years} onChange={handleYearsChange} min="1" />
            </div>
            <Slider value={[years]} min={1} max={50} step={1} onValueChange={(v) => { setYears(v[0]); setShowResults(false); }} className="mt-2"/>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentForm;
  
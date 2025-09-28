import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { DollarSign, RefreshCw, Percent, Calendar } from "lucide-react";
import { formatNumber } from "@/utils/calculators";

const RefinanceForm = ({
  currentLoanBalance, setCurrentLoanBalance,
  currentInterestRate, setCurrentInterestRate,
  currentRemainingMonths, setCurrentRemainingMonths,
  newInterestRate, setNewInterestRate,
  newLoanTermMonths, setNewLoanTermMonths,
  closingCosts, setClosingCosts,
  setShowResults
}) => {
  const currentRemainingYears = currentRemainingMonths / 12;
  const newLoanTermYears = newLoanTermMonths / 12;

  const handleCurrentLoanBalanceChange = (e) => {
    setCurrentLoanBalance(parseFloat(e.target.value.replace(/,/g, '')) || 0);
    setShowResults(false);
  };
  const handleCurrentInterestRateChange = (e) => {
    setCurrentInterestRate(parseFloat(e.target.value) || 0);
    setShowResults(false);
  };
  const handleCurrentRemainingMonthsChange = (e) => {
    setCurrentRemainingMonths(parseInt(e.target.value) || 0);
    setShowResults(false);
  };
  const handleNewInterestRateChange = (e) => {
    setNewInterestRate(parseFloat(e.target.value) || 0);
    setShowResults(false);
  };
  const handleNewLoanTermMonthsChange = (value) => {
    setNewLoanTermMonths(value[0]);
    setShowResults(false);
  };
  const handleClosingCostsChange = (e) => {
    setClosingCosts(parseFloat(e.target.value.replace(/,/g, '')) || 0);
    setShowResults(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
      <Card id="current-loan-form">
        <CardHeader>
          <CardTitle className="flex items-center text-xl font-semibold">
            <DollarSign className="mr-2 h-5 w-5 text-muted-foreground" />
            Current Loan Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="currentLoanBalance">Current Balance</Label>
            <div className="flex items-center">
               <DollarSign className="h-5 w-5 text-muted-foreground mr-2" />
               <Input id="currentLoanBalance" type="text" value={formatNumber(currentLoanBalance)} onChange={handleCurrentLoanBalanceChange} className="text-right text-base"/>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="currentInterestRate">Current Interest Rate (%)</Label>
             <div className="flex items-center">
               <Percent className="h-5 w-5 text-muted-foreground mr-2" />
                <Input id="currentInterestRate" type="number" value={currentInterestRate} onChange={handleCurrentInterestRateChange} step="0.01" min="0" className="text-right text-base"/>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="currentRemainingMonths">Remaining Term (Months)</Label>
             <div className="flex items-center">
               <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
               <Input id="currentRemainingMonths" type="number" value={currentRemainingMonths} onChange={handleCurrentRemainingMonthsChange} min="1" className="text-right text-base"/>
             </div>
            <p className="text-sm text-muted-foreground text-right">({currentRemainingYears.toFixed(1)} years remaining)</p>
          </div>
        </CardContent>
      </Card>

      <Card id="new-loan-form">
        <CardHeader>
          <CardTitle className="flex items-center text-xl font-semibold">
            <RefreshCw className="mr-2 h-5 w-5 text-primary" />
            New Loan Details (Refinance)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="newInterestRate">New Interest Rate (%)</Label>
            <div className="flex items-center">
              <Percent className="h-5 w-5 text-muted-foreground mr-2" />
              <Input id="newInterestRate" type="number" value={newInterestRate} onChange={handleNewInterestRateChange} step="0.01" min="0" className="text-right text-base"/>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="newLoanTermMonths">New Loan Term (Years)</Label>
            <div className="flex items-center">
               <Calendar className="h-5 w-5 text-muted-foreground mr-2" />
                <Input id="newLoanTermMonths" type="number" value={newLoanTermMonths / 12} onChange={(e) => setNewLoanTermMonths(parseInt(e.target.value) * 12 || 0)} min="1" className="text-right text-base"/>
            </div>
            <Slider
              value={[newLoanTermYears]}
              min={1}
              max={40}
              step={1}
              onValueChange={(value) => { setNewLoanTermMonths(value[0] * 12); setShowResults(false); }}
              className="mt-2"
            />
            <p className="text-sm text-muted-foreground text-right">({newLoanTermMonths} months)</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="closingCosts">Estimated Closing Costs</Label>
            <div className="flex items-center">
               <DollarSign className="h-5 w-5 text-muted-foreground mr-2" />
               <Input id="closingCosts" type="text" value={formatNumber(closingCosts)} onChange={handleClosingCostsChange} className="text-right text-base"/>
            </div>
             <p className="text-sm text-muted-foreground text-right">Fees for originating the new loan.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RefinanceForm;
  

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatNumber } from "@/utils/calculators";

const RebaForm = ({ inputs, onInputChange }) => {
  const handleChange = (field, value, isNumeric = true) => {
    const processedValue = isNumeric ? (parseFloat(value.replace(/,/g, '')) || 0) : value;
    onInputChange(field, processedValue);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
      <Card>
        <CardHeader><CardTitle>Acquisition</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="purchasePrice">Purchase Price</Label>
            <Input id="purchasePrice" type="text" value={formatNumber(inputs.purchasePrice)} onChange={(e) => handleChange('purchasePrice', e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="closingCostsPercentage">Closing Costs (%)</Label>
            <Input id="closingCostsPercentage" type="number" value={inputs.closingCostsPercentage} onChange={(e) => handleChange('closingCostsPercentage', e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="renovationCosts">Renovation Costs</Label>
            <Input id="renovationCosts" type="text" value={formatNumber(inputs.renovationCosts)} onChange={(e) => handleChange('renovationCosts', e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Income</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="grossMonthlyRent">Gross Monthly Rent</Label>
            <Input id="grossMonthlyRent" type="text" value={formatNumber(inputs.grossMonthlyRent)} onChange={(e) => handleChange('grossMonthlyRent', e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="vacancyRate">Vacancy Rate (%)</Label>
            <Input id="vacancyRate" type="number" value={inputs.vacancyRate} onChange={(e) => handleChange('vacancyRate', e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Expenses</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-1">
            <Label htmlFor="propertyTaxAnnual">Property Tax (Annual)</Label>
            <Input id="propertyTaxAnnual" type="text" value={formatNumber(inputs.propertyTaxAnnual)} onChange={(e) => handleChange('propertyTaxAnnual', e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="insuranceAnnual">Insurance (Annual)</Label>
            <Input id="insuranceAnnual" type="text" value={formatNumber(inputs.insuranceAnnual)} onChange={(e) => handleChange('insuranceAnnual', e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="maintenanceRate">Maintenance (% of Rent)</Label>
            <Input id="maintenanceRate" type="number" value={inputs.maintenanceRate} onChange={(e) => handleChange('maintenanceRate', e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="propertyManagementRate">Property Mgmt (% of Rent)</Label>
            <Input id="propertyManagementRate" type="number" value={inputs.propertyManagementRate} onChange={(e) => handleChange('propertyManagementRate', e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="otherMonthlyExpenses">Other Monthly Exp.</Label>
            <Input id="otherMonthlyExpenses" type="text" value={formatNumber(inputs.otherMonthlyExpenses)} onChange={(e) => handleChange('otherMonthlyExpenses', e.target.value)} />
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 lg:col-span-3">
        <CardHeader><CardTitle>Financing</CardTitle></CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <Label htmlFor="downPaymentPercentage">Down Payment (%)</Label>
            <Input id="downPaymentPercentage" type="number" value={inputs.downPaymentPercentage} onChange={(e) => handleChange('downPaymentPercentage', e.target.value)} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="loanInterestRate">Loan Interest Rate (%)</Label>
            <Input id="loanInterestRate" type="number" value={inputs.loanInterestRate} onChange={(e) => handleChange('loanInterestRate', e.target.value)} step="0.01" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="loanTermYears">Loan Term (Years)</Label>
            <Input id="loanTermYears" type="number" value={inputs.loanTermYears} onChange={(e) => handleChange('loanTermYears', e.target.value, false)} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RebaForm;
  
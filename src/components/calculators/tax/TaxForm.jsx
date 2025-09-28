
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Users, User } from "lucide-react";
import { formatCurrency, formatNumber } from "@/utils/calculators";

const TaxForm = ({ income, setIncome, filingStatus, setFilingStatus, setShowResults }) => {
  const handleIncomeChange = (e) => {
    const value = parseFloat(e.target.value.replace(/,/g, '')) || 0;
    setIncome(value);
    setShowResults(false);
  };

  const handleFilingStatusChange = (value) => {
    setFilingStatus(value);
    setShowResults(false);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <DollarSign className="mr-2 h-5 w-5 text-primary" />
          Income & Filing Status
        </CardTitle>
        <CardDescription>
          Enter your estimated annual income and filing status.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center mb-1">
            <Label htmlFor="income">Annual Gross Income</Label>
            <span className="text-sm font-medium text-primary">{formatCurrency(income)}</span>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <Input
              id="income"
              type="text"
              value={formatNumber(income)}
              onChange={handleIncomeChange}
              className="text-right"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="filingStatus">Filing Status</Label>
          <Select value={filingStatus} onValueChange={handleFilingStatusChange}>
            <SelectTrigger id="filingStatus">
              <div className="flex items-center">
                {filingStatus === 'single' ? <User className="mr-2 h-4 w-4" /> : <Users className="mr-2 h-4 w-4" />}
                <SelectValue placeholder="Select status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">
                <div className="flex items-center"><User className="mr-2 h-4 w-4" />Single</div>
              </SelectItem>
              <SelectItem value="married">
                <div className="flex items-center"><Users className="mr-2 h-4 w-4" />Married Filing Jointly</div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaxForm;
  
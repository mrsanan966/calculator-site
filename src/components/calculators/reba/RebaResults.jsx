
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Info } from "lucide-react";
import { formatCurrency, formatPercentage } from "@/utils/calculators";

const RebaResults = ({ results }) => {
  const { totalCashNeeded, noi, capRate, cashFlowBeforeTax, cashOnCashReturn } = results;
  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Building className="mr-2 h-5 w-5" />
          Investment Analysis Results
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-background p-4 rounded-lg border text-center shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">Total Cash Needed</p>
          <p className="text-xl font-bold">{formatCurrency(totalCashNeeded)}</p>
        </div>
        <div className="bg-background p-4 rounded-lg border text-center shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">Net Operating Income (NOI)</p>
          <p className="text-xl font-bold">{formatCurrency(noi)}</p>
          <p className="text-xs text-muted-foreground">(Annual)</p>
        </div>
        <div className="bg-background p-4 rounded-lg border text-center shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">Cap Rate</p>
          <p className="text-xl font-bold text-primary">{formatPercentage(capRate)}</p>
        </div>
        <div className="bg-background p-4 rounded-lg border text-center shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">Cash Flow (Before Tax)</p>
          <p className={`text-xl font-bold ${cashFlowBeforeTax >= 0 ? 'text-green-600' : 'text-red-600'}`}>{formatCurrency(cashFlowBeforeTax)}</p>
          <p className="text-xs text-muted-foreground">(Annual)</p>
        </div>
        <div className="bg-background p-4 rounded-lg border text-center shadow-sm sm:col-span-2 lg:col-span-4">
          <p className="text-sm text-muted-foreground mb-1">Cash-on-Cash Return</p>
          <p className={`text-2xl font-bold ${cashOnCashReturn >= 0 ? 'text-primary' : 'text-red-600'}`}>{formatPercentage(cashOnCashReturn)}</p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center text-sm text-muted-foreground">
        <Info className="h-4 w-4 mr-1 flex-shrink-0" />
        <span>Estimates are based on inputs provided. Actual performance may vary. Does not account for income taxes or property appreciation/depreciation.</span>
      </CardFooter>
    </Card>
  );
};

export default RebaResults;
  
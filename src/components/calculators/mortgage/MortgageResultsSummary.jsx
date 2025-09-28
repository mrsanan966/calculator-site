
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Info, TrendingUp, PieChart } from 'lucide-react';
import { formatCurrency } from "@/utils/calculators";

const MortgageResultsSummary = ({ loanAmount, monthlyPayment, totalInterest, totalPayment }) => {
  const interestPercentage = totalPayment > 0 ? (totalInterest / totalPayment) * 100 : 0;
  const principalPercentage = totalPayment > 0 ? (loanAmount / totalPayment) * 100 : 0;

  return (
    <Card className="bg-primary/5 border-primary/20 mt-4">
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="mr-2 h-5 w-5" />
          Mortgage Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-background p-4 rounded-lg border text-center shadow-sm">
            <p className="text-sm text-muted-foreground mb-1">Loan Amount</p>
            <p className="text-xl font-bold">{formatCurrency(loanAmount)}</p>
          </div>
          <div className="bg-background p-4 rounded-lg border text-center shadow-sm">
            <p className="text-sm text-muted-foreground mb-1">Monthly Payment (P&I)</p>
            <p className="text-xl font-bold text-primary">{formatCurrency(monthlyPayment)}</p>
          </div>
          <div className="bg-background p-4 rounded-lg border text-center shadow-sm">
            <p className="text-sm text-muted-foreground mb-1">Total Interest Paid</p>
            <p className="text-xl font-bold">{formatCurrency(totalInterest)}</p>
          </div>
        </div>
        <div className="bg-background p-4 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="font-medium flex items-center"><PieChart className="mr-2 h-4 w-4 text-muted-foreground"/>Total Payment Breakdown</p>
            <p className="text-sm text-muted-foreground">Total Paid (P&I): {formatCurrency(totalPayment)}</p>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden flex">
            <div
              className="bg-primary h-full transition-all duration-500"
              style={{ width: `${principalPercentage}%` }}
              title={`Principal: ${principalPercentage.toFixed(1)}%`}
            ></div>
            <div
              className="bg-secondary-foreground/50 h-full transition-all duration-500"
              style={{ width: `${interestPercentage}%` }}
              title={`Interest: ${interestPercentage.toFixed(1)}%`}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-primary rounded-full mr-1.5"></div>
              <span>Principal: {formatCurrency(loanAmount)} ({principalPercentage.toFixed(1)}%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-secondary-foreground/50 rounded-full mr-1.5"></div>
              <span>Interest: {formatCurrency(totalInterest)} ({interestPercentage.toFixed(1)}%)</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center text-sm text-muted-foreground">
        <Info className="h-4 w-4 mr-1 flex-shrink-0" />
        <span>Estimates exclude taxes, insurance (PMI), and HOA fees. Consult a lender for exact figures.</span>
      </CardFooter>
    </Card>
  );
};

export default MortgageResultsSummary;
  
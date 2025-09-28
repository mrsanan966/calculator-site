
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, TrendingUp, PieChart } from "lucide-react";
import { formatCurrency } from "@/utils/calculators";

const InvestmentResults = ({ futureValue, totalPrincipal, totalInterestEarned }) => {
  const interestPercentage = futureValue > 0 ? (totalInterestEarned / futureValue) * 100 : 0;
  const principalPercentage = futureValue > 0 ? (totalPrincipal / futureValue) * 100 : 0;

  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="mr-2 h-5 w-5" />
          Estimated Investment Growth
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-background p-6 rounded-lg border text-center shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">Estimated Future Value</p>
          <p className="text-3xl font-bold text-primary">{formatCurrency(futureValue)}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-background p-4 rounded-lg border text-center shadow-sm">
            <p className="text-sm text-muted-foreground mb-1">Total Principal Invested</p>
            <p className="text-xl font-bold">{formatCurrency(totalPrincipal)}</p>
          </div>
          <div className="bg-background p-4 rounded-lg border text-center shadow-sm">
            <p className="text-sm text-muted-foreground mb-1">Total Interest Earned</p>
            <p className="text-xl font-bold">{formatCurrency(totalInterestEarned)}</p>
          </div>
        </div>

        <div className="bg-background p-4 rounded-lg border shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <p className="font-medium flex items-center"><PieChart className="mr-2 h-4 w-4 text-muted-foreground"/>Future Value Breakdown</p>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden flex">
            <div
              className="bg-primary h-full transition-all duration-500"
              style={{ width: `${principalPercentage}%` }}
              title={`Principal: ${principalPercentage.toFixed(1)}%`}
            ></div>
            <div
              className="bg-green-500 h-full transition-all duration-500"
              style={{ width: `${interestPercentage}%` }}
              title={`Interest: ${interestPercentage.toFixed(1)}%`}
            ></div>
          </div>
          <div className="flex justify-between mt-2 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-primary rounded-full mr-1.5"></div>
              <span>Principal: {formatCurrency(totalPrincipal)} ({principalPercentage.toFixed(1)}%)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-1.5"></div>
              <span>Interest: {formatCurrency(totalInterestEarned)} ({interestPercentage.toFixed(1)}%)</span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center text-sm text-muted-foreground">
        <Info className="h-4 w-4 mr-1 flex-shrink-0" />
        <span>Estimates assume a fixed annual interest rate compounded monthly and consistent contributions. Actual returns may vary. Does not account for taxes or fees.</span>
      </CardFooter>
    </Card>
  );
};

export default InvestmentResults;
  
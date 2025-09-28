
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { TrendingUp, Info } from "lucide-react";
import { formatCurrency } from "@/utils/calculators";

const RefinanceResults = ({
  currentMonthlyPayment,
  newMonthlyPayment,
  monthlySavings,
  breakEvenMonths,
  lifetimeSavings
}) => {
  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="mr-2 h-5 w-5" />
          Refinance Analysis Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-background p-4 rounded-lg border text-center shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">Current Monthly P&I</p>
          <p className="text-xl font-bold">{formatCurrency(currentMonthlyPayment)}</p>
        </div>
        <div className="bg-background p-4 rounded-lg border text-center shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">New Monthly P&I</p>
          <p className="text-xl font-bold text-primary">{formatCurrency(newMonthlyPayment)}</p>
        </div>
        <div className="bg-background p-4 rounded-lg border text-center shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">Monthly Savings</p>
          <p className={`text-xl font-bold ${monthlySavings > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(monthlySavings)}
          </p>
        </div>
        <div className="bg-background p-4 rounded-lg border text-center shadow-sm">
          <p className="text-sm text-muted-foreground mb-1">Break-Even Point</p>
          <p className="text-xl font-bold">
            {breakEvenMonths > 0 && breakEvenMonths !== Infinity ? `${breakEvenMonths.toFixed(1)} months` : 'N/A*'}
          </p>
        </div>
        <div className="bg-background p-4 rounded-lg border text-center shadow-sm md:col-span-2 lg:col-span-1">
          <p className="text-sm text-muted-foreground mb-1">Estimated Lifetime Savings</p>
          <p className={`text-xl font-bold ${lifetimeSavings > 0 ? 'text-green-600' : 'text-red-600'}`}>
            {formatCurrency(lifetimeSavings)}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center text-sm text-muted-foreground">
        <Info className="h-4 w-4 mr-1 flex-shrink-0" />
        <span>Estimates exclude taxes/insurance. *Break-even N/A if monthly savings are zero or negative, or if closing costs are zero. Consult a lender.</span>
      </CardFooter>
    </Card>
  );
};

export default RefinanceResults;
  
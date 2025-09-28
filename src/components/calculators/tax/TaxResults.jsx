
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Info } from "lucide-react";
import { formatCurrency } from "@/utils/calculators";

const TaxResults = ({ estimatedTax, effectiveRate }) => {
  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="mr-2 h-5 w-5" />
          Estimated Tax Liability
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-background p-4 rounded-lg border text-center shadow-sm">
            <p className="text-sm text-muted-foreground mb-1">Estimated Federal Tax</p>
            <p className="text-2xl font-bold text-primary">{formatCurrency(estimatedTax)}</p>
          </div>
          <div className="bg-background p-4 rounded-lg border text-center shadow-sm">
            <p className="text-sm text-muted-foreground mb-1">Effective Tax Rate</p>
            <p className="text-2xl font-bold">{effectiveRate.toFixed(2)}%</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center text-sm text-muted-foreground">
        <Info className="h-4 w-4 mr-1 flex-shrink-0" />
        <span>This is a highly simplified estimate for demonstration only. It does not account for deductions, credits, state taxes, or specific tax laws. Consult a tax professional.</span>
      </CardFooter>
    </Card>
  );
};

export default TaxResults;
  
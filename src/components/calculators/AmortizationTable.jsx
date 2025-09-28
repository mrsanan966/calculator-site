
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/utils/calculators";

const AmortizationTable = ({ schedule, title, description, setActiveTab, groupByYear = false }) => {
  const displaySchedule = groupByYear
    ? schedule.filter((entry) => entry.month % 12 === 0 || entry.month === 1)
    : schedule;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title || "Amortization Schedule"}</CardTitle>
        <CardDescription>
          {description || "See how your payments break down over time"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <div className="grid grid-cols-5 bg-muted p-3 text-sm font-medium">
            <div>{groupByYear ? "Year" : "Month"}</div>
            <div>Payment</div>
            <div>Principal</div>
            <div>Interest</div>
            <div>Remaining Balance</div>
          </div>
          <Separator />
          <div className="max-h-[400px] overflow-auto">
            {displaySchedule.map((entry) => (
              <div
                key={entry.month}
                className="grid grid-cols-5 p-3 text-sm hover:bg-muted/50"
              >
                <div>{groupByYear ? Math.ceil(entry.month / 12) : entry.month}</div>
                <div>{formatCurrency(entry.payment)}</div>
                <div>{formatCurrency(entry.principalPayment)}</div>
                <div>{formatCurrency(entry.interestPayment)}</div>
                <div>{formatCurrency(entry.balance)}</div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" onClick={() => setActiveTab("calculator")}>
          Back to Calculator
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AmortizationTable;
  
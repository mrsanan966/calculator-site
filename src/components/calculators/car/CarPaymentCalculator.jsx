import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const CarPaymentCalculator = () => {
  const [carDetails, setCarDetails] = useState({
    price: 30000,
    downPayment: 5000,
    tradeInValue: 0,
    interestRate: 5,
    loanTerm: 60,
    salesTax: 6,
  });

  const [results, setResults] = useState(null);

  const calculatePayment = () => {
    const {
      price,
      downPayment,
      tradeInValue,
      interestRate,
      loanTerm,
      salesTax,
    } = carDetails;

    const loanAmount = price - downPayment - tradeInValue;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm;
    const salesTaxAmount = (salesTax / 100) * price;

    const monthlyPayment =
      (loanAmount * monthlyRate * (1 + monthlyRate) ** numberOfPayments) /
      ((1 + monthlyRate) ** numberOfPayments - 1);

    const totalCost = monthlyPayment * numberOfPayments + downPayment + tradeInValue + salesTaxAmount;
    const totalInterest = totalCost - price - salesTaxAmount;

    // Generate amortization data
    const amortizationData = [];
    let remainingBalance = loanAmount;
    let totalPrincipal = 0;
    let totalInterestPaid = 0;

    for (let month = 1; month <= numberOfPayments; month++) {
      const interestPayment = remainingBalance * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      remainingBalance -= principalPayment;
      totalPrincipal += principalPayment;
      totalInterestPaid += interestPayment;

      if (month % 12 === 0 || month === numberOfPayments) {
        amortizationData.push({
          month,
          remainingBalance: Math.round(remainingBalance * 100) / 100,
          totalPrincipal: Math.round(totalPrincipal * 100) / 100,
          totalInterest: Math.round(totalInterestPaid * 100) / 100,
        });
      }
    }

    setResults({
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      totalCost: Math.round(totalCost * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      salesTaxAmount: Math.round(salesTaxAmount * 100) / 100,
      amortizationData,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="grid gap-6">
          <div>
            <Label htmlFor="price">Car Price</Label>
            <Input
              id="price"
              type="number"
              value={carDetails.price}
              onChange={(e) =>
                setCarDetails({ ...carDetails, price: e.target.value })
              }
              min="0"
            />
          </div>
          <div>
            <Label htmlFor="down-payment">Down Payment</Label>
            <Input
              id="down-payment"
              type="number"
              value={carDetails.downPayment}
              onChange={(e) =>
                setCarDetails({ ...carDetails, downPayment: e.target.value })
              }
              min="0"
            />
          </div>
          <div>
            <Label htmlFor="trade-in">Trade-in Value</Label>
            <Input
              id="trade-in"
              type="number"
              value={carDetails.tradeInValue}
              onChange={(e) =>
                setCarDetails({ ...carDetails, tradeInValue: e.target.value })
              }
              min="0"
            />
          </div>
          <div>
            <Label htmlFor="interest-rate">Interest Rate (%)</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="interest-rate"
                value={[carDetails.interestRate]}
                onValueChange={([value]) =>
                  setCarDetails({ ...carDetails, interestRate: value })
                }
                min={0}
                max={20}
                step={0.1}
                className="flex-1"
              />
              <span className="w-16 text-right">{carDetails.interestRate}%</span>
            </div>
          </div>
          <div>
            <Label htmlFor="loan-term">Loan Term (Months)</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="loan-term"
                value={[carDetails.loanTerm]}
                onValueChange={([value]) =>
                  setCarDetails({ ...carDetails, loanTerm: value })
                }
                min={12}
                max={84}
                step={12}
                className="flex-1"
              />
              <span className="w-16 text-right">{carDetails.loanTerm}</span>
            </div>
          </div>
          <div>
            <Label htmlFor="sales-tax">Sales Tax (%)</Label>
            <div className="flex items-center gap-4">
              <Slider
                id="sales-tax"
                value={[carDetails.salesTax]}
                onValueChange={([value]) =>
                  setCarDetails({ ...carDetails, salesTax: value })
                }
                min={0}
                max={10}
                step={0.1}
                className="flex-1"
              />
              <span className="w-16 text-right">{carDetails.salesTax}%</span>
            </div>
          </div>
        </div>
        <Button onClick={calculatePayment} className="mt-6 w-full">
          Calculate Payment
        </Button>
      </Card>

      {results && (
        <Card className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Payment Summary</h3>
              <div className="grid gap-4">
                <div className="rounded-lg border p-4">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Monthly Payment
                  </h4>
                  <p className="text-2xl font-bold">
                    ${results.monthlyPayment.toLocaleString()}
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Total Cost
                  </h4>
                  <p className="text-2xl font-bold">
                    ${results.totalCost.toLocaleString()}
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Total Interest
                  </h4>
                  <p className="text-2xl font-bold">
                    ${results.totalInterest.toLocaleString()}
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Sales Tax
                  </h4>
                  <p className="text-2xl font-bold">
                    ${results.salesTaxAmount.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Loan Amortization</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={results.amortizationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="month"
                      label={{
                        value: "Month",
                        position: "insideBottom",
                        offset: -5,
                      }}
                    />
                    <YAxis
                      label={{
                        value: "Amount ($)",
                        angle: -90,
                        position: "insideLeft",
                      }}
                      tickFormatter={(value) =>
                        `$${(value / 1000).toFixed(0)}k`
                      }
                    />
                    <Tooltip
                      formatter={(value) => [`$${value.toLocaleString()}`, ""]}
                      labelFormatter={(label) => `Month ${label}`}
                    />
                    <Line
                      type="monotone"
                      dataKey="remainingBalance"
                      stroke="#2563eb"
                      name="Remaining Balance"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="totalPrincipal"
                      stroke="#16a34a"
                      name="Principal Paid"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="totalInterest"
                      stroke="#dc2626"
                      name="Interest Paid"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default CarPaymentCalculator; 
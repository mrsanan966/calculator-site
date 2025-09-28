
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { GraduationCap, DollarSign, Percent } from "lucide-react";
import { calculateStudentLoan, formatCurrency } from "@/utils/calculators";
import SeoContent from "@/components/calculators/SeoContent";

const StudentLoanCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(30000);
  const [interestRate, setInterestRate] = useState(4.99);
  const [loanTerm, setLoanTerm] = useState(10);
  const [repaymentPlan, setRepaymentPlan] = useState("standard");
  const [monthlyPayment, setMonthlyPayment] = useState(null);

  const handleCalculate = () => {
    const payment = calculateStudentLoan(loanAmount, interestRate, loanTerm, repaymentPlan);
    setMonthlyPayment(payment);
  };

  return (
    <div className="container py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-3xl">
              <GraduationCap className="mr-3 h-8 w-8 text-primary" />
              Student Loan Calculator
            </CardTitle>
            <CardDescription>
              Calculate your monthly student loan payments and explore different repayment options
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="loanAmount">Loan Amount</Label>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="loanAmount"
                    type="number"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="interestRate">Interest Rate (%)</Label>
                <div className="flex items-center space-x-2">
                  <Percent className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.01"
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="loanTerm">Loan Term (Years)</Label>
                <Input
                  id="loanTerm"
                  type="number"
                  value={loanTerm}
                  onChange={(e) => setLoanTerm(Number(e.target.value))}
                />
              </div>

              <div>
                <Label htmlFor="repaymentPlan">Repayment Plan</Label>
                <Select value={repaymentPlan} onValueChange={setRepaymentPlan}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="graduated">Graduated</SelectItem>
                    <SelectItem value="income-based">Income-Based</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={handleCalculate} className="w-full">
                Calculate Payment
              </Button>

              {monthlyPayment && (
                <div className="mt-6 p-4 bg-primary/5 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">Estimated Monthly Payment</h3>
                  <p className="text-3xl font-bold text-primary">
                    {formatCurrency(monthlyPayment)}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <SeoContent title="Understanding Student Loan Payments">
          <h2 className="text-xl font-semibold mb-4">How Student Loan Payments Work</h2>
          <p>
            Student loan payments are calculated based on the loan amount, interest rate, loan term, and chosen repayment plan. The standard repayment plan spreads payments evenly over the loan term, while graduated plans start with lower payments that increase over time.
          </p>
          <h3 className="text-lg font-semibold mt-4 mb-2">Types of Repayment Plans</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Standard Repayment:</strong> Fixed monthly payments over the loan term</li>
            <li><strong>Graduated Repayment:</strong> Payments start low and increase every two years</li>
            <li><strong>Income-Based Repayment:</strong> Payments are calculated based on your income</li>
          </ul>
        </SeoContent>
      </motion.div>
    </div>
  );
};

export default StudentLoanCalculator;

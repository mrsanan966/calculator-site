
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Calculator } from "lucide-react";
import { calculateAdpPaycheck, formatCurrency } from "@/utils/calculators";
import SeoContent from "@/components/calculators/SeoContent";

const AdpPaycheckCalculator = () => {
  const [grossPay, setGrossPay] = useState(50000);
  const [payFrequency, setPayFrequency] = useState("bi-weekly");
  const [filingStatus, setFilingStatus] = useState("single");
  const [state, setState] = useState("CA");
  const [allowances, setAllowances] = useState(1);
  const [additional401k, setAdditional401k] = useState(0);
  const [insurance, setInsurance] = useState(0);
  const [otherDeductions, setOtherDeductions] = useState(0);
  const [results, setResults] = useState(null);

  const handleCalculate = () => {
    const results = calculateAdpPaycheck(
      grossPay,
      payFrequency,
      filingStatus,
      state,
      allowances,
      {
        k401: additional401k,
        insurance: insurance,
        other: otherDeductions
      }
    );
    setResults(results);
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
              <Calculator className="mr-3 h-8 w-8 text-primary" />
              ADP Paycheck Calculator
            </CardTitle>
            <CardDescription>
              Calculate your estimated take-home pay and deductions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="grossPay">Annual Gross Pay</Label>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="grossPay"
                    type="number"
                    value={grossPay}
                    onChange={(e) => setGrossPay(Number(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="payFrequency">Pay Frequency</Label>
                <Select value={payFrequency} onValueChange={setPayFrequency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="bi-weekly">Bi-Weekly</SelectItem>
                    <SelectItem value="semi-monthly">Semi-Monthly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="filingStatus">Filing Status</Label>
                <Select value={filingStatus} onValueChange={setFilingStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single</SelectItem>
                    <SelectItem value="married">Married</SelectItem>
                    <SelectItem value="head">Head of Household</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="allowances">Allowances</Label>
                <Input
                  id="allowances"
                  type="number"
                  value={allowances}
                  onChange={(e) => setAllowances(Number(e.target.value))}
                />
              </div>

              <div>
                <Label htmlFor="401k">401(k) Contribution</Label>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="401k"
                    type="number"
                    value={additional401k}
                    onChange={(e) => setAdditional401k(Number(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="insurance">Insurance Premiums</Label>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="insurance"
                    type="number"
                    value={insurance}
                    onChange={(e) => setInsurance(Number(e.target.value))}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="otherDeductions">Other Deductions</Label>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="otherDeductions"
                    type="number"
                    value={otherDeductions}
                    onChange={(e) => setOtherDeductions(Number(e.target.value))}
                  />
                </div>
              </div>

              <Button onClick={handleCalculate} className="w-full">
                Calculate Paycheck
              </Button>

              {results && (
                <div className="mt-6 space-y-4">
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Net Pay</h3>
                    <p className="text-3xl font-bold text-primary">
                      {formatCurrency(results.netPay)}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <h3 className="text-sm font-semibold mb-2">Federal Tax</h3>
                      <p className="text-lg font-bold text-primary">
                        {formatCurrency(results.federalTax)}
                      </p>
                    </div>
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <h3 className="text-sm font-semibold mb-2">State Tax</h3>
                      <p className="text-lg font-bold text-primary">
                        {formatCurrency(results.stateTax)}
                      </p>
                    </div>
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <h3 className="text-sm font-semibold mb-2">Social Security</h3>
                      <p className="text-lg font-bold text-primary">
                        {formatCurrency(results.socialSecurity)}
                      </p>
                    </div>
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <h3 className="text-sm font-semibold mb-2">Medicare</h3>
                      <p className="text-lg font-bold text-primary">
                        {formatCurrency(results.medicare)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <SeoContent title="Understanding Your Paycheck">
          <h2 className="text-xl font-semibold mb-4">How Your Paycheck is Calculated</h2>
          <p>
            Your take-home pay is calculated by subtracting various deductions from your gross pay, including taxes, insurance premiums, and retirement contributions.
          </p>
          <h3 className="text-lg font-semibold mt-4 mb-2">Common Paycheck Deductions</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Federal Income Tax:</strong> Based on your W-4 and tax brackets</li>
            <li><strong>State Income Tax:</strong> Varies by state</li>
            <li><strong>FICA Taxes:</strong> Social Security (6.2%) and Medicare (1.45%)</li>
            <li><strong>401(k):</strong> Optional retirement contributions</li>
            <li><strong>Health Insurance:</strong> Premium payments for coverage</li>
          </ul>
        </SeoContent>
      </motion.div>
    </div>
  );
};

export default AdpPaycheckCalculator;

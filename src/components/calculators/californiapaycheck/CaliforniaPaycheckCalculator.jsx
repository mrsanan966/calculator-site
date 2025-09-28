
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, Calculator } from "lucide-react";
import { calculateCaliforniaPaycheck, formatCurrency } from "@/utils/calculators";
import SeoContent from "@/components/calculators/SeoContent";

const CaliforniaPaycheckCalculator = () => {
  const [grossPay, setGrossPay] = useState(50000);
  const [payFrequency, setPayFrequency] = useState("bi-weekly");
  const [filingStatus, setFilingStatus] = useState("single");
  const [allowances, setAllowances] = useState(1);
  const [additional401k, setAdditional401k] = useState(0);
  const [insurance, setInsurance] = useState(0);
  const [sdi, setSdi] = useState(true);
  const [results, setResults] = useState(null);

  const handleCalculate = () => {
    const results = calculateCaliforniaPaycheck(
      grossPay,
      payFrequency,
      filingStatus,
      allowances,
      {
        k401: additional401k,
        insurance: insurance,
        sdi: sdi
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
              California Paycheck Calculator
            </CardTitle>
            <CardDescription>
              Calculate your California take-home pay including state-specific deductions
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

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="sdi"
                  checked={sdi}
                  onChange={(e) => setSdi(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="sdi">Include CA State Disability Insurance (SDI)</Label>
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
                      <h3 className="text-sm font-semibold mb-2">CA State Tax</h3>
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
                    {sdi && (
                      <div className="p-4 bg-primary/5 rounded-lg">
                        <h3 className="text-sm font-semibold mb-2">CA SDI</h3>
                        <p className="text-lg font-bold text-primary">
                          {formatCurrency(results.sdi)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <SeoContent title="Understanding California Paycheck Calculations">
          <h2 className="text-xl font-semibold mb-4">California-Specific Deductions</h2>
          <p>
            California has unique tax rates and additional deductions that affect your take-home pay, including State Disability Insurance (SDI) and higher state tax rates.
          </p>
          <h3 className="text-lg font-semibold mt-4 mb-2">Key California Paycheck Components</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>California State Tax:</strong> Progressive tax rates from 1% to 13.3%</li>
            <li><strong>State Disability Insurance (SDI):</strong> 0.9% of wages up to the yearly cap</li>
            <li><strong>Federal Taxes:</strong> Including income tax, Social Security, and Medicare</li>
            <li><strong>Additional Deductions:</strong> 401(k), health insurance, etc.</li>
          </ul>
        </SeoContent>
      </motion.div>
    </div>
  );
};

export default CaliforniaPaycheckCalculator;

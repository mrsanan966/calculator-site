import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const SalaryCalculator = () => {
  const [salaryDetails, setSalaryDetails] = useState({
    currentSalary: 75000,
    newSalary: 85000,
    currentLocation: "Current City",
    newLocation: "New City",
    currentTaxRate: 25,
    newTaxRate: 22,
    currentBenefits: [
      { name: "Health Insurance", value: 12000 },
      { name: "401(k) Match", value: 4500 },
      { name: "Bonus", value: 5000 },
    ],
    newBenefits: [
      { name: "Health Insurance", value: 15000 },
      { name: "401(k) Match", value: 5000 },
      { name: "Bonus", value: 7500 },
    ],
  });

  const [results, setResults] = useState(null);

  const calculateSalary = () => {
    const {
      currentSalary,
      newSalary,
      currentTaxRate,
      newTaxRate,
      currentBenefits,
      newBenefits,
    } = salaryDetails;

    // Calculate current compensation
    const currentTotalBenefits = currentBenefits.reduce(
      (sum, benefit) => sum + Number(benefit.value),
      0
    );
    const currentTotalCompensation = Number(currentSalary) + currentTotalBenefits;
    const currentAfterTax = currentTotalCompensation * (1 - currentTaxRate / 100);

    // Calculate new compensation
    const newTotalBenefits = newBenefits.reduce(
      (sum, benefit) => sum + Number(benefit.value),
      0
    );
    const newTotalCompensation = Number(newSalary) + newTotalBenefits;
    const newAfterTax = newTotalCompensation * (1 - newTaxRate / 100);

    // Calculate differences
    const salaryDifference = newSalary - currentSalary;
    const benefitsDifference = newTotalBenefits - currentTotalBenefits;
    const totalDifference = newTotalCompensation - currentTotalCompensation;
    const afterTaxDifference = newAfterTax - currentAfterTax;

    // Prepare data for visualization
    const compensationBreakdown = [
      {
        name: "Base Salary",
        current: Number(currentSalary),
        new: Number(newSalary),
      },
      {
        name: "Benefits",
        current: currentTotalBenefits,
        new: newTotalBenefits,
      },
      {
        name: "After Tax",
        current: currentAfterTax,
        new: newAfterTax,
      },
    ];

    setResults({
      currentTotalCompensation: Math.round(currentTotalCompensation * 100) / 100,
      newTotalCompensation: Math.round(newTotalCompensation * 100) / 100,
      currentAfterTax: Math.round(currentAfterTax * 100) / 100,
      newAfterTax: Math.round(newAfterTax * 100) / 100,
      salaryDifference: Math.round(salaryDifference * 100) / 100,
      benefitsDifference: Math.round(benefitsDifference * 100) / 100,
      totalDifference: Math.round(totalDifference * 100) / 100,
      afterTaxDifference: Math.round(afterTaxDifference * 100) / 100,
      compensationBreakdown,
    });
  };

  const addBenefit = (location) => {
    setSalaryDetails({
      ...salaryDetails,
      [location === "current" ? "currentBenefits" : "newBenefits"]: [
        ...salaryDetails[location === "current" ? "currentBenefits" : "newBenefits"],
        { name: "New Benefit", value: 0 },
      ],
    });
  };

  const removeBenefit = (location, index) => {
    setSalaryDetails({
      ...salaryDetails,
      [location === "current" ? "currentBenefits" : "newBenefits"]:
        salaryDetails[location === "current" ? "currentBenefits" : "newBenefits"].filter(
          (_, i) => i !== index
        ),
    });
  };

  const updateBenefit = (location, index, field, value) => {
    const benefits = [...salaryDetails[location === "current" ? "currentBenefits" : "newBenefits"]];
    benefits[index] = {
      ...benefits[index],
      [field]: value,
    };
    setSalaryDetails({
      ...salaryDetails,
      [location === "current" ? "currentBenefits" : "newBenefits"]: benefits,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="current">Current Position</TabsTrigger>
            <TabsTrigger value="new">New Position</TabsTrigger>
          </TabsList>
          <TabsContent value="current">
            <div className="space-y-6">
              <div>
                <Label htmlFor="current-location">Location</Label>
                <Input
                  id="current-location"
                  value={salaryDetails.currentLocation}
                  onChange={(e) =>
                    setSalaryDetails({
                      ...salaryDetails,
                      currentLocation: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="current-salary">Annual Salary</Label>
                <Input
                  id="current-salary"
                  type="number"
                  value={salaryDetails.currentSalary}
                  onChange={(e) =>
                    setSalaryDetails({
                      ...salaryDetails,
                      currentSalary: e.target.value,
                    })
                  }
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor="current-tax">Tax Rate (%)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="current-tax"
                    value={[salaryDetails.currentTaxRate]}
                    onValueChange={([value]) =>
                      setSalaryDetails({
                        ...salaryDetails,
                        currentTaxRate: value,
                      })
                    }
                    min={0}
                    max={50}
                    step={1}
                    className="flex-1"
                  />
                  <span className="w-16 text-right">{salaryDetails.currentTaxRate}%</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Benefits</h3>
                  <Button
                    onClick={() => addBenefit("current")}
                    variant="outline"
                    size="sm"
                  >
                    Add Benefit
                  </Button>
                </div>
                <div className="space-y-4">
                  {salaryDetails.currentBenefits.map((benefit, index) => (
                    <div key={index} className="grid gap-4 p-4 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <Label htmlFor={`current-benefit-${index}-name`}>
                          Benefit Name
                        </Label>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeBenefit("current", index)}
                        >
                          Remove
                        </Button>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <Input
                          id={`current-benefit-${index}-name`}
                          value={benefit.name}
                          onChange={(e) =>
                            updateBenefit("current", index, "name", e.target.value)
                          }
                        />
                        <Input
                          type="number"
                          value={benefit.value}
                          onChange={(e) =>
                            updateBenefit("current", index, "value", e.target.value)
                          }
                          min="0"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="new">
            <div className="space-y-6">
              <div>
                <Label htmlFor="new-location">Location</Label>
                <Input
                  id="new-location"
                  value={salaryDetails.newLocation}
                  onChange={(e) =>
                    setSalaryDetails({
                      ...salaryDetails,
                      newLocation: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="new-salary">Annual Salary</Label>
                <Input
                  id="new-salary"
                  type="number"
                  value={salaryDetails.newSalary}
                  onChange={(e) =>
                    setSalaryDetails({
                      ...salaryDetails,
                      newSalary: e.target.value,
                    })
                  }
                  min="0"
                />
              </div>
              <div>
                <Label htmlFor="new-tax">Tax Rate (%)</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="new-tax"
                    value={[salaryDetails.newTaxRate]}
                    onValueChange={([value]) =>
                      setSalaryDetails({
                        ...salaryDetails,
                        newTaxRate: value,
                      })
                    }
                    min={0}
                    max={50}
                    step={1}
                    className="flex-1"
                  />
                  <span className="w-16 text-right">{salaryDetails.newTaxRate}%</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Benefits</h3>
                  <Button
                    onClick={() => addBenefit("new")}
                    variant="outline"
                    size="sm"
                  >
                    Add Benefit
                  </Button>
                </div>
                <div className="space-y-4">
                  {salaryDetails.newBenefits.map((benefit, index) => (
                    <div key={index} className="grid gap-4 p-4 border rounded-lg">
                      <div className="flex justify-between items-center">
                        <Label htmlFor={`new-benefit-${index}-name`}>
                          Benefit Name
                        </Label>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeBenefit("new", index)}
                        >
                          Remove
                        </Button>
                      </div>
                      <div className="grid gap-4 md:grid-cols-2">
                        <Input
                          id={`new-benefit-${index}-name`}
                          value={benefit.name}
                          onChange={(e) =>
                            updateBenefit("new", index, "name", e.target.value)
                          }
                        />
                        <Input
                          type="number"
                          value={benefit.value}
                          onChange={(e) =>
                            updateBenefit("new", index, "value", e.target.value)
                          }
                          min="0"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <Button onClick={calculateSalary} className="mt-6 w-full">
          Compare Compensation
        </Button>
      </Card>

      {results && (
        <Card className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Compensation Summary</h3>
              <div className="grid gap-4">
                <div className="rounded-lg border p-4">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Total Compensation Difference
                  </h4>
                  <p className={`text-2xl font-bold ${
                    results.totalDifference >= 0 ? "text-green-600" : "text-red-600"
                  }`}>
                    ${Math.abs(results.totalDifference).toLocaleString()}{" "}
                    {results.totalDifference >= 0 ? "more" : "less"}
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    After-Tax Difference
                  </h4>
                  <p className={`text-2xl font-bold ${
                    results.afterTaxDifference >= 0 ? "text-green-600" : "text-red-600"
                  }`}>
                    ${Math.abs(results.afterTaxDifference).toLocaleString()}{" "}
                    {results.afterTaxDifference >= 0 ? "more" : "less"}
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Salary Difference
                  </h4>
                  <p className={`text-2xl font-bold ${
                    results.salaryDifference >= 0 ? "text-green-600" : "text-red-600"
                  }`}>
                    ${Math.abs(results.salaryDifference).toLocaleString()}{" "}
                    {results.salaryDifference >= 0 ? "more" : "less"}
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h4 className="text-sm font-medium text-muted-foreground">
                    Benefits Difference
                  </h4>
                  <p className={`text-2xl font-bold ${
                    results.benefitsDifference >= 0 ? "text-green-600" : "text-red-600"
                  }`}>
                    ${Math.abs(results.benefitsDifference).toLocaleString()}{" "}
                    {results.benefitsDifference >= 0 ? "more" : "less"}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Compensation Breakdown</h3>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={results.compensationBreakdown}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
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
                    />
                    <Legend />
                    <Bar
                      dataKey="current"
                      name={salaryDetails.currentLocation}
                      fill="#2563eb"
                    />
                    <Bar
                      dataKey="new"
                      name={salaryDetails.newLocation}
                      fill="#16a34a"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SalaryCalculator; 
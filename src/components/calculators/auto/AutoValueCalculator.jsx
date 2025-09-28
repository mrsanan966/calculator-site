import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DollarSign, Percent, Calendar, Car } from "lucide-react";
import SeoContent from "@/components/calculators/SeoContent";
import { FaInfoCircle, FaQuestionCircle, FaLightbulb } from "react-icons/fa";

const AutoValueCalculator = () => {
  const [valueDetails, setValueDetails] = useState({
    originalPrice: "",
    age: "",
    mileage: "",
    condition: "good",
    make: "",
    model: "",
    year: ""
  });
  const [results, setResults] = useState(null);

  const calculateValue = () => {
    const price = parseFloat(valueDetails.originalPrice);
    const age = parseFloat(valueDetails.age);
    const mileage = parseFloat(valueDetails.mileage);
    const year = parseFloat(valueDetails.year);

    if (isNaN(price) || isNaN(age) || isNaN(mileage) || isNaN(year)) {
      return;
    }

    // Base depreciation rate (15% per year)
    const annualDepreciation = 0.15;
    
    // Mileage impact (0.0001 per mile)
    const mileageDepreciation = mileage * 0.0001;
    
    // Age-based depreciation
    const ageDepreciation = Math.min(age * annualDepreciation, 0.8);
    
    // Condition multiplier
    let conditionMultiplier = 1;
    switch (valueDetails.condition) {
      case "excellent":
        conditionMultiplier = 1.1;
        break;
      case "good":
        conditionMultiplier = 1;
        break;
      case "fair":
        conditionMultiplier = 0.8;
        break;
      case "poor":
        conditionMultiplier = 0.6;
        break;
    }

    // Calculate current value
    const depreciation = ageDepreciation + mileageDepreciation;
    const currentValue = price * (1 - depreciation) * conditionMultiplier;

    // Calculate depreciation amount
    const depreciationAmount = price - currentValue;

    setResults({
      currentValue: currentValue.toFixed(2),
      depreciationAmount: depreciationAmount.toFixed(2),
      depreciationPercentage: (depreciation * 100).toFixed(1),
      annualDepreciation: (annualDepreciation * 100).toFixed(1)
    });
  };

  return (
    <div className="container py-8 md:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold flex items-center">
              <Car className="mr-3 h-8 w-8" />
              Auto Value Calculator
            </CardTitle>
            <CardDescription>
              Estimate your car's current value and depreciation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="make">Make</Label>
                <Input
                  id="make"
                  type="text"
                  value={valueDetails.make}
                  onChange={(e) => setValueDetails({...valueDetails, make: e.target.value})}
                  placeholder="Toyota"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  type="text"
                  value={valueDetails.model}
                  onChange={(e) => setValueDetails({...valueDetails, model: e.target.value})}
                  placeholder="Camry"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="year">Year</Label>
                <Input
                  id="year"
                  type="number"
                  value={valueDetails.year}
                  onChange={(e) => setValueDetails({...valueDetails, year: e.target.value})}
                  placeholder="2020"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="originalPrice">Original Price ($)</Label>
                <div className="relative">
                  <Input
                    id="originalPrice"
                    type="number"
                    value={valueDetails.originalPrice}
                    onChange={(e) => setValueDetails({...valueDetails, originalPrice: e.target.value})}
                    placeholder="30000"
                  />
                  <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="age">Age (Years)</Label>
                <Input
                  id="age"
                  type="number"
                  value={valueDetails.age}
                  onChange={(e) => setValueDetails({...valueDetails, age: e.target.value})}
                  placeholder="3"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="mileage">Mileage</Label>
                <Input
                  id="mileage"
                  type="number"
                  value={valueDetails.mileage}
                  onChange={(e) => setValueDetails({...valueDetails, mileage: e.target.value})}
                  placeholder="30000"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="condition">Condition</Label>
                <select
                  id="condition"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={valueDetails.condition}
                  onChange={(e) => setValueDetails({...valueDetails, condition: e.target.value})}
                >
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>
            </div>

            <Button onClick={calculateValue} className="w-full">
              Calculate Value
            </Button>

            {results && (
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-sm font-semibold mb-2">Current Value</h3>
                    <p className="text-lg font-bold text-primary">${results.currentValue}</p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-sm font-semibold mb-2">Total Depreciation</h3>
                    <p className="text-lg font-bold text-primary">${results.depreciationAmount}</p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-sm font-semibold mb-2">Depreciation %</h3>
                    <p className="text-lg font-bold text-primary">{results.depreciationPercentage}%</p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-sm font-semibold mb-2">Annual Depreciation</h3>
                    <p className="text-lg font-bold text-primary">{results.annualDepreciation}%</p>
                  </div>
                </div>
              </div>
            )}

            {/* Features Section */}
            <div className="mt-8 bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaInfoCircle className="mr-2" />
                Features
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Calculate current car value</li>
                <li>Estimate depreciation</li>
                <li>Consider vehicle condition</li>
                <li>Account for mileage impact</li>
                <li>Calculate annual depreciation</li>
                <li>Mobile-friendly interface</li>
              </ul>
            </div>

            {/* Tips Section */}
            <div className="mt-8 bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaLightbulb className="mr-2" />
                Tips for Maintaining Car Value
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Keep up with maintenance</li>
                <li>Maintain service records</li>
                <li>Keep the car clean</li>
                <li>Address issues promptly</li>
                <li>Drive responsibly</li>
                <li>Consider resale value when buying</li>
              </ul>
            </div>

            {/* FAQ Section */}
            <div className="mt-8 bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaQuestionCircle className="mr-2" />
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800">How is car value calculated?</h4>
                  <p className="text-gray-700 mt-1">
                    Car value is calculated based on factors like age, mileage, condition, make, model, and market demand. The calculator uses a standard depreciation rate and adjusts for these factors.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">What affects car depreciation?</h4>
                  <p className="text-gray-700 mt-1">
                    Major factors include age, mileage, condition, maintenance history, market demand, and the vehicle's reputation for reliability.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">How can I minimize depreciation?</h4>
                  <p className="text-gray-700 mt-1">
                    Regular maintenance, keeping mileage low, maintaining good condition, and choosing vehicles with good resale value can help minimize depreciation.
                  </p>
                </div>
              </div>
            </div>

            {/* SEO Content Section */}
            <SeoContent title="Understanding Car Value and Depreciation">
              <p>
                Understanding your car's value and depreciation is important for financial planning and when considering selling or trading in your vehicle. Our calculator helps you estimate the current value based on various factors.
              </p>
              <p>
                <strong className="text-foreground">Key Factors in Car Value:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Age and mileage</li>
                <li>Vehicle condition</li>
                <li>Make and model</li>
                <li>Market demand</li>
                <li>Maintenance history</li>
              </ul>
              <p>
                This calculator helps you:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Estimate current value</li>
                <li>Calculate depreciation</li>
                <li>Track value changes</li>
                <li>Plan for resale</li>
              </ul>
              <p>
                For more financial tools, check out our <a href="/auto-loan">Auto Loan Calculator</a> and <a href="/auto-payment">Auto Payment Calculator</a> for comprehensive financial planning.
              </p>
            </SeoContent>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AutoValueCalculator; 
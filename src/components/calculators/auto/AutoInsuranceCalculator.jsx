import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DollarSign, Percent, Calendar, Car } from "lucide-react";
import SeoContent from "@/components/calculators/SeoContent";
import { FaInfoCircle, FaQuestionCircle, FaLightbulb } from "react-icons/fa";

const AutoInsuranceCalculator = () => {
  const [insuranceDetails, setInsuranceDetails] = useState({
    carValue: "",
    age: "",
    drivingExperience: "",
    location: "",
    coverageLevel: "full",
    deductible: "",
    claims: "0"
  });
  const [results, setResults] = useState(null);

  const calculateInsurance = () => {
    const value = parseFloat(insuranceDetails.carValue);
    const age = parseFloat(insuranceDetails.age);
    const experience = parseFloat(insuranceDetails.drivingExperience);
    const deductible = parseFloat(insuranceDetails.deductible);
    const claims = parseFloat(insuranceDetails.claims);

    if (isNaN(value) || isNaN(age) || isNaN(experience) || 
        isNaN(deductible) || isNaN(claims)) {
      return;
    }

    // Base rate (1% of car value)
    let baseRate = value * 0.01;

    // Age factor
    let ageFactor = 1;
    if (age < 25) ageFactor = 1.5;
    else if (age < 30) ageFactor = 1.3;
    else if (age < 50) ageFactor = 1;
    else if (age < 65) ageFactor = 1.1;
    else ageFactor = 1.2;

    // Experience factor
    let experienceFactor = 1;
    if (experience < 3) experienceFactor = 1.4;
    else if (experience < 5) experienceFactor = 1.2;
    else if (experience < 10) experienceFactor = 1.1;

    // Location factor (simplified)
    let locationFactor = 1;
    if (insuranceDetails.location === "urban") locationFactor = 1.3;
    else if (insuranceDetails.location === "suburban") locationFactor = 1.1;

    // Coverage level factor
    let coverageFactor = 1;
    switch (insuranceDetails.coverageLevel) {
      case "full":
        coverageFactor = 1;
        break;
      case "standard":
        coverageFactor = 0.8;
        break;
      case "basic":
        coverageFactor = 0.6;
        break;
    }

    // Deductible factor
    let deductibleFactor = 1;
    if (deductible <= 500) deductibleFactor = 1.2;
    else if (deductible <= 1000) deductibleFactor = 1;
    else deductibleFactor = 0.8;

    // Claims factor
    let claimsFactor = 1;
    if (claims > 0) claimsFactor = 1 + (claims * 0.2);

    // Calculate annual premium
    const annualPremium = baseRate * ageFactor * experienceFactor * 
                         locationFactor * coverageFactor * deductibleFactor * 
                         claimsFactor;

    // Calculate monthly premium
    const monthlyPremium = annualPremium / 12;

    setResults({
      annualPremium: annualPremium.toFixed(2),
      monthlyPremium: monthlyPremium.toFixed(2),
      baseRate: baseRate.toFixed(2),
      ageFactor: ageFactor.toFixed(2),
      experienceFactor: experienceFactor.toFixed(2),
      locationFactor: locationFactor.toFixed(2),
      coverageFactor: coverageFactor.toFixed(2),
      deductibleFactor: deductibleFactor.toFixed(2),
      claimsFactor: claimsFactor.toFixed(2)
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
              Auto Insurance Calculator
            </CardTitle>
            <CardDescription>
              Estimate your auto insurance premiums
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="carValue">Car Value ($)</Label>
                <div className="relative">
                  <Input
                    id="carValue"
                    type="number"
                    value={insuranceDetails.carValue}
                    onChange={(e) => setInsuranceDetails({...insuranceDetails, carValue: e.target.value})}
                    placeholder="30000"
                  />
                  <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  value={insuranceDetails.age}
                  onChange={(e) => setInsuranceDetails({...insuranceDetails, age: e.target.value})}
                  placeholder="30"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="drivingExperience">Driving Experience (Years)</Label>
                <Input
                  id="drivingExperience"
                  type="number"
                  value={insuranceDetails.drivingExperience}
                  onChange={(e) => setInsuranceDetails({...insuranceDetails, drivingExperience: e.target.value})}
                  placeholder="5"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="location">Location</Label>
                <select
                  id="location"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={insuranceDetails.location}
                  onChange={(e) => setInsuranceDetails({...insuranceDetails, location: e.target.value})}
                >
                  <option value="urban">Urban</option>
                  <option value="suburban">Suburban</option>
                  <option value="rural">Rural</option>
                </select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="coverageLevel">Coverage Level</Label>
                <select
                  id="coverageLevel"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={insuranceDetails.coverageLevel}
                  onChange={(e) => setInsuranceDetails({...insuranceDetails, coverageLevel: e.target.value})}
                >
                  <option value="full">Full Coverage</option>
                  <option value="standard">Standard</option>
                  <option value="basic">Basic</option>
                </select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="deductible">Deductible ($)</Label>
                <div className="relative">
                  <Input
                    id="deductible"
                    type="number"
                    value={insuranceDetails.deductible}
                    onChange={(e) => setInsuranceDetails({...insuranceDetails, deductible: e.target.value})}
                    placeholder="1000"
                  />
                  <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="claims">Number of Claims (Last 3 Years)</Label>
                <Input
                  id="claims"
                  type="number"
                  value={insuranceDetails.claims}
                  onChange={(e) => setInsuranceDetails({...insuranceDetails, claims: e.target.value})}
                  placeholder="0"
                />
              </div>
            </div>

            <Button onClick={calculateInsurance} className="w-full">
              Calculate Premium
            </Button>

            {results && (
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-sm font-semibold mb-2">Annual Premium</h3>
                    <p className="text-lg font-bold text-primary">${results.annualPremium}</p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-sm font-semibold mb-2">Monthly Premium</h3>
                    <p className="text-lg font-bold text-primary">${results.monthlyPremium}</p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-sm font-semibold mb-2">Base Rate</h3>
                    <p className="text-lg font-bold text-primary">${results.baseRate}</p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-sm font-semibold mb-2">Age Factor</h3>
                    <p className="text-lg font-bold text-primary">{results.ageFactor}x</p>
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
                <li>Calculate insurance premiums</li>
                <li>Consider multiple factors</li>
                <li>Compare coverage levels</li>
                <li>Estimate monthly costs</li>
                <li>Account for risk factors</li>
                <li>Mobile-friendly interface</li>
              </ul>
            </div>

            {/* Tips Section */}
            <div className="mt-8 bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaLightbulb className="mr-2" />
                Tips for Auto Insurance
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Shop around for quotes</li>
                <li>Consider higher deductibles</li>
                <li>Bundle with other policies</li>
                <li>Maintain good credit</li>
                <li>Take defensive driving courses</li>
                <li>Review coverage annually</li>
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
                  <h4 className="font-medium text-gray-800">What affects insurance rates?</h4>
                  <p className="text-gray-700 mt-1">
                    Key factors include age, driving history, location, vehicle value, coverage level, deductible amount, and number of claims. Each factor is weighted differently by insurance companies.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">What coverage level do I need?</h4>
                  <p className="text-gray-700 mt-1">
                    Full coverage is recommended for newer or financed vehicles. Basic coverage may be sufficient for older, paid-off vehicles. Consider your assets and risk tolerance when choosing coverage.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">How can I lower my premiums?</h4>
                  <p className="text-gray-700 mt-1">
                    You can lower premiums by maintaining a clean driving record, choosing a higher deductible, bundling policies, taking defensive driving courses, and shopping around for better rates.
                  </p>
                </div>
              </div>
            </div>

            {/* SEO Content Section */}
            <SeoContent title="Understanding Auto Insurance">
              <p>
                Understanding your auto insurance needs is crucial for protecting your vehicle and finances. Our calculator helps you estimate your insurance premiums based on various factors that affect your rates.
              </p>
              <p>
                <strong className="text-foreground">Key Factors in Insurance Rates:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Driver age and experience</li>
                <li>Vehicle value and type</li>
                <li>Location and usage</li>
                <li>Coverage level</li>
                <li>Claims history</li>
              </ul>
              <p>
                This calculator helps you:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Estimate insurance costs</li>
                <li>Compare coverage options</li>
                <li>Understand rate factors</li>
                <li>Plan your budget</li>
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

export default AutoInsuranceCalculator; 
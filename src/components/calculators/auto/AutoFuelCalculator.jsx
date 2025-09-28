import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { DollarSign, Percent, Calendar, Car } from "lucide-react";
import SeoContent from "@/components/calculators/SeoContent";
import { FaInfoCircle, FaQuestionCircle, FaLightbulb } from "react-icons/fa";

const AutoFuelCalculator = () => {
  const [fuelDetails, setFuelDetails] = useState({
    distance: "",
    mpg: "",
    fuelPrice: "",
    fuelType: "regular",
    tripsPerWeek: "1"
  });
  const [results, setResults] = useState(null);

  const calculateFuel = () => {
    const distance = parseFloat(fuelDetails.distance);
    const mpg = parseFloat(fuelDetails.mpg);
    const fuelPrice = parseFloat(fuelDetails.fuelPrice);
    const tripsPerWeek = parseFloat(fuelDetails.tripsPerWeek);

    if (isNaN(distance) || isNaN(mpg) || isNaN(fuelPrice) || isNaN(tripsPerWeek)) {
      return;
    }

    // Calculate fuel consumption
    const gallonsPerTrip = distance / mpg;
    const costPerTrip = gallonsPerTrip * fuelPrice;

    // Calculate weekly costs
    const weeklyTrips = tripsPerWeek;
    const weeklyGallons = gallonsPerTrip * weeklyTrips;
    const weeklyCost = costPerTrip * weeklyTrips;

    // Calculate monthly costs
    const monthlyTrips = weeklyTrips * 4.33; // Average weeks per month
    const monthlyGallons = weeklyGallons * 4.33;
    const monthlyCost = weeklyCost * 4.33;

    // Calculate annual costs
    const annualTrips = monthlyTrips * 12;
    const annualGallons = monthlyGallons * 12;
    const annualCost = monthlyCost * 12;

    setResults({
      gallonsPerTrip: gallonsPerTrip.toFixed(2),
      costPerTrip: costPerTrip.toFixed(2),
      weeklyGallons: weeklyGallons.toFixed(2),
      weeklyCost: weeklyCost.toFixed(2),
      monthlyGallons: monthlyGallons.toFixed(2),
      monthlyCost: monthlyCost.toFixed(2),
      annualGallons: annualGallons.toFixed(2),
      annualCost: annualCost.toFixed(2)
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
              Auto Fuel Calculator
            </CardTitle>
            <CardDescription>
              Calculate your fuel consumption and costs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="distance">Distance (Miles)</Label>
                <Input
                  id="distance"
                  type="number"
                  value={fuelDetails.distance}
                  onChange={(e) => setFuelDetails({...fuelDetails, distance: e.target.value})}
                  placeholder="100"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="mpg">Fuel Economy (MPG)</Label>
                <Input
                  id="mpg"
                  type="number"
                  value={fuelDetails.mpg}
                  onChange={(e) => setFuelDetails({...fuelDetails, mpg: e.target.value})}
                  placeholder="25"
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="fuelPrice">Fuel Price ($/Gallon)</Label>
                <div className="relative">
                  <Input
                    id="fuelPrice"
                    type="number"
                    value={fuelDetails.fuelPrice}
                    onChange={(e) => setFuelDetails({...fuelDetails, fuelPrice: e.target.value})}
                    placeholder="3.50"
                  />
                  <DollarSign className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="fuelType">Fuel Type</Label>
                <select
                  id="fuelType"
                  className="w-full rounded-md border border-input bg-background px-3 py-2"
                  value={fuelDetails.fuelType}
                  onChange={(e) => setFuelDetails({...fuelDetails, fuelType: e.target.value})}
                >
                  <option value="regular">Regular</option>
                  <option value="midgrade">Midgrade</option>
                  <option value="premium">Premium</option>
                  <option value="diesel">Diesel</option>
                </select>
              </div>
              <div className="space-y-1">
                <Label htmlFor="tripsPerWeek">Trips Per Week</Label>
                <Input
                  id="tripsPerWeek"
                  type="number"
                  value={fuelDetails.tripsPerWeek}
                  onChange={(e) => setFuelDetails({...fuelDetails, tripsPerWeek: e.target.value})}
                  placeholder="1"
                />
              </div>
            </div>

            <Button onClick={calculateFuel} className="w-full">
              Calculate Fuel Costs
            </Button>

            {results && (
              <div className="mt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-sm font-semibold mb-2">Per Trip</h3>
                    <p className="text-lg font-bold text-primary">
                      {results.gallonsPerTrip} gal (${results.costPerTrip})
                    </p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-sm font-semibold mb-2">Weekly</h3>
                    <p className="text-lg font-bold text-primary">
                      {results.weeklyGallons} gal (${results.weeklyCost})
                    </p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-sm font-semibold mb-2">Monthly</h3>
                    <p className="text-lg font-bold text-primary">
                      {results.monthlyGallons} gal (${results.monthlyCost})
                    </p>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-sm font-semibold mb-2">Annual</h3>
                    <p className="text-lg font-bold text-primary">
                      {results.annualGallons} gal (${results.annualCost})
                    </p>
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
                <li>Calculate fuel consumption</li>
                <li>Estimate fuel costs</li>
                <li>Compare fuel types</li>
                <li>Plan trip expenses</li>
                <li>Track monthly costs</li>
                <li>Mobile-friendly interface</li>
              </ul>
            </div>

            {/* Tips Section */}
            <div className="mt-8 bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaLightbulb className="mr-2" />
                Tips for Saving Fuel
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Maintain proper tire pressure</li>
                <li>Drive at steady speeds</li>
                <li>Reduce unnecessary weight</li>
                <li>Use cruise control</li>
                <li>Plan efficient routes</li>
                <li>Keep up with maintenance</li>
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
                  <h4 className="font-medium text-gray-800">How can I improve my fuel economy?</h4>
                  <p className="text-gray-700 mt-1">
                    You can improve fuel economy by maintaining your vehicle, driving efficiently, reducing weight, using the right fuel grade, and planning your trips to minimize unnecessary driving.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">What affects fuel consumption?</h4>
                  <p className="text-gray-700 mt-1">
                    Factors include driving habits, vehicle maintenance, road conditions, weather, vehicle weight, and aerodynamics. Aggressive driving and poor maintenance can significantly reduce fuel efficiency.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Should I use premium fuel?</h4>
                  <p className="text-gray-700 mt-1">
                    Use the fuel grade recommended by your vehicle's manufacturer. Using premium fuel in a vehicle designed for regular fuel typically doesn't improve performance or fuel economy.
                  </p>
                </div>
              </div>
            </div>

            {/* SEO Content Section */}
            <SeoContent title="Understanding Fuel Costs">
              <p>
                Understanding your fuel consumption and costs is important for budgeting and planning your trips. Our calculator helps you estimate your fuel expenses based on your driving habits and vehicle specifications.
              </p>
              <p>
                <strong className="text-foreground">Key Factors in Fuel Costs:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Distance traveled</li>
                <li>Fuel economy</li>
                <li>Fuel prices</li>
                <li>Driving frequency</li>
                <li>Vehicle efficiency</li>
              </ul>
              <p>
                This calculator helps you:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Estimate fuel costs</li>
                <li>Plan trip expenses</li>
                <li>Compare fuel types</li>
                <li>Budget for fuel</li>
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

export default AutoFuelCalculator; 
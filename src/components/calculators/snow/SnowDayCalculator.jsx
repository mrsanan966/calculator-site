import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CloudSnow, Thermometer, Wind } from "lucide-react";
import SeoContent from "@/components/calculators/SeoContent";
import { FaInfoCircle, FaQuestionCircle, FaLightbulb } from "react-icons/fa";

const SnowDayCalculator = () => {
  const [temperature, setTemperature] = useState("");
  const [snowAmount, setSnowAmount] = useState("");
  const [windSpeed, setWindSpeed] = useState("");
  const [roadCondition, setRoadCondition] = useState("clear");
  const [results, setResults] = useState(null);

  const calculateSnowDay = () => {
    const temp = parseFloat(temperature);
    const snow = parseFloat(snowAmount);
    const wind = parseFloat(windSpeed);

    if (isNaN(temp) || isNaN(snow) || isNaN(wind)) {
      return;
    }

    let probability = 0;
    let reason = "";

    // Temperature factor (30% weight)
    if (temp < 20) {
      probability += 30;
      reason += "Extreme cold temperatures. ";
    } else if (temp < 32) {
      probability += 20;
      reason += "Freezing temperatures. ";
    }

    // Snow amount factor (40% weight)
    if (snow >= 12) {
      probability += 40;
      reason += "Heavy snowfall. ";
    } else if (snow >= 6) {
      probability += 30;
      reason += "Moderate snowfall. ";
    } else if (snow >= 2) {
      probability += 20;
      reason += "Light snowfall. ";
    }

    // Wind speed factor (20% weight)
    if (wind >= 30) {
      probability += 20;
      reason += "Strong winds creating blizzard conditions. ";
    } else if (wind >= 20) {
      probability += 15;
      reason += "Moderate winds. ";
    } else if (wind >= 10) {
      probability += 10;
      reason += "Light winds. ";
    }

    // Road condition factor (10% weight)
    if (roadCondition === "icy") {
      probability += 10;
      reason += "Icy road conditions. ";
    } else if (roadCondition === "snow-covered") {
      probability += 5;
      reason += "Snow-covered roads. ";
    }

    setResults({
      probability: Math.min(probability, 100),
      reason: reason.trim()
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
              <CloudSnow className="mr-3 h-8 w-8" />
              Snow Day Calculator
            </CardTitle>
            <CardDescription>
              Calculate the probability of a snow day based on weather conditions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="temperature">Temperature (°F)</Label>
                <div className="relative">
                  <Input
                    id="temperature"
                    type="number"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                    placeholder="32"
                  />
                  <Thermometer className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="snowAmount">Snow Amount (inches)</Label>
                <div className="relative">
                  <Input
                    id="snowAmount"
                    type="number"
                    value={snowAmount}
                    onChange={(e) => setSnowAmount(e.target.value)}
                    placeholder="6"
                  />
                  <CloudSnow className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="windSpeed">Wind Speed (mph)</Label>
                <div className="relative">
                  <Input
                    id="windSpeed"
                    type="number"
                    value={windSpeed}
                    onChange={(e) => setWindSpeed(e.target.value)}
                    placeholder="15"
                  />
                  <Wind className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="roadCondition">Road Condition</Label>
                <Select value={roadCondition} onValueChange={setRoadCondition}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="clear">Clear</SelectItem>
                    <SelectItem value="snow-covered">Snow Covered</SelectItem>
                    <SelectItem value="icy">Icy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={calculateSnowDay} className="w-full">
              Calculate Probability
            </Button>

            {results && (
              <div className="mt-6 space-y-4">
                <div className="p-6 bg-primary/5 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Snow Day Probability</h3>
                  <p className="text-4xl font-bold text-primary">{results.probability}%</p>
                  <p className="mt-2 text-gray-700">{results.reason}</p>
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
                <li>Calculate snow day probability based on multiple factors</li>
                <li>Consider temperature, snow amount, and wind speed</li>
                <li>Account for road conditions</li>
                <li>Detailed probability breakdown</li>
                <li>Real-time calculations</li>
                <li>Mobile-friendly interface</li>
              </ul>
            </div>

            {/* Tips Section */}
            <div className="mt-8 bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaLightbulb className="mr-2" />
                Tips for Snow Day Prediction
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Monitor weather forecasts regularly</li>
                <li>Consider local school district policies</li>
                <li>Check road conditions in your area</li>
                <li>Look for weather warnings and advisories</li>
                <li>Consider wind chill factors</li>
                <li>Stay informed about school announcements</li>
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
                  <h4 className="font-medium text-gray-800">How accurate is the snow day calculator?</h4>
                  <p className="text-gray-700 mt-1">
                    The calculator provides an estimate based on common factors that schools consider when making snow day decisions. However, final decisions depend on local conditions and school policies.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">What factors affect snow day decisions?</h4>
                  <p className="text-gray-700 mt-1">
                    Schools consider temperature, snow accumulation, wind speed, road conditions, and visibility when making snow day decisions.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">When are snow day decisions typically made?</h4>
                  <p className="text-gray-700 mt-1">
                    Most schools make snow day decisions early in the morning, usually between 5-6 AM, to assess current conditions and forecast.
                  </p>
                </div>
              </div>
            </div>

            {/* SEO Content Section */}
            <SeoContent title="Understanding Snow Day Predictions">
              <p>
                Snow day predictions help students, parents, and schools prepare for winter weather conditions. Our calculator considers multiple factors to estimate the probability of a snow day.
              </p>
              <p>
                <strong className="text-foreground">Key Factors in Snow Day Decisions:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Temperature and wind chill</li>
                <li>Snow accumulation</li>
                <li>Wind speed and visibility</li>
                <li>Road and sidewalk conditions</li>
              </ul>
              <p>
                This calculator helps you:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Plan for potential school closures</li>
                <li>Understand weather impact on schools</li>
                <li>Prepare for winter conditions</li>
                <li>Stay informed about weather risks</li>
              </ul>
              <p>
                For more weather tools, check out our <a href="/weather">Weather Calculator</a> for comprehensive weather information.
              </p>
            </SeoContent>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default SnowDayCalculator; 
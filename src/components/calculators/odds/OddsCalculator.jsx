import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Percent } from "lucide-react";
import SeoContent from "@/components/calculators/SeoContent";
import { FaTrash, FaHistory, FaInfoCircle, FaQuestionCircle, FaLightbulb } from "react-icons/fa";

const OddsCalculator = () => {
  const [oddsType, setOddsType] = useState("decimal");
  const [oddsValue, setOddsValue] = useState("");
  const [stake, setStake] = useState("");
  const [results, setResults] = useState(null);

  const calculateOdds = () => {
    let decimalOdds;
    let probability;
    let potentialPayout;

    switch (oddsType) {
      case "decimal":
        decimalOdds = parseFloat(oddsValue);
        probability = (1 / decimalOdds) * 100;
        potentialPayout = stake * decimalOdds;
        break;
      case "fractional":
        const [numerator, denominator] = oddsValue.split("/").map(Number);
        decimalOdds = numerator / denominator + 1;
        probability = (1 / decimalOdds) * 100;
        potentialPayout = stake * decimalOdds;
        break;
      case "american":
        if (parseInt(oddsValue) > 0) {
          decimalOdds = (parseInt(oddsValue) / 100) + 1;
        } else {
          decimalOdds = (100 / Math.abs(parseInt(oddsValue))) + 1;
        }
        probability = (1 / decimalOdds) * 100;
        potentialPayout = stake * decimalOdds;
        break;
      default:
        return;
    }

    setResults({
      decimalOdds: decimalOdds.toFixed(2),
      fractionalOdds: convertToFractional(decimalOdds),
      americanOdds: convertToAmerican(decimalOdds),
      probability: probability.toFixed(2),
      potentialPayout: potentialPayout.toFixed(2),
      profit: (potentialPayout - stake).toFixed(2)
    });
  };

  const convertToFractional = (decimal) => {
    const fraction = decimal - 1;
    if (fraction === parseInt(fraction)) {
      return `${fraction}/1`;
    }
    let numerator = fraction * 100;
    let denominator = 100;
    const gcd = (a, b) => b ? gcd(b, a % b) : a;
    const divisor = gcd(numerator, denominator);
    return `${numerator/divisor}/${denominator/divisor}`;
  };

  const convertToAmerican = (decimal) => {
    if (decimal >= 2) {
      return `+${((decimal - 1) * 100).toFixed(0)}`;
    } else {
      return `-${(100 / (decimal - 1)).toFixed(0)}`;
    }
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
              Odds Calculator
            </CardTitle>
            <CardDescription>
              Convert between different odds formats and calculate potential payouts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="oddsType">Odds Format</Label>
                <Select value={oddsType} onValueChange={setOddsType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="decimal">Decimal (1.50)</SelectItem>
                    <SelectItem value="fractional">Fractional (1/2)</SelectItem>
                    <SelectItem value="american">American (+150/-150)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="oddsValue">Odds Value</Label>
                <Input
                  id="oddsValue"
                  type="text"
                  value={oddsValue}
                  onChange={(e) => setOddsValue(e.target.value)}
                  placeholder={oddsType === "decimal" ? "1.50" : oddsType === "fractional" ? "1/2" : "+150"}
                />
              </div>

              <div>
                <Label htmlFor="stake">Stake Amount ($)</Label>
                <Input
                  id="stake"
                  type="number"
                  value={stake}
                  onChange={(e) => setStake(e.target.value)}
                  placeholder="100"
                />
              </div>

              <Button onClick={calculateOdds} className="w-full">
                Calculate Odds
              </Button>

              {results && (
                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <h3 className="text-sm font-semibold mb-2">Decimal Odds</h3>
                      <p className="text-lg font-bold text-primary">{results.decimalOdds}</p>
                    </div>
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <h3 className="text-sm font-semibold mb-2">Fractional Odds</h3>
                      <p className="text-lg font-bold text-primary">{results.fractionalOdds}</p>
                    </div>
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <h3 className="text-sm font-semibold mb-2">American Odds</h3>
                      <p className="text-lg font-bold text-primary">{results.americanOdds}</p>
                    </div>
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <h3 className="text-sm font-semibold mb-2">Probability</h3>
                      <p className="text-lg font-bold text-primary">{results.probability}%</p>
                    </div>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Potential Payout</h3>
                    <p className="text-3xl font-bold text-primary">${results.potentialPayout}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Profit: ${results.profit}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Features Section */}
            <div className="mt-8 bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaInfoCircle className="mr-2" />
                Features
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Convert between different odds formats (American, Decimal, Fractional)</li>
                <li>Calculate implied probability</li>
                <li>Support for positive and negative odds</li>
                <li>Instant conversion with detailed breakdown</li>
                <li>Calculation history for easy reference</li>
                <li>Mobile-friendly interface</li>
              </ul>
            </div>

            {/* Tips Section */}
            <div className="mt-8 bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaLightbulb className="mr-2" />
                Tips for Understanding Odds
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Understand the different odds formats used in different regions</li>
                <li>Compare odds across different bookmakers for better value</li>
                <li>Consider implied probability when making decisions</li>
                <li>Remember that odds include the bookmaker's margin</li>
                <li>Use the calculator to find the best value bets</li>
                <li>Keep track of your betting history</li>
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
                  <h4 className="font-medium text-gray-800">What's the difference between American, Decimal, and Fractional odds?</h4>
                  <p className="text-gray-700 mt-1">
                    American odds use +/- numbers, Decimal odds show total return, and Fractional odds show profit relative to stake. They all represent the same probability but in different formats.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">How do I calculate implied probability?</h4>
                  <p className="text-gray-700 mt-1">
                    Implied probability is calculated by converting the odds into a percentage chance of the event occurring. Our calculator does this automatically.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">What do positive and negative odds mean?</h4>
                  <p className="text-gray-700 mt-1">
                    Positive odds show potential profit on a $100 bet, while negative odds show how much you need to bet to win $100.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <SeoContent title="Understanding Odds Calculation">
          <p>
            Odds calculation is essential for sports betting and probability assessment. Our odds calculator helps you understand and convert between different odds formats used worldwide.
          </p>
          <p>
            <strong className="text-foreground">How Odds Work:</strong>
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>American odds: +/- numbers showing profit on $100 bet</li>
            <li>Decimal odds: Total return including stake</li>
            <li>Fractional odds: Profit relative to stake</li>
            <li>Implied probability: Percentage chance of outcome</li>
          </ul>
          <p>
            This calculator is useful for:
          </p>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li>Comparing odds across different bookmakers</li>
            <li>Understanding betting value</li>
            <li>Converting between odds formats</li>
            <li>Calculating potential returns</li>
          </ul>
          <p>
            For more betting tools, check out our <a href="/parlay">Parlay Calculator</a> for multiple bet calculations.
          </p>
        </SeoContent>
      </motion.div>
    </div>
  );
};

export default OddsCalculator;

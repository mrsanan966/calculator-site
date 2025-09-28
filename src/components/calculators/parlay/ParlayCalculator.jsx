import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator, Plus, Trash2 } from "lucide-react";
import SeoContent from "@/components/calculators/SeoContent";
import { FaTrash, FaHistory, FaPlus, FaMinus, FaInfoCircle, FaQuestionCircle, FaLightbulb } from "react-icons/fa";

const ParlayCalculator = () => {
  const [legs, setLegs] = useState([
    { odds: "", type: "decimal" }
  ]);
  const [stake, setStake] = useState("");
  const [results, setResults] = useState(null);

  const addLeg = () => {
    setLegs([...legs, { odds: "", type: "decimal" }]);
  };

  const removeLeg = (index) => {
    const newLegs = legs.filter((_, i) => i !== index);
    setLegs(newLegs);
  };

  const updateLeg = (index, field, value) => {
    const newLegs = [...legs];
    newLegs[index] = { ...newLegs[index], [field]: value };
    setLegs(newLegs);
  };

  const convertToDecimal = (odds, type) => {
    switch (type) {
      case "decimal":
        return parseFloat(odds);
      case "fractional":
        const [numerator, denominator] = odds.split("/").map(Number);
        return (numerator / denominator) + 1;
      case "american":
        if (parseInt(odds) > 0) {
          return (parseInt(odds) / 100) + 1;
        } else {
          return (100 / Math.abs(parseInt(odds))) + 1;
        }
      default:
        return 0;
    }
  };

  const calculateParlay = () => {
    const decimalOdds = legs.map(leg => convertToDecimal(leg.odds, leg.type));
    const totalOdds = decimalOdds.reduce((acc, curr) => acc * curr, 1);
    const potentialPayout = stake * totalOdds;
    const profit = potentialPayout - stake;
    const impliedProbability = (1 / totalOdds) * 100;

    setResults({
      totalOdds: totalOdds.toFixed(2),
      potentialPayout: potentialPayout.toFixed(2),
      profit: profit.toFixed(2),
      impliedProbability: impliedProbability.toFixed(2)
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
              <Calculator className="mr-3 h-8 w-8" />
              Parlay Calculator
            </CardTitle>
            <CardDescription>
              Calculate potential payouts for multiple-leg parlay bets
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {legs.map((leg, index) => (
                <div key={index} className="space-y-4 p-4 border rounded-lg relative">
                  <div className="absolute top-2 right-2">
                    {legs.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeLeg(index)}
                        className="h-8 w-8"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <h3 className="font-medium">Leg {index + 1}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Odds Format</Label>
                      <Select
                        value={leg.type}
                        onValueChange={(value) => updateLeg(index, "type", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="decimal">Decimal</SelectItem>
                          <SelectItem value="fractional">Fractional</SelectItem>
                          <SelectItem value="american">American</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Odds</Label>
                      <Input
                        value={leg.odds}
                        onChange={(e) => updateLeg(index, "odds", e.target.value)}
                        placeholder={leg.type === "decimal" ? "1.50" : leg.type === "fractional" ? "1/2" : "+150"}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <Button
                onClick={addLeg}
                variant="outline"
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Another Leg
              </Button>

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

              <Button onClick={calculateParlay} className="w-full">
                Calculate Parlay
              </Button>

              {results && (
                <div className="mt-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <h3 className="text-sm font-semibold mb-2">Total Odds</h3>
                      <p className="text-lg font-bold text-primary">{results.totalOdds}</p>
                    </div>
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <h3 className="text-sm font-semibold mb-2">Implied Probability</h3>
                      <p className="text-lg font-bold text-primary">{results.impliedProbability}%</p>
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
                <li>Calculate parlay odds and potential payouts</li>
                <li>Support for multiple bet types</li>
                <li>Real-time odds conversion</li>
                <li>Instant calculation with detailed breakdown</li>
                <li>Calculation history for easy reference</li>
                <li>Mobile-friendly interface</li>
              </ul>
            </div>

            {/* Tips Section */}
            <div className="mt-8 bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaLightbulb className="mr-2" />
                Tips for Parlay Betting
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Start with smaller parlays to understand the risk</li>
                <li>Research each selection thoroughly</li>
                <li>Consider the probability of each outcome</li>
                <li>Don't chase losses with bigger parlays</li>
                <li>Set a budget for parlay betting</li>
                <li>Use the calculator to understand potential returns</li>
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
                  <h4 className="font-medium text-gray-800">How are parlay odds calculated?</h4>
                  <p className="text-gray-700 mt-1">
                    Parlay odds are calculated by multiplying the decimal odds of each selection together. The result is then converted to your preferred odds format.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">What happens if one selection loses?</h4>
                  <p className="text-gray-700 mt-1">
                    In a parlay, if any selection loses, the entire bet loses. All selections must win for the parlay to be successful.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Are parlays worth it?</h4>
                  <p className="text-gray-700 mt-1">
                    Parlays offer higher potential payouts but come with increased risk. The probability of winning decreases with each additional selection.
                  </p>
                </div>
              </div>
            </div>

            {/* SEO Content Section */}
            <SeoContent title="Understanding Parlay Betting">
              <p>
                Parlay betting combines multiple selections into a single bet, offering higher potential payouts but with increased risk. Our parlay calculator helps you understand the odds and potential returns.
              </p>
              <p>
                <strong className="text-foreground">How Parlays Work:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Combine multiple selections into one bet</li>
                <li>Multiply odds for total parlay odds</li>
                <li>All selections must win for payout</li>
                <li>Higher risk but higher potential returns</li>
              </ul>
              <p>
                This calculator is useful for:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Calculating potential parlay payouts</li>
                <li>Understanding parlay odds</li>
                <li>Planning betting strategies</li>
                <li>Comparing different parlay combinations</li>
              </ul>
              <p>
                For more betting tools, check out our <a href="/odds">Odds Calculator</a> for individual bet calculations.
              </p>
            </SeoContent>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ParlayCalculator;

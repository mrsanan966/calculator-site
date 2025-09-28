import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Ruler, Scale, ArrowUp } from "lucide-react";
import SeoContent from "@/components/calculators/SeoContent";
import { FaInfoCircle, FaQuestionCircle, FaLightbulb } from "react-icons/fa";

const DunkCalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [verticalJump, setVerticalJump] = useState("");
  const [rimHeight, setRimHeight] = useState("10"); // Standard rim height in feet
  const [results, setResults] = useState(null);

  const calculateDunk = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);
    const vj = parseFloat(verticalJump);
    const rh = parseFloat(rimHeight);

    if (isNaN(h) || isNaN(w) || isNaN(vj) || isNaN(rh)) {
      return;
    }

    // Convert height to inches
    const heightInInches = h * 12;
    
    // Calculate standing reach (approximately 1.33 times height)
    const standingReach = heightInInches * 1.33;
    
    // Calculate maximum reach
    const maxReach = standingReach + (vj * 12);
    
    // Convert rim height to inches
    const rimHeightInInches = rh * 12;
    
    // Calculate if dunk is possible
    const canDunk = maxReach >= rimHeightInInches;
    
    // Calculate how much above/below rim
    const difference = maxReach - rimHeightInInches;
    
    // Calculate dunk difficulty
    let difficulty = "Impossible";
    if (canDunk) {
      if (difference >= 6) {
        difficulty = "Easy";
      } else if (difference >= 3) {
        difficulty = "Moderate";
      } else {
        difficulty = "Difficult";
      }
    }

    setResults({
      canDunk,
      maxReach: (maxReach / 12).toFixed(1),
      difference: Math.abs(difference).toFixed(1),
      difficulty,
      standingReach: (standingReach / 12).toFixed(1)
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
              <ArrowUp className="mr-3 h-8 w-8" />
              Dunk Calculator
            </CardTitle>
            <CardDescription>
              Calculate if you can dunk based on your physical attributes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="height">Height (feet)</Label>
                <div className="relative">
                  <Input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    placeholder="6.0"
                  />
                  <Ruler className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="weight">Weight (lbs)</Label>
                <div className="relative">
                  <Input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="180"
                  />
                  <Scale className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="verticalJump">Vertical Jump (inches)</Label>
                <div className="relative">
                  <Input
                    id="verticalJump"
                    type="number"
                    value={verticalJump}
                    onChange={(e) => setVerticalJump(e.target.value)}
                    placeholder="24"
                  />
                  <ArrowUp className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="rimHeight">Rim Height (feet)</Label>
                <div className="relative">
                  <Input
                    id="rimHeight"
                    type="number"
                    value={rimHeight}
                    onChange={(e) => setRimHeight(e.target.value)}
                    placeholder="10"
                  />
                  <Ruler className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </div>

            <Button onClick={calculateDunk} className="w-full">
              Calculate Dunk Potential
            </Button>

            {results && (
              <div className="mt-6 space-y-4">
                <div className="p-6 bg-primary/5 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">Dunk Analysis</h3>
                  <p className="text-2xl font-bold text-primary">
                    {results.canDunk ? "You Can Dunk!" : "Can't Dunk Yet"}
                  </p>
                  <div className="mt-4 space-y-2">
                    <p>Maximum Reach: {results.maxReach} feet</p>
                    <p>Standing Reach: {results.standingReach} feet</p>
                    <p>Difference from Rim: {results.difference} inches</p>
                    <p>Difficulty: {results.difficulty}</p>
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
                <li>Calculate dunk potential based on physical attributes</li>
                <li>Consider height, weight, and vertical jump</li>
                <li>Customizable rim height</li>
                <li>Detailed dunk analysis</li>
                <li>Difficulty assessment</li>
                <li>Mobile-friendly interface</li>
              </ul>
            </div>

            {/* Tips Section */}
            <div className="mt-8 bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaLightbulb className="mr-2" />
                Tips for Improving Dunk Ability
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Focus on leg strength training</li>
                <li>Practice plyometric exercises</li>
                <li>Work on proper jumping technique</li>
                <li>Maintain a healthy weight</li>
                <li>Improve overall athleticism</li>
                <li>Get adequate rest and recovery</li>
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
                  <h4 className="font-medium text-gray-800">How is dunk potential calculated?</h4>
                  <p className="text-gray-700 mt-1">
                    The calculator considers your height, weight, vertical jump, and the rim height to determine if you can reach the rim and how difficult it would be.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">What's a good vertical jump for dunking?</h4>
                  <p className="text-gray-700 mt-1">
                    Most people need at least 24-28 inches of vertical jump to dunk, depending on their height and the rim height.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Can I improve my dunk ability?</h4>
                  <p className="text-gray-700 mt-1">
                    Yes, with proper training focusing on strength, power, and technique, most people can improve their vertical jump and dunking ability.
                  </p>
                </div>
              </div>
            </div>

            {/* SEO Content Section */}
            <SeoContent title="Understanding Dunk Potential">
              <p>
                Dunking a basketball requires a combination of height, strength, and explosive power. Our calculator helps you understand your dunk potential and what it takes to achieve this athletic feat.
              </p>
              <p>
                <strong className="text-foreground">Key Factors in Dunking:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Height and standing reach</li>
                <li>Vertical jump ability</li>
                <li>Body weight and strength</li>
                <li>Proper jumping technique</li>
              </ul>
              <p>
                This calculator helps you:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Assess your dunk potential</li>
                <li>Set training goals</li>
                <li>Understand physical requirements</li>
                <li>Track progress over time</li>
              </ul>
              <p>
                For more athletic tools, check out our <a href="/vertical">Vertical Jump Calculator</a> for detailed jump analysis.
              </p>
            </SeoContent>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default DunkCalculator;
  
  

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SnowDayForm from "@/components/calculators/snowday/SnowDayForm";
import SnowDayResults from "@/components/calculators/snowday/SnowDayResults";
import SeoContent from "@/components/calculators/SeoContent";
import { calculateSnowDayProbability } from "@/utils/snowDayUtils";

const SnowDayCalculator = () => {
  const [inputs, setInputs] = useState({
    snowfall: 6, 
    timing: "overnight", 
    temperature: 25, 
    windSpeed: 15, 
    schoolPolicy: "moderate", 
  });
  const [probability, setProbability] = useState(0);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const calculatedProbability = calculateSnowDayProbability(inputs);
    setProbability(calculatedProbability);
    if (inputs.snowfall > 0 || inputs.temperature !== 0 || inputs.windSpeed > 0) {
       setShowResults(true);
    } else {
       setShowResults(false); 
    }
  }, [inputs]);

  const handleInputChange = (id, value) => {
    setInputs(prev => ({ ...prev, [id]: value }));
  };

  const handleSliderChange = (id, value) => {
     setInputs(prev => ({ ...prev, [id]: value[0] }));
  };

  const handleSelectChange = (id, value) => {
     setInputs(prev => ({...prev, [id]: value }));
  };

  return (
    <div className="container py-8 md:py-12" id="form">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Snow Day Calculator</h1>
          <p className="text-muted-foreground">
            Estimate the probability of a snow day based on the forecast (for fun!).
          </p>
        </div>

        <SnowDayForm
            inputs={inputs}
            onInputChange={handleInputChange}
            onSliderChange={handleSliderChange}
            onSelectChange={handleSelectChange}
        />

        {showResults && (
           <motion.div
            id="results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
           >
            <SnowDayResults probability={probability} />

            <SeoContent title="Understanding the Snow Day Calculation (for Fun!)">
              <p>
                Ever wondered about the chances of waking up to a snow day? This calculator uses a simplified model based on common factors that influence school closures during winter weather. It's purely for entertainment!
              </p>
              <p>
                <strong className="text-foreground">Factors Considered (Simplified):</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong className="text-foreground">Predicted Snowfall:</strong> More snow generally increases the chance. Heavy amounts weigh heavily.</li>
                <li><strong className="text-foreground">Timing:</strong> Snow falling overnight or during the morning commute is more disruptive than afternoon snow.</li>
                <li><strong className="text-foreground">Temperature:</strong> Colder temperatures (especially below freezing) mean snow is more likely to stick and cause icy roads.</li>
                <li><strong className="text-foreground">Wind Speed:</strong> High winds can cause blowing and drifting snow, reducing visibility and making travel hazardous.</li>
                <li><strong className="text-foreground">School District's Tendency:</strong> Some districts are known to be more cautious and close readily, while others rarely close.</li>
              </ul>
              <p>
                The calculator assigns points based on these factors and adjusts based on the school's tendency, giving a percentage probability.
              </p>
              <p>
                <strong className="text-foreground">Disclaimer:</strong> This is a highly simplified and arbitrary model for fun only. Actual decisions involve complex factors like road conditions, bus operations, forecast confidence, and official policies. <strong className="text-foreground">Always rely on official announcements from your school or workplace regarding closures.</strong>
              </p>
            </SeoContent>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default SnowDayCalculator;
  
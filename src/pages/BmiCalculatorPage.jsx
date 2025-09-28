import React from "react";
import { FaWeight, FaRuler, FaCalculator, FaInfoCircle } from "react-icons/fa";
import BmiCalculator from "@/components/calculators/bmi/BmiCalculator";
import useSeo from "@/hooks/useSeo";

const BmiCalculatorPage = () => {
  useSeo({
    title: "BMI Calculator - Calculate Your Body Mass Index",
    canonical: "/bmi",
    description: "Calculate your Body Mass Index (BMI) with our free online BMI calculator. Get instant results and understand your BMI category for health assessment.",
    path: "/bmi",
    keywords: "BMI calculator, body mass index, BMI calculation, health calculator, weight calculator, height calculator, BMI categories",
    ogType: "website"
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <FaWeight className="text-blue-600 text-2xl" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            BMI Calculator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calculate your Body Mass Index (BMI) to assess your weight category and understand your health status.
          </p>
        </div>

        {/* Calculator */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <BmiCalculator />
        </div>

        {/* Information Section */}
        <div className="bg-gray-50 rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <FaInfoCircle className="mr-2 text-blue-600" />
            About BMI
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">What is BMI?</h3>
              <p className="text-gray-600 mb-4">
                Body Mass Index (BMI) is a simple calculation using your height and weight to estimate body fat. 
                It's a screening tool that can indicate whether you're underweight, normal weight, overweight, or obese.
              </p>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-3">BMI Categories</h3>
              <ul className="space-y-2 text-gray-600">
                <li><strong>Underweight:</strong> BMI less than 18.5</li>
                <li><strong>Normal weight:</strong> BMI 18.5 to 24.9</li>
                <li><strong>Overweight:</strong> BMI 25 to 29.9</li>
                <li><strong>Obese:</strong> BMI 30 or higher</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Important Notes</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• BMI is not a direct measure of body fat</li>
                <li>• It doesn't account for muscle mass, bone density, or body composition</li>
                <li>• Athletes may have high BMI due to muscle mass</li>
                <li>• Consult healthcare professionals for personalized advice</li>
                <li>• BMI ranges may vary for different age groups and ethnicities</li>
              </ul>
              
              <h3 className="text-lg font-semibold text-gray-800 mb-3 mt-6">When to Use BMI</h3>
              <p className="text-gray-600">
                BMI is useful for population studies and initial health screenings, 
                but should be used alongside other health indicators for a complete assessment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BmiCalculatorPage; 
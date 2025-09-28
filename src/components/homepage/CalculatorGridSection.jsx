import React from "react";
import CalculatorGrid from "@/components/homepage/CalculatorGrid";

const CalculatorGridSection = ({ calculators }) => {
  return (
    <section id="calculators" className="py-16 lg:py-24 bg-background" aria-labelledby="calculator-grid-heading">
      <div className="container">
        <div className="text-center mb-12 lg:mb-16">
          <h2 id="calculator-grid-heading" className="text-3xl md:text-4xl font-bold mb-4">Our Suite of Calculators</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Explore our comprehensive suite of financial and utility calculators designed to help you make informed decisions.
          </p>
        </div>
        <CalculatorGrid calculators={calculators} />
      </div>
    </section>
  );
};

export default CalculatorGridSection;
  
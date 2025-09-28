import React from "react";
import { motion } from "framer-motion";
import { Calculator } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-6">
              <Calculator className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Smart Financial & Utility Calculators
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Your premier destination for a wide array of financial and utility calculators. 
              From mortgage and loan planning to academic and time management tools, 
              FinCalc empowers you to make informed decisions with ease and precision.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
  
import React from "react";
import { motion } from "framer-motion";
import { Calculator, Shield, Zap, BarChart } from "lucide-react";

const features = [
  {
    title: "Comprehensive Calculators",
    description: "Access a wide range of financial and utility calculators for all your needs.",
    icon: <Calculator className="h-6 w-6 text-primary" />
  },
  {
    title: "Secure & Private",
    description: "Your data stays on your device. We don't store any personal information.",
    icon: <Shield className="h-6 w-6 text-primary" />
  },
  {
    title: "Fast & Efficient",
    description: "Get instant results with our optimized calculation engines.",
    icon: <Zap className="h-6 w-6 text-primary" />
  },
  {
    title: "Detailed Analysis",
    description: "View comprehensive breakdowns and visualizations of your results.",
    icon: <BarChart className="h-6 w-6 text-primary" />
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose FinCalc?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Our calculators are designed to help you make informed decisions with confidence.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-lg p-6 shadow-sm"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
  
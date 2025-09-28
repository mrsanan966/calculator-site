import React from 'react';
import { Link } from 'react-router-dom';
import useSeo from '@/hooks/useSeo';
import { CALCULATORS } from '@/config/calculators';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Footer from '@/components/Footer';

const CalculatorsPage = () => {
  useSeo({
    title: 'All Calculators - Financial & Utility Calculators',
    description: 'Browse our complete collection of financial and utility calculators. From mortgage and loan calculators to academic and time management tools.',
    keywords: 'calculators, financial calculators, utility calculators, mortgage calculator, loan calculator',
    canonical: '/calculators',
    path: '/calculators',
    ogType: 'website'
  });

  // Group calculators by category
  const calculatorsByCategory = Object.values(CALCULATORS).reduce((acc, calc) => {
    if (!acc[calc.category]) {
      acc[calc.category] = [];
    }
    acc[calc.category].push(calc);
    return acc;
  }, {});

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">All Calculators</h1>
            <p className="text-lg text-muted-foreground">
              Browse our complete collection of financial and utility calculators to help you make informed decisions.
            </p>
          </header>

          {Object.entries(calculatorsByCategory).map(([category, calculators]) => (
            <section key={category} className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 capitalize">{category}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {calculators.map((calculator) => (
                  <Link 
                    key={calculator.id} 
                    to={calculator.path}
                    className="block h-full"
                  >
                    <Card className="h-full hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle className="text-lg">{calculator.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{calculator.description}</CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CalculatorsPage; 
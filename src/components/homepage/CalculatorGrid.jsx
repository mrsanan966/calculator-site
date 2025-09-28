import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useInView } from "react-intersection-observer";

const ITEMS_PER_PAGE = 12;

const CalculatorGrid = ({ calculators = [] }) => {
  const [visibleCalculators, setVisibleCalculators] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
    rootMargin: "100px"
  });

  const loadMoreCalculators = useCallback(() => {
    if (loading || !hasMore || !calculators.length) return;

    setLoading(true);
    try {
      const start = (page - 1) * ITEMS_PER_PAGE;
      const end = page * ITEMS_PER_PAGE;
      const newCalculators = calculators.slice(start, end);

      setVisibleCalculators(prev => [...prev, ...newCalculators]);
      setPage(prev => prev + 1);
      setHasMore(end < calculators.length);
    } catch (error) {
      console.error("Error loading more calculators:", error);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore, calculators]);

  useEffect(() => {
    if (inView) {
      loadMoreCalculators();
    }
  }, [inView, loadMoreCalculators]);

  useEffect(() => {
    // Reset state when calculators prop changes
    setVisibleCalculators(calculators.slice(0, ITEMS_PER_PAGE));
    setPage(1);
    setHasMore(calculators.length > ITEMS_PER_PAGE);
  }, [calculators]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2
      }
    }
  };

  if (!calculators.length) {
    return null;
  }

  const getCalculatorPath = (calculator) => {
    // Ensure path starts with a forward slash
    const path = calculator.path.startsWith('/') ? calculator.path : `/${calculator.path}`;
    // Remove any trailing slashes
    return path.replace(/\/+$/, '');
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="popLayout">
            {visibleCalculators.map((calculator) => {
              const path = getCalculatorPath(calculator);
              return (
                <motion.div
                  key={path}
                  variants={itemVariants}
                  layout
                  className="flex"
                >
                  <Link 
                    to={path} 
                    className="block h-full w-full group"
                    onClick={(e) => {
                      // Prevent navigation if path is invalid
                      if (!path || path === '/') {
                        e.preventDefault();
                        console.error('Invalid calculator path:', path);
                      }
                    }}
                  >
                    <Card className="calculator-card flex flex-col h-full w-full hover:shadow-lg transition-shadow duration-300">
                      <CardHeader className={`calculator-card-header ${calculator.color}`}>
                        <div className="mb-3 p-3 inline-block bg-primary/10 rounded-full">
                          {React.cloneElement(calculator.icon, { className: "h-7 w-7 text-primary" })}
                        </div>
                        <CardTitle className="text-lg">{calculator.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-4 flex-grow">
                        <CardDescription className="text-foreground/80 text-sm">
                          {calculator.description}
                        </CardDescription>
                      </CardContent>
                      <CardFooter className="pt-4">
                        <div className="try-calculator-button w-full">
                          Try Calculator
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {hasMore && (
          <div ref={ref} className="flex justify-center mt-8">
            {loading ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <span className="text-muted-foreground">Loading more calculators...</span>
              </div>
            ) : (
              <button
                onClick={loadMoreCalculators}
                className="px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                Load More
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default React.memo(CalculatorGrid);
  
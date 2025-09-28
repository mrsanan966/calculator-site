
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Database, HardDrive, Search } from "lucide-react";
import { formatCurrency } from "@/utils/calculators";
import SeoContent from "@/components/calculators/SeoContent";

const BigQueryCostCalculator = () => {
  const [storage, setStorage] = useState(1000); // GB
  const [queries, setQueries] = useState(100); // TB
  const [region, setRegion] = useState("us");
  const [results, setResults] = useState(null);

  const calculateCosts = () => {
    // BigQuery pricing (as of 2024)
    const prices = {
      storage: {
        active: 0.02, // per GB
        longTerm: 0.01 // per GB
      },
      query: {
        us: 5.00, // per TB
        eu: 5.00,
        asia: 5.00
      }
    };

    const storagePrice = prices.storage.active;
    const queryPrice = prices.query[region];

    const storageCost = storage * storagePrice;
    const queryCost = queries * queryPrice;
    const totalCost = storageCost + queryCost;

    setResults({
      storageCost,
      queryCost,
      totalCost
    });
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
              <Database className="mr-3 h-8 w-8 text-primary" />
              BigQuery Cost Calculator
            </CardTitle>
            <CardDescription>
              Estimate your Google BigQuery costs based on storage and query usage
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="storage">Storage (GB)</Label>
                <div className="flex items-center space-x-2">
                  <HardDrive className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="storage"
                    type="number"
                    value={storage}
                    onChange={(e) => setStorage(Number(e.target.value))}
                    min="0"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="queries">Query Processing (TB)</Label>
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="queries"
                    type="number"
                    value={queries}
                    onChange={(e) => setQueries(Number(e.target.value))}
                    min="0"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="region">Region</Label>
                <Select value={region} onValueChange={setRegion}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States (US)</SelectItem>
                    <SelectItem value="eu">Europe (EU)</SelectItem>
                    <SelectItem value="asia">Asia Pacific</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={calculateCosts} className="w-full">
                Calculate Costs
              </Button>

              {results && (
                <div className="mt-6 space-y-4">
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <h3 className="text-lg font-semibold mb-2">Estimated Monthly Cost</h3>
                    <p className="text-3xl font-bold text-primary">
                      {formatCurrency(results.totalCost)}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <h3 className="text-sm font-semibold mb-2">Storage Cost</h3>
                      <p className="text-lg font-bold text-primary">
                        {formatCurrency(results.storageCost)}
                      </p>
                    </div>
                    <div className="p-4 bg-primary/5 rounded-lg">
                      <h3 className="text-sm font-semibold mb-2">Query Cost</h3>
                      <p className="text-lg font-bold text-primary">
                        {formatCurrency(results.queryCost)}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <SeoContent title="Understanding BigQuery Costs">
          <h2 className="text-xl font-semibold mb-4">How BigQuery Pricing Works</h2>
          <p>
            Google BigQuery uses a pricing model based on two main components: storage and query processing. Understanding these costs can help you optimize your data warehouse spending.
          </p>
          <h3 className="text-lg font-semibold mt-4 mb-2">Cost Components</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Storage Costs:</strong> Charged per GB of data stored</li>
            <li><strong>Query Costs:</strong> Based on the amount of data processed by queries (TB)</li>
            <li><strong>Regional Pricing:</strong> Costs may vary by region</li>
            <li><strong>On-Demand Pricing:</strong> Pay only for what you use</li>
          </ul>
          <h3 className="text-lg font-semibold mt-4 mb-2">Cost Optimization Tips</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Partition tables to reduce query costs</li>
            <li>Use clustering for frequently filtered columns</li>
            <li>Implement proper table expiration</li>
            <li>Monitor and optimize query patterns</li>
          </ul>
        </SeoContent>
      </motion.div>
    </div>
  );
};

export default BigQueryCostCalculator;

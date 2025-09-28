
import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Percent, Info } from 'lucide-react';
import { getSnowDayProbabilityColor, getSnowDayProbabilityMessage, SNOW_DAY_THRESHOLD } from "@/utils/snowDayUtils";

const SnowDayResults = ({ probability }) => {
  const colorClass = getSnowDayProbabilityColor(probability);
  const message = getSnowDayProbabilityMessage(probability);
  const borderClass = probability >= SNOW_DAY_THRESHOLD ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10';
  const messageBgClass = probability >= SNOW_DAY_THRESHOLD ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30';

  return (
    <Card className={`border-2 ${borderClass}`}>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Percent className="mr-2 h-5 w-5" />
          Snow Day Probability
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-center">
        <div className="bg-background p-6 rounded-lg border shadow-inner">
          <p className="text-sm text-muted-foreground mb-2">Estimated Chance</p>
          <p className={`text-6xl font-bold ${colorClass}`}>
            {probability}%
          </p>
        </div>
         <div className={`p-4 rounded-lg border ${messageBgClass}`}>
            <p className="text-lg font-semibold">
              {message}
            </p>
          </div>
      </CardContent>
      <CardFooter className="flex items-center text-sm text-muted-foreground">
        <Info className="h-4 w-4 mr-1 flex-shrink-0" />
        <span>This calculator is for entertainment purposes only. Always rely on official school/work announcements. Factors are simplified.</span>
      </CardFooter>
    </Card>
  );
};

export default SnowDayResults;
  

import React from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Info } from 'lucide-react';

const DunkResults = ({ results, rimHeightInches }) => {
  const { maxJumpReach, canDunk, inchesAboveRim } = results;

  const formatHeight = (totalInches) => {
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    return `${feet}' ${inches}"`;
  };

  const formatDistance = (inches) => {
    return `${inches.toFixed(1)}"`;
  };

  return (
    <Card className={`border-2 ${canDunk ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'}`}>
      <CardHeader>
        <CardTitle className="flex items-center">
          {canDunk ? <CheckCircle className="mr-2 h-6 w-6 text-green-600" /> : <XCircle className="mr-2 h-6 w-6 text-red-600" />}
          Dunk Calculation Result
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-center">
        <div className="bg-background p-4 rounded-lg border">
          <p className="text-sm text-muted-foreground mb-1">Your Max Jump Reach</p>
          <p className="text-2xl font-bold">{formatHeight(maxJumpReach)}</p>
          <p className="text-xs text-muted-foreground">(Standard Rim Height: {formatHeight(rimHeightInches)})</p>
        </div>

        <div className={`p-4 rounded-lg border ${canDunk ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}`}>
          <p className="text-lg font-semibold mb-1">
            {canDunk ? "You can likely dunk!" : "Dunking might be tough..."}
          </p>
          <p className="text-2xl font-bold">
            {canDunk
              ? `You reach ${formatDistance(inchesAboveRim)} above the rim.`
              : `You need ${formatDistance(Math.abs(inchesAboveRim))} more vertical reach.`}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center text-sm text-muted-foreground">
        <Info className="h-4 w-4 mr-1 flex-shrink-0" />
        <span>This is an estimate. Factors like technique, ball handling, and approach affect dunking ability. Rim height is {formatHeight(rimHeightInches)}.</span>
      </CardFooter>
    </Card>
  );
};

export default DunkResults;
  

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ShoppingBasket as Basketball, ArrowUp } from 'lucide-react';

const DunkForm = ({ inputs, onInputChange, onSliderChange }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Basketball className="mr-2 h-5 w-5 text-primary" />
          Your Measurements
        </CardTitle>
        <CardDescription>
          Enter your height, standing reach, and vertical jump to see if you can dunk.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Your Height</Label>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 flex-1">
              <Input
                type="number"
                value={inputs.heightFeet}
                onChange={(e) => onInputChange('heightFeet', e.target.value)}
                min="0"
                aria-label="Height in Feet"
              />
              <span>ft</span>
            </div>
            <div className="flex items-center space-x-1 flex-1">
              <Input
                type="number"
                value={inputs.heightInches}
                onChange={(e) => onInputChange('heightInches', e.target.value)}
                min="0" max="11" step="0.5"
                aria-label="Height in Inches"
              />
              <span>in</span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Standing Reach</Label>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 flex-1">
              <Input
                type="number"
                value={inputs.standingReachFeet}
                onChange={(e) => onInputChange('standingReachFeet', e.target.value)}
                min="0"
                aria-label="Standing Reach in Feet"
              />
              <span>ft</span>
            </div>
            <div className="flex items-center space-x-1 flex-1">
              <Input
                type="number"
                value={inputs.standingReachInches}
                onChange={(e) => onInputChange('standingReachInches', e.target.value)}
                min="0" max="11" step="0.5"
                aria-label="Standing Reach in Inches"
              />
              <span>in</span>
            </div>
          </div>
          <p className="text-xs text-muted-foreground pt-1">Your reach standing flat-footed with one arm extended straight upwards.</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="verticalJump">Vertical Jump (inches)</Label>
            <span className="text-sm text-muted-foreground">
              {inputs.verticalJump.toFixed(1)} inches
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <ArrowUp className="h-4 w-4 text-muted-foreground" />
            <Input
              id="verticalJump"
              type="number"
              value={inputs.verticalJump}
              onChange={(e) => onInputChange('verticalJump', e.target.value)}
              step="0.5"
              min="0"
            />
          </div>
          <Slider
            value={[inputs.verticalJump]}
            min={0}
            max={60}
            step={0.5}
            onValueChange={(value) => onSliderChange('verticalJump', value)}
            className="mt-2"
            aria-label="Vertical Jump Slider"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DunkForm;
  

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CloudSnow, Thermometer, Wind, Snowflake } from 'lucide-react';

const SnowDayForm = ({ inputs, onInputChange, onSliderChange, onSelectChange }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <CloudSnow className="mr-2 h-5 w-5 text-primary" />
          Forecast Details
        </CardTitle>
        <CardDescription>
          Enter the predicted weather conditions for your area.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Snowfall */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="snowfall">Predicted Snowfall (inches)</Label>
            <span className="text-sm text-muted-foreground">
              {inputs.snowfall.toFixed(1)} inches
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Snowflake className="h-4 w-4 text-muted-foreground" />
            <Input
              id="snowfall"
              type="number"
              value={inputs.snowfall}
              onChange={(e) => onInputChange('snowfall', parseFloat(e.target.value) || 0)}
              step="0.5"
              min="0"
            />
          </div>
          <Slider
            value={[inputs.snowfall]}
            min={0}
            max={24}
            step={0.5}
            onValueChange={(value) => onSliderChange('snowfall', value)}
            className="mt-2"
          />
        </div>

        {/* Timing */}
        <div className="space-y-2">
          <Label htmlFor="timing">Timing of Heaviest Snow</Label>
          <Select value={inputs.timing} onValueChange={(value) => onSelectChange('timing', value)}>
            <SelectTrigger id="timing">
              <SelectValue placeholder="Select timing" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overnight">Overnight / Early Morning</SelectItem>
              <SelectItem value="morning">During Morning Commute</SelectItem>
              <SelectItem value="afternoon">Afternoon / Evening</SelectItem>
              <SelectItem value="allday">All Day</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Temperature */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="temperature">Lowest Temperature (°F)</Label>
            <span className="text-sm text-muted-foreground">
              {inputs.temperature.toFixed(0)}°F
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Thermometer className="h-4 w-4 text-muted-foreground" />
            <Input
              id="temperature"
              type="number"
              value={inputs.temperature}
              onChange={(e) => onInputChange('temperature', parseFloat(e.target.value) || 0)}
              step="1"
              min="-20" max="50"
            />
          </div>
          <Slider
            value={[inputs.temperature]}
            min={-20}
            max={50}
            step={1}
            onValueChange={(value) => onSliderChange('temperature', value)}
            className="mt-2"
          />
        </div>

        {/* Wind Speed */}
         <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="windSpeed">Peak Wind Speed (mph)</Label>
            <span className="text-sm text-muted-foreground">
              {inputs.windSpeed.toFixed(0)} mph
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Wind className="h-4 w-4 text-muted-foreground" />
            <Input
              id="windSpeed"
              type="number"
              value={inputs.windSpeed}
              onChange={(e) => onInputChange('windSpeed', parseFloat(e.target.value) || 0)}
              step="1"
              min="0" max="60"
            />
          </div>
          <Slider
            value={[inputs.windSpeed]}
            min={0}
            max={60}
            step={1}
            onValueChange={(value) => onSliderChange('windSpeed', value)}
            className="mt-2"
          />
        </div>

        {/* School Policy */}
        <div className="space-y-2">
          <Label htmlFor="schoolPolicy">School District's Tendency</Label>
          <Select value={inputs.schoolPolicy} onValueChange={(value) => onSelectChange('schoolPolicy', value)}>
            <SelectTrigger id="schoolPolicy">
              <SelectValue placeholder="Select tendency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="cautious">Cautious (Closes easily)</SelectItem>
              <SelectItem value="moderate">Moderate (Average)</SelectItem>
              <SelectItem value="tough">Tough (Rarely closes)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

export default SnowDayForm;
  
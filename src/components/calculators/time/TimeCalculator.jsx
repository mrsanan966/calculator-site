import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Clock, Plus, Minus, Repeat, CalendarClock } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import SeoContent from '@/components/calculators/SeoContent';
import { FaClock, FaTrash, FaHistory, FaPlus, FaMinus } from "react-icons/fa";

const TimeCalculator = () => {
  const { toast } = useToast();
  const [operation, setOperation] = useState('duration'); // duration, add, subtract, convert
  
  // Duration state
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);

  // Add/Subtract state
  const [initialTime, setInitialTime] = useState('');
  const [initialDate, setInitialDate] = useState(new Date().toISOString().split('T')[0]);
  const [addSubtractHours, setAddSubtractHours] = useState('');
  const [addSubtractMinutes, setAddSubtractMinutes] = useState('');
  const [addSubtractSeconds, setAddSubtractSeconds] = useState('');

  // Convert state
  const [convertValue, setConvertValue] = useState('');
  const [convertFromUnit, setConvertFromUnit] = useState('seconds');
  const [convertToUnit, setConvertToUnit] = useState('minutes');
  
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");
  const [calculationType, setCalculationType] = useState("difference"); // difference, add, subtract

  const timeToSeconds = (timeStr) => {
    if (!timeStr) return 0;
    const parts = timeStr.split(':').map(Number);
    let seconds = 0;
    if (parts.length === 3) seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
    else if (parts.length === 2) seconds = parts[0] * 3600 + parts[1] * 60;
    else if (parts.length === 1) seconds = parts[0] * 3600; // Assume hours if only one part
    return isNaN(seconds) ? 0 : seconds;
  };

  const secondsToHMS = (totalSeconds, includeDays = false) => {
    if (isNaN(totalSeconds) || totalSeconds < 0) return "Invalid input";
    
    let days = 0;
    if (includeDays) {
        days = Math.floor(totalSeconds / (3600 * 24));
        totalSeconds %= (3600*24);
    }
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    let hmsString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    if (includeDays && days > 0) {
        hmsString = `${days} day${days > 1 ? 's' : ''}, ${hmsString}`;
    }
    return hmsString;
  };

  const calculateTimeDifference = () => {
    if (!startTime || !endTime) {
      setError("Please enter both times");
      return;
    }

    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);

    let totalMinutes = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);
    
    if (totalMinutes < 0) {
      totalMinutes += 24 * 60; // Add 24 hours if end time is on next day
    }

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const result = {
      hours,
      minutes,
      totalMinutes,
      totalSeconds: totalMinutes * 60
    };

    setResult(result);
    setError("");

    // Add to history
    setHistory(prev => [{
      calculation: `${startTime} to ${endTime}`,
      result: `${hours} hours, ${minutes} minutes`,
      timestamp: new Date().toLocaleString()
    }, ...prev].slice(0, 5));
  };

  const calculateTimeOperation = (operation) => {
    if (!startTime) {
      setError("Please enter a start time");
      return;
    }

    const [hours, minutes] = startTime.split(":").map(Number);
    const addMinutes = parseInt(endTime) || 0;

    if (isNaN(addMinutes)) {
      setError("Please enter a valid number of minutes");
      return;
    }

    let totalMinutes = hours * 60 + minutes;
    if (operation === "add") {
      totalMinutes += addMinutes;
    } else {
      totalMinutes -= addMinutes;
    }

    // Handle day wrapping
    while (totalMinutes < 0) {
      totalMinutes += 24 * 60;
    }
    totalMinutes = totalMinutes % (24 * 60);

    const resultHours = Math.floor(totalMinutes / 60);
    const resultMinutes = totalMinutes % 60;

    const resultTime = `${String(resultHours).padStart(2, "0")}:${String(resultMinutes).padStart(2, "0")}`;

    setResult({
      operation,
      startTime,
      minutes: addMinutes,
      resultTime
    });
    setError("");

    // Add to history
    setHistory(prev => [{
      calculation: `${startTime} ${operation === "add" ? "+" : "-"} ${addMinutes} minutes`,
      result: resultTime,
      timestamp: new Date().toLocaleString()
    }, ...prev].slice(0, 5));
  };

  const clearAll = () => {
    setStartTime("");
    setEndTime("");
    setResult(null);
    setError("");
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const calculateTime = () => {
    setResult(null);
    try {
      if (operation === 'duration') {
        if (!startTime || !endTime || !startDate || !endDate) {
            toast({ title: "Missing fields", description: "Please fill all date and time fields for duration.", variant: "destructive"}); return;
        }
        const startDateTime = new Date(`${startDate}T${startTime}`);
        const endDateTime = new Date(`${endDate}T${endTime}`);
        if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
             toast({ title: "Invalid time format", description: "Use HH:MM or HH:MM:SS.", variant: "destructive"}); return;
        }

        let diffSeconds = Math.abs((endDateTime.getTime() - startDateTime.getTime()) / 1000);
        setResult(`Duration: ${secondsToHMS(diffSeconds, true)}`);
      } 
      else if (operation === 'add' || operation === 'subtract') {
        if (!initialTime || !initialDate) {
            toast({ title: "Missing fields", description: "Please set initial date and time.", variant: "destructive"}); return;
        }
        let baseDateTime = new Date(`${initialDate}T${initialTime}`);
         if (isNaN(baseDateTime.getTime())) {
             toast({ title: "Invalid initial time format", description: "Use HH:MM or HH:MM:SS.", variant: "destructive"}); return;
        }

        const h = parseInt(addSubtractHours) || 0;
        const m = parseInt(addSubtractMinutes) || 0;
        const s = parseInt(addSubtractSeconds) || 0;
        let changeSeconds = h * 3600 + m * 60 + s;

        if (operation === 'subtract') changeSeconds *= -1;
        
        baseDateTime.setSeconds(baseDateTime.getSeconds() + changeSeconds);
        setResult(`Result: ${baseDateTime.toLocaleDateString()} ${baseDateTime.toLocaleTimeString()}`);
      } 
      else if (operation === 'convert') {
        const val = parseFloat(convertValue);
        if (isNaN(val) || val < 0) { toast({ title: "Invalid value", description: "Conversion value must be a positive number.", variant: "destructive"}); return; }

        let secondsBase;
        if (convertFromUnit === 'seconds') secondsBase = val;
        else if (convertFromUnit === 'minutes') secondsBase = val * 60;
        else if (convertFromUnit === 'hours') secondsBase = val * 3600;
        else if (convertFromUnit === 'days') secondsBase = val * 3600 * 24;

        let convertedVal;
        if (convertToUnit === 'seconds') convertedVal = secondsBase;
        else if (convertToUnit === 'minutes') convertedVal = secondsBase / 60;
        else if (convertToUnit === 'hours') convertedVal = secondsBase / 3600;
        else if (convertToUnit === 'days') convertedVal = secondsBase / (3600 * 24);
        
        setResult(`${val} ${convertFromUnit} = ${convertedVal.toFixed(4)} ${convertToUnit}`);
      }
    } catch (e) {
      toast({ title: "Calculation Error", description: "Please check your inputs.", variant: "destructive"});
    }
  };
  
  const renderInputs = () => {
    switch (operation) {
      case 'duration':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1"> <Label htmlFor="startDate">Start Date</Label> <Input id="startDate" type="date" value={startDate} onChange={e => setStartDate(e.target.value)} /> </div>
            <div className="space-y-1"> <Label htmlFor="startTime">Start Time (HH:MM:SS)</Label> <Input id="startTime" type="time" step="1" value={startTime} onChange={e => setStartTime(e.target.value)} /> </div>
            <div className="space-y-1"> <Label htmlFor="endDate">End Date</Label> <Input id="endDate" type="date" value={endDate} onChange={e => setEndDate(e.target.value)} /> </div>
            <div className="space-y-1"> <Label htmlFor="endTime">End Time (HH:MM:SS)</Label> <Input id="endTime" type="time" step="1" value={endTime} onChange={e => setEndTime(e.target.value)} /> </div>
          </div>
        );
      case 'add':
      case 'subtract':
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="space-y-1"> <Label htmlFor="initialDate">Date</Label> <Input id="initialDate" type="date" value={initialDate} onChange={e => setInitialDate(e.target.value)} /> </div>
              <div className="space-y-1"> <Label htmlFor="initialTime">Time (HH:MM:SS)</Label> <Input id="initialTime" type="time" step="1" value={initialTime} onChange={e => setInitialTime(e.target.value)} /> </div>
            </div>
            <Label>Time to {operation}:</Label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-1">
              <div className="space-y-1"> <Label htmlFor="addSubtractHours">Hours</Label> <Input id="addSubtractHours" type="number" placeholder="0" value={addSubtractHours} onChange={e => setAddSubtractHours(e.target.value)} /> </div>
              <div className="space-y-1"> <Label htmlFor="addSubtractMinutes">Minutes</Label> <Input id="addSubtractMinutes" type="number" placeholder="0" value={addSubtractMinutes} onChange={e => setAddSubtractMinutes(e.target.value)} /> </div>
              <div className="space-y-1"> <Label htmlFor="addSubtractSeconds">Seconds</Label> <Input id="addSubtractSeconds" type="number" placeholder="0" value={addSubtractSeconds} onChange={e => setAddSubtractSeconds(e.target.value)} /> </div>
            </div>
          </>
        );
      case 'convert':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div className="space-y-1 md:col-span-1">
              <Label htmlFor="convertValue">Value</Label>
              <Input id="convertValue" type="number" placeholder="e.g., 3600" value={convertValue} onChange={e => setConvertValue(e.target.value)} />
            </div>
            <div className="space-y-1 md:col-span-1">
              <Label htmlFor="convertFromUnit">From Unit</Label>
              <Select value={convertFromUnit} onValueChange={setConvertFromUnit}>
                <SelectTrigger id="convertFromUnit"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="seconds">Seconds</SelectItem> <SelectItem value="minutes">Minutes</SelectItem> <SelectItem value="hours">Hours</SelectItem> <SelectItem value="days">Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1 md:col-span-1">
              <Label htmlFor="convertToUnit">To Unit</Label>
              <Select value={convertToUnit} onValueChange={setConvertToUnit}>
                <SelectTrigger id="convertToUnit"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="seconds">Seconds</SelectItem> <SelectItem value="minutes">Minutes</SelectItem> <SelectItem value="hours">Hours</SelectItem> <SelectItem value="days">Days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="container py-8 md:py-12" id="form">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto"
      >
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-br from-primary/10 via-transparent to-transparent">
            <CardTitle className="text-3xl font-bold flex items-center"><Clock className="mr-3 h-8 w-8 text-primary" />Time Calculator</CardTitle>
            <CardDescription>Calculate durations, add/subtract time, or convert time units.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="space-y-1">
              <Label htmlFor="operation">Operation</Label>
              <Select value={operation} onValueChange={(val) => {setOperation(val); setResult(null);}}>
                <SelectTrigger id="operation"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="duration"><CalendarClock className="inline mr-2 h-4 w-4" />Duration Between Times</SelectItem>
                  <SelectItem value="add"><Plus className="inline mr-2 h-4 w-4" />Add to Time</SelectItem>
                  <SelectItem value="subtract"><Minus className="inline mr-2 h-4 w-4" />Subtract from Time</SelectItem>
                  <SelectItem value="convert"><Repeat className="inline mr-2 h-4 w-4" />Convert Time Units</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {renderInputs()}

            <div className="flex justify-center space-x-4 mb-6">
              <button
                onClick={() => setCalculationType("difference")}
                className={`px-4 py-2 rounded-md ${
                  calculationType === "difference"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Time Difference
              </button>
              <button
                onClick={() => setCalculationType("add")}
                className={`px-4 py-2 rounded-md ${
                  calculationType === "add"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Add Time
              </button>
              <button
                onClick={() => setCalculationType("subtract")}
                className={`px-4 py-2 rounded-md ${
                  calculationType === "subtract"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                Subtract Time
              </button>
            </div>

            <div className="flex justify-center space-x-4">
              {calculationType === "difference" ? (
                <button
                  onClick={calculateTimeDifference}
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  Calculate Difference
                </button>
              ) : (
                <button
                  onClick={() => calculateTimeOperation(calculationType)}
                  className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors flex items-center"
                >
                  {calculationType === "add" ? <FaPlus className="mr-2" /> : <FaMinus className="mr-2" />}
                  {calculationType === "add" ? "Add Time" : "Subtract Time"}
                </button>
              )}
              <button
                onClick={clearAll}
                className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center"
              >
                <FaTrash className="mr-2" />
                Clear
              </button>
            </div>

            {error && (
              <div className="text-red-500 text-center">{error}</div>
            )}

            {result && (
              <motion.div 
                id="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 p-6 bg-primary/5 rounded-lg border border-primary/20 text-center"
              >
                <h3 className="text-xl font-semibold mb-2 text-primary">Result:</h3>
                {calculationType === "difference" ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-lg font-medium text-gray-700">
                        {result.hours} hours, {result.minutes} minutes
                      </p>
                      <p className="text-sm text-gray-500 mt-1">Time difference</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Total Minutes:</span> {result.totalMinutes.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Total Seconds:</span> {result.totalSeconds.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p className="text-lg font-medium text-gray-700">
                      {result.startTime} {result.operation === "add" ? "+" : "-"} {result.minutes} minutes = {result.resultTime}
                    </p>
                  </div>
                )}
              </motion.div>
            )}

            {history.length > 0 && (
              <div className="mt-6">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold flex items-center">
                    <FaHistory className="mr-2" />
                    Calculation History
                  </h3>
                  <button
                    onClick={clearHistory}
                    className="text-sm text-red-500 hover:text-red-600"
                  >
                    Clear History
                  </button>
                </div>
                <div className="space-y-2">
                  {history.map((item, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600"
                    >
                      <div>{item.calculation}</div>
                      <div>Result: {item.result}</div>
                      <div className="text-xs text-gray-400">{item.timestamp}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <SeoContent title="Understanding Time Calculations">
              <p>
                The Time Calculator is a versatile tool for various time-related computations.
              </p>
              <p><strong className="text-foreground">Operations:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong className="text-foreground">Duration Between Times:</strong> Calculates the total time (days, hours, minutes, seconds) between a specified start date/time and end date/time.</li>
                <li><strong className="text-foreground">Add to Time:</strong> Adds a specified amount of hours, minutes, and/or seconds to an initial date and time.</li>
                <li><strong className="text-foreground">Subtract from Time:</strong> Subtracts a specified amount of hours, minutes, and/or seconds from an initial date and time.</li>
                <li><strong className="text-foreground">Convert Time Units:</strong> Converts a given value from one unit of time (e.g., hours) to another (e.g., seconds).</li>
              </ul>
              <p>
                Use HH:MM:SS format for time inputs (e.g., 14:30:00 for 2:30 PM). For durations, the calculator also shows the total in days if it spans multiple days. This can be helpful for project planning, event scheduling, or simply understanding time differences. For age-specific calculations, see our <a href="/age">Age Calculator</a>.
              </p>
            </SeoContent>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default TimeCalculator;
  
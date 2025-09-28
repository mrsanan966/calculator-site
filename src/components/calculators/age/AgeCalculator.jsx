import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { UserCheck, CalendarDays, Gift, Clock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import SeoContent from '@/components/calculators/SeoContent';
import { FaCalendarAlt, FaTrash, FaHistory, FaInfoCircle, FaLightbulb, FaQuestionCircle } from "react-icons/fa";

const AgeCalculator = () => {
  const { toast } = useToast();
  const today = new Date().toISOString().split('T')[0];
  const [birthDate, setBirthDate] = useState('');
  const [targetDate, setTargetDate] = useState(today);
  const [ageResult, setAgeResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  const calculateAge = () => {
    if (!birthDate) {
      toast({ title: "Missing Date", description: "Please enter a date of birth.", variant: "destructive" });
      setAgeResult(null);
      return;
    }

    const dob = new Date(birthDate);
    const tDate = new Date(targetDate);

    if (dob > tDate) {
      toast({ title: "Invalid Date Range", description: "Date of birth cannot be after the 'Age at Date'.", variant: "destructive" });
      setAgeResult(null);
      return;
    }

    let years = tDate.getFullYear() - dob.getFullYear();
    let months = tDate.getMonth() - dob.getMonth();
    let days = tDate.getDate() - dob.getDate();

    if (days < 0) {
      months--;
      const prevMonthLastDay = new Date(tDate.getFullYear(), tDate.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }

    if (months < 0) {
      years--;
      months += 12;
    }
    
    const totalDays = Math.floor((tDate - dob) / (1000 * 60 * 60 * 24));
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const totalSeconds = totalMinutes * 60;

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const birthDayOfWeek = daysOfWeek[dob.getDay()];

    let nextBirthday = new Date(tDate.getFullYear(), dob.getMonth(), dob.getDate());
    if (nextBirthday < tDate) {
      nextBirthday.setFullYear(tDate.getFullYear() + 1);
    }
    const timeToNextBirthdayMs = nextBirthday - tDate;
    const daysToNextBirthday = Math.floor(timeToNextBirthdayMs / (1000 * 60 * 60 * 24));
    const monthsToNextBirthday = Math.floor(daysToNextBirthday / 30.4375); // Average days in month
    const remainingDaysAfterMonths = daysToNextBirthday % 30.4375;

    const ageResult = {
      years,
      months,
      days,
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
      birthDayOfWeek,
      daysToNextBirthday: Math.floor(daysToNextBirthday),
      monthsToNextBirthday: Math.floor(monthsToNextBirthday),
      remainingDaysAfterMonths: Math.floor(remainingDaysAfterMonths),
      nextBirthdayDate: nextBirthday.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    };

    setAgeResult(ageResult);
    setError("");

    // Add to history
    setHistory(prev => [{
      birthDate: birthDate,
      age: `${years} years, ${months} months, ${days} days`,
      timestamp: new Date().toLocaleString()
    }, ...prev].slice(0, 5));
  };

  const clearAll = () => {
    setBirthDate("");
    setAgeResult(null);
    setError("");
  };

  const clearHistory = () => {
    setHistory([]);
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
            <CardTitle className="text-3xl font-bold flex items-center"><UserCheck className="mr-3 h-8 w-8 text-primary" />Age Calculator</CardTitle>
            <CardDescription>Calculate age from a date of birth to a target date.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="birthDate">Date of Birth</Label>
                <div className="relative">
                  <Input id="birthDate" type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} max={today} />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <FaCalendarAlt />
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <Label htmlFor="targetDate">Age at Date</Label>
                <Input id="targetDate" type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} />
              </div>
            </div>
            <div className="flex justify-center space-x-4">
              <Button onClick={calculateAge} className="w-full">
                <CalendarDays className="mr-2 h-4 w-4" /> Calculate Age
              </Button>
              <Button onClick={clearAll} className="w-full bg-red-500 text-white hover:bg-red-600">
                <FaTrash className="mr-2" />
                Clear
              </Button>
            </div>

            {error && (
              <div className="text-red-500 text-center">{error}</div>
            )}

            {ageResult && (
              <motion.div 
                id="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-6 space-y-4"
              >
                <Card className="bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-2xl text-primary">Calculated Age</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3 bg-background rounded-md shadow-sm">
                        <p className="text-3xl font-bold">{ageResult.years} <span className="text-lg font-normal text-muted-foreground">Years</span></p>
                        <p className="text-3xl font-bold">{ageResult.months} <span className="text-lg font-normal text-muted-foreground">Months</span></p>
                        <p className="text-3xl font-bold">{ageResult.days} <span className="text-lg font-normal text-muted-foreground">Days</span></p>
                    </div>
                    <div className="p-3 bg-background rounded-md shadow-sm space-y-1 text-sm">
                        <p><strong className="text-foreground">Born on:</strong> {ageResult.birthDayOfWeek}</p>
                        <p><strong className="text-foreground">Total Days:</strong> {ageResult.totalDays.toLocaleString()}</p>
                        <p><strong className="text-foreground">Total Hours:</strong> {ageResult.totalHours.toLocaleString()}</p>
                        <p><strong className="text-foreground">Total Minutes:</strong> {ageResult.totalMinutes.toLocaleString()}</p>
                        <p><strong className="text-foreground">Total Seconds:</strong> {ageResult.totalSeconds.toLocaleString()}</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-green-500/5">
                  <CardHeader>
                     <CardTitle className="text-xl text-green-700 dark:text-green-400 flex items-center"><Gift className="mr-2 h-5 w-5"/>Next Birthday</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <p className="text-lg font-medium">
                        {ageResult.monthsToNextBirthday} months and {ageResult.remainingDaysAfterMonths} days until your next birthday on {ageResult.nextBirthdayDate}.
                     </p>
                     <p className="text-sm text-muted-foreground">That's {ageResult.daysToNextBirthday} days away!</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
            <SeoContent title="More About Age Calculation">
              <p>
                The Age Calculator determines the time elapsed between two dates: a date of birth and a target date (which defaults to today). It breaks this duration down into years, months, and days.
              </p>
              <p>
                <strong className="text-foreground">How it Works:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>The calculation first determines the difference in full years.</li>
                <li>Then, it calculates the difference in full months within the remaining period.</li>
                <li>Finally, it counts the remaining days. Adjustments are made for negative day/month values by "borrowing" from the next higher unit (e.g., borrowing days from a month, or months from a year).</li>
                <li>The calculator also provides the total duration in days, hours, minutes, and seconds for a more granular view.</li>
                <li>It tells you the day of the week you were born and estimates the time until your next birthday.</li>
              </ul>
              <p>
                This tool can be useful for various purposes, from simply satisfying curiosity to calculating eligibility based on age for certain events or applications. For time-related calculations, you might also find our <a href="/time">Time Calculator</a> useful.
              </p>
            </SeoContent>

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
                      <div>Birth Date: {new Date(item.birthDate).toLocaleDateString()}</div>
                      <div>Age: {item.age}</div>
                      <div className="text-xs text-gray-400">{item.timestamp}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features Section */}
            <div className="mt-8 bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaInfoCircle className="mr-2" />
                Features
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Calculate exact age in years, months, and days</li>
                <li>Support for future date calculations</li>
                <li>Leap year handling</li>
                <li>Multiple date format support</li>
                <li>Calculation history for easy reference</li>
                <li>Mobile-friendly interface</li>
              </ul>
            </div>

            {/* Tips Section */}
            <div className="mt-8 bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaLightbulb className="mr-2" />
                Tips for Age Calculation
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Enter the exact birth date for most accurate results</li>
                <li>Use the calculator to plan for important age-related milestones</li>
                <li>Check age requirements for various activities and benefits</li>
                <li>Calculate age differences between people</li>
                <li>Use for retirement planning and age-based investments</li>
                <li>Verify eligibility for age-restricted services</li>
              </ul>
            </div>

            {/* FAQ Section */}
            <div className="mt-8 bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaQuestionCircle className="mr-2" />
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800">How is age calculated?</h4>
                  <p className="text-gray-700 mt-1">
                    Age is calculated by finding the difference between the current date and birth date, taking into account months and days for precise calculation.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Does the calculator handle leap years?</h4>
                  <p className="text-gray-700 mt-1">
                    Yes, the calculator automatically accounts for leap years in all calculations to ensure accuracy.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">Can I calculate future age?</h4>
                  <p className="text-gray-700 mt-1">
                    Yes, you can enter a future date to calculate how old someone will be on that date.
                  </p>
                </div>
              </div>
            </div>

            {/* SEO Content Section */}
            <SeoContent title="Understanding Age Calculation">
              <p>
                Age calculation is a fundamental concept used in various aspects of life, from legal requirements to personal milestones. Our age calculator provides precise calculations taking into account years, months, and days.
              </p>
              <p>
                <strong className="text-foreground">How Age Calculation Works:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Calculates the difference between two dates</li>
                <li>Accounts for varying month lengths</li>
                <li>Handles leap years automatically</li>
                <li>Provides results in multiple formats</li>
              </ul>
              <p>
                This calculator is useful for various purposes including:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Determining eligibility for age-restricted activities</li>
                <li>Planning for retirement and benefits</li>
                <li>Calculating age differences between people</li>
                <li>Tracking important age-related milestones</li>
              </ul>
              <p>
                For more time-related calculations, check out our <a href="/time">Time Calculator</a> and <a href="/date">Date Calculator</a> for additional functionality.
              </p>
            </SeoContent>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AgeCalculator;
  
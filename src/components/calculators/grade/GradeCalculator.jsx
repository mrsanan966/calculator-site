import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PlusCircle, Trash2, Target as TargetIcon, Percent, Edit3 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import SeoContent from '@/components/calculators/SeoContent';
import { FaTrash, FaHistory, FaPlus, FaMinus, FaInfoCircle, FaQuestionCircle, FaLightbulb } from "react-icons/fa";

const GradeCalculator = () => {
  const { toast } = useToast();
  const [assignments, setAssignments] = useState([{ name: '', grade: '', weight: '' }]);
  const [currentGrade, setCurrentGrade] = useState(null);
  const [targetGrade, setTargetGrade] = useState('');
  const [neededGrade, setNeededGrade] = useState(null);
  const [remainingWeight, setRemainingWeight] = useState(0);

  const handleAssignmentChange = (index, field, value) => {
    const newAssignments = [...assignments];
    newAssignments[index][field] = value;
    setAssignments(newAssignments);
    setCurrentGrade(null);
    setNeededGrade(null);
  };

  const addAssignment = () => {
    setAssignments([...assignments, { name: '', grade: '', weight: '' }]);
  };

  const removeAssignment = (index) => {
    const newAssignments = assignments.filter((_, i) => i !== index);
    setAssignments(newAssignments);
    setCurrentGrade(null);
    setNeededGrade(null);
  };

  const parseGrade = (gradeStr) => {
    if (gradeStr.includes('/')) {
      const parts = gradeStr.split('/');
      const score = parseFloat(parts[0]);
      const total = parseFloat(parts[1]);
      if (isNaN(score) || isNaN(total) || total === 0) return NaN;
      return (score / total) * 100;
    }
    const grade = parseFloat(gradeStr);
    return isNaN(grade) ? NaN : grade;
  };

  const calculateCurrentGrade = () => {
    let totalWeightedScore = 0;
    let totalWeightAchieved = 0;
    let isValid = true;

    assignments.forEach(assignment => {
      const grade = parseGrade(assignment.grade);
      const weight = parseFloat(assignment.weight);

      if (!isNaN(grade) && !isNaN(weight) && weight > 0) {
        totalWeightedScore += (grade / 100) * weight;
        totalWeightAchieved += weight;
      } else if (assignment.grade !== '' && assignment.weight !== '') {
        isValid = false; 
      }
    });
    
    if (!isValid) {
        toast({ title: "Invalid Input", description: "Please check your assignment grades and weights.", variant: "destructive" });
        setCurrentGrade(null);
        return;
    }

    if (totalWeightAchieved === 0 && assignments.some(a => a.grade || a.weight)) {
      toast({ title: "Missing Weights", description: "Please ensure weights are entered for graded assignments.", variant: "destructive" });
      setCurrentGrade(null);
      return;
    }
    
    if (totalWeightAchieved > 0) {
        setCurrentGrade(((totalWeightedScore / totalWeightAchieved) * 100).toFixed(2));
    } else {
        setCurrentGrade(null);
    }

    const currentTotalWeight = assignments.reduce((sum, assign) => sum + (parseFloat(assign.weight) || 0), 0);
    const remWeight = 100 - currentTotalWeight;
    setRemainingWeight(remWeight > 0 ? remWeight : 0);
  };

  const calculateNeededGrade = () => {
    if (currentGrade === null || !targetGrade) {
        setNeededGrade(null);
        return;
    }
    const tgtGrade = parseFloat(targetGrade);
    if (isNaN(tgtGrade) || tgtGrade < 0 || tgtGrade > 100) {
        toast({ title: "Invalid Target Grade", description: "Target grade must be between 0 and 100.", variant: "destructive" });
        setNeededGrade(null);
        return;
    }

    const currentTotalWeight = assignments.reduce((sum, assign) => sum + (parseFloat(assign.weight) || 0), 0);
    const currentWeightedScore = assignments.reduce((sum, assign) => {
        const grade = parseGrade(assign.grade);
        const weight = parseFloat(assign.weight);
        return sum + (!isNaN(grade) && !isNaN(weight) ? (grade / 100) * weight : 0);
    }, 0);

    const remWeight = 100 - currentTotalWeight;
    setRemainingWeight(remWeight);

    if (remWeight <= 0) {
      toast({ title: "No Remaining Weight", description: "All weights are accounted for. Cannot calculate needed grade for future assignments.", variant: "default" });
      setNeededGrade(null);
      return;
    }

    const neededScoreForTarget = (tgtGrade - currentWeightedScore);
    const ndGrade = (neededScoreForTarget / remWeight) * 100;
    
    setNeededGrade(ndGrade.toFixed(2));
  };
  
  useEffect(() => {
    calculateCurrentGrade();
  }, [assignments]);

  useEffect(() => {
    if (currentGrade !== null && targetGrade) {
        calculateNeededGrade();
    } else {
        setNeededGrade(null);
    }
  }, [currentGrade, targetGrade]);


  return (
    <div className="container py-8 md:py-12" id="form">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-br from-primary/10 via-transparent to-transparent">
            <CardTitle className="text-3xl font-bold flex items-center"><Edit3 className="mr-3 h-8 w-8 text-primary" />Grade Calculator</CardTitle>
            <CardDescription>Calculate your course grade or determine what you need on future assignments.</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Assignments / Categories</h3>
              {assignments.map((assignment, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-3 p-3 border rounded-lg bg-muted/30 items-end"
                >
                  <div className="md:col-span-5 space-y-1">
                    <Label htmlFor={`name-${index}`}>Assignment Name</Label>
                    <Input id={`name-${index}`} placeholder="e.g., Midterm Exam" value={assignment.name} onChange={(e) => handleAssignmentChange(index, 'name', e.target.value)} />
                  </div>
                  <div className="md:col-span-3 space-y-1">
                    <Label htmlFor={`grade-${index}`}>Grade (e.g., 85 or 85/100)</Label>
                    <Input id={`grade-${index}`} placeholder="85 or 85/100" value={assignment.grade} onChange={(e) => handleAssignmentChange(index, 'grade', e.target.value)} />
                  </div>
                  <div className="md:col-span-3 space-y-1">
                    <Label htmlFor={`weight-${index}`}>Weight (%)</Label>
                    <div className="relative">
                      <Input id={`weight-${index}`} type="number" placeholder="20" value={assignment.weight} onChange={(e) => handleAssignmentChange(index, 'weight', e.target.value)} className="pr-8"/>
                      <Percent className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="md:col-span-1">
                    <Button variant="ghost" size="icon" onClick={() => removeAssignment(index)} className="w-full text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </motion.div>
              ))}
              <Button onClick={addAssignment} variant="outline" className="mt-2">
                <PlusCircle className="mr-2 h-4 w-4" /> Add Assignment
              </Button>
            </div>

            {currentGrade !== null && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                id="results" 
                className="p-6 bg-primary/5 rounded-lg border border-primary/20"
              >
                <h3 className="text-xl font-semibold mb-2 text-primary">Your Current Grade:</h3>
                <p className="text-4xl font-bold text-primary">{currentGrade}%</p>
              </motion.div>
            )}

            <div id="target" className="pt-4 border-t">
              <h3 className="text-xl font-semibold mb-3 flex items-center"><TargetIcon className="mr-2 h-5 w-5 text-primary"/>Target Grade</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                <div className="space-y-1">
                  <Label htmlFor="targetGrade">Desired Final Grade (%)</Label>
                  <div className="relative">
                    <Input id="targetGrade" type="number" placeholder="e.g., 90" value={targetGrade} onChange={(e) => setTargetGrade(e.target.value)} className="pr-8"/>
                     <Percent className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>
              {neededGrade !== null && remainingWeight > 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 p-4 bg-green-500/10 rounded-lg border border-green-500/30"
                >
                  <p className="text-md font-medium text-green-700 dark:text-green-400">
                    To achieve a {targetGrade}%, you need an average of <strong className="text-xl">{neededGrade}%</strong> on the remaining {remainingWeight.toFixed(2)}% of your coursework.
                  </p>
                </motion.div>
              )}
              {neededGrade !== null && remainingWeight <= 0 && (
                 <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 p-4 bg-amber-500/10 rounded-lg border border-amber-500/30"
                >
                  <p className="text-md font-medium text-amber-700 dark:text-amber-400">
                    All course weight is accounted for. Your final grade with current inputs is {currentGrade}%.
                  </p>
                </motion.div>
              )}
               {neededGrade !== null && parseFloat(neededGrade) > 100 && (
                 <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 p-4 bg-red-500/10 rounded-lg border border-red-500/30"
                >
                  <p className="text-md font-medium text-red-700 dark:text-red-400">
                    Achieving a {targetGrade}% may be challenging or impossible with the remaining weight, as it requires an average of {neededGrade}%.
                  </p>
                </motion.div>
              )}
            </div>

            {/* Features Section */}
            <div className="mt-8 bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaInfoCircle className="mr-2" />
                Features
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Calculate grades for multiple assignments</li>
                <li>Support for weighted and unweighted grading</li>
                <li>Custom grade scale configuration</li>
                <li>Instant grade calculation with detailed breakdown</li>
                <li>Calculation history for easy reference</li>
                <li>Mobile-friendly interface</li>
              </ul>
            </div>

            {/* Tips Section */}
            <div className="mt-8 bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FaLightbulb className="mr-2" />
                Tips for Grade Calculation
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Keep track of all assignment weights and scores</li>
                <li>Use the calculator to plan for target grades</li>
                <li>Calculate minimum scores needed for desired grades</li>
                <li>Monitor progress throughout the semester</li>
                <li>Understand your grading scale and policies</li>
                <li>Use for both individual assignments and overall course grades</li>
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
                  <h4 className="font-medium text-gray-800">How are weighted grades calculated?</h4>
                  <p className="text-gray-700 mt-1">
                    Weighted grades are calculated by multiplying each assignment's score by its weight percentage, then summing these products and dividing by the total weight.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">What's the difference between weighted and unweighted grades?</h4>
                  <p className="text-gray-700 mt-1">
                    Weighted grades assign different importance to assignments, while unweighted grades treat all assignments equally.
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800">How can I calculate what score I need to get a certain grade?</h4>
                  <p className="text-gray-700 mt-1">
                    Enter your current grades and weights, then use the calculator to determine the minimum score needed on remaining assignments to achieve your target grade.
                  </p>
                </div>
              </div>
            </div>

            {/* SEO Content Section */}
            <SeoContent title="Understanding Grade Calculation">
              <p>
                Grade calculation is essential for students to track their academic progress and plan their studies effectively. Our grade calculator supports both weighted and unweighted grading systems.
              </p>
              <p>
                <strong className="text-foreground">How Grade Calculation Works:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Supports multiple grading scales (percentage, letter grades)</li>
                <li>Handles weighted and unweighted assignments</li>
                <li>Calculates current grade and required scores</li>
                <li>Provides detailed grade breakdowns</li>
              </ul>
              <p>
                This calculator is useful for:
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>Tracking academic progress</li>
                <li>Planning study strategies</li>
                <li>Setting grade goals</li>
                <li>Understanding grading policies</li>
              </ul>
              <p>
                For more academic tools, check out our <a href="/gpa">GPA Calculator</a> and <a href="/time">Time Calculator</a> for better study planning.
              </p>
            </SeoContent>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default GradeCalculator;
  
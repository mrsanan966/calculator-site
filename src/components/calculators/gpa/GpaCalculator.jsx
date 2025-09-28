import React, { useState } from "react";
import { FaTrash, FaHistory, FaPlus, FaMinus, FaGraduationCap, FaInfoCircle, FaQuestionCircle, FaLightbulb } from "react-icons/fa";
import SeoContent from '@/components/calculators/SeoContent';

const GpaCalculator = () => {
  const [courses, setCourses] = useState([{ grade: "", credits: "" }]);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  const gradePoints = {
    "A+": 4.0, "A": 4.0, "A-": 3.7,
    "B+": 3.3, "B": 3.0, "B-": 2.7,
    "C+": 2.3, "C": 2.0, "C-": 1.7,
    "D+": 1.3, "D": 1.0, "D-": 0.7,
    "F": 0.0
  };

  const addCourse = () => {
    setCourses([...courses, { grade: "", credits: "" }]);
  };

  const removeCourse = (index) => {
    const newCourses = courses.filter((_, i) => i !== index);
    setCourses(newCourses);
  };

  const updateCourse = (index, field, value) => {
    const newCourses = [...courses];
    newCourses[index][field] = value;
    setCourses(newCourses);
  };

  const calculateGPA = () => {
    let totalPoints = 0;
    let totalCredits = 0;
    let validCourses = true;

    courses.forEach(course => {
      if (!course.grade || !course.credits) {
        validCourses = false;
        return;
      }

      const credits = parseFloat(course.credits);
      if (isNaN(credits) || credits <= 0) {
        validCourses = false;
        return;
      }

      const points = gradePoints[course.grade];
      if (points === undefined) {
        validCourses = false;
        return;
      }

      totalPoints += points * credits;
      totalCredits += credits;
    });

    if (!validCourses) {
      setError("Please fill in all courses with valid grades and credits");
      return;
    }

    const gpa = totalPoints / totalCredits;
    const result = {
      gpa: gpa.toFixed(2),
      totalCredits,
      totalPoints: totalPoints.toFixed(2)
    };

    setResult(result);
    setError("");

    // Add to history
    setHistory(prev => [{
      calculation: `${courses.length} courses, ${totalCredits} credits`,
      result: `GPA: ${gpa.toFixed(2)}`,
      timestamp: new Date().toLocaleString()
    }, ...prev].slice(0, 5));
  };

  const clearAll = () => {
    setCourses([{ grade: "", credits: "" }]);
    setResult(null);
    setError("");
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {courses.map((course, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Course {index + 1} Grade
              </label>
              <select
                value={course.grade}
                onChange={(e) => updateCourse(index, "grade", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Grade</option>
                {Object.keys(gradePoints).map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Credits
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                value={course.credits}
                onChange={(e) => updateCourse(index, "credits", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter credits"
              />
            </div>
            <div>
              <button
                onClick={() => removeCourse(index)}
                className="w-full px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center justify-center"
                disabled={courses.length === 1}
              >
                <FaMinus className="mr-2" />
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={addCourse}
          className="px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors flex items-center"
        >
          <FaPlus className="mr-2" />
          Add Course
        </button>
        <button
          onClick={calculateGPA}
          className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Calculate GPA
        </button>
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
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">GPA Result</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {result.gpa}
              </p>
              <p className="text-lg font-medium text-gray-700">
                GPA
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Total Credits:</span> {result.totalCredits}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Total Grade Points:</span> {result.totalPoints}
              </p>
            </div>
          </div>
        </div>
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

      {/* Features Section */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <FaInfoCircle className="mr-2" />
          Features
        </h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Calculate GPA for multiple courses simultaneously</li>
          <li>Support for all standard letter grades (A+ to F)</li>
          <li>Flexible credit hours (including half credits)</li>
          <li>Instant GPA calculation with detailed breakdown</li>
          <li>Calculation history for easy reference</li>
          <li>Mobile-friendly interface</li>
        </ul>
      </div>

      {/* Tips Section */}
      <div className="mt-8 bg-green-50 p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <FaLightbulb className="mr-2" />
          Tips for Maintaining a Good GPA
        </h3>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Stay organized and keep track of all assignments and deadlines</li>
          <li>Attend all classes and participate actively</li>
          <li>Form study groups for difficult subjects</li>
          <li>Seek help from professors or tutors when needed</li>
          <li>Balance your course load between challenging and easier courses</li>
          <li>Use this calculator to plan your semester and set GPA goals</li>
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
            <h4 className="font-medium text-gray-800">How is GPA calculated?</h4>
            <p className="text-gray-700 mt-1">
              GPA is calculated by multiplying each course's grade points by its credit hours, summing these products, and dividing by the total credit hours.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-800">What is a good GPA?</h4>
            <p className="text-gray-700 mt-1">
              A good GPA typically ranges from 3.0 to 4.0. However, what's considered "good" can vary by institution and program.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-800">How do I improve my GPA?</h4>
            <p className="text-gray-700 mt-1">
              Focus on time management, seek help when needed, and maintain consistent study habits. Consider retaking courses if allowed by your institution.
            </p>
          </div>
        </div>
      </div>

      {/* SEO Content Section */}
      <SeoContent title="Understanding GPA Calculation">
        <p>
          The Grade Point Average (GPA) is a standardized way of measuring academic achievement in the United States. It's calculated on a scale of 0.0 to 4.0, with 4.0 being the highest possible grade.
        </p>
        <p>
          <strong className="text-foreground">How GPA Works:</strong>
        </p>
        <ul className="list-disc list-inside space-y-1 ml-4">
          <li>Each letter grade corresponds to a specific number of grade points</li>
          <li>Courses are weighted by their credit hours</li>
          <li>The final GPA is the weighted average of all courses</li>
          <li>Some institutions use different scales (e.g., 5.0 for honors courses)</li>
        </ul>
        <p>
          This calculator helps students track their academic progress and plan their course load. For more academic tools, check out our <a href="/grade">Grade Calculator</a> and <a href="/time">Time Calculator</a> for better study planning.
        </p>
      </SeoContent>
    </div>
  );
};

export default GpaCalculator;
  
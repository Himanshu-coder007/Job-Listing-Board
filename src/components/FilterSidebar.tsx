import { useState } from "react";

interface FilterSidebarProps {
  onExperienceChange: (experience: number[]) => void;
  onJobTypeChange: (types: string[]) => void;
}

const FilterSidebar = ({ onExperienceChange, onJobTypeChange }: FilterSidebarProps) => {
  const [selectedExperiences, setSelectedExperiences] = useState<number[]>([]);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);

  const experienceRanges = [
    { label: "0 years", value: 0 },
    { label: "1 year", value: 1 },
    { label: "2 years", value: 2 },
    { label: "3 years", value: 3 },
    { label: "4 years", value: 4 },
    { label: "5+ years", value: 5 }
  ];

  const jobTypes = ["Full-time", "Part-time", "Contract", "Internship", "Remote"];

  const handleJobTypeChange = (type: string) => {
    let newSelectedTypes;
    if (selectedJobTypes.includes(type)) {
      newSelectedTypes = selectedJobTypes.filter(t => t !== type);
    } else {
      newSelectedTypes = [...selectedJobTypes, type];
    }
    setSelectedJobTypes(newSelectedTypes);
    onJobTypeChange(newSelectedTypes);
  };

  const handleExperienceChange = (value: number) => {
    let newSelectedExperiences;
    if (selectedExperiences.includes(value)) {
      newSelectedExperiences = selectedExperiences.filter(v => v !== value);
    } else {
      newSelectedExperiences = [...selectedExperiences, value];
    }
    setSelectedExperiences(newSelectedExperiences);
    onExperienceChange(newSelectedExperiences);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-[calc(100vh-5rem)] overflow-y-auto top-10">
      <h3 className="text-lg font-bold mb-4 text-gray-800">Filters</h3>

      <div className="mb-6">
        <h4 className="font-medium mb-2 text-gray-700">Experience</h4>
        <div className="space-y-2">
          {experienceRanges.map((range) => (
            <label key={range.value} className="flex items-center">
              <input
                type="checkbox"
                className="rounded text-blue-600 mr-2"
                checked={selectedExperiences.includes(range.value)}
                onChange={() => handleExperienceChange(range.value)}
              />
              <span className="text-gray-700">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-medium mb-2 text-gray-700">Job Type</h4>
        <div className="space-y-2">
          {jobTypes.map((type) => (
            <label key={type} className="flex items-center">
              <input
                type="checkbox"
                className="rounded text-blue-600 mr-2"
                checked={selectedJobTypes.includes(type)}
                onChange={() => handleJobTypeChange(type)}
              />
              <span className="text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;
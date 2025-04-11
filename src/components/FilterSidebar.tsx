// components/FilterSidebar.tsx
import { useState } from "react";

interface FilterSidebarProps {
  onExperienceChange: (experience: number) => void;
  onJobTypeChange: (types: string[]) => void;
}

const FilterSidebar = ({ onExperienceChange, onJobTypeChange }: FilterSidebarProps) => {
  const [experience, setExperience] = useState<number>(0);
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);

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

  const handleExperienceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newExperience = parseInt(e.target.value);
    setExperience(newExperience);
    onExperienceChange(newExperience);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-[calc(100vh-5rem)] overflow-y-auto sticky top-20">
      <h3 className="text-lg font-bold mb-4 text-gray-800">Filters</h3>

      <div className="mb-6">
        <h4 className="font-medium mb-2 text-gray-700">Minimum Experience (Years)</h4>
        <input
          type="range"
          min="0"
          max="20"
          value={experience}
          onChange={handleExperienceChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between mt-1">
          <span className="text-sm text-gray-500">0</span>
          <span className="text-sm text-gray-500">{experience}</span>
          <span className="text-sm text-gray-500">20+</span>
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
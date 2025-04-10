import { useState } from 'react';

const FilterSidebar = () => {
  const [experience, setExperience] = useState<number>(0);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const skills = [
    'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python',
    'Java', 'SQL', 'AWS', 'Docker', 'Kubernetes'
  ];

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md h-[calc(100vh)] overflow-y-auto sticky top-20">
      <h3 className="text-lg font-bold mb-4 text-gray-800">Filters</h3>

      <div className="mb-6">
        <h4 className="font-medium mb-2 text-gray-700">Experience (Years)</h4>
        <input
          type="range"
          min="0"
          max="20"
          value={experience}
          onChange={(e) => setExperience(parseInt(e.target.value))}
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
          {['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'].map((type) => (
            <label key={type} className="flex items-center">
              <input type="checkbox" className="rounded text-blue-600 mr-2" />
              <span className="text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-medium mb-2 text-gray-700">Skills</h4>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <button
              key={skill}
              onClick={() => toggleSkill(skill)}
              className={`px-3 py-1 rounded-full text-xs ${selectedSkills.includes(skill) ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'}`}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h4 className="font-medium mb-2 text-gray-700">Education</h4>
        <div className="space-y-2">
          {['Any Graduate', 'B.Tech', 'B.E', 'M.Tech', 'MBA', 'B.Sc', 'M.Sc'].map((edu) => (
            <label key={edu} className="flex items-center">
              <input type="checkbox" className="rounded text-blue-600 mr-2" />
              <span className="text-gray-700">{edu}</span>
            </label>
          ))}
        </div>
      </div>

      <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSidebar;
// components/Navbar.tsx
import { FaSearch, FaMapMarkerAlt, FaRupeeSign } from 'react-icons/fa';
import { useState, ChangeEvent } from 'react';

interface NavbarProps {
  onSearch: (query: string) => void;
  onLocationChange: (location: string) => void;
  onSalaryChange: (salary: number, frequency: string) => void;
}

const Navbar = ({ onSearch, onLocationChange, onSalaryChange }: NavbarProps) => {
  const [salary, setSalary] = useState<number>(0);
  const [salaryFrequency, setSalaryFrequency] = useState<string>('per month');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [locationQuery, setLocationQuery] = useState<string>('');

  const handleSalaryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSalary = parseInt(e.target.value);
    setSalary(newSalary);
    onSalaryChange(newSalary, salaryFrequency);
  };

  const handleFrequencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newFrequency = e.target.value;
    setSalaryFrequency(newFrequency);
    onSalaryChange(salary, newFrequency);
  };

  const formatIndianCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-IN').format(amount);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const location = e.target.value;
    setLocationQuery(location);
    onLocationChange(location);
  };

  return (
    <nav className="bg-gray-800 text-white p-4 fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-4">
        {/* Logo or Brand Name */}
        <div className="text-xl font-bold mr-4">JobPortal</div>

        {/* Search Bar */}
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search job title"
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>

        {/* Work Location */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaMapMarkerAlt className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Work Location"
            className="pl-10 pr-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={locationQuery}
            onChange={handleLocationChange}
          />
        </div>

        {/* Salary Range - Single Slider */}
        <div className="relative min-w-[200px]">
          <div className="flex items-center mb-1">
            <FaRupeeSign className="text-gray-400 mr-2" />
            <span className="text-sm">
              Up to {formatIndianCurrency(salary)}
            </span>
          </div>
          <div className="flex flex-col">
            <input
              type="range"
              min="0"
              max="2000000"
              step="10000"
              value={salary}
              onChange={handleSalaryChange}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0</span>
              <span>20 Lakhs</span>
            </div>
          </div>
        </div>

        {/* Salary Frequency Dropdown */}
        <div className="relative">
          <select
            value={salaryFrequency}
            onChange={handleFrequencyChange}
            className="pl-3 pr-8 py-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
          >
            <option value="per month">Per Month</option>
            <option value="per year">Annual</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
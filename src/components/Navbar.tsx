// components/Navbar.tsx
import { FaSearch, FaMapMarkerAlt, FaRupeeSign } from 'react-icons/fa';
import { useState, ChangeEvent } from 'react';

interface NavbarProps {
  onSearch: (query: string) => void;
  onLocationChange: (location: string) => void;
  onSalaryChange: (salary: number) => void;
}

const Navbar = ({ onSearch, onLocationChange, onSalaryChange }: NavbarProps) => {
  const [salary, setSalary] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [locationQuery, setLocationQuery] = useState<string>('');

  const handleSalaryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newSalary = parseInt(e.target.value);
    setSalary(newSalary);
    onSalaryChange(newSalary);
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

  const formatSalary = (amount: number) => {
    if (amount >= 100000) {
      return `₹${amount / 100000}L`;
    }
    return `₹${amount}`;
  };

  return (
    <nav className="bg-gray-800 text-white p-4 fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto flex flex-col md:flex-row items-center gap-4">
        <div className="text-xl font-bold mr-40">JobPortal</div>

        <div className="relative w-64"> {/* Reduced width from flex-grow to w-64 */}
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

        <div className="relative flex items-center gap-2 w-48">
          <FaRupeeSign className="text-gray-400" />
          <input
            type="range"
            min="0"
            max="5000000"
            step="100000"
            value={salary}
            onChange={handleSalaryChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm whitespace-nowrap">
            {salary === 0 ? 'Any salary' : `Min: ${formatSalary(salary)}`}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
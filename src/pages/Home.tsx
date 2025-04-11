// pages/Home.tsx
import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FilterSidebar from '../components/FilterSidebar';
import JobCard from '../components/JobCard';
import jobData from '../data/jobData.json';

interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  experience: string;
  type: string;
  posted: string;
  skills: string[];
  duration: string;
}

const Home = () => {
  const [filteredJobs, setFilteredJobs] = useState<Job[]>(jobData);
  const [filters, setFilters] = useState({
    searchQuery: '',
    locationQuery: '',
    minExperience: 0,
    salary: 0,
    salaryFrequency: 'per month',
    jobTypes: [] as string[],
  });

  useEffect(() => {
    filterJobs();
  }, [filters]);

  const filterJobs = () => {
    let results = [...jobData];

    // Filter by search query (title)
    if (filters.searchQuery) {
      results = results.filter(job =>
        job.title.toLowerCase().includes(filters.searchQuery.toLowerCase())
      );
    }

    // Filter by location
    if (filters.locationQuery) {
      results = results.filter(job =>
        job.location.toLowerCase().includes(filters.locationQuery.toLowerCase())
      );
    }

    // Filter by experience
    results = results.filter(job => {
      const [minExp, maxExp] = job.experience.split('-').map(exp => {
        const num = parseInt(exp.replace('+', '').replace(' years', '').trim());
        return isNaN(num) ? 0 : num;
      });
      return maxExp ? filters.minExperience <= maxExp : filters.minExperience <= minExp;
    });

    // Filter by salary
    if (filters.salary > 0) {
      results = results.filter(job => {
        const salaryParts = job.salary
          .replace('₹', '')
          .replace(/,/g, '')
          .split('-')
          .map(s => parseInt(s.trim()));
        
        const minSalary = salaryParts[0];
        const maxSalary = salaryParts.length > 1 ? salaryParts[1] : minSalary;

        // Convert to monthly if needed for comparison
        let jobSalary;
        if (job.duration.includes('Year') || job.duration.includes('Annual')) {
          jobSalary = filters.salaryFrequency === 'per month' 
            ? Math.floor((minSalary + maxSalary) / 2 / 12)
            : (minSalary + maxSalary) / 2;
        } else {
          jobSalary = filters.salaryFrequency === 'per month'
            ? (minSalary + maxSalary) / 2
            : ((minSalary + maxSalary) / 2) * 12;
        }

        return jobSalary <= filters.salary;
      });
    }

    // Filter by job type
    if (filters.jobTypes.length > 0) {
      results = results.filter(job => filters.jobTypes.includes(job.type));
    }

    setFilteredJobs(results);
  };

  const handleSearch = (query: string) => {
    setFilters(prev => ({ ...prev, searchQuery: query }));
  };

  const handleLocationChange = (location: string) => {
    setFilters(prev => ({ ...prev, locationQuery: location }));
  };

  const handleSalaryChange = (salary: number, frequency: string) => {
    setFilters(prev => ({ ...prev, salary, salaryFrequency: frequency }));
  };

  const handleExperienceChange = (experience: number) => {
    setFilters(prev => ({ ...prev, minExperience: experience }));
  };

  const handleJobTypeChange = (types: string[]) => {
    setFilters(prev => ({ ...prev, jobTypes: types }));
  };

  return (
    <div className="pt-20">
      <Navbar
        onSearch={handleSearch}
        onLocationChange={handleLocationChange}
        onSalaryChange={handleSalaryChange}
      />
      <div className="container mx-auto px-4 flex">
        {/* Sidebar - 15% width */}
        <div className="w-1/5 pr-4 sticky top-20 h-screen overflow-y-auto">
          <FilterSidebar
            onExperienceChange={handleExperienceChange}
            onJobTypeChange={handleJobTypeChange}
          />
        </div>

        {/* Main Content - 85% width */}
        <div className="w-4/5 pl-4 py-5">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Recommended Jobs</h1>
            <p className="text-gray-600">
              Showing {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'}
            </p>
          </div>

          {filteredJobs.length === 0 ? (
            <div className="text-center py-10">
              <h3 className="text-xl font-medium text-gray-700">No jobs found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
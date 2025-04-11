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
    experiences: [] as number[],
    salary: 0,
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
    if (filters.experiences.length > 0) {
      results = results.filter(job => {
        const [minExpStr, maxExpStr] = job.experience.split('-').map(exp => 
          exp.replace('+', '').replace(' years', '').replace(' year', '').trim()
        );
        
        const minExp = minExpStr ? parseInt(minExpStr) : 0;
        const maxExp = maxExpStr ? parseInt(maxExpStr) : minExp;
        
        return filters.experiences.some(exp => {
          if (exp === 5) {
            return minExp >= 5;
          }
          return exp >= minExp && exp <= (maxExp || minExp);
        });
      });
    }

    // Filter by salary (using slider value)
    if (filters.salary > 0) {
      results = results.filter(job => {
        const salaryParts = job.salary
          .replace('₹', '')
          .replace(/,/g, '')
          .split('-')
          .map(s => parseInt(s.trim()));
        
        const minSalary = salaryParts[0];
        
        
        // Compare with the minimum salary threshold from slider
        return minSalary >= filters.salary;
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

  const handleSalaryChange = (salary: number) => {
    setFilters(prev => ({ ...prev, salary }));
  };

  const handleExperienceChange = (experiences: number[]) => {
    setFilters(prev => ({ ...prev, experiences }));
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
        <div className="w-64 pr-4 fixed top-20 h-[calc(100vh-5rem)] overflow-y-auto">
          <FilterSidebar
            onExperienceChange={handleExperienceChange}
            onJobTypeChange={handleJobTypeChange}
          />
        </div>

        <div className="ml-64 w-[calc(100%-16rem)] pl-4 py-5">
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
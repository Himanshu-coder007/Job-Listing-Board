// pages/Home.tsx
import Navbar from '../components/Navbar';
import FilterSidebar from '../components/FilterSidebar';
import JobCard from '../components/JobCard';
import jobData from '../data/jobData.json';

const Home = () => {
  return (
    <div className="pt-20">
      <Navbar />
      <div className="container mx-auto px-4 flex">
        {/* Sidebar - 15% width */}
        <div className="w-1/5 pr-4 sticky top-20 h-screen overflow-y-auto">
          <FilterSidebar />
        </div>

        {/* Main Content - 85% width */}
        <div className="w-4/5 pl-4 py-5">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800">Recommended Jobs</h1>
            <p className="text-gray-600">Based on your profile and preferences</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobData.map((job) => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
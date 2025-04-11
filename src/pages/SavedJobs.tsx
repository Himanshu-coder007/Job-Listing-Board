// src/pages/SavedJobs.tsx
import { FaMapMarkerAlt, FaRupeeSign, FaBriefcase, FaBuilding } from 'react-icons/fa';
import jobData from '../data/jobData.json';
import { Link } from 'react-router-dom';

const SavedJobs = () => {
  const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
  const savedJobsData = jobData.filter(job => savedJobs.includes(job.id));

  return (
    <div className="pt-20 bg-blue-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Saved Jobs</h1>
        
        {savedJobsData.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-gray-700 text-lg">You haven't saved any jobs yet.</p>
            <Link 
              to="/" 
              className="mt-4 inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedJobsData.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">{job.title}</h2>
                      <div className="flex items-center mt-2 text-gray-700">
                        <FaBuilding className="mr-2" />
                        <span>{job.company}</span>
                      </div>
                      <div className="flex items-center mt-2 text-gray-700">
                        <FaMapMarkerAlt className="mr-2" />
                        <span>{job.location}</span>
                      </div>
                    </div>
                    <div className="bg-blue-200 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {job.type}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center">
                    <FaRupeeSign className="mr-2 text-gray-600" />
                    <span className="text-gray-700">{job.salary}</span>
                  </div>

                  <div className="mt-2 flex items-center">
                    <FaBriefcase className="mr-2 text-gray-600" />
                    <span className="text-gray-700">{job.experience}</span>
                  </div>

                  <div className="mt-4">
                    <ul className="flex flex-wrap gap-2">
                      {job.skills.slice(0, 3).map((skill, index) => (
                        <li key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700">
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 flex justify-between">
                    <span className="text-sm text-gray-500">{job.posted}</span>
                    <Link
                      to={`/job-details/${job.id}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;
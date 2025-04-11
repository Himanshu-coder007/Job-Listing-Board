// src/pages/SavedJobs.tsx
import { FaMapMarkerAlt, FaRupeeSign, FaBriefcase, FaBuilding, FaBookmark } from 'react-icons/fa';
import jobData from '../data/jobData.json';
import { Link } from 'react-router-dom';

const SavedJobs = () => {
  const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]');
  const savedJobsData = jobData.filter(job => savedJobs.includes(job.id));

  return (
    <div className="pt-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Saved Jobs</h1>
          <p className="text-gray-600 mt-2">Your bookmarked job opportunities</p>
        </div>
        
        {savedJobsData.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center max-w-2xl mx-auto">
            <div className="flex justify-center text-gray-400 mb-4">
              <FaBookmark className="text-4xl" />
            </div>
            <p className="text-gray-600 text-lg mb-6">You haven't saved any jobs yet.</p>
            <Link 
              to="/" 
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors inline-block"
            >
              Browse Available Jobs
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedJobsData.map((job) => (
              <div 
                key={job.id} 
                className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center mr-4">
                        <FaBuilding className="text-blue-500 text-xl" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold text-gray-800">{job.title}</h2>
                        <p className="text-gray-600 text-sm">{job.company}</p>
                      </div>
                    </div>
                    <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium">
                      {job.type}
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-gray-700">
                      <FaMapMarkerAlt className="mr-3 text-gray-400" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <FaRupeeSign className="mr-3 text-gray-400" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <FaBriefcase className="mr-3 text-gray-400" />
                      <span>{job.experience}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <ul className="flex flex-wrap gap-2">
                      {job.skills.slice(0, 3).map((skill, index) => (
                        <li 
                          key={index} 
                          className="bg-gray-50 px-3 py-1 rounded-full text-sm text-gray-600"
                        >
                          {skill}
                        </li>
                      ))}
                      {job.skills.length > 3 && (
                        <li className="bg-gray-50 px-3 py-1 rounded-full text-sm text-gray-400">
                          +{job.skills.length - 3}
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="text-sm text-gray-500">{job.posted}</span>
                    <Link
                      to={`/job-details/${job.id}`}
                      className="text-blue-500 hover:text-blue-700 font-medium text-sm"
                    >
                      View Details →
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
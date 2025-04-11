// src/pages/Applications.tsx
import { useState } from 'react';
import { FaBuilding, FaFileAlt, FaUser, FaPhone, FaEnvelope, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';
import jobData from '../data/jobData.json';

interface Application {
  jobId: number;
  name: string;
  email: string;
  phone: string;
  resume: File | null;
  coverLetter: string;
  appliedDate: string;
}

const Applications = () => {
  const applications: Application[] = JSON.parse(localStorage.getItem('applications') || '[]');
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  const getJobDetails = (jobId: number) => {
    return jobData.find(job => job.id === jobId);
  };

  const getRandomStatus = () => {
    const statuses = ['Under Review', 'Shortlisted', 'Interview', 'Rejected'];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  const getRandomApplicants = () => {
    return Math.floor(Math.random() * 50) + 1;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="pt-16 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">My Applications</h1>
        </div>
        
        {applications.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center max-w-2xl mx-auto">
            <p className="text-gray-600 text-lg">You haven't applied to any jobs yet.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Company
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Applied On
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Applicants
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map((app, index) => {
                    const job = getJobDetails(app.jobId);
                    if (!job) return null;
                    
                    return (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-blue-50 rounded-full flex items-center justify-center">
                              <FaBuilding className="text-blue-500" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{job.company}</div>
                              <div className="text-sm text-gray-500">{job.location}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{job.title}</div>
                          <div className="text-sm text-gray-500">{job.type}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(app.appliedDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {getRandomApplicants()} applicants
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            getRandomStatus() === 'Rejected' ? 'bg-red-50 text-red-700' :
                            getRandomStatus() === 'Shortlisted' ? 'bg-green-50 text-green-700' :
                            getRandomStatus() === 'Interview' ? 'bg-purple-50 text-purple-700' :
                            'bg-yellow-50 text-yellow-700'
                          }`}>
                            {getRandomStatus()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => setSelectedApplication(app)}
                            className="text-blue-500 hover:text-blue-700 font-medium"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Application Review Modal */}
      {selectedApplication && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-sm max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Application Details</h2>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                    <FaUser className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium text-gray-800">{selectedApplication.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                    <FaEnvelope className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium text-gray-800">{selectedApplication.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                    <FaPhone className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium text-gray-800">{selectedApplication.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center bg-gray-50 p-3 rounded-lg">
                    <FaCalendarAlt className="text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Applied Date</p>
                      <p className="font-medium text-gray-800">{formatDate(selectedApplication.appliedDate)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Job Information</h3>
                {selectedApplication.jobId && getJobDetails(selectedApplication.jobId) && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-bold text-gray-800 text-lg">{getJobDetails(selectedApplication.jobId)?.title}</p>
                        <p className="text-gray-600">{getJobDetails(selectedApplication.jobId)?.company}</p>
                      </div>
                      <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {getJobDetails(selectedApplication.jobId)?.type}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center text-gray-600">
                      <FaMapMarkerAlt className="mr-2" />
                      <span>{getJobDetails(selectedApplication.jobId)?.location}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-800 mb-3">Cover Letter</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="whitespace-pre-line text-gray-700">{selectedApplication.coverLetter}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-3">Resume</h3>
                <div className="flex items-center bg-gray-50 p-4 rounded-lg">
                  <FaFileAlt className="text-gray-400 mr-3 text-xl" />
                  <span className="font-medium text-gray-800">
                    {selectedApplication.resume ? selectedApplication.resume.name : 'Resume.pdf'}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Applications;
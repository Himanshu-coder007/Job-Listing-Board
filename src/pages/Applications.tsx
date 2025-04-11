// src/pages/Applications.tsx
import { useState } from 'react';
import { FaBuilding, FaFileAlt, FaUser, FaPhone, FaEnvelope, FaCalendarAlt,FaMapMarkerAlt } from 'react-icons/fa';
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
    <div className="pt-20 bg-blue-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">My Applications</h1>
        
        {applications.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-gray-700 text-lg">You haven't applied to any jobs yet.</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applied On
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applicants
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map((app, index) => {
                    const job = getJobDetails(app.jobId);
                    if (!job) return null;
                    
                    return (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <FaBuilding className="text-blue-600" />
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
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            getRandomStatus() === 'Rejected' ? 'bg-red-100 text-red-800' :
                            getRandomStatus() === 'Shortlisted' ? 'bg-green-100 text-green-800' :
                            getRandomStatus() === 'Interview' ? 'bg-purple-100 text-purple-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {getRandomStatus()}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => setSelectedApplication(app)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Review Application
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
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Application Details</h2>
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Personal Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <FaUser className="text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium">{selectedApplication.name}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaEnvelope className="text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{selectedApplication.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">{selectedApplication.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-gray-500 mr-3" />
                    <div>
                      <p className="text-sm text-gray-500">Applied Date</p>
                      <p className="font-medium">{formatDate(selectedApplication.appliedDate)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Job Information</h3>
                {selectedApplication.jobId && getJobDetails(selectedApplication.jobId) && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <p className="font-bold text-lg">{getJobDetails(selectedApplication.jobId)?.title}</p>
                        <p className="text-gray-600">{getJobDetails(selectedApplication.jobId)?.company}</p>
                      </div>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
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
                <h3 className="text-lg font-medium text-gray-900 mb-2">Cover Letter</h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="whitespace-pre-line">{selectedApplication.coverLetter}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Resume</h3>
                <div className="flex items-center bg-gray-50 p-4 rounded-lg">
                  <FaFileAlt className="text-gray-500 mr-3 text-xl" />
                  <span className="font-medium">
                    {selectedApplication.resume ? selectedApplication.resume.name : 'Resume.pdf'}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setSelectedApplication(null)}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
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
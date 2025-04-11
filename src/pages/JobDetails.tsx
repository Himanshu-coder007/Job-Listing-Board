import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaRupeeSign, FaBriefcase, FaBuilding, FaClock, FaGraduationCap } from 'react-icons/fa';
import jobData from '../data/jobData.json';
import { useState } from 'react';
import ApplicationForm from '../components/ApplicationForm';

interface Application {
  jobId: number;
  name: string;
  email: string;
  phone: string;
  resume: File | null;
  coverLetter: string;
  appliedDate: string;
}

const JobDetails = () => {
  const { id } = useParams<{ id: string }>();
  const job = jobData[Number(id)];
  const [showForm, setShowForm] = useState(false);

  // Check if already applied
  const applications = JSON.parse(localStorage.getItem('applications') || '[]');
  const hasApplied = applications.some((app: Application) => app.jobId === Number(id));

  if (!job) {
    return <div className="pt-20 text-center">Job not found</div>;
  }

  const handleApplyClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (formData: {
    name: string;
    email: string;
    phone: string;
    resume: File | null;
    coverLetter: string;
  }) => {
    const newApplication: Application = {
      jobId: Number(id),
      ...formData,
      appliedDate: new Date().toISOString()
    };
    
    const updatedApplications = [...applications, newApplication];
    localStorage.setItem('applications', JSON.stringify(updatedApplications));
    
    setShowForm(false);
    alert('Application submitted successfully!');
    window.location.reload(); // Refresh to update button state
  };

  return (
    <div className="pt-20 bg-blue-50 min-h-screen">
      {showForm && (
        <ApplicationForm 
          onClose={() => setShowForm(false)}
          onSubmit={handleFormSubmit}
          jobTitle={job.title}
          company={job.company}
        />
      )}
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
              <div className="flex items-center mt-2 text-gray-700">
                <FaBuilding className="mr-2" />
                <span className="text-lg">{job.company}</span>
              </div>
              <div className="flex items-center mt-2 text-gray-700">
                <FaMapMarkerAlt className="mr-2" />
                <span>{job.location}</span>
              </div>
            </div>
            <div className="bg-blue-200 text-blue-800 px-4 py-1 rounded-full text-sm font-medium">
              {job.type}
            </div>
          </div>

          <div className="border-t border-b border-gray-200 py-6 my-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center">
                <FaRupeeSign className="mr-3 text-gray-600 text-xl" />
                <div>
                  <p className="text-gray-500 text-sm">Salary</p>
                  <p className="font-medium">{job.salary}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaBriefcase className="mr-3 text-gray-600 text-xl" />
                <div>
                  <p className="text-gray-500 text-sm">Experience</p>
                  <p className="font-medium">{job.experience}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaClock className="mr-3 text-gray-600 text-xl" />
                <div>
                  <p className="text-gray-500 text-sm">Posted</p>
                  <p className="font-medium">{job.posted}</p>
                </div>
              </div>
              <div className="flex items-center">
                <FaGraduationCap className="mr-3 text-gray-600 text-xl" />
                <div>
                  <p className="text-gray-500 text-sm">Education</p>
                  <p className="font-medium">Any Graduate</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Job Description</h2>
            <p className="text-gray-700 mb-4">
              We are looking for a skilled {job.title} to join our team. The ideal candidate will have experience in the following technologies:
            </p>
            <ul className="list-disc pl-5 text-gray-700 mb-4">
              {job.skills.map((skill, index) => (
                <li key={index} className="mb-1">{skill}</li>
              ))}
            </ul>
            <p className="text-gray-700">
              This is a great opportunity to work with a talented team on exciting projects. If you meet the requirements, we encourage you to apply.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Requirements</h2>
            <ul className="list-disc pl-5 text-gray-700">
              <li className="mb-1">{job.experience} of relevant experience</li>
              <li className="mb-1">Proficiency in {job.skills.slice(0, 3).join(', ')}</li>
              <li className="mb-1">Strong problem-solving skills</li>
              <li className="mb-1">Excellent communication skills</li>
              <li>Ability to work in a team environment</li>
            </ul>
          </div>

          <div className="flex justify-end space-x-4">
            <button className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
              Save Job
            </button>
            {hasApplied ? (
              <button 
                className="px-6 py-3 bg-gray-400 text-white rounded-lg cursor-not-allowed"
                disabled
              >
                Already Applied
              </button>
            ) : (
              <button 
                onClick={handleApplyClick}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Apply Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
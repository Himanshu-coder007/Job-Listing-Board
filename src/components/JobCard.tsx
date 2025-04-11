import { FaMapMarkerAlt, FaRupeeSign, FaBriefcase, FaBuilding, FaClock, FaGraduationCap } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import ApplicationForm from './ApplicationForm';

interface JobCardProps {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  experience: string;
  type: string;
  posted: string;
  skills: string[];
}

interface Application {
  jobId: number;
  name: string;
  email: string;
  phone: string;
  resume: File | null;
  coverLetter: string;
  appliedDate: string;
}

const JobCard = ({ id, title, company, location, salary, experience, type, posted, skills }: JobCardProps) => {
  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false);
  
  // Check if already applied
  const applications = JSON.parse(localStorage.getItem('applications') || '[]');
  const hasApplied = applications.some((app: Application) => app.jobId === id);

  const handleViewDetails = () => {
    navigate(`/job-details/${id}`);
  };

  const handleApplyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
      jobId: id,
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
    <div 
      className="bg-blue-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow h-full flex flex-col border border-blue-300 border-opacity-20"
    >
      {showForm && (
        <ApplicationForm 
          onClose={() => setShowForm(false)}
          onSubmit={handleFormSubmit}
          jobTitle={title}
          company={company}
        />
      )}
      
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            <div className="flex items-center mt-1 text-gray-700">
              <FaBuilding className="mr-2" />
              <span>{company}</span>
            </div>
            <div className="flex items-center mt-1 text-gray-700">
              <FaMapMarkerAlt className="mr-2" />
              <span>{location}</span>
            </div>
          </div>
          <div className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {type}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span 
              key={index} 
              className="bg-white bg-opacity-80 text-gray-800 px-3 py-1 rounded-full text-xs shadow-sm"
            >
              {skill}
            </span>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center">
            <FaRupeeSign className="mr-2 text-gray-600" />
            <span className="font-medium">{salary}</span>
          </div>
          <div className="flex items-center">
            <FaBriefcase className="mr-2 text-gray-600" />
            <span>{experience}</span>
          </div>
          <div className="flex items-center">
            <FaClock className="mr-2 text-gray-600" />
            <span>Posted {posted}</span>
          </div>
          <div className="flex items-center">
            <FaGraduationCap className="mr-2 text-gray-600" />
            <span>Any Graduate</span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button 
          onClick={handleViewDetails}
          className="font-medium text-blue-700 hover:text-blue-900 hover:underline"
        >
          View Details
        </button>
        {hasApplied ? (
          <button 
            className="px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed"
            disabled
            onClick={(e) => e.stopPropagation()}
          >
            Already Applied
          </button>
        ) : (
          <button 
            onClick={handleApplyClick}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:opacity-90 transition-colors"
          >
            Apply Now
          </button>
        )}
      </div>
    </div>
  );
};

export default JobCard;
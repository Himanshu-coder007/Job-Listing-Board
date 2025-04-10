import { FaMapMarkerAlt, FaRupeeSign, FaBriefcase, FaBuilding, FaClock, FaGraduationCap } from 'react-icons/fa';

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  salary: string;
  experience: string;
  type: string;
  posted: string;
  skills: string[];
}

const JobCard = ({ title, company, location, salary, experience, type, posted, skills }: JobCardProps) => {
  // Consistent light blue color scheme for all cards
  const cardColor = 'bg-blue-50';
  const typeColor = 'bg-blue-200 text-blue-800';
  const borderColor = 'border-blue-300';
  const textColor = 'text-blue-700 hover:text-blue-900';
  const buttonColor = 'bg-blue-600 text-white';

  return (
    <div className={`${cardColor} rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow h-full flex flex-col border border-opacity-20 ${borderColor}`}>
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
          <div className={`${typeColor} px-3 py-1 rounded-full text-sm font-medium`}>
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
        <button className={`font-medium hover:underline ${textColor}`}>
          View Details
        </button>
        <button className={`px-4 py-2 rounded-lg hover:opacity-90 transition-colors ${buttonColor}`}>
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobCard;
import Navbar from '../components/Navbar';
import FilterSidebar from '../components/FilterSidebar';
import JobCard from '../components/JobCard';

const Home = () => {
  const jobData = [
    {
      title: "Frontend Developer",
      company: "Tech Solutions Inc.",
      location: "Bangalore, Karnataka",
      salary: "₹8,00,000 - ₹12,00,000 PA",
      experience: "2-5 years",
      type: "Full-time",
      posted: "2 days ago",
      skills: ["React", "JavaScript", "TypeScript", "HTML/CSS"]
    },
    {
      title: "Backend Engineer",
      company: "Data Systems Pvt Ltd",
      location: "Remote",
      salary: "₹10,00,000 - ₹15,00,000 PA",
      experience: "3-6 years",
      type: "Remote",
      posted: "1 week ago",
      skills: ["Node.js", "Express", "MongoDB", "AWS"]
    },
    {
      title: "Full Stack Developer",
      company: "Innovate Tech",
      location: "Hyderabad, Telangana",
      salary: "₹6,00,000 - ₹10,00,000 PA",
      experience: "1-3 years",
      type: "Full-time",
      posted: "3 days ago",
      skills: ["React", "Node.js", "SQL", "REST API"]
    },
    {
      title: "DevOps Engineer",
      company: "Cloud Services Ltd",
      location: "Pune, Maharashtra",
      salary: "₹12,00,000 - ₹18,00,000 PA",
      experience: "4-7 years",
      type: "Full-time",
      posted: "5 days ago",
      skills: ["Docker", "Kubernetes", "AWS", "CI/CD"]
    },
    {
      title: "UI/UX Designer",
      company: "Creative Minds",
      location: "Mumbai, Maharashtra",
      salary: "₹5,00,000 - ₹8,00,000 PA",
      experience: "2-4 years",
      type: "Contract",
      posted: "1 day ago",
      skills: ["Figma", "Adobe XD", "UI Design", "Prototyping"]
    },
    {
      title: "Data Scientist",
      company: "Analytics Corp",
      location: "Delhi",
      salary: "₹9,00,000 - ₹14,00,000 PA",
      experience: "3-5 years",
      type: "Full-time",
      posted: "4 days ago",
      skills: ["Python", "Machine Learning", "Pandas", "TensorFlow"]
    },
    {
      title: "Mobile Developer",
      company: "App Innovations",
      location: "Remote",
      salary: "₹7,00,000 - ₹11,00,000 PA",
      experience: "2-4 years",
      type: "Remote",
      posted: "1 week ago",
      skills: ["Flutter", "Dart", "Firebase", "REST API"]
    },
    {
      title: "QA Engineer",
      company: "Quality Assurance Ltd",
      location: "Chennai, Tamil Nadu",
      salary: "₹5,00,000 - ₹8,00,000 PA",
      experience: "2-3 years",
      type: "Full-time",
      posted: "2 days ago",
      skills: ["Testing", "Selenium", "JIRA", "Automation"]
    },
    {
      title: "Product Manager",
      company: "Product Vision",
      location: "Gurgaon, Haryana",
      salary: "₹15,00,000 - ₹20,00,000 PA",
      experience: "5-8 years",
      type: "Full-time",
      posted: "3 days ago",
      skills: ["Product Strategy", "Agile", "User Research", "Roadmapping"]
    }
  ];

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
            {jobData.map((job, index) => (
              <JobCard key={index} {...job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
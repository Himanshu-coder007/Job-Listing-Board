import { useState, useRef, ChangeEvent } from 'react';

interface ApplicationFormProps {
  onClose: () => void;
  onSubmit: (data: {
    name: string;
    email: string;
    phone: string;
    resume: File | null;
    coverLetter: string;
  }) => void;
  jobTitle: string;
  company: string;
}

const ApplicationForm = ({ onClose, onSubmit, jobTitle, company }: ApplicationFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    coverLetter: '',
  });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('No file chosen');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setResumeFile(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      resume: resumeFile,
      coverLetter: formData.coverLetter
    });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Apply for {jobTitle}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>
        <p className="text-gray-600 mb-4">at {company}</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="phone">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">
              Resume
            </label>
            <div className="flex items-center">
              <button
                type="button"
                onClick={triggerFileInput}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-l-lg hover:bg-gray-300"
              >
                Choose File
              </button>
              <span className="ml-2 px-3 py-2 border rounded-r-lg flex-grow text-gray-600 overflow-hidden text-ellipsis whitespace-nowrap">
                {fileName}
              </span>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx"
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">PDF, DOC, DOCX (Max 5MB)</p>
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="coverLetter">
              Cover Letter
            </label>
            <textarea
              id="coverLetter"
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              rows={4}
              required
            />
          </div>
          
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplicationForm;
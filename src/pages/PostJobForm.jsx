import { useState } from 'react';

const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'];
const experienceLevels = ['Entry', 'Mid', 'Senior'];
const qualifications = ['Diploma', 'Bachelor’s', 'Master’s', 'PhD'];
const benefitsList = ['Health Insurance', 'Remote Work', 'Bonuses', 'Paid Time Off'];

export default function JobForm() {
  const [jobData, setJobData] = useState({
    title: '',
    company: '',
    description: '',
    category: '',
    type: '',
    experience: '',
    skills: '',
    qualification: '',
    yearsExperience: '',
    salaryMin: '',
    salaryMax: '',
    currency: 'NGN',
    benefits: [],
    country: '',
    city: '',
    remote: false,
    applicationMethod: 'careerconnect',
    applicationLink: '',
    recruiterName: '',
    recruiterEmail: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setJobData({
      ...jobData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Job Data:', jobData);
    // Submit jobData to backend
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4 p-6 bg-white dark:bg-darkBg rounded-lg shadow-md dark:text-darkText">
      <h2 className="text-2xl font-bold ">Post a Job</h2>
      
      <label>Job Title</label>
      <input name="title" value={jobData.title} onChange={handleChange} required className="dark:text-lightText p-2 border border-gray-300 rounded" />
      
      <label>Company Name</label>
      <input name="company" value={jobData.company} onChange={handleChange} required className="dark:text-lightText p-2 border border-gray-300 rounded" />
      
      <label>Job Description</label>
      <textarea name="description" value={jobData.description} onChange={handleChange} required className="dark:text-lightText p-2 border border-gray-300 rounded" />
      
      <label>Job Type</label>
      <select name="type" value={jobData.type} onChange={handleChange} className="dark:text-lightText p-2 border border-gray-300 rounded">
        {jobTypes.map((type) => <option key={type} value={type}>{type}</option>)}
      </select>
      
      <label>Experience Level</label>
      <select name="experience" value={jobData.experience} onChange={handleChange} className="dark:text-lightText p-2 border border-gray-300 rounded">
        {experienceLevels.map((level) => <option key={level} value={level}>{level}</option>)}
      </select>
      
      <label>Salary Range (NGN)</label>
      <div className="flex justify-between gap-2 md:gap-4">
        <input name="salaryMin" type="number" placeholder="Min" value={jobData.salaryMin} onChange={handleChange} className="w-1/2 p-2 border border-gray-300 rounded dark:text-lightText" />
        <input name="salaryMax" type="number" placeholder="Max" value={jobData.salaryMax} onChange={handleChange} className="w-1/2 p-2 border border-gray-300 rounded dark:text-lightText" />
      </div>
      
      <label>Application Method</label>
      <select name="applicationMethod" value={jobData.applicationMethod} onChange={handleChange} className="dark:text-lightText p-2 border border-gray-300 rounded">
        <option value="careerconnect">Apply on CareerConnect</option>
        <option value="external">External Link</option>
        <option value="email">Email</option>
      </select>
      
      {jobData.applicationMethod !== 'careerconnect' && (
        <>
          <label>Application Link or Email</label>
          <input name="applicationLink" value={jobData.applicationLink} onChange={handleChange} className="p-2 border border-gray-300 rounded" />
        </>
      )}
      
      <button type="submit" className="p-3 bg-blue-600 text-white rounded hover:bg-blue-700">Post Job</button>
    </form>
  );
}

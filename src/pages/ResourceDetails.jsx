import { Link } from "react-router-dom";

const ResourceDetails = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      {/* Title Section */}
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white">
        Resume Writing Tips
      </h1>
      <p className="text-center text-gray-600 dark:text-gray-400 mt-2">
        A step-by-step guide to crafting a winning resume.
      </p>

      {/* Content Section */}
      <div className="mt-6 space-y-6 text-gray-700 dark:text-gray-300">
        {/* Introduction */}
        <section>
          <h2 className="text-2xl font-semibold">Why a Strong Resume Matters</h2>
          <p className="mt-2">
            Your resume is your first impression to employers. A well-structured resume increases your chances of landing an interview.
          </p>
        </section>

        {/* Step 1: Contact Information */}
        <section>
          <h2 className="text-2xl font-semibold">1. Include Your Contact Information</h2>
          <ul className="list-disc pl-6 mt-2">
            <li>Full Name</li>
            <li>Email Address (Professional)</li>
            <li>Phone Number</li>
            <li>LinkedIn Profile (if available)</li>
          </ul>
        </section>

        {/* Step 2: Write a Strong Summary */}
        <section>
          <h2 className="text-2xl font-semibold">2. Craft a Compelling Summary</h2>
          <p className="mt-2">
            The summary should be a **2-3 sentence** introduction that highlights your key skills and experience. Example:
          </p>
          <blockquote className="mt-2 p-3 bg-gray-100 dark:bg-gray-800 italic rounded-lg">
            "Results-driven software engineer with 5+ years of experience in web development, specializing in React and Node.js."
          </blockquote>
        </section>

        {/* Step 3: Work Experience */}
        <section>
          <h2 className="text-2xl font-semibold">3. Highlight Your Work Experience</h2>
          <p className="mt-2">
            List your past jobs in **reverse chronological order** (latest first). Each role should include:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Job Title & Company Name</li>
            <li>Employment Dates</li>
            <li>Key Responsibilities & Achievements</li>
            <li>Use bullet points to make it easy to read.</li>
          </ul>
        </section>

        {/* Step 4: Skills Section */}
        <section>
          <h2 className="text-2xl font-semibold">4. Showcase Relevant Skills</h2>
          <p className="mt-2">
            Include **technical** and **soft skills** relevant to the job. Example:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Technical: JavaScript, React, Node.js, SQL</li>
            <li>Soft: Communication, Teamwork, Problem-Solving</li>
          </ul>
        </section>

        {/* Step 5: Education & Certifications */}
        <section>
          <h2 className="text-2xl font-semibold">5. List Your Education & Certifications</h2>
          <p className="mt-2">
            Include your highest degree, school name, and graduation year. Also, add relevant certifications like:
          </p>
          <ul className="list-disc pl-6 mt-2">
            <li>Google UX Design Certification</li>
            <li>AWS Certified Solutions Architect</li>
          </ul>
        </section>

        {/* Final Tips */}
        <section>
          <h2 className="text-2xl font-semibold">Final Tips</h2>
          <ul className="list-disc pl-6 mt-2">
            <li>Keep your resume **1-2 pages long**.</li>
            <li>Use **clear fonts** like Arial or Roboto.</li>
            <li>Proofread to avoid **grammar mistakes**.</li>
            <li>Tailor your resume for **each job application**.</li>
          </ul>
        </section>
      </div>

      {/* Back Button */}
      <div className="mt-8 text-center">
        <Link to="/resources" className="text-blue-600 hover:underline">
          ← Back to Resources
        </Link>
      </div>
    </div>
  );
};

export default ResourceDetails;

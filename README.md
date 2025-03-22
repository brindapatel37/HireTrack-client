🌟 HireTrack – Smarter Job Tracking
📌 Overview
HireTrack helps job seekers stay organized by managing job applications, tracking interviews, and keeping up with important follow-ups. It also integrates AI-powered resume feedback to help users optimize their applications for specific roles.

Job hunting is stressful, and juggling multiple applications can be overwhelming. HireTrack centralizes the entire process, making it easier to track opportunities, manage tasks, and stay motivated.

🚀 Problem Space
Many job seekers struggle with:
❌ Losing track of application statuses and deadlines
❌ Managing recruiter details, follow-ups, and interview notes
❌ Using outdated tracking methods (spreadsheets, sticky notes)
❌ Lacking AI-powered feedback to refine resumes

HireTrack solves these issues by:
✅ Offering an intuitive dashboard to track job applications in one place
✅ Providing AI-powered resume feedback to improve job prospects
✅ Including a to-do panel for interview prep and follow-ups

👤 User Profile
🎯 Target Audience

Job seekers who want to organize and optimize their job search

Professionals applying to multiple positions who need structured tracking

Users who benefit from AI-powered resume feedback

💡 How They’ll Use It

Log and categorize job applications

Set reminders for follow-ups and interview prep

Receive AI-generated resume feedback based on job descriptions

🌟 Features
✅ User Authentication – Secure login for personalized job tracking
✅ Job Tracking – Add, edit, categorize, and delete applications
✅ Progress Counter – Track applications by status (Applied, Interviewing, Rejected, Accepted)
✅ To-Do Panel – Manage job-related tasks (e.g., follow-ups, interview prep)
✅ Resume Feedback – Get AI-powered suggestions based on job descriptions

🛠️ Tech Stack

Frontend:
React.js, HTML, CSS, Sass

State management (React Context)

Backend:
Node.js, Express.js, MySQL, Knex.js, JWT (JSON Web Token)

APIs & Integrations:
Gemini API – AI-powered resume feedback

REST APIs – Custom backend endpoints

OAuth – Secure authentication

Other Tools:
Postman (API testing)

DOM & Web APIs

Heroku & Netlify (deployment)

📍 Sitemap
1️⃣ Login / Sign Up – User authentication
2️⃣ Home Dashboard – Job tracking list with categorized statuses and a to-do panel
3️⃣ Job Details – View job application details, recruiter contacts, and follow-ups
4️⃣ Resume Feedback – Upload or paste resume text and receive AI-powered suggestions
5️⃣ Dashboard – Graphical view for tracking job progress

🔗 API Endpoints
User Authentication
🔹 POST /user/register – Register a new user
🔹 POST /user/login – Log in via OAuth

Job Tracking
🔹 GET /jobs – Retrieve all job applications for the user
🔹 POST /jobs – Add a new job application
🔹 PUT /jobs/:id – Update job application details
🔹 DELETE /jobs/:id – Remove a job application

To-Do Tasks
🔹 GET /tasks – Fetch all tasks
🔹 POST /tasks – Create a new task
🔹 PUT /tasks/:id – Update task details
🔹 DELETE /tasks/:id – Delete a task

Resume Feedback
🔹 POST /resume – Submit resume text for AI-powered feedback

📅 Roadmap
Week 1: Backend & Core Features
✅ Set up client and server boilerplate
✅ Set up MySQL database and migrations
✅ Complete and test API routes

Week 2: Frontend & Features
✅ User authentication
✅ Header & footer setup
✅ Home dashboard with job tracking
✅ To-do task panel
✅ Job details page
✅ Resume feedback page
✅ Register page
✅ Login page

Final Testing & Deployment
✅ Code cleanup, UI refinements, and testing
✅ Deploy on Heroku & Netlify

🔮 Future Implementations
✨ Search & Pagination – Quickly find specific job applications
✨ Sort – Quickly sort job applications based on criteria
✨ Bulk Actions – Edit or delete multiple applications at once
✨ Kanban Dashboard – Drag-and-drop interface for job tracking
✨ Reminders & Notifications – Get alerts for follow-ups and deadlines
✨ Job board – Connect to job boards like Indeed, LinkedIn, Monster to search and apply for jobs directly

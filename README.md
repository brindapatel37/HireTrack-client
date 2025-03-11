# Project Title

HireTrack

## Overview

The app helps job seekers manage and track their applications, interviews, and to-do activities. It also enables users to get feedback on their resume based on a plain text submission and the role they are applying for.

### Problem Space

Finding and managing job opportunities can be overwhelming, with many applicants juggling multiple applications at once. Job seekers often lose track of their application status, follow-up dates, and critical details like recruiter information. Excel trackers aren't as easy to use on mobile applications nor does it integrate genAI support for resumes. This app centralizes the job application process and helps users stay organized.

### User Profile

This app is for any person looking for a job who want to effectively manage their job search. Users will be able to add, edit, or delete job applications, categorize them, and set to-dos. Special consideriations will be setting up a secure login for each users and effectively integrating ChatGPT or Gemini with proper promt engineering.

### Features

user authentication (time permitted). users can sign up and login to access their persisted job data.
CRUD operations for job entries
count of jobs being tracked, with a potential to do a point system based on job category reached (applied, interviewing, rejected, accepted, etc.)
panel for keeping track of to-dos (sticky notes similar to iphone functionality but more limited to CRUD)
GenAI integration through 3rd party API to provide feedback on resume based on user text input of resume and job description
potential input - joke generator - job tracking can be stressful and an easy way to reduce stress is to generate random jokes.

## Implementation

### Tech Stack

    • Frontend: HTML, CSS, Sass, JavaScript, React.js
    • Backend: Node.js, Express.js, MySQL
    • Authentication: OAuth, User Authentication
    • APIs: REST APIs, ChatGPT/Gemini integration
    • Other: Postman, DOM APIs, Web APIs

List technologies that will be used in your app, including any libraries to save time or provide more functionality. Be sure to research any potential limitations.

### APIs

ChatGPT API or Gemini API
Joke API

### Sitemap

    • Login/Sign Up: User authentication screens
    • Home/Main page: Job tracking list with categorized statuses and count of jobs. CRUD operations. Side panel for to-dos (accessible on every authenticated page). Joke generator
    • Job Details: A page showing full details of a job application, including recruiter contact info and follow-up dates. Side panel for to-dos (accessible on every authenticated page).
    • Dashboard (maybe - time dependent): Job list with categorized statuses (Wishlist, Applied, Interviewing, Offer, Rejected). Side panel for to-dos (accessible on every authenticated page).
    • Resume Feedback: Page for users to input text resumes and the job application details and get feedback on them.

### Mockups

![rough mockup](image.png)

### Data

    - Users: User ID, email, password (hashed), job applications (linked by user ID), to-dos (linked by user ID)
    - Job Applications: Job ID, company name, job title, application date, status, recruiter info, job description, follow-up date, user ID
    - To-Dos: Task title, Task ID, status, dueDate, user ID
    - Resume Input: Resume, job description, user ID (data temporarily persists?)

### Endpoints

    • POST /users/register: Create a new user account
    • POST /users/login: User login with OAuth
    • GET /jobs: Get a list of job applications for the logged-in user
    • POST /jobs: Add a new job application
    • PUT /jobs/:id: Update job application details
    • DELETE /jobs/:id: Delete a job application
    • POST /resume: Parse uploaded resume to get feedback on resume based on job description
    • POST /tasks: add a new task
    - GET /tasks: get a list of all tasks
    - PUT /tasks/:id : edit a task
    - DELETE /tasks/:id : Delete a task

## Roadmap

- create clientand server boiler plate project set-up - Mar 11
- create migrations and create seeds, set-up SQL database -mar 13
- complete and test all server routes - mar 15
- work on client side features - mar 20
  - user creation and login - mar 17
  - header & footer - mar 18
  - home page dashboard - mar 19
  - to-do task panel - mar 20
  - details page - mar 20
  - resume page - mar 21
- conduct code clean up and testing - mar 22
- deploy to production (heroku) and testing - mar 23

---

## Future Implementations

Your project will be marked based on what you committed to in the above document. Here, you can list any additional features you may complete after the MVP of your application is built, or if you have extra time before the Capstone due date.

- pagination
- search functionality
- bulk CRUD
- progress tracking kanban dashboard style
- reminders

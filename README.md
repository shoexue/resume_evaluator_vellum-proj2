This project was made with the help of vellum-ai. This web app helps anyone with recruiting. All you need is your resume and a job description, and using AI we can give you results based on our analysis. Feedback is important for growth and identifying how to improve! This was made with Flask, React, and Vellum.

HOW I USED VELLUM

The vellum workflow for the router classifier was used. The CLI tool was used to easily pull all the code for this workflow. 
The router_classifier is an AI-powered workflow that analyzes job applications by taking a resume and job requirements as input. It works through a series of connected nodes: first, the EvaluateResume node analyzes whether the candidate meets the job criteria and routes them to either WriteNextRoundEmail (if they qualify) or WriteRejectionEmail (if they don't meet requirements). Finally, the FinalOutputEmailContent node formats the appropriate email response. The workflow uses Vellum's AI capabilities to automatically generate professional recruiter feedback emails, making the hiring process more efficient by providing instant, personalized responses to job applicants based on their qualifications.

Here is a video demo

# 🤖 Resume Analyzer & AI Recruiter Feedback Tool

Hiring is hard. Giving thoughtful feedback to every applicant is even harder.

This AI-powered web app makes that part effortless. Upload a **resume** and a **job description**, and the app instantly analyzes fit and delivers a tailored email—either inviting the candidate to the next round or providing clear, respectful rejection feedback.

Unlike traditional resume parsers, this tool doesn’t just scrape keywords. It **understands intent**, **evaluates qualifications**, and ensures **every candidate walks away with an answer**.

Built with **Flask**, **React**, and **Vellum AI**, this project brings recruiter intelligence to scale—without losing the human touch.

---

## ⚙️ How Vellum Was Used

At the core of the system is a custom **Vellum `router_classifier` workflow** that drives all logic and messaging. Vellum made it incredibly easy to map out complex evaluation paths using a visual builder and export it straight into Flask with a single CLI command.

### 🧭 Workflow Overview: `router_classifier`

The workflow works like an intelligent, AI-powered hiring assistant:

1. **Resume + Job Description Ingest**  
   Candidates submit their resume alongside a job posting. The input is parsed and passed into Vellum.

2. **EvaluateResume Node**  
   The AI evaluates whether the resume aligns with the job's core requirements—no brittle keyword matching.

3. **Branching Logic**  
   - If a match is found, the flow routes to `WriteNextRoundEmail`.
   - Otherwise, it uses `WriteRejectionEmail` to compose polite, constructive feedback.

4. **FinalOutputEmailContent Node**  
   No matter the route, the result is a polished, recruiter-quality message that you’d be proud to send.

---

## 🧠 Why Vellum Was a Game-Changer

As a student building this in a hackathon, Vellum was a total lifesaver for quickly turning an idea into a working AI-powered app:

- **Visual, Low-Code Workflow Builder**  
  Instead of writing tons of backend code, I used Vellum’s drag-and-drop interface to design complex AI logic super fast—no deep AI engineering needed.

- **Instant Deployment & Easy Integration**  
  With just a few CLI commands, I pulled the workflow right into my Flask backend, saving hours of setup and allowing me to focus on the user experience.

- **Flexible, Modular AI Components**  
  Vellum’s nodes made it easy to create branching logic that handles resume evaluation and personalized email generation in a way that feels smart and natural.

- **Built-in Versioning & Monitoring**  
  Even during rapid prototyping, I could track how the AI was performing and tweak prompts confidently without worrying about breaking anything.

- **Mix and Match AI Models Without Hassle**  
  I didn’t have to integrate multiple APIs manually—Vellum handled that behind the scenes, which made the AI responses better and more reliable.

- **Accessible for Non-Experts**  
  Because Vellum lets non-engineers experiment with prompt chains visually, I could iterate quickly and deliver a polished product in a short time.

Thanks to Vellum, I built a professional-quality AI workflow for resume analysis and recruiter feedback *way* faster than if I’d coded it all myself—perfect for hackathon speed and scope.

---

## 🧩 STACK

### 🔙 Backend

| Tool / Library         | Role                                                                 |
|------------------------|----------------------------------------------------------------------|
| **Flask**              | Provides REST API endpoints for document upload, analysis, etc.      |
| **Python**             | Core programming language for backend logic and integration          |
| **Vellum AI**          | Powers all intelligent workflows: resume evaluation, routing, and response generation |
| **Vellum CLI**         | Pulls down declarative workflows directly into the Flask project     |
| **REST API**           | Handles input and communication between frontend/backend        |

### 🌐 Frontend

| Tool / Library                | Role                                                                |
|------------------------------|---------------------------------------------------------------------|
| **React**                    | Renders frontend UI and handles state                               |
| **Tailwind CSS 4**           | Utility-first styling with clean design                             |
| **Radix UI + Lucide**        | UI components and icon set for accessible, minimal styling          |
| **Vite**                     | Fast dev server + optimized bundling                                |
| **TypeScript**               | Adds static typing and reliability                                  |
| **clsx / class-variance-authority** | Handles conditional styling + variants                       |

---

## 🎥 Demo

Here’s a short video demo showing the full resume analysis and email generation flow:

https://github.com/user-attachments/assets/a3ee46c9-b2fa-416e-b071-92bd603ca4a7


---

## 🚀 Summary

Building an AI hiring assistant from scratch would normally take weeks of prompt engineering, error handling, and infrastructure work. With **Vellum AI**, it took less than a weekend.

This project shows how powerful—and accessible—modern AI tooling has become. With Vellum’s router workflows and CLI tooling, we were able to ship a full-featured recruiter feedback system that’s respectful, smart, and fast.

It doesn't just automate hiring—it makes it more **thoughtful**.



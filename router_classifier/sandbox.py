from vellum.workflows.sandbox import WorkflowSandboxRunner
import io
import logging
import re

from .inputs import Inputs
from .workflow import Workflow

if __name__ != "__main__":
    raise Exception("This file is not meant to be imported")

runner = WorkflowSandboxRunner(
    workflow=Workflow(),
    inputs=[
        Inputs(
            resume="Jane Doe\nEmail: jane.doe@example.com\nPhone: (123) 456-7890\nLinkedIn: linkedin.com/in/janedoe\n\nObjective:\nExperienced Data Scientist with a strong background in Python, SQL, and Machine Learning. Seeking a challenging role to leverage my skills in data analysis and AI model development.\n\nWork Experience:\nData Scientist - ABC Analytics\nJan 2021 – Jan 2025\n- Developed and deployed machine learning models to predict customer churn, improving retention by 15%.\n- Analyzed large datasets using Python and SQL to identify trends and actionable insights.\n- Built data pipelines and dashboards for real-time performance monitoring.\n\nData Analyst - XYZ Corp\nJun 2020 – Dec 2020\n- Created automated reporting systems, reducing manual reporting time by 30%.\n- Used Tableau and Excel to create visualizations for executive presentations.\n- Conducted statistical analysis to support strategic decision-making.\n\nEducation:\nBachelor of Science in Computer Science\nUniversity of Example, 2017\n\nSkills:\n- Programming: Python, SQL, R\n- Machine Learning: Scikit-learn, TensorFlow\n- Data Visualization: Tableau, Power BI\n- Tools: Jupyter, Git, AWS\n\nCertifications:\n- AWS Certified Data Analytics – 2021\n- TensorFlow Developer Certificate – 2020",
            job_requirements="Must Haves:\n- Python programming experience with at least 3 years of professional work history in this field\n- SQL database experience, indicating ability to work with and query databases effectively\n- Machine Learning experience, showing familiarity with implementing ML models and algorithms\n\nNice to Haves:\n- Experience with modern ML frameworks like TensorFlow, PyTorch, or scikit-learn\n- Familiarity with cloud platforms (AWS, GCP, or Azure) for ML deployment\n- Experience with version control systems like Git and collaborative development workflows\n- Knowledge of data visualization libraries (matplotlib, seaborn, plotly)\n- Background in DevOps practices and CI/CD pipelines",
        ),
    ],
)

# Create a string buffer to capture the logs
log_buffer = io.StringIO()
handler = logging.StreamHandler(log_buffer)
logger = logging.getLogger('vellum.workflows')
logger.addHandler(handler)

# Run the workflow again to capture logs
runner.run()

# Get the logs and extract the final output
logs = log_buffer.getvalue()

final_output_match = re.search(r'email_copy: (.*)', logs, re.DOTALL)
if final_output_match:
    print()
    print("=== EXTRACTED EMAIL ===")
    print(final_output_match.group(1))
    print("=== END EMAIL ===")
else:
    print("No response generated")

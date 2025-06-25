from uuid import UUID

from vellum_ee.workflows.display.base import (
    EdgeDisplay,
    EntrypointDisplay,
    WorkflowInputsDisplay,
    WorkflowMetaDisplay,
    WorkflowOutputDisplay,
)
from vellum_ee.workflows.display.editor import NodeDisplayData, NodeDisplayPosition
from vellum_ee.workflows.display.vellum import WorkflowDisplayData, WorkflowDisplayDataViewport
from vellum_ee.workflows.display.workflows import BaseWorkflowDisplay

from ..inputs import Inputs
from ..nodes.evaluate_resume import EvaluateResume
from ..nodes.final_output_email_content import FinalOutputEmailContent
from ..nodes.write_next_round_email import WriteNextRoundEmail
from ..nodes.write_rejection_email import WriteRejectionEmail
from ..workflow import Workflow


class WorkflowDisplay(BaseWorkflowDisplay[Workflow]):
    workflow_display = WorkflowMetaDisplay(
        entrypoint_node_id=UUID("f5338623-b744-45fe-a853-21587d01e9ab"),
        entrypoint_node_source_handle_id=UUID("f1c45711-aa78-4684-86e7-19f14cbd5647"),
        entrypoint_node_display=NodeDisplayData(position=NodeDisplayPosition(x=0, y=305), width=124, height=48),
        display_data=WorkflowDisplayData(
            viewport=WorkflowDisplayDataViewport(x=129.9294125941841, y=170.5244608504005, zoom=0.5975782516632518)
        ),
    )
    inputs_display = {
        Inputs.resume: WorkflowInputsDisplay(id=UUID("ca59faf2-1850-460e-96a3-605b12e207ea"), name="resume"),
        Inputs.job_requirements: WorkflowInputsDisplay(
            id=UUID("beddcff1-1fe8-4329-9160-6348e702c24a"), name="job_requirements", color="cyan"
        ),
    }
    entrypoint_displays = {
        EvaluateResume: EntrypointDisplay(
            id=UUID("f5338623-b744-45fe-a853-21587d01e9ab"),
            edge_display=EdgeDisplay(id=UUID("0323c90d-4cdf-4c3a-938b-05544e6e2bc0")),
        )
    }
    edge_displays = {
        (WriteNextRoundEmail.Ports.default, FinalOutputEmailContent): EdgeDisplay(
            id=UUID("f50bbc01-4af6-4657-b221-f476c22d0e0a")
        ),
        (WriteRejectionEmail.Ports.default, FinalOutputEmailContent): EdgeDisplay(
            id=UUID("a1836a99-96c6-49cb-861c-9a929aa9e7cf")
        ),
        (EvaluateResume.Ports.group_1_if_port, WriteNextRoundEmail): EdgeDisplay(
            id=UUID("3227b98e-f0d5-40b2-b7a9-f4a19d707283")
        ),
        (EvaluateResume.Ports.group_1_else_port, WriteRejectionEmail): EdgeDisplay(
            id=UUID("b4d16bb3-550c-4696-a8c1-9d505fdc9109")
        ),
    }
    output_displays = {
        Workflow.Outputs.email_copy: WorkflowOutputDisplay(
            id=UUID("fa5c48ea-ed9d-4640-b000-fe2ee8eb6fef"), name="email_copy"
        )
    }

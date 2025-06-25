from vellum.workflows import BaseWorkflow
from vellum.workflows.state import BaseState

from .inputs import Inputs
from .nodes.evaluate_resume import EvaluateResume
from .nodes.final_output_email_content import FinalOutputEmailContent
from .nodes.write_next_round_email import WriteNextRoundEmail
from .nodes.write_rejection_email import WriteRejectionEmail


class Workflow(BaseWorkflow[Inputs, BaseState]):
    graph = {
        EvaluateResume.Ports.group_1_if_port >> WriteNextRoundEmail,
        EvaluateResume.Ports.group_1_else_port >> WriteRejectionEmail,
    } >> FinalOutputEmailContent

    class Outputs(BaseWorkflow.Outputs):
        email_copy = FinalOutputEmailContent.Outputs.value

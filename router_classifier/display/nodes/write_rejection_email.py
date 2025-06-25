from uuid import UUID

from vellum_ee.workflows.display.editor import NodeDisplayComment, NodeDisplayData, NodeDisplayPosition
from vellum_ee.workflows.display.nodes import BaseInlinePromptNodeDisplay
from vellum_ee.workflows.display.nodes.types import NodeOutputDisplay, PortDisplayOverrides

from ...nodes.write_rejection_email import WriteRejectionEmail


class WriteRejectionEmailDisplay(BaseInlinePromptNodeDisplay[WriteRejectionEmail]):
    label = "Write Rejection Email"
    node_id = UUID("6647e167-0d4d-424b-9409-4e9e252c8581")
    output_id = UUID("cdb30d4f-2a77-4d5a-b141-e9fd10fd44c1")
    array_output_id = UUID("a44da6ea-df91-435e-8e91-e7a71f5fab51")
    target_handle_id = UUID("c4c88f95-3874-48b0-9ecc-1f16d6edc449")
    node_input_ids_by_name = {"prompt_inputs.resume_evaluation": UUID("038150e8-7a9d-4570-83ad-d35833e5fa0f")}
    attribute_ids_by_name = {"ml_model": UUID("83051ca6-ac14-48ac-9305-7d212af212ed")}
    output_display = {
        WriteRejectionEmail.Outputs.text: NodeOutputDisplay(
            id=UUID("cdb30d4f-2a77-4d5a-b141-e9fd10fd44c1"), name="text"
        ),
        WriteRejectionEmail.Outputs.results: NodeOutputDisplay(
            id=UUID("a44da6ea-df91-435e-8e91-e7a71f5fab51"), name="results"
        ),
        WriteRejectionEmail.Outputs.json: NodeOutputDisplay(
            id=UUID("71cde01e-bbee-4c2c-a08a-dcb85b61eb35"), name="json"
        ),
    }
    port_displays = {
        WriteRejectionEmail.Ports.default: PortDisplayOverrides(id=UUID("79a00428-3f0c-413b-8939-0cf3f42a8d93"))
    }
    display_data = NodeDisplayData(
        position=NodeDisplayPosition(x=1004, y=374), width=554, height=284, comment=NodeDisplayComment(expanded=True)
    )

from uuid import UUID

from vellum_ee.workflows.display.editor import NodeDisplayComment, NodeDisplayData, NodeDisplayPosition
from vellum_ee.workflows.display.nodes import BaseInlinePromptNodeDisplay
from vellum_ee.workflows.display.nodes.types import NodeOutputDisplay, PortDisplayOverrides

from ...nodes.write_next_round_email import WriteNextRoundEmail


class WriteNextRoundEmailDisplay(BaseInlinePromptNodeDisplay[WriteNextRoundEmail]):
    label = "Write Next Round Email"
    node_id = UUID("d9a9c5fc-176d-40bb-aa75-cab865ed2e73")
    output_id = UUID("e3a929ff-d32b-4f2f-a128-ff3a748882c7")
    array_output_id = UUID("d38f1be2-99da-498a-b73a-1171a0c21571")
    target_handle_id = UUID("5b1a8838-4972-48ed-a8b7-b9bde1b1f0f9")
    node_input_ids_by_name = {"prompt_inputs.resume_evaluation": UUID("fdd7f9bf-406d-412b-8021-bd1e20d270ac")}
    attribute_ids_by_name = {"ml_model": UUID("e23a849c-631e-4d33-a930-13fbf57a28aa")}
    output_display = {
        WriteNextRoundEmail.Outputs.text: NodeOutputDisplay(
            id=UUID("e3a929ff-d32b-4f2f-a128-ff3a748882c7"), name="text"
        ),
        WriteNextRoundEmail.Outputs.results: NodeOutputDisplay(
            id=UUID("d38f1be2-99da-498a-b73a-1171a0c21571"), name="results"
        ),
        WriteNextRoundEmail.Outputs.json: NodeOutputDisplay(
            id=UUID("a6fa4a95-ec06-4297-bf66-f3844c9dc39d"), name="json"
        ),
    }
    port_displays = {
        WriteNextRoundEmail.Ports.default: PortDisplayOverrides(id=UUID("8cb027d3-d34d-4e95-bc2e-1402f2c2c0c2"))
    }
    display_data = NodeDisplayData(
        position=NodeDisplayPosition(x=1004, y=0), width=554, height=284, comment=NodeDisplayComment(expanded=True)
    )

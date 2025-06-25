from uuid import UUID

from vellum_ee.workflows.display.editor import NodeDisplayComment, NodeDisplayData, NodeDisplayPosition
from vellum_ee.workflows.display.nodes import BaseInlinePromptNodeDisplay
from vellum_ee.workflows.display.nodes.types import NodeOutputDisplay, PortDisplayOverrides

from ...nodes.evaluate_resume import EvaluateResume


class EvaluateResumeDisplay(BaseInlinePromptNodeDisplay[EvaluateResume]):
    label = "Evaluate Resume"
    node_id = UUID("7fd8f9b5-24f9-4b2e-bd26-9b6848557248")
    output_id = UUID("f2e69124-5064-445f-92ef-b264ce841ad4")
    array_output_id = UUID("df36de0a-7667-4aee-a1fe-10f14c9fb3c5")
    target_handle_id = UUID("9111e1db-7378-4252-acc0-ae14d92dd6cf")
    node_input_ids_by_name = {
        "prompt_inputs.resume": UUID("44286a76-b054-418a-ae77-f32906f29798"),
        "prompt_inputs.job_description": UUID("ccdcac10-6cd7-477b-b996-412a57059346"),
    }
    attribute_ids_by_name = {"ml_model": UUID("f37e128d-a473-4558-a929-121b050dd3d6")}
    output_display = {
        EvaluateResume.Outputs.text: NodeOutputDisplay(id=UUID("f2e69124-5064-445f-92ef-b264ce841ad4"), name="text"),
        EvaluateResume.Outputs.results: NodeOutputDisplay(
            id=UUID("df36de0a-7667-4aee-a1fe-10f14c9fb3c5"), name="results"
        ),
        EvaluateResume.Outputs.json: NodeOutputDisplay(id=UUID("c5c9bec6-e35d-40ad-91d7-6090c2ce88d7"), name="json"),
    }
    port_displays = {
        EvaluateResume.Ports.group_1_if_port: PortDisplayOverrides(id=UUID("5da2f0ca-fcf7-46cd-b0dd-2eb6a11850cb")),
        EvaluateResume.Ports.group_1_else_port: PortDisplayOverrides(id=UUID("13989ab8-4d7f-4697-a8b2-cd79ddf1fb99")),
    }
    display_data = NodeDisplayData(
        position=NodeDisplayPosition(x=254, y=151), width=620, height=356, comment=NodeDisplayComment(expanded=True)
    )

from uuid import UUID

from vellum_ee.workflows.display.editor import NodeDisplayComment, NodeDisplayData, NodeDisplayPosition
from vellum_ee.workflows.display.nodes import BaseFinalOutputNodeDisplay
from vellum_ee.workflows.display.nodes.types import NodeOutputDisplay

from ...nodes.final_output_email_content import FinalOutputEmailContent


class FinalOutputEmailContentDisplay(BaseFinalOutputNodeDisplay[FinalOutputEmailContent]):
    label = "Final Output - Email Content"
    node_id = UUID("fbd3db4e-bb54-419b-8238-ef46c1fd2289")
    target_handle_id = UUID("a4914f7e-1c86-4c07-a7a5-f5f4d1e35fb7")
    output_name = "email_copy"
    node_input_ids_by_name = {"node_input": UUID("d56de830-b3ea-4aab-bfb5-a9aa71becd22")}
    output_display = {
        FinalOutputEmailContent.Outputs.value: NodeOutputDisplay(
            id=UUID("fa5c48ea-ed9d-4640-b000-fe2ee8eb6fef"), name="value"
        )
    }
    display_data = NodeDisplayData(
        position=NodeDisplayPosition(x=1688, y=166.5), width=522, height=325, comment=NodeDisplayComment(expanded=True)
    )

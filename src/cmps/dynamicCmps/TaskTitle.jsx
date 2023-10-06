import { Button, EditableHeading, Flex, IconButton } from "monday-ui-react-core"
import { DropdownChevronRight, Open } from "monday-ui-react-core/icons"
import { useState } from "react"

export function TaskTitle({ info, boardId, groupId, taskId, onUpdateTask }) {

    const [updatedTaskInput, setUpdatedTask] = useState(info)

    return <div className="task-title" id="task-title">
        <EditableHeading type={EditableHeading.types.h5}
            ellipsis
            onBlur={() => {
                updatedTaskInput ? onUpdateTask(taskId, { key: 'title', value: updatedTaskInput }) : setUpdatedTask(info)
                setUpdatedTask(info)
            }}
            onChange={(value) => setUpdatedTask(value)}
            value={info} />
        <Button
            kind="tertiary"
            leftIcon={Open}
            size="xs"
            // onClick={}
            // send the boardid to TaskDetails by navigate to route
        >
            Open
        </Button>
    </div>
}
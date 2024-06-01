import { Button } from "@nextui-org/react"
import { useAppDispatch } from "shared/lib"
import { deleteTemplateThunk } from "../model/deleteTemplate"

interface DeleteTemplateProps {
    templateIds : number[]
}

export const DeleteTemplate = (props: DeleteTemplateProps) => {
    const dispatch = useAppDispatch()

    const deleteHandler = () => {
        props.templateIds.map((value) => {
            dispatch(deleteTemplateThunk({templateId: value})).then((res) => {
                if (res.meta.requestStatus === "fulfilled" && value === props.templateIds[props.templateIds.length - 1]) {
                    window.location.reload()
                }
            })
        })
    }
    
    return <Button onPress={deleteHandler} variant="faded" radius="sm" size="md" color="danger">Удалить</Button>
}
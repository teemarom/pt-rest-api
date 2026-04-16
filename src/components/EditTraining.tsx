import { useState } from "react"
import type { CustomerData, Training, TrainingData } from "../Types"
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import TrainingForm from "./TrainingForm";

type EditTrainingProps = {
    training: TrainingData;
    handleUpdate: (id: number, updatedTraining: Training) => void;
    customers: CustomerData[];
}

export default function EditTraining(props: EditTrainingProps) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState<Training>({
        date: "",
        duration: 0,
        activity: "",
        customer: ""
    })
    // muokkaa päivämäärän oikeaan muotoon
    const formatDate = (date: string) => date.slice(0, 16);

    const handleClickOpen = () => {
        setTraining({
            date: formatDate(props.training.date),
            duration: props.training.duration,
            activity: props.training.activity,
            customer: props.training.customer
        });
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        if (props.training.id !== undefined) {
            props.handleUpdate(props.training.id, training);
        }
        handleClose();
    };

    return (
        <>
            <Button size="small" onClick={handleClickOpen} >
                EDIT
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Edit Training</DialogTitle>
                <TrainingForm training={training} setTraining={setTraining} customers={props.customers} />
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
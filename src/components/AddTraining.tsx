import { useState } from "react";
import type { CustomerData, Training } from "../Types";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import TrainingForm from "./TrainingForm";


type AddTrainingProps = {
    handleAdd: (training: Training) => void;
    customers: CustomerData[];
}

export default function AddTraining({ handleAdd, customers }: AddTrainingProps) {
    const [open, setOpen] = useState(false);
    const [training, setTraining] = useState<Training>({
        date: "",
        duration: 0,
        activity: "",
        customer: "",
    })

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = () => {
        handleAdd(training);
        handleClose();
    }

    return (
        <>
            <Button variant="contained" onClick={handleClickOpen}>Add Training</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Training</DialogTitle>
                <TrainingForm training={training} setTraining={setTraining} customers={customers}/>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
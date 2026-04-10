import { DialogContent, TextField } from "@mui/material";
import type { Training } from "../Types";

type TrainingFormType ={
    training: Training;
    setTraining: React.Dispatch<React.SetStateAction<Training>>;
}

export default function TrainingForm({training, setTraining}: TrainingFormType) {
    return (
        <DialogContent>
            <TextField
                required
                margin="dense"
                label="Customer Name"
                value={training.customerName}
                onChange={e => setTraining({...training, customerName: e.target.value})}
                fullWidth
                variant="standard"
            />
             <TextField
                required
                margin="dense"
                label="Date (dd.mm.yyyy hh:mm)"
                value={training.date}
                onChange={e => setTraining({...training, date: e.target.value})}
                fullWidth
                variant="standard"
            />
             <TextField
                required
                margin="dense"
                label="Duration (min)"
                value={training.duration}
                onChange={e => setTraining({...training, duration: parseFloat(e.target.value)})}
                fullWidth
                variant="standard"
            />
             <TextField
                required
                margin="dense"
                label="Activity"
                value={training.activity}
                onChange={e => setTraining({...training, activity: e.target.value})}
                fullWidth
                variant="standard"
            />
        </DialogContent>
    )
}
import { DialogContent, MenuItem, TextField } from "@mui/material";
import type { CustomerData, Training } from "../Types";

type TrainingFormType = {
    training: Training;
    setTraining: React.Dispatch<React.SetStateAction<Training>>;
    customers: CustomerData[];
}

export default function TrainingForm({ training, setTraining, customers }: TrainingFormType) {
    return (
        <DialogContent>
            <TextField
                select
                required
                margin="dense"
                label="Customer Name"
                value={training.customer}
                onChange={e => setTraining({ ...training, customer: e.target.value })}
                fullWidth
                variant="standard"
            >
                {customers.map((c) => (
                    <MenuItem
                        key={c._links.self.href}
                        value={c._links.self.href}
                    >
                        {c.firstname} {c.lastname}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                type="datetime-local"
                required
                margin="dense"
                label="Date"
                InputLabelProps={{ shrink: true }}
                value={training.date}
                onChange={e => setTraining({ ...training, date: e.target.value })}
                fullWidth
                variant="standard"
            />
            <TextField
                required
                margin="dense"
                label="Duration (min)"
                value={training.duration}
                onChange={e => setTraining({ ...training, duration: parseFloat(e.target.value) })}
                fullWidth
                variant="standard"
            />
            <TextField
                required
                margin="dense"
                label="Activity"
                value={training.activity}
                onChange={e => setTraining({ ...training, activity: e.target.value })}
                fullWidth
                variant="standard"
            />
        </DialogContent>
    )
}
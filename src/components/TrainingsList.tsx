import type { CustomerData, Training, TrainingData, TrainingPost } from "../Types";
import { useEffect, useState } from "react";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";

import dayjs from "dayjs";
import { Stack } from "@mui/material";
import AddTraining from "./AddTraining";


function TrainingsList() {

    const [trainings, setTrainings] = useState<TrainingData[]>([]);
    const [customers, setCustomers] = useState<CustomerData[]>([]);

    const columns: GridColDef[] = [
        { field: "customer", headerName: "Customer", width: 250 },
        {
            field: "date",
            headerName: "Date",
            width: 250,
            renderCell: (params: GridRenderCellParams) => {
                const value = params.row.date;

                return dayjs(value).format("DD.MM.YYYY HH:mm");
            }
        },
        { field: "duration", headerName: "Duration", width: 250 },
        { field: "activity", headerName: "Activity", width: 250 },
    ]

    
    const getCustomers = () => {
    fetch(import.meta.env.VITE_API_URL + "/customers")
        .then(res => res.json())
        .then(data => setCustomers(data._embedded.customers))
        .catch(err => console.log(err));
};

    const getTrainings = () => {
        fetch(import.meta.env.VITE_API_URL + "/trainings")
            .then(response => {
                if (!response.ok)
                    throw new Error("Error when fetching trainings..")
                return response.json();
            })
            .then(data => {
                const trainingsArray = data._embedded.trainings;

                // tallennus taulukkoon ilman customer nimeä
                setTrainings(trainingsArray);

                // customer nimen haku foreach
                trainingsArray.forEach((data: TrainingData, i: number) => {
                    fetch(data._links.customer.href) // hakee asiakkaan etu- ja sukunimen
                        .then(response => {
                            if (!response.ok)
                                throw new Error("Error when fetching names..")
                            return response.json();
                        })
                        .then(customer => { // tallentaa nimen listaan
                            data.customer = customer.firstname + " " + customer.lastname;
                            setTrainings([...trainingsArray]);
                        })
                        .catch(err => console.log(err))
                })
            })
            .catch(err => console.log(err));
    }

    const saveTraining = (training: Training) => {
        const trainingData: TrainingPost = {
            date: new Date(training.date).toISOString(),
            duration: training.duration,
            activity: training.activity,
            customer: training.customer
        };
        return fetch(import.meta.env.VITE_API_URL + "/trainings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify(trainingData)
        })
            .then(response => {
                if (!response.ok) {
                    console.log(training);
                    throw new Error("Error when adding a new training");
                }
                return response.json();
            })
    }

    const handleAdd = (training: Training) => {
        saveTraining(training)
        .then(() => getTrainings())
        .catch(err => console.log(err))
    }

    useEffect(() => {
        getTrainings();
        getCustomers();
    }, []);

    return (
        <>
            <Stack sx={{ mt: 2, mb: 2 }} direction="row" margin="auto">
                <AddTraining handleAdd={handleAdd} customers={customers} />
            </Stack>
            <div style={{ width: "80%", height: 500 }}>
                <DataGrid
                    columns={columns}
                    rows={trainings}
                    getRowId={row => row._links.self.href} //luo riville id:n links perusteella
                    autoPageSize
                    rowSelection={false}
                />
            </div>
        </>
    )

}

export default TrainingsList;
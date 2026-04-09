import type { TrainingData } from "../Types";
import { useEffect, useState } from "react";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";

import dayjs from "dayjs";


function TrainingsList() {

    const [trainings, setTrainings] = useState<TrainingData[]>([]);

    const columns: GridColDef[] = [
        { field: "customerName", headerName: "Customer", width:250},
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
                        data.customerName = customer.firstname + " " + customer.lastname;
                        setTrainings([...trainingsArray]);
                    })
                    .catch(err => console.log(err))
                })
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getTrainings();
    }, []);

    return (
        <>
            <div style={{ width: "80%", height: 500}}>
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
import type { TrainingData } from "../Types";
import { useEffect, useState } from "react";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";


function TrainingsList() {

    const [trainings, setTrainings] = useState<TrainingData[]>([]);

    const columns: GridColDef<TrainingData>[] = [
        {
            field: "date",
            headerName: "Date",
            width: 300,
        },
        { field: "duration", headerName: "Duration", width: 200 },
        { field: "activity", headerName: "Activity", width: 300 },
    ]


    const getTrainings = () => {
        fetch(import.meta.env.VITE_API_URL + "/trainings")
            .then(response => {
                if (!response.ok)
                    throw new Error("Error when fetching trainings..")
                return response.json();
            })
            .then(data => setTrainings(data._embedded.trainings))
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getTrainings();
    }, []);

    return (
        <>
            <div style={{ width: "90%", height: 500 }}>
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
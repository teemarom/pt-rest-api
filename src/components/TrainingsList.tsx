import type { CustomerData, Training, TrainingData } from "../Types";
import { useEffect, useState } from "react";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";

import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

import { Button, Snackbar, Stack } from "@mui/material";
import AddTraining from "./AddTraining";
import { fetchTrainings, saveTraining, fetchCustomers } from "../ptapi";


function TrainingsList() {

    const [trainings, setTrainings] = useState<TrainingData[]>([]);
    const [customers, setCustomers] = useState<CustomerData[]>([]);

    const [open, setOpen] = useState(false);

    const columns: GridColDef[] = [
        {
            field: "customer",
            headerName: "Customer Name",
            width: 250,
            valueGetter: (_value: any, row: any) => { // korjaa filtteröinnin nimen perusteella
                const customer = row?.customer;
                return customer ? `${customer.firstname} ${customer.lastname}` : "";
            },
        },
        {
            field: "date",
            headerName: "Date",
            width: 250,
            renderCell: (params: GridRenderCellParams) => {
                const value = params.row.date;

                return dayjs.utc(value).format("DD.MM.YYYY HH:mm");
            }
        },
        { field: "duration", headerName: "Duration", width: 250 },
        { field: "activity", headerName: "Activity", width: 250 },
        {
            field: "delete",
            headerName: "",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            disableExport: true,
            renderCell: (params: GridRenderCellParams) =>
                <Button color="error" size="small" onClick={() => handleDelete(params.row.id)}>
                    Delete
                </Button>
        }
    ]

    const getTrainings = () => {
        fetchTrainings()
            .then(data => {
                setTrainings(data);
            })
            .catch(err => console.log(err))
    }

    const getCustomers = () => {
        fetchCustomers()
            .then(data => setCustomers(data._embedded.customers))
            .catch(err => console.log(err));
    };



    const handleAdd = (training: Training) => {
        saveTraining(training)
            .then(() => getTrainings())
            .catch(err => console.log(err))
    }

    const handleDelete = (id: number) => {
        if (window.confirm("Delete Training?")) {
            fetch(`${import.meta.env.VITE_API_URL}/trainings/${id}`, {
                method: "DELETE"
            })
                .then(response => {
                    if (!response.ok)
                        throw new Error("Error when deleting a training..");
                    return response.json();
                })
                .then(() => {
                    getTrainings();
                    setOpen(true);
                })
                .catch(err => console.error(err))
        }
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
                <div style={{ width: "100%", height: 500 }}>
                    <DataGrid
                        key={trainings.length + trainings.map(t => t.id).join()}
                        columns={columns}
                        rows={trainings}
                        getRowId={row => row.id} //luo riville id:n links perusteella
                        autoPageSize
                        rowSelection={false}
                        showToolbar
                        slotProps={{
                            toolbar: {
                                printOptions: { disableToolbarButton: true },
                            },
                        }}
                    />
                </div>
                <Snackbar
                    open={open}
                    autoHideDuration={4000}
                    onClose={() => setOpen(false)}
                    message="Training Deleted"
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                />
            </>
        )
    
}

export default TrainingsList;
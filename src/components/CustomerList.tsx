import type { Customer, CustomerData } from "../Types";
import { useEffect, useState } from "react";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Stack } from "@mui/material";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import Snackbar from '@mui/material/Snackbar';
import { fetchCustomers, saveCustomer } from "../ptapi";




function CustomerList() {

    const [customers, setCustomers] = useState<CustomerData[]>([]);
    const [open, setOpen] = useState(false);

    const columns: GridColDef[] = [
        { field: "firstname", headerName: "First Name", width: 150 },
        { field: "lastname", headerName: "Last Name", width: 150 },
        { field: "email", headerName: "Email", width: 250 },
        { field: "phone", headerName: "Phone", width: 150 },
        { field: "streetaddress", headerName: "Address", width: 200 },
        { field: "postcode", headerName: "Postcode", width: 100 },
        { field: "city", headerName: "City", width: 100 },
        {
            field: "_links.customer.href",
            headerName: "",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            disableExport: true,
            renderCell: (params: GridRenderCellParams) =>
                <EditCustomer customer={params.row} handleUpdate={handleUpdate} />
        },
        {
            field: "_links.self.href",
            headerName: "",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            disableExport: true,
            renderCell: (params: GridRenderCellParams) =>
                <Button color="error" size="small" onClick={() => handleDelete(params.id as string)}>
                    Delete
                </Button>
        }
    ]

    const getCustomers = () => {
        fetchCustomers()
            .then(data => setCustomers(data._embedded.customers))
            .catch(err => console.log(err));
    }

    const handleDelete = (url: string) => {
        if (window.confirm("Delete Customer?")) {
            fetch(url, {
                method: "DELETE"
            })
                .then(response => {
                    if (!response.ok)
                        throw new Error("Error when deleting a customer");
                    return response.json();
                })
                .then(() => {
                    getCustomers();
                    setOpen(true);
                })
                .catch(err => console.error(err))
        }
    }

    const handleAdd = (customer: Customer) => {
        saveCustomer(customer)
            .then(() => getCustomers())
            .catch(err => console.log(err))
    }

    const handleUpdate = (url: string, updatedCustomer: Customer) => {
        fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedCustomer)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Error when editing a customer");
                }
                return response.json();
            })
            .then(() => getCustomers())
            .catch(err => console.error(err))
    }

    useEffect(() => {
        getCustomers();
    }, []);

    return (
        <>
            <Stack sx={{ mt: 2, mb: 2 }} direction="row" margin="auto">
                <AddCustomer handleAdd={handleAdd} />
            </Stack>
            <div style={{ width: "100%", height: 500 }}>
                <DataGrid
                    columns={columns}
                    rows={customers}
                    getRowId={row => row._links.self.href} //luo riville id:n links perusteella
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
                message="Customer Deleted"
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            />
        </>
    )

}


export default CustomerList;
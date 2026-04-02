import type { CustomerData } from "../Types";
import { useEffect, useState } from "react";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { DataGrid } from "@mui/x-data-grid";



function CustomerList() {

    const [customers, setCustomers] = useState<CustomerData[]>([]);

    const columns: GridColDef[] = [
        { field: "firstname", headerName: "First Name", width:150 },
        { field: "lastname", headerName: "Last Name", width:150 },
        { field: "email", headerName: "Email", width:200 },
        { field: "phone", headerName: "Phone", width:120 },
        { field: "streetaddress", headerName: "Address",width:200 },
        { field: "postcode", headerName: "Postcode", width:100 },
        { field: "city", headerName: "City", width:100 }
    ]

    const getCustomers = () => {
        fetch(import.meta.env.VITE_API_URL + "/customers")
            .then(response => {
                if (!response.ok)
                    throw new Error("Error when fetching customers..")
                return response.json();
            })
            .then(data => setCustomers(data._embedded.customers))
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getCustomers();
    }, []);

    return (
        <>
            <div style={{ width: "100%", height: 500 }}>
                <DataGrid
                    columns={columns}
                    rows={customers}
                    getRowId={row => row._links.self.href} //luo riville id:n links perusteella
                    autoPageSize
                    rowSelection={false}
                />
            </div>
        </>
    )

}

export default CustomerList;
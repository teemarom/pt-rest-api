import { useState } from "react";
import type { Customer } from "../Types";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import CustomerForm from "./CustomerForm";


type AddCustomerProps = {
    handleAdd: (customer: Customer) => void;
}

export default function AddCustomer(props: AddCustomerProps) {
    const [open, setOpen] = useState(false);
    const [customer, setCustomer] = useState<Customer>({
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: "",
    })

    const handleClickOpen = () => {
        setOpen(true)
    };

    const handleClose = () => {
        setOpen(false)
    };

    const handleSubmit = () => {
        props.handleAdd(customer);
        handleClose();
    }

    return (
        <>
            <Button variant="contained" onClick={handleClickOpen}>
                Add Customer
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New Customer</DialogTitle>
                <CustomerForm customer={customer} setCustomer={setCustomer} />
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
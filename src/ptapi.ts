import type { Customer, Training } from "./Types";


// CUSTOMERS
export const fetchCustomers = () => {
    return fetch(import.meta.env.VITE_API_URL + "/customers")
        .then(response => {
            if (!response.ok)
                throw new Error("Error when fetching customers..")
            return response.json();
        })
}

export const saveCustomer = (customer: Customer) => {
    return fetch(import.meta.env.VITE_API_URL + "/customers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(customer)
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when adding a new customer");
            return response.json();
        })
}

// TRAININGS
export const fetchTrainings = () => {
    return fetch(import.meta.env.VITE_API_URL + "/gettrainings")
        .then(response => {
            if (!response.ok)
                throw new Error("Error when fetching trainings..")
            return response.json();
        })
}

export const saveTraining = (training: Training) => {
    return fetch(import.meta.env.VITE_API_URL + "/trainings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(training)
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Error when adding a new training..")
            return response.json();
        })
}
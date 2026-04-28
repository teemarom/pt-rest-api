export type CustomerData = {
    firstname: string,
    lastname: string,
    streetaddress: string,
    postcode: string,
    city: string,
    email: string,
    phone: string,
    _links: {
        self: {
            href: string
        },
        customer: {
            href: string
        },
        trainings: {
            href: string
        }
    }
}

export type Customer = Omit<CustomerData, "_links">


export type TrainingData = {
    id: number,
    date: string,
    duration: number,
    activity: string,
    customer: Customer,
    _links: {
        self: {
            href: string
        },
        training: {
            href: string
        },
        customer: {
            href: string
        }
    }
}

export type Training = {
    id?: number;
    date: string;
    duration: number;
    activity: string;
    customer: string; 
}
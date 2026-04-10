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
    date: string,
    duration: number,
    activity: string,
    customerName?: string,
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

export type Training = Omit<TrainingData, "_links">

export type TrainingPost = {
    date:string;
    duration: number;
    activity: string;
    customer: string;
}
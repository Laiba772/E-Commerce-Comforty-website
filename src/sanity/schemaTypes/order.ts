import { title } from "process";

export default {
    name: "order",
    type: "document",
    title: "Order",
    fields: [
        {
            name: "firstName",
            title: "First Name",
            type: "string"
        },
        {
            name: "lastName",
            title: "Last Name",
            type: "string"
        },
        {
            name: "address",
            title: "Address",
            type: "string"
        },
        {
            name: "city",
            title: "City",
            type: "string"
        },
        {
            name: "zipCode",
            title: "Zip Code",
            type: "number"
        },
        {
            name: "phone",
            title: "Phone",
            type: "number"
        },
        {
            name: "discount",
            title: "Discount",
            type: "number"
        },
        {
            name: "email",
            title: "Email",
            type: "string"
        },
        {
            name: "cartItem",
            title: "Cart Item",
            type: "array",
            of : [{ type : 'reference', to : { type: 'products' } }]
        },
        {
            name: "total",
            title: "Total",
            type: "number"
        },
        {
            name: "status",
            title: "Order Status",
            type: "string",
            Option :{
                list : [
                    { title : 'Pending', value: 'pending '},
                    { title : 'Success', value: 'success '},
                    { title : 'Dispatch', value: 'dispatch '}

                ],
                layout : 'radio'
            },
            initialValue : 'pending'
        }
    ]
}
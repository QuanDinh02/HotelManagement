const CustomerServices = require('../services/customerService.js');

const resolvers = {
    Customer: {
        customer_category: async (parent, args) => {
            let customerCategory = await CustomerServices.getAllCustomerCategory();
            return customerCategory.filter(item => +item.id === +parent.customer_category)[0];
        }
    },

    Query: {
        customers: async () => {
            return await CustomerServices.getAllCustomers();
        },

        customer: async (parent, args) => {
            let client = await CustomerServices.getCustomerByNamePhone(args.value);
            return client;
        },

        customer_categories: async () => {
            return await CustomerServices.getAllCustomerCategory();
        },
    },

    Mutation: {
        updateCustomer: async (parent, args) => {
            return await CustomerServices.updateCustomer(args.input);
        }
    }
};

module.exports = { resolvers }
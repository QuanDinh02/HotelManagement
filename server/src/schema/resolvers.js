const Services = require('../services/service.js');

const resolvers = {
    Customer: {
        customer_category: async (parent, args) => {
            let customerCategory = await Services.getAllCustomerCategory();
            return customerCategory.filter(item => +item.id === +parent.customer_category)[0];
        }
    },

    Query: {
        customers: () => {
            return Services.getAllCustomers();
        },

        customer_categories: () => {
            return Services.getAllCustomerCategory();
        },
    },
};

module.exports = { resolvers }
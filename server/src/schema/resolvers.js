const CustomerServices = require('../services/customerService.js');
const StaffServices = require('../services/staffService.js');

const resolvers = {
    Customer: {
        customer_category: async (parent, args) => {
            let customerCategory = await CustomerServices.getAllCustomerCategory();
            return customerCategory.filter(item => +item.id === +parent.customer_category)[0];
        }
    },

    Staff: {
        staff_category: async (parent, args) => {
            let staffCategory = await StaffServices.getAllStaffCategory();
            return staffCategory.filter(item => +item.id === +parent.staff_category)[0];
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

        staffs: async () => {
            return await StaffServices.getAllStaffs();
        },

        staff: async (parent, args) => {
            let staff = await StaffServices.getSearchedStaff(args.value);
            return staff;
        },

        staff_categories: async () => {
            return await StaffServices.getAllStaffCategory();
        },
    },

    Mutation: {
        updateCustomer: async (parent, args) => {
            return await CustomerServices.updateCustomer(args.input);
        },

        deleteCustomer: async (parent, args) => {
            return await CustomerServices.deleteCustomer(args.id);
        },

        updateStaff: async (parent, args) => {
            return await StaffServices.updateStaff(args.input);
        },

        deleteStaff: async (parent, args) => {
            return await StaffServices.deleteStaff(args.id);
        },
    }
};

module.exports = { resolvers }
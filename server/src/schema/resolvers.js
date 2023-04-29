const CustomerServices = require('../services/customerService.js');
const StaffServices = require('../services/staffService.js');
const AccessPermissionServices = require('../services/accessPermissionService.js');

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

        staff_access_management: async () => {
            let _access_permisions_list = await AccessPermissionServices.getAllAccessPermissions();
            let access_permisions_list = _access_permisions_list;

            let _staff_access_list = await StaffServices.getAllStaffCategory();

            let buildData = await Promise.all(_staff_access_list.map(async (item) => {
                let staff_category_info = item;
                let access_permisions = await AccessPermissionServices.getStaffAccessPermissions(item.id);
                if (access_permisions) {
                    return {
                        staff_category_info: staff_category_info,
                        access_permisions: access_permisions.AccessPermissions
                    }
                }
            }));

            if (buildData) {
                return {
                    access_permisions_list: access_permisions_list,
                    staff_access_list: buildData
                }
            }
            
        },
    },

    Mutation: {
        updateCustomer: async (parent, args) => {
            return await CustomerServices.updateCustomer(args.input);
        },

        deleteCustomer: async (parent, args) => {
            return await CustomerServices.deleteCustomer(args.id);
        },

        createStaff: async (parent, args) => {
            return await StaffServices.createStaff(args.input);
        },

        updateStaff: async (parent, args) => {
            return await StaffServices.updateStaff(args.input);
        },

        deleteStaff: async (parent, args) => {
            return await StaffServices.deleteStaff(args.id);
        },

        addAccessPermission: async (parent, args) => {
            return await AccessPermissionServices.addAccessPermissions(args.input);
        },

        deleteStaffAccess: async (parent, args) => {
            return await AccessPermissionServices.deleteAccessPermissions(args.input);
        },
    }
};

module.exports = { resolvers }
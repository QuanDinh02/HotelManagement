const CustomerServices = require('../services/customerService.js');
const StaffServices = require('../services/staffService.js');
const AccessPermissionServices = require('../services/accessPermissionService.js');
const HotelServices = require('../services/hotelServices.js');
const HotelRoomsServices = require('../services/hotelRoomService.js');
const HotelRoomUseServices = require('../services/hotelRoomUseService.js');

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

        hotel_services: async () => {
            return await HotelServices.getAllHotelServices();
        },

        hotel_service_categories: async () => {
            return await HotelServices.getAllHotelServiceCategories();
        },

        searched_service_by_name: async (parent, args) => {
            let service = await HotelServices.getSearchedServiceByName(args.value);
            return service;
        },

        searched_service_by_category: async (parent, args) => {
            let service = await HotelServices.getSearchedServiceByCategory(args.value);
            return service;
        },

        hotel_rooms: async () => {
            return await HotelRoomsServices.getAllHotelRooms();
        },

        hotel_room_categories: async () => {
            return await HotelRoomsServices.getAllHotelRoomCategories();
        },

        room_search_by_name: async (parent, args) => {
            let room = await HotelRoomsServices.getRoomSearchByName(args.value);
            return room;
        },

        room_search_by_category: async (parent, args) => {
            let room = await HotelRoomsServices.getRoomSearchByCategory(args.value);
            return room;
        },

        hotel_room_use_list: async () => {
            return await HotelRoomUseServices.getAllHotelRoomUse();
        },

        hotel_room_use_by_id: async (parent, args) => {
            return await HotelRoomUseServices.getHotelRoomUseById(args.id);
        },

        hotel_rooms_by_categories: async () => {
            return await HotelRoomUseServices.getHotelRoomsByRoomsCategory();
        },

        customer_info_by_phone: async (parent, args) => {
            let customerInfo = await CustomerServices.getCustomerInfoByPhone(args.value);
            return customerInfo;
        },
    },

    Mutation: {
        createCustomer: async (parent, args) => {
            return await CustomerServices.createNewCustomer(args.input);
        },

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

        createService: async (parent, args) => {
            return await HotelServices.createNewService(args.input);
        },

        updateService: async (parent, args) => {
            return await HotelServices.updateService(args.input);
        },

        deleteService: async (parent, args) => {
            return await HotelServices.deleteService(args.id);
        },

        createServiceCategory: async (parent, args) => {
            return await HotelServices.createNewServiceCategory(args.name);
        },

        updateServiceCategory: async (parent, args) => {
            return await HotelServices.updateServiceCategory(args.input);
        },

        deleteServiceCategory: async (parent, args) => {
            return await HotelServices.deleteServiceCategory(args.id);
        },

        createRoom: async (parent, args) => {
            return await HotelRoomsServices.createNewRoom(args.input);
        },

        updateRoom: async (parent, args) => {
            return await HotelRoomsServices.updateRoom(args.input);
        },

        deleteRoom: async (parent, args) => {
            return await HotelRoomsServices.deleteRoom(args.id);
        },

        createRoomCategory: async (parent, args) => {
            return await HotelRoomsServices.createNewRoomCategory(args.input);
        },

        updateRoomCategory: async (parent, args) => {
            return await HotelRoomsServices.updateRoomCategory(args.input);
        },

        deleteRoomCategory: async (parent, args) => {
            return await HotelRoomsServices.deleteRoomCategory(args.id);
        },

        bookRoom: async (parent, args) => {
            return await HotelRoomUseServices.createNewRoomUse(args.input);
        },

        updateBookRoom: async (parent, args) => {
            return await HotelRoomUseServices.updateHotelRoomUse(args.input);
        },

        deleteBookRoom: async (parent, args) => {
            return await HotelRoomUseServices.deleteHotelRoomUse(args.id);
        },
    }
};

module.exports = { resolvers }
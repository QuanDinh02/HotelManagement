const CustomerServices = require('../services/customerService.js');
const StaffServices = require('../services/staffService.js');
const AccessPermissionServices = require('../services/accessPermissionService.js');
const HotelServices = require('../services/hotelServices.js');
const HotelRoomsServices = require('../services/hotelRoomService.js');
const HotelRoomUseServices = require('../services/hotelRoomUseService.js');
const ReceiveRoomServices = require('../services/receiveRoomService.js');
const ServicePayment = require('../services/serviceUsingAndPaymentService.js');
const SurchargeServices = require('../services/surchargeService.js');
const RevenueServices = require('../services/revenueService.js');
const RegulationServices = require('../services/regulationService.js');
const LoginServices = require('../services/LoginService.js');
require('dotenv').config();

const cookie = require('cookie');

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

        book_room_search_by_customer: async (parent, args) => {
            let bookRoom = await HotelRoomUseServices.getHotelRoomUseSearchByCustomer(args.value);
            return bookRoom;
        },

        received_hotel_room_use_list: async () => {
            return await ReceiveRoomServices.getAllHotelRoomUse();
        },

        receive_room_search_by_customer: async (parent, args) => {
            let receiveRoom = await ReceiveRoomServices.getHotelRoomUseSearchByCustomer(args.value);
            return receiveRoom;
        },

        hotel_room_use_list_payment: async () => {
            return await ServicePayment.getAllHotelRoomUsePayment();
        },

        invoice: async (parent, args) => {
            return await ServicePayment.getInvoiceByHotelRoomUse(args.id);
        },

        surcharge_list: async () => {
            return await SurchargeServices.getAllSurcharge();
        },

        revenue_report: async (parent, args) => {
            return await RevenueServices.getRevenueReport(args.month, args.year);
        },

        searched_regulation: async (parent, args) => {
            return await RegulationServices.getSearchedRegulation(args.value);
        },

        fetchAccountInfo: async (parent, args, { req, res }) => {
            if (req && req.headers && req.headers.cookie) {
                const cookies = cookie.parse(req.headers.cookie);
                let result = await LoginServices.fetchAccountInfo(cookies.__jwt__);
                if (result) {
                    return {
                        data: result.data,
                        errorCode: result.EC,
                        message: result.EM
                    };
                } else {
                    return null;
                }
            } else {
                return null;
            }
        },

        userLogin: async (parent, args, { req, res }) => {
            let { account, password } = args;

            let result = await LoginServices.userLogin({ account, password });
            if (result) {
                if (result.EC === 0) {
                    res.cookie("__jwt__", result.token, {
                        httpOnly: true,
                        secure: true
                    });
                }
                return {
                    data: result.data,
                    errorCode: result.EC,
                    message: result.EM
                };
            } else {
                return null;
            }
        },

        userLogout: async (parent, args, { req, res }) => {
            if (req && req.headers && req.headers.cookie) {
                res.clearCookie("__jwt__");
                return {
                    errorCode: 0,
                    message: 'Logout successfully'
                };
            }

        }
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

        updateReceiveRoom: async (parent, args) => {
            return await ReceiveRoomServices.updateHotelRoomUse(args.id);
        },

        updateReceiveRoomInfo: async (parent, args) => {
            return await HotelRoomUseServices.updateHotelRoomUse(args.input);
        },

        createRoomUseInvoice: async (parent, args) => {
            return await ServicePayment.createRoomUseInvoice(args.input);
        },

        updatePayment: async (parent, args) => {
            return await ServicePayment.updatePayment(args.id, args.total_payment);
        },

        addRoomService: async (parent, args) => {
            return await ServicePayment.addRoomService(args.input);
        },

        addRoomSurcharge: async (parent, args) => {
            return await ServicePayment.addRoomSurcharge(args.input);
        },

        createRegulation: async (parent, args) => {
            return await RegulationServices.createNewRegulation(args.input);
        },

        updateRegulation: async (parent, args) => {
            return await RegulationServices.updateRegulation(args.input);
        },

        deleteRegulation: async (parent, args) => {
            return await RegulationServices.deleteRegulation(args.id);
        },
    }
};

module.exports = { resolvers }
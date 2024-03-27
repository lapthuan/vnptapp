import requests from "./httpService";

const ServiceDevice = {
    getAlldevice: async () => {
        return requests.get(`/device/`);
    },
    getDevice: async (id) => {
        return requests.get(`/device/${id}`);
    },
    createDevice: async (body) => {
        return requests.post(`/device/`, body);
    },
    editDevice: async (body, id) => {
        return requests.put(`/device/${id}`, body);
    },
    deleteDevice: async (id) => {
        return requests.delete(`/device/${id}`);
    }
}

export default ServiceDevice;
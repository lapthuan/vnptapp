import requests from "./httpService";

const ServiceDevice = {
    getAlldevice: async () => {
        return requests.get(`/thietbi/`);
    },
    getDevice: async (id) => {
        return requests.get(`/thietbi/${id}`);
    },
    createDevice: async (body) => {
        return requests.post(`/thietbi/`, body);
    },
    editDevice: async (body, id) => {
        return requests.put(`/thietbi/${id}`, body);
    },
    deleteDevice: async (id) => {
        return requests.delete(`/thietbi/${id}`);
    }
}

export default ServiceDevice;
import requests from "./httpService";

const ServiceIp = {
    getAllIp: async () => {
        return requests.get(`/ipaddress/`);
    },
    getIp: async (id) => {
        return requests.get(`/ipaddress/${id}`);
    },
    createIp: async (body) => {
        return requests.post(`/ipaddress/`, body);
    },
    editIp: async (body, id) => {
        return requests.put(`/ipaddress/${id}`, body);
    },
    deleteIp: async (id) => {
        return requests.delete(`/ipaddress/${id}`);
    }
}

export default ServiceIp;
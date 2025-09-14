import api from "../services/api";

export const uploadFile = async (File, endpoint) => {
    const formData = new FormData();
    formData.append("file", File);
    const response = await api.get(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data.data;
};

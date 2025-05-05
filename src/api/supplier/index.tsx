import { API_URL } from "@/config";
import { Supplier } from "@/pages/Suppliers";

export const listSuppliers = async (page: number, limit: number, token: string) => {
    return await fetch(`${API_URL}/supplier/list?limit=${limit}&page=${page}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    }).then((res) => {
        return res.json();
    }).catch((error) => {
        console.error("Error fetching stock logs:", error);
    });
};

export const createSupplier = async (supplier: Supplier, userId: string, token: string) => {
    return await fetch(`${API_URL}/supplier/create/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(supplier),
    }).then((res) => {
        return res.json();
    }).catch((error) => {
        console.error("Error adding supplier:", error);
    });
};

export const updateSupplier = async (supplierId: string, supplier: Supplier, userId: string, token: string) => {
    return await fetch(`${API_URL}/supplier/${supplierId}/${userId}`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(supplier),
    }).then((res) => {
        return res.json();
    }).catch((error) => {
        console.error("Error updating supplier:", error);
    });
};

export const deleteSupplier = async (supplierId: string, userId: string, token: string) => {
    return await fetch(`${API_URL}/supplier/${supplierId}/${userId}`, {
        method: "DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    }).then((res) => {
        return res.json();
    }).catch((error) => {
        console.error("Error deleting supplier:", error);
    });
};
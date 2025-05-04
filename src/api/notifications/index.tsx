import { API_URL } from "@/config";

export const listNotifications = async (page: number, limit: number, token: string) => {
    return await fetch(`${API_URL}/notifications?limit=${limit}&page=${page}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        },
    }).then((res) => {
        return res.json();
    }).catch((error) => {
        console.error("Error fetching notifications:", error);
    });
};
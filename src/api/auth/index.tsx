import { API_URL } from "@/config"

export const signUp = async (name: string, email: string, password: string) => {
    return await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    }).then((res) => {
        return res.json()
    }).catch((error) => {
        console.error("Error during sign-up:", error)
    });
}

export const signIn = async (email: string, password: string) => {
    return await fetch(`${API_URL}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: 'application/json',
        },
        body: JSON.stringify({ email, password }),
    }).then((res) => {
        return res.json()
    }).catch((error) => {
        console.error("Error during sign-in:", error)
    });
}

export const isAuthenticated = () => {
    if (typeof window === "undefined") {
        return false;
    }
    if (localStorage.getItem("jwt")) {
        return JSON.parse(localStorage.getItem("jwt") || "{}");
    } else {
        return false;
    }
}

export const authenticate = (data: any, next: () => void) => {
    if (typeof window !== "undefined") {
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
}
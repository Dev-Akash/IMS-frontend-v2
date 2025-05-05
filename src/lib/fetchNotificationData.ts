
import { isAuthenticated } from "@/api/auth";
import { listNotifications } from "@/api/notifications";
import { notificationListStore } from "@/stores/notificationStore";
import { toast } from "sonner";

export const fetchNotificationData = async () => {
    const {token} = isAuthenticated();
    listNotifications(1, 10000, token).then((data) => {
        if (data.error) {
            toast.error("Error fetching notifications", { description: data.error })
        } else {
            notificationListStore.set(data)
        }
    }).catch((error) => {
        toast.error("Error fetching notifications", { description: error.message })
    });
}
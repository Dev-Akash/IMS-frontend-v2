import { isAuthenticated } from "@/api/auth";
import { listNotifications } from "@/api/notifications";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";

export interface Notifications {
    _id: string
    warehouse: string
    product: string
    message: string
    is_read: boolean
    createdAt: string
}

export default function Notifications() {
    const [search, setSearch] = useState("");
    const [notificationsList, setNotificationsList] = useState<Notifications[]>([]);
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState("");
     const {token} = isAuthenticated();
 
     useEffect(() => {
         setLoading(true);
 
         listNotifications(1, 100, token).then((data) => {
             if(data.error){
                 setError(data.error);
                 setLoading(false)
             }
             else{
                 setNotificationsList(data);
                 setLoading(false);
                 setError("");
             }
         }).catch((err) => {
             console.log(err);
         });
     }, [])

    return (
        <div className="space-y-4 p-4 m-4">
            {/* Header Section */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-semibold">Notifications</h2>
                <div className="flex gap-2 items-center w-full sm:w-auto">
                    <Input
                        placeholder="Search notifications..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full sm:w-64"
                    />
                </div>
            </div>

            {/* Notifications Table */}
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Message</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {notificationsList
                                .filter((notification) =>
                                    notification.message.toLowerCase().includes(search.toLowerCase())
                                )
                                .map((notification) => (
                                    <TableRow key={notification._id}>
                                        <TableCell>{new Date(notification.createdAt).toDateString()}</TableCell>
                                        <TableCell>
                                            <div className="flex" style={{whiteSpace: "break-spaces", alignItems: "center"}}>
                                                <TriangleAlert color="red" className="w-4 h-4 me-3"/>
                                                {`Low stock of ${notification.product} in ${notification.warehouse} warehouse. Please re-stock`}
                                            </div>
                                        </TableCell>
                                        <TableCell>{notification.is_read ? "Read": "Unread"}</TableCell>
                                    </TableRow>
                                ))}
                                {notificationsList.length === 0 && 
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center">No notifications to show!</TableCell>
                                    </TableRow>
                                }
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

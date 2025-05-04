import { isAuthenticated } from "@/api/auth";
import { listNotifications } from "@/api/notifications";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface Notifications {
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

            {/* Actions */}
            {/* <div className="flex gap-2">
                <Button onClick={handleMarkAllRead} className="w-auto">
                    Mark All as Read
                </Button>
                <Button onClick={handleDeleteAll} variant="destructive" className="w-auto">
                    Delete All
                </Button>
            </div> */}

            {/* Notifications Table */}
            <Card>
                <CardContent className="p-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Message</TableCell>
                                <TableCell>Status</TableCell>
                                {/* <TableCell className="text-right">Actions</TableCell> */}
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
                                        <TableCell>{notification.message}</TableCell>
                                        <TableCell>{notification.is_read ? "Read": "Unread"}</TableCell>
                                        {/* <TableCell className="text-right space-x-2">
                                            <Button variant="outline" size="icon">
                                                <CheckCircle className="h-4 w-4" />
                                            </Button>
                                            <Button variant="destructive" size="icon">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell> */}
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

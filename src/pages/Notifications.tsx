import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Trash2, CheckCircle } from "lucide-react";
import { useState } from "react";

const notifications = [
    { id: 1, message: "Stock for Wireless Mouse is low.", date: "2025-05-01", status: "Unread" },
    { id: 2, message: "New order placed for LED Monitor.", date: "2025-05-02", status: "Read" },
    { id: 3, message: "Product 'Desk Lamp' restocked.", date: "2025-05-03", status: "Unread" },
];

export default function Notifications() {
    const [search, setSearch] = useState("");
    const [notificationsList, setNotificationsList] = useState(notifications);

    const handleMarkAllRead = () => {
        setNotificationsList(notificationsList.map((item) => ({ ...item, status: "Read" })));
    };

    const handleDeleteAll = () => {
        setNotificationsList([]);
    };

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
            <div className="flex gap-2">
                <Button onClick={handleMarkAllRead} className="w-auto">
                    Mark All as Read
                </Button>
                <Button onClick={handleDeleteAll} variant="destructive" className="w-auto">
                    Delete All
                </Button>
            </div>

            {/* Notifications Table */}
            <Card>
                <CardContent className="p-0 overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Message</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell className="text-right">Actions</TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {notificationsList
                                .filter((notification) =>
                                    notification.message.toLowerCase().includes(search.toLowerCase())
                                )
                                .map((notification) => (
                                    <TableRow key={notification.id}>
                                        <TableCell>{notification.date}</TableCell>
                                        <TableCell>{notification.message}</TableCell>
                                        <TableCell>{notification.status}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button variant="outline" size="icon">
                                                <CheckCircle className="h-4 w-4" />
                                            </Button>
                                            <Button variant="destructive" size="icon">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}

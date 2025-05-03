import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Plus, Pencil, Trash2, UserRound } from "lucide-react"

const sampleUsers = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Staff", status: "Active" },
  { id: 3, name: "Carol Green", email: "carol@example.com", role: "User", status: "Inactive" },
]

export default function Users() {
  const [openModal, setOpenModal] = useState<"add" | "edit" | null>(null)

  return (
    <div className="space-y-4 p-4 m-4">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold">User Management</h2>
        <div className="flex w-full gap-2 sm:w-auto">
          <Input placeholder="Search users..." className="w-full sm:w-64" />
          <Dialog open={openModal === "add"} onOpenChange={(open) => setOpenModal(open ? "add" : null)}>
            <DialogTrigger asChild>
              <Button onClick={() => setOpenModal("add")}>
                <Plus size={18} className="mr-1" />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add User</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <div className="grid gap-2">
                  <Label>Name</Label>
                  <Input placeholder="User's full name" />
                </div>
                <div className="grid gap-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="user@example.com" />
                </div>
                <div className="grid gap-2">
                  <Label>Role</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="staff">Staff</SelectItem>
                      <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Password</Label>
                  <Input type="password" placeholder="••••••••" />
                </div>
                <Button className="w-full">Add User</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* User Table */}
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="flex items-center gap-2">
                    <UserRound className="h-4 w-4" />
                    {user.name}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-md text-xs ${
                        user.status === "Active" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                      }`}
                    >
                      {user.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    {/* Edit User Dialog */}
                    <Dialog open={openModal === "edit"} onOpenChange={(open) => setOpenModal(open ? "edit" : null)}>
                      <DialogTrigger asChild>
                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() => setOpenModal("edit")}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Edit User</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-3">
                          <div className="grid gap-2">
                            <Label>Name</Label>
                            <Input defaultValue={user.name} />
                          </div>
                          <div className="grid gap-2">
                            <Label>Email</Label>
                            <Input defaultValue={user.email} />
                          </div>
                          <div className="grid gap-2">
                            <Label>Role</Label>
                            <Select defaultValue={user.role.toLowerCase()}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder={user.role} />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="admin">Admin</SelectItem>
                                <SelectItem value="staff">Staff</SelectItem>
                                <SelectItem value="user">User</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <Button className="w-full">Save Changes</Button>
                        </div>
                      </DialogContent>
                    </Dialog>

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
  )
}

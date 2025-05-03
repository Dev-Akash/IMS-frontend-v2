// src/pages/Suppliers.tsx
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { isAuthenticated } from "@/api/auth"

const sampleSuppliers = [
  {
    id: 1,
    name: "Tech Distributors Inc.",
    contact: "Alice Johnson",
    phone: "123-456-7890",
    email: "alice@techdist.com",
    location: "New York, NY",
  },
  {
    id: 2,
    name: "Global Parts Co.",
    contact: "Bob Smith",
    phone: "987-654-3210",
    email: "bob@globalparts.com",
    location: "Los Angeles, CA",
  },
]

export default function Suppliers() {
  const [openModal, setOpenModal] = useState<"add" | "edit" | null>(null)

  return (
    <div className="space-y-4 p-4 m-4">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-2xl font-semibold">Suppliers</h2>
        <div className="flex w-full gap-2 sm:w-auto">
          <Input placeholder="Search suppliers..." className="w-full sm:w-64" />
          {isAuthenticated().user && isAuthenticated().user.role === 1 && <Dialog open={openModal === "add"} onOpenChange={(e) => setOpenModal(e ? "add" : null)}>
            <DialogTrigger asChild>
              <Button onClick={() => setOpenModal("add")}>
                <Plus size={18} className="mr-1" />
                Add Supplier
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add Supplier</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <div className="grid gap-2">
                  <Label>Supplier Name</Label>
                  <Input placeholder="Enter supplier name" />
                </div>
                <div className="grid gap-2">
                  <Label>Contact Person</Label>
                  <Input placeholder="e.g., John Doe" />
                </div>
                <div className="grid gap-2">
                  <Label>Phone</Label>
                  <Input type="tel" placeholder="Phone number" />
                </div>
                <div className="grid gap-2">
                  <Label>Email</Label>
                  <Input type="email" placeholder="Email address" />
                </div>
                <div className="grid gap-2">
                  <Label>Location</Label>
                  <Input placeholder="City, State" />
                </div>
                <Button className="w-full">Add</Button>
              </div>
            </DialogContent>
          </Dialog>}
        </div>
      </div>

      {/* Supplier Table */}
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Phone / Email</TableHead>
                <TableHead>Location</TableHead>
                {isAuthenticated().user && isAuthenticated().user.role === 1 && <TableHead className="text-right">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleSuppliers.map((supplier) => (
                <TableRow key={supplier.id}>
                  <TableCell>{supplier.name}</TableCell>
                  <TableCell>{supplier.contact}</TableCell>
                  <TableCell>
                    <div className="text-sm">{supplier.phone}</div>
                    <div className="text-xs text-muted-foreground">{supplier.email}</div>
                  </TableCell>
                  <TableCell>{supplier.location}</TableCell>
                  {isAuthenticated().user && isAuthenticated().user.role === 1 && <TableCell className="text-right space-x-2">
                    <Dialog open={openModal === "edit"} onOpenChange={(e) => setOpenModal(e ? "edit" : null)}>
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
                          <DialogTitle>Edit Supplier</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-3">
                          <div className="grid gap-2">
                            <Label>Supplier Name</Label>
                            <Input defaultValue={supplier.name} />
                          </div>
                          <div className="grid gap-2">
                            <Label>Contact Person</Label>
                            <Input defaultValue={supplier.contact} />
                          </div>
                          <div className="grid gap-2">
                            <Label>Phone</Label>
                            <Input defaultValue={supplier.phone} />
                          </div>
                          <div className="grid gap-2">
                            <Label>Email</Label>
                            <Input defaultValue={supplier.email} />
                          </div>
                          <div className="grid gap-2">
                            <Label>Location</Label>
                            <Input defaultValue={supplier.location} />
                          </div>
                          <Button className="w-full">Save</Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button variant="destructive" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

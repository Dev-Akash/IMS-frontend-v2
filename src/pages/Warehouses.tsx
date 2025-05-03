import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"
import { Pencil, Plus, Trash2, Warehouse } from "lucide-react"

const sampleWarehouses = [
  {
    id: 1,
    name: "Main Warehouse",
    location: "New Delhi",
    capacity: 1000,
    stockCount: 782,
  },
  {
    id: 2,
    name: "Backup Storage",
    location: "Mumbai",
    capacity: 500,
    stockCount: 314,
  },
]

export default function WarehousesPage() {
  const [openDialog, setOpenDialog] = useState(false)

  return (
    <div className="space-y-6 p-4 m-4">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Warehouses</h2>
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Warehouse
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Warehouse</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Main Warehouse" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" placeholder="City, Country" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input id="capacity" type="number" placeholder="1000" />
              </div>
              <Button className="w-full mt-2">Save Warehouse</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Current Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sampleWarehouses.map((warehouse) => (
                <TableRow key={warehouse.id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <Warehouse className="w-4 h-4 text-muted-foreground" />
                    {warehouse.name}
                  </TableCell>
                  <TableCell>{warehouse.location}</TableCell>
                  <TableCell>{warehouse.capacity}</TableCell>
                  <TableCell>{warehouse.stockCount}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button size="sm" variant="outline">
                      View Stocks
                    </Button>
                    <Button size="icon" variant="outline">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="destructive">
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

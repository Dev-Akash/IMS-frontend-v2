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
import { isAuthenticated } from "@/api/auth"
import { toast } from "sonner"
import { Warehouse as Ware } from "./Products"
import { createWarehouse } from "@/api/warehouse"

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
  const [warehouses, setWarehouses] = useState<Ware[]>([]);
  const [formData, setFormData] = useState({
    warehouseId: "",
    name: "",
    description: "",
    address: "",
    manager: "",
    capacity: 0,
    loadingForm: false
  });
  const { user, token } = isAuthenticated();
  const { name, description, address, manager, capacity, loadingForm } = formData;

  const resetForm = () => {
    setFormData({
      warehouseId: "",
      name: "",
      description: "",
      address: "",
      manager: "",
      capacity: 0,
      loadingForm: false
    });
  }

  const handleAddWarehouse = () => {
    setFormData({ ...formData, loadingForm: true });
    if (!name || !description || !address || !manager || !capacity || name === "" || description === "" || address === "" || manager === "" || capacity === 0) {
      toast.error("All fields are required!");
      setFormData({ ...formData, loadingForm: false });
      return;
    }
    if (name.trim().length < 3) {
      toast.error("Name must be more that 3 alphabets");
      return;
    }
    if (description.trim().length < 10) {
      toast.error("Description must be more that 10 alphabets");
      return;
    }

    let warehouse = {
      name,
      description,
      address,
      "manager" : user._id,
      capacity
    } as Ware;

    createWarehouse(warehouse, user._id, token)
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
          setFormData({ ...formData, loadingForm: false });
        }
        else {
          setWarehouses([data as Ware, ...warehouses])
          resetForm();
          setOpenDialog(false);
          toast.success("Warehouse added successfully!")
        }
      }).catch(() => {
        toast.error("Something went wrong while adding warehouse! Please try again later...")
        setFormData({ ...formData, loadingForm: false })
      });
  }

  return (
    <div className="space-y-6 p-4 m-4">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Warehouses</h2>
        {isAuthenticated().user && isAuthenticated().user.role === 1 && <Dialog open={openDialog} onOpenChange={setOpenDialog}>
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
                <Input id="name" value={name} placeholder="Main Warehouse"
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Input id="description" value={description} placeholder="Things to go with this warehouse..."
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" value={address} placeholder="City, Country"
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="manager">Manager</Label>
                <Input id="manager" value={manager} placeholder="Select Manager"
                  onChange={(e) => setFormData({ ...formData, manager: e.target.value })} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input id="capacity" min={0} value={capacity} type="number" placeholder="1000"
                  onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })} />
              </div>
              <Button disabled={loadingForm} onClick={handleAddWarehouse} className="w-full mt-2">Save Warehouse</Button>
            </div>
          </DialogContent>
        </Dialog>}
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
                {isAuthenticated().user && isAuthenticated().user.role === 1 && <TableHead className="text-right">Actions</TableHead>}
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
                  {isAuthenticated().user && isAuthenticated().user.role === 1 && <TableCell className="text-right space-x-2">
                    <Button size="sm" variant="outline">
                      View Stocks
                    </Button>
                    <Button size="icon" variant="outline">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="destructive">
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

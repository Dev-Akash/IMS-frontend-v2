// src/pages/Suppliers.tsx
import { useEffect, useState } from "react"
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
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react"
import { isAuthenticated } from "@/api/auth"
import { toast } from "sonner"
import { createSupplier, deleteSupplier, listSuppliers, updateSupplier } from "@/api/supplier"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export interface Supplier {
  _id?: string;
  supplier_name: string;
  contact_person: string;
  phone: string;
  email: string;
  location: string
}

export default function Suppliers() {
  const [openModal, setOpenModal] = useState<"add" | "edit" | null>(null);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0); // Total number of pages
  const [totalItems, setTotalItems] = useState(0); // Total number of items
  const [limit, setLimit] = useState(10);
  const [formData, setFormData] = useState({
    _id: "",
    supplier_name: "",
    contact_person: "",
    phone: "",
    email: "",
    location: "",
    loadingForm: false,
  });

  const { user, token } = isAuthenticated();
  const { supplier_name, contact_person, phone, email, location, loadingForm } = formData;

  const loadSupplier = (page: number, limit: number) => {
    setLoading(true);

    listSuppliers(page, limit, token).then((data) => {
      if (data.error) {
        toast.error("Error", { description: data.error })
        setLoading(false);
      }
      else {
        setSuppliers(data.suppliers as Supplier[]);
        setTotalPages(data.pages); // Set total pages from API response
        setCurrentPage(data.page); // Set current page from API response
        setTotalItems(data.total);
        setLoading(false);
      }
    });
  }
  useEffect(() => {
    loadSupplier(currentPage, limit);
  }, []);

  const handleAddSupplier = () => {
    setFormData({ ...formData, loadingForm: true });
    // Add required validations
    if (!supplier_name || !contact_person || !phone || !location || supplier_name === "" || contact_person === "" || phone === "" || location === "") {
      toast.error("Fill required fields!");
      setFormData({ ...formData, loadingForm: false });
      return;
    }

    let supplierData: Supplier = {
      supplier_name: supplier_name,
      contact_person: contact_person,
      email: email,
      phone: phone,
      location: location
    }

    // call api to add supplier
    createSupplier(supplierData, user._id, token).then((data) => {
      if (data.error) {
        toast.error("Error", { description: data.error })
        setFormData({ ...formData, loadingForm: false });
      }
      else {
        setSuppliers([data, ...suppliers]);
        setFormData({
          ...formData,
          supplier_name: '',
          contact_person: '',
          email: '',
          location: '',
          phone: '',
          loadingForm: false
        });
        setOpenModal(null);
        toast.success("Supplier added successfully!")
      }
    }).catch((err) => {
      toast.error("Something went wrong..!", { description: err });
    });
  }

  const handleUpdateSupplier = () => {
    setFormData({ ...formData, loadingForm: true });
    // Add required validations
    if (!supplier_name || !contact_person || !phone || !location || supplier_name === "" || contact_person === "" || phone === "" || location === "") {
      toast.error("Fill required fields!");
      setFormData({ ...formData, loadingForm: false });
      return;
    }

    let supplierData: Supplier = {
      supplier_name: supplier_name,
      contact_person: contact_person,
      email: email,
      phone: phone,
      location: location
    }

    updateSupplier(formData._id, supplierData, user._id, token)
      .then((data) => {
        if (data.error) {
          toast.error("Error", { description: data.error })
          setFormData({ ...formData, loadingForm: false });
        }
        else {
          setSuppliers(suppliers.map((supplier) => (supplier._id === data._id ? data : supplier)));
          setFormData({
            ...formData,
            supplier_name: '',
            contact_person: '',
            email: '',
            location: '',
            phone: '',
            loadingForm: false
          });
          setOpenModal(null);
          toast.success("Supplier updated successfully!")
        }
      }).catch((err) => {
        toast.error("Something went wrong..!", { description: err });
      });
  }

  const handleDeleteSupplier = (supplierId: string) => {
    setLoading(true);
    // Call API to delete product
    deleteSupplier(supplierId, user._id, token)
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
          setLoading(false);
        } else {
          setSuppliers(suppliers.filter((supplier) => supplier._id !== supplierId));
          toast.success("Supplier deleted successfully!");
          setLoading(false);
        }
      })
      .catch(() => {
        toast.error("Something went wrong while deleting the product! Please try again later...");
        setLoading(false);
      });
  };

  return (
    <div className="space-y-4 p-4 m-4">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Suppliers</h2>
          <p className="text-muted-foreground text-sm">
            Total suppliers: {totalItems}
          </p>
        </div>
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
                  <Input value={supplier_name} type="text" placeholder="Enter supplier name"
                    onChange={(e) => setFormData({ ...formData, supplier_name: e.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label>Contact Person</Label>
                  <Input value={contact_person} type="text" placeholder="e.g., John Doe"
                    onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label>Phone</Label>
                  <Input value={phone} type="string" placeholder="Phone number"
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label>Email</Label>
                  <Input value={email} type="email" placeholder="Email address"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                </div>
                <div className="grid gap-2">
                  <Label>Location</Label>
                  <Input value={location} type="text" placeholder="City, State"
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                </div>
                <Button disabled={loadingForm} onClick={handleAddSupplier} className="w-full">Add</Button>
              </div>
            </DialogContent>
          </Dialog>}
        </div>
      </div>

      {/* Supplier Table */}
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          {!loading && <Table>
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
              {suppliers.map((supplier) => (
                <TableRow key={supplier._id}>
                  <TableCell>{supplier.supplier_name}</TableCell>
                  <TableCell>{supplier.contact_person}</TableCell>
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
                          onClick={() => {
                            setOpenModal("edit");
                            setFormData({
                              ...formData,
                              _id: supplier._id || "",
                              supplier_name: supplier.supplier_name,
                              contact_person: supplier.contact_person,
                              email: supplier.email,
                              location: supplier.location,
                              phone: supplier.phone,
                            })
                          }}
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
                            <Input defaultValue={supplier_name}
                              onChange={(e) => setFormData({ ...formData, supplier_name: e.target.value })} />
                          </div>
                          <div className="grid gap-2">
                            <Label>Contact Person</Label>
                            <Input defaultValue={contact_person}
                              onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })} />
                          </div>
                          <div className="grid gap-2">
                            <Label>Phone</Label>
                            <Input defaultValue={phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                          </div>
                          <div className="grid gap-2">
                            <Label>Email</Label>
                            <Input defaultValue={email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                          </div>
                          <div className="grid gap-2">
                            <Label>Location</Label>
                            <Input defaultValue={location}
                              onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                          </div>
                          <Button onClick={handleUpdateSupplier} className="w-full">Save</Button>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Button onClick={() => handleDeleteSupplier(supplier._id ?? "")} variant="destructive" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>}
                </TableRow>
              ))}
            </TableBody>
          </Table>}
          {loading && <Loader2 className="animate-spin h-16 w-16 m-auto text-muted-foreground" />}
          <div className="flex items-center justify-between p-4 border-t">
            <div className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              Items per page:
              <Select
                value={String(limit)}
                onValueChange={(value) => { setLimit(Number(value)); loadSupplier(currentPage, Number(value)) }}
              >
                <SelectTrigger className="w-20">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="25">25</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

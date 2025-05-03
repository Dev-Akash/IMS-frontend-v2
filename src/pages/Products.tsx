import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog"
import { Label } from "@radix-ui/react-dropdown-menu"
import { Plus, Pencil, Trash2 } from "lucide-react"
import { useState } from "react"

const sampleProducts = [
    { id: 1, name: "Wireless Mouse", category: "Accessories", price: "$25", quantity: 100 },
    { id: 2, name: "Keyboard", category: "Accessories", price: "$40", quantity: 75 },
    { id: 3, name: "LED Monitor", category: "Electronics", price: "$180", quantity: 50 },
    { id: 4, name: "Desk Lamp", category: "Office", price: "$30", quantity: 120 },
    { id: 5, name: "Notebook", category: "Stationery", price: "$5", quantity: 300 },
]

export default function Products() {
    const [openModal, setOpenModal] = useState<"add" | "edit" | null>(null)
    console.log(openModal)
    return (
        <div className="space-y-4 p-4 m-4">
            {/* Page Header + Search */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="text-2xl font-semibold">Products</h2>

                <div className="flex gap-2 items-center w-full sm:w-auto">
                    <Input placeholder="Search product..." className="w-full sm:w-64" />
                    <Dialog open={openModal === "add"} onOpenChange={(isOpen) => setOpenModal(isOpen ? "add" : null)}>
                        <DialogTrigger asChild>
                            <Button onClick={() => setOpenModal("add")} className="whitespace-nowrap">
                                <Plus size={18} className="mr-1" />
                                Add Product
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Add Product</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-3">
                                <div className="grid gap-2">
                                    <Label>Product Name</Label>
                                    <Input id="name" placeholder="Enter name" />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Category</Label>
                                    <Input id="category" placeholder="e.g., Electronics" />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Price</Label>
                                    <Input id="price" type="number" placeholder="e.g., 199" />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Quantity</Label>
                                    <Input id="quantity" type="number" placeholder="e.g., 100" />
                                </div>
                                <Button className="w-full">Add</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Table */}
            <Card>
                <CardContent className="p-0 overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sampleProducts.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>{product.price}</TableCell>
                                    <TableCell>{product.quantity}</TableCell>
                                    <TableCell className="text-right space-x-2">
                                        <Dialog open={openModal === "edit"} onOpenChange={(isOpen) => setOpenModal(isOpen ? "edit" : null)}>
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
                                                    <DialogTitle>Edit Product</DialogTitle>
                                                </DialogHeader>
                                                <div className="space-y-3">
                                                    <div className="grid gap-2">
                                                        <Label>Product Name</Label>
                                                        <Input id="name" defaultValue={product.name} />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Category</Label>
                                                        <Input id="category" defaultValue={product.category} />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Price</Label>
                                                        <Input id="price" defaultValue={product.price} />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <Label>Quantity</Label>
                                                        <Input id="quantity" defaultValue={product.quantity} />
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

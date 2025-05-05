import { isAuthenticated } from "@/api/auth"
import { createProduct, deleteProduct, listProducts, updateProduct } from "@/api/products"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { DialogContent, DialogHeader } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog"
import { Label } from "@radix-ui/react-dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useCategoryListStore } from "@/hooks/useCategoryListStore"
import { useWarehouseListStore } from "@/hooks/useWarehouseListStore"

export interface Warehouse {
    _id: string
    name: string
    manager: string
}

interface QuantityByWarehouse {
    warehouse: string
    quantity: number
}

export interface Product {
    _id: string
    name: string
    category: string
    price: number
    total_quantity: number
    lowStockThreshold: number
    description: string
    quantityByWarehouse: QuantityByWarehouse[]
    createdAt: string
    updatedAt: string
}

export default function Products() {
    const [openModal, setOpenModal] = useState<"add" | "edit" | null>(null);
    const [products, setProducts] = useState<Product[]>([]);
    const categories = useCategoryListStore();
    const warehouses = useWarehouseListStore();
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0); // Total number of pages
    const [totalItems, setTotalItems] = useState(0); // Total number of items
    const [limit, setLimit] = useState(10); // Number of items per page
    const [searchQuery, setSearchQuery] = useState(""); // Search query
    const [formData, setFormData] = useState({
        "productId": "",
        "name": "",
        "description": "",
        "category": "",
        "categoryId": "",
        "price": 0,
        "total_quantity": 0,
        "lowStockThreshold": 0,
        "warehouse": "",
        "error": "",
        "success": false,
        "formLoading": false
    });

    const { token, user } = isAuthenticated();
    const { name, description, category, categoryId, price, total_quantity, lowStockThreshold, warehouse} = formData;

    const handleFormChange = (e: any) => {
        setFormData({ ...formData, [e.target.id]: e.target.value, error: "", success: false })
    }

    const resetForm = () => {
        setFormData({
            ...formData,
            productId: '',
            name: '',
            description: "",
            category: "",
            categoryId: "",
            price: 0,
            total_quantity: 0,
            lowStockThreshold: 0,
            warehouse: "",
            error: "",
            success: false,
            formLoading: false
        });
    }

    const loadProducts = (currentPage: number, limit: number) => {
        setLoading(true);
        // Fetch products from API
        listProducts(currentPage, limit)
            .then((data) => {
                if (data.error) {
                    toast.error("Error", { description: data.error });
                    setLoading(false);
                    return;
                }
                else {
                    setProducts(data.products);
                    setTotalPages(data.pages); // Set total pages from API response
                    setCurrentPage(data.page); // Set current page from API response
                    setTotalItems(data.total); // Set total items from API response
                    setLoading(false);
                }
            }).catch(() => {
                // console.error("Error fetching products:", error);
                toast.error("Error fetching products");
                setLoading(false);
            });
    }

    useEffect(() => {
        loadProducts(currentPage, limit);
    }, [currentPage]);

    const handleAddProduct = () => {
        setFormData({ ...formData, formLoading: true });
        if (!name || !description || !categoryId || !total_quantity || !lowStockThreshold || !price || !warehouse) {
            toast.error("All fields are required")
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
        let quantityByWarehouse = [
            {
                quantity: total_quantity,
                warehouse: warehouse
            } as QuantityByWarehouse
        ]
        let product = {
            name,
            description,
            category,
            total_quantity,
            lowStockThreshold,
            price,
            quantityByWarehouse
        } as Product;
        product.category = categoryId;

        createProduct(product, user._id, token)
            .then((data) => {
                if (data.error) {
                    toast.error(data.error);
                    setFormData({ ...formData, formLoading: false });
                }
                else {
                    setProducts([data as Product, ...products])
                    resetForm();
                    setOpenModal(null);
                    toast.success("Product added successfully!")
                }
            }).catch(() => {
                toast.error("Something went wrong while adding product! Please try again later...")
                setFormData({ ...formData, formLoading: false })
            });
    }

    const handleUpdateProduct = () => {
        setFormData({ ...formData, formLoading: true });
        if (!name || !description || !categoryId || !total_quantity || !lowStockThreshold || !price || !warehouse) {
            toast.error("All fields are required");
            return;
        }
        if (name.trim().length < 3) {
            toast.error("Name must be more than 3 alphabets");
            return;
        }
        if (description.trim().length < 10) {
            toast.error("Description must be more than 10 alphabets");
            return;
        }
        let quantityByWarehouse = [
            {
                quantity: total_quantity,
                warehouse: warehouse
            } as QuantityByWarehouse
        ];
        let updatedProduct = {
            name,
            description,
            category: categoryId,
            total_quantity,
            lowStockThreshold,
            price,
            quantityByWarehouse
        } as Product;

        updateProduct(formData.productId, updatedProduct, user._id, token)
            .then((data) => {
                if (data.error) {
                    toast.error(data.error);
                    setFormData({ ...formData, formLoading: false });
                } else {
                    setProducts(products.map((product) => (product._id === data._id ? data : product)));
                    resetForm();
                    setOpenModal(null);
                    toast.success("Product updated successfully!");
                }
            })
            .catch(() => {
                toast.error("Something went wrong while updating the product! Please try again later...");
                setFormData({ ...formData, formLoading: false });
            });
    };

    const handleDeleteProduct = (productId: string) => {
        setLoading(true);
        // Call API to delete product
        deleteProduct(productId, user._id, token)
            .then((data) => {
                if (data.error) {
                    toast.error(data.error);
                    setLoading(false);
                } else {
                    setProducts(products.filter((product) => product._id !== productId));
                    toast.success("Product deleted successfully!");
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
            {/* Page Header + Search */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Products</h2>
                    <p className="text-muted-foreground text-sm">
                        Total products: {totalItems}
                    </p>
                </div>
                <div className="flex gap-2 items-center w-full sm:w-auto">
                    <Input onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search product..." className="w-full sm:w-64" />
                    {isAuthenticated().user && isAuthenticated().user.role === 1 && <Dialog open={openModal === "add"} onOpenChange={(isOpen) => { setOpenModal(isOpen ? "add" : null); resetForm() }}>
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
                                    <Input id="name" onChange={handleFormChange} value={name} placeholder="Enter name" />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Product Description</Label>
                                    <Input id="description" onChange={handleFormChange} value={description} placeholder="Enter description" />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Category</Label>
                                    {/* <Input id="category" onChange={handleFormChange} value={category} placeholder="e.g., Electronics" /> */}
                                    <Select
                                        value={categoryId}
                                        onValueChange={(value) => { setFormData({ ...formData, categoryId: value }) }}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((cat) => (
                                                <SelectItem key={cat?._id} value={cat?._id}>
                                                    {cat?.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-2">
                                    <Label>Price</Label>
                                    <Input id="price" onChange={handleFormChange} value={price} type="number" placeholder="e.g., 199" />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Initial Quantity</Label>
                                    <Input id="total_quantity" onChange={handleFormChange} value={total_quantity} type="number" placeholder="e.g., 100" />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Low Stock Threshold</Label>
                                    <Input id="lowStockThreshold" onChange={handleFormChange} value={lowStockThreshold} type="number" placeholder="0" />
                                </div>
                                <div className="grid gap-2">
                                    <Label>Warehouse</Label>
                                    <Select
                                        value={warehouse}
                                        onValueChange={(value) => { setFormData({ ...formData, warehouse: value }) }}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select Warehouse" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {warehouses.map((ware) => (
                                                <SelectItem key={ware?._id} value={ware?._id}>
                                                    {ware?.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button onClick={handleAddProduct} className="w-full">Add</Button>
                            </div>
                        </DialogContent>
                    </Dialog>}
                </div>
            </div>

            {/* Table */}
            <Card>
                <CardContent className="p-0 overflow-x-auto">
                    {!loading && <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Warehouses In Stock</TableHead>
                                {isAuthenticated().user && isAuthenticated().user.role === 1 && <TableHead className="text-right">Actions</TableHead>}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products
                                .filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                .map((product) => (
                                    <TableRow key={product._id}>
                                        <TableCell>{product.name}</TableCell>
                                        <TableCell>
                                            {categories.find((cat) => cat._id === product.category)?.name || "Unknown"}
                                        </TableCell>
                                        <TableCell>{product.price}</TableCell>
                                        <TableCell>{product.total_quantity}</TableCell>
                                        <TableCell>{product.quantityByWarehouse.length}</TableCell>
                                        {isAuthenticated().user && isAuthenticated().user.role === 1 && <TableCell className="text-right space-x-2">
                                            <Dialog open={openModal === "edit"} onOpenChange={(isOpen) => setOpenModal(isOpen ? "edit" : null)}>
                                                <DialogTrigger asChild>
                                                    <Button
                                                        size="icon"
                                                        variant="outline"
                                                        onClick={() => {
                                                            setOpenModal("edit")
                                                            setFormData({
                                                                ...formData,
                                                                productId: product._id,
                                                                name: product.name,
                                                                description: product.description,
                                                                categoryId: product.category,
                                                                price: product.price,
                                                                total_quantity: product.total_quantity,
                                                                lowStockThreshold: product.lowStockThreshold,
                                                                warehouse: product.quantityByWarehouse.length > 0 ? product.quantityByWarehouse[0].warehouse : "",
                                                                category: product.category
                                                            })
                                                        }}
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
                                                            <Input id="name" onChange={handleFormChange} value={name} placeholder="Enter name" />
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label>Product Description</Label>
                                                            <Input id="description" onChange={handleFormChange} value={description} placeholder="Enter description" />
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label>Category</Label>
                                                            {/* <Input id="category" onChange={handleFormChange} value={category} placeholder="e.g., Electronics" /> */}
                                                            <Select
                                                                value={categoryId}
                                                                onValueChange={(value) => { setFormData({ ...formData, categoryId: value }) }}
                                                            >
                                                                <SelectTrigger className="w-full">
                                                                    <SelectValue placeholder="Select Category" />
                                                                </SelectTrigger>
                                                                <SelectContent>
                                                                    {categories.map((cat) => (
                                                                        <SelectItem key={cat?._id} value={cat?._id}>
                                                                            {cat?.name}
                                                                        </SelectItem>
                                                                    ))}
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label>Price</Label>
                                                            <Input id="price" onChange={handleFormChange} value={price} type="number" placeholder="e.g., 199" />
                                                        </div>
                                                        <div className="grid gap-2">
                                                            <Label>Low Stock Threshold</Label>
                                                            <Input id="lowStockThreshold" onChange={handleFormChange} value={lowStockThreshold} type="number" placeholder="0" />
                                                        </div>
                                                        <Button onClick={handleUpdateProduct} className="w-full">Save Changes</Button>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>

                                            <Button onClick={() => handleDeleteProduct(product._id)} variant="destructive" size="icon">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>}
                                    </TableRow>
                                ))}
                            {products.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={isAuthenticated().user && isAuthenticated().user.role === 1 ? 6 : 5} className="text-center">
                                        No products found.
                                    </TableCell>
                                </TableRow>
                            )}
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
                                onValueChange={(value) => { setLimit(Number(value)); loadProducts(currentPage, Number(value)) }}
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

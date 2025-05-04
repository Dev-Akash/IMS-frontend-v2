import {
  Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle,
} from "@/components/ui/dialog"
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertCircle, Loader2, PackageSearch, PlusCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { isAuthenticated } from "@/api/auth"
import { listStockLogs, updateStock } from "@/api/stocks"
import { toast } from "sonner"
import { listProducts } from "@/api/products"
import { Product, Warehouse } from "./Products"
import { listWarehouses } from "@/api/warehouse"

const outOfStockProducts = [
  { id: 101, name: "Notebook" },
  { id: 102, name: "Desk Lamp" },
]

export interface StockLog {
  _id: string;
  productId: string;
  isInterWarehouseTransaction: Boolean;
  sourceWarehouse: string;
  destinationWarehouse: string;
  quantity: number;
  transactionType: TransactionType;
  date: string;
}

enum TransactionType {
  Add = "Add",
  Remove = "Remove",
}

export default function StockDashboard() {
  const [open, setOpen] = useState(false);
  const [stockLogs, setStockLogs] = useState<StockLog[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [limit, setLimit] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    "productId": "",
    "isInterWarehouseTransaction": "",
    "sourceWarehouse": "",
    "destinationWarehouse": "",
    "quantity": "",
    "transactionType":"",
    "error": "",
    "success": false,
    "loadingForm": false,
  });

  const {token} = isAuthenticated();

  const {
    productId, 
    isInterWarehouseTransaction, 
    sourceWarehouse, 
    destinationWarehouse, 
    quantity, 
    transactionType, 
    error,
    success,
    loadingForm
  } = formData;

  const loadStockLogs = (page: number, limit: number) => {
    setLoading(true);

    listStockLogs(page, limit).then((data) => {
      if (data.error) {
        toast.error("Error", { description: data.error });
        setLoading(false);
        return;
      }
      else {
        setLoading(false);
        setStockLogs(data.stocks);
        setTotalItems(data.total);
        setCurrentPage(data.page);
        setTotalPages(data.pages);
      }
    }).catch((error) => {
      // console.error("Error fetching products:", error);
      toast.error("Error fetching Stock Logs");
      setLoading(false);
    });
  }

  const loadProducts = () => {
    setLoading(true);
    // Fetch products from API
    listProducts(1, 1000)
      .then((data) => {
        if (data.error) {
          toast.error("Error", { description: data.error });
          setLoading(false);
          return;
        }
        else {
          setProducts(data.products);
          setLoading(false);
        }
      }).catch((error) => {
        // console.error("Error fetching products:", error);
        toast.error("Error fetching products");
        setLoading(false);
      });
  }

  const loadWarehouses = () => {
    setLoading(true)
    listWarehouses(1, 10000).then((data) => {
      if (data.error) {
        toast.error("Error fetching warehouses", { description: data.error })
        setLoading(false)
      } else {
        setWarehouses(data)
        setLoading(false)
      }
    }).catch((error) => {
      toast.error("Error fetching warehouses", { description: error.message })
      setLoading(false)
    });
  }

  useEffect(() => {
    loadProducts();
    loadWarehouses();
  }, []);

  useEffect(() => {
    loadStockLogs(currentPage, limit);
  }, [currentPage]);

  const resetForm = () => {
    setFormData({
      ...formData,
      "productId": "",
      "isInterWarehouseTransaction": "",
      "sourceWarehouse": "",
      "destinationWarehouse": "",
      "quantity": "",
      "transactionType":"",
      "error": "",
      "success": false,
      "loadingForm": false,
    });
  }

  const handleUpdateStock = () => {
    setFormData({...formData, loadingForm: true, error: "", success: false});

    if(!productId || !isInterWarehouseTransaction || !destinationWarehouse || !quantity || !transactionType){
      toast.error("All fields are required!")
      return;
    }

    if(isInterWarehouseTransaction === "true" && !sourceWarehouse){
      toast.error("Please select from warehouse");
      return;
    }

    if(parseInt(quantity) <= 0){
      toast.error("Quantity must be greater than 0")
      return;
    }

    let stock = {
      productId,
      "isInterWarehouseTransaction" : isInterWarehouseTransaction === "true" ? true : false,
      transactionType,
      "sourceWarehouse": isInterWarehouseTransaction === "true" ? sourceWarehouse : null,
      destinationWarehouse,
      quantity,
      "date": Date.now(),
    } as unknown as StockLog;
    
    updateStock(stock, token).then((data) => {
      if(data.error){
        setFormData({...formData, loadingForm: false, error: data.error, success: false});
        toast.error("Error", {description: data.error})
      }
      else{
        console.log(data.stockTransaction);
        setStockLogs([data.stockTransaction, ...stockLogs]);
        resetForm();
        setOpen(false);
        loadProducts();
        loadStockLogs(currentPage, limit);
      }
    }).catch((err) => {
      toast.error("Something went wrong while updating!", { description: err.message })
    })
  }

  return (
    <div className="space-y-6 p-4 m-4">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Stock Overview</h2>
          <p className="text-muted-foreground text-sm">
            Total Stock Logs: {totalItems}
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setOpen(true)}>
              <PlusCircle className="mr-2 h-5 w-5" />
              Adjust Stock
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adjust Stock</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div className="grid gap-2">
                <label>Product</label>
                <Select value={productId} onValueChange={(value) => setFormData({...formData, productId: value})}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product?._id} value={product?._id}>
                        {product?.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label>Action</label>
                <Select value={transactionType} onValueChange={(value) => setFormData({...formData, transactionType: value})}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Add / Remove" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Add">Add</SelectItem>
                    <SelectItem value="Remove">Remove</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <label>Quantity</label>
                <Input type="number" value={quantity} onChange={(e) => setFormData({...formData, quantity: e.target.value})} placeholder="Enter quantity" />
              </div>
            </div>
            <div className="grid gap-2">
              <label>Is Inter-Warehouse Transaction</label>
              <Select value={isInterWarehouseTransaction} onValueChange={(value) => setFormData({...formData, isInterWarehouseTransaction: value})}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Yes / No" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <label>From Warehouse</label>
              <Select disabled={(isInterWarehouseTransaction) === "true" ? false : true}
                value={sourceWarehouse}
                onValueChange={(value) => setFormData({...formData, sourceWarehouse: value})}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Warehouse" />
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
            <div className="grid gap-2">
              <label>In Warehouse</label>
              <Select value={destinationWarehouse} onValueChange={(value) => setFormData({...formData, destinationWarehouse: value})}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a Warehouse" />
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
            <Button onClick={handleUpdateStock} className="w-full">Submit</Button>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Total Products</div>
            <div className="text-2xl font-bold">{products.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Out of Stock</div>
            <div className="text-2xl font-bold text-red-500">{products.filter(product => product.total_quantity == 0).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Low Stock (&lt;10)</div>
            <div className="text-2xl font-bold text-yellow-500">{products.filter(product => product.total_quantity < 10).length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-sm text-muted-foreground">Updates Today</div>
            <div className="text-2xl font-bold">{stockLogs.filter(stock => new Date(stock.date).toDateString() === new Date().toDateString()).length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Stock Logs Table */}
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          {!loading && <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>From Warehouse</TableHead>
                <TableHead>In Warehouse</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stockLogs.map((log) => (
                <TableRow key={log._id}>
                  <TableCell>{new Date(log.date).toDateString()}</TableCell>
                  <TableCell>{products.find((prod) => String(prod._id) === String(log.productId))?.name}</TableCell>
                  <TableCell>{log.transactionType}</TableCell>
                  <TableCell className={log.transactionType === "Add" ? "text-green-500" : "text-red-500"}>
                    {log.transactionType === "Add" ? "+ " + log.quantity : "- " + log.quantity}
                  </TableCell>
                  <TableCell>{warehouses.find((ware) => ware._id === log.sourceWarehouse)?.name}</TableCell>
                  <TableCell>{warehouses.find((ware) => ware._id === log.destinationWarehouse)?.name}</TableCell>
                </TableRow>
              ))}
              {stockLogs.length === 0 &&
                <TableRow>
                  <TableCell colSpan={isAuthenticated().user && isAuthenticated().user.role === 1 ? 6 : 5} className="text-center">
                    No products found.
                  </TableCell>
                </TableRow>}
            </TableBody>
          </Table>}
          {loading && <Loader2 className="animate-spin h-16 w-16 m-auto text-muted-foreground" />}
          <div className="flex items-center justify-between p-4 border-t">
            <div className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPage}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              Items per page:
              <Select
                value={String(limit)}
                onValueChange={(value) => { setLimit(Number(value)); loadStockLogs(currentPage, Number(value)) }}
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
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPage))}
                disabled={currentPage === totalPage}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Out of Stock Alerts */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Critical Alerts</h3>
        {outOfStockProducts.length === 0 ? (
          <div className="text-muted-foreground text-sm flex items-center gap-2">
            <PackageSearch className="h-4 w-4" />
            All products in stock.
          </div>
        ) : (
          <div className="grid gap-2 sm:grid-cols-2">
            {outOfStockProducts.map((item) => (
              <Card key={item.id} className="border-destructive">
                <CardContent className="p-3 flex items-center gap-3">
                  <AlertCircle className="text-destructive" />
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">Out of stock</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

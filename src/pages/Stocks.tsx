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
  import { AlertCircle, PackageSearch, PlusCircle } from "lucide-react"
  import { useState } from "react"
  
  const stockLogs = [
    { id: 1, date: "2025-05-01", product: "Wireless Mouse", action: "Added", quantity: 50, by: "Admin" },
    { id: 2, date: "2025-05-02", product: "Keyboard", action: "Removed", quantity: 10, by: "Staff" },
  ]
  
  const outOfStockProducts = [
    { id: 101, name: "Notebook" },
    { id: 102, name: "Desk Lamp" },
  ]
  
  export default function StockDashboard() {
    const [open, setOpen] = useState(false)
  
    return (
      <div className="space-y-6 p-4 m-4">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-semibold">Stock Overview</h2>
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
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a product" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mouse">Wireless Mouse</SelectItem>
                      <SelectItem value="keyboard">Keyboard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label>Action</label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Add / Remove" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="add">Add</SelectItem>
                      <SelectItem value="remove">Remove</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <label>Quantity</label>
                  <Input type="number" placeholder="Enter quantity" />
                </div>
                <Button className="w-full">Submit</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
  
        {/* Summary Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Total Products</div>
              <div className="text-2xl font-bold">245</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Out of Stock</div>
              <div className="text-2xl font-bold text-red-500">5</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Low Stock (&lt;10)</div>
              <div className="text-2xl font-bold text-yellow-500">12</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground">Updates Today</div>
              <div className="text-2xl font-bold">3</div>
            </CardContent>
          </Card>
        </div>
  
        {/* Stock Logs Table */}
        <Card>
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Updated By</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stockLogs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>{log.date}</TableCell>
                    <TableCell>{log.product}</TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell>{log.quantity}</TableCell>
                    <TableCell>{log.by}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
  
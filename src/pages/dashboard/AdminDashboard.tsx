import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Bell, Layers, Package, Warehouse } from "lucide-react"

export default function AdminDashboard() {
  const stats = [
    { title: "Total Products", value: 120, icon: <Package className="w-5 h-5" /> },
    { title: "Low Stock", value: 8, icon: <Bell className="w-5 h-5" /> },
    { title: "Categories", value: 10, icon: <Layers className="w-5 h-5" /> },
    { title: "Warehouses", value: 4, icon: <Warehouse className="w-5 h-5" /> },
  ]

  const recentLogs = [
    { product: "LED Monitor", action: "Added 20 units", time: "2 hours ago" },
    { product: "Wireless Mouse", action: "Removed 5 units", time: "5 hours ago" },
    { product: "Notebook", action: "Added 100 units", time: "1 day ago" },
  ]

  const lowStockItems = [
    { name: "Desk Lamp", quantity: 5 },
    { name: "Keyboard", quantity: 3 },
    { name: "USB Cable", quantity: 2 },
  ]

  return (
    <div className="space-y-6 p-4 m-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Dashboard</h2>
        <Button variant="outline">Go to Inventory</Button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <Card key={idx}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-md bg-muted">{stat.icon}</div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-lg font-semibold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Stock Activity */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Recent Stock Activity</CardTitle>
          <Button size="sm" variant="ghost">View All Logs</Button>
        </CardHeader>
        <CardContent className="overflow-x-auto p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentLogs.map((log, idx) => (
                <TableRow key={idx}>
                  <TableCell>{log.product}</TableCell>
                  <TableCell>{log.action}</TableCell>
                  <TableCell>{log.time}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Low Stock Alerts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base">Low Stock Alerts</CardTitle>
          <Button size="sm" variant="ghost">Restock Items</Button>
        </CardHeader>
        <CardContent className="space-y-2">
          {lowStockItems.map((item, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center p-3 rounded-md bg-destructive/10 text-destructive text-sm"
            >
              <span>{item.name}</span>
              <span>{item.quantity} left</span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

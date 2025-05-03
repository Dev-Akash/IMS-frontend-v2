import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Boxes, Package, Truck } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { TableCell, TableRow, Table, TableHeader, TableBody, TableHead } from "@/components/ui/table"
import { useNavigate } from "react-router-dom"

export default function UserDashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6 p-4 m-4">
      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125</div>
            <p className="text-xs text-muted-foreground">Updated today</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Stock</CardTitle>
            <Boxes className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">820</div>
            <p className="text-xs text-muted-foreground">3 new updates</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Suppliers</CardTitle>
            <Truck className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Last sync: 1hr ago</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Stock Transactions */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Stock Updates</CardTitle>
            <Button
            variant="outline"
            size="sm"
            className="ms-2"
            onClick={() => navigate("/dashboard/stocks")}
            >
            View All
          </Button>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Change</TableHead>
                <TableHead>Updated By</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Wireless Mouse</TableCell>
                <TableCell className="text-green-600 font-medium">+20</TableCell>
                <TableCell>John D.</TableCell>
                <TableCell>May 3, 2025</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Notebook</TableCell>
                <TableCell className="text-red-600 font-medium">-10</TableCell>
                <TableCell>Sarah M.</TableCell>
                <TableCell>May 2, 2025</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Keyboard</TableCell>
                <TableCell className="text-green-600 font-medium">+50</TableCell>
                <TableCell>Admin</TableCell>
                <TableCell>May 1, 2025</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>


      {/* Notification Alerts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Low Stock Alerts</CardTitle>
          <Button variant="outline" size="sm" onClick={() => {navigate("/dashboard/notifications")}}>View All</Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Low Stock</AlertTitle>
            <AlertDescription>
              “Notebook” stock is below threshold (5 units left).
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Critical Alert</AlertTitle>
            <AlertDescription>
              “Desk Lamp” stock is critically low.
            </AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Out of Stock</AlertTitle>
            <AlertDescription>
              “USB Cable” is completely out of stock.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}

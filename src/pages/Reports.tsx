import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import { Button } from "@/components/ui/button"
  import { Input } from "@/components/ui/input"
  import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
  import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    LineChart,
    Line,
    Tooltip,
  } from "recharts"
  
  const stockByCategory = [
    { name: "Electronics", value: 400 },
    { name: "Stationery", value: 300 },
    { name: "Office", value: 300 },
    { name: "Accessories", value: 200 },
  ]
  
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"]
  
  const topProducts = [
    { name: "Monitor", sold: 240 },
    { name: "Notebook", sold: 221 },
    { name: "Mouse", sold: 180 },
    { name: "Lamp", sold: 150 },
    { name: "Keyboard", sold: 120 },
  ]
  
  const stockHistory = [
    { date: "2024-01", stock: 400 },
    { date: "2024-02", stock: 300 },
    { date: "2024-03", stock: 450 },
    { date: "2024-04", stock: 420 },
    { date: "2024-05", stock: 380 },
  ]
  
  export default function AdminReports() {
    return (
      <div className="space-y-6 p-4 m-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-2xl font-bold">Admin Reports</h2>
          <div className="flex items-center gap-2">
            <Input type="month" className="w-36" />
            <Button variant="outline">Export CSV</Button>
          </div>
        </div>
  
        {/* KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Total Products</CardTitle>
            </CardHeader>
            <CardContent className="text-xl font-semibold">1,245</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Low Stock</CardTitle>
            </CardHeader>
            <CardContent className="text-xl font-semibold">45</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Out of Stock</CardTitle>
            </CardHeader>
            <CardContent className="text-xl font-semibold">12</CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Suppliers</CardTitle>
            </CardHeader>
            <CardContent className="text-xl font-semibold">18</CardContent>
          </Card>
        </div>
  
        {/* Charts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topProducts}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Bar dataKey="sold" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
  
          <Card>
            <CardHeader>
              <CardTitle>Stock by Category</CardTitle>
            </CardHeader>
            <CardContent className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stockByCategory}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  >
                    {stockByCategory.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
  
        <Card>
          <CardHeader>
            <CardTitle>Stock Over Time</CardTitle>
          </CardHeader>
          <CardContent className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stockHistory}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="stock" stroke="#82ca9d" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
  
        {/* Tables */}
        <Card>
          <CardHeader>
            <CardTitle>Low Stock Products</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Stock</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>HDMI Cable</TableCell>
                  <TableCell>Accessories</TableCell>
                  <TableCell>3</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Marker Pen</TableCell>
                  <TableCell>Stationery</TableCell>
                  <TableCell>5</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>USB Hub</TableCell>
                  <TableCell>Electronics</TableCell>
                  <TableCell>2</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    )
  }
  
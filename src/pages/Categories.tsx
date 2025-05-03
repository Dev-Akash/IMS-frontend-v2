import {
    Card,
    CardContent,
  } from "@/components/ui/card"
  import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
  } from "@/components/ui/table"
  import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
  import { Input } from "@/components/ui/input"
  import { Button } from "@/components/ui/button"
  import { Label } from "@/components/ui/label"
  import { Plus, Pencil, Trash2 } from "lucide-react"
  import { useState } from "react"
import { isAuthenticated } from "@/api/auth"
  
  const sampleCategories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Stationery" },
    { id: 3, name: "Furniture" },
  ]
  
  export default function CategoriesPage() {
    const [modalOpen, setModalOpen] = useState<"add" | "edit" | null>(null)
  
    return (
      <div className="space-y-4 p-4 m-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Categories</h2>
          <Input placeholder="Search categories..." className="w-full sm:w-64" />
          {isAuthenticated().user && isAuthenticated().user.role === 1 && <Dialog open={modalOpen === "add"} onOpenChange={(e) => setModalOpen(e ? "add" : null)}>
            <DialogTrigger asChild>
              <Button onClick={() => setModalOpen("add")}>
                <Plus className="mr-2 h-4 w-4" /> Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Category</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <Label htmlFor="name">Category Name</Label>
                <Input id="name" placeholder="e.g. Office Supplies" />
                <Button className="w-full mt-4">Add</Button>
              </div>
            </DialogContent>
          </Dialog>}
        </div>
  
        {/* Category Table */}
        <Card>
          <CardContent className="p-0 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  {isAuthenticated().user && isAuthenticated().user.role === 1 && <TableHead className="text-right">Actions</TableHead>}
                </TableRow>
              </TableHeader>
              <TableBody>
                {sampleCategories.map((cat) => (
                  <TableRow key={cat.id}>
                    <TableCell>{cat.name}</TableCell>
                    {isAuthenticated().user && isAuthenticated().user.role === 1 && <TableCell className="text-right space-x-2">
                      {/* Edit */}
                      <Dialog open={modalOpen === "edit"} onOpenChange={(e) => setModalOpen(e ? "edit" : null)}>
                        <DialogTrigger asChild>
                          <Button
                            size="icon"
                            variant="outline"
                            onClick={() => setModalOpen("edit")}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Category</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-3">
                            <Label htmlFor="editName">Category Name</Label>
                            <Input id="editName" defaultValue={cat.name} />
                            <Button className="w-full mt-4">Save Changes</Button>
                          </div>
                        </DialogContent>
                      </Dialog>
  
                      {/* Delete */}
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
  
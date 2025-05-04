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
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react"
import { useEffect, useState } from "react"
import { isAuthenticated } from "@/api/auth"
import { createCategory, deleteCategory, listCategories, updateCategory } from "@/api/categories"
import { toast } from "sonner"
import { Textarea } from "@/components/ui/textarea"
import { it } from "node:test"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Category {
  _id: string
  name: string
  description: string
}

export default function CategoriesPage() {
  const [modalOpen, setModalOpen] = useState<"add" | "edit" | null>(null)
  const [categories, setCategories] = useState<Category[]>();
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("")
  const [categoryName, setCategoryName] = useState("")
  const [categoryDescription, setCategoryDescription] = useState("")
  const [categoryId, setCategoryId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { token, user } = isAuthenticated();

  const loadCategories = (page: number, limit: number) => {
    setLoading(true)
    listCategories(page, limit).then((data) => {
      if (data.error) {
        toast.error("Error fetching categories", { description: data.error })
        setLoading(false)
      } else {
        setCategories(data.categories)
        setTotalItems(data.total)
        setTotalPages(data.pages)
        setCurrentPage(data.page)
        setLoading(false)
      }
    }).catch((error) => {
      toast.error("Error fetching categories", { description: error.message })
      setLoading(false)
    });
  }
  useEffect(() => {
    loadCategories(currentPage, itemsPerPage)
  }, [currentPage]);

  const handleAddCategory = () => {
    setLoading(true)
    if (!categoryName || !categoryDescription) {
      toast.error("Please fill in all fields")
      setLoading(false)
      return
    }
    if (categoryName.length < 3) {
      toast.error("Category name must be at least 3 characters long")
      setLoading(false)
      return
    }

    createCategory(categoryName, categoryDescription, user._id, token)
      .then((data) => {
        if (data.error) {
          toast.error("Error creating category", { description: data.error })
          setLoading(false)
          return
        } else {
          setCategories([...(categories || []), data])
          setCategoryName("")
          setCategoryDescription("")
          setModalOpen(null)
          setLoading(false)
          toast.success("Category created successfully")
        }
      }).catch((error) => {
        toast.error("Error creating category", { description: error.message })
        setLoading(false)
      });
  }

  const handleEditCategory = () => {
    setLoading(true)
    if (!categoryName || !categoryDescription) {
      toast.error("Please fill in all fields")
      setLoading(false)
      return
    }
    if (categoryName.length < 3) {
      toast.error("Category name must be at least 3 characters long")
      setLoading(false)
      return
    }
    console.log(categoryId)
    updateCategory(categoryId, categoryName, categoryDescription, user._id, token)
      .then((data) => {
        if (data.error) {
          toast.error("Error updating category", { description: data.error })
          setLoading(false)
          return
        } else {
          setCategories(categories?.map((cat) => cat._id === categoryId ? data : cat))
          setCategoryName("")
          setCategoryDescription("")
          setCategoryId("")
          setModalOpen(null)
          setLoading(false)
          toast.success("Category updated successfully")
        }
      }).catch((error) => {
        toast.error("Error updating category", { description: error.message })
        setLoading(false)
      });
  }

  const handleDeleteCategory = (categoryId: string) => () => {
    setLoading(true);

    deleteCategory(categoryId, user._id, token)
      .then((data) => {
        if (data.error) {
          toast.error("Error deleting category", { description: data.error })
          setLoading(false)
          return
        } else {
          setCategories(categories?.filter((cat) => cat._id !== categoryId))
          setLoading(false)
          toast.success("Category deleted successfully")
        }
      }).catch((error) => {
        toast.error("Error deleting category", { description: error.message })
        setLoading(false)
      });
  }

  return (
    <div className="space-y-4 p-4 m-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Categories</h2>
        <div className="flex items-center space-x-2">
          <Input onChange={(e) => setSearch(e.target.value)} placeholder="Search categories..." className="w-full sm:w-64" />
          {isAuthenticated().user && isAuthenticated().user.role === 1 && <Dialog open={modalOpen === "add"} onOpenChange={(e) => setModalOpen(e ? "add" : null)}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setModalOpen("add");
                setCategoryName("");
                setCategoryDescription("")
                setCategoryId("");
              }}>
                <Plus className="mr-2 h-4 w-4" /> Add Category
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Category</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <Label htmlFor="name">Category Name</Label>
                <Input id="name" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} placeholder="e.g. Office Supplies" />
              </div>
              <div className="grid gap-2">
                <Label>Description</Label>
                <Textarea id="description" value={categoryDescription} onChange={(e) => setCategoryDescription(e.target.value)} placeholder="Enter a brief description..." />
              </div>
              <DialogFooter>
                <Button disabled={loading} className="w-full mt-4" onClick={handleAddCategory}>
                  {loading ? <Loader2 className="animate-spin h-4 w-4" /> : null}
                  <Plus className="mr-2 h-4 w-4" />
                  Add
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>}
        </div>
      </div>

      {/* Category Table */}
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          {!loading && <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
                {isAuthenticated().user && isAuthenticated().user.role === 1 && <TableHead className="text-right">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories
                ?.filter((cat) =>
                  cat.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((cat) => (
                  <TableRow key={cat._id}>
                    <TableCell>{cat.name}</TableCell>
                    <TableCell>{cat.description}</TableCell>
                    {isAuthenticated().user &&
                      isAuthenticated().user.role === 1 && (
                        <TableCell className="text-right space-x-2">
                          {/* Edit */}
                          <Dialog
                            open={modalOpen === "edit"}
                            onOpenChange={(e) =>
                              setModalOpen(e ? "edit" : null)
                            }
                          >
                            <DialogTrigger asChild>
                              <Button
                                size="icon"
                                variant="outline"
                                onClick={() => {
                                  setModalOpen("edit");
                                  setCategoryName(cat.name)
                                  setCategoryDescription(cat.description)
                                  setCategoryId(cat._id)
                                }}
                              >
                                <Pencil className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Category</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-3">
                                <Label htmlFor="name">Category Name</Label>
                                <Input
                                  id="name"
                                  value={categoryName}
                                  onChange={(e) => setCategoryName(e.target.value)}
                                  placeholder="e.g. Office Supplies"
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label>Description</Label>
                                <Textarea
                                  id="description"
                                  value={categoryDescription}
                                  onChange={(e) => setCategoryDescription(e.target.value)}
                                  placeholder="Enter a brief description..."
                                />
                              </div>
                              <DialogFooter>
                                <Button className="w-full mt-4" onClick={handleEditCategory}>
                                  {loading ? <Loader2 className="animate-spin h-4 w-4" /> : null}
                                  Save Changes
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          {/* Delete */}
                          <Button onClick={handleDeleteCategory(cat._id)} size="icon" variant="destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      )}
                  </TableRow>
                ))}
              {categories?.filter((cat) =>
                cat.name.toLowerCase().includes(search.toLowerCase())
              ).length === 0 && (
                  <TableRow>
                    <TableCell colSpan={isAuthenticated().user && isAuthenticated().user.role === 1 ? 3 : 2} className="text-center">
                      No categories match your search.
                    </TableCell>
                  </TableRow>
                )}
            </TableBody>
          </Table>}
          {loading && <Loader2 className="animate-spin h-16 w-16 m-auto text-muted-foreground" />}
          {!loading && categories?.length === 0 && <div className="p-4 text-center text-muted-foreground">
            <p>No categories found.</p>
            {isAuthenticated().user && isAuthenticated().user.role === 1 && <Button variant="outline" className="mt-4" onClick={() => setModalOpen("add")}>
              <Plus className="mr-2 h-4 w-4" /> Add Category
            </Button>}
          </div>}
          <div className="flex items-center justify-between p-4 border-t">
            <div className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              Items per page:
              <Select
                value={String(itemsPerPage)}
                onValueChange={(value) => {setItemsPerPage(Number(value)); loadCategories(currentPage, Number(value))}}
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

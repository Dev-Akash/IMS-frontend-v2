import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { Package, Warehouse, ShieldCheck, Bell } from "lucide-react" // Importing Lucide Icons

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-4 py-10 text-center text-foreground bg-background">
      {/* Hero Section */}
      <div className="space-y-6 max-w-2xl">
        <div className="flex justify-center">
          <Package className="w-32 h-32 text-foreground" /> {/* Hero Icon */}
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">
          Inventory Management Made Easy
        </h1>
        <p className="text-lg sm:text-xl">
          Track your products, suppliers, warehouses, and staff in one powerful dashboard.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" onClick={() => navigate("/login")}>
            Get Started
          </Button>
          <Button className="text-foreground" size="lg" variant="outline" onClick={() => alert("Contact us")}>
            Contact Us
          </Button>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-16 grid gap-8 text-left sm:grid-cols-2 max-w-5xl w-full">
        <Feature
          title="Real-time Stock Updates"
          description="Get live updates on product stock changes and alerts when items are low."
          icon={<Package className="w-12 h-12 text-blue-500" />}
        />
        <Feature
          title="Multi-Warehouse Support"
          description="Manage inventory across multiple locations seamlessly."
          icon={<Warehouse className="w-12 h-12 text-green-500" />}
        />
        <Feature
          title="Role-Based Access"
          description="Admins control the system; staff manage the stock. Secure and simple."
          icon={<ShieldCheck className="w-12 h-12 text-purple-500" />}
        />
        <Feature
          title="Notifications & Logs"
          description="View activity logs and receive timely alerts about low stock."
          icon={<Bell className="w-12 h-12 text-yellow-500" />}
        />
      </div>
    </div>
  )
}

function Feature({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <div className="p-6 border rounded-xl shadow-lg bg-background text-foreground transition hover:shadow-xl">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-sm mt-2">{description}</p>
    </div>
  )
}

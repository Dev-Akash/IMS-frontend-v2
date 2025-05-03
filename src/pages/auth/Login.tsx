import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { authenticate, isAuthenticated, signIn } from "@/api/auth"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Loader2 } from "lucide-react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const isEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (!email || !password) {
      setError("Please fill in all fields")
      setLoading(false)
      return
    }
    if (!isEmail(email)) {
      setError("Please enter a valid email address")
      setLoading(false)
      return
    }

    signIn(email, password)
      .then((data) => {
        if (data.error) {
          setError(data.error)
          setLoading(false)
          return
        }
        else {
          setError("")
          setLoading(false)

          authenticate(data, () => {
            if (isAuthenticated().user && isAuthenticated().user.role === 1) {
              navigate("/dashboard/admin")
            }
            else {
              navigate("/dashboard/user");
            }
          })
        }
      }).catch((err) => {
        console.error(err)
        setError("An error occurred. Please try again.")
        setLoading(false)
      });
  }

  const onError = () => (
    error && <Alert variant={"destructive"}>
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {error}
      </AlertDescription>
    </Alert>
  );

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-sm shadow-md border-muted">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
          <CardDescription className="text-center text-sm">
            Access your account and manage inventory
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          { onError() }
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button disabled={loading} className="w-full mt-4" onClick={handleSubmit}>
            {loading && <Loader2 className="animate-spin" />}
            Sign In
          </Button>
          <p className="text-xs text-muted-foreground text-center">
            Don’t have an account?{" "}
            <Link to="/signup" className="underline underline-offset-4 hover:text-primary">
              Sign up
            </Link>
          </p>

          <p className="text-xs text-muted-foreground text-center">
            <Link to="/" className="hover:underline underline-offset-4">
              ← Back to Home
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

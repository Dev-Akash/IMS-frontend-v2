import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { useState } from "react"
import { signUp } from "@/api/auth"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, Loader2, ThumbsUp } from "lucide-react"

export default function Signup() {
  const [values, setValues] = useState({
    "name": "",
    "email": "",
    "password": "",
    "rePassword": "",
    "error": "",
    "loading": false,
    "success": false
  });

  const { name, email, password, rePassword, error, loading, success } = values;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.id]: e.target.value});
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setValues({ ...values, error: "", loading: true });

    if (!name || !email || !password || !rePassword) {
      setValues({ ...values, error: "All fields are required", loading: false });
      return;
    }
    if (password !== rePassword) {
      setValues({ ...values, error: "Passwords do not match", loading: false });
      return;
    }
    // Add validation for email format and password strength if needed
    // Example: Basic email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setValues({ ...values, error: "Invalid email format", loading: false });
      return;
    }
    // Example: Basic password strength validation
    if (password.length < 6) {
      setValues({ ...values, error: "Password must be at least 6 characters long", loading: false });
      return;
    }
    // Example: Basic name validation
    if (name.length < 2) {
      setValues({ ...values, error: "Name must be at least 2 characters long", loading: false });
      return;
    }

    signUp(name, email, password)
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            rePassword: "",
            error: "",
            loading: false,
            success: true
          });
        }
      }).catch((error) => {
        console.error("Error during sign-up:", error);
        setValues({ ...values, error: "An error occurred. Please try again.", loading: false });
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

  const onSuccess = () => (
    success && <Alert>
      <ThumbsUp className="h-4 w-4" />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>
        Account created successfully! Please log in.
      </AlertDescription>
    </Alert>
  );

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="shadow-md border-muted w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Create Account</CardTitle>
          <CardDescription className="text-center text-sm">
            Sign up to get access to your inventory dashboard
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {onError()}
          {onSuccess()}
          <div className="space-y-2">
            <Label htmlFor="email">Name</Label>
            <Input id="name" type="text" value={name} onChange={handleChange} placeholder="Full Name" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={handleChange} placeholder="you@example.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={handleChange} placeholder="••••••••" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input id="rePassword" type="password" value={rePassword} onChange={handleChange} placeholder="••••••••" />
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button disabled={loading} className="w-full" onClick={handleSubmit}>
            {loading && <Loader2 className="animate-spin" />}
            Sign Up
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Already have an account?{" "}
            <Link to="/login" className="underline underline-offset-4 hover:text-primary">
              Log in
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

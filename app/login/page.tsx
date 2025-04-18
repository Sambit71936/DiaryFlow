"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional(),
})

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  address: z.string().optional(),
  farmName: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

type LoginFormData = z.infer<typeof loginSchema>
type RegisterFormData = z.infer<typeof registerSchema>

export default function LoginPage() {
  const [userType, setUserType] = useState<"customer" | "farmer">("customer")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  })

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      farmName: "",
    },
  })

  const onLoginSubmit = async (data: LoginFormData) => {
    try {
      setIsLoading(true)
      // TODO: Implement login API call
      console.log("Login data:", { ...data, userType })
      toast({
        title: "Success",
        description: "Logged in successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to login. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const onRegisterSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true)
      // TODO: Implement registration API call
      console.log("Register data:", { ...data, userType })
      toast({
        title: "Success",
        description: "Registered successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to register. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Welcome to DiaryFlow</h2>
        <p className="mt-2 text-center text-sm text-gray-600">Connect with local dairy farmers for fresh products</p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-6">
                <div className="flex justify-center space-x-4 mb-6">
                  <Button
                    type="button"
                    variant={userType === "customer" ? "default" : "outline"}
                    onClick={() => setUserType("customer")}
                    className={userType === "customer" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                  >
                    Customer
                  </Button>
                  <Button
                    type="button"
                    variant={userType === "farmer" ? "default" : "outline"}
                    onClick={() => setUserType("farmer")}
                    className={userType === "farmer" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                  >
                    Farmer
                  </Button>
                </div>

                <div>
                  <Label htmlFor="email">Email address</Label>
                  <div className="mt-1">
                    <Input
                      id="email"
                      {...loginForm.register("email")}
                      type="email"
                      autoComplete="email"
                    />
                  </div>
                  {loginForm.formState.errors.email && (
                    <p className="mt-1 text-sm text-red-600">{loginForm.formState.errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <div className="mt-1">
                    <Input
                      id="password"
                      {...loginForm.register("password")}
                      type="password"
                      autoComplete="current-password"
                    />
                  </div>
                  {loginForm.formState.errors.password && (
                    <p className="mt-1 text-sm text-red-600">{loginForm.formState.errors.password.message}</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      {...loginForm.register("rememberMe")}
                      type="checkbox"
                      className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a href="#" className="font-medium text-emerald-600 hover:text-emerald-500">
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign in"}
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="space-y-6">
                <div className="flex justify-center space-x-4 mb-6">
                  <Button
                    type="button"
                    variant={userType === "customer" ? "default" : "outline"}
                    onClick={() => setUserType("customer")}
                    className={userType === "customer" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                  >
                    Customer
                  </Button>
                  <Button
                    type="button"
                    variant={userType === "farmer" ? "default" : "outline"}
                    onClick={() => setUserType("farmer")}
                    className={userType === "farmer" ? "bg-emerald-600 hover:bg-emerald-700" : ""}
                  >
                    Farmer
                  </Button>
                </div>

                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <div className="mt-1">
                    <Input
                      id="name"
                      {...registerForm.register("name")}
                      type="text"
                      autoComplete="name"
                    />
                  </div>
                  {registerForm.formState.errors.name && (
                    <p className="mt-1 text-sm text-red-600">{registerForm.formState.errors.name.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="reg-email">Email address</Label>
                  <div className="mt-1">
                    <Input
                      id="reg-email"
                      {...registerForm.register("email")}
                      type="email"
                      autoComplete="email"
                    />
                  </div>
                  {registerForm.formState.errors.email && (
                    <p className="mt-1 text-sm text-red-600">{registerForm.formState.errors.email.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="reg-password">Password</Label>
                  <div className="mt-1">
                    <Input
                      id="reg-password"
                      {...registerForm.register("password")}
                      type="password"
                      autoComplete="new-password"
                    />
                  </div>
                  {registerForm.formState.errors.password && (
                    <p className="mt-1 text-sm text-red-600">{registerForm.formState.errors.password.message}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <div className="mt-1">
                    <Input
                      id="confirm-password"
                      {...registerForm.register("confirmPassword")}
                      type="password"
                      autoComplete="new-password"
                    />
                  </div>
                  {registerForm.formState.errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{registerForm.formState.errors.confirmPassword.message}</p>
                  )}
                </div>

                {userType === "customer" && (
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <div className="mt-1">
                      <Input
                        id="address"
                        {...registerForm.register("address")}
                        type="text"
                        autoComplete="street-address"
                      />
                    </div>
                    {registerForm.formState.errors.address && (
                      <p className="mt-1 text-sm text-red-600">{registerForm.formState.errors.address.message}</p>
                    )}
                  </div>
                )}

                {userType === "farmer" && (
                  <>
                    <div>
                      <Label htmlFor="farm-name">Farm Name</Label>
                      <div className="mt-1">
                        <Input
                          id="farm-name"
                          {...registerForm.register("farmName")}
                          type="text"
                        />
                      </div>
                      {registerForm.formState.errors.farmName && (
                        <p className="mt-1 text-sm text-red-600">{registerForm.formState.errors.farmName.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="id-proof">ID Proof</Label>
                      <div className="mt-1">
                        <Input id="id-proof" name="id-proof" type="file" required />
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <Button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    disabled={isLoading}
                  >
                    {isLoading ? "Registering..." : "Register"}
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

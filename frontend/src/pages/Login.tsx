import { useEffect,useRef } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { customizedToast } from "../utils/toast";
// import DotSpinnerLoader from "../components/loader/DotSpinner";
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from "recoil";
import {  tokenAtom, userAtom } from "../store/atoms";

// Define form schema
const loginSchema = z.object({
  teckziteId: z.string().min(1, "Teckzite ID is required"),
  password: z.string().min(1, "Password is required"),
});

// Define TypeScript type from schema
type LoginForm = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
  // const [loading, setLoading] = useRecoilState(loaderAtom);
  const loading = useRef<boolean|undefined>(undefined);
  const setAuthToken = useSetRecoilState(tokenAtom);
  const [user, setUser] = useRecoilState(userAtom);

  useEffect(() => {
    if (user) {
      const redirectPath = localStorage.getItem("redirectPath") || "/";
      navigate(redirectPath);
    }
  }, [ user,navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginForm) => {
    loading.current=true;
    try {
      await new Promise((resolve)=>setTimeout(resolve,3000));
      const response = await axios.post(`${BACKEND_URL}/teckzite/login`, data);
      const { message, token, teckziteId } = response.data;

      localStorage.setItem("token", token);
      setAuthToken(token);
      setUser({ teckziteId });
      localStorage.setItem("user",JSON.stringify({teckziteId}));

      customizedToast({ type: "success", position: "top-center", message });
      const redirectPath = localStorage.getItem("redirectPath") || "/";
      navigate(redirectPath);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        customizedToast({
          type: "error",
          position: "top-center",
          message: error.response?.data?.message || "Some error occurred",
        });
      } else {
        console.error("Unexpected error:", error);
        customizedToast({
          type: "error",
          position: "top-center",
          message: "Something went wrong",
        });
      }
    } finally {
      loading.current=false;
    }
  };

  // if (loading.current) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-[#0f1118] via-[#1a1b25] to-[#23162e]">
      <div className="relative z-10 backdrop-blur-lg bg-white/5 p-10 md:p-14 rounded-2xl border border-white/10 shadow-lg w-[90%] max-w-md transition-all duration-1000 ease-out">
        <div className="flex justify-center mb-8">
          <div className="px-4 py-1 text-xs font-bold tracking-wider text-white/70 bg-white/10 rounded-full mb-2">
            Welcome to AlgoHustle
          </div>
        </div>
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Login</h1>
        </div>
        <Card className="w-full max-w-sm bg-transparent border-none shadow-none">
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Input placeholder="Teckzite ID" {...register("teckziteId")} disabled={loading.current} className="text-gray-300" />
                {errors.teckziteId && <p className="text-red-500 text-sm">{errors.teckziteId.message}</p>}
              </div>
              <div>
                <Input type="password" placeholder="Password" {...register("password")} disabled={loading.current} className="text-gray-300" />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={loading.current}>
                {loading.current ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
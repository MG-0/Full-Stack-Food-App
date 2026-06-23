import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { auth_actions, useAuthStore } from "@/store/authStore";

export const useLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  // Read state from authStore
  const loading = useAuthStore((state) => state.loading);
  const authError = useAuthStore((state) => state.error);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!email || !password) {
      setValidationError("Please fill in all fields.");
      return;
    }

    await auth_actions.login({ email, password });

    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) {
      router.push("/");
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error: validationError || authError,
    handleSubmit,
  };
};

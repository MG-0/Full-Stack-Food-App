import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { auth_actions, useAuthStore } from "@/store/authStore";

export const useRegister = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const loading = useAuthStore((state) => state.loading);
  const authError = useAuthStore((state) => state.error);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!name || !email || !password) {
      setValidationError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setValidationError("Password must be at least 6 characters.");
      return;
    }

    await auth_actions.register({ name, email, password });

    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) {
      router.push("/");
    }
  };

  return {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error: validationError || authError,
    handleSubmit,
  };
};

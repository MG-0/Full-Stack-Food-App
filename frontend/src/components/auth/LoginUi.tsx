"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useLogin } from "./useLogin";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

export default function LoginUi() {
  const t = useTranslations("auth");
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleSubmit,
  } = useLogin();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-md border border-gray-100 p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {t("login_title")}
          </h2>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="email"
            type="email"
            label={t("email")}
            placeholder="example@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            id="password"
            type="password"
            label={t("password")}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit" className="w-full" isLoading={loading}>
            {t("login_btn")}
          </Button>
        </form>

        <div className="text-center text-sm text-gray-500">
          {t("no_account")}{" "}
          <Link href="/auth/register" className="text-orange-600 hover:text-orange-700 font-semibold cursor-pointer">
            {t("sign_up")}
          </Link>
        </div>
      </div>
    </div>
  );
}
export { LoginUi };

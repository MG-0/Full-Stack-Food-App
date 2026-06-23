"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useRegister } from "./useRegister";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

export default function RegisterUi() {
  const t = useTranslations("auth");
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    loading,
    error,
    handleSubmit,
  } = useRegister();

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-md border border-gray-100 p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            {t("register_title")}
          </h2>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            id="name"
            type="text"
            label={t("name")}
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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
            {t("register_btn")}
          </Button>
        </form>

        <div className="text-center text-sm text-gray-500">
          {t("have_account")}{" "}
          <Link href="/auth/login" className="text-orange-600 hover:text-orange-700 font-semibold cursor-pointer">
            {t("sign_in")}
          </Link>
        </div>
      </div>
    </div>
  );
}
export { RegisterUi };

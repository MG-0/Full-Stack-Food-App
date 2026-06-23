"use client";

import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { ICategory } from "@/types/index";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";

interface CategoryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (nameEn: string, nameAr: string) => Promise<void>;
  initialData: ICategory | null;
  loading: boolean;
}

export default function CategoryForm({
  isOpen,
  onClose,
  onSave,
  initialData,
  loading,
}: CategoryFormProps) {
  const t = useTranslations("admin");
  const [nameEn, setNameEn] = useState("");
  const [nameAr, setNameAr] = useState("");

  useEffect(() => {
    if (initialData) {
      setNameEn(initialData.nameEn);
      setNameAr(initialData.nameAr);
    } else {
      setNameEn("");
      setNameAr("");
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nameEn || !nameAr) return;
    onSave(nameEn, nameAr);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? t("edit") : t("add_category")}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="nameEn"
          type="text"
          label="Name (English)"
          placeholder="e.g. Pizza"
          value={nameEn}
          onChange={(e) => setNameEn(e.target.value)}
          required
        />

        <Input
          id="nameAr"
          type="text"
          label="الاسم (عربي)"
          placeholder="مثال: بيتزا"
          value={nameAr}
          onChange={(e) => setNameAr(e.target.value)}
          required
        />

        <div className="flex justify-end space-x-3 rtl:space-x-reverse pt-4 border-t border-gray-100">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" variant="primary" isLoading={loading}>
            {t("save")}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
export { CategoryForm };

"use client";

import { useState } from "react";
import IdeaForm from "@/components/IdeaForm";
import IdeaList from "@/components/IdeaList";
import { useIdeaManager } from "@/utils/useIdeaManager";

export default function Home() {
  const { data, addItem, deleteItem } = useIdeaManager();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    addItem(formData.name, formData.description);

    setFormData({ name: "", description: "" });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-10">
      <div className="max-w-8xl mx-auto">
        <div className="text-center mb-2">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Mini App Idea Recorder
          </h1>
          <p className="text-gray-600 text-lg">
            Create and manage your ideas efficiently
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-6 gap-0 xl:gap-8">
          {/* Left side - 4 columns */}
          <div className="xl:col-span-2">
            <IdeaForm
              formData={formData}
              setFormData={setFormData}
              errors={errors}
              handleSubmit={handleSubmit}
            />
          </div>

          {/* Right side - 6 columns */}
          <div className="xl:col-span-4">
            <IdeaList data={data} deleteItem={deleteItem} />
          </div>
        </div>
      </div>
    </div>
  );
}

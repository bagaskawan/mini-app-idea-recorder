"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface IdeaFormProps {
  formData: {
    name: string;
    description: string;
  };
  setFormData: React.Dispatch<
    React.SetStateAction<{ name: string; description: string }>
  >;
  errors: { [key: string]: string };
  handleSubmit: (e: React.FormEvent) => void;
}

export default function IdeaForm({
  formData,
  setFormData,
  errors,
  handleSubmit,
}: IdeaFormProps) {
  return (
    <Card className="h-fit border-none shadow-none bg-transparent">
      <CardHeader className="pb-6">
        <CardTitle className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
          Tambah Ide
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Nama Ide
            </Label>
            <Input
              id="name"
              placeholder="Masukkan Ide..."
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              className={cn(
                "transition-all duration-200 focus:ring-2 focus:ring-blue-500/20",
                errors.name && "border-red-500 focus:ring-red-500/20"
              )}
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Deskripsi
            </Label>
            <Textarea
              id="description"
              placeholder="Ceritakan bagaimana idenya?"
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className={cn(
                "min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-blue-500/20 resize-none",
                errors.description && "border-red-500 focus:ring-red-500/20"
              )}
            />
            {errors.description && (
              <p className="text-sm text-red-600 mt-1">{errors.description}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
            size="lg"
          >
            Tambah Ide
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

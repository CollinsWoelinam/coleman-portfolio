import { notFound } from "next/navigation";
import { getPhotographById, getCategories } from "@/lib/db/data-store";
import EditPhotographForm from "./EditPhotographForm";

interface EditPageProps {
  params: {
    id: string;
  };
}

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminEditPhotographPage({ params }: EditPageProps) {
  const [photo, categories] = await Promise.all([
    getPhotographById(params.id),
    getCategories(),
  ]);

  if (!photo) {
    notFound();
  }

  return <EditPhotographForm photograph={photo} categories={categories} />;
}


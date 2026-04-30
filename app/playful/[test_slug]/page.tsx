import { notFound } from "next/navigation";
import { findPlayfulTest } from "@/features/playful-test/domain/data/catalog";
import { PlayfulTestPage } from "@/features/playful-test/ui/components/PlayfulTestPage";

type Props = {
  params: Promise<{ test_slug: string }>;
};

export default async function Page({ params }: Props) {
  const { test_slug } = await params;
  const test = findPlayfulTest(test_slug);
  if (!test) notFound();
  return <PlayfulTestPage test={test} />;
}

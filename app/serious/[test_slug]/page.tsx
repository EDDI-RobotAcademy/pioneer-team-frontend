import { notFound } from "next/navigation";
import { findSeriousTest } from "@/features/serious-test/domain/data/catalog";
import { SeriousTestPage } from "@/features/serious-test/ui/components/SeriousTestPage";

type Props = {
  params: Promise<{ test_slug: string }>;
};

export default async function Page({ params }: Props) {
  const { test_slug } = await params;
  const test = findSeriousTest(test_slug);
  if (!test) notFound();
  return <SeriousTestPage test={test} />;
}

import { PresenterShell } from '@/components/PresenterShell';

export default function PresentPage({ params }: { params: { id: string } }) {
  return <PresenterShell id={params.id} />;
}

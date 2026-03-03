import { EditorShell } from '@/components/EditorShell';

export default function PresentationEditorPage({ params }: { params: { id: string } }) {
  return <EditorShell initialId={params.id} />;
}

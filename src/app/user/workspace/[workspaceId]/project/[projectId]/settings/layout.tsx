export default function ProjectSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full w-full justify-center bg-slate-50">
      <div className="w-full max-w-6xl px-8 py-8">
        {children}
      </div>
    </div>
  );
}
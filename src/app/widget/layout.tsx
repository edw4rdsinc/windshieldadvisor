import Script from 'next/script';

export default function WidgetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Plausible Analytics for widget pages */}
      <Script
        defer
        data-domain="windshieldadvisor.info"
        src="https://plausible.io/js/script.js"
      />
      {children}
    </>
  );
}

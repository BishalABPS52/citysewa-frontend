import Link from 'next/link';

export default function TestPage() {
  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Background Image Test Page</h1>
        
        <div className="bg-card p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Light Mode</h2>
          <p className="mb-4">
            This card should show the background image behind it with a subtle opacity.
            The image should be visible as outlines of stupa, temples, dharahara, etc.
          </p>
        </div>
        
        <div className="dark:bg-card p-8 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl font-semibold mb-4">Dark Mode Compatible</h2>
          <p className="mb-4">
            When in dark mode, the background image should adapt with appropriate
            contrast and visibility, appearing as outlines without a red tint.
          </p>
        </div>
        
        <div className="flex justify-center mt-8">
          <Link 
            href="/"
            className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3 rounded-md"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}

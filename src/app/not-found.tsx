import Link from 'next/link'
import { AlertTriangle } from 'lucide-react'
 
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
      <div className="p-6 bg-[hsl(var(--accent))]/10 rounded-full mb-6 animate-pulse">
        <AlertTriangle size={64} className="text-[hsl(var(--accent))]" />
      </div>
      <h1 className="text-6xl font-bold mb-4 font-[family-name:var(--font-heading)]">404</h1>
      <h2 className="text-2xl font-bold mb-6">Power Outage?</h2>
      <p className="text-muted-foreground max-w-md mb-8">
        The page you are looking for has been disconnected or does not exist. Let's get you back to the grid.
      </p>
      <Link 
        href="/" 
        className="px-8 py-3 bg-[hsl(var(--primary))] text-white rounded-xl font-bold hover:bg-blue-800 transition-colors"
      >
        Return Home
      </Link>
    </div>
  )
}
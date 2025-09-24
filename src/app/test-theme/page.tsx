'use client'

export default function TestThemePage() {
  const toggleTheme = () => {
    const html = document.documentElement
    const isDark = html.classList.contains('dark')

    if (isDark) {
      html.classList.remove('dark')
    } else {
      html.classList.add('dark')
    }

    console.log('Theme toggled. Dark mode:', !isDark)
  }

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Theme Switching Test</h1>

        <div className="bg-card border border-border rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4">Test Section</h2>
          <p className="mb-4">This is a test page to verify theme switching works properly.</p>

          <button
            onClick={toggleTheme}
            className="bg-accent text-accent-foreground px-6 py-3 rounded-lg hover:bg-accent/90 transition-colors"
          >
            Toggle Theme
          </button>
        </div>

        <div className="bg-muted border border-border rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-3">Current Theme Status</h3>
          <p className="text-muted-foreground">
            Click the button above to switch between light and dark themes.
          </p>
        </div>
      </div>
    </div>
  )
}
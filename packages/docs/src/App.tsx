import { Button } from '@inz-ui/ui';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-5 py-10">
      <header className="mb-15 text-center text-white">
        <h1 className="mb-4 text-5xl font-bold">INZ UI Component Library</h1>
        <p className="text-lg opacity-90">Vite 기반 모노레포로 구축된 React 컴포넌트 라이브러리</p>
      </header>

      <main className="mx-auto max-w-4xl">
        <section className="rounded-xl bg-white p-10 shadow-2xl">
          <h2 className="mb-8 text-3xl font-bold text-gray-800">Button Component</h2>

          <div className="mb-10">
            <h3 className="mb-4 text-xl font-semibold text-gray-600">Variants</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="mb-4 text-xl font-semibold text-gray-600">Sizes</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="small">Small</Button>
              <Button size="medium">Medium</Button>
              <Button size="large">Large</Button>
            </div>
          </div>

          <div className="mb-10">
            <h3 className="mb-4 text-xl font-semibold text-gray-600">States</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button>Enabled</Button>
              <Button disabled>Disabled</Button>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold text-gray-600">With onClick</h3>
            <div className="flex flex-wrap items-center gap-4">
              <Button onClick={() => alert('Button clicked!')}>Click Me!</Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;

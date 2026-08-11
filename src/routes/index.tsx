import { createFileRoute, Link } from '@tanstack/react-router';
import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { appName } from '@/lib/shared';

export const Route = createFileRoute('/')({
  component: Home,
});

function Home() {
  return (
    <HomeLayout {...baseOptions()}>
      <main className="flex flex-col flex-1 justify-center items-center gap-6 px-4 py-16 text-center">
        <h1 className="text-4xl font-semibold tracking-tight">{appName}</h1>
        <p className="text-fd-muted-foreground max-w-prose">
          A TanStack Start application, with documentation powered by Fumadocs.
        </p>
        <div className="flex flex-row gap-3">
          <Link
            to="/docs/$"
            params={{ _splat: '' }}
            className="px-4 py-2 rounded-lg bg-fd-primary text-fd-primary-foreground font-medium text-sm"
          >
            Read the docs
          </Link>
          <a
            href="https://tanstack.com/start"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 rounded-lg border border-fd-border font-medium text-sm"
          >
            TanStack Start
          </a>
        </div>
      </main>
    </HomeLayout>
  );
}

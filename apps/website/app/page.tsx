import { BlockRenderer } from "@/components/BlockRenderer";
import { pageBuilderQuery, statesQuery } from "@/lib/queries";
import { hasSanityConfig, sanityClient } from "@/lib/sanity";

type State = {
  _id: string;
  name?: string;
};

export default async function Home() {
  if (!hasSanityConfig || !sanityClient) {
    return (
      <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 px-6 py-16">
        <h1 className="text-4xl font-semibold">Website</h1>
        <p className="text-lg text-slate-600">
          Connect this site to the Experience Builder dataset by setting
          NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET.
        </p>
      </main>
    );
  }

  const data = await sanityClient.fetch(pageBuilderQuery, { slug: "home" });

  if (!data) {
    return (
      <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-4 px-6 py-16">
        <h1 className="text-4xl font-semibold">Create a Home Page</h1>
        <p className="text-base text-slate-600">
          Add a Page Builder document with slug "home" in the Experience Builder studio.
        </p>
      </main>
    );
  }

  let states: State[] = [];

  try {
    const result = await sanityClient.fetch<State[]>(statesQuery);
    states = Array.isArray(result) ? result : [];
  } catch {
    states = [];
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-10 px-6 py-16">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-semibold text-slate-900">{data.title ?? "Experience"}</h1>
        {data.summary ? <p className="text-lg text-slate-600">{data.summary}</p> : null}
      </div>
      <BlockRenderer blocks={data.sections ?? []} />
      {states.length > 0 ? (
        <footer className="mt-12 border-t border-slate-200 pt-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">States</p>
          <ul className="mt-3 flex flex-wrap gap-2 text-sm text-slate-700">
            {states.map((state) => (
              <li key={state._id} className="rounded-full bg-slate-100 px-3 py-1">
                {state.name}
              </li>
            ))}
          </ul>
        </footer>
      ) : null}
    </main>
  );
}

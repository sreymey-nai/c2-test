import { Link } from "react-router-dom";
import products from "../assets/data/products.json";

function SmallProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="flex items-center gap-4 rounded-2xl border bg-white p-3 hover:shadow-md transition md:hidden"
    >
      <img
        src={product.images?.[0] ?? "https://placehold.co/600x400"}
        alt={product.title}
        className="h-16 w-16 rounded-xl object-cover flex-shrink-0"
        loading="lazy"
      />
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-center justify-between gap-3 mb-1">
          <div className="truncate font-medium">{product.title}</div>
          <div className="shrink-0 font-semibold">${product.price}</div>
        </div>
        <div className="truncate text-xs text-slate-600">{product.category?.name}</div>
        <p className="text-xs text-slate-600 line-clamp-2">{product.description}</p>
      </div>
    </Link>
  );
}

function BigProductCard({ product }) {
  return (
    <Link
      to={`/products/${product.id}`}
      className="hidden md:flex flex-col rounded-2xl border bg-white p-4 hover:shadow-md transition"
    >
      <img
        src={product.images?.[0] ?? "https://placehold.co/600x400"}
        alt={product.title}
        className="w-full h-48 rounded-xl object-cover mb-3"
        loading="lazy"
      />
      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="truncate font-medium">{product.title}</div>
          <div className="shrink-0 font-semibold">${product.price}</div>
        </div>
        <div className="truncate text-xs text-slate-600 mb-1">{product.category?.name}</div>
        <p className="text-sm text-slate-600 line-clamp-2">{product.description}</p>
      </div>
    </Link>
  );
}

export default function Home() {
  const items = products;

  // Featured: first 4 items
  const featured = items.slice(0, 4);

  // Categories: unique by category.id
  const categories = Array.from(
    new Map(items.map((p) => [p.category.id, p.category])).values()
  );

  // Latest: sort by creationAt desc, take 4
  const latest = [...items]
    .sort(
      (a, b) =>
        new Date(b.creationAt).getTime() - new Date(a.creationAt).getTime()
    )
    .slice(0, 4);

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      {/* Hero Section */}
      <section className="rounded-2xl border bg-white p-5">
        <div className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700">
          New arrivals
        </div>
        <h1 className="mt-3 text-2xl font-semibold leading-tight">
          Discover products you’ll love
        </h1>
        <p className="mt-2 text-sm text-slate-600">
          Browse categories, view latest items, and manage products & users in one simple app.
        </p>
        <div className="mt-4 flex gap-3">
          <Link
            to="/products"
            className="inline-flex flex-1 items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
          >
            Explore products
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="space-y-3">
        <div className="flex items-end justify-between">
          <h2 className="text-lg font-semibold">Featured products</h2>
          <Link to="/products" className="text-sm text-slate-700 underline">
            View all
          </Link>
        </div>

        {/* Show Small Cards on small screens */}
        <div className="space-y-3 md:hidden">
          {featured.map((p) => (
            <SmallProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* Show Big Cards on medium+ screens */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((p) => (
            <BigProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Categories</h2>
        <div className="space-y-3">
          {categories.map((c) => (
            <Link
              key={c.id}
              to="/products"
              className="flex items-center gap-3 rounded-2xl border bg-white p-4 hover:bg-slate-50 transition"
            >
              <img
                src={c.image}
                alt={c.name}
                className="h-12 w-12 rounded-xl object-cover"
                loading="lazy"
              />
              <div className="min-w-0">
                <div className="truncate font-medium">{c.name}</div>
                <div className="text-xs text-slate-600">Tap to browse</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Products */}
      <section className="space-y-3">
        <div className="flex items-end justify-between">
          <h2 className="text-lg font-semibold">Latest products</h2>
          <Link to="/products" className="text-sm text-slate-700 underline">
            View all
          </Link>
        </div>

        {/* Latest Products also small & big cards */}
        <div className="space-y-3 md:hidden">
          {latest.map((p) => (
            <SmallProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="hidden md:flex md:flex-col md:space-y-3">
          {latest.map((p) => (
            <BigProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

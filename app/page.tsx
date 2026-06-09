import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import Image from 'next/image';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default async function Home() {
  const { data: categories } = await supabase.from('categories').select('*');
  const { data: products } = await supabase.from('products').select('*').eq('is_featured', true).limit(8);

  return (
    <div>
      <section className="bg-green-100 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-6">
            Fresh Groceries, <br /> Delivered Fast
          </h1>
          <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Best organic produce, dairy, and bakery items straight to your table.
          </p>
          <Link href="/products" className="bg-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-orange-700 transition-all">
            Shop Now
          </Link>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories?.map((cat) => (
            <Link href={`/products?category=${cat.slug}`} key={cat.id} className="group text-center">
              <div className="relative h-32 w-full mb-4 overflow-hidden rounded-xl bg-gray-100">
                {cat.image_url && (
                  <Image src={cat.image_url} alt={cat.name} fill className="object-cover group-hover:scale-110 transition-transform" unoptimized />
                )}
              </div>
              <h3 className="font-semibold text-gray-800">{cat.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {products?.map((product) => (
              <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow overflow-hidden">
                <div className="relative h-48 w-full bg-gray-100">
                  {product.image_url && (
                    <Image src={product.image_url} alt={product.name} fill className="object-cover" unoptimized />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                  <p className="text-gray-500 text-sm mb-2">{product.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-green-700 font-bold text-xl">${product.price}</span>
                    <button className="bg-green-700 text-white px-3 py-1 rounded text-sm hover:bg-green-800">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
import Link from 'next/link'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function Home() {
  const { data: categories } = await supabase.from('categories').select('*')
  const { data: products } = await supabase.from('products').select('*').limit(8)

  return (
    <div>
      <section className="bg-gradient-to-r from-green-700 to-green-500 py-24 px-4">
        <div className="container mx-auto text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Fresh Groceries 🥦</h1>
          <p className="text-xl mb-8 text-green-100">Organic produce delivered fresh to your door</p>
          <Link href="/products" className="bg-white text-green-700 px-8 py-3 rounded-full font-bold text-lg hover:bg-green-50 transition-all">
            Shop Now →
          </Link>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">Shop by Category</h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {categories?.map((cat) => (
            <Link href={`/products?category=${cat.slug}`} key={cat.id}
              className="flex flex-col items-center p-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-gray-100">
              <div className="w-16 h-16 rounded-full overflow-hidden mb-3 bg-green-50">
                <img src={cat.image_url} alt={cat.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-sm font-semibold text-gray-700">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">Featured Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {products?.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden border border-gray-100">
                <div className="h-48 overflow-hidden bg-gray-50">
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-gray-800 mb-1">{product.name}</h3>
                  <p className="text-gray-400 text-xs mb-3">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-green-700 font-bold text-lg">${product.price}</span>
                    <button className="bg-green-700 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-green-800 transition-colors">
                      + Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="text-4xl mb-4">🚚</div>
            <h3 className="font-bold text-gray-800 mb-2">Free Delivery</h3>
            <p className="text-gray-500 text-sm">On orders above $30</p>
          </div>
          <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="text-4xl mb-4">🌱</div>
            <h3 className="font-bold text-gray-800 mb-2">100% Organic</h3>
            <p className="text-gray-500 text-sm">Fresh from local farms</p>
          </div>
          <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="text-4xl mb-4">⭐</div>
            <h3 className="font-bold text-gray-800 mb-2">Best Quality</h3>
            <p className="text-gray-500 text-sm">Handpicked every morning</p>
          </div>
        </div>
      </section>
    </div>
  )
}
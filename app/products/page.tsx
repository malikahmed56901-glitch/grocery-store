import Image from 'next/image'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default async function ProductsPage() {
  const { data: products } = await supabase.from('products').select('*')
  const { data: categories } = await supabase.from('categories').select('*')

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-green-800">All Products</h1>
      <div className="flex gap-3 flex-wrap mb-8">
        <a href="/products" className="px-4 py-2 rounded-full bg-green-700 text-white text-sm">All</a>
        {categories?.map((cat) => (
          <a key={cat.id} href={`/products?category=${cat.slug}`} className="px-4 py-2 rounded-full border border-green-700 text-green-700 text-sm hover:bg-green-50">{cat.name}</a>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {products?.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow overflow-hidden">
            <div className="relative h-48 w-full bg-gray-100">
              {product.image_url && (<Image src={product.image_url} alt={product.name} fill className="object-cover" unoptimized />)}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-1">{product.name}</h3>
              <p className="text-gray-500 text-sm mb-2">{product.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-green-700 font-bold text-xl">${product.price}</span>
                <button className="bg-green-700 text-white px-3 py-1 rounded text-sm hover:bg-green-800">Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
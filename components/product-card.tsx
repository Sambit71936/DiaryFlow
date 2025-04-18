import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface ProductCardProps {
  image: string
  title: string
  price: number
  farmer: string
  area: string
}

export default function ProductCard({ image, title, price, farmer, area }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="relative h-48">
        <Image src={image || "/placeholder.svg"} alt={title} fill className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{title}</h3>
        <div className="flex justify-between items-center mt-2">
          <span className="text-emerald-600 font-bold">₹{price}/liter</span>
          <span className="text-sm text-gray-500">{area}</span>
        </div>
        <div className="mt-2 text-sm text-gray-600">by {farmer}</div>
        <div className="mt-4 flex gap-2">
          <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">Add to Cart</Button>
          <Link href={`/products/${encodeURIComponent(title.toLowerCase().replace(/\s+/g, "-"))}`} className="flex-1">
            <Button variant="outline" className="w-full">
              View Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

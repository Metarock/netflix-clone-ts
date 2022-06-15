import { CheckIcon, XIcon } from '@heroicons/react/solid'
import { Product } from '@stripe/firestore-stripe-payments'

interface TableProps {
  products: Product[]
  selectedPlan: Product | null
}

const Table = ({ products, selectedPlan }: TableProps) => {
  return (
    <table>
      <tbody className="divide-y divide-[gray]">
        <tr className="tableRow">
          <td className="tableDataTitle">Monthly cost* (New Zealand Dollar)</td>
          {/* map through the product */}
          {products.map((product) => (
            <td
              key={product.id}
              className={`tableDataFeature ${
                selectedPlan?.id === product.id
                  ? 'text-[#e50914]'
                  : 'text-[gray]'
              }`}
            >
              NZ${product.prices[0].unit_amount! / 100}
            </td>
          ))}
        </tr>
        <tr className="tableRow">
          <td className="tableDataTitle">Video Quality</td>
          {/* map through the product */}
          {products.map((product) => (
            <td
              key={product.id}
              className={`tableDataFeature ${
                selectedPlan?.id === product.id
                  ? 'text-[#e50914]'
                  : 'text-[gray]'
              }`}
            >
              {/* metadata is an object */}
              {product.metadata.videoQuality}
            </td>
          ))}
        </tr>

        <tr className="tableRow">
          <td className="tableDataTitle">Resolution</td>
          {/* map through the product */}
          {products.map((product) => (
            <td
              key={product.id}
              className={`tableDataFeature ${
                selectedPlan?.id === product.id
                  ? 'text-[#e50914]'
                  : 'text-[gray]'
              }`}
            >
              {/* metadata is an object */}
              {product.metadata.resolution}
            </td>
          ))}
        </tr>

        <tr className="tableRow">
          <td className="tableDataTitle">
            Watch on your laptop, TV, phone or tablet
          </td>
          {/* map through the product */}
          {products.map((product) => (
            <td
              key={product.id}
              className={`tableDataFeature ${
                selectedPlan?.id === product.id
                  ? 'text-[#e50914]'
                  : 'text-[gray]'
              }`}
            >
              {/* metadata is an object */}
              {/* if true show check, if not then an X icon */}
              {product.metadata.portability === 'true' ? (
                <CheckIcon className="inline-block h-8 w-8" />
              ) : (
                <XIcon className="inline-block h-w w-8" />
              )}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  )
}

export default Table

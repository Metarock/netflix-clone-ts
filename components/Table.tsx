import { Product } from '@stripe/firestore-stripe-payments'

interface TableProps {
  products: Product[]
}

const Table = ({ products }: TableProps) => {
  return (
    <table>
      <tbody className="divide-y divide-[gray]">
        <tr className="tableRow">
          <td className="tableDataTitle">Monthly Price</td>
          {/* map through the product */}
          {products.map((product) => (
            <td key={product.id} className="tableDataFeature">
              ${product.prices[0].unit_amount! / 100} NZD
            </td>
          ))}
        </tr>
        <tr className="tableRow">
          <td className="tableDataTitle">Video Quality</td>
          {/* map through the product */}
          {products.map((product) => (
            <td key={product.id} className="tableDataFeature">
              {/* metadata is an object */}
              {product.metadata.videoQuality}
            </td>
          ))}
        </tr>

        <tr className="tableRow">
          <td className="tableDataTitle">Resolution</td>
          {/* map through the product */}
          {products.map((product) => (
            <td key={product.id} className="tableDataFeature">
              {/* metadata is an object */}
              {product.metadata.videoQuality}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  )
}

export default Table

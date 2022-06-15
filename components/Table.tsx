import { Product } from '@stripe/firestore-stripe-payments'

interface TableProps {
  products: Product[]
}

const Table = ({ products }: TableProps) => {
  return (
    <table>
      <tbody>
        <tr>
          <td>Monthly Price</td>
          {/* map through the product */}
          {products.map((product) => (
            <td key={product.id}>
              ${product.prices[0].unit_amount! / 100} NZD
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  )
}

export default Table

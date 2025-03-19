interface Props{
  productType?: string;
  productName: string;
}
const ProductType: React.FC<Props>
  = ({
       productType = '',
       productName = '',
     }) => {
  return (
    <span>{ productName  }</span>
  )
}

export default ProductType;
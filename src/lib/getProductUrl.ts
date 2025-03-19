export const getProductUrl = ( productUrl: string, productType: string ) => {
  return productUrl || `/product/${ productType }`
}
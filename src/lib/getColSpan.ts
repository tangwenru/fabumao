const getColSpan = ( bigWidthSpan: number, smallWidthSpan: number, iPhoneMaxMediaWidth = 600 ) => {
  return window.innerWidth > iPhoneMaxMediaWidth ? bigWidthSpan : smallWidthSpan;
}

export default getColSpan;
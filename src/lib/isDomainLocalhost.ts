const isDomainLocalhost = () => {
  return /\.?localhost$/i.test( document.location?.hostname );
}

export default isDomainLocalhost;
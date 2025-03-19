const parseUrl = ( url: string ) => {
  const parser = document.createElement('a');
  parser.href = url;

  return {
    protocol: parser.protocol,
    hostname: parser.hostname?.toLocaleLowerCase() || '',
    port: parser.port,
    pathname: parser.pathname,
    search: parser.search,
    hash: parser.hash
  };
}

export default parseUrl;

const getHashShow = (hash = '', showLength = 12, $dotCount = 3) => {
  if (hash.length <= showLength) {
    return hash;
  }

  // console.log('ddddd:', hash);

  let startLength = ~~showLength * 0.5,
    dot = new Array($dotCount + 1).join('·'),
    afterLength = -(showLength - startLength );
  return (
    hash.slice(0, startLength) +
    dot +
    (afterLength < 0 ? hash.slice(afterLength) : '')
  );
}

export default getHashShow;
const  sleep = async (second: number)=> {
  return new Promise<boolean>((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, second);
  });
}

export default sleep;
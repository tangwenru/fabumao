const goTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // 可选，平滑滚动效果
  });
}

export default goTop;
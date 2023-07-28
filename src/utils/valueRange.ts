function valueRange(start: number, end: number) {
  // return new Array(end - start).map((_, i) => start + i);
  return Array.from({ length: end - start + 1 }, (_, i) => i + start);
}

export default valueRange;

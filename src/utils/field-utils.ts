export function getFieldSize(): { xMax: number; yMax: number } {
  const field = document.querySelector('#field > .markup');
  if (field) {
    return {
      xMax: field.clientWidth,
      yMax: field.clientHeight,
    };
  }
  return {
    xMax: 0,
    yMax: 0,
  };
}

type Indexed<T = unknown> = {
  [key in string]: T;
};
  
function isObject(value: unknown): value is Indexed {
  return value !== null && typeof value === 'object';
}
  
function merge(lhs: Indexed, rhs: Indexed): Indexed {
  for (const p in rhs) {
    if (!rhs.hasOwnProperty(p)) {
      continue;
    }
  
    try {
      if (isObject(rhs[p])) {
        rhs[p] = merge(lhs[p] as Indexed, rhs[p]);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }
  
  return lhs;
}
  
export default merge;

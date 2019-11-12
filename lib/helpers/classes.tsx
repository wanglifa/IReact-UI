function classes(...names: (string | undefined)[]) {
  return names.filter(name => Boolean(name)).filter((name1) => {
    return name1!.indexOf('undefined') < 0;
  }).join(' ');
}

export default classes;
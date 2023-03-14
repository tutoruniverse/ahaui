const requireSVG = (category, name) =>
  require(`../assets/${category}/${name}.svg`);

const requireFileList = (category) =>
  require(`../assets/${category}/DO_NOT_REMOVE.fileList`);

export const requireAllSVGs = (category) => {
  const fileNames = requireFileList(category);
  const shortFileNames = fileNames
    .map((fileName) => fileName.split('.'))
    // eslint-disable-next-line no-unused-vars
    .filter(([fileName, ext]) => ext === 'svg')
    .map(([fileName]) => fileName);
  return shortFileNames.map((fileName) => ({
    path: requireSVG(category, fileName),
    metadata: {
      name: fileName,
      category,
    },
  }));
};

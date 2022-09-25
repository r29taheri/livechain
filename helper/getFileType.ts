export const getFileType = (type: string) => {
  if (type.includes('image')) {
    return 'image';
  } else if (type.includes('video')) {
    return 'video';
  }

  return 'image';
};

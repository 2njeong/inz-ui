const MAX_FILE_SIZE_MB = 15;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const validateTotalFileSize = (files: File[], uploadedContentsSize: number = 0): boolean => {
  const newFilesSize = files.reduce((sum, file) => sum + file.size, 0);
  const totalSize = uploadedContentsSize + newFilesSize;
  return totalSize <= MAX_FILE_SIZE_BYTES;
};

interface CanUploadContentParams {
  newFiles: FileList | null;
  currentResources: (string | File)[];
  uploadedContentsSize: number;
}
export const canUploadContent = (params: CanUploadContentParams) => {
  const newFilesArray = Array.from(params.newFiles || []);
  const currentNewFiles = params.currentResources.filter(
    (item): item is File => item instanceof File
  );
  const allNewFiles = [...currentNewFiles, ...newFilesArray];
  const canUpload = validateTotalFileSize(allNewFiles, params.uploadedContentsSize);

  return { canUpload };
};

export const handleError = (res, error, message = 'Error interno del servidor') => {
  console.error(error);
  res.status(500).json({ status: 'error', message });
};

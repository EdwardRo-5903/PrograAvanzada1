export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      console.error('Token no proporcionado');
      return res.status(401).json({ message: 'No se proporcionó un token de autenticación' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error en el middleware de autenticación:', error.message);
    res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
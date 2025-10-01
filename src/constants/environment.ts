// ========================================
// ACCESO A VARIABLES DE ENTORNO
// ========================================

// URLs y endpoints
export const API_BASE_URL: string = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';
export const WEB_URL: string = process.env.REACT_APP_WEB_URL || 'http://localhost:3000';

// Base de datos
export const DB_HOST: string = process.env.REACT_APP_DB_HOST || 'localhost';
export const DB_PORT: number = parseInt(process.env.REACT_APP_DB_PORT || '5432', 10);
export const DB_NAME: string = process.env.REACT_APP_DB_NAME || 'healthapp_db';
export const DB_USER: string = process.env.REACT_APP_DB_USER || 'healthapp_user';

// Autenticación
export const JWT_SECRET: string = process.env.REACT_APP_JWT_SECRET_KEY || 'default-secret';
export const SESSION_TIMEOUT: number = parseInt(process.env.REACT_APP_SESSION_TIMEOUT || '3600', 10);

// Configuración del entorno
export const NODE_ENV: string = process.env.NODE_ENV || 'development';
export const IS_DEVELOPMENT: boolean = process.env.NODE_ENV === 'development';
export const IS_PRODUCTION: boolean = process.env.NODE_ENV === 'production';
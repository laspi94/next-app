-- This is an empty migration.
ALTER TABLE public.users RENAME COLUMN forzar_cambio_clave TO force_password_change;
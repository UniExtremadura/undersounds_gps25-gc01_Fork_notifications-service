#!/bin/sh
# wait-for-db.sh

set -e

host="$1"
shift
user="$2"  # ✅ AGREGAR usuario
shift
password="$3"  # ✅ AGREGAR contraseña
shift
cmd="$@"

echo "⏳ Esperando a que la base de datos $host esté disponible..."

until mysql -h "$host" -u "$user" -p"$password" -e "SELECT 1" >/dev/null 2>&1; do
  echo "⏳ Base de datos no disponible todavía, esperando 2 segundos..."
  sleep 2
done

echo "✅ Base de datos lista, ejecutando comando..."
exec $cmd
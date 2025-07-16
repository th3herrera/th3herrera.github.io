# Guía: Creación de un Escáner de Puertos en Bash

¡Hola! Soy [Tu Nombre], y en esta guía te llevaré paso a paso a través del proceso de creación de mi proyecto **Escáner de Puertos**, compuesto por dos scripts en Bash: `port_scan.sh` y `host_scan.sh`. Estos scripts permiten detectar puertos abiertos en un host o una red local, y aquí te explicaré cómo los desarrollé, cómo funcionan, y cómo puedes entender su lógica. Este proyecto refleja mi pasión por el scripting y las redes, y espero que esta guía te inspire a explorar estos temas. ¡Vamos allá!

## ¿Qué es el Escáner de Puertos?
El **Escáner de Puertos** es un conjunto de herramientas en Bash que identifican puertos abiertos en un host (como una IP o dominio) o en una red local. Los puertos son como "puertas" en un sistema que permiten la comunicación de red, y saber cuáles están abiertos es útil para administradores de sistemas o entusiastas de la ciberseguridad (¡siempre con permiso, claro!).

- **`port_scan.sh`**: Escanea todos los puertos (1–65535) de un host específico.
- **`host_scan.sh`**: Escanea puertos comunes (21, 22, 23, 25, 80, 139, 443, 445, 8080) en una red local (por ejemplo, 192.168.1.0/24).

## Paso a Paso: Cómo Creé los Scripts

### 1. Definir el Objetivo
Quería crear una herramienta simple pero poderosa para escanear puertos, usando solo Bash para demostrar que no siempre se necesitan lenguajes complejos para tareas de red. Mi objetivo era:
- Hacer scripts fáciles de usar.
- Asegurarme de que fueran seguros y eficientes.
- Incluir validación de entradas y manejo de errores.

### 2. Configurar el Manejo de Interrupciones
Lo primero que hice fue asegurarme de que los scripts pudieran manejarse de forma limpia si el usuario presiona Ctrl+C. Para esto:
- Usé la función `trap` para capturar la señal `SIGINT` (que se genera con Ctrl+C).
- Creé una función `ctrl_c` que muestra un mensaje de salida y restaura el cursor de la terminal con `tput cnorm`.

```bash
function ctrl_c() {
    echo -e "\n\n[!] Saliendo...\n"
    tput cnorm
    exit 1
}
trap ctrl_c SIGINT
```

### 3. Diseñar la Lógica del Escaneo
Para verificar si un puerto está abierto, usé la funcionalidad de `/dev/tcp` en Bash, que permite intentar una conexión TCP a un host y puerto específico. Si la conexión es exitosa, el puerto está abierto. La lógica básica es:
- Intentar conectar a `/dev/tcp/<host>/<puerto>`.
- Si el comando tiene éxito (`$? -eq 0`), el puerto está abierto.
- Usar `timeout` para limitar el tiempo de espera y evitar bloqueos.

Por ejemplo, en `port_scan.sh`, la función `checkPort` es:

```bash
function checkPort() {
    timeout 1 bash -c "exec 3<> /dev/tcp/$1/$2" 2>/dev/null
    if [ $? -eq 0 ]; then
        echo "[+] Host $1 - Puerto $2 (ABIERTO)"
    fi
    exec 3<&-
    exec 3>&-
}
```

### 4. Escanear Múltiples Puertos
Para `port_scan.sh`, quería escanear todos los puertos (1–65535). Creé un arreglo con `seq`:

```bash
declare -a ports=( $(seq 1 65535) )
```

Luego, usé un bucle `for` para iterar sobre cada puerto y ejecutar `checkPort` en segundo plano (`&`) para acelerar el proceso. Sin embargo, lanzar 65,535 procesos simultáneamente podía sobrecargar el sistema, así que añadí un límite de concurrencia (`max_jobs`):

```bash
max_jobs=100
job_count=0
for port in "${ports[@]}"; do
    checkPort "$host" "$port" &
    ((job_count++))
    if [ $job_count -ge $max_jobs ]; then
        wait -n
        ((job_count--))
    fi
done
```

### 5. Escanear una Red Local
Para `host_scan.sh`, el enfoque fue escanear puertos comunes en todos los hosts de una red (por ejemplo, 192.168.1.1–254). Definí un arreglo con puertos comunes:

```bash
declare -a ports=(21 22 23 25 80 139 443 445 8080)
```

Luego, usé un bucle anidado para iterar sobre los hosts (1–254) y los puertos, aplicando la misma lógica de `/dev/tcp` y límite de concurrencia.

### 6. Añadir Validación de Entrada
Para evitar errores, incluí validación:
- En `port_scan.sh`, verifico que se proporcione un host y que sea una IP o dominio válido usando expresiones regulares.
- En `host_scan.sh`, verifico que la red tenga el formato correcto (por ejemplo, `192.168.1`).

Ejemplo de validación en `port_scan.sh`:

```bash
if [ -z "$1" ]; then
    echo -e "\n[!] Uso: $0 <host>\nEjemplo: $0 192.168.1.1\n"
    tput cnorm
    exit 1
fi
if ! [[ $1 =~ ^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$ ]] && ! [[ $1 =~ ^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$ ]]; then
    echo -e "\n[!] Error: Introduce una IP válida (ej. 192.168.1.1) o un dominio (ej. example.com)\n"
    tput cnorm
    exit 1
fi
```

### 7. Mejorar la Interfaz
Para que los scripts fueran más amigables, oculté el cursor de la terminal con `tput civis` durante la ejecución y lo restauré al final con `tput cnorm`. También aseguré que los mensajes de salida fueran claros, como:

```
[+] Host 192.168.1.1 - Puerto 80 (ABIERTO)
```

## ¿Cómo Funcionan los Scripts?

1. **Inicio**:
   - El usuario ejecuta el script con un argumento (host para `port_scan.sh`, red para `host_scan.sh`).
   - El script valida el argumento para asegurarse de que es correcto.

2. **Escaneo**:
   - Para cada puerto (o host y puerto), el script intenta una conexión TCP usando `/dev/tcp`.
   - Si la conexión es exitosa, se imprime un mensaje indicando que el puerto está abierto.
   - Los procesos se ejecutan en segundo plano, pero con un límite para no sobrecargar el sistema.

3. **Finalización**:
   - El script espera a que todos los procesos terminen (`wait`).
   - Restaura el cursor y termina limpiamente.

## Cómo Integrar esto en tu Portfolio Web

Si quieres mostrar este proyecto en tu portfolio como yo lo hice, aquí tienes algunos consejos:

1. **Crear una Sección Dedicada**:
   - Añade una sección en tu portfolio titulada "Escáner de Puertos en Bash".
   - Usa este texto como base, adaptándolo a tu estilo personal.

2. **Mostrar el Código**:
   - Sube los scripts a un repositorio público en GitHub: [enlace a tu repositorio].
   - Incluye un botón en tu sitio web que diga "Ver código en GitHub".
   - Muestra un fragmento de código destacado, como el de la función `checkPort`, usando una librería como Prism.js para resaltado de sintaxis.

3. **Añadir Visuales**:
   - Toma una captura de pantalla de la salida del script (por ejemplo, puertos abiertos en una terminal) y añádela a tu página.
   - Ejemplo de salida:
     ```
     [+] Host 192.168.1.1 - Puerto 80 (ABIERTO)
     [+] Host 192.168.1.1 - Puerto 443 (ABIERTO)
     ```

4. **Explicar el Uso**:
   - Incluye instrucciones claras para que otros puedan probar los scripts:
     ```bash
     chmod +x port_scan.sh
     ./port_scan.sh 192.168.1.1
     chmod +x host_scan.sh
     ./host_scan.sh 192.168.1
     ```

5. **Nota Ética**:
   - Aclara que el escaneo de puertos debe hacerse solo con permiso explícito:
     > **Importante**: Este script es para fines educativos y debe usarse solo en redes o hosts donde tengas autorización. Escanear sin permiso puede ser ilegal.

## Lo Que Aprendí
Desarrollar este proyecto me enseñó:
- Cómo usar Bash para tareas de red sin depender de herramientas externas como `nmap`.
- La importancia de optimizar scripts para evitar consumir demasiados recursos.
- Cómo validar entradas y manejar errores para crear herramientas robustas.
- La relevancia de la ética en proyectos relacionados con redes y ciberseguridad.

## ¡Pruébalo!
Puedes descargar los scripts desde mi [repositorio de GitHub](https://github.com/tu_usuario/port-scanner) y probarlos en un entorno Linux con permisos adecuados. Si tienes dudas o quieres aprender más sobre scripting o redes, ¡contáctame!

**Nota Final**: Este proyecto es una muestra de mi capacidad para combinar programación y conocimientos de redes. ¡Espero que esta guía te haya ayudado a entender cómo lo construí y cómo funciona!
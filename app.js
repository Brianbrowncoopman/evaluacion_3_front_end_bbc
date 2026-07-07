const { createApp } = Vue;

createApp({
    data() {
        return {
            tab: 'notas',
            // Datos para Notas
            n1: '', n2: '', n3: '', asistencia: '',
            resultado: { mensaje: '', clase: '' },
            // Datos para Registro
            nombre: '', correo: '', pass: '', pass2: '',
            errores: { nombre: '', correo: '', pass: '' }
        };
    },
    
    computed: {
        // Validación para habilitar/deshabilitar botón de Cálculo
        esValido() {
            const v1 = parseFloat(this.n1);
            const v2 = parseFloat(this.n2);
            const v3 = parseFloat(this.n3);
            const asis = parseFloat(this.asistencia);

            // Retorna true solo si todos los valores están en el rango correcto
            return (v1 >= 10 && v1 <= 70) && 
                   (v2 >= 10 && v2 <= 70) && 
                   (v3 >= 10 && v3 <= 70) && 
                   (asis >= 1 && asis <= 100);
        }
    },

    watch: {
        // Validaciones en tiempo real para Registro
        nombre(val) {
            this.errores.nombre = /[^a-zA-Z\s]/.test(val) ? "No se permiten números ni símbolos" : "";
        },
        correo(val) {
            this.errores.correo = !/^[^\s@]+@[^\s@]+\.(com|cl|arg|net|org)$/.test(val) 
                ? "Correo debe tener formato válido y terminar en .com, .cl, .arg, etc." : "";
        },
        pass(val) {
            const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
            this.errores.pass = !regexPass.test(val) 
                ? "Mínimo 10 carac, debe incluir: Mayús, minús, números y caracteres especiales (@$!%*?&)" : "";
        }
    },

    methods: {
        calcular() {
            // Conversión a números
            let n1 = parseFloat(this.n1);
            let n2 = parseFloat(this.n2);
            let n3 = parseFloat(this.n3);
            let asis = parseFloat(this.asistencia);

            // Cálculo ponderado
            let promedio = (n1 * 0.35) + (n2 * 0.35) + (n3 * 0.30);
            let esAprobado = (promedio >= 40 && asis >= 80);

            // Asignación de resultado con clase CSS para el fondo
            this.resultado = {
                mensaje: `Promedio: ${promedio.toFixed(1)} - Estado: ${esAprobado ? 'APROBADO' : 'REPROBADO'}`,
                clase: esAprobado ? 'bg-success' : 'bg-danger'
            };
        },

        registrar() {
            // Verificación final antes de registrar
            if (!this.errores.nombre && !this.errores.correo && !this.errores.pass && 
                this.pass === this.pass2 && this.nombre !== '' && this.correo !== '') {
                alert("El registro se ha realizado correctamente");
            } else {
                alert("Error en el formulario. Por favor, verifique que todos los campos sean correctos y las contraseñas coincidan.");
            }
        }
    }
}).mount('#app');
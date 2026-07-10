const { createApp } = Vue;

createApp({
    //data para almacenar los valores de los inputs y los errores de validación
    data() {
        return {
            tab: 'notas',
            busqueda: '', 
            n1: '', n2: '', n3: '', asistencia: '',
            resultado: { mensaje: '', clase: '' },
            nombre: '', correo: '', pass: '', pass2: '',
            errores: { nombre: '', correo: '', pass: '', passMatch: '' }
        };
    },
    //metodos para validar los inputs de notas y asistencia
    computed: {
        esValido() {
            // Validación de notas y asistencia
            const v1 = parseFloat(this.n1), v2 = parseFloat(this.n2), v3 = parseFloat(this.n3), asis = parseFloat(this.asistencia);
            // Verifica que las notas estén entre 10 y 70 y la asistencia entre 1 y 100
            return (v1 >= 10 && v1 <= 70) && (v2 >= 10 && v2 <= 70) && (v3 >= 10 && v3 <= 70) && (asis >= 1 && asis <= 100);
        }
    },

    //metodos para validar los inputs de registro en tiempo real
    watch: {
        // Validaciones en tiempo real para input de registro
        nombre(val) {
            this.errores.nombre = (val !== '' && /[^a-zA-Z\s]/.test(val)) ? "No se permiten números ni símbolos" : "";
        },
        // Validación de correo electrónico con expresión regular
        correo(val) {
            this.errores.correo = (val !== '' && !/^[^\s@]+@[^\s@]+\.(com|cl|arg|net|org)$/.test(val)) 
                ? "Correo debe tener formato válido y terminar en .com, .cl, .arg, etc." : "";
        },
        // Validación de contraseña con expresión regular
        pass(val) {
            const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
            this.errores.pass = (val !== '' && !regexPass.test(val)) ? "Mínimo 10 carac, mayús, minús, números y símbolos" : "";
            this.errores.passMatch = (this.pass2 !== '' && this.pass !== this.pass2) ? "Las contraseñas no coinciden" : "";
        },
        // Validación de coincidencia de contraseñas
        pass2(val) {
            this.errores.passMatch = (this.pass !== val) ? "Las contraseñas no coinciden" : "";
        }
    },

    methods: {
        //metodo para limpiar los inputs del formulario de registro
        limpiarFormulario() {
            this.nombre = '';
            this.correo = '';
            this.pass = '';
            this.pass2 = '';
            this.errores = { nombre: '', correo: '', pass: '', passMatch: '' };
        },
        //metodo para navegar entre las pestañas de notas y registro
        navegar() {
            let input = this.busqueda.toLowerCase().trim();
            if (input.includes('notas')) this.tab = 'notas';
            else if (input.includes('calculo')) this.tab = 'notas';
            else if (input.includes('registro')) this.tab = 'registro';
            else alert("Página no encontrada. Prueba con 'notas' o 'registro'");
        },
        //metodo para calcular el promedio y determinar si aprueba o reprueba
        calcular() {
            let n1 = parseFloat(this.n1), n2 = parseFloat(this.n2), n3 = parseFloat(this.n3), asis = parseFloat(this.asistencia);
            let prom = (n1 * 0.35) + (n2 * 0.35) + (n3 * 0.30);
            let apr = (prom >= 40 && asis >= 80);
            this.resultado = { mensaje: `Promedio: ${prom.toFixed(1)} - ${apr ? 'APROBADO' : 'REPROBADO'}`, clase: apr ? 'bg-success' : 'bg-danger' };
        },
        //metodo para registrar el usuario si no hay errores en el formulario
        registrar() {
            if (!this.errores.nombre && !this.errores.correo && !this.errores.pass && !this.errores.passMatch && this.pass !== '' && this.nombre !== '') {
                alert("Registro exitoso");
                this.limpiarFormulario(); 
            } else {
                alert("Por favor, corrija los errores del formulario antes de registrar.");
            }
        }
    }
}).mount('#app');
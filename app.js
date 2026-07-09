const { createApp } = Vue;

createApp({
    data() {
        return {
            tab: 'notas',
            busqueda: '', // Nueva variable para el input
            n1: '', n2: '', n3: '', asistencia: '',
            resultado: { mensaje: '', clase: '' },
            nombre: '', correo: '', pass: '', pass2: '',
            errores: { nombre: '', correo: '', pass: '' }
        };
    },
    computed: {
        esValido() {
            const v1 = parseFloat(this.n1), v2 = parseFloat(this.n2), v3 = parseFloat(this.n3), asis = parseFloat(this.asistencia);
            return (v1 >= 10 && v1 <= 70) && (v2 >= 10 && v2 <= 70) && (v3 >= 10 && v3 <= 70) && (asis >= 1 && asis <= 100);
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
        navegar() {
            let input = this.busqueda.toLowerCase().trim();
            if (input.includes('notas')) this.tab = 'notas';
            else if (input.includes('calculo')) this.tab = 'notas';
            else if (input.includes('registro')) this.tab = 'registro';
            else alert("Página no encontrada. Prueba con 'notas' o 'registro'");
        },
        calcular() {
            let n1 = parseFloat(this.n1), n2 = parseFloat(this.n2), n3 = parseFloat(this.n3), asis = parseFloat(this.asistencia);
            let prom = (n1 * 0.35) + (n2 * 0.35) + (n3 * 0.30);
            let apr = (prom >= 40 && asis >= 80);
            this.resultado = { mensaje: `Promedio: ${prom.toFixed(1)} - ${apr ? 'APROBADO' : 'REPROBADO'}`, clase: apr ? 'bg-success' : 'bg-danger' };
        },
        
        registrar() {
            if (this.pass === this.pass2 && this.nombre !== '') alert("Registro exitoso");
            else alert("Error en el formulario");
        }
    }
}).mount('#app');
import { PlanetaBase } from "./planeta-base.js";

class Planeta extends PlanetaBase {
    constructor(nombre, tamano, masa, tipo, distanciaAlSol, presentaVida, presentaAnillo, composicionAtmosferica) {
        super(nombre, tamano, masa, tipo);
        this.distanciaAlSol = distanciaAlSol;
        this.presentaVida = presentaVida;
        this.presentaAnillo = presentaAnillo;
        this.composicionAtmosferica = composicionAtmosferica;
    }

    verify() {

        const baseVerifications = super.verify();
        if (!baseVerifications.success) {
            return baseVerifications;
        }

        const errores = [];

        const checkDistanciaAlSol = this.checkDistanciaAlSol();
        if (!checkDistanciaAlSol.success) {
            errores.push(checkDistanciaAlSol.rta);
        }

        const checkComposicionAtmosferica = this.checkComposicionAtmosferica();
        if (!checkComposicionAtmosferica.success) {
            errores.push(checkComposicionAtmosferica.rta);
        }

        return errores.length === 0 ? {success: true, errores: null} : {success: false, errores};
    }

    checkDistanciaAlSol() {
        if (typeof this.distanciaAlSol !== "number" || isNaN(this.distanciaAlSol) || this.distanciaAlSol <= 0) {
            return {success: false, rta: "La distancia al Sol debe ser un numero positivo."};
        }
        return {success: true, rta: ""};
    }

    checkComposicionAtmosferica() {
        if (typeof this.composicionAtmosferica !== "string") {
            return { success: false, rta: "La composicion atmosferica debe ser un texto." };
        }
    
        if (this.composicionAtmosferica.trim() === "") {
            return { success: true, rta: "" };
        }
    
        if (this.composicionAtmosferica.length < 7) {
            return { success: false, rta: "Composicion atmosferica demasiado corta! (minimo 7 caracteres)" };
        }
    
        if (this.composicionAtmosferica.length > 100) {
            return { success: false, rta: "Composicion atmosferica demasiado larga! (maximo 100 caracteres)" };
        }
    
        return { success: true, rta: "" };
    }
}

export {Planeta};
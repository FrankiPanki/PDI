export default class Practica2 {
    constructor(modelo) {
        this.modelo = modelo;
    }

    getColorIndex(x, y, width) {
        let color_pos = x * 4 + y * (width * 4);
        return { R: color_pos, G: color_pos + 1, B: color_pos + 2, A: color_pos + 3 };
    }

    apply_convolution(matrix) {
        let imageData = this.modelo.context.getImageData(0, 0, this.modelo.canvas.width, this.modelo.canvas.height);
        let new_imageData = this.modelo.context.createImageData(this.modelo.canvas.width, this.modelo.canvas.height);

        let margin_x = Math.floor(matrix.size_n / 2);
        let margin_y = Math.floor(matrix.size_m / 2);
        let entry_x, entry_y;
        let color_index;
        let new_color;

        for (let i = margin_x; i < this.modelo.canvas.width - margin_x; i++) {
            for (let j = margin_y; j < this.modelo.canvas.height - margin_y; j++) {
                new_color = { R: 0, G: 0, B: 0 };

                for (let entry = 0; entry < matrix.values.length; entry++) {
                    entry_x = (entry % matrix.size_n) - margin_x;
                    entry_y = Math.floor(entry / matrix.size_n) - margin_y;

                    color_index = this.getColorIndex(i + entry_x, j + entry_y, this.modelo.canvas.width);

                    new_color.R += imageData.data[color_index.R] * matrix.values[entry];
                    new_color.G += imageData.data[color_index.G] * matrix.values[entry];
                    new_color.B += imageData.data[color_index.B] * matrix.values[entry];
                }

                color_index = this.getColorIndex(i, j, this.modelo.canvas.width);
                new_imageData.data[color_index.R] = new_color.R;
                new_imageData.data[color_index.G] = new_color.G;
                new_imageData.data[color_index.B] = new_color.B;
                new_imageData.data[color_index.A] = imageData.data[color_index.A];
            }
        }

        this.modelo.aux_context.putImageData(new_imageData, 0, 0);
        this.modelo.putImage(this.modelo.aux_canvas);
    }

    blur() {
        let matrix = {
            values:
                [
                    0.077847, 0.123317, 0.077847,
                    0.123317, 0.195346, 0.123317,
                    0.077847, 0.123317, 0.077847
                ],
            size_n: 3, size_m: 3
        }

        this.apply_convolution(matrix);
    }
    motion_blur() {
        let matrix = {
            values:
                [
                    1/9, 0, 0, 0, 0, 0, 0, 0, 0,
                    0, 1/9, 0, 0, 0, 0, 0, 0, 0,
                    0, 0, 1/9, 0, 0, 0, 0, 0, 0,
                    0, 0, 0, 1/9, 0, 0, 0, 0, 0,
                    0, 0, 0, 0, 1/9, 0, 0, 0, 0,
                    0, 0, 0, 0, 0, 1/9, 0, 0, 0,
                    0, 0, 0, 0, 0, 0, 1/9, 0, 0,
                    0, 0, 0, 0, 0, 0, 0, 1/9, 0,
                    0, 0, 0, 0, 0, 0, 0, 0, 1/9
                ],
            size_n: 9, size_m: 9
        }

        this.apply_convolution(matrix);
    }
    encontrar_bordes() {
        let matrix = {
            values:
                [
                    0,  0, -1,  0,  0,
                    0,  0, -1,  0,  0,
                    0,  0,  2,  0,  0,
                    0,  0,  0,  0,  0,
                    0,  0,  0,  0,  0
                ],
            size_n: 5, size_m: 5
        }

        this.apply_convolution(matrix);
    }
    sharpen() {
        let matrix = {
            values:
                [
                    1,  1,  1,
                    1, -7,  1,
                    1,  1,  1
                ],
            size_n: 3, size_m: 3
        }

        this.apply_convolution(matrix);
    }
    emboss() {
        let matrix = {
            values:
                [
                    -1, -1, -1, -1,  0,
                    -1, -1, -1,  0,  1,
                    -1, -1,  0,  1,  1,
                    -1,  0,  1,  1,  1,
                     0,  1,  1,  1,  1
                ],
            size_n: 5, size_m: 5
        }

        this.apply_convolution(matrix);
    }
    promedio() {
        let matrix = {
            values:
                [
                    1/9, 1/9, 1/9,
                    1/9, 1/9, 1/9,
                    1/9, 1/9, 1/9
                ],
            size_n: 3, size_m: 3
        }

        this.apply_convolution(matrix);
    }




    mediana() {
        let imageData = this.modelo.context.getImageData(0, 0, this.modelo.canvas.width, this.modelo.canvas.height);
        //Se definen las variables auxiliares.
        let rad = 3/2, r=[], g=[], b=[];
         // Se recorre la matriz para calcular los nuevos colores.
        for (let x = 0; x < this.modelo.canvas.width; x++) {
            // Se definen los limites horizontales de la matriz segun la posicion del pixel actual.
            let xi = (x < rad)? rad - x : 0, xf = ((this.modelo.canvas.width - x) <= rad)? rad + this.modelo.canvas.width - x : 3;
            for (let y = 0; y < this.modelo.canvas.height; y++){
                // Se definen los limites verticales de la matriz segun la posicion del pixel actual.
                let yi = (y < rad)? rad - y : 0, yf = ((this.modelo.canvas.height - y) <= rad)? rad + this.modelo.canvas.height - y : 3;
                // Se definen los arreglos auxiliares de color para calcular la mediana de cada componente.
                r = [(xf - xi) * (yf - yi)]; g = [r.length]; b = [r.length];
                for (let i = 0, px = x - rad; (i + xi) < xf; i++) {
                    for (let j = 0, py = y - rad; (j + yi) < yf; j++) {

                        let pixel = this.getColorIndex( px + i + xi, py + j + yi, this.modelo.canvas.width);
                        r[j + (yf - yi) * i]=imageData.data[pixel.R];
                        g[j + (yf - yi) * i] =imageData.data[pixel.G];
                        b[j + (yf - yi) * i]=imageData.data[pixel.B];


                    }
                }
                let color_index = this.getColorIndex(x, y, this.modelo.canvas.width);
                imageData.data[color_index.R] = this.mediana_aux(r);
                imageData.data[color_index.G] = this.mediana_aux(g);
                imageData.data[color_index.B] = this.mediana_aux(b);

            }
        } 
        this.modelo.aux_context.putImageData(imageData, 0, 0);
        this.modelo.putImage(this.modelo.aux_canvas);
    }
    
    mediana_aux(x) {
        let xn = x.length, m = -1;
        for (let i = 0, j = 0; i <= (xn / 2); i++, j = i) {
            for (let k = i + 1; k < xn; k++) { if(x[j] > x[k]) j = k; }
            m = x[j]; x[j] = x[i]; x[i] = m;
        } 
        if((xn % 2) == 0) return (m + x[xn / 2 - 1]) / 2;
        return m;
    }

}
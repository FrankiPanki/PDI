export default class Practica4 {
    constructor(modelo) {
        this.modelo = modelo;
    }


    getColorIndex(x, y, width) {
        let color_pos = x * 4 + y * (width * 4);
        return { R: color_pos, G: color_pos + 1, B: color_pos + 2, A: color_pos + 3 };
    }

    // marca
    marcaAgua(alfa, texto) {
        let new_imageData = this.modelo.context.getImageData(0, 0, this.modelo.canvas.width, this.modelo.canvas.height);
        let aux_canvas = document.getElementById("auxiliar");
        let aux_context = aux_canvas.getContext("2d");
        aux_canvas.height = this.modelo.canvas.height;
        aux_canvas.width = this.modelo.canvas.width;
        aux_context.font = "25px Comic Sans MS";
        aux_context.fillStyle = "rgb(255,255,255)";
        aux_context.fillText(texto, 50, 50);


        let data1 = this.modelo.context.getImageData(0, 0, this.modelo.canvas.width, this.modelo.canvas.height);
        let data2 = aux_context.getImageData(0, 0, this.modelo.canvas.width, this.modelo.canvas.height);
        let color_index1;
        let color_index2;

        for (let i = 0; i < this.modelo.canvas.width; i++) {
            for (let j = 0; j < this.modelo.canvas.height; j++) {
                color_index1 = this.getColorIndex(i, j, this.modelo.canvas.width);
                color_index2 = this.getColorIndex(i, j, this.modelo.canvas.width);

                if (data2.data[color_index2.R] != 0) {
                    new_imageData.data[color_index1.R] = (data1.data[color_index1.R] * alfa) + (data2.data[color_index2.R] * (1 - alfa));
                    new_imageData.data[color_index1.G] = (data1.data[color_index1.G] * alfa) + (data2.data[color_index2.G] * (1 - alfa));
                    new_imageData.data[color_index1.B] = (data1.data[color_index1.B] * alfa) + (data2.data[color_index2.B] * (1 - alfa));
                }
            }
        }

        this.modelo.aux_context.putImageData(new_imageData, 0, 0);
        this.modelo.putImage(this.modelo.aux_canvas);



    }


    apply_convolution(matrix, b) {
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
                let max;
                if (b) {
                    max=0;
                } else {
                    max=300
                }

                for (let entry = 0; entry < matrix.values.length; entry++) {
                    entry_x = (entry % matrix.size_n) - margin_x;
                    entry_y = Math.floor(entry / matrix.size_n) - margin_y;

                    color_index = this.getColorIndex(i + entry_x, j + entry_y, this.modelo.canvas.width);

                    let grey= (imageData.data[color_index.R] +imageData.data[color_index.G] +imageData.data[color_index.B] )/3;
                    if (b) {
                        max=Math.max(max,grey);
                        
                    } else {
                        max=Math.min(max,grey);    
                    }
                }

                color_index = this.getColorIndex(i, j, this.modelo.canvas.width);
                new_imageData.data[color_index.R] = max;
                new_imageData.data[color_index.G] = max;
                new_imageData.data[color_index.B] = max;
                new_imageData.data[color_index.A] = imageData.data[color_index.A];
            }
        }

        this.modelo.aux_context.putImageData(new_imageData, 0, 0);
        this.modelo.putImage(this.modelo.aux_canvas);
    }

    max() {
        let matrix = {
            values:
                [
                    0, 0, 0,
                    0, 0, 0,
                    0, 0, 0
                ],
            size_n: 3, size_m: 3
        }

        this.apply_convolution(matrix,true);
    }
    min() {
        let matrix = {
            values:
                [
                    0, 0, 0,
                    0, 0, 0,
                    0, 0, 0
                ],
            size_n: 3, size_m: 3
        }

        this.apply_convolution(matrix,false);
    }
}


export default class Practica7 {
    constructor(modelo) {
        this.modelo = modelo;
        this.histograma = [];


    }




    histo() {
        for (let index = 0; index < 256; index++) {
            this.histograma[index] = 0;
        }

        let imageData = this.modelo.context.getImageData(0, 0, this.modelo.canvas.width, this.modelo.canvas.height);
        let color_index;

        for (let i = 0; i < this.modelo.canvas.width; i++) {
            for (let j = 0; j < this.modelo.canvas.height; j++) {
                color_index = this.getColorIndex(i, j, this.modelo.canvas.width);
                if (imageData.data[color_index.R] > 255) {
                    this.histograma[255]++;
                } else {
                    this.histograma[imageData.data[color_index.R]]++;
                }
            }
        }

    }
    getColorIndex(x, y, width) {
        let color_pos = x * 4 + y * (width * 4);
        return { R: color_pos, G: color_pos + 1, B: color_pos + 2, A: color_pos + 3 };
      }

    ecualizacion() {
        this.histo();
        console.log(this.histograma);

        let suma=0;
        let sumah = [];
        for (let index = 0; index < 256; index++) {
            sumah[index] = 0;
        }
        let tono = 0;
        
        for (let k = 0; k < 256; k++) {
            suma = suma + this.histograma[k]
            sumah[k] = suma;
        }

        
        

        let imageData = this.modelo.context.getImageData(0, 0, this.modelo.canvas.width, this.modelo.canvas.height);
        let color_index;

        for (let i = 0; i < this.modelo.canvas.width; i++) {
            for (let j = 0; j < this.modelo.canvas.height; j++) {
                color_index = this.getColorIndex(i, j, this.modelo.canvas.width);
                tono=Math.floor( ((sumah[imageData.data[color_index.R]]-1)/(sumah[imageData.data[255]])*255) );
                if (tono>255) {
                    tono=255;
                }

                imageData.data[color_index.R] = tono;
                imageData.data[color_index.G] = tono;
                imageData.data[color_index.B] = tono;
            }
        }

        this.modelo.aux_context.putImageData(imageData, 0, 0);
        this.modelo.putImage(this.modelo.aux_canvas);
        this.histo();
        console.log(this.histograma);





    }



}
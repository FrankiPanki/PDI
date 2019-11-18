export default class ProyectoFinal {
    constructor(modelo) {
        this.modelo = modelo;
        this.tam = 17;
        this.w = 0;
        this.h = 0;
        this.x = 0
        this.y = 0;
        this.m = 0;
        this.n = 0;
        this.minicanvas = document.getElementById("minicanvas");
        this.minicontext = minicanvas.getContext("2d");
        this.minicanvas.setAttribute("width", this.tam);
        this.minicanvas.setAttribute("height", this.tam);
        this.img = document.getElementById("aux");
        this.img.setAttribute("width", this.tam);
        this.img.setAttribute("height", this.tam);

        this.imageData;
    }

    getColorIndex(x, y, width) {
        let color_pos = x * 4 + y * (width * 4);
        return { R: color_pos, G: color_pos + 1, B: color_pos + 2, A: color_pos + 3 };
    }

    apply_function_per_pixel(fun) {
        let color_index;
        let new_color;
        for (let i = 0; i < this.tam; i++) {
            for (let j = 0; j < this.tam; j++) {
                color_index = this.getColorIndex(i, j, this.tam);
                new_color = fun(this.imageData.data[color_index.R], this.imageData.data[color_index.G], this.imageData.data[color_index.B]);

                this.imageData.data[color_index.R] = new_color.R;
                this.imageData.data[color_index.G] = new_color.G;
                this.imageData.data[color_index.B] = new_color.B;
            }
        }
    }







    async fotomosaico(imagenes) {
        console.log("entra fotomosaico");
        this.w = this.modelo.canvas.width;
        this.h = this.modelo.canvas.height;





        let imageData2 = this.modelo.context.getImageData(0, 0, this.modelo.canvas.width, this.modelo.canvas.height);
        let r = 0, g = 0, b = 0;




        while (this.x < this.w) {
            this.m = ((this.x + this.tam) < this.w) ? this.tam : this.w - this.x;
            while (this.y < this.h) {


                this.n = ((this.y + this.tam) < this.h) ? this.tam : this.h - this.y;
                for (let i = 0; i < this.m; i++) {

                    for (let j = 0; j < this.n; j++) {
                        let pixel = this.getColorIndex(i + this.x, j + this.y, this.modelo.canvas.width);
                        r += imageData2.data[pixel.R]; g += imageData2.data[pixel.G]; b += imageData2.data[pixel.B];
                    }

                }
                r /= (this.m * this.n); g /= (this.m * this.n); b /= (this.m * this.n);

                //Escoger imagen
                let menor = 9999999;
                let ch = "";
                let path = ""
                let distancia=0;

                imagenes.map((elem) => {
                    distancia = Math.sqrt(Math.pow( Math.abs(elem.R-r), 2) + Math.pow(Math.abs(elem.G-g), 2) + Math.pow(Math.abs(elem.B-b), 2));
                    //console.log(distancia);
                    if (distancia < menor) {
                        //console.log(distancia);
                        menor = distancia;
                        ch = elem.N;
                    }
                });

                console.log(menor);
                this.minicontext.clearRect(0, 0, this.tam, this.tam);
                
                
                await
                new Promise((resolve, reject) => {
                    
                    this.img.setAttribute("src", (path + ch));
                    console.log(this.img.src);

                        this.img.onload = () => {
                            this.minicontext.drawImage(this.img, 0, 0, this.tam, this.tam);
                            this.imageData = this.minicontext.getImageData(0, 0, this.minicanvas.width, this.minicanvas.height);
                            this.modelo.aux_context.putImageData(this.imageData, this.x, this.y);
                            resolve(1);
                        }
                    });

                this.y += this.n;

            }
            this.x += this.m; this.y = 0;

        }

        this.modelo.putImage(this.modelo.aux_canvas);

    }
}
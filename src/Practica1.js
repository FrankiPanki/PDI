export default class Practica1{
  
  constructor(modelo) {
    this.modelo=modelo;
  }

  getColorIndex(x, y, width) {
    let color_pos = x * 4 + y * (width * 4);
    return { R: color_pos, G: color_pos + 1, B: color_pos + 2, A: color_pos + 3 };
  }

  apply_function_per_pixel(fun) {
    let imageData = this.modelo.context.getImageData(0, 0, this.modelo.canvas.width, this.modelo.canvas.height);
    let color_index;
    let new_color;

    for (let i = 0; i < this.modelo.canvas.width; i++) {
      for (let j = 0; j < this.modelo.canvas.height; j++) {
        color_index = this.getColorIndex(i, j, this.modelo.canvas.width);
        new_color = fun(imageData.data[color_index.R], imageData.data[color_index.G], imageData.data[color_index.B]);

        imageData.data[color_index.R] = new_color.R;
        imageData.data[color_index.G] = new_color.G;
        imageData.data[color_index.B] = new_color.B;
      }
    }
    this.modelo.aux_context.putImageData(imageData, 0, 0);
    this.modelo.putImage(this.modelo.aux_canvas);
  }


  mosaico(tam) {


    let imageData = this.modelo.context.getImageData(0, 0, this.modelo.canvas.width, this.modelo.canvas.height);

    let w = this.modelo.canvas.width;
    let h = this.modelo.canvas.height;

    let x = 0, y = 0, r = 0, g = 0, b = 0, m = 0, n = 0;

    while (x < w) {

      m = ((x + tam) < w) ? tam : w - x;

      while (y < h) {

        n = ((y + tam) < h) ? tam : h - y;

        for (let i = 0; i < m; i++) {

          for (let j = 0; j < n; j++) {
            let pixel = this.getColorIndex(i + x, j + y, this.modelo.canvas.width);
            r += imageData.data[pixel.R]; g += imageData.data[pixel.G]; b += imageData.data[pixel.B];
          }

        } r /= (m * n); g /= (m * n); b /= (m * n);


        for (let i = 0; i < m; i++) {

          for (let j = 0; j < n; j++){
            let color_index = this.getColorIndex(i+x, j+y, this.modelo.canvas.width);
            imageData.data[color_index.R] = r;
            imageData.data[color_index.G] = g;
            imageData.data[color_index.B] = b;
          }
        } y += n; r = 0; g = 0; b = 0;

      } x += m; y = 0;

    }
    this.modelo.aux_context.putImageData(imageData, 0, 0);
    this.modelo.putImage(this.modelo.aux_canvas); 


  }


  brillo(factor){
    let imageData = this.modelo.context.getImageData(0, 0, this.modelo.canvas.width, this.modelo.canvas.height);

    for (let x = 0; x < this.modelo.canvas.width ; x++) {

        for (let y = 0; y < this.modelo.canvas.height ; y++) {

            let pixel = this.getColorIndex( x, y, this.modelo.canvas.width);


            let r=imageData.data[pixel.R]+factor;

            let b=imageData.data[pixel.B]+factor;

            let g=imageData.data[pixel.G]+factor;

            if (r >= 256)

                r = 255;

            if (r < 0)

                r = 0;

            if (g >= 256)

                g = 255;

            if (g < 0)

                g = 0;

            if (b >= 256)

                b = 255;

            if (b < 0)

                b = 0;

            let color_index = this.getColorIndex(x, y, this.modelo.canvas.width);
            imageData.data[color_index.R] = r;
            imageData.data[color_index.G] = g;
            imageData.data[color_index.B] = b;

        }

    }

    this.modelo.aux_context.putImageData(imageData, 0, 0);
    this.modelo.putImage(this.modelo.aux_canvas);
  }

  altoContraste(){

    let imageData = this.modelo.context.getImageData(0, 0, this.modelo.canvas.width, this.modelo.canvas.height);


    for (let x = 0; x < this.modelo.canvas.width; x++){

        for (let y = 0; y < this.modelo.canvas.height; y++){


            let pixel = this.getColorIndex( x, y, this.modelo.canvas.width);


            let n = (imageData.data[pixel.R]  + imageData.data[pixel.G]  + imageData.data[pixel.B] ) / 3;

            if(n < 128) n = 255;

            else n = 0;


            let color_index = this.getColorIndex(x, y, this.modelo.canvas.width);
            imageData.data[color_index.R] = n;
            imageData.data[color_index.G] = n;
            imageData.data[color_index.B] = n;

        }

    }
    this.modelo.aux_context.putImageData(imageData, 0, 0);
    this.modelo.putImage(this.modelo.aux_canvas);
  }

  grayscale_action() {
    let gray;
    this.apply_function_per_pixel(function (R, G, B) {
      gray = (R + G + B) / 3;
      return { R: gray, G: gray, B: gray };
    });
  }

  invert_action() {
    this.apply_function_per_pixel(function (R, G, B) {
      return { R: 255 - R, G: 255 - G, B: 255 - B };
    });
  }

  red_channel_action() {
    this.apply_function_per_pixel(function (R, G, B) {
      return { R: R, G: 0, B: 0 };
    });
  }

  green_channel_action() {
    this.apply_function_per_pixel(function (R, G, B) {
      return { R: 0, G: G, B: 0 };
    });
  }

  blue_channel_action() {
    this.apply_function_per_pixel(function (R, G, B) {
      return { R: 0, G: 0, B: B };
    });
  }
  cmica() {
    this.apply_function_per_pixel(function (R, G, B) {
      return { R: R | 255, G: G | 255, B: B | 0 };
    });
  }
  

}
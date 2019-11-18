export default class Model {
  constructor() {
    this.image;
    this.canvas;
    this.context;
   }

  init() {
    this.canvas = document.getElementById("drawing");
    this.context = this.canvas.getContext("2d");
    this.aux_canvas = document.createElement("canvas");
    this.aux_context = this.aux_canvas.getContext("2d");



  }
  setImage(image) {
    this.image=image;
    this.canvas.setAttribute("width", image.width);
    this.canvas.setAttribute("height", image.height);
    this.aux_canvas.setAttribute("width", image.width);
    this.aux_canvas.setAttribute("height", image.height);

    this.context.drawImage(image, 0, 0);

    this.undo_step = 0;
    this.undo_list = [image];
  }

  getImage() {
    return this.canvas.toDataURL("image/png");
  }

  putImage(image) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(image, 0, 0);

    let img = document.createElement("img");
    img.src = this.canvas.toDataURL("image/png");

    this.undo_step++;
    this.undo_list[this.undo_step] = img;
  }

  undo() {
    if (this.undo_step > 0) {
      this.undo_step--;

      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.context.drawImage(this.undo_list[this.undo_step], 0, 0);
    }
  }

  setImg(){

    this.aux_context.putImageData(imageData, 0, 0);
    this.putImage(this.aux_canvas);
  }
  





}
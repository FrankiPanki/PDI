import Practica1 from "./Practica1.js";
import Practica2 from "./Practica2.js";
import Practica3 from "./Practica3.js";
import Practica4 from "./Practica4.js";
import Practica6 from "./Practica6.js";
import Practica7 from "./Practica7.js";
import Practica72 from "./Practica72.js";
import ProyectoFinal from "./ProyectoFinal.js";
export default class Controller {
  constructor() { }

  init(model, view) {
    this.model = model;
    this.view = view;
    this.practica1 = new Practica1(model);
    this.practica2 = new Practica2(model);
    this.practica3 = new Practica3(model);
    this.practica4 = new Practica4(model);
    this.practica6 = new Practica6(model);
    this.practica7 = new Practica7(model);
    this.practica72 = new Practica72(model);
    this.proyectofinal = new ProyectoFinal(model);

  }

  open() {
    let file_input = document.createElement("input");
    file_input.setAttribute("type", "file");
    file_input.setAttribute("accept", "image/png,image/jpeg");

    file_input.addEventListener("change", (evt) => {
      let file = file_input.files[0];

      const reader = new FileReader();
      reader.addEventListener("load", (elem) => {
        let image = document.createElement("img");

        image.addEventListener("load", () => {
          this.view.setTitle(file.name);
          this.view.showCanvas();
          this.model.setImage(image);
        });
        image.src = reader.result;
      });
      if (file) {
        reader.readAsDataURL(file);
      }
    });

    file_input.click();
  }

  save() {
    let link = document.createElement("a");
    link.setAttribute("download", "image.png");
    document.body.appendChild(link);

    link.addEventListener("click", (evt) => {
      link.href = this.model.getImage();
      document.body.removeChild(link);
    });

    link.click();
  }

  undo() {
    this.model.undo();
  }



  // BOTONES DE LA PRACTICA 1

  grayscale_action() {
    this.practica1.grayscale_action();
  }
  invert_action() {
    this.practica1.invert_action();
  }
  red_channel_action() {
    this.practica1.red_channel_action();
  }
  green_channel_action() {
    this.practica1.green_channel_action();
  }
  blue_channel_action() {
    this.practica1.blue_channel_action();
  }
  mosaico_action() {
    this.practica1.mosaico(5);
  }
  brillo_action() {
    this.practica1.brillo(20);
  }
  alto_contraste_action() {
    this.practica1.altoContraste();
  }
  cmica() {
    this.practica1.cmica();
  }



  // BOTONES DE LA PRACTICA 2
  blur() {
    this.practica2.blur();
  }
  motion_blur() {
    this.practica2.motion_blur();
  }
  encontrar_bordes() {
    this.practica2.encontrar_bordes();
  }
  sharpen() {
    this.practica2.sharpen();
  }
  emboss() {
    this.practica2.emboss();
  }
  promedio() {
    this.practica2.promedio();
  }
  mediana() {
    this.practica2.mediana();
  }


  //BOTONES DE LA PRACTICA 3

  ascii1() {
    this.practica3.ascii("M", true, false);
  }
  ascii2() {
    this.practica1.grayscale_action();
    this.practica3.ascii("M", true, false);
  }
  ascii3() {
    this.practica3.ascii("MNH#QKAD042$%+. ", false, false);
  }
  ascii4() {
    this.practica3.ascii("MNH#QKAD042$%+. ", true, false);
  }
  ascii5() {
    this.practica1.grayscale_action();
    this.practica3.ascii("MNH#QKAD042$%+. ", true, false);
  }
  ascii6() {
    this.practica3.ascii($("#frase").val(), true, true);
  }

  //BOTONES DE LA PRACTICA 4

  marcaAgua() {
    this.practica4.marcaAgua(0.5, $("#marca").val());
  }
  max() {
    this.practica4.max();
  }
  min() {
    this.practica4.min();
  }

  //BOTONES DE LA PRACTICA 6

  recursivo_gris() {
    this.practica6.recursivo(false);
  }
  recursivo_color() {
    this.practica6.recursivo(true);
  }

  //BOTONES DE LA PRACTICA 7

  async ecualizacion() {
    await new Promise((resolve, reject) => {
      this.practica1.grayscale_action();
      resolve(1);
      this.practica7.ecualizacion();
    });
  }
  semiTono1() {
    this.practica72.semiTono("a");
  }
  semiTono2() {
    this.practica72.semiTono("b");
  }
  semiTono3() {
    this.practica72.semiTono("c");
  }


  //Botones y funciones Proyecto Final

  leerArchivo(e) {
    var archivo = e.target.files[0];
    if (!archivo) {
      return;
    }
    var lector = new FileReader();
    lector.onload = (e) => {
      var contenido = e.target.result;
      var arcontenido = contenido.split("\n");
      arcontenido.map((elem, i, arr) => {
        var partes = elem.split(" ");
        arr[i] = `{\"R\":${partes[0]}, \"G\":${partes[1]}, \"B\":${partes[2]}, \"H\":${partes[3]}, \"N\":\"${partes[4].trim()}\"}`;
        arr[i] = JSON.parse(arr[i]);
      });

      this.proyectofinal.fotomosaico(arcontenido);
      
    };
      //console.log(arcontenido);
    lector.readAsText(archivo);
  }
}
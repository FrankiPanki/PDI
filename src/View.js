export default class View {
  constructor() {
  }

  init(controller) {
    this.controller = controller;


    // CARGA DE IMAGEN

    this.canvas = document.getElementById("drawing");
    this.work_area = document.getElementById("work_area");

    document.getElementById("btn_open").addEventListener("click", () => {
      this.controller.open();
    });

    document.getElementById("btn_save").addEventListener("click", () => {
      this.controller.save();
    });

    document.getElementById("btn_undo").addEventListener("click", () => {
      this.controller.undo();
    });



    // PRACTICA1-----------------------------------------------

    document.getElementById("btn_grayscale").addEventListener("click", () => {
      this.controller.grayscale_action();
    });

    document.getElementById("btn_invert").addEventListener("click", () => {
      this.controller.invert_action();
    });

    document.getElementById("btn_red_channel").addEventListener("click", () => {
      this.controller.red_channel_action();
    });

    document.getElementById("btn_green_channel").addEventListener("click", () => {
      this.controller.green_channel_action();
    });

    document.getElementById("btn_blue_channel").addEventListener("click", () => {
      this.controller.blue_channel_action();
    });
    document.getElementById("btn_mosaico").addEventListener("click", () => {
      this.controller.mosaico_action();
    });
    document.getElementById("btn_brillo").addEventListener("click", () => {
      this.controller.brillo_action();
    });
    document.getElementById("btn_alto_contraste").addEventListener("click", () => {
      this.controller.alto_contraste_action();
    });
    document.getElementById("btn_cmica").addEventListener("click", () => {
      this.controller.cmica();
    });


    // PRACTICA2-----------------------------------------------
    document.getElementById("btn_blur").addEventListener("click", () => {
      this.controller.blur();
    });
    document.getElementById("btn_motion_blur").addEventListener("click", () => {
      this.controller.motion_blur();
    });
    document.getElementById("btn_encontrar_bordes").addEventListener("click", () => {
      this.controller.encontrar_bordes();
    });
    document.getElementById("btn_sharpen").addEventListener("click", () => {
      this.controller.sharpen();
    });
    document.getElementById("btn_emboss").addEventListener("click", () => {
      this.controller.emboss();
    });
    document.getElementById("btn_promedio").addEventListener("click", () => {
      this.controller.promedio();
    });
    document.getElementById("btn_mediana").addEventListener("click", () => {
      this.controller.mediana();
    });

    // PRACTICA3-----------------------------------------------

    document.getElementById("btn_ascii1").addEventListener("click", () => {
      $('#drawing').hide();
      $('#area').append("<div id='ascii' class = 'ascii'><div>");
      this.controller.ascii1();
      $('#btn_quita').css('visibility', 'visible');
    });
    document.getElementById("btn_ascii2").addEventListener("click", () => {
      $('#drawing').hide();
      $('#area').append("<div id='ascii' class = 'ascii'><div>");
      this.controller.ascii2();
      $('#btn_quita').css('visibility', 'visible');
    });
    document.getElementById("btn_ascii3").addEventListener("click", () => {
      $('#drawing').hide();
      $('#area').append("<div id='ascii' class = 'ascii'><div>");
      this.controller.ascii3();
      $('#btn_quita').css('visibility', 'visible');
    });
    document.getElementById("btn_ascii4").addEventListener("click", () => {
      $('#drawing').hide();
      $('#area').append("<div id='ascii' class = 'ascii'><div>");
      this.controller.ascii4();
      $('#btn_quita').css('visibility', 'visible');
    });
    document.getElementById("btn_ascii5").addEventListener("click", () => {
      $('#drawing').hide();
      $('#area').append("<div id='ascii' class = 'ascii'><div>");
      this.controller.ascii5();
      $('#btn_quita').css('visibility', 'visible');
    });
    document.getElementById("btn_ascii6").addEventListener("click", () => {
      $('#drawing').hide();
      $('#area').append("<div id='ascii' class = 'ascii'><div>");
      this.controller.ascii6();
      $('#btn_quita').css('visibility', 'visible');
    });


    document.getElementById("btn_quita").addEventListener("click", () => {
      $('#btn_quita').css('visibility', 'hidden');;
      $("#ascii").remove();
    });

    // PRACTICA4-----------------------------------------------

    document.getElementById("btn_marcaAgua").addEventListener("click", () => {
      this.controller.marcaAgua();
    });

    document.getElementById("btn_max").addEventListener("click", () => {
      this.controller.max();
    });
    document.getElementById("btn_min").addEventListener("click", () => {
      this.controller.min();
    });

    // PRACTICA6-----------------------------------------------
    document.getElementById("btn_recursivo_gris").addEventListener("click", () => {
      this.controller.recursivo_gris();
    });
    document.getElementById("btn_recursivo_color").addEventListener("click", () => {
      this.controller.recursivo_color();
    });

    // PRACTICA7-----------------------------------------------
    document.getElementById("btn_ecualizacion").addEventListener("click", () => {
      this.controller.ecualizacion();
    });
    document.getElementById("btn_semiTono1").addEventListener("click", () => {
      this.controller.semiTono1();
    });
    document.getElementById("btn_semiTono2").addEventListener("click", () => {
      this.controller.semiTono2();
    });
    document.getElementById("btn_semiTono3").addEventListener("click", () => {
      this.controller.semiTono3();
    });

    // PROYECTO FINAL-----------------------------------------------

    document.getElementById('file').addEventListener('change', (e)=>{this.controller.leerArchivo(e);} , false);

    document.getElementById("fotomosaico").addEventListener("click", () => { 
        document.getElementById('file').click();
    });

    


  }




  // OTRAS CONFIGURACIONES-----------------------------------------------


  setTitle(tit) {
    let title = document.querySelector("title");
    if (!title) {
      title = document.createElement("title");
      document.head.appendChild(title);
    }

    title.textContent = tit;
  }

  showCanvas() {
    this.canvas.style.display = "block";
  }
}

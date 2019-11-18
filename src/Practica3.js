export default class Practica3 {
    constructor(modelo) {
        this.modelo = modelo;
    }

    ascii(caracteres, colorB, texto ) {
        let map = caracteres;
        let data = this.modelo.context.getImageData(0, 0, this.modelo.image.width, this.modelo.image.height);
        let thisRow;
        let out = [];
        let grays = map.length;

        
        var i,avg, color, ch;

        console.log(`${this.modelo.image.width} ${this.modelo.image.height}`);

        for (var y = 0; y < data.height; y++) {
            thisRow = [];
            for (var x = 0; x < data.width; x++) {
                i = (y * 4) * data.width + x * 4;
                avg = (data.data[i] + data.data[i + 1] + data.data[i + 2]) / 3;
                color = [data.data[i], data.data[i + 1], data.data[i + 2]];

                if (texto) {
                    ch=map[(x+(y*data.width))%map.length];
                } else {
                    
                    ch = map[Math.round((avg / 255) * grays)];
                }
                // if(Math.round((avg/255) *grays) == 255){
                // 	ch = ' ';
                // }
                if (!texto) {                    
                    if (!ch) {
                        ch = map[map.length - 1];
                    }
                }
                if (ch == ' ') {
                    ch = '&nbsp;';
                }
                if (colorB) {
                    thisRow.push("<span style=\"color:rgb(" + color.join(',') + ")\">" + ch + "</span>");
                } else {
                    thisRow.push("<span>" + ch + "</span>");
                }




            }
            thisRow.push('<br>');
            out.push(thisRow);
        }

        var outStr = '';

        var len = out.length;
        for (var j = 0; j < len; j++) {
            outStr += out[j].join('');
            outStr += '\n';
        };
        //console.timeEnd('calc');
        console.log(`len ${len}`);


        let salida = document.getElementById("ascii");
        salida.innerHTML = outStr;
    }
}
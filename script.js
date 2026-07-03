// ===============================
// FRASES DE BIENVENIDA
// ===============================

const frases = [

"Hay regalos que duran un momento...",

"Otros duran toda una vida.",

"Este es uno de los tantos recuerdos que quiero seguir construyendo contigo a lo largo de mi vida. ❤️",

"Sé que aún faltan algunos meses para tu cumpleaños...",

"Pero definitivamente no fui capaz de esperar tanto tiempo para darte esta sorpresa. 🥹"

];

const phrase = document.getElementById("phrase");
const startButton = document.getElementById("startButton");
let showTicket;

document.addEventListener("DOMContentLoaded", () => {

    const showTicket = document.getElementById("showTicket");

    console.log("showTicket:", showTicket);

    if (showTicket) {

        showTicket.addEventListener("click", () => {

            showScreen("ticketScreen");

        });

    }

});
let fraseActual = 0;

startButton.style.display = "none";

function mostrarFrase(){

    phrase.style.opacity = 0;

    setTimeout(()=>{

        phrase.innerHTML = frases[fraseActual];

        phrase.style.opacity = 1;

        fraseActual++;

        if(fraseActual < frases.length){

            setTimeout(mostrarFrase,3500);

        }else{

            setTimeout(()=>{

                startButton.style.display="inline-block";

                startButton.style.opacity=0;

                setTimeout(()=>{

                    startButton.style.opacity=1;

                },100);

            },2500);

        }

    },500);

}

mostrarFrase();


// ===============================
// CAMBIO DE PANTALLAS
// ===============================

const screens = document.querySelectorAll(".screen");

let heartInterval = null; 

function showScreen(id){

    screens.forEach(screen=>{
        screen.classList.remove("active");
    });

    const current = document.getElementById(id);
    current.classList.add("active");

    // 👇 ACTIVAR ANIMACIONES SEGÚN PANTALLA

    if(id === "poster"){

        setTimeout(()=>{
            const poster = document.getElementById("posterImage");
            if(poster){
                poster.classList.add("show");
            }
        },300);

    }

    if(id === "ticketScreen"){

        setTimeout(()=>{

            const vip = document.getElementById("vipInvitation");
            if(vip) vip.classList.add("show");

            const rect = vip.getBoundingClientRect();
            const centerX = rect.left + rect.width/2;
            const centerY = rect.top + rect.height/2;

            for(let i=0;i<20;i++){
                const sparkle=document.createElement("div");
                sparkle.className="sparkle";
                const angle=Math.random()*Math.PI*2;
                const distance=100+Math.random()*160;
                sparkle.style.left=centerX+"px";
                sparkle.style.top=centerY+"px";
                sparkle.style.setProperty("--sx",Math.cos(angle)*distance+"px");
                sparkle.style.setProperty("--sy",Math.sin(angle)*distance+"px");
                document.body.appendChild(sparkle);
                setTimeout(()=>sparkle.remove(),1000);
            }

        },300);

    }

    // 👇 AHORA SÍ, AFUERA de los otros ifs
    if(id === "final"){
        startFloatingHearts();
    } else {
        stopFloatingHearts();
    }

}
// ===============================
// CARTA
// ===============================

const carta = `


Mi querida Jessika Natalia ❤️

Sé que todavía faltan algunos meses para tu cumpleaños, pero tú me conoces... soy malito guardando las cosas que me emocionan.

Quería darte un pequeño adelanto porque, desde que paso, no he dejado de imaginar tu reacción.

Últimamente he pensado mucho en nosotros y en todos los momentos que hemos compartido. Ahí entendí que los mejores regalos no siempre son cosas; muchas veces son recuerdos que se quedan para siempre.

Eso fue exactamente lo que quise preparar para ti.

Espero que este sea solo uno de los muchos momentos increíbles que todavía nos esperan juntos, porque mi lugar favorito siempre será a tu lado.

Y antes de que descubras lo que he estado guardando con tanta ilusión, solo quiero decirte una cosa...

Gracias por existir.

Te amo muchísimo y eres todo en mi vida. ❤️

Con todo mi amor,

Kevin ❤️

`;

const letterText = document.getElementById("letterText");

let letra = 0;

function escribirCarta(){

    if(letra < carta.length){

        letterText.innerHTML += carta.charAt(letra);

        letra++;

        setTimeout(escribirCarta,28);

    }

}

// ===============================
// BOTÓN DESCUBRIR MI SORPRESA
// ============================
startButton.addEventListener("click", () => {
    showScreen("letter");
});

// ===============================
// SOBRE INTERACTIVO
// ===============================

const envelope = document.getElementById("envelope");
const letterBox = document.getElementById("letterBox");

envelope.addEventListener("click", () => {

    if(envelope.classList.contains("opening")) return;

    envelope.classList.add("opening");

    setTimeout(() => {

        envelope.classList.add("hide");
        letterBox.classList.add("show");

         document.querySelector(".letter-scene").classList.add("expanded"); // 👈 nueva línea

        escribirCarta();

    }, 900);

});

// ===============================
// SIGUIENTES BOTONES
// ===============================

const nextPhotos=document.getElementById("nextPhotos");

const nextGift=document.getElementById("nextGift");

const openGift=document.getElementById("openGift");

const nextCountdown=document.getElementById("nextCountdown");

const finalMessage=document.getElementById("finalMessage");
// ===============================
// NAVEGACIÓN ENTRE PANTALLAS
// ===============================

nextPhotos.addEventListener("click", () => {
    showScreen("gallery");
});

nextGift.addEventListener("click", () => {
    showScreen("gift");
});

openGift.addEventListener("click", () => {

    const gift = document.getElementById("giftBoxEl");
    const rect = gift.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    gift.classList.add("open");

    // 💥 Explosión de destellos dorados
    for(let i = 0; i < 24; i++){

        const sparkle = document.createElement("div");
        sparkle.className = "sparkle";

        const angle = Math.random() * Math.PI * 2;
        const distance = 80 + Math.random() * 140;

        sparkle.style.left = centerX + "px";
        sparkle.style.top = centerY + "px";
        sparkle.style.setProperty("--sx", Math.cos(angle) * distance + "px");
        sparkle.style.setProperty("--sy", Math.sin(angle) * distance + "px");

        document.body.appendChild(sparkle);

        setTimeout(() => sparkle.remove(), 1000);

    }

    openGift.style.opacity = "0";
    openGift.style.pointerEvents = "none";

    setTimeout(() => {

        showScreen("poster");

        // 🎵 Reproducir canción
        const music = document.getElementById("bgMusic");
        if (music) {
            music.volume = 0.7;
            music.play().catch(err => {
                console.log("No se pudo reproducir automáticamente:", err);
            });
        }

        // activar animación del póster
        setTimeout(() => {
            const poster = document.getElementById("posterImage");
            if (poster) poster.classList.add("show");
        }, 300);

    }, 1400);

});

nextCountdown.addEventListener("click", () => {

    showScreen("countdown");

    actualizarContador();

});

finalMessage.addEventListener("click", () => {
    showScreen("final");
});



// ===============================
// CUENTA REGRESIVA
// ===============================

function actualizarContador(){

    const fechaConcierto = new Date("2026-12-11T00:00:00");
    const hoy = new Date();

    const diferencia = fechaConcierto - hoy;
    const dias = Math.ceil(diferencia / (1000 * 60 * 60 * 24));

    document.getElementById("counter").innerHTML = dias > 0 ? dias : "0";

}

function startFloatingHearts(){

    if(heartInterval) return;

    heartInterval = setInterval(() => {

        const heart = document.createElement("div");
        heart.className = "floatHeart";
        heart.innerHTML = "❤️";

        heart.style.left = Math.random() * window.innerWidth + "px";
        console.log(heart.style.left);
        heart.style.fontSize = (14 + Math.random()*18) + "px";
        heart.style.animationDuration = (5 + Math.random()*4) + "s";

        document.body.appendChild(heart);

        setTimeout(() => heart.remove(), 9000);

    }, 500);

}

function stopFloatingHearts(){
    clearInterval(heartInterval);
    heartInterval = null;
}












(this["webpackJsonpgra-w-karty-w-durnia"]=this["webpackJsonpgra-w-karty-w-durnia"]||[]).push([[0],{21:function(e,a,t){},36:function(e,a,t){},37:function(e,a,t){},39:function(e,a,t){"use strict";t.r(a);var i=t(1),n=t.n(i),o=t(22),s=t.n(o),c=(t(21),t(7)),r=t(26),d=(t(36),t(37),t(0));var j=function(){var e=Object(i.useState)(""),a=Object(c.a)(e,2),t=a[0],n=a[1],o=Object(i.useState)(""),s=Object(c.a)(o,2),j=(s[0],s[1],Object(i.useState)("")),l=Object(c.a)(j,2),u=l[0],b=l[1],z=Object(i.useState)(2),y=Object(c.a)(z,2),p=y[0],m=y[1],h=Object(i.useState)(5),k=Object(c.a)(h,2),g=k[0],w=k[1],O=Object(i.useState)(0),x=Object(c.a)(O,2),v=x[0],f=x[1],N=Object(i.useState)(6),C=Object(c.a)(N,2),I=C[0],T=C[1],S=Object(i.useState)("hidden"),L=Object(c.a)(S,2),R=L[0],P=L[1],D=Object(i.useState)("hidden"),K=Object(c.a)(D,2),J=K[0],G=K[1],M=Object(i.useState)("hidden"),V=Object(c.a)(M,2),A=V[0],E=V[1],B=Object(i.useState)("hidden"),F=Object(c.a)(B,2),Z=F[0],W=F[1],U=Object(i.useState)("shown"),$=Object(c.a)(U,2),q=$[0],H=($[1],Object(i.useState)({promptInfo:"prompt-info hide",buttonLoginClass:"hidden",buttonRulesClass:"shown",buttonLoginDisabled:"disabled",loginValid:!1})),Q=Object(c.a)(H,2),X=Q[0],Y=Q[1],_=Object(i.useState)([{playingRoomId:0,stateClass:"waiting",stateName:"Oczekuje na graczy",maxPlayers:4,chairs:[{chairId:0,playerId:1},{chairId:1,playerId:0},{chairId:2,playerId:"not-assigned"},{chairId:3,playerId:"not-available"}],players:[{playerId:0,loginName:"one",elapsedTime:600},{playerId:1,loginName:"two",elapsedTime:400},{playerId:2,loginName:"three",elapsedTime:500}],durationTime:621,lowestCard:6},{playingRoomId:1,stateClass:"ready",stateName:"Gotowa do otwarcia",maxPlayers:0,chairs:[{chairId:0,playerId:"not-assigned"},{chairId:1,playerId:"not-assigned"},{chairId:2,playerId:"not-assigned"},{chairId:3,playerId:"not-assigned"}],players:[],durationTime:0,lowestCard:0}]),ee=Object(c.a)(_,2),ae=ee[0];function te(){!0===X.loginValid&&(P("hiding"),setTimeout((function(){P("hidden")}),2e3),setTimeout((function(){E("showing")}),4e3))}return ee[1],Object(i.useEffect)((function(){Object(r.a)().on("login",(function(e){console.log(e)})),setTimeout((function(){P("showing"),document.getElementById("login-name").focus()}),26e3)}),[]),Object(d.jsxs)("div",{className:"App",children:[Object(d.jsx)("p",{className:"copyright-text"}),Object(d.jsx)("p",{className:"welcome-text"}),Object(d.jsxs)("div",{id:"login-container",className:R,children:[Object(d.jsx)("p",{children:"Podaj sw\xf3j login:"}),Object(d.jsx)("input",{type:"text",id:"login-name",name:"login-name",maxLength:"15",autoComplete:"off",value:t,onChange:function(e){return a=e.target.value,n(a),void(a.match(/^(?!\-)[0-9a-zA-Z\-]+$/)?a.length>=3?Y({promptInfo:"prompt-info hide",buttonLoginClass:"shown",buttonRulesClass:"hidden",buttonLoginDisabled:"",loginValid:!0}):Y({promptInfo:"prompt-info hide",buttonLoginClass:"shown",buttonRulesClass:"hidden",buttonLoginDisabled:"disabled",loginValid:!1}):0===a.length?Y({promptInfo:"prompt-info hide",buttonLoginClass:"hidden",buttonRulesClass:"shown",buttonLoginDisabled:"disabled",loginValid:!1}):Y({promptInfo:"prompt-info shown",buttonLoginClass:"shown",buttonRulesClass:"hidden",buttonLoginDisabled:"disabled",loginValid:!1}));var a},onKeyPress:function(e){"Enter"===e.key&&te()}}),Object(d.jsx)("button",{type:"button",className:X.buttonLoginClass,onClick:te,disabled:X.buttonLoginDisabled,children:"Zaloguj si\u0119!"}),Object(d.jsx)("button",{type:"button",className:X.buttonRulesClass,onClick:function(){P("hiding"),setTimeout((function(){P("hidden")}),2e3),setTimeout((function(){G("showing")}),4e3)},children:"Wyja\u015bnij mi zasady gry!"}),Object(d.jsxs)("p",{className:X.promptInfo,children:["Dopuszczalne s\u0105 tylko litery od A do Z,",Object(d.jsx)("br",{}),"cyfry od 0 do 9 oraz znak minus!"]})]}),Object(d.jsxs)("div",{id:"rules-container",className:J,children:[Object(d.jsx)("p",{children:"Zasady gry w karty w\xa0durnia:"}),Object(d.jsxs)("div",{children:[Object(d.jsx)("p",{children:"Gra w\xa0karty pod nazw\u0105 \u201edure\u0144\u201d wydaje si\u0119 by\u0107 najpopularniejsz\u0105 gr\u0105 karcian\u0105 w\xa0Rosji. Nie jest przesad\u0105 twierdzenie, \u017ce ka\u017cdy rosyjski gracz w\xa0karty zna t\u0105 gr\u0119. Durniem w grze pozostaje przegrany \u2013 gracz, kt\xf3remu zosta\u0142y karty gdy pozostali si\u0119 ich pozbyli. Mo\u017cna gra\u0107 w dowoln\u0105 liczb\u0119 os\xf3b od dw\xf3ch do sze\u015bciu, graj\u0105c indywidualnie b\u0105d\u017a w\xa0zespo\u0142ach po dw\xf3ch lub trzech graczy siedz\u0105cych na przemian. Gra si\u0119 36\xa0kartami, karty w ka\u017cdym kolorze (tj. pik, kier, karo, trefl), si\u0142a kart od najwy\u017cszej do najni\u017cszej: as, kr\xf3l, dama, walet, 10, 9, 8, 7, 6."}),Object(d.jsx)("p",{children:"Na pocz\u0105tku, rozdaj\u0105cy tasuje i\xa0rozdaje ka\u017cdemu graczowi po sze\u015b\u0107 zakrytych kart. Nast\u0119pnie ods\u0142ania si\u0119 jedn\u0105 kart\u0119, jej kolor jest atutem. Pozosta\u0142e nierozdane karty (nazywane stosem) k\u0142adzie si\u0119 zakryte na g\xf3rze karty atutowej. Gracze podnosz\u0105 swoje karty i\xa0ogl\u0105daj\u0105 je. Gr\u0119 zaczyna gracz siedz\u0105cy na lewo od rozdaj\u0105cego."}),Object(d.jsx)("p",{children:"Gra sk\u0142ada si\u0119 z serii atak\xf3w. Podczas ataku jest atakuj\u0105cy (kt\xf3remu mog\u0105 pomaga\u0107 inni sprzymierzeni gracze) oraz obro\u0144ca (kt\xf3ry broni si\u0119 sam). Atakuj\u0105cy zaczyna poprzez zagranie karty na st\xf3\u0142 przed obro\u0144c\u0119. Obro\u0144ca pr\xf3buje odeprze\u0107 atak poprzez zakrycie jej kart\u0105 wy\u017csz\u0105. Karta atakuj\u0105ca, kt\xf3ra nie jest atutem mo\u017ce zosta\u0107 pobita kart\u0105 wy\u017csz\u0105 tego samego koloru, lub dowolnym atutem. Karta atutowa mo\u017ce by\u0107 pobita jedynie poprzez zagranie wy\u017cszego atutu. Nale\u017cy zauwa\u017cy\u0107, \u017ce karta nieatutowa mo\u017ce zawsze zosta\u0107 pobita jakimkolwiek atutem."}),Object(d.jsx)("p",{children:"Je\u015bli obro\u0144ca odeprze pierwszy atak, atakuj\u0105cy mo\u017ce go kontynuowa\u0107 poprzez zagranie kolejnej karty. R\xf3wnie\u017c inni przeciwnicy obro\u0144cy (gracze sprzymierzeni z\xa0atakuj\u0105cym) mog\u0105 do\u0142\u0105czy\u0107 si\u0119 do ataku, je\u015bli maj\u0105 odpowiednie karty. Jednak g\u0142\xf3wny atakuj\u0105cy ma zawsze pierwsze\u0144stwo \u2013 inni mog\u0105 do\u0142\u0105czy\u0107 si\u0119 jedynie za jego zgod\u0105. Ka\u017cda nowa dok\u0142adana karta atakuj\u0105ca musi by\u0107 o\xa0tej samej figurze co karty dotychczas zagrane podczas ataku, zar\xf3wno przez atakuj\u0105cego jak i\xa0obro\u0144c\u0119. Ponadto, ca\u0142kowita liczba kart zagranych przez atakuj\u0105cych podczas ataku nie mo\u017ce przekroczy\u0107 sze\u015bciu. Je\u015bli obro\u0144ca przed atakiem ma mniej ni\u017c sze\u015b\u0107 kart, liczba kart zagranych przez atakuj\u0105cych nie mo\u017ce by\u0107 wi\u0119ksza ni\u017c liczba kart w\xa0r\u0119ce obro\u0144cy. Obro\u0144ca odpiera ca\u0142y atak gdy pobije wszystkie karty atakuj\u0105ce (maksymalnie sze\u015b\u0107) zagrane dotychczas oraz \u017caden z\xa0przeciwnik\xf3w nie mo\u017ce lub nie chce kontynuowa\u0107 ataku lub obro\u0144ca nie posiada \u017cadnych kart na r\u0119ce i\xa0wszystkie jego karty zosta\u0142y u\u017cyte do odparcia ataku. Kiedy atak zostaje odparty, wszystkie karty zagrane w nim (karty atakuj\u0105ce i\xa0broni\u0105ce) zostaj\u0105 od\u0142o\u017cone na osobny stos i\xa0nie bior\u0105 ju\u017c udzia\u0142u w tym rozdaniu. Obro\u0144ca zostaje atakuj\u0105cym, a\xa0gracz na lewo nowym obro\u0144c\u0105."}),Object(d.jsx)("p",{children:"Je\u015bli obro\u0144ca nie mo\u017ce lub nie chce pobi\u0107 karty atakuj\u0105cej, podnosi j\u0105 i\xa0staje si\u0119 cz\u0119\u015bci\u0105 r\u0119ki obro\u0144cy \u2013 w\xa0tym wypadku atak si\u0119 powi\xf3d\u0142 i\xa0obro\u0144ca nie zostaje atakuj\u0105cym. Nast\u0119pnym atakuj\u0105cym jest gracz po lewej od obro\u0144cy a\xa0nast\u0119pnym obro\u0144c\u0105 gracz po lewej od nowego atakuj\u0105cego."}),Object(d.jsx)("p",{children:"Po zako\u0144czeniu ataku, wszyscy gracze kt\xf3rzy maj\u0105 mniej ni\u017c sze\u015b\u0107 kart musz\u0105 uzupe\u0142ni\u0107 swoje r\u0119ce do sze\u015bciu poprzez pobranie odpowiedniej ilo\u015bci kart ze stosu. Najpierw dobiera atakuj\u0105cy, p\xf3\u017aniej inni gracze, kt\xf3rzy brali udzia\u0142 w\xa0ataku w\xa0kolejno\u015bci zgodnej z\xa0ruchem wskaz\xf3wek zegara a\xa0na ko\u0144cu obro\u0144ca. Je\u015bli nie ma wystarczaj\u0105cej ilo\u015bci kart w\xa0stosie, karty pobierane s\u0105 jak zwykle a\u017c do momentu wyczerpania stosu. Mo\u017ce si\u0119 zdarzy\u0107, \u017ce p\xf3\u017aniejsi gracze nie pobior\u0105 \u017cadnych kart. Ostatni atut (odkryty) jest pobierany jako ostatnia karta ze stosu. Po wyczerpaniu stosu gra jest kontynuowana bez dobierania."}),Object(d.jsx)("p",{children:"Generalny kierunek gry jest zgodny z\xa0ruchem wskaz\xf3wek zegara. Je\u015bli atak zostaje odparty, obro\u0144ca staje si\u0119 atakuj\u0105cym a\xa0nast\u0119pny gracz w kolejno\u015bci nowym obro\u0144c\u0105. Je\u015bli atak si\u0119 udaje, obro\u0144ca nie zostaje atakuj\u0105cym. Nowym atakuj\u0105cym jest nast\u0119pny gracz w\xa0kolejno\u015bci po obro\u0144cy, a\xa0nowym obro\u0144c\u0105 gracz po lewej od nowego atakuj\u0105cego. Kiedy gracze pozbywaj\u0105 si\u0119 kart, odpadaj\u0105 z rozgrywki a\xa0pozostali kontynuuj\u0105. Wygrywa gracz, kt\xf3ry pierwszy pozb\u0119dzie si\u0119 kart, chyba \u017ce przedostatnia karta zostanie pobita \u2013 wtedy jest rozegrane. \u201eDurniem\u201d zostaje gracz, kt\xf3remu pozosta\u0142y karty na r\u0119ce."})]}),Object(d.jsx)("button",{type:"button",onClick:function(){G("hiding"),setTimeout((function(){G("hidden")}),2e3),setTimeout((function(){P("showing"),document.getElementById("login-name").focus()}),4e3)},children:"OK, rozumiem!"})]}),Object(d.jsxs)("div",{id:"rooms-container",className:A,children:[Object(d.jsx)("p",{children:"Wybierz pok\xf3j do gry:"}),Object(d.jsx)("div",{children:ae.map((function(e){return Object(d.jsxs)("div",{className:e.stateClass,onClick:function(a){return t=e.playingRoomId,i=e.stateClass,b(t),E("hiding"),setTimeout((function(){E("hidden")}),2e3),void("playing"===i?alert("Nie mo\u017cesz wej\u015b\u0107 do tego pokoju poniewa\u017c aktualnie jest on zaj\u0119ty przez innych graczy i toczy si\u0119 w nim rozgrywka!"):"ready"===i&&setTimeout((function(){W("showing")}),4e3));var t,i},children:[Object(d.jsx)("small",{"data-room-id":e.playingRoomId+1}),Object(d.jsxs)("div",{children:[Object(d.jsx)("div",{children:e.playingRoomId+1}),Object(d.jsxs)("div",{children:[Object(d.jsxs)("span",{children:["Stan: ",e.stateName]}),Object(d.jsxs)("span",{children:["Gracze: ","ready"!==e.stateClass?e.players.map((function(e){return Object(d.jsx)("span",{className:"players-text",children:e.loginName},e.playerId)})):"\u017cadnych"]}),Object(d.jsxs)("span",{children:["Oczekiwana ilo\u015b\u0107 graczy: ","ready"!==e.stateClass?e.maxPlayers:"nieustalona"]}),Object(d.jsxs)("span",{children:["Czas dla gracza: ","ready"!==e.stateClass?Math.floor(e.durationTime/60)+" min. "+(e.durationTime%60>=10?Math.floor(e.durationTime%60):"0"+Math.floor(e.durationTime%60))+" sek.":"nieokre\u015blony"]}),Object(d.jsxs)("span",{children:["Najni\u017csza karta w talii: ","ready"!==e.stateClass?e.lowestCard:"nieokre\u015blona"]})]})]})]},e.playingRoomId)}))})]}),Object(d.jsxs)("div",{id:"customize-container",className:Z,children:[Object(d.jsx)("p",{children:"Dostosuj nowy pok\xf3j:"}),Object(d.jsx)("div",{children:Object(d.jsxs)("div",{children:[Object(d.jsx)("big",{"data-room-id":u}),Object(d.jsxs)("div",{children:[Object(d.jsxs)("div",{children:[Object(d.jsx)("span",{children:"Administrator:"}),Object(d.jsx)("input",{type:"text",id:"admin-name",name:"admin-name",value:t,disabled:!0})]}),Object(d.jsxs)("div",{children:[Object(d.jsx)("span",{children:"Oczekiwana ilo\u015b\u0107 graczy:"}),Object(d.jsxs)("select",{id:"players-amount",name:"players-amount",value:p,onChange:function(e){return m(e.target.value)},children:[Object(d.jsx)("option",{value:"2",children:"2 \u2013 dw\xf3ch graczy"}),Object(d.jsx)("option",{value:"3",children:"3 \u2013 trzech graczy"}),Object(d.jsx)("option",{value:"4",children:"4 \u2013 czterech graczy"})]})]}),Object(d.jsxs)("div",{children:[Object(d.jsx)("span",{children:"Ca\u0142kowity czas dla gracza:"}),Object(d.jsx)("input",{type:"number",id:"duration-time-mins",name:"duration-time-mins",value:g,min:"1",max:"60",step:"1",onChange:function(e){return w(e.target.value)}}),Object(d.jsx)("span",{className:"mins-label",children:"min."}),Object(d.jsx)("input",{type:"number",id:"duration-time-secs",name:"duration-time-secs",value:v,min:"0",max:"59",step:"1",onChange:function(e){return f(e.target.value)}}),Object(d.jsx)("span",{className:"secs-label",children:"sek."})]}),Object(d.jsxs)("div",{children:[Object(d.jsx)("span",{children:"Najni\u017csza karta w talii:"}),Object(d.jsxs)("select",{id:"lowest-card",name:"lowest-card",value:I,onChange:function(e){return T(e.target.value)},children:[Object(d.jsx)("option",{value:"2",children:"2 \u2013 dw\xf3jka"}),Object(d.jsx)("option",{value:"3",children:"3 \u2013 tr\xf3jka"}),Object(d.jsx)("option",{value:"4",children:"4 \u2013 czw\xf3rka"}),Object(d.jsx)("option",{value:"5",children:"5 \u2013 pi\u0105tka"}),Object(d.jsx)("option",{value:"6",children:"6 \u2013 sz\xf3stka"})]})]})]}),Object(d.jsx)("hr",{}),Object(d.jsx)("button",{type:"button",children:"Otw\xf3rz nowy pok\xf3j!"}),Object(d.jsx)("button",{type:"button",onClick:function(){W("hiding"),setTimeout((function(){W("hidden")}),2e3),setTimeout((function(){E("showing")}),4e3)},children:"Przejd\u017a do poprzedniej strony!"})]})})]}),Object(d.jsx)("div",{id:"game-container",className:q,children:Object(d.jsxs)("div",{children:[Object(d.jsx)("div",{id:"table",children:"St\xf3\u0142"}),Object(d.jsx)("div",{id:"aside",children:Object(d.jsxs)("div",{id:"chairs",children:[Object(d.jsxs)("div",{className:"chair",children:[Object(d.jsx)("div",{children:"Krzes\u0142o 1"}),Object(d.jsx)("div",{children:Object(d.jsx)("span",{className:"chair-busy",children:"user-1"})})]}),Object(d.jsxs)("div",{className:"chair",children:[Object(d.jsx)("div",{children:"Krzes\u0142o 2"}),Object(d.jsx)("div",{children:Object(d.jsx)("span",{className:"chair-busy",children:"user-2"})})]}),Object(d.jsxs)("div",{className:"chair",children:[Object(d.jsx)("div",{children:"Krzes\u0142o 3"}),Object(d.jsx)("div",{children:Object(d.jsx)("button",{type:"button",children:"Usi\u0105d\u017a"})})]}),Object(d.jsxs)("div",{className:"chair",children:[Object(d.jsx)("div",{children:"Krzes\u0142o 4"}),Object(d.jsx)("div",{children:Object(d.jsx)("span",{className:"chair-not-available",children:"Niedost\u0119pne"})})]})]})})]})})]})},l=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,40)).then((function(a){var t=a.getCLS,i=a.getFID,n=a.getFCP,o=a.getLCP,s=a.getTTFB;t(e),i(e),n(e),o(e),s(e)}))};s.a.render(Object(d.jsx)(n.a.StrictMode,{children:Object(d.jsx)(j,{})}),document.getElementById("root")),l()}},[[39,1,2]]]);
//# sourceMappingURL=main.64297d5c.chunk.js.map
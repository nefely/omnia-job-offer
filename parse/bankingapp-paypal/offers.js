/* =====================================================================
   ПЕРЕМИКАЧ ОФФЕРІВ
   ---------------------------------------------------------------------
   Від кого приходять надходження (Money received) у транзакціях і сторіз.

   Як перемкнути:
     1) змінити ACTIVE_OFFER нижче на id потрібного оффера, або
     2) відкрити сторінку з параметром: index.html?offer=<id>
        (параметр у URL має пріоритет над ACTIVE_OFFER)

   id оффера = параметр у URL: тільки малі латинські літери та цифри,
   без пробілів, дефісів і підкреслень (gravypass, playfulrewards).
   Назва для показу в апці (n) може бути з пробілами: "Playful Rewards".

   Як додати новий оффер:
     - покласти лого в img/ (наприклад img/offers/swagbucks.png)
     - додати запис в OFFERS:
         id: { n: "Назва", l: "шлях/до/лого.png", amounts: [...] }
       amounts — необов'язково. Якщо задати, суми надходжень підставляться
       по черзі (зараз у стрічці 7 надходжень). Якщо не задати — лишаться
       стандартні суми ($50–150). Пишіть суми з центами (87.43, а не 85).
   ===================================================================== */

const ACTIVE_OFFER = "freecash";

const OFFERS = {
  // ?offer=freecash
  freecash: { n: "Freecash", l: "img/offers/freecash.png" },

  // ?offer=gravypass — https://www.gravypass.com/
  gravypass: { n: "Gravy Pass", l: "img/offers/gravypass.png", amounts: [92.36, 57.81, 113.49, 68.27, 131.74, 54.92, 97.15] },

  // ?offer=playfulrewards — https://www.playfulrewards.com/
  playfulrewards: { n: "Playful Rewards", l: "img/offers/playfulrewards.png", amounts: [73.58, 126.44, 58.63, 89.17, 142.39, 66.82, 101.95] },
};

/* --- не чіпати: визначення активного оффера --- */
window.OFFERS_ALL = OFFERS; // для перемикача офферів всередині апки
window.OFFER = (() => {
  // id для URL: тільки малі латинські літери та цифри, без пробілів/дефісів (gravypass, playfulrewards)
  const slug = s => String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  Object.keys(OFFERS).forEach(k => { if (k !== slug(k)) console.warn(`Offer id "${k}" має бути "${slug(k)}" (тільки a-z, 0-9)`); });
  const fromUrl = slug(new URLSearchParams(location.search).get("offer"));
  // кеш: при повторному заході без ?offer= береться той самий оффер, що й минулого разу
  const KEY = "pp-offer";
  let saved = ""; try { saved = localStorage.getItem(KEY) || ""; } catch (e) {}
  const id = fromUrl && OFFERS[fromUrl] ? fromUrl : (OFFERS[saved] ? saved : ACTIVE_OFFER);
  try { if (OFFERS[id]) localStorage.setItem(KEY, id); } catch (e) {}
  if (!OFFERS[id]) { console.warn(`Offer "${id}" not found, fallback to first`); return Object.values(OFFERS)[0]; }
  return { id, ...OFFERS[id] };
})();

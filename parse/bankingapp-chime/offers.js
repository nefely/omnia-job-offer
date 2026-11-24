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
       стандартні суми ($50–140). Пишіть суми з центами (87.43, а не 85).
       Ліміти: Freecash $40–50, Gravy Pass і Playful Rewards $50–200.
   ===================================================================== */

const ACTIVE_OFFER = "freecash";

const OFFERS = {
  // ?offer=freecash
  // суми $40–50: база 42–48, бо при кожному заході додається зсув ±$1–2
  freecash: { n: "Freecash", l: "img/offers/freecash.png", amounts: [44.37, 47.62, 42.85, 45.19, 46.73, 43.58, 47.14] },

  // ?offer=gravypass — https://www.gravypass.com/
  // суми $50–200: база 53–196 (з урахуванням зсуву ±$1–2)
  gravypass: { n: "Gravy Pass", l: "img/offers/gravypass.png", amounts: [92.36, 57.81, 163.49, 68.27, 131.74, 54.92, 187.15] },

  // ?offer=playfulrewards — https://www.playfulrewards.com/
  playfulrewards: { n: "Playful Rewards", l: "img/offers/playfulrewards.png", amounts: [73.58, 176.44, 58.63, 112.17, 142.39, 66.82, 194.25] },
};

/* --- не чіпати: визначення активного оффера --- */
window.OFFERS_ALL = OFFERS; // для перемикача офферів всередині апки
window.OFFER = (() => {
  // id для URL: тільки малі латинські літери та цифри, без пробілів/дефісів (gravypass, playfulrewards)
  const slug = s => String(s || "").toLowerCase().replace(/[^a-z0-9]/g, "");
  Object.keys(OFFERS).forEach(k => { if (k !== slug(k)) console.warn(`Offer id "${k}" має бути "${slug(k)}" (тільки a-z, 0-9)`); });
  const fromUrl = slug(new URLSearchParams(location.search).get("offer"));
  // кеш: при повторному заході без ?offer= береться той самий оффер, що й минулого разу
  const KEY = "ch-offer"; // свій ключ, щоб не перетинатися з PayPal/Cash App на тому ж домені
  let saved = ""; try { saved = localStorage.getItem(KEY) || ""; } catch (e) {}
  const id = fromUrl && OFFERS[fromUrl] ? fromUrl : (OFFERS[saved] ? saved : ACTIVE_OFFER);
  try { if (OFFERS[id]) localStorage.setItem(KEY, id); } catch (e) {}
  if (!OFFERS[id]) { console.warn(`Offer "${id}" not found, fallback to first`); return Object.values(OFFERS)[0]; }
  return { id, ...OFFERS[id] };
})();

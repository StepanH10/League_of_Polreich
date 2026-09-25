// Hlášky šéfa (citace z pořadu). Hláška se situací je objekt { context, text }.
const quotes = [
  'To musíte dát do lednice, jinak se vám z toho tady někdo posere do vejšky.',
  'Blíží se podzim. Začínají padat kameramani.',
  { context: 'O obřím stejku', text: 'Tady někdo přejel na ulici slona… koloběžkou, ty vole.' },
  'Tohle pamatuje Žižku, když měl ještě vobě voči.',
  'Ty jsi k tomu přišel jak nedoslýchavej k violoncellu.',
  'Ještě, že to máte blízko na letiště, pro ty pytlíky na blití!',
  'Sem utahanej jak šňůra od hajzlu.',
  'Víš co je jedno? Jedno je, strčit si dva prsty do prdele a jeden olíznout!',
  'Tahle strouhanka je jako písek na chodníky.',
  'No, tady máme restauraci a lékárnu v jednom baráku, to je celkem praktická kombinace.',
  'V kuchyni neznám bratra. Míval jsem to tak, že v posteli ani ségru.',
  'Vařej kamarádi táborových ohňů.',
  'Počkej, ty to tam sypeš jak Babica.',
  { context: 'Příprava zátěžového oběda', text: 'Od šesti od rána tady lítám jako puk na náledí.' },
  'Ty vole vohol se, seš zarostlej jak náhradní Kristus.',
  'Já jsem ukecanej, že bych mohl mluvit na sjezdu porodních asistentek.',
  'Do psích pochev urousanejch!',
  { context: 'Vycpaný jelen na zdi', text: 'Tuhle rybu jsem taky ještě neviděl…' },
  'Neříkej mi buzerante, nebo tě praštím kabelkou... a posypu tě pudrem!',
  'Viděl jsem hada srát, žábu bušit pěstí do skály, koně zvracet v barvách francouzský trikolóry, dokonce jsem viděl i stíhačku couvat, ale tohleto jsem teda ještě neviděl.',
  'Teď dávat bacha abych se nezpotil, protože mi vyskočí na čele pytlík s vegetou z tohodle jídla.',
  { context: 'Hodnocení úrovně stravovacího zařízení', text: 'Tohle je na sjezd trabantistů, tak maximálně.' },
  'V tomhle je brambor asi jako rychlosti v cikánským kolotoči. To je shit v pevným skupenství. To je mrdina s.r.o!',
  'Pane, chcete oblohu? Podívejte se z okna.',
  'Uprostřed plzeňských hvozdů servírujeme hrdě čínské nudle.',
  'Největším nepřítelem českých kuchařů je jejich fantazie.',
  'Jídelní lístek je napsanej jako Vojna a mír.',
  'Ta omáčka je silná jako noha od kulečníku.',
  'Ty do toho kloveš jak vrána do hovna.',
  'Čumí jak bulhar do mlátičky.',
  'Já mám žízeň, že bych mohl lemtat ve dvou hospodách najednou.',
  'Ten losos si zaplaval ve friťáku?',
  'To vypadá jak kinderscheisse.',
  'Nehrab se v tom jak student v pochvě.',
  'Mluv nebo ser písmena! Máš na vybranou.',
  'Šlo nám to tak dobře, že to dokonce lidi jedli.',
  'Kouká na mě jak pětikilovej datel.',
  'Začal jsem si s tebou tykat, abych tě líp mohl poslat do prdele.',
  'Každým dalším hermelínem v bramboráku si zhoršujete pověst. To je gastronomický východoněmecký porno.',
  'Váš kuchař bydlí ve Slaným a navrchu těch těstovin zpívá Petr Spálený.',
  'V kartách se říká - když nevíš, tak si troufni. V český gastronomii platí - když nevíš, tak to posyp sejrem.',
  'Já bych mu roztrh prdel až k lopatkám, když ho vidim.',
  'Jste ta nejhorší možná kombinace, jakou si majitel může přát. Nic neumíte a ještě na to serete.',
  'Ty do toho čumíš jak kráva do hodin!',
  'Nejrozšířenější české koření je strouhanka.',
  'Tohle kdybych sněd celý, tak se mi zejtra budou u prdele rojit včely.',
  'Tady je takovej bordel, že se mlží i čočka u kamery.',
  'Tady kdyby kandidoval do parlamentu smaženej řízek, tak má devadesát procent.',
  'Tam je sejra, že se to lepí jak hovno na košili.',
  'Všichni maj pocit, že hospodský maj v prdeli mincovnu. Že se přikrčíme a nasereme spoustu peněz a jdeme je utratit večer za děvky. Ale tak to není.',
];

// Text hlášky tak, jak se zobrazí na stránce
function format(quote) {
  if (typeof quote === 'string') return `„${quote}“`;
  return `${quote.context}: „${quote.text}“`;
}

export function initQuotes() {
  const quote = document.getElementById('hlaska');
  const button = document.getElementById('dalsi-hlaska');
  if (!quote || !button) return;

  const text = quote.querySelector('p') ?? quote;

  // Index aktuální hlášky podle výchozího textu v HTML
  let current = quotes.findIndex((q) => format(q) === text.textContent.trim());

  button.addEventListener('click', () => {
    let next;
    do {
      next = Math.floor(Math.random() * quotes.length);
    } while (next === current);

    current = next;
    text.textContent = format(quotes[current]);
  });
}

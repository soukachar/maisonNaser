// Numéro professionnel au format international, sans signe +.
const whatsappNumber = '212608159227';
const catalog = [
  { image: 'jewel0.webp', price: 320, fr: 'Collier Médaillon', ar: 'قلادة الميدالية' },
  { image: 'jewel1.webp', price: 240, fr: 'Boucles Croissant', ar: 'أقراط الهلال' },
  { image: 'jewel2.webp', price: 390, fr: 'Manchette Ondée', ar: 'سوار الموجة' }
];
const copy = {
  fr: {
    navCollection: 'Collection', category: 'Bijouterie · Fès', headline: 'L’éclat de l’or.',
    lead: 'Un médaillon, un croissant, une manchette. Trois façons de porter la lumière.',
    explore: 'Découvrir les bijoux', collectionTitle: 'La collection',
    instruction: 'Choisissez un bijou pour préparer votre demande sur WhatsApp.',
    demo: 'Boutique de démonstration · Prix indicatifs', order: 'Commander sur WhatsApp',
    heroAlt: 'Collier doré sur une étoffe terracotta', title: 'Maison Nacre · Bijoux',
    message: (name, price) => 'Bonjour, je souhaite commander le bijou « ' + name + ' » (' + price + '). Est-il disponible ?'
  },
  ar: {
    navCollection: 'المجموعة', category: 'مجوهرات · فاس', headline: 'بريق الذهب',
    lead: 'قلادة وهلال وسوار. ثلاث قطع تعكس الضوء بطريقتها الخاصة.',
    explore: 'اكتشفي المجوهرات', collectionTitle: 'مجموعة المجوهرات',
    instruction: 'اختاري قطعة لتجهيز طلبك عبر واتساب.',
    demo: 'متجر تجريبي · الأسعار استرشادية', order: 'اطلبي عبر واتساب',
    heroAlt: 'قلادة ذهبية اللون على قماش بلون الطين', title: 'ميزون ناكر · مجوهرات',
    message: (name, price) => 'مرحباً، أود طلب «' + name + '» (' + price + '). هل هذه القطعة متوفرة؟'
  }
};
function productCard(product, lang) {
  const card = document.createElement('article');
  const photo = document.createElement('img');
  photo.src = product.image;
  photo.alt = product[lang];
  photo.loading = 'lazy';
  const name = document.createElement('h3');
  name.textContent = product[lang];
  const price = document.createElement('p');
  price.className = 'price';
  price.textContent = product.price + (lang === 'fr' ? ' DH' : ' درهم');
  const link = document.createElement('a');
  link.className = 'order';
  link.textContent = copy[lang].order;
  const message = copy[lang].message(product[lang], price.textContent);
  link.href = 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(message);
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  card.append(photo, name, price, link);
  return card;
}
function showLanguage(lang) {
  const words = copy[lang];
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.title = words.title;
  for (const id of ['navCollection','category','headline','lead','explore','collectionTitle','instruction','demo']) {
    document.getElementById(id).textContent = words[id];
  }
  document.getElementById('heroImage').alt = words.heroAlt;
  const button = document.getElementById('language');
  button.lang = lang === 'fr' ? 'ar' : 'fr';
  button.textContent = lang === 'fr' ? 'العربية' : 'Français';
  document.getElementById('products').replaceChildren(...catalog.map(item => productCard(item, lang)));
}
document.getElementById('language').addEventListener('click', event => {
  const lang = event.currentTarget.lang;
  location.hash = lang === 'ar' ? 'ar' : 'fr';
  showLanguage(lang);
});
window.addEventListener('hashchange', () => {
  if (['#ar','#fr'].includes(location.hash)) showLanguage(location.hash.slice(1));
});
showLanguage(location.hash === '#ar' ? 'ar' : 'fr');

/* Local UI only: no cookies, browser storage, analytics or network requests. */
(() => {
  "use strict";
  const picker = document.getElementById("policy-language");
  const cards = Array.from(document.querySelectorAll(".policy-card"));
  if (!picker || cards.length !== 3) return;
  const translations = {
    en: {
      skip: "Skip to content", studio: "The studio", game: "The game", contact: "Contact",
      title: "Privacy\npolicy.", subtitle: "Your game. Your language.\nChoose a language to read the policy.",
      details: "THE DETAILS", developer: "Developer", platform: "Platform", package: "Package",
      privacyQuestions: "PRIVACY QUESTIONS?", backStudio: "← Back to the studio", home: "Home",
      policyName: "Privacy policy", languageLabel: "Language", dateLabel: "Last updated", date: "15 November 2026"
    },
    ru: {
      skip: "Перейти к содержанию", studio: "Студия", game: "Игра", contact: "Контакты",
      title: "Политика\nконфиденциальности", subtitle: "Твоя игра. Твой язык.\nВыбери язык политики конфиденциальности.",
      details: "ОБ ИГРЕ", developer: "Разработчик", platform: "Платформа", package: "Пакет",
      privacyQuestions: "ВОПРОСЫ О ПРИВАТНОСТИ?", backStudio: "← На сайт студии", home: "Главная",
      policyName: "Политика конфиденциальности", languageLabel: "Язык", dateLabel: "Обновлено", date: "15 ноября 2026 года"
    },
    nl: {
      skip: "Naar de inhoud", studio: "De studio", game: "De game", contact: "Contact",
      title: "Privacybeleid.", subtitle: "Jouw game. Jouw taal.\nKies een taal om het privacybeleid te lezen.",
      details: "DE GEGEVENS", developer: "Ontwikkelaar", platform: "Platform", package: "Pakket",
      privacyQuestions: "VRAGEN OVER PRIVACY?", backStudio: "← Terug naar de studio", home: "Home",
      policyName: "Privacybeleid", languageLabel: "Taal", dateLabel: "Laatst bijgewerkt", date: "15 november 2026"
    }
  };
  const supported = value => Object.prototype.hasOwnProperty.call(translations, value);
  const hashLanguage = () => location.hash.slice(1).toLowerCase();
  function showLanguage(language, updateAddress) {
    if (!supported(language)) return;
    const copy = translations[language];
    cards.forEach(card => { card.hidden = card.id !== language; });
    picker.value = language;
    document.documentElement.lang = language;
    document.querySelectorAll("[data-i18n]").forEach(element => {
      const key = element.dataset.i18n;
      if (Object.prototype.hasOwnProperty.call(copy, key)) element.textContent = copy[key];
    });
    document.getElementById("languages").setAttribute("aria-label", copy.languageLabel);
    document.title = copy.policyName + " · Leha's Klootzooi · Dead PX Studios";
    if (updateAddress) {
      try { history.replaceState(null, "", "#" + language); } catch (_) { /* File previews may restrict history. */ }
    }
  }
  picker.addEventListener("change", () => showLanguage(picker.value, true));
  window.addEventListener("hashchange", () => {
    const language = hashLanguage();
    if (supported(language)) showLanguage(language, false);
  });
  document.querySelectorAll(".back-top").forEach(link => link.addEventListener("click", event => {
    event.preventDefault();
    document.getElementById("languages").scrollIntoView({block: "start", behavior: "auto"});
    picker.focus({preventScroll: true});
  }));
  const requested = hashLanguage();
  showLanguage(supported(requested) ? requested : "en", false);
})();

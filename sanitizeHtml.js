function sanitizeHtml(htmlString = "") {
    return htmlString.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  }

  // ЭКСПОРТ ФУНКЦИИ ИЗ МОДУЛЯ
  export {sanitizeHtml};
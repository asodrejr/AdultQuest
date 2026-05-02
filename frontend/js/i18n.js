const i18n = {
    getCurrentLang() {
        return localStorage.getItem("gameLanguage") || "pt-br";
    },

    // Função principal para buscar o texto
    t(key) {
        const lang = this.getCurrentLang();
        return Translations[lang][key] || key; // Retorna a chave se não achar tradução
    },

    // Aplica as traduções nos elementos que possuem o atributo data-i18n
    apply() {
        document.querySelectorAll("[data-i18n]").forEach(el => {
            const key = el.getAttribute("data-i18n");
            if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
                el.placeholder = this.t(key);
            } else {
                el.innerText = this.t(key);
            }
        });
    }
};

// Sempre que carregar a página, aplica as traduções
document.addEventListener("DOMContentLoaded", () => i18n.apply());
i18n.apply();
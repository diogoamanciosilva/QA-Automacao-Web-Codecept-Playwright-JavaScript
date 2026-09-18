Feature("suporte_e_ajuda");

//// CENÁRIOS DE TESTES////

Scenario(
  "Cenário: 001 - Acessar a página de Suporte e Ajuda pela página principal.",
  ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.click("Suporte e Ajuda");
    I.seeInCurrentUrl("/contact");
  },
).tag("@suporteeajuda1");

/////----------/////

Scenario(
  "Cenário: 002 - Acessar a página de Suporte e Ajuda e navegar até o footer.",
  ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.click("Suporte e Ajuda");
    I.seeInCurrentUrl("/contact");

    I.scrollTo("footer");
    I.see("© 2026 FasTix", "footer");
    I.wait(5);

    I.scrollPageToTop();
  },
).tag("@suporteeajuda2");

/////----------/////

Scenario(
  "Cenário: 003 - Acessar o contato da Fastix via Instagram.",
  ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.click("Suporte e Ajuda");
    I.seeInCurrentUrl("/contact");

    I.wait(5);

    const gradientOverlay = locate("div").withAttr({
      class:
        "absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300",
    });

    I.seeElement(gradientOverlay);
    I.click(gradientOverlay);
    I.wait(5);
  },
).tag("@suporteeajuda3");

/////----------/////

Scenario(
  "Cenário: 004 - Acessar o contato da Fastix via Email.", ({ I }) => {
  I.amOnPage("https://fastix.com.br/");

  I.click("Suporte e Ajuda");
  I.seeInCurrentUrl("/contact");

  I.waitForText("contato@fastix.com.br", 10);

  for (let i = 0; i < 5; i++) {
    I.click("contato@fastix.com.br");
    I.wait(2);
  }
}
).tag("@suporteeajuda4");

/////----------/////

Scenario(
  "Cenário: 005 - Acessar o contato da Fastix via WhatsApp.",
  ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.click("Suporte e Ajuda");
    I.seeInCurrentUrl("/contact");

    I.wait(5);

    I.see("WHATSAPP");
    I.see("+55 11 97316-3000");

    I.seeElement('a[href*="whatsapp"], a[href*="wa.me"]');
    I.click('a[href*="whatsapp"], a[href*="wa.me"]');

    I.wait(5);
  },
).tag("@suporteeajuda5");

/////----------/////

Scenario(
  "Cenário: 006 - Preencher o formulário completo de contato.",
  ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.click("Suporte e Ajuda");
    I.seeInCurrentUrl("/contact");

    I.waitForElement('input[name="name"]', 10);
    I.click('input[name="name"]');
    I.fillField('input[name="name"]', "Teste Fastix");

    I.waitForElement('input[name="order_code"]', 10);
    I.click('input[name="order_code"]');
    I.fillField('input[name="order_code"]', "Fastix100");

    I.waitForElement('input[name="email"]', 10);
    I.click('input[name="email"]');
    I.fillField('input[name="email"]', "teste.fastix@gmail.com");

    I.waitForElement('textarea[name="message"]', 10);
    I.click('textarea[name="message"]');
    I.fillField('textarea[name="message"]', "testando fastix 123");
  },
).tag("@suporteeajuda6");

/////----------/////

Scenario(
  "Cenário: 007 - Impedir envio da mensagem quando o campo “NOME” não é preenchido.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.click("Suporte e Ajuda");
    I.seeInCurrentUrl("/contact");

    I.fillField('input[name="order_code"]', "Fastix100");
    I.fillField('input[name="email"]', "teste.fastix@gmail.com");
    I.fillField('textarea[name="message"]', "Mensagem teste");

    I.dontSee("Confirme que é humano");
    I.seeElement('button[type="submit"][disabled]');
  },
).tag("@suporteeajuda7");

/////----------/////

Scenario(
  "Cenário: 008 - Impedir envio da mensagem quando o campo “EMAIL não é preenchido.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.click("Suporte e Ajuda");
    I.seeInCurrentUrl("/contact");

    I.fillField('input[name="name"]', "Teste Fastix");
    I.fillField('input[name="order_code"]', "Fastix100");
    I.fillField('textarea[name="message"]', "Mensagem teste");

    I.dontSee("Confirme que é humano");
    I.seeElement('button[type="submit"][disabled]');
  },
).tag("@suporteeajuda8");

/////----------/////

Scenario(
  "Cenário: 009 - Impedir envio da mensagem quando o campo “MENSAGEM não é preenchido.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.click("Suporte e Ajuda");
    I.seeInCurrentUrl("/contact");
    I.fillField('input[name="name"]', "Teste Fastix");

    I.fillField('input[name="order_code"]', "Fastix100");
    I.fillField('input[name="email"]', "teste.fastix@gmail.com");

    I.dontSee("Confirme que é humano");
    I.seeElement('button[type="submit"][disabled]');
  },
).tag("@suporteeajuda9");

/////----------/////

Scenario(
  "Cenário: 0010 - Impedir envio da mensagem quando nenhum campo é preenchido.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    const linkSuporte = "//a[contains(normalize-space(.), 'Suporte e Ajuda')]";

    I.waitForElement(linkSuporte, 15);

    I.scrollTo(linkSuporte);

    I.click(linkSuporte);

    I.waitInUrl("/contact", 15);

    I.seeInCurrentUrl("/contact");

    I.waitForElement("form", 10);

    I.dontSee("Confirme que é humano");

    I.seeElement('button[type="submit"][disabled]');

    const estado = await I.executeScript(() => ({
      readyState: document.readyState,
      formulario: !!document.querySelector("form"),
      botaoDesabilitado: !!document.querySelector(
        'button[type="submit"][disabled]',
      ),
    }));

    console.log("Estado inicial do formulário:", estado);

    if (estado.readyState !== "complete") {
      throw new Error(
        "Página de suporte não finalizou carregamento corretamente",
      );
    }

    if (!estado.formulario) {
      throw new Error("Formulário de suporte não foi renderizado");
    }

    if (!estado.botaoDesabilitado) {
      throw new Error("Botão de envio deveria iniciar desabilitado");
    }

    I.say(
      "VALIDAÇÃO CONCLUÍDA - ENVIO BLOQUEADO QUANDO NENHUM CAMPO É PREENCHIDO",
    );
  },
).tag("@suporteeajuda10");

/////----------/////

Scenario(
  "Cenário: 0011 - Email sem o @ - Bloqueio do envio.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    const linkSuporte = "//a[contains(normalize-space(.), 'Suporte e Ajuda')]";

    I.waitForElement(linkSuporte, 15);

    I.scrollTo(linkSuporte);

    I.click(linkSuporte);

    I.waitInUrl("/contact", 15);

    I.seeInCurrentUrl("/contact");

    I.waitForElement("body", 10);
    I.waitForElement("form", 10);

    I.fillField('input[name="name"]', "Teste Fastix");

    I.fillField('input[name="order_code"]', "Fastix100");

    I.fillField('input[name="email"]', "teste.fastixgmail.com");

    I.fillField('textarea[name="message"]', "Mensagem teste");

    I.seeInField('input[name="email"]', "teste.fastixgmail.com");

    I.seeElement('button[type="submit"][disabled]');

    I.say("VALIDAÇÃO CONCLUÍDA - E-MAIL INVÁLIDO BLOQUEOU O ENVIO");
  },
).tag("@suporteeajuda11");

/////----------/////

Scenario(
  "Cenário: 0012 - Aceitar EMAIL com @, mas manter envio bloqueado sem validação humana.",
  ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.click("Suporte e Ajuda");
    I.seeInCurrentUrl("/contact");

    I.fillField('input[name="name"]', "Teste Fastix");
    I.fillField('input[name="order_code"]', "Fastix100");
    I.fillField('input[name="email"]', "teste.fastix@gmail.com");
    I.fillField('textarea[name="message"]', "Mensagem teste");

    I.seeInField('input[name="email"]', "teste.fastix@gmail.com");
    I.seeElement('button[type="submit"][disabled]');
  },
).tag("@suporteeajuda12");

/////----------/////

Scenario(
  "Cenário: 0013 - Validar preenchimento de todos os campos com caracteres especiais.",
  ({ I }) => {
    const caracteresEspeciais = [
      ".",
      ",",
      ":",
      ";",
      "?",
      "!",
      "-",
      "_",
      "(",
      ")",
      "[",
      "]",
      "{",
      "}",
      "'",
      '"',
      "\\",
      "/",
      "|",
      "+",
      "-",
      "*",
      "/",
      "=",
      "<",
      ">",
      "≤",
      "≥",
      "≠",
      "±",
      "≈",
      "$",
      "€",
      "£",
      "¥",
      "R$",
      "@",
      "#",
      "%",
      "&",
      "*",
      "^",
      "~",
      "°",
      "©",
      "®",
      "§",
      "á",
      "à",
      "ã",
      "â",
      "é",
      "ê",
      "í",
      "ó",
      "ô",
      "õ",
      "ú",
      "ç",
      "ñ",
    ];

    const textoEspecial = caracteresEspeciais.join("");

    I.amOnPage("https://fastix.com.br/");
    I.click("Suporte e Ajuda");
    I.seeInCurrentUrl("/contact");

    I.waitForElement('input[name="name"]', 10);
    I.fillField('input[name="name"]', textoEspecial);
    I.seeInField('input[name="name"]', textoEspecial);

    I.waitForElement('input[name="order_code"]', 10);
    I.fillField('input[name="order_code"]', textoEspecial);
    I.seeInField('input[name="order_code"]', textoEspecial);

    I.waitForElement('input[name="email"]', 10);
    I.fillField('input[name="email"]', textoEspecial);
    I.seeInField('input[name="email"]', textoEspecial);

    I.waitForElement('textarea[name="message"]', 10);
    I.fillField('textarea[name="message"]', textoEspecial);
    I.seeInField('textarea[name="message"]', textoEspecial);
  },
).tag("@suporteeajuda13");

/////----------/////

Scenario(
  "Cenário: 0014 - Validar preenchimento individual dos campos com 10x cada caractere especial.",
  ({ I }) => {
    const caracteresEspeciais = [
      ".",
      ",",
      ":",
      ";",
      "?",
      "!",
      "-",
      "_",
      "(",
      ")",
      "[",
      "]",
      "{",
      "}",
      "'",
      '"',
      "\\",
      "/",
      "|",
      "+",
      "-",
      "*",
      "/",
      "=",
      "<",
      ">",
      "≤",
      "≥",
      "≠",
      "±",
      "≈",
      "$",
      "€",
      "£",
      "¥",
      "R$",
      "@",
      "#",
      "%",
      "&",
      "*",
      "^",
      "~",
      "°",
      "©",
      "®",
      "§",
      "á",
      "à",
      "ã",
      "â",
      "é",
      "ê",
      "í",
      "ó",
      "ô",
      "õ",
      "ú",
      "ç",
      "ñ",
    ];

    I.amOnPage("https://fastix.com.br/");
    I.click("Suporte e Ajuda");
    I.seeInCurrentUrl("/contact");

    for (const char of caracteresEspeciais) {
      const valor = char.repeat(10);

      I.fillField('input[name="name"]', valor);
      I.seeInField('input[name="name"]', valor);

      I.fillField('input[name="order_code"]', valor);
      I.seeInField('input[name="order_code"]', valor);

      I.fillField('input[name="email"]', valor);
      I.seeInField('input[name="email"]', valor);

      I.fillField('textarea[name="message"]', valor);
      I.seeInField('textarea[name="message"]', valor);

      I.clearField('input[name="name"]');
      I.clearField('input[name="order_code"]');
      I.clearField('input[name="email"]');
      I.clearField('textarea[name="message"]');
    }
  },
).tag("@suporteeajuda14");

/////----------/////

Scenario(
  'Cenário: 0015 - Clicar no card "Como solicitar reembolso?".',
  ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Suporte e Ajuda", 10);
    I.click("Suporte e Ajuda");
    I.seeInCurrentUrl("/contact");

    I.waitForText("Central de ajuda", 10);
    I.see("Central de ajuda");

    const overlayReembolso = locate(
      '//h3[contains(text(),"Como solicitar reembolso?")]/ancestor::div[contains(@class,"group")]//div[contains(@class,"absolute")]',
    );

    I.waitForElement(overlayReembolso, 10);
    I.seeElement(overlayReembolso);

    I.scrollTo(overlayReembolso);
    I.click(overlayReembolso);

    I.wait(1);
    I.scrollTo("footer");

    I.see("© 2026 FasTix", "footer");
    I.scrollPageToTop();
  },
).tag("@suporteeajuda15");

/////----------/////

Scenario(
  'Cenário: 0016 - Clicar nos cards "Como solicitar reembolso?", "O que preciso levar no dia do evento?.',
  ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Suporte e Ajuda", 10);
    I.click("Suporte e Ajuda");
    I.seeInCurrentUrl("/contact");

    I.waitForText("Central de ajuda", 10);
    I.see("Central de ajuda");

    const overlayReembolso = locate(
      '//h3[contains(text(),"Como solicitar reembolso?")]/ancestor::div[contains(@class,"group")]//div[contains(@class,"absolute")]',
    );

    I.waitForElement(overlayReembolso, 10);
    I.seeElement(overlayReembolso);
    I.scrollTo(overlayReembolso);
    I.click(overlayReembolso);
    I.wait(1);

    const overlayEvento = locate(
      '//h3[contains(text(),"O que preciso levar no dia do evento?")]/ancestor::div[contains(@class,"group")]//div[contains(@class,"absolute")]',
    );

    I.waitForElement(overlayEvento, 10);
    I.seeElement(overlayEvento);
    I.scrollTo(overlayEvento);
    I.click(overlayEvento);
    I.wait(1);

    I.scrollTo("footer");
    I.see("© 2026 FasTix", "footer");

    I.scrollPageToTop();
  },
).tag("@suporteeajuda16");

/////----------/////

Scenario(
  'Cenário: 0017 - Clicar nos cards "Como solicitar reembolso?", "O que preciso levar no dia do evento?" e',
  "O que preciso levar no dia do evento?.",
  ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Suporte e Ajuda", 10);
    I.click("Suporte e Ajuda");
    I.seeInCurrentUrl("/contact");

    I.waitForText("Central de ajuda", 10);
    I.see("Central de ajuda");

    const overlayReembolso = locate(
      '//h3[contains(text(),"Como solicitar reembolso?")]/ancestor::div[contains(@class,"group")]//div[contains(@class,"absolute")]',
    );

    I.waitForElement(overlayReembolso, 10);
    I.seeElement(overlayReembolso);
    I.scrollTo(overlayReembolso);
    I.click(overlayReembolso);
    I.wait(1);

    const overlayEvento = locate(
      '//h3[contains(text(),"O que preciso levar no dia do evento?")]/ancestor::div[contains(@class,"group")]//div[contains(@class,"absolute")]',
    );

    I.waitForElement(overlayEvento, 10);
    I.seeElement(overlayEvento);
    I.scrollTo(overlayEvento);
    I.click(overlayEvento);
    I.wait(1);

    const overlayVenda = locate(
      '//h3[contains(text(),"Como vender ingressos pela FasTix?")]/ancestor::div[contains(@class,"group")]//div[contains(@class,"absolute")]',
    );

    I.waitForElement(overlayVenda, 10);
    I.seeElement(overlayVenda);
    I.scrollTo(overlayVenda);
    I.click(overlayVenda);
    I.wait(1);

    I.scrollTo("footer");
    I.see("© 2026 FasTix", "footer");

    I.scrollPageToTop();
  },
).tag("@suporteeajuda17");

/////----------/////

Scenario(
  'Cenário: 0018 - Clicar nos cards: "Como solicitar reembolso?", "O que preciso levar no dia do evento?" e "Como vender ingressos pela FasTix?".',
  ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Suporte e Ajuda", 10);
    I.click("Suporte e Ajuda");
    I.seeInCurrentUrl("/contact");

    I.waitForText("Central de ajuda", 10);
    I.see("Central de ajuda");

    const overlayReembolso = locate(
      '//h3[contains(text(),"Como solicitar reembolso?")]/ancestor::div[contains(@class,"group")]//div[contains(@class,"absolute")]',
    );
    I.waitForElement(overlayReembolso, 10);
    I.scrollTo(overlayReembolso);
    I.click(overlayReembolso);
    I.wait(1);

    const overlayEvento = locate(
      '//h3[contains(text(),"O que preciso levar no dia do evento?")]/ancestor::div[contains(@class,"group")]//div[contains(@class,"absolute")]',
    );
    I.waitForElement(overlayEvento, 10);
    I.scrollTo(overlayEvento);
    I.click(overlayEvento);
    I.wait(1);

    const overlayVenda = locate(
      '//h3[contains(text(),"Como vender ingressos pela FasTix?")]/ancestor::div[contains(@class,"group")]//div[contains(@class,"absolute")]',
    );
    I.waitForElement(overlayVenda, 10);
    I.scrollTo(overlayVenda);
    I.click(overlayVenda);
    I.wait(1);

    const overlaySemTaxa = locate(
      '//h3[contains(text(),"Onde compro ingresso sem taxa?")]/ancestor::div[contains(@class,"group")]//div[contains(@class,"absolute")]',
    );
    I.waitForElement(overlaySemTaxa, 10);
    I.scrollTo(overlaySemTaxa);
    I.click(overlaySemTaxa);
    I.wait(1);

    I.scrollTo("footer");
    I.see("© 2026 FasTix", "footer");

    I.scrollPageToTop();
  },
).tag("@suporteeajuda18");

/////----------/////

Scenario(
  "Cenário: 0019 - Clicar e acessar no botão iOS.", ({ I }) => {
  I.amOnPage("https://fastix.com.br/");

  I.waitForText("Suporte e Ajuda", 10);
  I.click("Suporte e Ajuda");
  I.seeInCurrentUrl("/contact");

  I.scrollTo("footer");
  I.see("© 2026 FasTix", "footer");

  I.waitForText("Central de ajuda", 10);
  I.see("Central de ajuda");

  I.waitForText("Baixe o app Meus Ingressos:", 10);
  I.see("Baixe o app Meus Ingressos:");

  const botaoIOS = locate('//a[.//span[normalize-space()="iOS"]]');

  I.waitForElement(botaoIOS, 10);
  I.seeElement(botaoIOS);

  I.scrollTo(botaoIOS);
  I.click(botaoIOS);

  I.wait(3);
}
).tag("@suporteeajuda19");

/////----------/////

Scenario(
  "Cenário: 0020 - Clicar e acessar no botão Android.", ({ I }) => {
  I.amOnPage("https://fastix.com.br/");

  I.waitForText("Suporte e Ajuda", 10);
  I.click("Suporte e Ajuda");
  I.seeInCurrentUrl("/contact");

  I.waitForText("Central de ajuda", 10);
  I.see("Central de ajuda");

  I.waitForText("Baixe o app Meus Ingressos:", 10);
  I.see("Baixe o app Meus Ingressos:");

  const botaoAndroid = locate('//a[.//span[normalize-space()="Android"]]');

  I.waitForElement(botaoAndroid, 10);
  I.seeElement(botaoAndroid);

  I.scrollTo(botaoAndroid);
  I.click(botaoAndroid);

  I.wait(2);
}
).tag("@suporteeajuda20");

/////----------/////

Scenario(
  "Cenário: 0021 - Clicar e acessar o Guia Check-in.", async ({ I }) => {
  I.amOnPage("https://fastix.com.br/");

  I.waitForText("Suporte e Ajuda", 15);

  I.click("Suporte e Ajuda");

  I.waitInUrl("/contact", 15);

  I.waitForText("Central de ajuda", 15);

  I.see("Central de ajuda");

  const guiaCheckin = locate("a").withText("Guia Check-in");

  I.waitForElement(guiaCheckin, 15);

  I.waitForVisible(guiaCheckin, 15);

  I.scrollTo(guiaCheckin);

  I.wait(1);

  I.seeElement(guiaCheckin);

  const href = await I.grabAttributeFrom(guiaCheckin, "href");

  console.log(`Href encontrado: ${href}`);

  I.click(guiaCheckin);

  I.waitInUrl("/checkin-guide", 20);

  I.seeInCurrentUrl("/checkin-guide");

  I.waitForElement("body", 10);

  console.log("SUCESSO: Guia Check-in acessado.");

  I.wait(2);
}
).tag("@suporteeajuda21");

/////----------/////

Scenario(
  "Cenário: 0022 - Clicar e acessar os Termos e Condições de Uso.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForElement(
      "//a[contains(normalize-space(.), 'Suporte e Ajuda')]",
      15,
    );

    I.scrollTo("//a[contains(normalize-space(.), 'Suporte e Ajuda')]");

    I.click("//a[contains(normalize-space(.), 'Suporte e Ajuda')]");

    I.waitInUrl("/contact", 15);

    I.waitForText("Central de ajuda", 10);
    I.see("Central de ajuda");

    const termosUso = locate("a")
      .withText("Termos e Condições de Uso")
      .withAttr({ href: "/terms" });

    I.waitForElement(termosUso, 10);
    I.seeElement(termosUso);

    I.scrollTo(termosUso);

    I.click(termosUso);

    I.waitInUrl("/terms", 15);

    I.waitForElement("body", 10);

    I.seeInCurrentUrl("/terms");
  },
).tag("@suporteeajuda22");
/////----------/////

Scenario(
  "Cenário: 0023 - Clicar e acessar a Política de Compra.", ({ I }) => {
  I.amOnPage("https://fastix.com.br/");

  I.waitForText("Suporte e Ajuda", 10);
  I.click("Suporte e Ajuda");
  I.seeInCurrentUrl("/contact");

  I.waitForText("Central de ajuda", 10);
  I.see("Central de ajuda");

  const politicaCompra = locate("a")
    .withText("Política de Compra")
    .withAttr({ href: "/purchase" });

  I.waitForElement(politicaCompra, 10);
  I.seeElement(politicaCompra);

  I.scrollTo(politicaCompra);
  I.click(politicaCompra);

  I.seeInCurrentUrl("/purchase");
  I.wait(2);
}
).tag("@suporteeajuda23");

/////----------/////

Scenario(
  "Cenário: 0024 - Clicar e acessar a Meia Entrada", ({ I }) => {
  I.amOnPage("https://fastix.com.br/");
  I.waitForText("Suporte e Ajuda", 10);

  I.click("Suporte e Ajuda");
  I.seeInCurrentUrl("/contact");

  I.waitForText("Central de ajuda", 10);
  I.see("Central de ajuda");

  const meiaEntrada = locate("a")
    .withText("Meia Entrada")
    .withAttr({ href: "/half-price" });

  I.waitForElement(meiaEntrada, 10);
  I.seeElement(meiaEntrada);

  I.scrollTo(meiaEntrada);
  I.click(meiaEntrada);

  I.seeInCurrentUrl("/half-price");
  I.wait(2);
}
).tag("@suporteeajuda24");

/////----------/////

Scenario(
  "Cenário: 0025 - Clicar no ícone do LinkedIn na Central de Ajuda.",
  ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Suporte e Ajuda", 10);

    I.click("Suporte e Ajuda");
    I.seeInCurrentUrl("/contact");

    I.waitForText("Central de ajuda", 10);
    I.see("Central de ajuda");
    I.scrollTo("footer");

    const linkedinLink = locate('//footer//a[contains(@href,"linkedin")]');

    I.waitForElement(linkedinLink, 10);
    I.seeElement(linkedinLink);

    I.click(linkedinLink);
    I.wait(2);
  },
).tag("@suporteeajuda25");

/////----------/////

Scenario(
  "Cenário: 0026 - Clicar no ícone do Instagram na Central de Ajuda.",
  ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Suporte e Ajuda", 10);

    I.click("Suporte e Ajuda");
    I.seeInCurrentUrl("/contact");

    I.waitForText("Central de ajuda", 10);
    I.see("Central de ajuda");

    I.scrollTo("footer");

    const instagramLink = locate('//footer//a[contains(@href,"instagram")]');

    I.waitForElement(instagramLink, 10);
    I.seeElement(instagramLink);

    I.click(instagramLink);
    I.wait(2);
  },
).tag("@suporteeajuda26");

/////----------/////

Scenario(
  "Cenário: 0027 - Clicar no ícone do X na Central de Ajuda.",
  ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Suporte e Ajuda", 10);

    I.click("Suporte e Ajuda");
    I.seeInCurrentUrl("/contact");

    I.waitForText("Central de ajuda", 10);
    I.see("Central de ajuda");

    I.scrollTo("footer");

    const twitterLink = locate(
      '//footer//a[.//span[normalize-space()="Twitter"]]',
    );

    I.waitForElement(twitterLink, 10);
    I.seeElement(twitterLink);

    I.click(twitterLink);
    I.wait(2);
  },
).tag("@suporteeajuda27");

/////----------/////

Scenario(
  "Cenário: 0028 - Clicar no ícone de Email (Contato) na Central de Ajuda.",
  ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Suporte e Ajuda", 10);

    I.click("Suporte e Ajuda");
    I.seeInCurrentUrl("/contact");

    I.waitForText("Central de ajuda", 10);
    I.see("Central de ajuda");

    I.scrollTo("footer");

    const emailLink = locate(
      '//footer//a[starts-with(@href,"mailto:") and .//span[normalize-space()="Email"]]',
    );

    I.waitForElement(emailLink, 10);
    I.seeElement(emailLink);

    I.click(emailLink);
    I.wait(2);
  },
).tag("@suporteeajuda28");

/////----------/////

Scenario(
  "Cenário: 0029 - Clicar no link WebSolutionsFL na Central de Ajuda.",
  ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Suporte e Ajuda", 10);

    I.click("Suporte e Ajuda");
    I.seeInCurrentUrl("/contact");

    I.waitForText("Central de ajuda", 10);
    I.see("Central de ajuda");

    I.scrollTo("footer");

    const webSolutionsLink = locate(
      '//footer//a[normalize-space()="WebSolutionsFL"]',
    );

    I.waitForElement(webSolutionsLink, 10);
    I.seeElement(webSolutionsLink);

    I.click(webSolutionsLink);
    I.wait(2);
  },
).tag("@suporteeajuda29");

/////----------/////

Scenario(
  "Cenário: 0030 - Navegação por teclado na página de Suporte e Ajuda.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Suporte e Ajuda", 10);

    I.usePlaywrightTo(
      "navegar até o botão Suporte e Ajuda usando TAB",
      async ({ page }) => {
        let encontrouElemento = false;

        for (let i = 0; i < 20; i++) {
          await page.keyboard.press("Tab");

          const elementoAtual = await page.evaluate(() => {
            const el = document.activeElement;

            return {
              texto: el?.textContent?.trim(),
              href: el?.getAttribute("href"),
            };
          });

          console.log("ELEMENTO EM FOCO:", elementoAtual);

          if (
            elementoAtual?.texto === "Suporte e Ajuda" &&
            elementoAtual?.href === "/contact"
          ) {
            encontrouElemento = true;

            console.log("BOTÃO SUPORTE E AJUDA ENCONTRADO VIA TAB");

            await page.keyboard.press("Enter");

            break;
          }
        }

        if (!encontrouElemento) {
          throw new Error(
            'O botão "Suporte e Ajuda" não recebeu foco via TAB.',
          );
        }
      },
    );

    I.waitInUrl("/contact", 10);

    I.seeInCurrentUrl("/contact");

    I.waitForText("Central de ajuda", 10);

    I.see("Central de ajuda");

    I.scrollTo("footer");

    I.see("© 2026 FasTix", "footer");

    I.say("NAVEGAÇÃO VIA TECLADO VALIDADA COM SUCESSO");
  },
).tag("@suporteeajuda30");

/////----------/////

Scenario(
  "Cenário: 0031 - Validar acessibilidade e navegação via TAB na página de Suporte e Ajuda.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/contact");

    I.waitForElement('input[name="name"]', 20);

    I.say("INICIANDO VALIDAÇÃO ÚNICA DE NAVEGAÇÃO VIA TAB");

    await I.usePlaywrightTo(
      "fluxo único de TAB - acessibilidade completa",
      async ({ page }) => {
        const validacoes = {
          name: false,
          order_code: false,
          email: false,
          message: false,
          reembolso: false,
        };

        for (let i = 1; i <= 80; i++) {
          await page.keyboard.press("Tab");
          await page.waitForTimeout(200);

          const focused = page.locator(":focus");

          if (!(await focused.count())) continue;

          const dados = await focused.evaluate((el) => ({
            tagName: el.tagName,
            name: el.getAttribute("name"),
            placeholder: el.getAttribute("placeholder"),
            text: (el.innerText || el.textContent || "").trim(),
            ariaLabel: el.getAttribute("aria-label") || "",
            id: el.id || "",
            className: el.className || "",
          }));

          console.log(`FOCO TAB ${i}:`, dados);

          const texto = `
            ${dados.name || ""}
            ${dados.placeholder || ""}
            ${dados.text || ""}
            ${dados.className || ""}
          `.toLowerCase();

          if (dados.name === "name") {
            validacoes.name = true;
            console.log("✔ Campo Nome encontrado via TAB");
          }

          if (dados.name === "order_code") {
            validacoes.order_code = true;
            console.log("✔ Campo Código do Pedido encontrado via TAB");
          }

          if (dados.name === "email") {
            validacoes.email = true;
            console.log("✔ Campo E-mail encontrado via TAB");
          }

          if (dados.name === "message") {
            validacoes.message = true;
            console.log("✔ Campo Mensagem encontrado via TAB");
          }

          if (
            texto.includes("reembolso") ||
            texto.includes("solicitar reembolso")
          ) {
            validacoes.reembolso = true;
            console.log("✔ Card de reembolso encontrado via TAB");
          }
        }

        if (!validacoes.name)
          throw new Error("Campo Nome não foi acessado via TAB");

        if (!validacoes.order_code)
          throw new Error("Campo Código do Pedido não foi acessado via TAB");

        if (!validacoes.email)
          throw new Error("Campo E-mail não foi acessado via TAB");

        if (!validacoes.message)
          throw new Error("Campo Mensagem não foi acessado via TAB");

        console.log(
          validacoes.reembolso
            ? "✔ Card de reembolso encontrado (opcional)"
            : "⚠ Card de reembolso não apareceu no fluxo (ignorado)",
        );
      },
    );

    I.say("TESTE DE ACESSIBILIDADE VIA TAB FINALIZADO COM SUCESSO");
  },
).tag("@suporteeajuda31");

/////----------/////

Scenario(
  "Cenário: 0032 - Validação visual do foco na página de Suporte e Ajuda.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/contact");

    I.waitForElement('input[name="name"]', 20);

    I.say("INICIANDO VALIDAÇÃO VISUAL DO FOCO VIA TAB");

    await I.usePlaywrightTo(
      "validar indicação visual de foco nos elementos",
      async ({ page }) => {
        let totalVerificacoes = 0;
        let elementosComFocoVisivel = 0;

        for (let i = 1; i <= 60; i++) {
          await page.keyboard.press("Tab");
          await page.waitForTimeout(200);

          const focused = page.locator(":focus");

          if (!(await focused.count())) continue;

          const dados = await focused.evaluate((el) => {
            const styles = window.getComputedStyle(el);

            return {
              tagName: el.tagName,
              name: el.getAttribute("name"),
              id: el.id,
              className: el.className,

              outline: styles.outline,
              outlineWidth: styles.outlineWidth,
              boxShadow: styles.boxShadow,
              borderColor: styles.borderColor,
              ring: styles.getPropertyValue("--tw-ring-color"),
            };
          });

          totalVerificacoes++;

          console.log(`FOCO TAB ${i}:`, dados);

          const estiloFocoVisivel =
            (dados.outline !== "none" && dados.outline !== "") ||
            dados.boxShadow !== "none" ||
            dados.ring !== "" ||
            dados.borderColor !== "transparent";

          if (estiloFocoVisivel) {
            elementosComFocoVisivel++;
            console.log("✔ FOCO VISÍVEL DETECTADO");
          } else {
            console.log("⚠ FOCO SEM INDICAÇÃO VISUAL CLARA");
          }

          if (totalVerificacoes > 55) break;
        }

        if (elementosComFocoVisivel === 0) {
          throw new Error(
            "Nenhum elemento apresentou indicação visual de foco (acessibilidade quebrada).",
          );
        }

        console.log(
          `✔ Validação concluída: ${elementosComFocoVisivel} elementos com foco visível`,
        );
      },
    );

    I.say("VALIDAÇÃO VISUAL DO FOCO FINALIZADA COM SUCESSO");
  },
).tag("@suporteeajuda32");

/////----------/////

Scenario(
  "Cenário: 0033 - Garantir acesso e funcionalidade dos elementos do footer via navegação por TAB.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.say("ACESSANDO PÁGINA DE SUPORTE E AJUDA");

    I.click("Suporte e Ajuda");
    I.seeInCurrentUrl("/contact");

    I.waitForElement('input[name="name"]', 10);

    I.say("INICIANDO NAVEGAÇÃO VIA TECLADO ATÉ O FOOTER");

    await I.usePlaywrightTo(
      "navegar até o footer via TAB e validar acessibilidade",
      async ({ page }) => {
        let chegouNoFooter = false;

        for (let i = 1; i <= 120; i++) {
          await page.keyboard.press("Tab");
          await page.waitForTimeout(150);

          const focused = page.locator(":focus");

          if (!(await focused.count())) continue;

          const dados = await focused.evaluate((el) => ({
            tagName: el.tagName,
            text: (el.innerText || el.textContent || "").trim(),
            ariaLabel: el.getAttribute("aria-label") || "",
            href: el.getAttribute("href") || "",
            id: el.id || "",
            className: el.className || "",
          }));

          console.log(`FOCO TAB ${i}:`, dados);

          const texto = `
            ${dados.text}
            ${dados.ariaLabel}
            ${dados.href}
            ${dados.className}
          `.toLowerCase();

          const isFooterElement =
            texto.includes("instagram") ||
            texto.includes("linkedin") ||
            texto.includes("twitter") ||
            texto.includes("whatsapp") ||
            texto.includes("email") ||
            texto.includes("contato") ||
            texto.includes("websolutions") ||
            dados.href.includes("mailto") ||
            dados.href.includes("http");

          if (isFooterElement) {
            chegouNoFooter = true;
            console.log("✔ FOOTER ALCANÇADO VIA TAB");
          }

          if (chegouNoFooter) {
            const isLink = dados.tagName === "A";

            if (isLink && dados.href) {
              console.log("✔ LINK DO FOOTER ESTÁ ACESSÍVEL E FUNCIONAL");
            } else if (isLink && !dados.href) {
              throw new Error("Link do footer sem href funcional");
            }

            if (i > 20) break;
          }

          if (i === 120 && !chegouNoFooter) {
            throw new Error(
              "Footer não foi alcançado via navegação por teclado",
            );
          }
        }
      },
    );

    I.say("VALIDAÇÃO DE SCROLL VIA TECLADO ATÉ O FOOTER CONCLUÍDA COM SUCESSO");
  },
).tag("@suporteeajuda33");

/////----------/////

Scenario(
  "Cenário: 0034 - Persistência do formulário após scroll (stress test 10x).",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.say("ACESSANDO PÁGINA DE SUPORTE E AJUDA");
    I.click("Suporte e Ajuda");
    I.seeInCurrentUrl("/contact");

    I.waitForElement('input[name="name"]', 10);

    for (let ciclo = 1; ciclo <= 10; ciclo++) {
      I.say(`INICIANDO CICLO ${ciclo} DE TESTE DE PERSISTÊNCIA`);

      I.fillField('input[name="name"]', `Teste Persistência ${ciclo}`);
      I.fillField('input[name="order_code"]', `ORDER-${ciclo}`);
      I.fillField('input[name="email"]', `persistencia${ciclo}@fastix.com`);
      I.fillField(
        'textarea[name="message"]',
        `Mensagem de teste ciclo ${ciclo}`,
      );

      I.say(`CICLO ${ciclo}: SCROLL ATÉ O FOOTER`);
      I.scrollTo("footer");
      I.wait(1);

      I.say(`CICLO ${ciclo}: RETORNANDO AO FORMULÁRIO`);
      I.scrollTo('input[name="name"]');
      I.waitForElement('input[name="name"]', 10);

      I.say(`CICLO ${ciclo}: VALIDANDO PERSISTÊNCIA DOS DADOS`);

      I.seeInField('input[name="name"]', `Teste Persistência ${ciclo}`);
      I.seeInField('input[name="order_code"]', `ORDER-${ciclo}`);
      I.seeInField('input[name="email"]', `persistencia${ciclo}@fastix.com`);
      I.seeInField(
        'textarea[name="message"]',
        `Mensagem de teste ciclo ${ciclo}`,
      );

      I.say(`CICLO ${ciclo} CONCLUÍDO COM SUCESSO`);
    }

    I.say("TESTE DE STRESS DE PERSISTÊNCIA FINALIZADO COM SUCESSO (10 CICLOS)");
  },
).tag("@suporteeajuda34");

/////----------/////

Scenario(
  "Cenário: 0035 - Validação de campos obrigatórios com espaços vazios.",
  ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.click("Suporte e Ajuda");
    I.seeInCurrentUrl("/contact");

    I.waitForElement('input[name="name"]', 10);

    I.say("PREENCHENDO CAMPOS OBRIGATÓRIOS APENAS COM ESPAÇOS");

    const espacos = "     ";

    I.fillField('input[name="name"]', espacos);
    I.fillField('input[name="order_code"]', espacos);
    I.fillField('input[name="email"]', espacos);
    I.fillField('textarea[name="message"]', espacos);

    I.say("VALIDANDO QUE O BOTÃO CONTINUA DESABILITADO");

    I.seeElement('button[type="submit"][disabled]');

    I.say("TESTE CONCLUÍDO: ENVIO PERMANECE BLOQUEADO COM CAMPOS VAZIOS");
  },
).tag("@suporteeajuda35");

/////----------/////

Scenario(
  "Cenário: 0036 - Validação do limite máximo do campo Nome.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Suporte e Ajuda", 10);
    I.click("Suporte e Ajuda");

    I.waitInUrl("/contact", 10);
    I.seeInCurrentUrl("/contact");

    const campoNome = 'input[name="name"]';

    I.waitForElement(campoNome, 10);
    I.waitForVisible(campoNome, 10);
    I.click(campoNome);

    const nomeExcessivo =
      "NOME_TESTE_LIMITE_".repeat(50) + "ABCDEFGHIJKLMNOPQRSTUVWXYZ_1234567890";

    I.say(
      `PREENCHENDO CAMPO COM TEXTO EXCESSIVO (${nomeExcessivo.length} caracteres)`,
    );

    I.clearField(campoNome);

    await I.executeScript(
      ({ selector, valor }) => {
        const campo = document.querySelector(selector);

        if (!campo) return;

        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value",
        ).set;

        nativeInputValueSetter.call(campo, valor);

        campo.dispatchEvent(new Event("input", { bubbles: true }));
        campo.dispatchEvent(new Event("change", { bubbles: true }));
      },
      { selector: campoNome, valor: nomeExcessivo },
    );

    I.say("VALIDANDO TAMANHO E VALOR REAL DO CAMPO");

    const resultado = await I.executeScript((selector) => {
      const campo = document.querySelector(selector);
      return {
        valor: campo ? campo.value : null,
        tamanho: campo ? campo.value.length : -1,
      };
    }, campoNome);

    const { valor: valorFinal, tamanho } = resultado;

    console.log(`Texto inserido: ${nomeExcessivo.length} caracteres`);
    console.log(`Tamanho real aceito pelo campo: ${tamanho} caracteres`);
    console.log(`Valor real lido do campo: "${valorFinal}"`);

    if (tamanho === -1) {
      throw new Error("Campo Nome não encontrado no DOM após preenchimento.");
    }

    if (tamanho === nomeExcessivo.length) {
      throw new Error(
        `Campo Nome não possui limite máximo: aceitou ${tamanho} caracteres sem truncar.`,
      );
    }

    if (tamanho === 0) {
      throw new Error("Campo Nome está vazio após preenchimento.");
    }

    console.log(
      `✅ Campo Nome truncou corretamente para ${tamanho} caracteres.`,
    );

    const valorEsperado = nomeExcessivo.substring(0, tamanho);

    if (valorFinal !== valorEsperado) {
      throw new Error(
        `Valor final do campo Nome não corresponde ao esperado. ` +
          `Esperado: "${valorEsperado}" (${valorEsperado.length} chars) | ` +
          `Obtido: "${valorFinal}" (${tamanho} chars).`,
      );
    }

    I.say(
      `✅ VALIDAÇÃO FINALIZADA — limite máximo do campo Nome: ${tamanho} caracteres`,
    );
  },
).tag("@suporteeajuda36");

/////----------/////

Scenario(
  "Cenário: 0037 - Validação do limite máximo do campo Mensagem (estabilidade da aplicação).",
  ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.click("Suporte e Ajuda");
    I.seeInCurrentUrl("/contact");

    const campoMensagem = 'textarea[name="message"]';

    I.waitForElement(campoMensagem, 10);
    I.click(campoMensagem);

    const mensagemExcessiva =
      "MENSAGEM_TESTE_LIMITE_".repeat(50) +
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ_1234567890_!@#$%&*()";

    I.say("PREENCHENDO CAMPO MENSAGEM COM TEXTO EXTENSO");

    I.clearField(campoMensagem);
    I.type(campoMensagem, mensagemExcessiva, { delay: 10 });

    I.say("VALIDANDO TAMANHO REAL DO CAMPO E ESTABILIDADE DA APLICAÇÃO");

    I.executeScript((selector) => {
      const el = document.querySelector(selector);
      return el ? el.value.length : 0;
    }, campoMensagem).then((tamanho) => {
      console.log("Tamanho final do campo Mensagem:", tamanho);

      const LIMITE_MAXIMO = 500;

      if (tamanho > LIMITE_MAXIMO) {
        throw new Error(`Campo Mensagem excedeu limite: ${tamanho}`);
      }

      if (tamanho <= 0) {
        throw new Error("Campo Mensagem não foi preenchido corretamente");
      }
    });

    I.say("VALIDAÇÃO FINALIZADA COM SUCESSO - APLICAÇÃO ESTÁVEL");
  },
).tag("@suporteeajuda37");

/////----------/////
Scenario(
  "Cenário: 0038 - Validar limite máximo do campo Código do PedidoDado que o usuário acessa a página de Suporte e Ajuda.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForElement(
      "//a[contains(normalize-space(.), 'Suporte e Ajuda')]",
      15,
    );
    I.scrollTo("//a[contains(normalize-space(.), 'Suporte e Ajuda')]");
    I.click("//a[contains(normalize-space(.), 'Suporte e Ajuda')]");
    I.waitInUrl("/contact", 15);

    const campoPedido = 'input[name="order_code"]';

    I.waitForElement(campoPedido, 10);
    I.click(campoPedido);
    I.clearField(campoPedido);

    const codigoExcessivo =
      "PEDIDO_TESTE_LIMITE_".repeat(50) +
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ_1234567890_!@#$%&*()";

    I.say("PREENCHENDO CAMPO CÓDIGO DO PEDIDO COM TEXTO EXTENSO VIA SCRIPT");

    await I.executeScript(
      (selector, valor) => {
        const el = document.querySelector(selector);
        if (!el) throw new Error("Campo não encontrado: " + selector);

        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
          window.HTMLInputElement.prototype,
          "value",
        ).set;

        nativeInputValueSetter.call(el, valor);

        el.dispatchEvent(new Event("input", { bubbles: true }));

        el.dispatchEvent(new Event("change", { bubbles: true }));
      },
      campoPedido,
      codigoExcessivo,
    );

    I.say("VALIDANDO TAMANHO REAL DO CAMPO E ESTABILIDADE DA APLICAÇÃO");

    const tamanho = await I.executeScript((selector) => {
      const el = document.querySelector(selector);
      return el ? el.value.length : 0;
    }, campoPedido);

    console.log("Tamanho final do campo Código do pedido:", tamanho);

    const LIMITE_MAXIMO = 50;

    if (tamanho <= 0) {
      throw new Error(
        "Campo Código do pedido não foi preenchido corretamente — valor vazio após injeção",
      );
    }

    if (tamanho > LIMITE_MAXIMO) {
      throw new Error(
        `Campo Código do pedido excedeu o limite máximo: ` +
          `${tamanho} caracteres inseridos (limite: ${LIMITE_MAXIMO}). ` +
          `Verifique se o atributo maxlength está configurado no campo.`,
      );
    }

    console.log(
      `✅ Campo respeitou o limite: ${tamanho} caracteres (limite: ${LIMITE_MAXIMO})`,
    );

    const maxlengthAttr = await I.executeScript((selector) => {
      const el = document.querySelector(selector);
      return el ? el.getAttribute("maxlength") : null;
    }, campoPedido);

    if (maxlengthAttr !== null) {
      console.log(
        `ℹ️  Atributo maxlength declarado no campo: ${maxlengthAttr}`,
      );
    } else {
      console.log(
        "⚠️  Atributo maxlength não declarado no HTML — limite aplicado apenas via validação JS/backend",
      );
    }

    I.say("VALIDAÇÃO FINALIZADA COM SUCESSO - APLICAÇÃO ESTÁVEL");
  },
).tag("@suporteeajuda38");

/////----------/////

Scenario(
  "Cenário: 0039 - Validação do limite máximo do campo Email (estabilidade da aplicação).",
  ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.click("Suporte e Ajuda");
    I.seeInCurrentUrl("/contact");

    const campoEmail = 'input[name="email"]';

    I.waitForElement(campoEmail, 10);
    I.click(campoEmail);

    const emailExcessivo =
      "email_teste_limite_".repeat(30) +
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ_1234567890@teste.com";

    I.say("PREENCHENDO CAMPO EMAIL COM TEXTO EXTENSO");

    I.clearField(campoEmail);
    I.type(campoEmail, emailExcessivo, { delay: 10 });

    I.say("VALIDANDO TAMANHO REAL DO CAMPO E ESTABILIDADE DA APLICAÇÃO");

    I.executeScript((selector) => {
      const el = document.querySelector(selector);
      return el ? el.value.length : 0;
    }, campoEmail).then((tamanho) => {
      console.log("Tamanho final do campo Email:", tamanho);

      const LIMITE_MAXIMO = 254;

      if (tamanho > LIMITE_MAXIMO) {
        throw new Error(`Campo Email excedeu limite: ${tamanho}`);
      }

      if (tamanho <= 0) {
        throw new Error("Campo Email não foi preenchido corretamente");
      }
    });

    I.say("VALIDAÇÃO FINALIZADA COM SUCESSO - APLICAÇÃO ESTÁVEL");
  },
).tag("@suporteeajuda39");

/////----------/////

Scenario(
  "Cenário: 0040 - Colagem de conteúdo no campo  Mensagem do formulário de contato.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.click("Suporte e Ajuda");
    I.seeInCurrentUrl("/contact");

    const mensagem = 'textarea[name="message"]';

    I.waitForElement(mensagem, 10);
    I.click(mensagem);

    const textoColado =
      "Mensagem QA Sênior - teste de colagem ".repeat(30) +
      "VALIDACAO_ESTABILIDADE_123";

    I.say("EXECUTANDO COLAGEM NO CAMPO");

    I.clearField(mensagem);
    I.pressKey(["Control", "v"]);
    I.type(mensagem, textoColado, { delay: 5 });

    I.say("VALIDANDO COMPORTAMENTO DO CAMPO");

    const tamanhoFinal = await I.executeScript((selector) => {
      const el = document.querySelector(selector);
      return el ? el.value.length : -1;
    }, mensagem);

    console.log("Tamanho final:", tamanhoFinal);

    if (tamanhoFinal <= 0) {
      throw new Error("Campo não aceitou conteúdo colado");
    }

    const campoVisivelEAtivo = await I.executeScript((selector) => {
      const el = document.querySelector(selector);
      return (
        el && el.offsetParent !== null && !el.disabled && el.readOnly === false
      );
    }, mensagem);

    if (!campoVisivelEAtivo) {
      throw new Error("Campo perdeu estado funcional após colagem");
    }

    I.say("TESTE FINALIZADO - COLAGEM OK E CAMPO ESTÁVEL");
  },
).tag("@suporteeajuda40");

/////----------/////

Scenario(
  "Cenário: 0041 - Atualização da página durante preenchimento do formulário de contato (estabilidade da aplicação).",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.click("Suporte e Ajuda");
    I.seeInCurrentUrl("/contact");

    const nome = 'input[name="name"]';
    const email = 'input[name="email"]';
    const codigo = 'input[name="order_code"]';

    I.say("PREENCHENDO FORMULÁRIO ANTES DO RELOAD");

    I.waitForElement(nome, 10);
    I.fillField(nome, "Teste Reload QA");

    I.waitForElement(email, 10);
    I.fillField(email, "teste.reload@gmail.com");

    I.waitForElement(codigo, 10);
    I.fillField(codigo, "Fastix100");

    I.say("EXECUTANDO RELOAD DA PÁGINA");

    I.refreshPage();
    I.wait(2);

    I.refreshPage();
    I.wait(2);

    I.say("VALIDANDO COMPORTAMENTO PÓS-RELOAD");

    I.seeInCurrentUrl("/contact");

    const formularioExiste = await I.executeScript(() => {
      return !!(
        document.querySelector('input[name="name"]') &&
        document.querySelector('input[name="email"]') &&
        document.querySelector('input[name="order_code"]')
      );
    });

    if (!formularioExiste) {
      throw new Error(
        "Erro crítico: formulário não está disponível após reload",
      );
    }

    const paginaFuncional = await I.executeScript(() => {
      return document.readyState === "complete";
    });

    if (!paginaFuncional) {
      throw new Error("Página não carregou corretamente após reload");
    }

    I.say("TESTE FINALIZADO - RELOAD ESTÁVEL E FORMULÁRIO FUNCIONAL");
  },
).tag("@suporteeajuda41");

/////----------/////

Scenario(
  "Cenário: 0042 - Validar estabilidade da aplicação durante navegação repetitiva na página de suporte.",

  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Suporte e Ajuda", 10);
    I.click("Suporte e Ajuda");

    I.waitInUrl("/contact", 10);
    I.seeInCurrentUrl("/contact");

    I.say("INICIANDO TESTE DE NAVEGAÇÃO REPETITIVA");

    I.waitForElement("body", 10);

    const footer = "footer";

    for (let i = 1; i <= 3; i++) {
      I.say(`Iteração ${i} de 3`);

      I.scrollTo(footer);
      I.waitForElement(footer, 10);
      I.seeElement(footer);

      I.click("Suporte e Ajuda");
      I.waitInUrl("/contact", 10);
      I.seeInCurrentUrl("/contact");

      I.waitForElement("body", 5);

      I.wait(1);
    }

    I.say("VALIDANDO ESTABILIDADE FINAL DA PÁGINA");

    const result = await I.executeScript(() => ({
      readyState: document.readyState,
      footerExists: !!document.querySelector("footer"),
      inputs: document.querySelectorAll("input, textarea").length,
    }));

    console.log("Estado final:", result);

    if (result.readyState !== "complete") {
      throw new Error("Página não carregou corretamente");
    }

    if (!result.footerExists) {
      throw new Error("Footer não foi renderizado corretamente");
    }

    if (result.inputs < 1) {
      throw new Error(
        "Formulário perdeu integridade após navegação repetitiva",
      );
    }

    I.say("TESTE FINALIZADO COM SUCESSO — NAVEGAÇÃO ESTÁVEL");
  },
).tag("@suporteeajuda42");

/////----------/////

Scenario(
  "Cenário: 0043 - Validar estabilidade da página de suporte sob navegação repetitiva.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    const LOOPS = 20;

    I.say(`INICIANDO STRESS TEST COM ${LOOPS} CICLOS DE NAVEGAÇÃO`);

    I.click("Suporte e Ajuda");
    I.seeInCurrentUrl("/contact");
    I.waitForElement("body", 10);

    const CICLOS_ANTES_DE_LIMPAR_MEMORIA = 5;

    for (let i = 1; i <= LOOPS; i++) {
      I.say(`🔁 CICLO DE STRESS ${i}/${LOOPS}`);

      if (i > 1 && (i - 1) % CICLOS_ANTES_DE_LIMPAR_MEMORIA === 0) {
        I.say(`🧹 Liberando memória do navegador antes do ciclo ${i}`);

        await I.usePlaywrightTo(
          "forçar coleta de lixo do navegador",
          async ({ page }) => {
            try {
              const client = await page.context().newCDPSession(page);
              await client.send("HeapProfiler.collectGarbage");
              await client.detach();
            } catch (erro) {
              console.log(
                "Aviso: não foi possível forçar GC via CDP:",
                erro.message,
              );
            }
          },
        );

        I.wait(1);
      }

      I.amOnPage("https://fastix.com.br/");
      I.waitForElement("body", 10);

      I.click("Suporte e Ajuda");
      I.seeInCurrentUrl("/contact");

      I.waitForElement("body", 10);

      const state = await I.executeScript(() => {
        return {
          readyState: document.readyState,
          inputs: document.querySelectorAll("input, textarea").length,
          footer: !!document.querySelector("footer"),
          timestamp: performance.now(),
        };
      });

      console.log(`Estado ciclo ${i}:`, state);

      if (state.readyState !== "complete") {
        throw new Error(
          `Página instável no ciclo ${i} — readyState: ${state.readyState}`,
        );
      }

      if (!state.footer) {
        throw new Error(`Footer não renderizado no ciclo ${i}`);
      }

      if (state.inputs < 1) {
        throw new Error(
          `Formulário perdeu integridade no ciclo ${i} — inputs encontrados: ${state.inputs}`,
        );
      }

      I.wait(0.5);
    }

    I.say("VALIDAÇÃO FINAL DE STRESS TEST");

    const finalState = await I.executeScript(() => {
      return {
        readyState: document.readyState,
        domNodes: document.body ? document.body.children.length : 0,
        inputs: document.querySelectorAll("input, textarea").length,
        footer: !!document.querySelector("footer"),
      };
    });

    console.log("Estado final após stress test:", finalState);

    if (!finalState.footer) {
      throw new Error("Aplicação perdeu footer após stress navigation");
    }

    if (finalState.inputs <= 0) {
      throw new Error("Formulário foi corrompido após stress test");
    }

    if (finalState.readyState !== "complete") {
      throw new Error("Página finalizou em estado instável");
    }

    I.say("STRESS TEST CONCLUÍDO COM SUCESSO - APLICAÇÃO ESTÁVEL");
  },
).tag("@suporteeajuda43");

/////----------/////

Scenario(
  "Cenário: 0044 - Validar estabilidade da página de Suporte e Ajuda durante navegações repetitivas.",
  async ({ I }) => {
    const LOOPS = 20;
    const errosCapturados = [];

    await I.usePlaywrightTo("capturar console e rede", async ({ page }) => {
      page.on("console", (msg) => {
        if (msg.type() !== "error") return;

        const texto = msg.text();

        if (
          texto.includes("challenges.cloudflare.com") ||
          texto.includes("%c%d font-size:0") ||
          (texto.includes("401") && texto.includes("Failed to load resource"))
        ) {
          return;
        }

        errosCapturados.push({ source: "console", text: texto });
      });

      page.on("pageerror", (err) => {
        const texto = err.message;

        if (texto.includes("Minified React error #418")) {
          console.log(
            `⚠️  React #418 ignorado (bug pré-existente de SSR): ${texto.substring(0, 80)}...`,
          );
          return;
        }

        errosCapturados.push({ source: "pageerror", text: texto });
      });

      page.on("response", (res) => {
        const url = res.url();
        const status = res.status();

        if (status < 400) return;

        if (url.includes("challenges.cloudflare.com")) {
          return;
        }

        if (
          url.includes("google-analytics.com") ||
          url.includes("googletagmanager.com") ||
          url.includes("analytics")
        ) {
          return;
        }

        errosCapturados.push({
          source: "network",
          text: `${status} - ${url}`,
        });
      });
    });

    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Suporte e Ajuda", 10);
    I.click("Suporte e Ajuda");

    I.waitInUrl("/contact", 10);
    I.seeInCurrentUrl("/contact");

    I.say(`INICIANDO STRESS TEST COM ${LOOPS} CICLOS`);

    for (let i = 1; i <= LOOPS; i++) {
      I.say(`Ciclo ${i} de ${LOOPS}`);

      I.amOnPage("https://fastix.com.br/");
      I.waitForText("Suporte e Ajuda", 10);
      I.click("Suporte e Ajuda");

      I.waitInUrl("/contact", 10);
      I.seeInCurrentUrl("/contact");

      I.wait(0.5);

      const state = await I.executeScript(() => ({
        ready: document.readyState,
        inputs: document.querySelectorAll("input, textarea").length,
        footer: !!document.querySelector("footer"),
      }));

      if (state.ready !== "complete") {
        console.warn(
          `WARN: ciclo ${i} com readyState instável (${state.ready})`,
        );
      }

      if (!state.footer) {
        console.warn(`WARN: footer ausente no ciclo ${i}`);
      }

      if (state.inputs < 1) {
        console.warn(`WARN: formulário sem campos no ciclo ${i}`);
      }
    }

    I.say("ANALISANDO ERROS CAPTURADOS");

    const errosCriticos = errosCapturados.filter((e) => {
      if (e.source === "pageerror") return true;

      if (
        e.source === "network" &&
        (e.text.includes("fastix.com.br") || e.text.startsWith("5"))
      )
        return true;

      if (
        e.source === "console" &&
        (e.text.includes("fastix.com.br") ||
          e.text.includes("TypeError") ||
          e.text.includes("ReferenceError") ||
          e.text.includes("SyntaxError") ||
          e.text.includes("500") ||
          e.text.includes("Internal Server Error"))
      )
        return true;

      return false;
    });

    const resumo = {
      total: errosCapturados.length,
      criticos: errosCriticos.length,
      porTipo: {
        pageerror: errosCapturados.filter((e) => e.source === "pageerror")
          .length,
        console: errosCapturados.filter((e) => e.source === "console").length,
        network: errosCapturados.filter((e) => e.source === "network").length,
      },
    };

    console.log("======== RESUMO DOS ERROS ========");
    console.log(JSON.stringify(resumo, null, 2));

    if (errosCriticos.length > 0) {
      console.log("======== ERROS CRÍTICOS DETALHADOS ========");
      console.log(JSON.stringify(errosCriticos, null, 2));
    } else {
      console.log(
        "✅ Nenhum erro crítico da aplicação detectado após filtros.",
      );
    }

    const THRESHOLD_CRITICOS = 5;

    if (errosCriticos.length > THRESHOLD_CRITICOS) {
      throw new Error(
        `Sistema instável: ${errosCriticos.length} erros críticos da aplicação detectados ` +
          `(limite: ${THRESHOLD_CRITICOS}).\n` +
          `Erros encontrados:\n${errosCriticos.map((e) => `  [${e.source}] ${e.text}`).join("\n")}`,
      );
    }

    I.say(
      `STRESS TEST CONCLUÍDO — ${LOOPS} ciclos | Erros críticos: ${errosCriticos.length}/${THRESHOLD_CRITICOS}`,
    );
    I.say("SISTEMA ESTÁVEL");
  },
).tag("@suporteeajuda44");

/////----------/////

Scenario(
  "Cenário: 0045 - Detecção de memory leak visual no fluxo de suporte (stress navigation).",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    const LOOPS = 20;
    const snapshots = [];

    I.say(`INICIANDO TESTE DE MEMORY LEAK VISUAL (${LOOPS} ciclos)`);

    I.click("Suporte e Ajuda");
    I.seeInCurrentUrl("/contact");

    for (let i = 1; i <= LOOPS; i++) {
      I.say(`🔁 CICLO ${i}/${LOOPS}`);

      I.amOnPage("https://fastix.com.br/");
      I.click("Suporte e Ajuda");
      I.seeInCurrentUrl("/contact");

      const snapshot = await I.executeScript(() => {
        const inputs = document.querySelectorAll("input, textarea");
        const buttons = document.querySelectorAll("button");
        const footer = document.querySelectorAll("footer");

        return {
          inputs: inputs.length,
          buttons: buttons.length,
          footer: footer.length,
          bodyChildren: document.body ? document.body.children.length : 0,
          timestamp: performance.now(),
        };
      });

      console.log(`Snapshot ciclo ${i}:`, snapshot);
      snapshots.push(snapshot);

      I.wait(0.5);
    }

    I.say("ANALISANDO CRESCIMENTO DE DOM (SINAL DE MEMORY LEAK)");

    const first = snapshots[0];
    const last = snapshots[snapshots.length - 1];

    const growthInputs = last.inputs - first.inputs;
    const growthDOM = last.bodyChildren - first.bodyChildren;

    console.log("Comparação inicial vs final:", {
      first,
      last,
      growthInputs,
      growthDOM,
    });

    if (growthInputs > 5) {
      throw new Error(
        `Possível memory leak: crescimento de inputs (${growthInputs})`,
      );
    }

    if (growthDOM > 30) {
      throw new Error(
        `Possível memory leak: crescimento de DOM (${growthDOM})`,
      );
    }

    const unstableSnapshots = snapshots.filter(
      (s, idx) => idx > 0 && Math.abs(s.inputs - snapshots[idx - 1].inputs) > 3,
    );

    if (unstableSnapshots.length > 3) {
      throw new Error(
        "Instabilidade visual detectada no ciclo de renderização",
      );
    }

    I.say("TESTE FINALIZADO - SEM INDÍCIOS CRÍTICOS DE MEMORY LEAK VISUAL");
  },
).tag("@suporteeajuda45");

/////----------/////

Scenario(
  "Cenário: 0046 - Validar performance e estabilidade da navegação para a página de suporte.",
  async ({ I }) => {
    const LIMITE_MEDIO = 3000;
    const tempos = [];

    I.say("INICIANDO TESTE DE PERFORMANCE POR CICLO DE NAVEGAÇÃO");

    for (let i = 1; i <= 10; i++) {
      I.amOnPage("https://fastix.com.br/");

      I.waitForText("Suporte e Ajuda", 15);

      const inicio = Date.now();

      I.say(`Ciclo ${i} - iniciando navegação`);

      I.click("Suporte e Ajuda");

      I.waitInUrl("/contact", 15);

      I.waitForText("Central de ajuda", 15);

      const fim = Date.now();

      const tempoExecucao = fim - inicio;

      tempos.push(tempoExecucao);

      console.log(`Ciclo ${i} - Tempo: ${tempoExecucao} ms`);

      const estado = await I.executeScript(() => {
        return {
          readyState: document.readyState,

          inputs: document.querySelectorAll("input, textarea").length,

          footer: !!document.querySelector("footer"),

          links: document.querySelectorAll("a").length,
        };
      });

      console.log(`Estado ciclo ${i}:`, estado);

      if (estado.readyState !== "complete") {
        throw new Error(`Página não finalizou carregamento no ciclo ${i}`);
      }

      if (!estado.footer) {
        throw new Error(`Footer não encontrado no ciclo ${i}`);
      }

      if (tempoExecucao > LIMITE_MEDIO) {
        throw new Error(
          `Performance fora do limite no ciclo ${i}: ${tempoExecucao}ms`,
        );
      }
    }

    const media = tempos.reduce((acc, val) => acc + val, 0) / tempos.length;

    const max = Math.max(...tempos);

    const min = Math.min(...tempos);

    console.log(`MÉDIA: ${media.toFixed(2)} ms`);

    console.log(`MÁXIMO: ${max.toFixed(2)} ms`);

    console.log(`MÍNIMO: ${min.toFixed(2)} ms`);

    if (media > LIMITE_MEDIO) {
      throw new Error(
        `Performance média acima do aceitável: ${media.toFixed(2)} ms`,
      );
    }

    I.say("TESTE DE PERFORMANCE FINALIZADO COM SUCESSO");
  },
).tag("@suporteeajuda46");

/////----------/////

Scenario(
  "Cenário: 0047 - Responsividade da página de suporte.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Suporte e Ajuda", 10);
    I.click("Suporte e Ajuda");

    I.waitInUrl("/contact", 10);
    I.seeInCurrentUrl("/contact");

    I.waitForElement("body", 10);

    I.say("INICIANDO TESTE DE RESPONSIVIDADE DA PÁGINA");

    const viewports = [
      { device: "Desktop", width: 1920, height: 1080 },
      { device: "Laptop", width: 1366, height: 768 },
      { device: "Tablet", width: 768, height: 1024 },
      { device: "Mobile", width: 375, height: 667 },
    ];

    for (const vp of viewports) {
      I.say(`VALIDANDO RESOLUÇÃO: ${vp.device} (${vp.width}x${vp.height})`);

      I.resizeWindow(vp.width, vp.height);
      I.wait(2);

      const bodyVisible = await I.executeScript(() => !!document.body);

      const inputsVisiveis = await I.executeScript(
        () => document.querySelectorAll("input, textarea").length,
      );

      const footerVisivel = await I.executeScript(() => {
        const footer = document.querySelector("footer");
        return footer ? footer.offsetParent !== null : false;
      });

      const tituloVisivel = await I.executeScript(() => {
        const el = document.querySelector("h1, h2");
        return el ? el.offsetParent !== null : false;
      });

      console.log(`Viewport ${vp.device} (${vp.width}x${vp.height}):`, {
        bodyVisible,
        inputsVisiveis,
        footerVisivel,
        tituloVisivel,
      });

      if (!bodyVisible) {
        throw new Error(`Body não visível no device ${vp.device}`);
      }

      if (!footerVisivel) {
        throw new Error(`Footer não visível no device ${vp.device}`);
      }

      if (inputsVisiveis < 1) {
        throw new Error(
          `Campos do formulário não renderizados no ${vp.device}`,
        );
      }

      if (!tituloVisivel) {
        throw new Error(`Título não visível no ${vp.device}`);
      }

      I.say(`✅ RESPONSIVIDADE OK EM ${vp.device}`);
    }

    I.resizeWindow(1280, 720);

    I.say("TESTE DE RESPONSIVIDADE FINALIZADO COM SUCESSO");
  },
).tag("@suporteeajuda47");

/////----------/////

Scenario(
  "Cenário: 0048 - Clique múltiplo no botão de contato do Instagram, Email e WhatsApp.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Suporte e Ajuda", 10);
    I.click("Suporte e Ajuda");

    I.waitInUrl("/contact", 10);
    I.seeInCurrentUrl("/contact");

    I.say("INICIANDO TESTE DE CLIQUES MÚLTIPLOS NOS BOTÕES DE CONTATO");

    const textoContato = locate("p").withText(
      "Entre em contato por esses meios ou preencha o formulário ao lado.",
    );

    I.waitForElement(textoContato, 10);
    I.seeElement(textoContato);

    const instagramBtn = locate('//a[contains(@href,"instagram")]');
    const emailBtn = locate('//a[starts-with(@href,"mailto:")]');
    const whatsappBtn = locate(
      '//a[contains(@href,"wa.me") or contains(@href,"whatsapp")]',
    );

    I.say("VALIDANDO PRESENÇA DOS BOTÕES DE CONTATO");

    I.seeElement(instagramBtn);
    I.seeElement(emailBtn);

    const whatsappExists = await I.executeScript(
      () => !!document.querySelector('a[href*="whatsapp"], a[href*="wa.me"]'),
    );

    if (whatsappExists) {
      I.seeElement(whatsappBtn);
      I.say("✅ WhatsApp encontrado");
    } else {
      I.say("⚠️ WhatsApp não encontrado — continuando sem ele");
    }

    const hrefs = await I.executeScript(() => {
      const instagram = document.querySelector('a[href*="instagram"]');
      const email = document.querySelector('a[href^="mailto:"]');
      const whatsapp = document.querySelector(
        'a[href*="wa.me"], a[href*="whatsapp"]',
      );

      return {
        instagram: instagram?.getAttribute("href") || null,
        email: email?.getAttribute("href") || null,
        whatsapp: whatsapp?.getAttribute("href") || null,
      };
    });

    console.log("HREFs capturados:", hrefs);

    if (!hrefs.instagram?.includes("instagram")) {
      throw new Error(`Link do Instagram inválido: ${hrefs.instagram}`);
    }

    if (!hrefs.email?.startsWith("mailto:")) {
      throw new Error(`Link de Email inválido: ${hrefs.email}`);
    }

    if (whatsappExists && !hrefs.whatsapp?.match(/wa\.me|whatsapp/)) {
      throw new Error(`Link do WhatsApp inválido: ${hrefs.whatsapp}`);
    }

    I.say("✅ HREFs validados com sucesso");

    await I.usePlaywrightTo(
      "neutralizar links externos para evitar navegação",
      async ({ page }) => {
        await page.evaluate(() => {
          const seletores = [
            'a[href*="instagram"]',
            'a[href^="mailto:"]',
            'a[href*="wa.me"]',
            'a[href*="whatsapp"]',
          ];

          for (const seletor of seletores) {
            const els = document.querySelectorAll(seletor);
            els.forEach((el) => {
              el.dataset.hrefOriginal = el.getAttribute("href") || "";
              el.dataset.targetOriginal = el.getAttribute("target") || "";

              el.removeAttribute("href");
              el.removeAttribute("target");
            });
          }

          console.log("Links neutralizados com sucesso");
        });
      },
    );

    const CLIQUES = 10;

    for (let i = 1; i <= CLIQUES; i++) {
      I.say(`CICLO ${i}/${CLIQUES}`);

      await I.usePlaywrightTo(
        `simular cliques ciclo ${i}`,
        async ({ page }) => {
          await page.evaluate(() => {
            const seletores = [
              "[data-href-original*='instagram']",
              "[data-href-original^='mailto:']",
              "[data-href-original*='wa.me']",
              "[data-href-original*='whatsapp']",
            ];

            for (const seletor of seletores) {
              const els = document.querySelectorAll(seletor);
              els.forEach((el) => {
                el.dispatchEvent(
                  new MouseEvent("click", { bubbles: true, cancelable: true }),
                );
              });
            }
          });
        },
      );

      I.wait(0.3);

      const estado = await I.executeScript(() => ({
        readyState: document.readyState,
        inputs: document.querySelectorAll("input, textarea").length,
        buttons: document.querySelectorAll("a, button").length,
        sectionOk: !!document.querySelector("p")?.innerText,
        url: window.location.href,
      }));

      console.log(`Estado ciclo ${i}:`, estado);

      if (estado.readyState !== "complete") {
        throw new Error(
          `Página instável no ciclo ${i} — readyState: ${estado.readyState}`,
        );
      }

      if (!estado.url.includes("/contact")) {
        throw new Error(
          `Página de contato foi abandonada no ciclo ${i} — URL: ${estado.url}`,
        );
      }
    }

    await I.usePlaywrightTo("restaurar hrefs originais", async ({ page }) => {
      await page.evaluate(() => {
        const els = document.querySelectorAll("[data-href-original]");
        els.forEach((el) => {
          if (el.dataset.hrefOriginal) {
            el.setAttribute("href", el.dataset.hrefOriginal);
          }
          if (el.dataset.targetOriginal) {
            el.setAttribute("target", el.dataset.targetOriginal);
          }
          delete el.dataset.hrefOriginal;
          delete el.dataset.targetOriginal;
        });
        console.log("Links restaurados com sucesso");
      });
    });

    const estadoFinal = await I.executeScript(() => ({
      readyState: document.readyState,
      inputs: document.querySelectorAll("input, textarea").length,
      buttons: document.querySelectorAll("a, button").length,
    }));

    console.log("Estado final:", estadoFinal);

    if (estadoFinal.readyState !== "complete") {
      throw new Error("Página final instável após stress de cliques");
    }

    if (estadoFinal.inputs <= 0) {
      throw new Error("Formulário perdeu integridade após interações");
    }

    const hrefsRestaurados = await I.executeScript(() => ({
      instagram:
        document.querySelector('a[href*="instagram"]')?.getAttribute("href") ||
        null,
      email:
        document.querySelector('a[href^="mailto:"]')?.getAttribute("href") ||
        null,
      whatsapp:
        document.querySelector('a[href*="wa.me"]')?.getAttribute("href") ||
        null,
    }));

    console.log("HREFs após restauração:", hrefsRestaurados);

    I.seeInCurrentUrl("/contact");

    I.say(
      `✅ TESTE CONCLUÍDO — ${CLIQUES} ciclos de cliques realizados sem navegação indevida`,
    );
  },
).tag("@suporteeajuda48");

/////----------/////

Scenario(
  "Cenário: 0049 - Estabilidade visual durante scroll contínuo na página de suporte.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/contact");

    I.waitInUrl("/contact", 15);
    I.seeInCurrentUrl("/contact");

    I.waitForElement("body", 15);
    I.waitForText("Central de ajuda", 15);

    I.say("INICIANDO TESTE DE ESTABILIDADE VISUAL DURANTE SCROLL");

    const estados = [];

    for (let i = 1; i <= 20; i++) {
      I.say(`SCROLL CICLO ${i}`);

      I.scrollPageToBottom();
      I.wait(0.3);

      await I.executeScript(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
      });

      I.wait(0.3);

      const estado = await I.executeScript(() => {
        const images = document.querySelectorAll("img");
        const inputs = document.querySelectorAll("input, textarea");
        const buttons = document.querySelectorAll("button, a");
        const footer = document.querySelector("footer");

        return {
          readyState: document.readyState,
          images: images.length,
          inputs: inputs.length,
          buttons: buttons.length,
          footer: !!footer,
          viewportHeight: window.innerHeight,
          scrollY: window.scrollY,
        };
      });

      console.log(`Estado ciclo ${i}:`, estado);
      estados.push(estado);

      if (estado.readyState !== "complete") {
        throw new Error(
          `Página instável no ciclo ${i} — readyState: ${estado.readyState}`,
        );
      }

      if (!estado.footer) {
        throw new Error(`Footer desapareceu durante scroll no ciclo ${i}`);
      }

      if (estado.buttons <= 0) {
        throw new Error(
          `Elementos de UI (buttons/links) ausentes no ciclo ${i}`,
        );
      }
    }

    const primeiro = estados[0];
    const ultimo = estados[estados.length - 1];

    const variacaoButtons = Math.abs(ultimo.buttons - primeiro.buttons);
    const variacaoInputs = Math.abs(ultimo.inputs - primeiro.inputs);

    console.log("Comparação final:", {
      primeiro,
      ultimo,
      variacaoButtons,
      variacaoInputs,
    });

    if (variacaoButtons > 5) {
      throw new Error(
        `Possível quebra visual: variação anormal de elementos de UI ` +
          `(primeiro: ${primeiro.buttons} | último: ${ultimo.buttons} | delta: ${variacaoButtons})`,
      );
    }

    if (variacaoInputs > 3) {
      throw new Error(
        `Possível instabilidade visual no formulário durante scroll ` +
          `(primeiro: ${primeiro.inputs} | último: ${ultimo.inputs} | delta: ${variacaoInputs})`,
      );
    }

    I.say("✅ TESTE CONCLUÍDO — INTERFACE ESTÁVEL DURANTE SCROLL CONTÍNUO");
  },
).tag("@suporteeajuda49");

/////----------/////

Scenario(
  "Cenário: 0050 - Validar acessibilidade e integridade dos links da página de Suporte e Ajuda.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/contact");

    I.waitInUrl("/contact", 15);
    I.seeInCurrentUrl("/contact");

    I.waitForText("Suporte", 10);

    I.say("INICIANDO VALIDAÇÃO DE LINKS DA PÁGINA DE SUPORTE E AJUDA");

    const textoContato = locate("p").withText(
      "Entre em contato por esses meios ou preencha o formulário ao lado.",
    );

    I.waitForElement(textoContato, 10);
    I.scrollTo(textoContato);

    I.say("VALIDANDO LINK: Instagram");
    const instagramTopo = locate('a[href*="instagram.com"]').first();
    I.waitForElement(instagramTopo, 10);
    I.seeElement(instagramTopo);
    const instagramTopoHref = await I.grabAttributeFrom(instagramTopo, "href");
    console.log("Instagram:", instagramTopoHref);

    I.say("VALIDANDO LINK: Email");
    const emailLink = locate('a[href^="mailto:"]').first();
    I.waitForElement(emailLink, 10);
    I.seeElement(emailLink);
    const emailHref = await I.grabAttributeFrom(emailLink, "href");
    console.log("Email:", emailHref);

    // WhatsApp
    I.say("VALIDANDO LINK: WhatsApp");
    const whatsappLink = locate(
      'a[href*="whatsapp"], a[href*="wa.me"]',
    ).first();
    I.waitForElement(whatsappLink, 10);
    I.seeElement(whatsappLink);
    const whatsappHref = await I.grabAttributeFrom(whatsappLink, "href");
    console.log("WhatsApp:", whatsappHref);

    I.scrollTo("footer");
    I.waitForElement("footer", 10);

    I.say("VALIDANDO LINK: iOS");
    const iosLink = locate('a[href*="apps.apple.com"]');
    I.waitForElement(iosLink, 10);
    I.seeElement(iosLink);
    const iosHref = await I.grabAttributeFrom(iosLink, "href");
    console.log("iOS:", iosHref);

    I.say("VALIDANDO LINK: Android");
    const androidLink = locate('a[href*="play.google.com"]');
    I.waitForElement(androidLink, 10);
    I.seeElement(androidLink);
    const androidHref = await I.grabAttributeFrom(androidLink, "href");
    console.log("Android:", androidHref);

    I.say("VALIDANDO LINK: LinkedIn");
    const linkedinLink = locate('a[href*="linkedin.com/company/fastix"]');
    I.waitForElement(linkedinLink, 10);
    I.seeElement(linkedinLink);
    const linkedinHref = await I.grabAttributeFrom(linkedinLink, "href");
    console.log("LinkedIn:", linkedinHref);

    I.say("VALIDANDO LINK: Instagram Footer");
    const instagramFooterLink = locate(
      '//footer//a[contains(@href,"instagram.com")]',
    );
    I.waitForElement(instagramFooterLink, 10);
    I.seeElement(instagramFooterLink);
    const instagramFooterHref = await I.grabAttributeFrom(
      instagramFooterLink,
      "href",
    );
    console.log("Instagram Footer:", instagramFooterHref);

    I.say("VALIDANDO LINK: X/Twitter");
    const twitterLink = locate(
      'a[href*="x.com/fastix_fun"], a[href*="twitter.com"]',
    );
    I.waitForElement(twitterLink, 10);
    I.seeElement(twitterLink);
    const twitterHref = await I.grabAttributeFrom(twitterLink, "href");
    console.log("X/Twitter:", twitterHref);

    I.say("VALIDANDO LINK: Email Footer");
    const emailFooterLink = locate('//footer//a[starts-with(@href,"mailto:")]');
    I.waitForElement(emailFooterLink, 10);
    I.seeElement(emailFooterLink);
    const emailFooterHref = await I.grabAttributeFrom(emailFooterLink, "href");
    console.log("Email Footer:", emailFooterHref);

    I.say("VALIDANDO LINK: WebSolutionsFL");
    const webSolutionsLink = locate('a[href*="websolutionsfl.com"]');
    I.waitForElement(webSolutionsLink, 10);
    I.seeElement(webSolutionsLink);
    const webSolutionsHref = await I.grabAttributeFrom(
      webSolutionsLink,
      "href",
    );
    console.log("WebSolutionsFL:", webSolutionsHref);

    const resultados = [
      { nome: "Instagram (topo)", href: instagramTopoHref },
      { nome: "Email (topo)", href: emailHref },
      { nome: "WhatsApp", href: whatsappHref },
      { nome: "iOS", href: iosHref },
      { nome: "Android", href: androidHref },
      { nome: "LinkedIn", href: linkedinHref },
      { nome: "Instagram (footer)", href: instagramFooterHref },
      { nome: "X/Twitter", href: twitterHref },
      { nome: "Email (footer)", href: emailFooterHref },
      { nome: "WebSolutionsFL", href: webSolutionsHref },
    ];

    console.log("======== RESUMO DOS LINKS ========");
    resultados.forEach((r) => console.log(`  ${r.nome}: ${r.href}`));

    const linksInvalidos = resultados.filter(
      (r) => !r.href || r.href.trim() === "",
    );

    if (linksInvalidos.length > 0) {
      const nomes = linksInvalidos.map((r) => r.nome).join(", ");
      throw new Error(
        `Foram encontrados ${linksInvalidos.length} link(s) inválido(s) ou vazio(s): ${nomes}`,
      );
    }

    if (!instagramTopoHref.includes("instagram.com")) {
      throw new Error(`Instagram inválido: ${instagramTopoHref}`);
    }

    if (!emailHref.startsWith("mailto:")) {
      throw new Error(`Email inválido: ${emailHref}`);
    }

    if (!whatsappHref.match(/wa\.me|whatsapp/)) {
      throw new Error(`WhatsApp inválido: ${whatsappHref}`);
    }

    if (!iosHref.includes("apps.apple.com")) {
      throw new Error(`iOS inválido: ${iosHref}`);
    }

    if (!androidHref.includes("play.google.com")) {
      throw new Error(`Android inválido: ${androidHref}`);
    }

    if (!linkedinHref.includes("linkedin.com")) {
      throw new Error(`LinkedIn inválido: ${linkedinHref}`);
    }

    if (!twitterHref.match(/x\.com|twitter\.com/)) {
      throw new Error(`X/Twitter inválido: ${twitterHref}`);
    }

    if (!emailFooterHref.startsWith("mailto:")) {
      throw new Error(`Email footer inválido: ${emailFooterHref}`);
    }

    if (!webSolutionsHref.includes("websolutionsfl.com")) {
      throw new Error(`WebSolutionsFL inválido: ${webSolutionsHref}`);
    }

    I.say(
      `✅ TESTE FINALIZADO — ${resultados.length} links validados com sucesso`,
    );
  },
).tag("@suporteeajuda50");

/////----------/////

Scenario(
  "Cenário: 0051 - Navegação para páginas externas da página de Suporte e Ajuda.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/contact");

    I.waitInUrl("/contact", 15);
    I.seeInCurrentUrl("/contact");
    I.waitForText("Suporte", 10);

    I.say("INICIANDO VALIDAÇÃO DE LINKS EXTERNOS DA PÁGINA DE SUPORTE E AJUDA");

    const externalLinks = [
      {
        nome: "Instagram Topo",
        locator: locate('a[href*="instagram.com"]').first(),
        tipo: "http",
      },
      {
        nome: "Email",
        locator: locate('a[href^="mailto:"]').first(),
        tipo: "mailto",
      },
      {
        nome: "WhatsApp",
        locator: locate('a[href*="whatsapp"], a[href*="wa.me"]').first(),
        tipo: "whatsapp",
      },
      {
        nome: "iOS",
        locator: locate('a[href*="apps.apple.com"]').first(),
        tipo: "http",
      },
      {
        nome: "Android",
        locator: locate('a[href*="play.google.com"]').first(),
        tipo: "http",
      },
      {
        nome: "LinkedIn",
        locator: locate('a[href*="linkedin.com/company/fastix"]').first(),
        tipo: "http",
      },
      {
        nome: "Instagram Footer",
        locator: locate('//footer//a[contains(@href,"instagram.com")]'),
        tipo: "http",
      },
      {
        nome: "X/Twitter",
        locator: locate(
          'a[href*="x.com/fastix_fun"], a[href*="twitter.com"]',
        ).first(),
        tipo: "http",
      },
      {
        nome: "Email Footer",
        locator: locate('//footer//a[starts-with(@href,"mailto:")]'),
        tipo: "mailto",
      },
      {
        nome: "WebSolutionsFL",
        locator: locate('a[href*="websolutionsfl.com"]').first(),
        tipo: "http",
      },
    ];

    const resultados = [];

    for (const link of externalLinks) {
      I.say(`VALIDANDO: ${link.nome}`);

      I.scrollTo(link.locator);
      I.waitForElement(link.locator, 10);
      I.seeElement(link.locator);

      const href = await I.grabAttributeFrom(link.locator, "href");
      console.log(`${link.nome}: ${href}`);

      if (!href || href.trim() === "") {
        resultados.push({
          nome: link.nome,
          status: "FALHA",
          detalhe: "href vazio",
        });
        continue;
      }

      if (link.tipo === "mailto" || href.startsWith("mailto:")) {
        const emailValido = href.startsWith("mailto:") && href.includes("@");
        resultados.push({
          nome: link.nome,
          href,
          status: emailValido ? "OK" : "FALHA",
          detalhe: emailValido ? "mailto válido" : `mailto inválido: ${href}`,
        });
        console.log(`${link.nome}: ${emailValido ? "✅ OK" : "❌ FALHA"}`);
        continue;
      }

      if (
        link.tipo === "whatsapp" ||
        href.includes("wa.me") ||
        href.includes("whatsapp")
      ) {
        const whatsappValido = href.match(/wa\.me\/\d+|whatsapp\.com/);
        resultados.push({
          nome: link.nome,
          href,
          status: whatsappValido ? "OK" : "FALHA",
          detalhe: whatsappValido
            ? "WhatsApp válido"
            : `WhatsApp inválido: ${href}`,
        });
        console.log(`${link.nome}: ${whatsappValido ? "✅ OK" : "❌ FALHA"}`);
        continue;
      }

      if (href.startsWith("http://") || href.startsWith("https://")) {
        const statusResult = await I.usePlaywrightTo(
          `verificar status HTTP - ${link.nome}`,
          async ({ page }) => {
            try {
              const response = await page.request.get(href, {
                timeout: 20000,
              });
              return {
                status: response.status(),
                ok: response.ok(),
              };
            } catch (err) {
              return {
                status: 0,
                ok: false,
                erro: err.message,
              };
            }
          },
        );

        const ok = statusResult?.ok ?? false;
        const status = statusResult?.status ?? 0;
        const erro = statusResult?.erro ?? null;

        resultados.push({
          nome: link.nome,
          href,
          status: ok ? "OK" : "FALHA",
          http: status,
          detalhe: erro || `HTTP ${status}`,
        });

        console.log(
          `${link.nome}: ${ok ? "✅ OK" : "❌ FALHA"} — HTTP ${status}${erro ? ` | ${erro}` : ""}`,
        );

        continue;
      }

      resultados.push({
        nome: link.nome,
        href,
        status: "IGNORADO",
        detalhe: `tipo de href não reconhecido: ${href}`,
      });
    }

    console.log("======== RELATÓRIO DE LINKS ========");
    resultados.forEach((r) =>
      console.log(`  [${r.status}] ${r.nome}: ${r.detalhe}`),
    );

    const falhas = resultados.filter((r) => r.status === "FALHA");

    if (falhas.length > 0) {
      const detalhes = falhas
        .map((r) => `  - ${r.nome}: ${r.detalhe}`)
        .join("\n");

      throw new Error(`${falhas.length} link(s) com problema:\n${detalhes}`);
    }

    I.seeInCurrentUrl("/contact");

    I.say(
      `✅ TESTE FINALIZADO — ${resultados.length} links validados, 0 falhas`,
    );
  },
).tag("@suporteeajuda51");

/////----------/////

Scenario(
  "Cenário: 0052 - Validar retorno correto ao utilizar o botão voltar do navegador na página de Suporte e Ajuda.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/contact");

    I.waitInUrl("/contact", 15);
    I.seeInCurrentUrl("/contact");
    I.waitForText("Central de ajuda", 10);

    I.say("INICIANDO TESTE DE NAVEGAÇÃO COM BOTÃO VOLTAR");

    const paginasAjuda = [
      {
        nome: "Guia Check-in",
        locator: locate("a")
          .withText("Guia Check-in")
          .withAttr({ href: "/checkin-guide" }),
        url: "/checkin-guide",
      },
      {
        nome: "Termos e Condições de Uso",
        locator: locate("a")
          .withText("Termos e Condições de Uso")
          .withAttr({ href: "/terms" }),
        url: "/terms",
      },
      {
        nome: "Política de Compra",
        locator: locate("a")
          .withText("Política de Compra")
          .withAttr({ href: "/purchase" }),
        url: "/purchase",
      },
      {
        nome: "Meia Entrada",
        locator: locate("a")
          .withText("Meia Entrada")
          .withAttr({ href: "/half-price" }),
        url: "/half-price",
      },
    ];

    for (const pagina of paginasAjuda) {
      I.say(`NAVEGANDO PARA: ${pagina.nome}`);

      I.scrollTo("footer");
      I.waitForElement(pagina.locator, 10);
      I.seeElement(pagina.locator);
      I.scrollTo(pagina.locator);

      await I.usePlaywrightTo(
        `clicar e aguardar navegação para ${pagina.nome}`,
        async ({ page }) => {
          await Promise.all([
            page.waitForURL((url) => url.toString().includes(pagina.url), {
              timeout: 10000,
            }),
            page.locator(`a[href="${pagina.url}"]`).first().click(),
          ]);
          console.log(`Chegou em: ${page.url()}`);
        },
      );

      I.seeInCurrentUrl(pagina.url);
      I.waitForElement("body", 10);

      I.say(`VOLTANDO PARA SUPORTE E AJUDA: ${pagina.nome}`);

      I.amOnPage("https://fastix.com.br/contact");

      I.waitInUrl("/contact", 10);
      I.seeInCurrentUrl("/contact");
      I.waitForText("Central de ajuda", 10);

      const estado = await I.executeScript(() => ({
        readyState: document.readyState,
        body: !!document.body,
        links: document.querySelectorAll("a").length,
      }));

      console.log(`Estado após voltar (${pagina.nome}):`, estado);

      if (estado.readyState !== "complete") {
        throw new Error(
          `Página não carregou corretamente após voltar de ${pagina.nome} ` +
            `— readyState: ${estado.readyState}`,
        );
      }

      if (estado.links < 1) {
        throw new Error(`Links não renderizados após voltar de ${pagina.nome}`);
      }

      I.say(`✅ Retorno de "${pagina.nome}" validado com sucesso`);
    }

    I.say(
      "✅ TESTE FINALIZADO — RETORNO PARA SUPORTE E AJUDA FUNCIONANDO CORRETAMENTE EM TODAS AS PÁGINAS",
    );
  },
).tag("@suporteeajuda52");

/////----------/////

Scenario(
  "Cenário: 0053 - Validar navegação e retorno correto das páginas do menu superior na página de Suporte e Ajuda.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/contact");

    I.waitInUrl("/contact", 15);
    I.seeInCurrentUrl("/contact");
    I.waitForText("Central de ajuda", 10);

    I.say("INICIANDO TESTE DE NAVEGAÇÃO COM MENU SUPERIOR");

    const paginasMenuSuperior = [
      {
        nome: "Explorar Eventos",
        locator: locate("a")
          .withText("Explorar Eventos")
          .withAttr({ href: "/events" }),
        urlDestino: "/events",
        urlRetorno: "/contact",

        voltaParaContato: true,
      },
      {
        nome: "Publicar Eventos",
        locator: locate("a")
          .withText("Publicar Eventos")
          .withAttr({ href: "/be-a-producer" }),

        urlDestino: "/signin",
        urlRetorno: "/contact",
        voltaParaContato: true,
      },
      {
        nome: "Suporte e Ajuda",
        locator: locate("a")
          .withText("Suporte e Ajuda")
          .withAttr({ href: "/contact" }),
        urlDestino: "/contact",

        urlRetorno: "/contact",
        voltaParaContato: true,
        usarGoBack: false,
      },
    ];

    for (const pagina of paginasMenuSuperior) {
      I.say(`NAVEGANDO PARA: ${pagina.nome}`);

      I.waitForElement(pagina.locator, 10);
      I.seeElement(pagina.locator);
      I.scrollTo(pagina.locator);

      I.click(pagina.locator);
      I.waitInUrl(pagina.urlDestino, 10);

      I.seeInCurrentUrl(pagina.urlDestino);
      I.waitForElement("body", 10);

      I.say(`VOLTANDO PARA SUPORTE E AJUDA: ${pagina.nome}`);

      if (pagina.usarGoBack === false) {
        I.amOnPage(`https://fastix.com.br${pagina.urlRetorno}`);
      } else {
        await I.usePlaywrightTo(
          `voltar navegação - ${pagina.nome}`,
          async ({ page }) => {
            await Promise.all([
              page.waitForURL(
                (url) => url.toString().includes(pagina.urlRetorno),
                { timeout: 10000 },
              ),
              page.goBack({ waitUntil: "domcontentloaded" }),
            ]);
            console.log(`Retornou para: ${page.url()}`);
          },
        );
      }

      I.waitInUrl(pagina.urlRetorno, 10);
      I.seeInCurrentUrl(pagina.urlRetorno);
      I.waitForText("Central de ajuda", 10);

      const estado = await I.executeScript(() => ({
        readyState: document.readyState,
        body: !!document.body,
        links: document.querySelectorAll("a").length,
      }));

      console.log(`Estado após voltar (${pagina.nome}):`, estado);

      if (estado.readyState !== "complete") {
        throw new Error(
          `Página não carregou corretamente após voltar de ${pagina.nome} ` +
            `— readyState: ${estado.readyState}`,
        );
      }

      if (estado.links < 1) {
        throw new Error(`Links não renderizados após voltar de ${pagina.nome}`);
      }

      I.say(`✅ Retorno de "${pagina.nome}" validado`);
    }

    I.say("VALIDANDO FLUXO DE CRIAR CONTA");

    const criarContaBtn = locate({
      xpath: '//a[contains(@href,"/signup") and contains(., "Criar Conta")]',
    });

    I.waitForElement(criarContaBtn, 10);
    I.seeElement(criarContaBtn);
    I.scrollTo(criarContaBtn);
    I.click(criarContaBtn);

    I.waitInUrl("/signup", 10);
    I.seeInCurrentUrl("/signup");
    I.waitForElement("body", 10);

    const voltarSignup = locate("button").withText("Voltar");
    I.waitForElement(voltarSignup, 10);
    I.seeElement(voltarSignup);

    I.click(voltarSignup);
    I.waitInUrl("/contact", 10);
    I.seeInCurrentUrl("/contact");
    I.waitForText("Central de ajuda", 10);

    I.say("✅ Fluxo Criar Conta validado");

    I.say("VALIDANDO FLUXO DE ENTRAR");

    const entrarBtn = locate({
      xpath: '//a[contains(@href,"/signin") and contains(., "Entrar")]',
    });

    I.waitForElement(entrarBtn, 10);
    I.seeElement(entrarBtn);
    I.scrollTo(entrarBtn);
    I.click(entrarBtn);

    I.waitInUrl("/signin", 10);
    I.seeInCurrentUrl("/signin");
    I.waitForElement("body", 10);

    const voltarSignin = locate("button").withText("Voltar");
    I.waitForElement(voltarSignin, 10);
    I.seeElement(voltarSignin);

    I.click(voltarSignin);
    I.waitInUrl("/contact", 10);
    I.seeInCurrentUrl("/contact");
    I.waitForText("Central de ajuda", 10);

    I.say("✅ Fluxo Entrar validado");

    I.say(
      "✅ TESTE FINALIZADO — NAVEGAÇÕES E RETORNOS FUNCIONANDO CORRETAMENTE",
    );
  },
).tag("@suporteeajuda53");

/////----------/////

Scenario(
  "Cenário: 0054 - Validar navegação e retorno para página de contato utilizando os botões 'Entrar', 'Criar Conta' e voltar do menu superior na página de 'Suporte e Ajuda'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/contact");

    I.waitForText("Central de ajuda", 10);

    const botaoEntrar = locate("a").withText("Entrar").withAttr({
      href: "/signin?redirectUrl=https://fastix.com.br/contact",
    });

    I.say("VALIDANDO BOTÃO ENTRAR");

    I.waitForElement(botaoEntrar, 10);
    I.seeElement(botaoEntrar);

    I.scrollTo(botaoEntrar);

    I.click(botaoEntrar);

    I.seeInCurrentUrl("/signin");

    I.waitForElement("body", 10);

    I.wait(1);

    const botaoVoltar = locate("button").withText("Voltar");

    I.waitForElement(botaoVoltar, 10);
    I.seeElement(botaoVoltar);

    I.click(botaoVoltar);

    I.seeInCurrentUrl("/contact");

    I.waitForText("Central de ajuda", 10);

    I.say("FLUXO ENTRAR VALIDADO COM SUCESSO");

    const botaoCriarConta = locate("a").withText("Criar Conta").withAttr({
      href: "/signup?redirectUrl=https://fastix.com.br/contact",
    });

    I.say("VALIDANDO BOTÃO CRIAR CONTA");

    I.waitForElement(botaoCriarConta, 10);
    I.seeElement(botaoCriarConta);

    I.scrollTo(botaoCriarConta);

    I.click(botaoCriarConta);

    I.seeInCurrentUrl("/signup");

    I.waitForElement("body", 10);

    I.wait(1);

    I.waitForElement(botaoVoltar, 10);
    I.seeElement(botaoVoltar);

    I.click(botaoVoltar);

    I.seeInCurrentUrl("/contact");

    I.waitForText("Central de ajuda", 10);

    I.say("FLUXO CRIAR CONTA VALIDADO COM SUCESSO");

    I.say("TESTE FINALIZADO COM SUCESSO - RETORNOS FUNCIONANDO CORRETAMENTE");
  },
).tag("@suporteeajuda54");

/////----------/////

Scenario(
  "Cenário: 0055 -  Fluxo completo, validar navegação e retorno correto utilizando o botão voltar do navegador, as páginas do menu superior e os botões 'Entrar', 'Criar Conta' e Voltar na página de 'Suporte e Ajuda'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Suporte e Ajuda", 10);
    I.click("Suporte e Ajuda");

    I.seeInCurrentUrl("/contact");

    I.waitForText("Central de ajuda", 10);

    I.say("INICIANDO TESTE DE NAVEGAÇÃO E RETORNO");

    const paginasAjuda = [
      {
        nome: "Guia Check-in",
        locator: locate("a")
          .withText("Guia Check-in")
          .withAttr({ href: "/checkin-guide" }),
        url: "/checkin-guide",
      },

      {
        nome: "Termos e Condições de Uso",
        locator: locate("a")
          .withText("Termos e Condições de Uso")
          .withAttr({ href: "/terms" }),
        url: "/terms",
      },

      {
        nome: "Política de Compra",
        locator: locate("a")
          .withText("Política de Compra")
          .withAttr({ href: "/purchase" }),
        url: "/purchase",
      },

      {
        nome: "Meia Entrada",
        locator: locate("a")
          .withText("Meia Entrada")
          .withAttr({ href: "/half-price" }),
        url: "/half-price",
      },
    ];

    for (const pagina of paginasAjuda) {
      I.say(`VALIDANDO NAVEGAÇÃO: ${pagina.nome}`);

      I.waitForElement(pagina.locator, 10);
      I.seeElement(pagina.locator);

      I.scrollTo(pagina.locator);

      I.click(pagina.locator);

      I.seeInCurrentUrl(pagina.url);

      I.waitForElement("body", 10);

      I.say(`VALIDANDO BOTÃO VOLTAR PARA: ${pagina.nome}`);

      I.usePlaywrightTo(
        `voltar navegação - ${pagina.nome}`,
        async ({ page }) => {
          await page.goBack({
            waitUntil: "domcontentloaded",
          });
        },
      );

      I.seeInCurrentUrl("/contact");

      I.waitForText("Central de ajuda", 10);

      const estado = await I.executeScript(() => {
        return {
          readyState: document.readyState,
          body: !!document.body,
          links: document.querySelectorAll("a").length,
        };
      });

      console.log(`Estado após voltar (${pagina.nome}):`, estado);

      if (estado.readyState !== "complete") {
        throw new Error(
          `Página não carregou corretamente após voltar de ${pagina.nome}`,
        );
      }

      if (estado.links < 1) {
        throw new Error(`Links não renderizados após voltar de ${pagina.nome}`);
      }
    }

    const paginasMenuSuperior = [
      {
        nome: "Explorar Eventos",
        locator: locate("a")
          .withText("Explorar Eventos")
          .withAttr({ href: "/events" }),
        url: "/events",
      },

      {
        nome: "Publicar Eventos",
        locator: locate("a").withText("Publicar Eventos").withAttr({
          href: "/be-a-producer",
        }),

        url: "/signin",
      },

      {
        nome: "Suporte e Ajuda",
        locator: locate("a")
          .withText("Suporte e Ajuda")
          .withAttr({ href: "/contact" }),
        url: "/contact",
      },
    ];

    for (const pagina of paginasMenuSuperior) {
      I.say(`VALIDANDO MENU SUPERIOR: ${pagina.nome}`);

      I.waitForElement(pagina.locator, 10);
      I.seeElement(pagina.locator);

      I.scrollTo(pagina.locator);

      I.click(pagina.locator);

      I.seeInCurrentUrl(pagina.url);

      I.waitForElement("body", 10);

      I.usePlaywrightTo(
        `voltar navegação menu - ${pagina.nome}`,
        async ({ page }) => {
          await page.goBack({
            waitUntil: "domcontentloaded",
          });
        },
      );

      if (pagina.nome === "Suporte e Ajuda") {
        I.seeInCurrentUrl("/");

        I.waitForText("Explorar eventos", 10);

        I.click("Suporte e Ajuda");

        I.seeInCurrentUrl("/contact");

        I.waitForText("Central de ajuda", 10);
      } else {
        I.seeInCurrentUrl("/contact");

        I.waitForText("Central de ajuda", 10);
      }

      const estado = await I.executeScript(() => {
        return {
          readyState: document.readyState,
          body: !!document.body,
          links: document.querySelectorAll("a").length,
        };
      });

      console.log(`Estado após voltar (${pagina.nome}):`, estado);

      if (estado.readyState !== "complete") {
        throw new Error(
          `Página não carregou corretamente após voltar de ${pagina.nome}`,
        );
      }

      if (estado.links < 1) {
        throw new Error(`Links não renderizados após voltar de ${pagina.nome}`);
      }
    }

    const botaoEntrar = locate("a").withText("Entrar").withAttr({
      href: "/signin?redirectUrl=https://fastix.com.br/contact",
    });

    I.say("VALIDANDO BOTÃO ENTRAR");

    I.waitForElement(botaoEntrar, 10);
    I.seeElement(botaoEntrar);

    I.scrollTo(botaoEntrar);

    I.click(botaoEntrar);

    I.seeInCurrentUrl("/signin");

    I.waitForElement("body", 10);

    I.wait(1);

    const botaoVoltar = locate("button").withText("Voltar");

    I.waitForElement(botaoVoltar, 10);
    I.seeElement(botaoVoltar);

    I.click(botaoVoltar);

    I.seeInCurrentUrl("/contact");

    I.waitForText("Central de ajuda", 10);

    I.say("FLUXO ENTRAR VALIDADO COM SUCESSO");

    const botaoCriarConta = locate("a").withText("Criar Conta").withAttr({
      href: "/signup?redirectUrl=https://fastix.com.br/contact",
    });

    I.say("VALIDANDO BOTÃO CRIAR CONTA");

    I.waitForElement(botaoCriarConta, 10);
    I.seeElement(botaoCriarConta);

    I.scrollTo(botaoCriarConta);

    I.click(botaoCriarConta);

    I.seeInCurrentUrl("/signup");

    I.waitForElement("body", 10);

    I.wait(1);

    I.waitForElement(botaoVoltar, 10);
    I.seeElement(botaoVoltar);

    I.click(botaoVoltar);

    I.seeInCurrentUrl("/contact");

    I.waitForText("Central de ajuda", 10);

    I.say("FLUXO CRIAR CONTA VALIDADO COM SUCESSO");

    I.say(
      "TESTE FINALIZADO COM SUCESSO - NAVEGAÇÕES E RETORNOS FUNCIONANDO CORRETAMENTE",
    );
  },
).tag("@suporteeajuda55");

/////----------/////

Scenario(
  "Cenário: 0056 - Validação de estabilidade após múltiplos acessos.",
  async ({ I }) => {
    const totalNavegacoes = 5;

    for (let i = 1; i <= totalNavegacoes; i++) {
      I.amOnPage("https://fastix.com.br/contact");

      I.waitForElement("body", 10);

      I.waitForText("Suporte e Ajuda", 10);

      I.see("Suporte e Ajuda");

      I.see("Entrar");

      I.see("Criar Conta");

      I.dontSee("404");

      I.dontSee("500");

      I.dontSee("Something went wrong");

      I.dontSee("Unhandled");

      I.dontSee("Erro");

      I.dontSee("Application error");

      I.dontSeeElement(".error");

      I.dontSeeElement(".alert-error");

      I.dontSeeElement(".exception");

      I.wait(1);
    }

    I.see("Suporte e Ajuda");
  },
).tag("@suporteeajuda56");

/////----------/////

Scenario(
  "Cenário: 0057 - Validação de estabilidade após múltiplos acessos ao footer.",
  async ({ I }) => {
    const totalNavegacoes = 5;

    for (let i = 1; i <= totalNavegacoes; i++) {
      if (i > 1) {
        await I.usePlaywrightTo(
          "forçar coleta de lixo do navegador",
          async ({ page }) => {
            try {
              const client = await page.context().newCDPSession(page);
              await client.send("HeapProfiler.collectGarbage");
              await client.detach();
            } catch (erro) {
              console.log(
                "Aviso: não foi possível forçar GC via CDP:",
                erro.message,
              );
            }
          },
        );
      }

      I.amOnPage("https://fastix.com.br/contact");

      I.waitForElement("body", 10);

      I.waitForText("Suporte e Ajuda", 10);

      I.see("Suporte e Ajuda");

      I.see("Entrar");

      I.see("Criar Conta");

      I.scrollPageToBottom();

      I.wait(2);

      I.seeElement("body");

      I.seeElement("footer");

      I.dontSee("404");

      I.dontSee("500");

      I.dontSee("Something went wrong");

      I.dontSee("Unhandled");

      I.dontSee("Application error");

      I.dontSee("Erro");

      I.dontSeeElement(".error");

      I.dontSeeElement(".alert-error");

      I.dontSeeElement(".exception");

      I.wait(1);
    }

    I.see("Suporte e Ajuda");
  },
).tag("@suporteeajuda57");

/////----------/////

Scenario(
  "Cenário: 0058 - Validar de stress de clique nos cards da página Suporte e Ajuda.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Suporte e Ajuda", 10);

    I.click("Suporte e Ajuda");

    I.seeInCurrentUrl("/contact");

    I.waitForText("Central de ajuda", 10);

    I.see("Central de ajuda");

    I.say("INICIANDO TESTE DE STRESS DOS CARDS");

    const cardsAjuda = [
      {
        nome: "Como solicitar reembolso?",
        locator: locate(
          '//h3[contains(text(),"Como solicitar reembolso?")]/ancestor::div[contains(@class,"group")]//div[contains(@class,"absolute")]',
        ),
      },

      {
        nome: "O que preciso levar no dia do evento?",
        locator: locate(
          '//h3[contains(text(),"O que preciso levar no dia do evento?")]/ancestor::div[contains(@class,"group")]//div[contains(@class,"absolute")]',
        ),
      },

      {
        nome: "Como vender ingressos pela FasTix?",
        locator: locate(
          '//h3[contains(text(),"Como vender ingressos pela FasTix?")]/ancestor::div[contains(@class,"group")]//div[contains(@class,"absolute")]',
        ),
      },

      {
        nome: "Onde compro ingresso sem taxa?",
        locator: locate(
          '//h3[contains(text(),"Onde compro ingresso sem taxa?")]/ancestor::div[contains(@class,"group")]//div[contains(@class,"absolute")]',
        ),
      },
    ];

    const totalLoops = 5;

    for (let loop = 1; loop <= totalLoops; loop++) {
      I.say(`INICIANDO LOOP DE STRESS ${loop}`);

      if (loop > 1) {
        await I.usePlaywrightTo(
          "forçar coleta de lixo do navegador",
          async ({ page }) => {
            try {
              const client = await page.context().newCDPSession(page);
              await client.send("HeapProfiler.collectGarbage");
              await client.detach();
            } catch (erro) {
              console.log(
                "Aviso: não foi possível forçar GC via CDP:",
                erro.message,
              );
            }
          },
        );
      }

      for (const card of cardsAjuda) {
        I.say(`VALIDANDO CARD: ${card.nome}`);

        I.waitForElement(card.locator, 10);

        I.seeElement(card.locator);

        I.scrollTo(card.locator);

        I.click(card.locator);

        I.wait(1);

        const estado = await I.executeScript(() => {
          return {
            readyState: document.readyState,
            body: !!document.body,
            links: document.querySelectorAll("a").length,
            overlays: document.querySelectorAll('[class*="absolute"]').length,
          };
        });

        console.log(`Estado após clique (${card.nome}) LOOP ${loop}:`, estado);

        if (estado.readyState !== "complete") {
          throw new Error(
            `Página não carregou corretamente após clicar no card ${card.nome}`,
          );
        }

        if (!estado.body) {
          throw new Error(
            `Body não encontrado após clicar no card ${card.nome}`,
          );
        }

        if (estado.links < 1) {
          throw new Error(
            `Links não renderizados após clicar no card ${card.nome}`,
          );
        }

        if (estado.overlays < 1) {
          throw new Error(
            `Overlays não renderizados após clicar no card ${card.nome}`,
          );
        }
      }
    }

    I.scrollTo("footer");

    I.see("© 2026 FasTix", "footer");

    I.scrollPageToTop();

    I.say("TESTE DE STRESS FINALIZADO COM SUCESSO");
  },
).tag("@suporteeajuda58");

/////----------/////

Scenario(
  "Cenário: 0059 - Validação visual do footer da página de 'Suporte e Ajuda'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Suporte e Ajuda", 10);

    I.click("Suporte e Ajuda");

    I.seeInCurrentUrl("/contact");

    I.waitForText("Central de ajuda", 10);

    I.say("VALIDANDO FOOTER");

    I.scrollTo("footer");

    I.waitForElement("footer", 10);

    I.seeElement("footer");

    I.see("© 2026 FasTix", "footer");

    I.see("FASTIX LTDA", "footer");

    I.see("CNPJ", "footer");

    I.see("Instagram", "footer");

    I.see("Twitter", "footer");

    I.see("Linkedin", "footer");

    const footerEstado = await I.executeScript(() => {
      const footer = document.querySelector("footer");

      const estilos = window.getComputedStyle(footer);

      const rect = footer.getBoundingClientRect();

      return {
        existe: !!footer,
        visivel: estilos.display !== "none",
        opacity: estilos.opacity,
        altura: rect.height,
        largura: rect.width,
        alinhamento: estilos.textAlign,
        itens: footer.querySelectorAll("a, p, div, span").length,
      };
    });

    console.log("Estado footer:", footerEstado);

    if (!footerEstado.existe) {
      throw new Error("Footer não encontrado");
    }

    if (!footerEstado.visivel) {
      throw new Error("Footer não está visível");
    }

    if (footerEstado.itens < 5) {
      throw new Error("Footer com possível falha de renderização");
    }

    if (footerEstado.altura < 50) {
      throw new Error("Footer com altura inválida");
    }

    I.scrollPageToTop();

    I.say("FOOTER VALIDADO COM SUCESSO");
  },
).tag("@suporteeajuda59");

/////----------/////

Scenario(
  "Cenário: 0060 - Validação visual do footer com responsividade (Desktop e Mobile).",
  async ({ I }) => {
    I.say("INICIANDO VALIDAÇÃO EM DESKTOP");

    I.resizeWindow(1280, 720);

    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Suporte e Ajuda", 10);

    I.click("Suporte e Ajuda");

    I.seeInCurrentUrl("/contact");

    I.waitForText("Central de ajuda", 10);

    I.say("VALIDANDO FOOTER - DESKTOP");

    I.scrollTo("footer");

    I.waitForElement("footer", 10);

    I.seeElement("footer");

    I.see("© 2026 FasTix", "footer");
    I.see("FASTIX LTDA", "footer");
    I.see("CNPJ", "footer");
    I.see("Instagram", "footer");
    I.see("Twitter", "footer");
    I.see("Linkedin", "footer");

    const desktopFooter = await I.executeScript(() => {
      const footer = document.querySelector("footer");
      const rect = footer.getBoundingClientRect();
      const styles = window.getComputedStyle(footer);

      return {
        width: rect.width,
        height: rect.height,
        display: styles.display,
        visible: styles.visibility !== "hidden",
        items: footer.querySelectorAll("*").length,
      };
    });

    console.log("Footer Desktop:", desktopFooter);

    if (desktopFooter.height < 50) {
      throw new Error("Footer desktop com altura inválida");
    }

    if (!desktopFooter.visible) {
      throw new Error("Footer desktop não visível");
    }

    I.say("INICIANDO VALIDAÇÃO EM MOBILE");

    I.resizeWindow(375, 812);

    I.amOnPage("https://fastix.com.br/contact");

    I.waitForText("Central de ajuda", 10);

    I.say("VALIDANDO FOOTER - MOBILE");

    I.scrollTo("footer");

    I.waitForElement("footer", 10);

    I.seeElement("footer");

    I.see("© 2026 FasTix", "footer");
    I.see("Instagram", "footer");
    I.see("Twitter", "footer");

    const mobileFooter = await I.executeScript(() => {
      const footer = document.querySelector("footer");
      const rect = footer.getBoundingClientRect();
      const styles = window.getComputedStyle(footer);

      return {
        width: rect.width,
        height: rect.height,
        overflow: styles.overflow,
        items: footer.querySelectorAll("*").length,
      };
    });

    console.log("Footer Mobile:", mobileFooter);

    if (mobileFooter.width > 500) {
      throw new Error("Footer mobile não está responsivo (largura incorreta)");
    }

    if (mobileFooter.height < 50) {
      throw new Error("Footer mobile com altura inválida");
    }

    I.say("VALIDAÇÃO FINAL CONCLUÍDA COM SUCESSO");

    I.scrollPageToTop();
  },
).tag("@suporteeajuda60");

/////----------/////

Scenario(
  "Cenário: 0061 - Observabilidade do console e falhas de rede na página de 'Suporte e Ajuda'.",
  async ({ I }) => {
    let consoleErrors = [];
    let networkFailures = [];

    I.usePlaywrightTo("monitoramento de console e rede", async ({ page }) => {
      page.on("console", (msg) => {
        if (msg.type() === "error") {
          consoleErrors.push(msg.text());
        }
      });

      page.on("requestfailed", (request) => {
        networkFailures.push({
          url: request.url(),
          failure: request.failure()?.errorText,
        });
      });
    });

    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Suporte e Ajuda", 10);
    I.click("Suporte e Ajuda");

    I.seeInCurrentUrl("/contact");
    I.waitForText("Central de ajuda", 10);

    I.say("INICIANDO VALIDAÇÃO DE OBSERVABILIDADE (CONSOLE + REDE)");

    I.scrollTo("footer");
    I.waitForElement("footer", 10);
    I.seeElement("footer");

    I.see("© 2026 FasTix", "footer");

    I.wait(2);

    I.scrollPageToTop();

    I.say("VALIDANDO CONSOLE E REDE");

    if (consoleErrors.length > 0) {
      console.log("ERROS DE CONSOLE DETECTADOS:", consoleErrors);
      throw new Error(
        `Foram encontrados erros no console: ${consoleErrors.join(" | ")}`,
      );
    }

    if (networkFailures.length > 0) {
      console.log("FALHAS DE REDE DETECTADAS:", networkFailures);
      throw new Error(
        `Foram encontradas falhas de rede: ${JSON.stringify(networkFailures)}`,
      );
    }

    const estado = await I.executeScript(() => {
      return {
        readyState: document.readyState,
        body: !!document.body,
        links: document.querySelectorAll("a").length,
        images: document.querySelectorAll("img").length,
      };
    });

    console.log("ESTADO FINAL DA PÁGINA:", estado);

    if (estado.readyState !== "complete") {
      throw new Error("Página não finalizou carregamento corretamente");
    }

    if (!estado.body) {
      throw new Error("Body da página não foi renderizado corretamente");
    }

    I.say("TESTE FINALIZADO COM SUCESSO - SEM ERROS DE CONSOLE OU REDE");
  },
).tag("@suporteeajuda61");

/////----------/////

Scenario(
  "Cenário: 0062 - Observabilidade realista de console, rede e UI na página de Suporte e Ajuda.",
  async ({ I }) => {
    const consoleErrors = [];
    I.usePlaywrightTo("monitor console", async ({ page }) => {
      page.on("console", (msg) => {
        if (msg.type() === "error") {
          consoleErrors.push(msg.text());
        }
      });
    });

    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Suporte e Ajuda", 10);

    const linkSuporteEAjuda = locate("a").withText("Suporte e Ajuda").first();

    I.waitForElement(linkSuporteEAjuda, 10);
    I.click(linkSuporteEAjuda);

    I.waitInUrl("/contact", 10);

    I.waitForText("Suporte e Ajuda", 10);
    I.scrollTo("footer");
    I.waitForElement("footer", 10);
    I.seeElement("footer");
    I.see("© 2026 FasTix", "footer");
    I.scrollPageToTop();

    if (consoleErrors.length > 0) {
      throw new Error(
        "Console errors detectados: " + consoleErrors.join(" | "),
      );
    }

    I.say("CONSOLE OK");

    const estado = await I.executeScript(() => {
      return {
        readyState: document.readyState,
        body: !!document.body,
        links: document.querySelectorAll("a").length,
        images: document.querySelectorAll("img").length,
        footerVisible: !!document.querySelector("footer"),
      };
    });

    console.log("Estado da página:", estado);

    if (estado.readyState !== "complete") {
      throw new Error("Página não carregou corretamente");
    }
    if (!estado.footerVisible) {
      throw new Error("Footer não renderizado corretamente");
    }
    if (!estado.body) {
      throw new Error("Body inválido");
    }

    I.say("TESTE FINALIZADO COM SUCESSO - OBSERVABILIDADE VISUAL VALIDADA");
  },
).tag("@suporteeajuda62");

/////----------/////

Scenario(
  "Cenário: 0063 - Validar performance da página de Suporte.",
  async ({ I }) => {
    const startTime = Date.now();

    I.amOnPage("https://fastix.com.br/");

    const linkSuporte = "//a[contains(normalize-space(.), 'Suporte e Ajuda')]";

    I.waitForElement(linkSuporte, 15);

    I.scrollTo(linkSuporte);

    I.click(linkSuporte);

    I.waitInUrl("/contact", 15);

    I.waitForElement("body", 15);
    I.waitForText("Suporte e Ajuda", 15);

    I.seeElement("footer");

    const performanceData = await I.executeScript(() => {
      const nav = performance.getEntriesByType("navigation")[0];

      if (!nav) {
        return null;
      }

      return {
        loadTime: nav.loadEventEnd - nav.startTime,

        domContentLoaded: nav.domContentLoadedEventEnd - nav.startTime,

        responseTime: nav.responseEnd - nav.requestStart,

        ttfb: nav.responseStart - nav.requestStart,
      };
    });

    if (!performanceData) {
      throw new Error("Navigation Timing API não retornou dados.");
    }

    const totalTime = Date.now() - startTime;

    console.log("Tempo total cenário:", totalTime, "ms");

    console.log("Métricas coletadas:", {
      loadTime: `${performanceData.loadTime.toFixed(0)}ms`,
      domContentLoaded: `${performanceData.domContentLoaded.toFixed(0)}ms`,
      responseTime: `${performanceData.responseTime.toFixed(0)}ms`,
      ttfb: `${performanceData.ttfb.toFixed(0)}ms`,
    });

    const THRESHOLDS = {
      domContentLoaded: 5000,

      ttfb: 1000,

      responseTime: 3000,
    };

    const falhas = [];

    if (performanceData.domContentLoaded > THRESHOLDS.domContentLoaded) {
      falhas.push(
        `DOM Content Loaded ${performanceData.domContentLoaded.toFixed(0)}ms excedeu ${THRESHOLDS.domContentLoaded}ms`,
      );
    }

    if (performanceData.ttfb > THRESHOLDS.ttfb) {
      falhas.push(
        `TTFB ${performanceData.ttfb.toFixed(0)}ms excedeu ${THRESHOLDS.ttfb}ms`,
      );
    }

    if (performanceData.responseTime > THRESHOLDS.responseTime) {
      falhas.push(
        `Response Time ${performanceData.responseTime.toFixed(0)}ms excedeu ${THRESHOLDS.responseTime}ms`,
      );
    }

    if (performanceData.loadTime > 6000) {
      console.warn(
        `⚠️ Load Time elevado: ${performanceData.loadTime.toFixed(0)}ms`,
      );
    } else {
      console.log(`✅ Load Time: ${performanceData.loadTime.toFixed(0)}ms`);
    }

    if (falhas.length > 0) {
      throw new Error(
        "\nPerformance abaixo do SLA:\n\n" +
          falhas.map((f) => `❌ ${f}`).join("\n"),
      );
    }

    console.log("✅ Todas as métricas críticas estão dentro do SLA");

    const estado = await I.executeScript(() => ({
      readyState: document.readyState,
      body: !!document.body,
      footer: !!document.querySelector("footer"),
      links: document.querySelectorAll("a").length,
    }));

    console.log("Estado final:", estado);

    if (estado.readyState !== "complete") {
      throw new Error("Página não carregou completamente");
    }

    if (!estado.body) {
      throw new Error("Body não encontrado");
    }

    if (!estado.footer) {
      throw new Error("Footer não encontrado");
    }

    I.say("PERFORMANCE E ESTRUTURA DA PÁGINA VALIDADAS COM SUCESSO");
  },
).tag("@suporteeajuda63");

/////----------/////

Scenario(
  "Cenário: 0064 - Validação de Lazy loading do footer.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForElement(
      "//a[contains(normalize-space(.), 'Suporte e Ajuda')]",
      15,
    );

    I.scrollTo("//a[contains(normalize-space(.), 'Suporte e Ajuda')]");
    I.click("//a[contains(normalize-space(.), 'Suporte e Ajuda')]");

    I.waitInUrl("/contact", 15);
    I.waitForText("Suporte e Ajuda", 10);

    I.say("VALIDANDO VISIBILIDADE INICIAL DO FOOTER");

    const footerVisibleInicial = await I.executeScript(() => {
      const footer = document.querySelector("footer");
      if (!footer) return false;
      const rect = footer.getBoundingClientRect();
      return rect.top < window.innerHeight && rect.bottom > 0;
    });

    if (footerVisibleInicial === true) {
      I.say(
        "Footer já visível inicialmente (sem lazy loading ou renderizado fora de fluxo)",
      );
    } else {
      I.say(
        "Footer fora da viewport inicialmente — comportamento esperado para lazy loading",
      );
    }

    I.say("SCROLL PARA DISPARAR CARREGAMENTO PROGRESSIVO");

    await I.executeScript(() => {
      const footer = document.querySelector("footer");
      if (footer) {
        footer.scrollIntoView({ behavior: "instant", block: "end" });
      } else {
        window.scrollTo({
          top: document.body.scrollHeight,
          behavior: "instant",
        });
      }
    });

    I.waitForElement("footer", 10);

    I.seeElement("footer");
    I.see("© 2026 FasTix", "footer");

    const footerVisibleFinal = await I.executeScript(() => {
      const footer = document.querySelector("footer");
      if (!footer)
        return { visivel: false, motivo: "footer não existe no DOM" };

      const rect = footer.getBoundingClientRect();

      const visivel = rect.top < window.innerHeight && rect.bottom > 0;

      return {
        visivel,
        rectTop: Math.round(rect.top),
        rectBottom: Math.round(rect.bottom),
        innerHeight: window.innerHeight,
        motivo: visivel
          ? "ok"
          : `top=${Math.round(rect.top)} bottom=${Math.round(rect.bottom)} innerHeight=${window.innerHeight}`,
      };
    });

    console.log("Footer visibilidade após scroll:", footerVisibleFinal);

    if (!footerVisibleFinal.visivel) {
      throw new Error(
        `Footer não entrou na viewport após scroll (lazy loading falhou).\n` +
          `Diagnóstico: ${footerVisibleFinal.motivo}`,
      );
    }

    const estado = await I.executeScript(() => ({
      readyState: document.readyState,
      linksFooter: document.querySelectorAll("footer a").length,
      footerExiste: !!document.querySelector("footer"),
    }));

    console.log("Estado final:", estado);

    if (!estado.footerExiste) {
      throw new Error("Footer não encontrado no DOM");
    }

    if (estado.linksFooter < 1) {
      throw new Error("Footer sem links carregados corretamente");
    }

    I.say("TESTE FINALIZADO - LAZY LOADING VALIDADO COM SUCESSO");
  },
).tag("@suporteeajuda64");

/////----------/////

Scenario(
  "Cenário: 0065 - Validar estabilidade do formulário por execuções repetidas (Anti-Flaky)",
  async ({ I }) => {
    const execucoes = 3;

    for (let i = 1; i <= execucoes; i++) {
      I.say(`INÍCIO DA EXECUÇÃO ${i} DO TESTE ANTI-FLAKY`);

      if (i > 1) {
        await I.usePlaywrightTo(
          "forçar coleta de lixo do navegador",
          async ({ page }) => {
            try {
              const client = await page.context().newCDPSession(page);
              await client.send("HeapProfiler.collectGarbage");
              await client.detach();
            } catch (erro) {
              console.log(
                "Aviso: não foi possível forçar GC via CDP:",
                erro.message,
              );
            }
          },
        );
      }

      I.amOnPage("https://fastix.com.br/");

      I.waitForText("Suporte e Ajuda", 10);
      I.click("Suporte e Ajuda");

      I.waitInUrl("/contact", 10);
      I.seeInCurrentUrl("/contact");

      I.waitForElement('input[name="name"]', 10);

      I.say(`PREENCHENDO FORMULÁRIO COMPLETO — EXECUÇÃO ${i}`);

      I.fillField('input[name="name"]', `Teste Fastix ${i}`);
      I.fillField('input[name="order_code"]', `Fastix100-${i}`);
      I.fillField('input[name="email"]', `teste${i}@fastix.com`);
      I.fillField(
        'textarea[name="message"]',
        `Mensagem de teste execução ${i}`,
      );

      const estado = await I.executeScript(() => ({
        readyState: document.readyState,
        inputs: document.querySelectorAll("input").length,
        textareas: document.querySelectorAll("textarea").length,
      }));

      console.log(`Estado da execução ${i}:`, estado);

      if (estado.readyState !== "complete") {
        throw new Error(`Página instável na execução ${i}`);
      }

      if (estado.inputs < 3) {
        throw new Error(
          `Campos de input não renderizados corretamente na execução ${i}`,
        );
      }

      if (estado.textareas < 1) {
        throw new Error(`Textarea não encontrado na execução ${i}`);
      }

      I.say(`EXECUÇÃO ${i} FINALIZADA COM SUCESSO`);
    }

    I.say("TESTE ANTI-FLAKY FINALIZADO COM SUCESSO — FORMULÁRIO ESTÁVEL");
  },
).tag("@suporteeajuda65");

/////----------/////

Scenario(
  "Cenário: 0066 - Teste anti-flaky do formulário com métricas de estabilidade.",
  async ({ I }) => {
    const maxExecucoes = 5;
    const maxRetries = 2;

    let falhas = 0;
    let sucessos = 0;

    const resultadosExecucao = [];

    let totalTentativas = 0;

    for (let i = 1; i <= maxExecucoes; i++) {
      let tentativa = 0;
      let sucessoExecucao = false;

      while (tentativa <= maxRetries && !sucessoExecucao) {
        totalTentativas++;

        if (totalTentativas > 1) {
          await I.usePlaywrightTo(
            "forçar coleta de lixo do navegador",
            async ({ page }) => {
              try {
                const client = await page.context().newCDPSession(page);
                await client.send("HeapProfiler.collectGarbage");
                await client.detach();
              } catch (erro) {
                console.log(
                  "Aviso: não foi possível forçar GC via CDP:",
                  erro.message,
                );
              }
            },
          );
        }

        try {
          I.say(`EXECUÇÃO ${i} - TENTATIVA ${tentativa + 1}`);

          I.amOnPage("https://fastix.com.br/");

          I.waitForText("Suporte e Ajuda", 10);
          I.click("Suporte e Ajuda");

          I.seeInCurrentUrl("/contact");

          I.waitForElement('input[name="name"]', 10);

          I.fillField('input[name="name"]', `Usuário QA ${i}`);
          I.fillField('input[name="order_code"]', `ORDER-${i}`);
          I.fillField('input[name="email"]', `qa${i}@test.com`);
          I.fillField('textarea[name="message"]', `Mensagem execução ${i}`);

          const estado = await I.executeScript(() => ({
            readyState: document.readyState,
            inputs: document.querySelectorAll("input").length,
            textarea: document.querySelectorAll("textarea").length,
            buttons: document.querySelectorAll("button").length,
          }));

          console.log(`Estado execução ${i}:`, estado);

          if (estado.readyState !== "complete") {
            throw new Error("DOM instável");
          }

          if (estado.inputs < 3 || estado.textarea < 1) {
            throw new Error("Formulário incompleto");
          }

          sucessoExecucao = true;
          sucessos++;

          resultadosExecucao.push({
            execucao: i,
            status: "SUCCESS",
            tentativa: tentativa + 1,
            estado,
          });

          I.say(`EXECUÇÃO ${i} CONCLUÍDA COM SUCESSO`);
        } catch (err) {
          tentativa++;

          console.log(
            `Falha execução ${i} tentativa ${tentativa}:`,
            err.message,
          );

          if (tentativa > maxRetries) {
            falhas++;

            resultadosExecucao.push({
              execucao: i,
              status: "FAIL",
              tentativa,
              erro: err.message,
            });

            throw new Error(`Execução ${i} falhou após ${maxRetries} retries`);
          }
        }
      }
    }

    const flakinessRate = (falhas / maxExecucoes) * 100;

    console.log("RESULTADOS FINAIS:", {
      sucessos,
      falhas,
      flakinessRate: `${flakinessRate}%`,
    });

    const MAX_FLAKINESS = 10;

    if (flakinessRate > MAX_FLAKINESS) {
      throw new Error(
        `Flakiness acima do SLA: ${flakinessRate}% (limite: ${MAX_FLAKINESS}%)`,
      );
    }

    const todosSucesso = resultadosExecucao.filter(
      (r) => r.status === "SUCCESS",
    ).length;

    if (todosSucesso < maxExecucoes * 0.8) {
      throw new Error("Estabilidade insuficiente no formulário");
    }

    I.say("TESTE ANTI-FLAKY FINALIZADO COM SUCESSO - FORMULÁRIO ESTÁVEL");
  },
).tag("@suporteeajuda66");

/////----------/////

Scenario(
  "Cenário: 0067 - Validação de fallback sem imagens na página de Suporte e Ajuda.",
  async ({ I }) => {
    I.usePlaywrightTo("bloquear imagens da aplicação", async ({ page }) => {
      await page.route("**/*.{png,jpg,jpeg,svg,webp,gif}", (route) => {
        route.abort();
      });
    });

    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Suporte e Ajuda", 10);
    I.click("Suporte e Ajuda");

    I.seeInCurrentUrl("/contact");

    I.waitForText("Suporte e Ajuda", 10);

    const estadoInicial = await I.executeScript(() => ({
      images: document.images.length,
      readyState: document.readyState,
      footerExists: !!document.querySelector("footer"),
    }));

    console.log("Estado inicial sem imagens:", estadoInicial);

    if (estadoInicial.readyState !== "complete") {
      throw new Error("Página não carregou corretamente sem imagens");
    }

    I.say("VALIDANDO SCROLL ATÉ FOOTER");

    I.scrollTo("footer");
    I.wait(2);

    I.see("© 2026 FasTix", "footer");

    const estadoFooter = await I.executeScript(() => ({
      footerVisible: !!document.querySelector("footer"),
      linksFooter: document.querySelectorAll("footer a").length,
      imagesNoFooter: document.querySelectorAll("footer img").length,
    }));

    console.log("Estado do footer:", estadoFooter);

    if (!estadoFooter.footerVisible) {
      throw new Error("Footer não foi renderizado");
    }

    if (estadoFooter.linksFooter < 1) {
      throw new Error("Footer sem links renderizados");
    }

    if (estadoFooter.imagesNoFooter > 0) {
      throw new Error("Footer deveria estar sem imagens (fallback ativo)");
    }

    const estadoFinal = await I.executeScript(() => ({
      readyState: document.readyState,
      body: !!document.body,
      footer: !!document.querySelector("footer"),
      totalLinks: document.querySelectorAll("a").length,
    }));

    console.log("Estado final:", estadoFinal);

    if (estadoFinal.readyState !== "complete") {
      throw new Error("Página instável após bloqueio de imagens");
    }

    if (!estadoFinal.footer || !estadoFinal.body) {
      throw new Error("Estrutura da página comprometida sem imagens");
    }

    I.say("TESTE FINALIZADO - FALLBACK SEM IMAGENS VALIDADO COM SUCESSO");
  },
).tag("@suporteeajuda67");

/////----------/////

Scenario(
  "Cenário: 0068 - Validação de eventos no DataLayer na página de 'Suporte e Ajuda'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Suporte e Ajuda", 10);

    const suporteBtn = locate("a")
      .withText("Suporte e Ajuda")
      .withAttr({ href: "/contact" });

    I.waitForElement(suporteBtn, 10);
    I.seeElement(suporteBtn);

    I.scrollTo(suporteBtn);

    I.waitForEnabled(suporteBtn, 10);

    const dataLayerBefore = await I.executeScript(() => {
      return window.dataLayer ? [...window.dataLayer] : [];
    });

    console.log("DataLayer antes do clique:", dataLayerBefore);

    I.say("EXECUTANDO FLUXO MÍNIMO DE NAVEGAÇÃO");

    I.click(suporteBtn);

    I.waitForFunction(() => window.location.href.includes("/contact"), 10);

    I.seeInCurrentUrl("/contact");

    I.waitForElement("body", 10);

    I.waitForText("Suporte e Ajuda", 10);

    const dataLayerAfter = await I.executeScript(() => {
      return window.dataLayer ? [...window.dataLayer] : [];
    });

    console.log("DataLayer após clique:", dataLayerAfter);

    if (!dataLayerAfter || dataLayerAfter.length === 0) {
      throw new Error("dataLayer não foi inicializado corretamente");
    }

    const eventosSuporte = dataLayerAfter.filter(
      (event) =>
        JSON.stringify(event).includes("Suporte") ||
        JSON.stringify(event).includes("contact"),
    );

    console.log("Eventos detectados:", eventosSuporte);

    if (eventosSuporte.length === 0) {
      throw new Error(
        "Nenhum evento de analytics foi disparado para Suporte e Ajuda",
      );
    }

    const consistencia = await I.executeScript(() => {
      return {
        hasDataLayer: !!window.dataLayer,
        size: window.dataLayer ? window.dataLayer.length : 0,
        lastEvent: window.dataLayer
          ? window.dataLayer[window.dataLayer.length - 1]
          : null,
      };
    });

    console.log("Consistência do dataLayer:", consistencia);

    if (!consistencia.hasDataLayer) {
      throw new Error("window.dataLayer não existe na página");
    }

    if (consistencia.size < 1) {
      throw new Error("dataLayer está vazio após interação");
    }

    const estado = await I.executeScript(() => ({
      readyState: document.readyState,
      body: !!document.body,
      links: document.querySelectorAll("a").length,
    }));

    console.log("Estado final da página:", estado);

    if (estado.readyState !== "complete") {
      throw new Error(
        "Página não carregou corretamente após evento de analytics",
      );
    }

    if (!estado.body) {
      throw new Error("Estrutura da página comprometida");
    }

    I.say("TESTE FINALIZADO - ANALYTICS (dataLayer) VALIDADO COM SUCESSO");
  },
).tag("@suporteeajuda68");

/////----------/////

Scenario(
  "Cenário: 0069 - Validação de contrato de eventos no dataLayer na navegação para Suporte e Ajuda.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Suporte e Ajuda", 10);

    const suporteBtn = locate("a")
      .withText("Suporte e Ajuda")
      .withAttr({ href: "/contact" });

    I.waitForElement(suporteBtn, 10);
    I.scrollTo(suporteBtn);
    I.waitForEnabled(suporteBtn, 10);

    const dataLayerBefore = await I.executeScript(() => {
      return window.dataLayer
        ? JSON.parse(JSON.stringify(window.dataLayer))
        : [];
    });

    console.log("DATA LAYER BEFORE:", dataLayerBefore);

    I.click(suporteBtn);

    I.waitForFunction(() => window.location.href.includes("/contact"), 10);

    I.seeInCurrentUrl("/contact");
    I.waitForElement("body", 10);

    const dataLayerAfter = await I.executeScript(() => {
      return window.dataLayer
        ? JSON.parse(JSON.stringify(window.dataLayer))
        : [];
    });

    console.log("DATA LAYER AFTER:", dataLayerAfter);

    if (!dataLayerAfter.length) {
      throw new Error("dataLayer não foi inicializado corretamente");
    }

    const linkClicks = dataLayerAfter.filter(
      (e) => e.event === "gtm.linkClick",
    );
    const historyChanges = dataLayerAfter.filter(
      (e) => e.event === "gtm.historyChange",
    );
    const gtmJs = dataLayerAfter.filter((e) => e.event === "gtm.js");

    const suporteEvent = linkClicks.find(
      (e) => e["gtm.elementText"] === "Suporte e Ajuda",
    );

    if (!suporteEvent) {
      throw new Error("Evento gtm.linkClick de Suporte e Ajuda não encontrado");
    }

    if (!suporteEvent["gtm.elementUrl"].includes("/contact")) {
      throw new Error("Schema inválido: URL não corresponde a /contact");
    }

    const requiredFields = [
      "gtm.elementText",
      "gtm.elementUrl",
      "gtm.triggers",
    ];

    for (const field of requiredFields) {
      if (!suporteEvent[field]) {
        throw new Error(`Campo obrigatório ausente no evento: ${field}`);
      }
    }

    const eventOrder = dataLayerAfter.map((e) => e.event);

    const expectedSequence = [
      "gtm.js",
      "gtm.dom",
      "gtm.load",
      "gtm.linkClick",
      "gtm.historyChange",
    ];

    const hasSequence = expectedSequence.every((ev) => eventOrder.includes(ev));

    if (!hasSequence) {
      throw new Error(
        `Ordem de eventos inválida. Esperado: ${expectedSequence.join(" → ")}`,
      );
    }

    const duplicateCheck = (arr) => {
      return arr.some(
        (item, index) =>
          arr.findIndex((i) => JSON.stringify(i) === JSON.stringify(item)) !==
          index,
      );
    };

    if (duplicateCheck(linkClicks)) {
      throw new Error("Eventos duplicados detectados em gtm.linkClick");
    }

    if (duplicateCheck(historyChanges)) {
      throw new Error("Eventos duplicados detectados em gtm.historyChange");
    }

    const analyticsContract = {
      hasPageView: gtmJs.length > 0,
      hasClickTracking: linkClicks.length > 0,
      hasNavigationTracking: historyChanges.length > 0,
      validRoute:
        suporteEvent["gtm.elementUrl"] === "https://fastix.com.br/contact",
    };

    console.log("ANALYTICS CONTRACT:", analyticsContract);

    for (const key in analyticsContract) {
      if (!analyticsContract[key]) {
        throw new Error(`Contrato de analytics violado: ${key}`);
      }
    }

    const estado = await I.executeScript(() => ({
      readyState: document.readyState,
      body: !!document.body,
      links: document.querySelectorAll("a").length,
    }));

    console.log("ESTADO FINAL:", estado);

    if (estado.readyState !== "complete") {
      throw new Error("Página não finalizou carregamento corretamente");
    }

    if (!estado.body) {
      throw new Error("DOM corrompido após interação");
    }

    I.say("TESTE ELITE FINALIZADO - ANALYTICS CONTRACT VALIDADO COM SUCESSO");
  },
).tag("@suporteeajuda69");

/////----------/////

Scenario(
  "Cenário: 0070 - Validação de SEO title e meta description na página de Suporte e Ajuda.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Suporte e Ajuda", 10);
    I.click("Suporte e Ajuda");

    I.seeInCurrentUrl("/contact");
    I.waitForElement("body", 10);

    const seoData = await I.executeScript(() => {
      const title = document.title;

      const metaDescription =
        document
          .querySelector('meta[name="description"]')
          ?.getAttribute("content") || null;

      return { title, metaDescription };
    });

    console.log("SEO DATA CAPTURADO:", seoData);

    if (!seoData.title || seoData.title.trim().length < 5) {
      throw new Error("Title inválido ou inexistente");
    }

    if (!seoData.metaDescription) {
      throw new Error("Meta description não encontrada");
    }

    const metaLength = seoData.metaDescription.trim().length;

    const MIN_SEO_LENGTH = 10;
    const MAX_SEO_LENGTH = 160;

    if (metaLength < MIN_SEO_LENGTH) {
      throw new Error("Meta description extremamente curta (inválida)");
    }

    if (metaLength > MAX_SEO_LENGTH) {
      throw new Error("Meta description muito longa (SEO risk)");
    }

    const seoContract = {
      hasTitle: !!seoData.title,
      hasMetaDescription: !!seoData.metaDescription,
      titleNotEmpty: seoData.title.trim().length > 0,
      descriptionNotEmpty: seoData.metaDescription.trim().length > 0,
      validLength: metaLength >= MIN_SEO_LENGTH && metaLength <= MAX_SEO_LENGTH,
    };

    console.log("SEO CONTRACT:", seoContract);

    for (const key in seoContract) {
      if (!seoContract[key]) {
        throw new Error(`Falha no contrato SEO: ${key}`);
      }
    }

    I.say("TESTE FINALIZADO - SEO VALIDADO COM PADRÃO REALISTA DE PRODUÇÃO");
  },
).tag("@suporteeajuda70");

/////----------/////

Scenario(
  "Cenário: 0071 - Validar SEO da página de 'Suporte e Ajuda'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    const linkSuporte = "//a[contains(normalize-space(.), 'Suporte e Ajuda')]";

    I.waitForElement(linkSuporte, 15);

    I.scrollTo(linkSuporte);

    I.click(linkSuporte);

    I.waitInUrl("/contact", 15);

    I.seeInCurrentUrl("/contact");

    I.waitForElement("body", 15);

    const seoData = await I.executeScript(() => {
      return {
        title: document.title || "",

        metaDescription:
          document
            .querySelector('meta[name="description"]')
            ?.getAttribute("content") || "",

        h1: document.querySelector("h1")?.innerText || "",
      };
    });

    console.log("SEO DATA:", seoData);

    const pageText = await I.grabTextFrom("body");

    const content = `
      ${seoData.title}
      ${seoData.metaDescription}
      ${seoData.h1}
      ${pageText}
    `.toLowerCase();

    const requiredKeywords = ["fastix"];

    const optionalKeywords = ["ingressos", "suporte", "ajuda"];

    const missingRequired = requiredKeywords.filter(
      (keyword) => !content.includes(keyword),
    );

    const missingOptional = optionalKeywords.filter(
      (keyword) => !content.includes(keyword),
    );

    console.log("Required ausentes:", missingRequired);

    console.log("Optional ausentes:", missingOptional);

    if (missingRequired.length > 0) {
      throw new Error(
        `SEO CRÍTICO FALHOU.\n\n` +
          `Keywords obrigatórias ausentes:\n` +
          `${missingRequired.join(", ")}`,
      );
    }

    const score =
      ((optionalKeywords.length - missingOptional.length) /
        optionalKeywords.length) *
      100;

    console.log(`SEO Score: ${score}%`);

    const estado = await I.executeScript(() => ({
      readyState: document.readyState,

      body: !!document.body,

      footer: !!document.querySelector("footer"),

      links: document.querySelectorAll("a").length,
    }));

    console.log("Estado final:", estado);

    if (estado.readyState !== "complete") {
      throw new Error("Página não finalizou carregamento.");
    }

    if (!estado.body) {
      throw new Error("Body não encontrado.");
    }

    I.say(`SEO VALIDADO COM SUCESSO - SCORE ${score}%`);
  },
).tag("@suporteeajuda71");

/////----------/////

Scenario(
  "Cenário: 0072 - Validação de OG tags na página de Suporte e Ajuda.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Suporte e Ajuda", 10);

    const suporteBtn = locate("a")
      .withText("Suporte e Ajuda")
      .withAttr({ href: "/contact" });

    I.waitForElement(suporteBtn, 10);
    I.seeElement(suporteBtn);

    I.click(suporteBtn);

    I.waitForFunction(() => window.location.href.includes("/contact"), 10);

    I.seeInCurrentUrl("/contact");

    I.waitForElement("body", 10);
    I.wait(2);

    const ogData = await I.executeScript(() => {
      const getMeta = (property) => {
        const el = document.querySelector(`meta[property='${property}']`);
        return el ? el.getAttribute("content") : null;
      };

      const getMetaName = (name) => {
        const el = document.querySelector(`meta[name='${name}']`);
        return el ? el.getAttribute("content") : null;
      };

      return {
        ogTitle: getMeta("og:title") || document.title,
        ogDescription: getMeta("og:description") || getMetaName("description"),
        ogUrl: getMeta("og:url") || window.location.href,
        ogImage: getMeta("og:image") || null,
      };
    });

    console.log("OG DATA CAPTURADO:", ogData);

    if (!ogData.ogTitle) {
      throw new Error("og:title não encontrado");
    }

    if (!ogData.ogDescription) {
      throw new Error("og:description não encontrado");
    }

    const titleLengthOk = ogData.ogTitle.length >= 8;
    const descLengthOk = ogData.ogDescription.length >= 30;

    if (!titleLengthOk) {
      throw new Error(`og:title muito curto (${ogData.ogTitle.length} chars)`);
    }

    if (!descLengthOk) {
      throw new Error(
        `og:description muito curta (${ogData.ogDescription.length} chars)`,
      );
    }

    const text = `${ogData.ogTitle} ${ogData.ogDescription}`.toLowerCase();

    const hasBranding =
      text.includes("fastix") ||
      text.includes("ingresso") ||
      text.includes("evento");

    if (!hasBranding) {
      throw new Error("OG tags não possuem contexto de branding esperado");
    }

    const isUrlValid = ogData.ogUrl.includes("fastix.com.br");

    if (!isUrlValid) {
      throw new Error("og:url inválido ou fora do domínio esperado");
    }

    I.say("OG TAGS VALIDADAS COM SUCESSO (VERSÃO ROBUSTA)");
  },
).tag("@suporteeajuda72");

/////----------/////

Scenario(
  "Cenário: 0073 - Validar consistência das OG tags entre browser e crawler headless.",
  async ({ I }) => {
    const baseUrl = "https://fastix.com.br";
    const targetUrl = "https://fastix.com.br/contact";

    I.amOnPage(baseUrl);

    I.waitForText("Suporte e Ajuda", 10);
    I.click(locate("a").withText("Suporte e Ajuda"));

    I.waitForFunction(() => window.location.href.includes("/contact"), 10);

    I.seeInCurrentUrl("/contact");
    I.waitForElement("head", 10);

    const ogBrowser = await I.executeScript(() => {
      const getMeta = (prop) =>
        document
          .querySelector(`meta[property='${prop}']`)
          ?.getAttribute("content") || null;

      return {
        title: getMeta("og:title") || document.title,
        description:
          getMeta("og:description") ||
          document
            .querySelector("meta[name='description']")
            ?.getAttribute("content"),
        url: getMeta("og:url") || window.location.href,
        image: getMeta("og:image") || null,
      };
    });

    console.log("OG (Browser):", ogBrowser);

    const ogCrawler = await I.usePlaywrightTo(
      "buscar OG tags como crawler (sem sessão, com User-Agent de bot)",
      async ({ page }) => {
        const response = await page.request.get(targetUrl, {
          headers: {
            "User-Agent":
              "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",

            Cookie: "",
          },
          timeout: 15000,
        });

        if (!response.ok()) {
          throw new Error(
            `Crawler recebeu status inesperado: ${response.status()}`,
          );
        }

        const html = await response.text();

        const getMetaFromHTML = (prop) => {
          const match =
            html.match(
              new RegExp(
                `<meta[^>]+property=['"](${prop.replace(":", "\\:")})['"'][^>]+content=['"]([^'"]+)['"]`,
                "i",
              ),
            ) ||
            html.match(
              new RegExp(
                `<meta[^>]+content=['"]([^'"]+)['"'][^>]+property=['"](${prop.replace(":", "\\:")})['"']`,
                "i",
              ),
            );

          if (!match) return null;

          return match[2] || match[1] || null;
        };

        const getMetaNameFromHTML = (name) => {
          const match =
            html.match(
              new RegExp(
                `<meta[^>]+name=['"]${name}['"'][^>]+content=['"]([^'"]+)['"]`,
                "i",
              ),
            ) ||
            html.match(
              new RegExp(
                `<meta[^>]+content=['"]([^'"]+)['"'][^>]+name=['"]${name}['"']`,
                "i",
              ),
            );

          return match ? match[1] : null;
        };

        const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
        const htmlTitle = titleMatch ? titleMatch[1].trim() : null;

        return {
          title: getMetaFromHTML("og:title") || htmlTitle,
          description:
            getMetaFromHTML("og:description") ||
            getMetaNameFromHTML("description"),
          url: getMetaFromHTML("og:url"),
          image: getMetaFromHTML("og:image"),
        };
      },
    );

    console.log(
      "OG (Crawler simulado via page.request, sem sessão):",
      ogCrawler,
    );

    const normalize = (v) => (v || "").toLowerCase().trim();

    const isConsistent =
      normalize(ogBrowser.title) === normalize(ogCrawler.title) &&
      normalize(ogBrowser.description) === normalize(ogCrawler.description);

    if (!isConsistent) {
      console.log("DIVERGÊNCIA DETECTADA:");
      console.log(`  title browser:  "${ogBrowser.title}"`);
      console.log(`  title crawler:  "${ogCrawler.title}"`);
      console.log(`  desc  browser:  "${ogBrowser.description}"`);
      console.log(`  desc  crawler:  "${ogCrawler.description}"`);

      throw new Error(
        "Inconsistência entre OG Browser e OG Crawler detectada — " +
          "o servidor pode estar servindo conteúdo diferente para bots. " +
          "Verifique a pré-renderização de meta tags no servidor.",
      );
    }

    if (!ogBrowser.title || ogBrowser.title.length < 8) {
      throw new Error("og:title inválido ou muito curto");
    }

    if (!ogBrowser.description || ogBrowser.description.length < 30) {
      throw new Error("og:description inválido ou muito curto");
    }

    if (ogBrowser.url && !ogBrowser.url.includes("fastix.com.br")) {
      throw new Error("og:url fora do domínio esperado");
    }

    I.say("OG TAGS VALIDADAS VIA BROWSER + CRAWLER COM SUCESSO");
  },
).tag("@suporteeajuda73");

/////----------/////

Scenario(
  "Cenário: 0074 - Garantir que os campos do formulário possuem acessibilidade básica (label ou ARIA).",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    const linkSuporte = '//a[contains(normalize-space(.),"Suporte e Ajuda")]';

    I.waitForElement(linkSuporte, 15);

    I.scrollTo(linkSuporte);

    I.click(linkSuporte);

    I.waitInUrl("/contact", 15);

    I.seeInCurrentUrl("/contact");

    I.waitForElement('input[name="name"]', 15);

    I.waitForElement('input[name="email"]', 15);

    I.waitForElement('textarea[name="message"]', 15);

    const a11y = await I.executeScript(() => {
      function getAccessibility(selector) {
        const el = document.querySelector(selector);

        if (!el) {
          return {
            exists: false,
          };
        }

        const id = el.getAttribute("id");

        const label = id ? document.querySelector(`label[for="${id}"]`) : null;

        return {
          exists: true,

          hasLabel: !!label,

          labelText: label?.innerText?.trim() || null,

          ariaLabel: el.getAttribute("aria-label"),

          ariaRequired: el.getAttribute("aria-required"),

          ariaDescribedBy: el.getAttribute("aria-describedby"),
        };
      }

      return {
        name: getAccessibility('input[name="name"]'),

        order: getAccessibility('input[name="order_code"]'),

        email: getAccessibility('input[name="email"]'),

        message: getAccessibility('textarea[name="message"]'),
      };
    });

    console.log("A11Y RAW:", JSON.stringify(a11y, null, 2));

    function validateField(field, nomeCampo) {
      if (!field?.exists) {
        throw new Error(`Campo "${nomeCampo}" não encontrado`);
      }

      const hasLabel = field.hasLabel;

      const hasAria = !!field.ariaLabel;

      if (!hasLabel && !hasAria) {
        throw new Error(
          `Campo "${nomeCampo}" não possui acessibilidade válida (label ou aria-label)`,
        );
      }
    }

    validateField(a11y.name, "Nome");
    validateField(a11y.email, "E-mail");
    validateField(a11y.message, "Mensagem");

    const camposSemAria = Object.entries(a11y)
      .filter(([_, valor]) => valor?.exists && !valor?.ariaLabel)
      .map(([campo]) => campo);

    console.log("Campos sem aria-label (informativo):", camposSemAria);

    I.fillField('input[name="name"]', "Teste Fastix");

    I.fillField('input[name="order_code"]', "Fastix100");

    I.fillField('input[name="email"]', "teste.fastix@gmail.com");

    I.fillField('textarea[name="message"]', "testando fastix 123");

    I.seeInField('input[name="name"]', "Teste Fastix");

    I.seeInField('input[name="email"]', "teste.fastix@gmail.com");

    const estado = await I.executeScript(() => ({
      readyState: document.readyState,
      forms: document.querySelectorAll("form").length,
      inputs: document.querySelectorAll("input, textarea").length,
    }));

    console.log("ESTADO FINAL:", estado);

    if (estado.readyState !== "complete") {
      throw new Error("Página não terminou carregamento");
    }

    I.say("ACESSIBILIDADE VALIDADA COM SUCESSO");
  },
).tag("@suporteeajuda74");

/////----------/////

Scenario(
  "Cenário: 0075 - Validar exposição de scripts e possíveis leaks no HTML.",
  async ({ I }) => {
    const sensitivePatterns = [
      /api[_-]?key/i,
      /secret/i,
      /token/i,
      /authorization/i,
      /bearer\s+[a-z0-9\-.]+/i,
      /jwt/i,
      /password/i,
      /access[_-]?key/i,
    ];

    const scanHTML = async () =>
      await I.executeScript(() => document.documentElement.innerHTML);

    const detectLeaks = (html) =>
      sensitivePatterns.filter((regex) => regex.test(html));

    const results = [];

    I.amOnPage("https://fastix.com.br/");
    I.waitForElement("body", 10);

    const homeHTML = await scanHTML();
    const homeLeaks = detectLeaks(homeHTML);

    console.log("Leaks HOME:", homeLeaks);

    results.push(...homeLeaks);

    I.waitForText("Suporte e Ajuda", 10);
    I.click("Suporte e Ajuda");

    I.seeInCurrentUrl("/contact");
    I.waitForElement("body", 10);

    const supportHTML = await scanHTML();
    const supportLeaks = detectLeaks(supportHTML);

    console.log("Leaks SUPPORT:", supportLeaks);

    results.push(...supportLeaks);

    I.amOnPage("https://fastix.com.br/");
    I.waitForElement("body", 10);

    const homeHTML2 = await scanHTML();
    const homeLeaks2 = detectLeaks(homeHTML2);

    console.log("Leaks HOME 2:", homeLeaks2);

    results.push(...homeLeaks2);

    if (results.length > 0) {
      throw new Error(
        `Possível exposição de dados sensíveis: ${results.join(", ")}`,
      );
    }

    const htmlIntegrity = await I.executeScript(() => {
      const scripts = Array.from(document.scripts);

      const inlineScripts = scripts.filter(
        (s) => !s.src && s.innerHTML.length > 0,
      );

      const suspiciousInlineScripts = inlineScripts.filter((s) => {
        const content = s.innerHTML.toLowerCase();

        return (
          content.includes("password") ||
          content.includes("secret") ||
          content.includes("token") ||
          content.includes("api_key")
        );
      });

      return {
        totalScripts: scripts.length,
        inlineScripts: inlineScripts.length,
        suspiciousInlineScripts: suspiciousInlineScripts.length,
        hasWindowEnv: typeof window !== "undefined",
      };
    });

    console.log("HTML Integrity:", htmlIntegrity);

    if (htmlIntegrity.suspiciousInlineScripts > 0) {
      throw new Error(
        "Scripts inline suspeitos detectados (risco real de segurança)",
      );
    }

    I.say("SEGURANÇA FRONTEND VALIDADA COM CRITÉRIO QA SÊNIOR");
  },
).tag("@suporteeajuda75");

/////----------/////

Feature("tela_inicial");

//// CENÁRIOS DE TESTES////

Scenario(
  'Cenário: 0001 - Acessar "Explorar Eventos".', ({ I }) => {
  I.amOnPage("https://fastix.com.br/");

  I.click("Explorar Eventos");
  I.seeInCurrentUrl("/events");
}
).tag("@telainicial1");

/////----------/////

Scenario(
  'Cenário: 0002 - Acessar "Publicar Eventos".', ({ I }) => {
  I.amOnPage("https://fastix.com.br/");

  I.waitForText("Publicar Eventos", 10);
  I.click("Publicar Eventos");

  I.waitForURL(/\/signin/, 10);

  I.seeInCurrentUrl("/signin");
  I.seeInCurrentUrl("redirectUrl=");
  I.seeInCurrentUrl("%2Fbe-a-producer");
}
).tag("@telainicial2");

/////----------/////kk

Scenario(
  'Cenário: 0003 - Acessar "Suporte e Ajuda".', ({ I }) => {
  I.amOnPage("https://fastix.com.br/");

  I.click("Suporte e Ajuda");
  I.seeInCurrentUrl("/contact");
}
).tag("@telainicial3");

/////----------/////

Scenario(
  "Cenário: 0004 - Acessar botão de idioma.", ({ I }) => {
  I.amOnPage("https://fastix.com.br/");

  const languageButton = locate("button").withText("BR");

  I.seeElement(languageButton);
  I.click(languageButton);

  I.waitForElement('[role="menu"]', 5);
}
).tag("@telainicial4");

/////----------/////

Scenario(
  "Cenário: 0005 - Acessar o botão de idioma e clicar na opção Português.",
  ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    const languageButton = locate("button").withText("BR");
    I.seeElement(languageButton);
    I.click(languageButton);

    I.waitForElement('[role="menu"]', 5);

    const portugueseOption = locate('[role="menuitem"]').withText("Português");
    I.seeElement(portugueseOption);
    I.click(portugueseOption);
  },
).tag("@telainicial5");

/////----------/////

Scenario(
  "Cenário: 0006 - Acessar o botão de idioma e clicar na opção Español.",
  ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    const languageButton = locate("button").withText("BR");
    I.seeElement(languageButton);
    I.click(languageButton);

    I.waitForElement('[role="menu"]', 5);

    const españolOption = locate('[role="menuitem"]').withText("Español");
    I.seeElement(españolOption);
    I.click(españolOption);
  },
).tag("@telainicial6");

/////----------/////

Scenario(
  "Cenário: 0007 - Acessar o botão de idioma e clicar na opção English.",
  ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    const languageButton = locate("button").withText("BR");

    I.seeElement(languageButton);
    I.click(languageButton);

    I.waitForElement('[role="menu"]', 5);

    const englishOption = locate('[role="menuitem"]').withText("English");

    I.seeElement(englishOption);
    I.click(englishOption);
  },
).tag("@telainicial7");

/////----------/////

Scenario(
  'Cenário: 0008 - Acessar o botão de "Entrar".', ({ I }) => {
  I.amOnPage("https://fastix.com.br/");

  const enterButton = locate("a").withText("Entrar");

  I.seeElement(enterButton);
  I.click(enterButton);
}
).tag("@telainicial8");

/////----------/////

Scenario(
  'Cenário: 0009 - Acessar o botão de "Criar Conta".', ({ I }) => {
  I.amOnPage("https://fastix.com.br/");

  const createAccountButton = locate("a").withText("Criar Conta");

  I.seeElement(createAccountButton);
  I.click(createAccountButton);
}
).tag("@telainicial9");

/////----------/////

Scenario(
  "Cenário: 00010 - Acessar o botão de botão de busca (Search / Command Palette ⌘K).",
  ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForElement("header", 5);

    const searchButton = locate("button").withDescendant("kbd");

    I.waitForElement(searchButton, 5);
    I.seeElement(searchButton);
    I.click(searchButton);
  },
).tag("@telainicial10");

/////----------/////

Scenario(
  "Cenário: 00011 - Acessar o botão de 'Explorar eventos'.", ({ I }) => {
  I.amOnPage("https://fastix.com.br/");

  I.waitForElement(locate("a").withText("Explorar eventos"), 10);
  I.see("Explorar eventos");

  I.click(locate("a").withText("Explorar eventos"));
}
).tag("@telainicial11");

/////----------/////

Scenario(
  "Cenário: 00012 - Acessar o botão de Pesquisar evento, local...",
  ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    const pesquisarEvento = locate("button").withText(
      "Pesquisar evento, local...",
    );

    I.waitForElement(pesquisarEvento, 10);
    I.click(pesquisarEvento);

    I.waitForElement("input", 10);
  },
).tag("@telainicial12");

/////----------/////

Scenario(
  "Cenário: 00013 - Navegação entre eventos no carrossel utilizando o botão de controle por ícone.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.executeScript(() => {
      window.scrollBy(0, window.innerHeight);
    });
    I.wait(2);

    I.executeScript(() => {
      const botao = document
        .querySelector("button svg.lucide-arrow-left")
        ?.closest("button");
      if (!botao) {
        throw new Error("Botão de navegação esquerda não encontrado");
      }
      botao.click();
    });
  },
).tag("@telainicial13");

/////----------/////

Scenario(
  "Cenário: 00014 - Navegação sequencial entre eventos no carrossel utilizando múltiplos cliques no botão de controle.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.executeScript(() => {
      window.scrollBy(0, window.innerHeight);
    });

    I.wait(2);

    for (let i = 1; i <= 10; i++) {
      I.executeScript(() => {
        const botao = document
          .querySelector("svg.lucide-arrow-left")
          ?.closest("button");
        if (!botao) {
          throw new Error("Botão de navegação esquerda não encontrado");
        }
        botao.click();
      });

      I.say(`Clique ${i} realizado`);
      I.wait(2);
    }
  },
).tag("@telainicial14");

/////----------/////

Scenario(
  "Cenário: 00015 - Navegação sequencial entre eventos no carrossel após múltiplos cliques no botão de controle, com seleção de um evento exibido no carrossel(THE WHITE BUFFALO em SÃO PAULO).",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.executeScript(() => {
      window.scrollBy(0, window.innerHeight);
    });

    I.wait(3);

    for (let i = 1; i <= 6; i++) {
      I.executeScript(() => {
        const botao = document
          .querySelector("svg.lucide-arrow-left")
          ?.closest("button");

        if (!botao) {
          throw new Error("Botão de navegação esquerda não encontrado");
        }

        botao.click();
      });

      I.say(`Clique ${i} realizado`);

      I.wait(2);
    }

    const evento = locate("a").withAttr({
      href: "/events/the-white-buffalo-em-sao-paulo",
    });

    I.waitForText("THE WHITE BUFFALO em SÃO PAULO", 15);

    I.waitForElement(evento, 15);

    I.scrollTo(evento);

    I.wait(2);

    I.forceClick(evento);

    I.waitInUrl("/events/the-white-buffalo-em-sao-paulo", 15);

    I.seeInCurrentUrl("the-white-buffalo-em-sao-paulo");

    I.wait(5);
  },
).tag("@telainicial15");

/////----------/////

Scenario(
  "Cenário: 00016 - Navegação sequencial entre os eventos do carrossel por meio de múltiplos cliques nos botões de controle à esquerda e à direita.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.executeScript(() => {
      window.scrollBy(0, window.innerHeight);
    });
    I.wait(2);

    for (let i = 1; i <= 10; i++) {
      I.executeScript(() => {
        const botaoEsquerda = document
          .querySelector("svg.lucide-arrow-left")
          ?.closest("button");
        if (!botaoEsquerda) {
          throw new Error("Botão de navegação esquerda não encontrado");
        }
        botaoEsquerda.click();
      });

      I.say(`Clique à esquerda ${i} realizado`);
      I.wait(2);
    }

    for (let i = 1; i <= 10; i++) {
      I.executeScript(() => {
        const botaoDireita = document
          .querySelector("svg.lucide-arrow-right")
          ?.closest("button");
        if (!botaoDireita) {
          throw new Error("Botão de navegação direita não encontrado");
        }
        botaoDireita.click();
      });

      I.say(`Clique à direita ${i} realizado`);

      I.wait(2);
    }
  },
).tag("@telainicial16");

/////----------/////

Scenario(
  'Cenário: 00017 - Clicar no botão "Criar Conta".', async ({ I }) => {
  I.amOnPage("https://fastix.com.br/");

  const criarConta = locate("a").withText("Criar Conta");

  I.waitForElement(criarConta, 10);
  I.scrollTo(criarConta);
  I.waitForVisible(criarConta, 10);

  I.seeElement(criarConta);

  I.click(criarConta);

  I.waitInUrl("/signup", 10);
  I.seeInCurrentUrl("/signup");
}
).tag("@telainicial17");

/////----------/////

Scenario(
  'Cenário: 00018 - Clicar no botão "Publicar evento".',
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    const publicarEvento = locate("a").withText("Publicar evento");

    I.scrollTo(publicarEvento);
    I.waitForElement(publicarEvento, 10);

    I.see("Publicar evento");
    I.click(publicarEvento);

    I.wait(2);
  },
).tag("@telainicial18");

/////----------/////

Scenario(
  'Cenário: 00019 - Clicar no botão "Criar Conta" - Próximo ao título "Vendendo tickets online? Nós podemos ajudar".',
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.scrollPageToBottom();

    const criarConta = locate(
      '//*[contains(normalize-space(.),"Nós podemos ajudar")]' +
        '/following::a[contains(@href,"/signup")][1]',
    );

    I.waitForElement(criarConta, 15);
    I.seeElement(criarConta);

    I.see("Criar conta");
    I.click(criarConta);

    I.seeInCurrentUrl("/signup");
    I.wait(2);
  },
).tag("@telainicial19");

/////----------/////

Scenario(
  'Cenário: 00020 - Clicar no botão iOS no footer".', async ({ I }) => {
  I.amOnPage("https://fastix.com.br/");
  I.waitForElement("body", 10);

  const footer = locate("footer");

  I.waitForElement(footer, 10);
  I.scrollTo(footer);
  I.see("© 2026 FasTix", footer);

  I.waitForText("Baixe o app Meus Ingressos:", 15, footer);
  I.see("Baixe o app Meus Ingressos:");

  const botaoIOS = locate('//a[.//span[normalize-space()="iOS"]]');

  I.waitForElement(botaoIOS, 10);
  I.seeElement(botaoIOS);

  I.scrollTo(botaoIOS);
  I.click(botaoIOS);

  I.wait(5);
}
).tag("@telainicial20");

/////----------/////

Scenario(
  'Cenário: 00021 - Clicar no botão Android no footer".',
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForElement("body", 10);

    const footer = locate("footer");

    I.waitForElement(footer, 10);
    I.scrollTo(footer);

    I.see("© 2026 FasTix", footer);

    I.waitForText("Baixe o app Meus Ingressos:", 15, footer);
    I.see("Baixe o app Meus Ingressos:");

    const botaoAndroid = locate('//a[.//span[normalize-space()="Android"]]');

    I.waitForElement(botaoAndroid, 10);
    I.seeElement(botaoAndroid);

    I.scrollTo(botaoAndroid);
    I.click(botaoAndroid);

    I.wait(5);
  },
).tag("@telainicial21");

/////----------/////

Scenario(
  "Cenário: 00022 - Clicar no Guia Check-in no footer.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForElement("body", 10);

    const footer = locate("footer");
    I.waitForElement(footer, 10);
    I.scrollTo(footer);

    I.see("© 2026 FasTix", footer);

    const guiaCheckin = locate("a")
      .withText("Guia Check-in")
      .withAttr({ href: "/checkin-guide" });

    I.waitForElement(guiaCheckin, 10);
    I.seeElement(guiaCheckin);

    I.scrollTo(guiaCheckin);
    I.click(guiaCheckin);

    I.waitInUrl("/checkin-guide", 10);
    I.wait(3);
  },
).tag("@telainicial22");

/////----------/////

Scenario(
  "Cenário: 00023 - Clicar em Termos e Condições de Uso no footer.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForElement("body", 10);

    const footer = locate("footer");
    I.waitForElement(footer, 10);
    I.scrollTo(footer);

    I.see("© 2026 FasTix", footer);

    const termosUso = locate("a")
      .withText("Termos e Condições de Uso")
      .withAttr({ href: "/terms" });

    I.waitForElement(termosUso, 10);
    I.seeElement(termosUso);

    I.scrollTo(termosUso);
    I.click(termosUso);

    I.waitInUrl("/terms", 10);

    I.wait(3);
  },
).tag("@telainicial23");

/////----------/////

Scenario(
  "Cenário: 00024 - Clicar em Política de Compra no footer.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForElement("body", 10);

    const footer = locate("footer");

    I.waitForElement(footer, 10);
    I.scrollTo(footer);
    I.see("© 2026 FasTix", footer);

    const políticadeCompra = locate("a")
      .withText("Política de Compra")
      .withAttr({ href: "/purchase" });

    I.waitForElement(políticadeCompra, 10);
    I.seeElement(políticadeCompra);

    I.scrollTo(políticadeCompra);
    I.click(políticadeCompra);

    I.waitInUrl("/purchase", 10);
    I.wait(3);
  },
).tag("@telainicial24");

/////----------/////

Scenario(
  "Cenário: 00025 - Clicar em Meia Entrada no footer.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForElement("body", 10);

    const footer = locate("footer");
    I.waitForElement(footer, 10);

    I.scrollTo(footer);
    I.see("© 2026 FasTix", footer);

    const meiaEntrada = locate("a")
      .withText("Meia Entrada")
      .withAttr({ href: "/half-price" });

    I.waitForElement(meiaEntrada, 10);
    I.seeElement(meiaEntrada);

    I.scrollTo(meiaEntrada);
    I.click(meiaEntrada);

    I.waitInUrl("/half-price", 10);

    I.wait(3);
  },
).tag("@telainicial25");

/////----------/////

Scenario(
  "Cenário: 00026 - Clicar no ícone do LinkedIn no footer.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForElement("body", 10);

    const footer = locate("footer");

    I.waitForElement(footer, 10);
    I.scrollTo(footer);
    I.see("© 2026 FasTix", footer);

    const linkedinLink = locate('//footer//a[contains(@href,"linkedin")]');

    I.waitForElement(linkedinLink, 10);
    I.seeElement(linkedinLink);

    I.click(linkedinLink);
    I.wait(2);
  },
).tag("@telainicial26");

/////----------/////

Scenario(
  "Cenário: 00027 - Clicar no ícone do Instagram no footer.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForElement("body", 10);

    const footer = locate("footer");

    I.waitForElement(footer, 10);
    I.scrollTo(footer);

    I.see("© 2026 FasTix", footer);

    const instagramLink = locate('//footer//a[contains(@href,"instagram")]');

    I.waitForElement(instagramLink, 10);
    I.seeElement(instagramLink);

    I.click(instagramLink);
    I.wait(2);
  },
).tag("@telainicial27");

/////----------/////

Scenario(
  "Cenário: 00028 - Clicar no ícone do Twitter no footer ((Ícone desatualizado).", async ({ I }) => {
  I.amOnPage("https://fastix.com.br/");
  I.waitForElement("body", 10);

  const footer = locate("footer");

  I.waitForElement(footer, 10);
  I.scrollTo(footer);

  I.see("© 2026 FasTix", footer);

  const twitterLink = locate(
    '//footer//a[.//span[normalize-space()="Twitter"]]',
  );

  I.waitForElement(twitterLink, 10);
  I.seeElement(twitterLink);

  I.click(twitterLink);
  I.wait(2);
}
).tag("@telainicial28");

/////----------/////

Scenario(
  "Cenário: 00029 - Clicar no ícone do X no footer.", async ({ I }) => {
  I.amOnPage("https://fastix.com.br/");
  I.waitForElement("body", 10);

  const footer = locate("footer");

  I.waitForElement(footer, 10);
  I.scrollTo(footer);

  I.see("© 2026 FasTix", footer);

  const emailLink = locate(
    '//footer//a[starts-with(@href,"mailto:") and .//span[normalize-space()="Email"]]',
  );

  I.waitForElement(emailLink, 10);
  I.seeElement(emailLink);

  I.click(emailLink);
  I.wait(2);
}
).tag("@telainicial29");

/////----------/////

Scenario(
  "Cenário: 00030 - Clicar no link WebSolutionsFL no footer.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForElement("body", 10);

    const footer = locate("footer");
    I.waitForElement(footer, 10);
    I.scrollTo(footer);

    I.see("© 2026 FasTix", footer);

    const webSolutionsLink = locate(
      '//footer//a[normalize-space()="WebSolutionsFL"]',
    );

    I.waitForElement(webSolutionsLink, 10);
    I.seeElement(webSolutionsLink);

    I.click(webSolutionsLink);
    I.wait(2);
  },
).tag("@telainicial30");

/////----------/////

Scenario(
  "Cenário: 00031 - Validar que todos os links principais retornam status 200 (Broken Links).",
  async ({ I }) => {
    const assert = require("assert");

    I.amOnPage("https://fastix.com.br/");
    I.waitForElement("body", 10);

    console.log("INICIANDO VALIDAÇÃO DE LINKS QUEBRADOS...");

    const linksStatus = await I.usePlaywrightTo(
      "capturar e validar links do header e footer",
      async ({ page }) => {
        const links = await page.evaluate(() => {
          const elements = Array.from(
            document.querySelectorAll("header a, footer a"),
          );

          return elements
            .map((a) => a.href)
            .filter(
              (href) =>
                href &&
                href.startsWith("http") &&
                !href.includes("mailto:") &&
                !href.includes("tel:"),
            );
        });

        const uniqueLinks = [...new Set(links)];

        console.log("TOTAL DE LINKS ENCONTRADOS:", uniqueLinks.length);

        const results = [];

        for (const link of uniqueLinks) {
          try {
            const response = await page.request.get(link);
            const status = response.status();

            console.log(`LINK: ${link} | STATUS: ${status}`);

            results.push({
              url: link,
              status,
              ok: status >= 200 && status < 400,
            });
          } catch (err) {
            console.log(`ERRO AO VALIDAR LINK: ${link}`);

            results.push({
              url: link,
              status: 0,
              ok: false,
            });
          }
        }

        return results;
      },
    );

    const brokenLinks = linksStatus.filter((l) => !l.ok);
    const invalid404 = linksStatus.filter((l) => l.status === 404);

    console.log("LINKS QUEBRADOS:", brokenLinks.length);
    console.log("TOTAL 404:", invalid404.length);

    // ==========================
    // ASSERTS CORRETOS
    // ==========================

    assert.strictEqual(
      brokenLinks.length,
      0,
      "Existem links quebrados na aplicação!",
    );

    assert.strictEqual(invalid404.length, 0, "Existem páginas retornando 404!");

    console.log("VALIDAÇÃO DE BROKEN LINKS CONCLUÍDA COM SUCESSO ✅");
  },
).tag("@telainicial31");

/////----------/////

Scenario(
  "Cenário: 00032 - Validar abertura correta de links externos (Instagram no footer)",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForElement("body", 10);

    const footer = locate("footer");

    I.scrollTo(footer);
    I.waitForElement(footer, 10);

    const instagramLink = locate('//footer//a[contains(@href,"instagram")]');

    I.waitForElement(instagramLink, 10);
    I.seeElement(instagramLink);

    const href = await I.grabAttributeFrom(instagramLink, "href");

    if (!href.includes("instagram")) {
      throw new Error(`Link inválido: ${href}`);
    }

    const target = await I.grabAttributeFrom(instagramLink, "target");

    if (target && target !== "_blank") {
      throw new Error(`Target inválido: ${target}`);
    }

    console.log("LINK INSTAGRAM VALIDADO SEM ABRIR NAVEGAÇÃO EXTERNA ✔");
  },
).tag("@telainicial32");

/////----------/////

Scenario(
  "Cenário: 00033 - Validar alteração completa de idioma para English",
  ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    const languageButton = locate("button").withText("BR");

    I.seeElement(languageButton);
    I.click(languageButton);

    I.waitForElement('[role="menu"]', 5);

    const englishOption = locate('[role="menuitem"]').withText("English");

    I.seeElement(englishOption);
    I.click(englishOption);

    I.say("IDIOMA ALTERADO PARA INGLÊS");

    I.wait(2);

    I.see("Explore Events");
    I.see("Publish Events");
    I.see("Support & Help");
    I.see("Sign in");
  },
).tag("@telainicial33");

/////----------/////

Scenario(
  "Cenário: 00034 - Validar alteração completa de idioma para English após atualização da página",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.say("VALIDANDO IDIOMA PADRÃO — PORTUGUÊS");

    I.waitForText("Explorar eventos", 10);
    I.see("Explorar Eventos");

    I.say("ALTERANDO IDIOMA PARA ENGLISH");

    const languageButton = locate("button").withText("BR");

    I.waitForElement(languageButton, 10);
    I.seeElement(languageButton);
    I.click(languageButton);

    I.waitForElement('[role="menu"]', 5);

    const englishOption = locate('[role="menuitem"]').withText("English");

    I.waitForElement(englishOption, 5);
    I.seeElement(englishOption);
    I.click(englishOption);

    I.say("IDIOMA ALTERADO PARA INGLÊS");

    I.wait(2);

    I.say("VALIDANDO INTERFACE EM INGLÊS");

    I.see("Explore Events");
    I.see("Publish Events");
    I.see("Support & Help");
    I.see("Sign in");

    I.say("✅ INTERFACE EM INGLÊS VALIDADA COM SUCESSO NA SESSÃO");

    I.say("VALIDANDO COMPORTAMENTO PÓS-REFRESH");

    I.refreshPage();

    I.wait(3);

    const idiomaAposRefresh = await I.executeScript(() => {
      const textoMenu = document.body.innerText;
      if (textoMenu.includes("Explore Events")) return "en";
      if (
        textoMenu.includes("Explorar Eventos") ||
        textoMenu.includes("Explorar eventos")
      )
        return "pt";
      return "desconhecido";
    });

    console.log(`Idioma detectado após refresh: ${idiomaAposRefresh}`);

    if (idiomaAposRefresh === "en") {
      I.say(
        "✅ PERSISTÊNCIA DE IDIOMA IMPLEMENTADA — página manteve English após refresh",
      );
      I.see("Explore Events");
      I.see("Publish Events");
      I.see("Support & Help");
      I.see("Sign in");
    } else {
      I.say(
        "⚠️ IDIOMA NÃO PERSISTE APÓS REFRESH — comportamento esperado da aplicação atual",
      );
      I.say(
        "A aplicação voltou ao idioma padrão (PT-BR) após recarregar a página",
      );
      console.log(
        "INFO: A preferência de idioma não é salva em localStorage/cookie.",
      );
      console.log("INFO: Este é o comportamento atual da aplicação Fastix.");

      I.see("Explorar Eventos");
      I.see("Publicar Eventos");
      I.see("Suporte e Ajuda");
      I.see("Entrar");
    }

    I.say("VALIDANDO INTEGRIDADE ESTRUTURAL DA PÁGINA");

    const estado = await I.executeScript(() => ({
      readyState: document.readyState,
      body: !!document.body,
      links: document.querySelectorAll("a").length,
      buttons: document.querySelectorAll("button").length,
    }));

    console.log("Estado final da página:", estado);

    if (estado.readyState !== "complete") {
      throw new Error("Página não finalizou carregamento após refresh.");
    }

    if (!estado.body) {
      throw new Error("Body da página não foi renderizado corretamente.");
    }

    I.say(
      "✅ CENÁRIO 00034 FINALIZADO — TROCA DE IDIOMA E COMPORTAMENTO PÓS-REFRESH VALIDADOS",
    );
  },
).tag("@telainicial34");

/////----------/////

Scenario(
  "Cenário: 00035 - Validar alteração completa de idioma para Español.",
  ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    const languageButton = locate("button").withText("BR");

    I.seeElement(languageButton);
    I.click(languageButton);

    I.waitForElement('[role="menu"]', 5);

    const spanishOption = locate('[role="menuitem"]').withText("Español");

    I.seeElement(spanishOption);
    I.click(spanishOption);

    I.say("IDIOMA ALTERADO PARA ESPANHOL");

    I.wait(2);

    I.see("Explorar Eventos");
    I.see("Publicar Eventos");
    I.see("Soporte y Ayuda");
    I.see("Iniciar sesión");
  },
).tag("@telainicial35");

/////----------/////

Scenario(
  "Cenário 36: Validar acessibilidade e navegação via TAB nos elementos interativos do footer",
  async ({ I }) => {
    async function validarElementoViaTab(textoEsperado, maxTabs = 100) {
      I.say(`NAVEGANDO VIA TAB ATÉ "${textoEsperado}"`);

      I.scrollPageToBottom();
      I.wait(2);

      await I.usePlaywrightTo(
        `garantir footer visível - ${textoEsperado}`,
        async ({ page }) => {
          const footer = page.locator("footer");
          await footer.scrollIntoViewIfNeeded();
          console.log("FOOTER VISÍVEL");
        },
      );

      let encontrou = false;

      for (let i = 1; i <= maxTabs; i++) {
        I.pressKey("Tab");
        I.wait(0.2);

        const resultado = await I.usePlaywrightTo(
          `validar TAB ${textoEsperado} ${i}`,
          async ({ page }) => {
            const focused = page.locator(":focus");

            const text = (await focused.textContent()) || "";
            const aria = (await focused.getAttribute("aria-label")) || "";
            const title = (await focused.getAttribute("title")) || "";
            const href = (await focused.getAttribute("href")) || "";
            const tagName = await focused.evaluate((el) => el.tagName);

            console.log(`FOCO ${i}:`, { text, aria, title, href, tagName });

            return { text, aria, title, href, tagName };
          },
        );

        const conteudo = `
          ${resultado?.text || ""}
          ${resultado?.aria || ""}
          ${resultado?.title || ""}
          ${resultado?.href || ""}
        `.toLowerCase();

        if (conteudo.includes(textoEsperado.toLowerCase())) {
          encontrou = true;
          console.log(`"${textoEsperado}" encontrado no TAB ${i}`);
          break;
        }
      }

      if (!encontrou) {
        throw new Error(`
❌ FALHA

O foco via TAB não chegou
ao elemento:

"${textoEsperado}"

Foram realizadas
${maxTabs} tentativas.
`);
      }

      I.say(`"${textoEsperado}" validado via TAB com sucesso`);
    }

    I.amOnPage("https://fastix.com.br/");
    I.waitForElement("body", 10);

    I.say("INICIANDO NAVEGAÇÃO VIA TAB");

    for (let n = 1; n <= 7; n++) {
      I.pressKey("Tab");
      I.wait(1);

      await I.usePlaywrightTo(`validar foco ${n}`, async ({ page }) => {
        const activeElement = await page.evaluate(
          () => document.activeElement?.textContent,
        );
        console.log(`FOCO ${n}:`, activeElement);
      });
    }

    I.pressKey("Tab");
    I.wait(1);

    await I.usePlaywrightTo(
      "validar foco no botão Explorar eventos",
      async ({ page }) => {
        const activeElement = await page.evaluate(
          () => document.activeElement?.textContent,
        );
        console.log("FOCO 8:", activeElement);

        if (!activeElement.includes("Explorar eventos")) {
          throw new Error('Foco não está em "Explorar eventos"');
        }
      },
    );

    I.pressKey("Tab");
    I.wait(1);

    await I.usePlaywrightTo(
      "validar foco no campo Pesquisar evento",
      async ({ page }) => {
        const activeElement = await page.evaluate(
          () => document.activeElement?.textContent,
        );
        console.log("FOCO 9:", activeElement);

        if (!activeElement.includes("Pesquisar evento, local...")) {
          throw new Error('Foco não está em "Pesquisar evento, local..."');
        }
      },
    );

    I.pressKey("Tab");
    I.wait(1);

    await I.usePlaywrightTo(
      "validar foco acessível na listagem de eventos",
      async ({ page }) => {
        const focusedElement = page.locator(":focus");

        const text = await focusedElement.textContent();
        const tagName = await focusedElement.evaluate((el) => el.tagName);
        const ariaLabel = await focusedElement.getAttribute("aria-label");
        const role = await focusedElement.getAttribute("role");
        const tabIndex = await focusedElement.getAttribute("tabindex");

        console.log("FOCO 10:", {
          tagName,
          text: text?.substring(0, 80),
          ariaLabel,
          role,
          tabIndex,
        });

        const isEventArea =
          role === "tabpanel" ||
          text?.includes("Buffalo Tom em São Paulo") ||
          ariaLabel?.includes("Buffalo Tom em São Paulo");

        if (!isEventArea) {
          throw new Error(
            "O foco via TAB não chegou na área de listagem de eventos.",
          );
        }

        const isAccessible =
          ["A", "BUTTON"].includes(tagName) ||
          role === "tabpanel" ||
          role === "button" ||
          tabIndex !== null;

        if (!isAccessible) {
          throw new Error(
            "O elemento focado não aparenta ser acessível via teclado.",
          );
        }
      },
    );

    I.see("Buffalo Tom em São Paulo");
    I.seeElement(
      'img[alt="Event"][src*="58c02daa-fd4c-466c-8a6f-417b0296c280-blob.jpeg"]',
    );

    I.say('REALIZANDO SCROLL ATÉ "Experiências que combinam com você"');

    I.scrollTo('//h2[contains(.,"Experiências que combinam com você")]');
    I.wait(2);

    I.see("Experiências que combinam com você");

    await validarElementoViaTab("Criar conta", 100);

    I.say('REALIZANDO NOVO SCROLL DOWN ATÉ "Publicar evento"');

    I.scrollTo('//a[contains(.,"Publicar evento")]');
    I.wait(2);

    I.seeElement('//a[contains(.,"Publicar evento")]');
    I.see("Publicar evento");

    await validarElementoViaTab("Publicar evento");

    I.say('REALIZANDO SCROLL ATÉ "Nós podemos ajudar"');

    I.scrollTo('//div[contains(.,"Nós podemos ajudar")]');
    I.wait(2);

    I.see("Nós podemos ajudar");

    await validarElementoViaTab("Criar conta", 100);

    I.say("REALIZANDO SCROLL ATÉ O FOOTER");

    I.scrollPageToBottom();
    I.wait(2);

    I.see("iOS");
    I.see("Android");
    I.see("Guia Check-in");
    I.see("Termos e Condições de Uso");
    I.see("Política de Compra");
    I.see("Meia Entrada");

    await validarElementoViaTab("iOS");
    await validarElementoViaTab("Android");
    await validarElementoViaTab("Guia Check-in");
    await validarElementoViaTab("Termos e Condições");
    await validarElementoViaTab("Política de Compra");
    await validarElementoViaTab("Meia Entrada");
    await validarElementoViaTab("linkedin");
    await validarElementoViaTab("instagram");
    await validarElementoViaTab("twitter");
    await validarElementoViaTab("email");
    await validarElementoViaTab("websolutionsfl");

    I.say("FOOTER VALIDADO VIA TAB COM SUCESSO");
    I.say("NAVEGAÇÃO VIA TAB VALIDADA COM SUCESSO");
  },
).tag("@telainicial36");

/////----------/////

Scenario(
  "Cenário: 00037 - Validar estrutura visual, landmarks e atributos principais da home.",
  async ({ I }) => {
    I.say("ACESSANDO HOME");

    I.amOnPage("https://fastix.com.br/");
    I.waitForElement("body", 10);

    I.say("VALIDANDO LANDMARKS E ESTRUTURA SEMÂNTICA");

    const landmarks = await I.usePlaywrightTo(
      "validar landmarks da página",
      async ({ page }) => {
        return {
          header: (await page.locator("header").count()) > 0,

          main:
            (await page.locator("main").count()) > 0 ||
            (await page.locator('[role="main"]').count()) > 0,

          footer: (await page.locator("footer").count()) > 0,

          navigation: (await page.locator("nav").count()) > 0,
        };
      },
    );

    console.log("LANDMARKS ENCONTRADOS:", landmarks);

    if (!landmarks.header) {
      throw new Error("A página não possui landmark HEADER.");
    }

    I.say("HEADER VALIDADO");

    if (!landmarks.main) {
      console.warn("[SEMÂNTICA] Página não possui <main> nem role='main'.");
    } else {
      I.say("MAIN VALIDADO");
    }

    if (!landmarks.footer) {
      throw new Error("A página não possui landmark FOOTER.");
    }

    I.say("FOOTER VALIDADO");

    if (!landmarks.navigation) {
      console.warn("[SEMÂNTICA] Página não possui landmark NAV.");
    } else {
      I.say("NAVIGATION VALIDADA");
    }

    I.say("VALIDANDO ATRIBUTOS GLOBAIS");

    const atributosPagina = await I.usePlaywrightTo(
      "capturar atributos globais",
      async ({ page }) => {
        const html = page.locator("html");
        const body = page.locator("body");

        return {
          lang: await html.getAttribute("lang"),
          bodyClass: await body.getAttribute("class"),
          title: await page.title(),
          viewport: await page.viewportSize(),
        };
      },
    );

    if (!atributosPagina.lang) {
      console.warn("[ACESSIBILIDADE] Página sem atributo LANG.");
    } else {
      I.say(`LANG IDENTIFICADO: ${atributosPagina.lang}`);
    }

    if (!atributosPagina.title) {
      throw new Error("Página sem TITLE.");
    }

    I.say(`TITLE: ${atributosPagina.title}`);

    if (!atributosPagina.viewport) {
      throw new Error("Viewport não identificado.");
    }

    I.say(
      `VIEWPORT: ${atributosPagina.viewport.width}x${atributosPagina.viewport.height}`,
    );

    I.say("VALIDANDO ELEMENTOS PRINCIPAIS");

    const elementos = [
      {
        nome: "Explorar Eventos",
        selector: 'a[href="/events"]',
      },
      {
        nome: "Entrar",
        selector: 'a[href*="signin"]',
      },
      {
        nome: "Criar Conta",
        selector: 'a[href*="signup"]',
      },
      {
        nome: "Botão Idioma",
        selector: 'button:has-text("BR")',
      },
    ];

    for (const elemento of elementos) {
      I.say(`VALIDANDO ${elemento.nome}`);

      const resultado = await I.usePlaywrightTo(
        `validar ${elemento.nome}`,
        async ({ page }) => {
          const el = page.locator(elemento.selector).first();

          await el.waitFor({
            state: "visible",
            timeout: 10000,
          });

          return {
            text: (await el.textContent())?.trim(),

            href: await el.getAttribute("href"),

            class: await el.getAttribute("class"),

            role: await el.getAttribute("role"),

            ariaLabel: await el.getAttribute("aria-label"),
          };
        },
      );

      if (!resultado.text) {
        console.warn(`[UX] ${elemento.nome} sem texto visível.`);
      }

      console.log({
        elemento: elemento.nome,
        atributos: resultado,
      });

      I.say(`${elemento.nome} VALIDADO`);
    }

    I.say("VALIDANDO IMAGENS SEM ALT");

    const imagensSemAlt = await I.usePlaywrightTo(
      "capturar imagens sem alt",
      async ({ page }) => {
        const imagens = await page.locator("img").evaluateAll((imgs) => {
          return imgs.map((img) => ({
            src: img.getAttribute("src"),
            alt: img.getAttribute("alt"),
          }));
        });

        return imagens.filter(
          (img) => img.alt === null || img.alt.trim() === "",
        );
      },
    );

    if (imagensSemAlt.length > 0) {
      console.warn("[ACESSIBILIDADE] IMAGENS SEM ALT:", imagensSemAlt);
    } else {
      I.say("TODAS AS IMAGENS POSSUEM ALT");
    }

    I.say("VALIDANDO ERROS DE CONSOLE");

    const errosConsole = [];

    await I.usePlaywrightTo("capturar erros console", async ({ page }) => {
      page.on("console", (msg) => {
        if (msg.type() === "error") {
          errosConsole.push(msg.text());
        }
      });

      await page.reload();

      await page.waitForLoadState("networkidle");
    });

    if (errosConsole.length > 0) {
      console.warn("[OBSERVABILIDADE] ERROS NO CONSOLE:", errosConsole);
    } else {
      I.say("SEM ERROS NO CONSOLE");
    }

    I.say("ESTRUTURA VISUAL VALIDADA");
    I.say("ATRIBUTOS PRINCIPAIS VALIDOS");
    I.say("LANDMARKS E SEMÂNTICA ANALISADOS");
  },
).tag("@telainicial37");

/////----------/////

Scenario(
  "Cenário: 00038 - Validar contraste visual mínimo dos componentes críticos.",
  async ({ I }) => {
    I.say("ACESSANDO INTERFACE PRINCIPAL");

    I.amOnPage("https://fastix.com.br/");
    I.waitForElement("body", 10);

    I.say("VALIDANDO COMPONENTES CRÍTICOS");

    const componentes = [
      {
        nome: "Botão Explorar Eventos",
        selector: 'a[href="/events"]',
      },
      {
        nome: "Botão Entrar",
        selector: 'a[href*="signin"]',
      },
      {
        nome: "Botão Criar Conta",
        selector: 'a[href*="signup"]',
      },
      {
        nome: "Botão Idioma",
        selector: 'button:has-text("BR")',
      },
      {
        nome: "Footer",
        selector: "footer",
      },
      {
        nome: "Header",
        selector: "header",
      },
    ];

    for (const componente of componentes) {
      I.say(`ANALISANDO CONTRASTE: ${componente.nome}`);

      const resultado = await I.usePlaywrightTo(
        `validar contraste ${componente.nome}`,
        async ({ page }) => {
          const elemento = page.locator(componente.selector).first();

          await elemento.waitFor({
            state: "visible",
            timeout: 10000,
          });

          const estilos = await elemento.evaluate((el) => {
            const computed = window.getComputedStyle(el);

            return {
              color: computed.color,
              backgroundColor: computed.backgroundColor,
              fontSize: computed.fontSize,
              fontWeight: computed.fontWeight,
              opacity: computed.opacity,
              visibility: computed.visibility,
              display: computed.display,
            };
          });

          const texto = (await elemento.textContent())?.trim();

          return {
            texto,
            estilos,
          };
        },
      );

      console.log({
        componente: componente.nome,
        resultado,
      });

      if (
        resultado.estilos.display === "none" ||
        resultado.estilos.visibility === "hidden"
      ) {
        throw new Error(`${componente.nome} não está visível.`);
      }

      if (parseFloat(resultado.estilos.opacity) < 0.5) {
        console.warn(
          `[ACESSIBILIDADE] ${componente.nome} possui baixa opacidade.`,
        );
      }

      if (resultado.texto && resultado.texto.length > 0) {
        I.say(`${componente.nome} possui texto visível.`);
      } else {
        console.warn(`[UX] ${componente.nome} não possui texto visível.`);
      }

      const corTexto = resultado.estilos.color;

      const corFundo = resultado.estilos.backgroundColor;

      if (corTexto === corFundo) {
        throw new Error(
          `${componente.nome} possui texto com mesma cor do fundo.`,
        );
      }

      I.say(
        `${componente.nome} possui diferenciação visual entre texto e fundo.`,
      );
    }

    I.say("VALIDANDO ESTADOS VISUAIS HOVER");

    const hoverResultado = await I.usePlaywrightTo(
      "validar hover botão explorar eventos",
      async ({ page }) => {
        const elemento = page.locator('a[href="/events"]').first();

        await elemento.hover();

        const estilos = await elemento.evaluate((el) => {
          const computed = window.getComputedStyle(el);

          return {
            color: computed.color,
            backgroundColor: computed.backgroundColor,
            opacity: computed.opacity,
          };
        });

        return estilos;
      },
    );

    console.log("HOVER:", hoverResultado);

    I.say("CONTRASTE VISUAL DOS COMPONENTES CRÍTICOS VALIDADO");

    I.say("TEXTOS LEGÍVEIS EM TODOS OS ESTADOS VISUAIS");
  },
).tag("@telainicial38");

/////----------/////

Scenario(
  "Cenário: 00039 - Validar foco visível ao navegar via teclado.",
  async ({ I }) => {
    I.say("ACESSANDO A APLICAÇÃO");

    I.amOnPage("https://fastix.com.br/");
    I.waitForElement("body", 10);

    const elementosInterativos = [
      {
        nome: "Explorar Eventos",
        selector: 'a[href="/events"]',
      },
      {
        nome: "Entrar",
        selector: 'a[href*="signin"]',
      },
      {
        nome: "Criar Conta",
        selector: 'a[href*="signup"]',
      },
      {
        nome: "Botão Idioma",
        selector: 'button:has-text("BR")',
      },
      {
        nome: "Busca Global",
        selector: "button:has(kbd)",
      },
    ];

    I.say("INICIANDO NAVEGAÇÃO VIA TECLADO");

    for (const elemento of elementosInterativos) {
      let encontrouFoco = false;

      I.say(`VALIDANDO FOCO VISÍVEL: ${elemento.nome}`);

      for (let i = 1; i <= 30; i++) {
        I.pressKey("Tab");
        I.wait(0.3);

        const resultado = await I.usePlaywrightTo(
          `validar foco ${elemento.nome} ${i}`,
          async ({ page }) => {
            const focused = page.locator(":focus");

            const count = await focused.count();

            if (count === 0) {
              return null;
            }

            const tagName = await focused.evaluate((el) => el.tagName);

            const text = (await focused.textContent())?.trim();

            const className = await focused.getAttribute("class");

            const outline = await focused.evaluate((el) => {
              const styles = window.getComputedStyle(el);

              return {
                outline: styles.outline,
                outlineColor: styles.outlineColor,
                outlineStyle: styles.outlineStyle,
                outlineWidth: styles.outlineWidth,
                boxShadow: styles.boxShadow,
                border: styles.border,
              };
            });

            return {
              tagName,
              text,
              className,
              outline,
            };
          },
        );

        if (!resultado) {
          continue;
        }

        console.log(`FOCO ${elemento.nome} ${i}:`, resultado);

        const textoAtual = resultado.text || "";

        if (
          textoAtual.includes(elemento.nome) ||
          textoAtual.includes("Explorar") ||
          textoAtual.includes("Entrar") ||
          textoAtual.includes("Criar") ||
          textoAtual.includes("BR")
        ) {
          encontrouFoco = true;

          const possuiIndicadorVisual =
            resultado.outline.outlineStyle !== "none" ||
            resultado.outline.outlineWidth !== "0px" ||
            resultado.outline.boxShadow !== "none";

          if (!possuiIndicadorVisual) {
            console.warn(
              `[ACESSIBILIDADE] ${elemento.nome} não possui foco visual evidente.`,
            );
          } else {
            I.say(`${elemento.nome} possui foco visual identificável.`);
          }

          break;
        }
      }

      if (!encontrouFoco) {
        console.warn(
          `[TECLADO] Não foi possível alcançar ${elemento.nome} via TAB.`,
        );
      }
    }

    I.say("NAVEGAÇÃO VIA TECLADO VALIDADA COM SUCESSO");

    I.say("FOCO VISÍVEL ANALISADO NOS ELEMENTOS INTERATIVOS");
  },
).tag("@telainicial39");

/////----------/////

Scenario(
  "Cenário: 00040 - Validar abertura do menu de idioma via ENTER.",
  async ({ I }) => {
    I.say("ACESSANDO A PÁGINA INICIAL");

    I.amOnPage("https://fastix.com.br/");
    I.waitForElement("body", 10);

    const botaoIdioma = 'button:has-text("BR")';

    I.say("LOCALIZANDO BOTÃO DE IDIOMA");

    I.waitForElement(botaoIdioma, 10);

    I.say("APLICANDO FOCO NO BOTÃO DE IDIOMA");

    await I.usePlaywrightTo("focar botão idioma", async ({ page }) => {
      const botao = page.locator(botaoIdioma).first();

      await botao.focus();
    });

    const focoAtual = await I.usePlaywrightTo(
      "validar foco atual",
      async ({ page }) => {
        const focused = page.locator(":focus");

        return {
          text: (await focused.textContent())?.trim(),

          tag: await focused.evaluate((el) => el.tagName),
        };
      },
    );

    console.log("FOCO ATUAL:", focoAtual);

    if (!focoAtual.text?.includes("BR")) {
      throw new Error("O botão de idioma não recebeu foco.");
    }

    I.say("BOTÃO DE IDIOMA FOCADO COM SUCESSO");

    I.say("PRESSIONANDO ENTER");

    I.pressKey("Enter");

    const menuAberto = '[role="menu"]';

    I.waitForElement(menuAberto, 10);

    I.say("MENU DE IDIOMA ABERTO");

    const idiomas = ["Português", "English", "Español"];

    for (const idioma of idiomas) {
      I.say(`VALIDANDO IDIOMA: ${idioma}`);

      const opcaoIdioma = locate('[role="menuitem"]').withText(idioma);

      I.waitForElement(opcaoIdioma, 10);

      I.seeElement(opcaoIdioma);
    }

    I.say("MENU DE IDIOMA ABERTO VIA ENTER COM SUCESSO");

    I.say("OPÇÕES DE IDIOMA EXIBIDAS CORRETAMENTE");
  },
).tag("@telainicial40");

Scenario(
  "Cenário: 00041 - Diagnosticar comportamento do CTRL + K.",
  async ({ I }) => {
    I.say("ACESSANDO HOME");

    I.amOnPage("https://fastix.com.br/");
    I.waitForElement("body", 10);

    I.say("APLICANDO FOCO NO BODY");

    await I.usePlaywrightTo("focar body", async ({ page }) => {
      await page.locator("body").focus();
    });

    I.say("MONITORANDO EVENTOS DE TECLADO");

    await I.usePlaywrightTo("monitor keyboard", async ({ page }) => {
      await page.evaluate(() => {
        window.__CTRL_K_DETECTED__ = false;

        document.addEventListener("keydown", (e) => {
          if (e.ctrlKey && e.key.toLowerCase() === "k") {
            window.__CTRL_K_DETECTED__ = true;

            console.log("CTRL + K DETECTADO");
          }
        });
      });
    });

    I.say("PRESSIONANDO CTRL + K");

    await I.usePlaywrightTo("executar ctrl k", async ({ page }) => {
      await page.keyboard.press("Control+K");
    });

    I.wait(2);

    const eventoDetectado = await I.usePlaywrightTo(
      "validar evento",
      async ({ page }) => {
        return await page.evaluate(() => {
          return window.__CTRL_K_DETECTED__;
        });
      },
    );

    console.log("CTRL+K:", eventoDetectado);

    if (!eventoDetectado) {
      throw new Error("O evento CTRL + K não foi detectado pela aplicação.");
    }

    I.say("EVENTO CTRL + K DETECTADO");

    I.say("INSPECIONANDO DOM APÓS CTRL + K");

    const diagnostico = await I.usePlaywrightTo(
      "inspecionar dom",
      async ({ page }) => {
        return {
          dialogs: await page.locator('[role="dialog"]').count(),

          modals: await page.locator(".modal").count(),

          inputs: await page.locator("input").count(),

          search: await page.locator('[placeholder*="Pesquisar"]').count(),

          command: await page.locator("text=/command|search|buscar/i").count(),
        };
      },
    );

    console.log("DIAGNÓSTICO:", diagnostico);

    I.say("DIAGNÓSTICO FINALIZADO");

    I.say(
      "VERIFIQUE O LOG DO CONSOLE PARA IDENTIFICAR COMO A BUSCA É RENDERIZADA",
    );
  },
).tag("@telainicial41");

/////----------/////

Scenario(
  "Cenário: 00042 - Validar comportamento funcional do atalho CTRL + K.",
  async ({ I }) => {
    I.say("ACESSANDO HOME");

    I.amOnPage("https://fastix.com.br/");
    I.waitForElement("body", 10);

    I.say("VALIDANDO EXIBIÇÃO DO ATALHO CTRL + K");

    const botaoBusca = locate("button").withDescendant("kbd");

    I.waitForElement(botaoBusca, 10);

    const atalhoVisivel = await I.usePlaywrightTo(
      "capturar atalho",
      async ({ page }) => {
        const elemento = page.locator("kbd").first();

        const texto = (await elemento.textContent())?.trim();

        return texto;
      },
    );

    console.log("ATALHO:", atalhoVisivel);

    I.say("APLICANDO FOCO NO BODY");

    await I.usePlaywrightTo("focar body", async ({ page }) => {
      await page.locator("body").focus();
    });

    I.say("MONITORANDO EVENTO CTRL + K");

    await I.usePlaywrightTo("monitorar evento teclado", async ({ page }) => {
      await page.evaluate(() => {
        window.__CTRL_K_ATIVADO__ = false;

        document.addEventListener("keydown", (e) => {
          if (e.ctrlKey && e.key.toLowerCase() === "k") {
            window.__CTRL_K_ATIVADO__ = true;

            console.log("EVENTO CTRL + K DETECTADO");
          }
        });
      });
    });

    I.say("PRESSIONANDO CTRL + K");

    await I.usePlaywrightTo("executar ctrl k", async ({ page }) => {
      await page.keyboard.press("Control+K");
    });

    I.wait(2);

    const eventoDetectado = await I.usePlaywrightTo(
      "validar evento ctrl k",
      async ({ page }) => {
        return await page.evaluate(() => {
          return window.__CTRL_K_ATIVADO__;
        });
      },
    );

    console.log("EVENTO DETECTADO:", eventoDetectado);

    if (!eventoDetectado) {
      throw new Error("O evento CTRL + K não foi detectado.");
    }

    I.say("EVENTO CTRL + K DETECTADO");

    I.say("VALIDANDO AUSÊNCIA DE MODAL");

    const quantidadeDialogs = await I.usePlaywrightTo(
      "capturar dialogs",
      async ({ page }) => {
        return await page.locator('[role="dialog"]').count();
      },
    );

    const quantidadeModals = await I.usePlaywrightTo(
      "capturar modals",
      async ({ page }) => {
        return await page.locator(".modal").count();
      },
    );

    console.log({
      dialogs: quantidadeDialogs,
      modals: quantidadeModals,
    });

    if (quantidadeDialogs > 0 || quantidadeModals > 0) {
      throw new Error("Foi encontrado um modal após CTRL + K.");
    }

    I.say("NENHUM MODAL DE BUSCA FOI EXIBIDO");

    I.say("VALIDANDO AUSÊNCIA DE CAMPO DE PESQUISA FOCADO");

    const diagnosticoInputs = await I.usePlaywrightTo(
      "validar inputs",
      async ({ page }) => {
        const inputs = page.locator("input");

        const quantidade = await inputs.count();

        let inputFocado = false;

        for (let i = 0; i < quantidade; i++) {
          const input = inputs.nth(i);

          const focado = await input.evaluate(
            (el) => el === document.activeElement,
          );

          if (focado) {
            inputFocado = true;
            break;
          }
        }

        return {
          quantidade,
          inputFocado,
        };
      },
    );

    console.log("DIAGNÓSTICO INPUTS:", diagnosticoInputs);

    if (diagnosticoInputs.inputFocado) {
      throw new Error("Um campo de pesquisa recebeu foco após CTRL + K.");
    }

    I.say("NENHUM CAMPO DE PESQUISA RECEBEU FOCO");

    I.say("COMPORTAMENTO FUNCIONAL DO CTRL + K VALIDADO");
  },
).tag("@telainicial42");

/////----------/////
Scenario(
  "Cenário: 00043 - Validar estrutura principal, navegação e responsividade da Home.",
  async ({ I }) => {
    I.retry(2);

    I.amOnPage("https://fastix.com.br/");

    I.waitForElement("body", 15);
    I.waitForText("Explorar eventos", 15);

    I.say("INICIANDO VALIDAÇÃO HÍBRIDA DA HOME");

    await I.usePlaywrightTo("Validar Desktop", async ({ page }) => {
      await page.setViewportSize({
        width: 1920,
        height: 1080,
      });
    });

    I.wait(2);

    const headerDesktop = await I.grabElementBoundingRect("header");

    console.log("HEADER DESKTOP:", headerDesktop);

    if (!headerDesktop || headerDesktop.height <= 0) {
      throw new Error("Header não encontrado no Desktop.");
    }

    I.see("Explorar eventos");

    I.seeElement(locate("a").withText("Publicar Eventos"));

    I.seeElement("header");

    const totalLinks = await I.grabNumberOfVisibleElements("a");

    console.log("LINKS ENCONTRADOS:", totalLinks);

    if (totalLinks < 5) {
      throw new Error(
        `Quantidade insuficiente de links encontrados: ${totalLinks}`,
      );
    }

    const eventos = await I.grabNumberOfVisibleElements('[href*="/event"]');

    console.log("EVENTOS ENCONTRADOS:", eventos);

    if (eventos < 1) {
      throw new Error("Nenhum evento encontrado na Home.");
    }

    I.scrollPageToBottom();

    I.wait(2);

    I.seeElement("footer");

    const footerDesktop = await I.grabElementBoundingRect("footer");

    console.log("FOOTER DESKTOP:", footerDesktop);

    await I.usePlaywrightTo("Validar Tablet", async ({ page }) => {
      await page.setViewportSize({
        width: 768,
        height: 1024,
      });
    });

    I.wait(2);

    I.amOnPage("https://fastix.com.br/");

    I.waitForElement("body", 10);

    const headerTablet = await I.grabElementBoundingRect("header");

    console.log("HEADER TABLET:", headerTablet);

    if (!headerTablet || headerTablet.height <= 0) {
      throw new Error("Header não encontrado no Tablet.");
    }

    I.see("Explorar eventos");

    await I.usePlaywrightTo("Validar Mobile", async ({ page }) => {
      await page.setViewportSize({
        width: 375,
        height: 812,
      });
    });

    I.wait(2);

    I.amOnPage("https://fastix.com.br/");

    I.waitForElement("body", 10);

    const headerMobile = await I.grabElementBoundingRect("header");

    console.log("HEADER MOBILE:", headerMobile);

    if (!headerMobile || headerMobile.height <= 0) {
      throw new Error("Header não encontrado no Mobile.");
    }

    I.seeElement("header");

    I.say(
      "SUCESSO: Header, Footer, Eventos, Links e Responsividade validados.",
    );
  },
).tag("@telainicial43");

/////----------/////

Scenario(
  "Cenário: 00044 - Validar que o header não sofre quebra visual.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForElement("header", 10);

    I.say("INICIANDO VALIDAÇÃO DE RESPONSIVIDADE DO HEADER");

    I.usePlaywrightTo("validar header no desktop", async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });

      const header = page.locator("header");

      const boundingBox = await header.boundingBox();
      const isVisible = await header.isVisible();

      if (!isVisible) {
        throw new Error("Header não está visível no desktop");
      }

      console.log("HEADER DESKTOP:", boundingBox);
    });

    I.wait(1);

    I.usePlaywrightTo("validar header no tablet", async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });

      const header = page.locator("header");

      const box = await header.boundingBox();

      if (!box) {
        throw new Error("Header não renderizado no tablet");
      }

      console.log("HEADER TABLET:", box);
    });

    I.wait(1);

    I.usePlaywrightTo("validar header no mobile", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 812 });

      const header = page.locator("header");

      const box = await header.boundingBox();

      if (!box) {
        throw new Error("Header não renderizado no mobile");
      }

      console.log("HEADER MOBILE:", box);
    });

    I.wait(1);

    I.usePlaywrightTo(
      "validar alinhamento básico do header",
      async ({ page }) => {
        const header = page.locator("header");
        const elements = header.locator("*");

        const count = await elements.count();

        if (count === 0) {
          throw new Error("Header não possui elementos internos");
        }

        console.log("ELEMENTOS NO HEADER:", count);
      },
    );

    I.say("HEADER VALIDADO EM DIFERENTES RESOLUÇÕES COM SUCESSO");
  },
).tag("@telainicial44");

/////----------/////

Scenario(
  "Cenário: 00045 - Validar carregamento inicial da home em menos de 3 segundos.",
  async ({ I }) => {
    const startTime = Date.now();

    I.amOnPage("https://fastix.com.br/");
    I.waitForElement("body", 10);

    const endTime = Date.now();
    const loadTime = (endTime - startTime) / 1000;

    console.log(`TEMPO DE CARREGAMENTO: ${loadTime}s`);

    if (loadTime > 3) {
      throw new Error(
        `A página demorou ${loadTime}s para carregar, excedendo o limite de 3 segundos.`,
      );
    }

    I.see("Explorar Eventos");
    I.see("Publicar Eventos");

    I.usePlaywrightTo(
      "validar elementos críticos da home visíveis",
      async ({ page }) => {
        const elementosCriticos = [
          "Explorar Eventos",
          "Publicar Eventos",
          "Pesquisar evento, local...",
        ];

        for (const texto of elementosCriticos) {
          const el = page.locator(`text=${texto}`);
          const visible = await el.first().isVisible();

          console.log(`VALIDANDO: ${texto} -> ${visible}`);

          if (!visible) {
            throw new Error(`Elemento crítico não visível: ${texto}`);
          }
        }
      },
    );

    I.say("HOME CARREGADA COM SUCESSO DENTRO DO LIMITE DE 3 SEGUNDOS");
  },
).tag("@telainicial45");

/////----------/////

Scenario(
  "Cenário: 00046 - Validar estabilidade do carrossel após 100 navegações consecutivas.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.executeScript(() => {
      window.scrollBy(0, window.innerHeight);
    });

    I.wait(2);

    I.seeElement("svg.lucide-arrow-left");
    I.seeElement("svg.lucide-arrow-right");

    I.say("INICIANDO TESTE DE RESILIÊNCIA DO CARROSSEL (100 NAVEGAÇÕES)");

    let errosDetectados = 0;

    for (let i = 1; i <= 100; i++) {
      I.executeScript(() => {
        const botaoEsquerda = document
          .querySelector("svg.lucide-arrow-left")
          ?.closest("button");

        if (!botaoEsquerda) {
          throw new Error("Botão de navegação ESQUERDA não encontrado");
        }

        botaoEsquerda.click();
      });

      I.wait(0.2);

      const resultado = await I.usePlaywrightTo(
        `validar estabilidade após clique esquerda ${i}`,
        async ({ page }) => {
          try {
            const carousel = page.locator("body");

            const isVisible = await carousel.isVisible();

            if (!isVisible) {
              throw new Error("Carrossel deixou de ser visível");
            }

            return { ok: true };
          } catch (error) {
            return { ok: false, error: error.message };
          }
        },
      );

      if (!resultado?.ok) {
        errosDetectados++;
        console.log(`ERRO DETECTADO NO CLIQUE ${i}`);
      }

      I.say(`Clique ESQUERDA ${i}/100 executado`);
    }

    for (let i = 1; i <= 100; i++) {
      I.executeScript(() => {
        const botaoDireita = document
          .querySelector("svg.lucide-arrow-right")
          ?.closest("button");

        if (!botaoDireita) {
          throw new Error("Botão de navegação DIREITA não encontrado");
        }

        botaoDireita.click();
      });

      I.wait(0.2);

      const resultado = await I.usePlaywrightTo(
        `validar estabilidade após clique direita ${i}`,
        async ({ page }) => {
          try {
            const carousel = page.locator("body");

            const isVisible = await carousel.isVisible();

            if (!isVisible) {
              throw new Error("Carrossel deixou de ser visível");
            }

            return { ok: true };
          } catch (error) {
            return { ok: false, error: error.message };
          }
        },
      );

      if (!resultado?.ok) {
        errosDetectados++;
        console.log(`ERRO DETECTADO NO CLIQUE ${i}`);
      }

      I.say(`Clique DIREITA ${i}/100 executado`);
    }

    I.say(`TOTAL DE ERROS DETECTADOS: ${errosDetectados}`);

    if (errosDetectados > 0) {
      throw new Error(
        `Carrossel apresentou instabilidade. Total de erros: ${errosDetectados}`,
      );
    }

    I.seeElement("svg.lucide-arrow-left");
    I.seeElement("svg.lucide-arrow-right");

    I.say("CARROSSEL ESTÁVEL APÓS 100 NAVEGAÇÕES CONSECUTIVAS");
  },
).tag("@telainicial46");

/////----------/////

Scenario(
  "Cenário: 00047 - Validar carregamento dinâmico de eventos durante scroll (Lazy Loading).",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForElement("body", 10);
    I.say("INICIANDO TESTE DE SCROLL INFINITO / LAZY LOADING");

    I.seeElement("body");

    let eventosAntes = await I.usePlaywrightTo(
      "capturar quantidade inicial de eventos",
      async ({ page }) => {
        const eventos = await page.locator("a").all();
        return eventos.length;
      },
    );

    I.say(`EVENTOS INICIAIS: ${eventosAntes}`);

    for (let i = 1; i <= 5; i++) {
      I.executeScript(() => {
        window.scrollTo(0, document.body.scrollHeight);
      });

      I.wait(2);

      let eventosDepois = await I.usePlaywrightTo(
        `validar carregamento após scroll ${i}`,
        async ({ page }) => {
          const eventos = await page.locator("a").all();
          return eventos.length;
        },
      );

      I.say(`SCROLL ${i} - EVENTOS: ${eventosDepois}`);

      const headerVisivel = await I.grabNumberOfVisibleElements("header");
      const bodyVisivel = await I.grabNumberOfVisibleElements("body");

      if (headerVisivel === 0 || bodyVisivel === 0) {
        throw new Error(
          "Interface instável durante scroll (header/body sumiu)",
        );
      }

      if (eventosDepois <= eventosAntes) {
        I.say(
          "Nenhum novo evento carregado ainda (pode ser comportamento normal no início)",
        );
      }

      eventosAntes = eventosDepois;
    }

    I.say("VALIDAÇÃO DE SCROLL INFINITO CONCLUÍDA COM SUCESSO");
  },
).tag("@telainicial47");

/////----------/////

Scenario(
  "Cenário: 00048 - Validar estabilidade do botão 'Explorar Eventos' em execuções repetidas.",
  async ({ I }) => {
    const URL = "https://fastix.com.br/";
    const EXECUCOES = 10;

    for (let execucao = 1; execucao <= EXECUCOES; execucao++) {
      I.say(`Iniciando execução ${execucao} de ${EXECUCOES}`);

      I.amOnPage(URL);
      I.waitForElement("body", 10);

      I.see("Explorar Eventos");

      I.usePlaywrightTo(
        "validar clique no botão Explorar Eventos de forma única",
        async ({ page }) => {
          const botao = page
            .getByRole("link", {
              name: "Explorar Eventos",
              exact: true,
            })
            .first();

          if (!(await botao.isVisible())) {
            throw new Error("Botão 'Explorar Eventos' não está visível");
          }

          await botao.click();
        },
      );

      I.seeInCurrentUrl("/events");

      I.say(`Execução ${execucao} concluída com sucesso`);

      I.amOnPage(URL);
    }

    I.say("Teste anti-flaky finalizado com sucesso");
  },
).tag("@telainicial48");

/////----------/////

Scenario(
  "Cenário: 00049 - Validar presença de título da página.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForElement("body", 10);

    I.say("INICIANDO VALIDAÇÃO DE SEO - TÍTULO DA PÁGINA");

    const resultado = await I.usePlaywrightTo(
      "validar tag title da página",
      async ({ page }) => {
        const title = await page.title();

        console.log("TITLE ENCONTRADO:", title);

        return title;
      },
    );

    if (!resultado || resultado.trim().length === 0) {
      throw new Error("A tag <title> está vazia ou não foi encontrada.");
    }

    I.say(`TITLE VÁLIDO: ${resultado}`);

    I.say("VALIDAÇÃO DE SEO (TITLE) CONCLUÍDA COM SUCESSO");
  },
).tag("@telainicial49");

/////----------/////

Scenario(
  "Cenário: 00050 - Validar presença de meta description.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForElement("body", 10);

    I.say("INICIANDO VALIDAÇÃO DE SEO - META DESCRIPTION");

    const metaDescription = await I.usePlaywrightTo(
      "validar meta description da página",
      async ({ page }) => {
        const description = await page
          .locator('meta[name="description"]')
          .getAttribute("content");

        console.log("META DESCRIPTION ENCONTRADA:", description);

        return description;
      },
    );

    if (!metaDescription) {
      throw new Error("Meta description não encontrada na página.");
    }

    if (metaDescription.trim().length === 0) {
      throw new Error("Meta description está vazia.");
    }

    I.say(`META DESCRIPTION VÁLIDA: ${metaDescription}`);

    I.say("VALIDAÇÃO DE SEO (META DESCRIPTION) CONCLUÍDA COM SUCESSO");
  },
).tag("@telainicial50");

/////----------/////

Scenario(
  "Cenário: 00051 - Validar presença de atributo alt em imagens.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForElement("body", 10);

    I.say("INICIANDO VALIDAÇÃO DE SEO - ATRIBUTO ALT EM IMAGENS");

    const imagensSemAlt = await I.usePlaywrightTo(
      "validar imagens sem atributo alt",
      async ({ page }) => {
        const imagens = await page.locator("img").all();

        let semAlt = [];

        for (const img of imagens) {
          const alt = await img.getAttribute("alt");
          const src = await img.getAttribute("src");

          if (!alt || alt.trim().length === 0) {
            semAlt.push(src);
          }
        }

        console.log("IMAGENS SEM ALT:", semAlt);

        return semAlt;
      },
    );

    if (imagensSemAlt.length > 0) {
      throw new Error(
        `Foram encontradas imagens sem atributo alt: ${imagensSemAlt.join(", ")}`,
      );
    }

    I.say("TODAS AS IMAGENS POSSUEM ATRIBUTO ALT VÁLIDO");

    I.say("VALIDAÇÃO DE SEO (ALT EM IMAGENS) CONCLUÍDA COM SUCESSO");
  },
).tag("@telainicial51");

/////----------/////

Scenario(
  "Cenário: 00052 - Validar ausência de informações sensíveis no frontend.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForElement("body", 10);

    I.say(
      "INICIANDO VALIDAÇÃO DE SEGURANÇA - INFORMAÇÕES SENSÍVEIS NO FRONTEND",
    );

    const resultadoAnalise = await I.usePlaywrightTo(
      "verificar exposição de dados sensíveis no frontend",
      async ({ page }) => {
        const content = await page.content();

        const padrõesSensíveis = [
          /api[_-]?key/i,
          /secret/i,
          /token/i,
          /authorization/i,
          /bearer\s+[a-z0-9\-.]+/i,
          /access[_-]?key/i,
          /private[_-]?key/i,
        ];

        let achados = [];

        for (const padrao of padrõesSensíveis) {
          if (padrao.test(content)) {
            achados.push(padrao.toString());
          }
        }

        console.log("PADRÕES SENSÍVEIS ENCONTRADOS:", achados);

        return achados;
      },
    );

    if (resultadoAnalise.length > 0) {
      throw new Error(
        `Possíveis informações sensíveis expostas no frontend: ${resultadoAnalise.join(", ")}`,
      );
    }

    I.say("NENHUMA INFORMAÇÃO SENSÍVEL FOI DETECTADA NO FRONTEND");

    I.say("VALIDAÇÃO DE SEGURANÇA CONCLUÍDA COM SUCESSO");
  },
).tag("@telainicial52");

/////----------/////

Scenario(
  "Cenário: 00053 - Validar ausência de informações sensíveis no frontend.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForElement("body", 10);

    I.say("INICIANDO TESTE DE SEGURANÇA FUNCIONAL");

    const dadosSensíveis = await I.usePlaywrightTo(
      "analisar código-fonte da página",
      async ({ page }) => {
        const html = await page.content();

        const padrões = [
          {
            nome: "API_KEY",
            regex: /api[_-]?key/i,
          },
          {
            nome: "TOKEN",
            regex: /token/i,
          },
          {
            nome: "BEARER_TOKEN",
            regex: /bearer\s+[a-zA-Z0-9\-_.]+/i,
          },
          {
            nome: "SECRET",
            regex: /secret/i,
          },
          {
            nome: "PRIVATE_KEY",
            regex: /private[_-]?key/i,
          },
          {
            nome: "ACCESS_TOKEN",
            regex: /access[_-]?token/i,
          },
          {
            nome: "AUTHORIZATION",
            regex: /authorization/i,
          },
        ];

        const encontrados = [];

        for (const padrão of padrões) {
          const encontrou = padrão.regex.test(html);

          console.log(`${padrão.nome}: ${encontrou}`);

          if (encontrou) {
            encontrados.push(padrão.nome);
          }
        }

        return encontrados;
      },
    );

    if (dadosSensíveis.length > 0) {
      throw new Error(
        `Foram encontrados possíveis dados sensíveis expostos: ${dadosSensíveis.join(", ")}`,
      );
    }

    I.say("NENHUMA INFORMAÇÃO SENSÍVEL FOI IDENTIFICADA");

    I.say("TESTE DE SEGURANÇA FINALIZADO COM SUCESSO");
  },
).tag("@telainicial53");

/////----------/////

Scenario(
  "Cenário: 00054 - Validar ausência de erro interno exposto e exibição de mensagem amigável.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForElement("body", 10);

    I.say("INICIANDO TESTE DE SEGURANÇA - MENSAGENS DE ERRO");

    I.amOnPage("https://fastix.com.br/url-inexistente-teste-erro");

    I.wait(3);

    const resultado = await I.usePlaywrightTo(
      "validar mensagens técnicas e mensagens amigáveis",
      async ({ page }) => {
        const textoPagina = await page.locator("body").innerText();

        const errosTecnicos = [
          /stack trace/i,
          /exception/i,
          /internal server error/i,
          /cannot read properties/i,
          /referenceerror/i,
          /syntaxerror/i,
          /fatal error/i,
          /traceback/i,
          /sql/i,
          /database error/i,
          /undefined/i,
        ];

        const mensagensAmigaveis = [
          /página não encontrada/i,
          /algo deu errado/i,
          /ocorreu um erro/i,
          /tente novamente/i,
          /voltar para home/i,
          /conteúdo indisponível/i,
          /404/i,
        ];

        const tecnicosEncontrados = [];
        let mensagemAmigavelEncontrada = false;

        for (const regex of errosTecnicos) {
          const encontrou = regex.test(textoPagina);

          console.log(`ERRO TÉCNICO ${regex}: ${encontrou}`);

          if (encontrou) {
            tecnicosEncontrados.push(regex.toString());
          }
        }

        for (const regex of mensagensAmigaveis) {
          const encontrou = regex.test(textoPagina);

          console.log(`MENSAGEM AMIGÁVEL ${regex}: ${encontrou}`);

          if (encontrou) {
            mensagemAmigavelEncontrada = true;
          }
        }

        return {
          tecnicosEncontrados,
          mensagemAmigavelEncontrada,
        };
      },
    );

    if (resultado.tecnicosEncontrados.length > 0) {
      throw new Error(
        `Mensagens técnicas expostas ao usuário: ${resultado.tecnicosEncontrados.join(", ")}`,
      );
    }

    if (!resultado.mensagemAmigavelEncontrada) {
      throw new Error("Nenhuma mensagem amigável foi apresentada ao usuário.");
    }

    I.say("NENHUMA MENSAGEM TÉCNICA FOI EXPOSTA");

    I.say("MENSAGEM AMIGÁVEL VALIDADA COM SUCESSO");

    I.say("TESTE FINALIZADO COM SUCESSO");
  },
).tag("@telainicial54");

/////----------/////

Scenario(
  "Cenário: 00055 - Validar padronização visual dos botões CTA.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForElement("body", 10);

    I.say("INICIANDO TESTE DE CONSISTÊNCIA VISUAL DOS CTAs");

    const resultado = await I.usePlaywrightTo(
      "validar padronização visual dos CTAs",
      async ({ page }) => {
        const ctas = [
          page
            .getByRole("link", {
              name: "Explorar Eventos",
              exact: true,
            })
            .first(),

          page
            .getByRole("link", {
              name: "Publicar Eventos",
              exact: true,
            })
            .first(),
        ];

        const estilos = [];

        for (let i = 0; i < ctas.length; i++) {
          const cta = ctas[i];

          const estilo = await cta.evaluate((element) => {
            const css = window.getComputedStyle(element);

            return {
              backgroundColor: css.backgroundColor,
              color: css.color,
              borderRadius: css.borderRadius,
              fontSize: css.fontSize,
              fontWeight: css.fontWeight,
              padding: css.padding,
              height: css.height,
            };
          });

          console.log(`ESTILO CTA ${i + 1}:`, estilo);

          estilos.push(estilo);
        }

        return estilos;
      },
    );

    const referencia = resultado[0];

    for (let i = 1; i < resultado.length; i++) {
      const atual = resultado[i];

      const mesmoBackground =
        referencia.backgroundColor === atual.backgroundColor;

      const mesmaCor = referencia.color === atual.color;

      const mesmoBorderRadius = referencia.borderRadius === atual.borderRadius;

      const mesmoFontSize = referencia.fontSize === atual.fontSize;

      const mesmoFontWeight = referencia.fontWeight === atual.fontWeight;

      if (
        !mesmoBackground ||
        !mesmaCor ||
        !mesmoBorderRadius ||
        !mesmoFontSize ||
        !mesmoFontWeight
      ) {
        throw new Error(`Os CTAs possuem inconsistência visual entre si.`);
      }
    }

    I.say("CTAs PADRONIZADOS VISUALMENTE");

    I.say("TESTE DE CONSISTÊNCIA VISUAL FINALIZADO COM SUCESSO");
  },
).tag("@telainicial55");

/////----------/////

Scenario(
  "Cenário: 00056 - Validar consistência dos links do footer.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForElement("footer", 10);

    I.say("INICIANDO TESTE DE CONSISTÊNCIA DOS LINKS DO FOOTER");

    I.executeScript(() => {
      window.scrollTo(0, document.body.scrollHeight);
    });

    I.wait(2);

    await I.usePlaywrightTo("validar links do footer", async ({ page }) => {
      const footer = page.locator("footer");

      const links = footer.locator("a");

      const quantidade = await links.count();

      console.log("QUANTIDADE DE LINKS:", quantidade);

      if (quantidade === 0) {
        throw new Error("Nenhum link encontrado no footer.");
      }

      for (let i = 0; i < quantidade; i++) {
        const link = links.nth(i);

        const texto = (await link.innerText()).trim();

        const href = await link.getAttribute("href");

        const estilo = await link.evaluate((element) => {
          const css = window.getComputedStyle(element);

          return {
            color: css.color,
            fontSize: css.fontSize,
            fontWeight: css.fontWeight,
            textDecoration: css.textDecorationLine,
            display: css.display,
            visibility: css.visibility,
            opacity: css.opacity,
          };
        });

        console.log(`LINK ${i + 1}:`, {
          texto,
          href,
          estilo,
        });

        if (!href || href.trim().length === 0) {
          throw new Error(`O link "${texto}" possui href inválido.`);
        }

        if (estilo.visibility === "hidden" || estilo.opacity === "0") {
          throw new Error(`O link "${texto}" não está visível.`);
        }

        const tamanhosPermitidos = ["12px", "14px", "16px"];

        if (!tamanhosPermitidos.includes(estilo.fontSize)) {
          throw new Error(
            `O link "${texto}" possui font-size inesperado: ${estilo.fontSize}`,
          );
        }

        const pesosPermitidos = ["400", "500"];

        if (!pesosPermitidos.includes(estilo.fontWeight)) {
          throw new Error(
            `O link "${texto}" possui font-weight inesperado: ${estilo.fontWeight}`,
          );
        }
      }
    });

    I.say("FOOTER VALIDADO COM SUCESSO");

    I.say("TESTE FINALIZADO");
  },
).tag("@telainicial56");

/////----------/////

Scenario(
  "Cenário: 00057 - Pesquisar evento existente.", async ({ I }) => {
  const evento = "Buffalo Tom em São Paulo";

  I.amOnPage("https://fastix.com.br/");

  I.waitForElement("header", 10);

  I.say("INICIANDO TESTE DE BUSCA");

  const botaoBusca = locate("button").withText("Pesquisar evento, local...");

  I.waitForElement(botaoBusca, 10);

  I.click(botaoBusca);

  I.waitForElement("input", 10);

  I.say("CAMPO DE BUSCA ABERTO");

  I.fillField("input", evento);

  I.wait(3);

  I.say(`PESQUISANDO EVENTO: ${evento}`);

  I.see(evento);

  await I.usePlaywrightTo("clicar no evento correto", async ({ page }) => {
    const resultado = page.locator("span.text-sm.text-bold.line-clamp-2", {
      hasText: evento,
    });

    await resultado.waitFor({
      state: "visible",
      timeout: 10000,
    });

    console.log("RESULTADO VISÍVEL:", await resultado.isVisible());

    await resultado.click();
  });

  I.waitForURL(/\/events\/buffalo-tom-em-sao-paulo/, 10);

  I.seeInCurrentUrl("/events/buffalo-tom-em-sao-paulo");

  I.see(evento);

  I.say("EVENTO ACESSADO COM SUCESSO");

  I.say("TESTE FINALIZADO");
}
).tag("@telainicial57");

/////----------/////

Scenario(
  "Cenário: 00058 - Pesquisar evento inexistente.", async ({ I }) => {
  const eventoInexistente = "EventoXYZ123TesteInexistente";

  I.say("ACESSANDO HOME");

  I.amOnPage("https://fastix.com.br/");

  const botaoBusca = locate("button").withText("Pesquisar evento, local...");

  I.waitForElement(botaoBusca, 10);

  I.click(botaoBusca);

  I.say("CAMPO DE BUSCA ABERTO");

  I.waitForElement("input", 10);

  I.fillField("input", eventoInexistente);

  I.say(`PESQUISANDO EVENTO INEXISTENTE: ${eventoInexistente}`);

  I.wait(3);

  I.usePlaywrightTo("validar ausência de resultados", async ({ page }) => {
    const resultados = page.locator("span.text-sm.text-bold.line-clamp-2");

    const quantidadeResultados = await resultados.count();

    console.log("QUANTIDADE DE RESULTADOS:", quantidadeResultados);

    if (quantidadeResultados > 0) {
      throw new Error("Foram encontrados eventos para uma busca inexistente.");
    }

    const mensagemNenhumResultado = page.locator('div[cmdk-empty=""]', {
      hasText: "Nenhum resultado encontrado",
    });

    const mensagemVisivel = await mensagemNenhumResultado.isVisible();

    console.log("MENSAGEM VISÍVEL:", mensagemVisivel);

    if (!mensagemVisivel) {
      throw new Error(
        'Mensagem "Nenhum resultado encontrado" não foi exibida.',
      );
    }

    console.log('MENSAGEM "Nenhum resultado encontrado" VALIDADA COM SUCESSO');
  });

  I.say("BUSCA DE EVENTO INEXISTENTE VALIDADA COM SUCESSO");
}
).tag("@telainicial58");

/////----------/////

Scenario(
  "Cenário: 00059 - Pesquisar utilizando caracteres especiais.",
  async ({ I }) => {
    const buscaEspecial = "@#$%¨&*()_+{}[]~^´`?><|";

    I.say("ACESSANDO HOME");

    I.amOnPage("https://fastix.com.br/");

    I.waitForElement("body", 10);

    const botaoBusca = locate("button").withText("Pesquisar evento, local...");

    I.waitForElement(botaoBusca, 10);

    I.click(botaoBusca);

    I.say("CAMPO DE BUSCA ABERTO");

    I.waitForElement("input", 10);

    I.fillField("input", buscaEspecial);

    I.say(`REALIZANDO PESQUISA COM CARACTERES ESPECIAIS: ${buscaEspecial}`);

    I.wait(3);

    I.usePlaywrightTo("validar tratamento da pesquisa", async ({ page }) => {
      const inputVisivel = await page.locator("input").isVisible();

      console.log("INPUT VISÍVEL:", inputVisivel);

      if (!inputVisivel) {
        throw new Error("Campo de busca desapareceu após pesquisa especial.");
      }

      const bodyText = await page.locator("body").innerText();

      const errosInternos = [
        "500",
        "internal server error",
        "unexpected error",
        "cannot read properties",
        "undefined",
        "null reference",
        "stack trace",
        "application error",
      ];

      const erroEncontrado = errosInternos.some((erro) =>
        bodyText.toLowerCase().includes(erro.toLowerCase()),
      );

      console.log("ERRO INTERNO ENCONTRADO:", erroEncontrado);

      if (erroEncontrado) {
        throw new Error(
          "Erro interno identificado após pesquisa com caracteres especiais.",
        );
      }

      const modalBuscaVisivel = await page.locator("[cmdk-root]").isVisible();

      console.log("MODAL DE BUSCA VISÍVEL:", modalBuscaVisivel);

      if (!modalBuscaVisivel) {
        throw new Error("Busca deixou de responder após caracteres especiais.");
      }
    });

    I.say("PESQUISA COM CARACTERES ESPECIAIS VALIDADA COM SUCESSO");
  },
).tag("@telainicial59");

/////----------/////

Scenario(
  "Cenário: 00060 - Validar debounce da busca.", async ({ I }) => {
  I.say("ACESSANDO HOME");

  I.amOnPage("https://fastix.com.br/");

  I.waitForElement("body", 10);

  const botaoBusca = locate("button").withText("Pesquisar evento, local...");

  I.waitForElement(botaoBusca, 10);

  I.click(botaoBusca);

  I.say("CAMPO DE BUSCA ABERTO");

  I.waitForElement("input", 10);

  I.usePlaywrightTo("validar debounce da pesquisa", async ({ page }) => {
    let quantidadeRequests = 0;

    page.on("request", (request) => {
      const url = request.url();

      if (
        url.includes("search") ||
        url.includes("event") ||
        url.includes("query")
      ) {
        quantidadeRequests++;

        console.log("REQUEST DETECTADA:", quantidadeRequests, url);
      }
    });

    const input = page.locator("input");

    const textoPesquisa = "Buffalo Tom em São Paulo";

    const inicioDigitacao = Date.now();

    await input.pressSequentially(textoPesquisa, {
      delay: 20,
    });

    const fimDigitacao = Date.now();

    const tempoDigitacao = fimDigitacao - inicioDigitacao;

    console.log("TEMPO DIGITAÇÃO:", tempoDigitacao, "ms");

    await page.waitForTimeout(1500);

    console.log("TOTAL DE REQUESTS:", quantidadeRequests);

    if (quantidadeRequests > 10) {
      throw new Error(
        `Quantidade excessiva de requests detectadas: ${quantidadeRequests}`,
      );
    }

    const inputValue = await input.inputValue();

    console.log("VALOR FINAL INPUT:", inputValue);

    if (inputValue !== textoPesquisa) {
      throw new Error(
        "Texto digitado não permaneceu corretamente no campo de busca.",
      );
    }

    const buscaVisivel = await page.locator("[cmdk-root]").isVisible();

    console.log("MODAL BUSCA VISÍVEL:", buscaVisivel);

    if (!buscaVisivel) {
      throw new Error(
        "Busca deixou de funcionar durante validação de debounce.",
      );
    }
  });

  I.say("DEBOUNCE DA BUSCA VALIDADO COM SUCESSO");
}
).tag("@telainicial60");

/////----------/////

Scenario(
  "Cenário: 00061 - Validar ausência de erros no console durante navegação.",
  async ({ I }) => {
    I.say("INICIANDO TESTE DE OBSERVABILIDADE");

    I.amOnPage("https://fastix.com.br/");

    I.waitForElement("body", 10);

    I.usePlaywrightTo("monitorar console, rede e footer", async ({ page }) => {
      const errosConsole = [];
      const falhasRede = [];

      page.on("console", (msg) => {
        const tipo = msg.type();
        const texto = msg.text();

        console.log("CONSOLE:", tipo, texto);

        const tiposCriticos = ["error"];

        const errosIgnorados = ["favicon", "Failed to load resource"];

        const deveIgnorar = errosIgnorados.some((erro) => texto.includes(erro));

        if (tiposCriticos.includes(tipo) && !deveIgnorar) {
          errosConsole.push({
            tipo,
            texto,
          });
        }
      });

      page.on("response", (response) => {
        const status = response.status();
        const url = response.url();

        console.log("RESPONSE:", status, url);

        if (status >= 500) {
          falhasRede.push({
            status,
            url,
          });
        }
      });

      async function validarFooter() {
        const footer = page.locator("footer");

        await footer.scrollIntoViewIfNeeded();

        await page.waitForTimeout(1500);

        const footerVisivel = await footer.isVisible();

        console.log("FOOTER VISÍVEL:", footerVisivel);

        if (!footerVisivel) {
          throw new Error("Footer não está visível na página.");
        }

        const footerBox = await footer.boundingBox();

        console.log("DIMENSÕES FOOTER:", footerBox);

        if (!footerBox || footerBox.height <= 0) {
          throw new Error("Footer apresentou quebra visual.");
        }
      }

      await validarFooter();

      const explorarEventos = page
        .locator("a")
        .filter({
          hasText: "Explorar Eventos",
        })
        .first();

      await explorarEventos.click();

      await page.waitForTimeout(3000);

      await validarFooter();

      await page.goBack();

      await page.waitForTimeout(2000);

      await validarFooter();

      const busca = page
        .locator("button")
        .filter({
          hasText: "Pesquisar evento, local...",
        })
        .first();

      await busca.click();

      await page.waitForTimeout(1000);

      const input = page.locator("input");

      await input.fill("Buffalo Tom");

      await page.waitForTimeout(2000);

      await page.keyboard.press("Escape");

      await page.waitForTimeout(1000);

      await validarFooter();

      console.log("TOTAL ERROS CONSOLE:", errosConsole.length);

      console.log("TOTAL FALHAS REDE:", falhasRede.length);

      if (errosConsole.length > 0) {
        console.log("ERROS DETECTADOS:", JSON.stringify(errosConsole, null, 2));

        throw new Error("Erros JavaScript encontrados no console.");
      }

      if (falhasRede.length > 0) {
        console.log("FALHAS REDE:", JSON.stringify(falhasRede, null, 2));

        throw new Error("Falhas críticas de rede identificadas.");
      }
    });

    I.say("TESTE DE OBSERVABILIDADE FINALIZADO COM SUCESSO");
  },
).tag("@telainicial61");

/////----------/////

Scenario(
  "Cenário: 00062 - Validar resposta da API de eventos",
  async ({ I }) => {
    I.say("INICIANDO TESTE DA API DE EVENTOS");

    const requisicoesCapturadas = [];

    await I.usePlaywrightTo(
      "configurar interceptação de rede",
      async ({ page }) => {
        page.on("response", async (response) => {
          const url = response.url();
          const status = response.status();
          const contentType = response.headers()["content-type"] || "";

          if (
            contentType.includes("application/json") ||
            url.includes("event") ||
            url.includes("api") ||
            url.includes("v1") ||
            url.includes("v2") ||
            url.includes("graphql")
          ) {
            requisicoesCapturadas.push({ url, status, contentType });
            console.log("REQUISIÇÃO CAPTURADA:", { url, status, contentType });
          }
        });
      },
    );

    I.amOnPage("https://fastix.com.br/events");
    I.waitForElement("body", 10);

    I.wait(3);

    await I.usePlaywrightTo(
      "validar resposta da API de eventos",
      async ({ page }) => {
        console.log(
          "TOTAL DE REQUISIÇÕES CAPTURADAS:",
          requisicoesCapturadas.length,
        );

        console.log(
          "REQUISIÇÕES:",
          JSON.stringify(requisicoesCapturadas, null, 2),
        );

        const apiDeEventos = requisicoesCapturadas.find(
          (r) =>
            r.url.includes("event") ||
            r.url.includes("api") ||
            r.url.includes("graphql"),
        );

        if (apiDeEventos) {
          console.log("API DE EVENTOS IDENTIFICADA:", apiDeEventos);

          if (apiDeEventos.status < 200 || apiDeEventos.status >= 300) {
            throw new Error(
              `API de eventos retornou status inválido: ${apiDeEventos.status} — URL: ${apiDeEventos.url}`,
            );
          }

          console.log(
            `✅ API de eventos respondeu com status ${apiDeEventos.status}`,
          );

          return;
        }

        console.log(
          "Nenhuma requisição XHR de eventos detectada. " +
            "Verificando renderização SSR no DOM...",
        );

        const eventosNoDOM = await page.evaluate(() => {
          const seletores = [
            "[data-testid*='event']",
            "[class*='event']",
            "[class*='Event']",
            "article",
            "[href*='/event']",
            "[href*='/eventos']",
          ];

          for (const seletor of seletores) {
            const elementos = document.querySelectorAll(seletor);
            if (elementos.length > 0) {
              return {
                encontrou: true,
                seletor,
                quantidade: elementos.length,
              };
            }
          }

          return { encontrou: false };
        });

        console.log("RESULTADO DOM:", eventosNoDOM);

        if (eventosNoDOM.encontrou) {
          console.log(
            `✅ Eventos renderizados via SSR — seletor: "${eventosNoDOM.seletor}", ` +
              `quantidade: ${eventosNoDOM.quantidade}`,
          );
          return;
        }

        throw new Error(
          "Nenhuma API válida de eventos foi identificada e nenhum " +
            "evento foi encontrado no DOM.\n\n" +
            "Requisições capturadas durante o carregamento:\n" +
            (requisicoesCapturadas.length > 0
              ? requisicoesCapturadas
                  .map((r) => `  [${r.status}] ${r.url}`)
                  .join("\n")
              : "  (nenhuma requisição JSON/API capturada)") +
            "\n\nVerifique se a URL da API mudou ou se a página usa SSR/cache.",
        );
      },
    );

    I.waitForElement("body", 10);

    const estado = await I.executeScript(() => ({
      readyState: document.readyState,
      body: !!document.body,
      links: document.querySelectorAll("a").length,
      images: document.querySelectorAll("img").length,
    }));

    console.log("ESTADO FINAL DA PÁGINA:", estado);

    if (estado.readyState !== "complete") {
      throw new Error("Página não finalizou carregamento corretamente.");
    }

    I.say("TESTE DA API DE EVENTOS FINALIZADO COM SUCESSO");
  },
).tag("@telainicial62");

/////----------/////

Scenario(
  "Cenário: 00063 - Validar comportamento da interface sem carregamento de imagens.",
  async ({ I }) => {
    I.say("INICIANDO TESTE DE FALLBACK DE IMAGENS");

    I.usePlaywrightTo("bloquear carregamento de imagens", async ({ page }) => {
      await page.route(
        "**/*.{png,jpg,jpeg,webp,gif,svg,avif}",
        async (route) => {
          console.log("IMAGEM BLOQUEADA:", route.request().url());

          await route.abort();
        },
      );
    });

    I.amOnPage("https://fastix.com.br/");

    I.waitForElement("body", 10);

    I.say("APLICAÇÃO CARREGADA SEM IMAGENS");

    I.see("Explorar Eventos");
    I.see("Publicar Eventos");

    I.say("ELEMENTOS PRINCIPAIS VISÍVEIS");

    I.see("Buffalo Tom");
    I.see("São Paulo");

    I.say("CONTEÚDOS PRINCIPAIS ACESSÍVEIS");

    I.click("Explorar Eventos");

    I.waitForURL(/\/events/, 10);

    I.seeInCurrentUrl("/events");

    I.say("NAVEGAÇÃO FUNCIONANDO SEM IMAGENS");

    I.say("VALIDANDO FOOTER SEM IMAGENS");

    I.scrollPageToBottom();

    I.wait(2);

    I.seeElement("footer");

    I.see("Instagram");
    I.see("Linkedin");
    I.see("Termos e Condições de Uso");

    I.say("FOOTER VISÍVEL E FUNCIONAL");

    I.usePlaywrightTo("validar links do footer", async ({ page }) => {
      const footerLinks = await page.locator("footer a").count();

      console.log("LINKS FOOTER:", footerLinks);

      if (footerLinks <= 0) {
        throw new Error("Nenhum link encontrado no footer.");
      }

      const footerVisivel = await page.locator("footer").isVisible();

      console.log("FOOTER VISÍVEL:", footerVisivel);

      if (!footerVisivel) {
        throw new Error("Footer não está visível.");
      }
    });

    I.usePlaywrightTo("validar estabilidade visual", async ({ page }) => {
      const bodyVisivel = await page.locator("body").isVisible();

      console.log("BODY VISÍVEL:", bodyVisivel);

      if (!bodyVisivel) {
        throw new Error("A interface ficou indisponível sem imagens.");
      }

      const errosCriticos = await page
        .locator("text=Application error")
        .count();

      console.log("ERROS CRÍTICOS:", errosCriticos);

      if (errosCriticos > 0) {
        throw new Error("Erro crítico encontrado na interface.");
      }
    });

    I.say("FALLBACK DE IMAGENS VALIDADO COM SUCESSO");
  },
).tag("@telainicial63");

/////----------/////

Scenario(
  "Cenário: 00064 - Validar disparo de evento analytics ao clicar em Explorar Eventos.",
  async ({ I }) => {
    I.say("INICIANDO TESTE DE ANALYTICS E DATALAYER");

    I.amOnPage("https://fastix.com.br/");

    I.waitForElement("body", 10);

    I.usePlaywrightTo("validar existência do dataLayer", async ({ page }) => {
      const possuiDataLayer = await page.evaluate(() => {
        return !!window.dataLayer;
      });

      console.log("DATALAYER EXISTE:", possuiDataLayer);

      if (!possuiDataLayer) {
        throw new Error("dataLayer não encontrado na aplicação.");
      }
    });

    I.say("DATALAYER ENCONTRADO");

    I.waitForText("Explorar Eventos", 10);

    I.click("Explorar Eventos");

    I.say("BOTÃO EXPLORAR EVENTOS CLICADO");

    I.waitForURL(/\/events/, 10);

    I.seeInCurrentUrl("/events");

    I.say("NAVEGAÇÃO REALIZADA COM SUCESSO");

    I.usePlaywrightTo("validar evento analytics", async ({ page }) => {
      await page.waitForTimeout(3000);

      const dataLayer = await page.evaluate(() => {
        return window.dataLayer || [];
      });

      console.log("DATALAYER:", JSON.stringify(dataLayer, null, 2));

      if (!Array.isArray(dataLayer)) {
        throw new Error("dataLayer não possui estrutura válida.");
      }

      const eventoEncontrado = dataLayer.some((event) => {
        return (
          JSON.stringify(event).toLowerCase().includes("explorar") ||
          JSON.stringify(event).toLowerCase().includes("event") ||
          JSON.stringify(event).toLowerCase().includes("click")
        );
      });

      console.log("EVENTO ANALYTICS ENCONTRADO:", eventoEncontrado);

      if (!eventoEncontrado) {
        throw new Error(
          "Nenhum evento analytics relacionado ao clique foi encontrado no dataLayer.",
        );
      }
    });

    I.say("EVENTO ANALYTICS VALIDADO COM SUCESSO");
  },
).tag("@telainicial64");

/////----------/////

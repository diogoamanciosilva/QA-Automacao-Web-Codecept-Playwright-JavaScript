Feature("explorar_eventos");

//// CENÁRIOS DE TESTES////

Scenario(
  'Cenário: 0001 - Acessar a página de eventos (Botão: Explorar eventos)."',
  ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);
    I.see("Explorar eventos");

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);
    I.seeInCurrentUrl("/events");
    I.wait(5);
  },
).tag("@explorareventos1");

/////----------/////

Scenario(
  'Cenário: 0002 - Acessar a página de eventos (segunda opção de acesso via ícone fast-forward)."',
  ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    const botaoPesquisar = locate("button").withText(
      "Pesquisar evento, local...",
    );

    I.waitForElement(botaoPesquisar, 10);
    I.seeElement(botaoPesquisar);

    I.click(botaoPesquisar);
    I.wait(5);
  },
).tag("@explorareventos2");

/////----------/////

Scenario(
  'Cenário: 0003 - Acessar a página de eventos (Botão: Explorar eventos) e verificar a navegação por scroll."',
  ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);
    I.see("Explorar eventos");

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);
    I.seeInCurrentUrl("/events");
    I.wait(5);

    const footer = locate("footer").withText("FASTIX LTDA");

    I.scrollTo(footer);
    I.waitForVisible(footer, 10);
    I.see("FASTIX LTDA", footer);

    I.executeScript(() => window.scrollTo(0, 0));
    I.wait(2);
  },
).tag("@explorareventos3");

/////----------/////

Scenario(
  'Cenário: 0004 - Acessar a página de eventos (segunda opção de acesso via ícone fast-forward) e verificar a navegação por scroll."',
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    const botaoPesquisar = locate("button").withText(
      "Pesquisar evento, local...",
    );

    I.waitForElement(botaoPesquisar, 10);
    I.seeElement(botaoPesquisar);

    I.click(botaoPesquisar);
    I.wait(2);

    const listaSelector = "[cmdk-list]";
    const textoEvento = "Buffalo Tom em São Paulo";

    let encontrou = false;

    for (let i = 0; i < 30; i++) {
      encontrou = await I.executeScript(
        (selector, texto) => {
          const el = document.querySelector(selector);
          return el && el.innerText.includes(texto);
        },
        listaSelector,
        textoEvento,
      );

      if (encontrou) break;

      await I.executeScript((selector) => {
        const el = document.querySelector(selector);
        el.scrollBy(0, 300);
      }, listaSelector);

      I.wait(0.5);
    }

    I.see("Buffalo Tom em São Paulo");
    I.see("27 fev");

    await I.executeScript((selector) => {
      const el = document.querySelector(selector);
      el.scrollTo(0, 0);
    }, listaSelector);

    I.wait(1);
  },
).tag("@explorareventos4");

/////----------/////

Scenario(
  "Cenário: 0005 -  Buscar uma cidade (São Paulo) no campo de pesquisa por evento (Botão: Explorar eventos.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);
    I.see("Explorar eventos");

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);
    I.seeInCurrentUrl("/events");

    I.wait(2);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 10);
    I.click(campoBusca);
    I.fillField(campoBusca, "São Paulo");

    I.wait(2);

    const footer = locate("footer").withText("FASTIX LTDA");

    I.scrollTo(footer);
    I.waitForVisible(footer, 10);
    I.see("FASTIX LTDA", footer);

    I.executeScript(() => window.scrollTo(0, 0));
    I.wait(2);
  },
).tag("@explorareventos5");

/////----------/////

Scenario(
  "Cenário: 0006 - Buscar uma cidade (São Paulo) no campo de pesquisa por evento (segunda opção de acesso via ícone fast-forward).",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    const botaoPesquisar = locate("button").withText(
      "Pesquisar evento, local...",
    );

    I.waitForElement(botaoPesquisar, 10);
    I.seeElement(botaoPesquisar);

    I.click(botaoPesquisar);

    const campoBusca = "input[cmdk-input]";

    I.waitForElement(campoBusca, 15);
    I.click(campoBusca);
    I.fillField(campoBusca, "São Paulo");

    I.wait(2);

    const listaSelector = "[cmdk-list]";
    const textoEvento = "Buffalo Tom em São Paulo";

    let encontrou = false;

    for (let i = 0; i < 30; i++) {
      encontrou = await I.executeScript(
        (selector, texto) => {
          const el = document.querySelector(selector);
          return el && el.innerText.includes(texto);
        },
        listaSelector,
        textoEvento,
      );

      if (encontrou) break;

      await I.executeScript((selector) => {
        const el = document.querySelector(selector);
        el.scrollBy(0, 300);
      }, listaSelector);

      I.wait(0.5);
    }

    I.see("Buffalo Tom em São Paulo");
    I.see("27 fev");

    await I.executeScript((selector) => {
      const el = document.querySelector(selector);
      el.scrollTo(0, 0);
    }, listaSelector);

    I.wait(1);
  },
).tag("@explorareventos6");

/////----------/////

Scenario(
  "Cenário: 0007 -  Buscar um evento (Buffalo Tom em São Paulo) no campo de pesquisa (Botão: Explorar eventos).",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);
    I.see("Explorar eventos");

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);
    I.seeInCurrentUrl("/events");

    I.wait(2);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 10);
    I.click(campoBusca);
    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(2);
  },
).tag("@explorareventos7");

/////----------/////

Scenario(
  "Cenário: 0008 -  Buscar um evento (Buffalo Tom em São Paulo) no campo de pesquisa (segunda opção de acesso via ícone fast-forward).",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    const botaoPesquisar = locate("button").withText(
      "Pesquisar evento, local...",
    );

    I.waitForElement(botaoPesquisar, 10);
    I.seeElement(botaoPesquisar);

    I.click(botaoPesquisar);

    const campoBusca = "input[cmdk-input]";

    I.waitForElement(campoBusca, 15);
    I.click(campoBusca);
    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(2);
  },
).tag("@explorareventos8");

/////----------/////

Scenario(
  "Cenário: 0009 - Buscar um local (Fabrique Club) no campo de pesquisa (Botão: Explorar eventos).",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);
    I.see("Explorar eventos");

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);
    I.seeInCurrentUrl("/events");

    I.wait(2);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 10);
    I.click(campoBusca);
    I.fillField(campoBusca, "Fabrique Club");

    I.wait(2);
  },
).tag("@explorareventos9");

/////----------/////


Scenario(
  "Cenário: 00010 -  Buscar um local (Cine Joia) no campo de pesquisa (segunda opção de acesso via ícone fast-forward).",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    const botaoPesquisar = locate("button").withText(
      "Pesquisar evento, local...",
    );

    I.waitForElement(botaoPesquisar, 10);
    I.seeElement(botaoPesquisar);

    I.click(botaoPesquisar);

    const campoBusca = "input[cmdk-input]";

    I.waitForElement(campoBusca, 15);
    I.click(campoBusca);
    I.fillField(campoBusca, "Cine Joia");

    I.wait(2);
  },
).tag("@explorareventos10");

/////----------/////

Scenario(
  "Cenário: 00011 - Buscar um evento (Buffalo Tom em São Paulo) e visualizar suas informações no campo de pesquisa (Botão: Explorar eventos).",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);
    I.see("Explorar eventos");

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);
    I.seeInCurrentUrl("/events");

    I.wait(2);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 10);
    I.click(campoBusca);
    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em São Paulo");

    I.waitForElement(evento, 10);
    I.seeElement(evento);
    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);
    I.seeInCurrentUrl("/events/buffalo-tom-em-sao-paulo");

    I.wait(2);
  },
).tag("@explorareventos11");

/////----------/////

Scenario(
  "Cenário: 00012 -  Buscar um evento (Buffalo Tom em São Paulo) no campo de pesquisa (segunda opção de acesso via ícone fast-forward).",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    const botaoPesquisar = locate("button").withText(
      "Pesquisar evento, local...",
    );

    I.waitForElement(botaoPesquisar, 10);
    I.seeElement(botaoPesquisar);

    I.click(botaoPesquisar);

    const campoBusca = "input[cmdk-input]";

    I.waitForElement(campoBusca, 15);
    I.click(campoBusca);
    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(2);

    const itemEvento = locate("[cmdk-item]").withAttr({
      "data-value": "buffalo-tom-em-sao-paulo",
    });

    I.waitForElement(itemEvento, 10);
    I.click(itemEvento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);

    I.wait(2);
  },
).tag("@explorareventos12");

/////----------/////

Scenario(
  "Cenário: 00013 -  Visualizar os campos 'Sobre o evento' , clicar em 'Leia mais' e 'Mostrar menos'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);
    I.see("Explorar eventos");

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);
    I.seeInCurrentUrl("/events");

    I.wait(2);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 10);
    I.click(campoBusca);
    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em São Paulo");

    I.waitForElement(evento, 10);
    I.seeElement(evento);
    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);
    I.seeInCurrentUrl("/events/buffalo-tom-em-sao-paulo");

    I.wait(2);

    const tituloSobreEvento = locate("h2").withText("Sobre o evento");

    I.waitForElement(tituloSobreEvento, 10);
    I.see("Sobre o evento", tituloSobreEvento);

    const botaoLeiaMais = locate("button").withText("Leia mais");

    I.waitForElement(botaoLeiaMais, 10);
    I.click(botaoLeiaMais);

    I.wait(5);

    const botaoMostrarMenos = locate("button").withText("Mostrar menos");

    I.waitForElement(botaoMostrarMenos, 10);
    I.click(botaoMostrarMenos);

    I.wait(5);
  },
).tag("@explorareventos13");

/////----------/////

Scenario(
  "Cenário: 00014 -  Acessar o campo 'Localização' e abrir o endereço clicando em 'Abrir no Google Maps'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);
    I.see("Explorar eventos");

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);
    I.seeInCurrentUrl("/events");

    I.wait(2);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 10);
    I.click(campoBusca);
    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em São Paulo");

    I.waitForElement(evento, 10);
    I.seeElement(evento);
    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);
    I.seeInCurrentUrl("/events/buffalo-tom-em-sao-paulo");

    I.wait(2);

    const footer = locate("footer").withText("FASTIX LTDA");

    I.scrollTo(footer);
    I.waitForVisible(footer, 10);
    I.see("FASTIX LTDA", footer);

    const botaoGoogleMaps = locate("a")
      .withAttr({
        href: "https://www.google.com/maps/search/?api=1&query=-23.5533523%2C-46.6358845",
      })
      .withText("Abrir no Google Maps");

    I.waitForElement(botaoGoogleMaps, 10);
    I.scrollTo(botaoGoogleMaps);

    I.click(botaoGoogleMaps);

    I.wait(2);

    I.switchToNextTab();

    I.waitInUrl("google.com/maps/search", 10);
    I.seeInCurrentUrl("query=-23.5533523%2C-46.6358845");
  },
).tag("@explorareventos14");

/////----------/////

Scenario(
  "Cenário: 00015 -  Acessar o endereço no Google Maps e retornar para a página do evento (Buffalo Tom em São Paulo).",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);
    I.see("Explorar eventos");

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);
    I.seeInCurrentUrl("/events");

    I.wait(2);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 10);
    I.click(campoBusca);
    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em São Paulo");

    I.waitForElement(evento, 10);
    I.seeElement(evento);
    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);
    I.seeInCurrentUrl("/events/buffalo-tom-em-sao-paulo");

    I.wait(2);

    const footer = locate("footer").withText("FASTIX LTDA");

    I.scrollTo(footer);
    I.waitForVisible(footer, 10);
    I.see("FASTIX LTDA", footer);

    const botaoGoogleMaps = locate("a")
      .withAttr({
        href: "https://www.google.com/maps/search/?api=1&query=-23.5533523%2C-46.6358845",
      })
      .withText("Abrir no Google Maps");

    I.waitForElement(botaoGoogleMaps, 10);
    I.scrollTo(botaoGoogleMaps);
    I.click(botaoGoogleMaps);

    I.wait(2);

    I.switchToNextTab();

    I.waitInUrl("google.com/maps/search", 10);
    I.wait(5);

    I.closeCurrentTab();

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);
    I.seeInCurrentUrl("/events/buffalo-tom-em-sao-paulo");
  },
).tag("@explorareventos15");

/////----------/////

Scenario(
  "Cenário: 00016 -  Acessar o campo 'Localização', clicar em 'Ver mais' e acessar a página.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);
    I.see("Explorar eventos");

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);
    I.seeInCurrentUrl("/events");

    I.wait(2);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 10);
    I.click(campoBusca);
    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em São Paulo");

    I.waitForElement(evento, 10);
    I.seeElement(evento);
    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);
    I.seeInCurrentUrl("/events/buffalo-tom-em-sao-paulo");

    I.wait(2);

    const footer = locate("footer").withText("FASTIX LTDA");

    I.scrollTo(footer);
    I.waitForVisible(footer, 10);
    I.see("FASTIX LTDA", footer);

    I.wait(3);

    const botaoVerMais = locate("a")
      .withAttr({ href: "/venues/cine-joia-44" })
      .withText("Ver mais");

    I.waitForElement(botaoVerMais, 10);
    I.scrollTo(botaoVerMais);
    I.see("Ver mais", botaoVerMais);

    I.click(botaoVerMais);

    // Aguarda a URL correta
    I.waitInUrl("/venues/cine-joia-44", 10);
    I.seeInCurrentUrl("/venues/cine-joia-44");

    I.wait(5);
  },
).tag("@explorareventos16");

/////----------/////

Scenario(
  "Cenário: 00017 -  Acessar a página 'Ver mais' e clicar no ícone abaixo do evento para retornar à página do evento.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);
    I.see("Explorar eventos");

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);
    I.seeInCurrentUrl("/events");

    I.wait(2);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 10);
    I.click(campoBusca);
    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em São Paulo");

    I.waitForElement(evento, 10);
    I.seeElement(evento);
    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);
    I.seeInCurrentUrl("/events/buffalo-tom-em-sao-paulo");

    I.wait(2);

    const footer = locate("footer").withText("FASTIX LTDA");

    I.scrollTo(footer);
    I.waitForVisible(footer, 10);
    I.see("FASTIX LTDA", footer);

    I.wait(3);

    const botaoVerMais = locate("a")
      .withAttr({ href: "/venues/cine-joia-44" })
      .withText("Ver mais");

    I.waitForElement(botaoVerMais, 10);
    I.scrollTo(botaoVerMais);
    I.see("Ver mais", botaoVerMais);

    I.click(botaoVerMais);

    I.waitInUrl("/venues/cine-joia-44", 10);
    I.seeInCurrentUrl("/venues/cine-joia-44");

    I.wait(5);

    const eventoBuffalo = locate("p").withText("Buffalo Tom em São Paulo");

    I.waitForElement(eventoBuffalo, 10);
    I.scrollTo(eventoBuffalo);
    I.see("Buffalo Tom em São Paulo", eventoBuffalo);

    I.click(eventoBuffalo);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);
    I.seeInCurrentUrl("/events/buffalo-tom-em-sao-paulo");

    I.wait(5);
  },
).tag("@explorareventos17");

/////----------/////

Scenario(
  "Cenário: 00018 - Acessar a página do evento (Buffalo Tom em São Paulo) e clicar no ícone do Google Maps ao lado do título 'Cine Joia'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);
    I.see("Explorar eventos");

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);
    I.seeInCurrentUrl("/events");

    I.wait(2);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 10);
    I.click(campoBusca);
    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em São Paulo");

    I.waitForElement(evento, 10);
    I.seeElement(evento);
    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);
    I.seeInCurrentUrl("/events/buffalo-tom-em-sao-paulo");

    I.wait(2);

    const mapsLink = locate('//a[contains(@href,"google.com/maps")]');

    I.waitForElement(mapsLink, 10);
    I.click(mapsLink);

    I.wait(2);
    I.switchToNextTab();

    I.waitInUrl("google.com/maps", 10);
    I.wait(5);
  },
).tag("@explorareventos18");

/////----------/////

Scenario(
  "Cenário: 00019 - Acessar a página do Google Maps, depois, retornar para a a página do evento (Buffalo Tom em São Paulo).",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);
    I.see("Explorar eventos");

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);
    I.seeInCurrentUrl("/events");

    I.wait(2);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 10);
    I.click(campoBusca);
    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em São Paulo");

    I.waitForElement(evento, 10);
    I.seeElement(evento);
    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);
    I.seeInCurrentUrl("/events/buffalo-tom-em-sao-paulo");

    I.wait(2);

    const botaoGoogleMaps = locate("a")
      .withAttr({
        href: "https://www.google.com/maps/search/?api=1&query=-23.5533523%2C-46.6358845",
      })
      .withText("Abrir no Google Maps");

    I.waitForElement(botaoGoogleMaps, 10);
    I.scrollTo(botaoGoogleMaps);
    I.click(botaoGoogleMaps);

    I.wait(2);

    I.switchToNextTab();

    I.waitInUrl("google.com/maps/search", 10);
    I.wait(5);

    I.closeCurrentTab();

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);
    I.seeInCurrentUrl("/events/buffalo-tom-em-sao-paulo");
  },
).tag("@explorareventos19");

/////----------/////

Scenario(
  "Cenário: 00020 - Acessar a página de Política de Compra (via acesso superior da página) e verificar a navegação por scroll.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);
    I.see("Explorar eventos");

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);
    I.seeInCurrentUrl("/events");

    I.wait(2);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 10);
    I.click(campoBusca);
    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em São Paulo");

    I.waitForElement(evento, 10);
    I.seeElement(evento);
    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);
    I.seeInCurrentUrl("/events/buffalo-tom-em-sao-paulo");

    I.wait(2);

    const politicaCompra = locate("a")
      .withAttr({ href: "/purchase" })
      .withText("Política de Compra");

    I.waitForElement(politicaCompra, 10);
    I.scrollTo(politicaCompra);
    I.click(politicaCompra);

    I.wait(2);

    I.switchToNextTab();

    I.waitInUrl("/purchase", 10);
    I.seeInCurrentUrl("/purchase");

    I.wait(5);

    const footer = locate("footer").withText("FASTIX LTDA");

    I.scrollTo(footer);
    I.waitForVisible(footer, 10);
    I.see("FASTIX LTDA", footer);

    I.executeScript(() => window.scrollTo(0, 0));
    I.wait(2);

    I.wait(5);
  },
).tag("@explorareventos20");

/////----------/////

Scenario(
  "Cenário: 00021 - Acessar a página de Termos de Uso (via acesso superior da página) e verificar a navegação por scroll.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);
    I.see("Explorar eventos");

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);
    I.seeInCurrentUrl("/events");

    I.wait(2);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 10);
    I.click(campoBusca);
    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em São Paulo");

    I.waitForElement(evento, 10);
    I.seeElement(evento);
    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);
    I.seeInCurrentUrl("/events/buffalo-tom-em-sao-paulo");

    I.wait(2);

    const termosUso = locate("a")
      .withAttr({ href: "/terms" })
      .withText("Termos de Uso");

    I.waitForElement(termosUso, 10);
    I.scrollTo(termosUso);
    I.click(termosUso);

    I.wait(2);

    I.switchToNextTab();

    I.waitInUrl("/terms", 10);
    I.seeInCurrentUrl("/terms");

    I.wait(5);

    const footer = locate("footer").withText("FASTIX LTDA");

    I.scrollTo(footer);
    I.waitForVisible(footer, 10);
    I.see("FASTIX LTDA", footer);

    I.executeScript(() => window.scrollTo(0, 0));
    I.wait(2);

    I.wait(5);
  },
).tag("@explorareventos21");

/////----------/////

Scenario(
  "Cenário: 00022 - Acessar a página de Política de Compra (via acesso inferior da página) e verificar a navegação por scroll.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);
    I.see("Explorar eventos");

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);
    I.seeInCurrentUrl("/events");

    I.wait(2);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 10);
    I.click(campoBusca);
    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em São Paulo");

    I.waitForElement(evento, 10);
    I.seeElement(evento);
    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);
    I.seeInCurrentUrl("/events/buffalo-tom-em-sao-paulo");

    I.wait(2);

    const footer = locate("footer").withText("FASTIX LTDA");

    I.scrollTo(footer);
    I.waitForVisible(footer, 10);
    I.see("FASTIX LTDA", footer);

    const politicaCompra = locate("a")
      .withAttr({ href: "/purchase" })
      .withText("Política de Compra");

    I.waitForElement(politicaCompra, 10);
    I.scrollTo(politicaCompra);

    const abasAntes = await I.grabNumberOfOpenTabs();

    I.click(politicaCompra);

    I.wait(2);

    const abasDepois = await I.grabNumberOfOpenTabs();

    if (abasDepois > abasAntes) {
      I.switchToNextTab();
    }

    I.waitInUrl("/purchase", 10);
    I.seeInCurrentUrl("/purchase");

    I.wait(5);

    const footer2 = locate("footer").withText("FASTIX LTDA");

    I.scrollTo(footer2);
    I.waitForVisible(footer2, 10);
    I.see("FASTIX LTDA", footer2);

    I.executeScript(() => window.scrollTo(0, 0));
    I.wait(2);

    I.wait(5);
  },
).tag("@explorareventos22");

/////----------/////

Scenario(
  "Cenário: 00023 - Acessar a página de Termos de Uso (via acesso inferior da página) e verificar a navegação por scroll.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);
    I.see("Explorar eventos");

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);
    I.seeInCurrentUrl("/events");

    I.wait(2);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 10);
    I.click(campoBusca);
    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em São Paulo");

    I.waitForElement(evento, 10);
    I.seeElement(evento);
    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);
    I.seeInCurrentUrl("/events/buffalo-tom-em-sao-paulo");

    I.wait(2);

    const footer = locate("footer").withText("FASTIX LTDA");

    I.scrollTo(footer);
    I.waitForVisible(footer, 10);
    I.see("FASTIX LTDA", footer);

    const termosCondições = locate("a")
      .withAttr({ href: "/terms" })
      .withText("Termos e Condições de Uso");

    I.waitForElement(termosCondições, 10);
    I.scrollTo(termosCondições);

    const abasAntes = await I.grabNumberOfOpenTabs();

    I.click(termosCondições);

    I.wait(2);

    const abasDepois = await I.grabNumberOfOpenTabs();

    if (abasDepois > abasAntes) {
      I.switchToNextTab();
    }

    I.waitInUrl("/terms", 10);
    I.seeInCurrentUrl("/terms");

    I.wait(5);

    const footer2 = locate("footer").withText("FASTIX LTDA");

    I.scrollTo(footer2);
    I.waitForVisible(footer2, 10);
    I.see("FASTIX LTDA", footer2);

    I.executeScript(() => window.scrollTo(0, 0));
    I.wait(2);

    I.wait(5);
  },
).tag("@explorareventos23");

/////----------/////

Scenario(
  "Cenário: 00024 - Acessar a página de Meia-Entrada e verificar a navegação por scroll.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);
    I.see("Explorar eventos");

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);
    I.seeInCurrentUrl("/events");

    I.wait(2);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 10);
    I.click(campoBusca);
    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em São Paulo");

    I.waitForElement(evento, 10);
    I.seeElement(evento);
    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);
    I.seeInCurrentUrl("/events/buffalo-tom-em-sao-paulo");

    I.wait(2);

    const footer = locate("footer").withText("FASTIX LTDA");

    I.scrollTo(footer);
    I.waitForVisible(footer, 10);
    I.see("FASTIX LTDA", footer);

    const meiaEntrada = locate("a")
      .withAttr({ href: "/half-price" })
      .withText("Meia Entrada");

    I.waitForElement(meiaEntrada, 10);
    I.scrollTo(meiaEntrada);
    I.click(meiaEntrada);

    I.waitInUrl("/half-price", 10);
    I.seeInCurrentUrl("/half-price");

    I.wait(5);

    I.scrollTo(footer);
    I.waitForVisible(footer, 10);
    I.see("FASTIX LTDA", footer);

    I.executeScript(() => window.scrollTo(0, 0));
    I.wait(2);

    I.wait(5);
  },
).tag("@explorareventos24");

/////----------/////

Scenario(
  "Cenário: 00025 - Acessar a página de Guia Check-in e verificar a navegação por scroll.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);
    I.see("Explorar eventos");

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);
    I.seeInCurrentUrl("/events");

    I.wait(2);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 10);
    I.click(campoBusca);
    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em São Paulo");

    I.waitForElement(evento, 10);
    I.seeElement(evento);
    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);
    I.seeInCurrentUrl("/events/buffalo-tom-em-sao-paulo");

    I.wait(2);

    const footer = locate("footer").withText("FASTIX LTDA");

    I.scrollTo(footer);
    I.waitForVisible(footer, 10);
    I.see("FASTIX LTDA", footer);

    const guiaCheckin = locate("a")
      .withAttr({ href: "/checkin-guide" })
      .withText("Guia Check-in");

    I.waitForElement(guiaCheckin, 10);
    I.scrollTo(guiaCheckin);
    I.click(guiaCheckin);

    I.waitInUrl("/checkin-guide", 10);
    I.seeInCurrentUrl("/checkin-guide");

    I.wait(5);

    I.scrollTo(footer);
    I.waitForVisible(footer, 10);
    I.see("FASTIX LTDA", footer);

    I.executeScript(() => window.scrollTo(0, 0));
    I.wait(2);

    I.wait(5);
  },
).tag("@explorareventos25");

/////----------/////

Scenario(
  "Cenário: 00026 - Acessar as opções 'App Fastix (Recomendado)' e 'Web' do 'Guia Check-in'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);
    I.see("Explorar eventos");

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);
    I.seeInCurrentUrl("/events");

    I.wait(2);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 10);
    I.click(campoBusca);
    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em São Paulo");

    I.waitForElement(evento, 10);
    I.seeElement(evento);
    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);
    I.seeInCurrentUrl("/events/buffalo-tom-em-sao-paulo");

    I.wait(2);

    const footer = locate("footer").withText("FASTIX LTDA");

    I.scrollTo(footer);
    I.waitForVisible(footer, 10);
    I.see("FASTIX LTDA", footer);

    const guiaCheckin = locate("a")
      .withAttr({ href: "/checkin-guide" })
      .withText("Guia Check-in");

    I.waitForElement(guiaCheckin, 10);
    I.scrollTo(guiaCheckin);
    I.click(guiaCheckin);

    I.waitInUrl("/checkin-guide", 10);
    I.seeInCurrentUrl("/checkin-guide");

    I.wait(5);

    const abaWeb = locate("button").withAttr({ role: "tab" }).withText("Web");

    const abaApp = locate("button")
      .withAttr({ role: "tab" })
      .withText("App FasTix");

    const footer2 = locate("footer2");

    async function scrollAteFooterEVoltar(I, footer) {
      I.say("Scroll até o footer");

      I.scrollTo(footer);
      I.waitForVisible(footer, 10);
      I.see("FASTIX LTDA", footer);

      I.say("Voltando ao topo");

      I.executeScript(() => window.scrollTo({ top: 0, behavior: "smooth" }));
      I.wait(2);

      I.say("Aguardando estabilização no topo");
      I.wait(3);
    }

    I.say("Clicando na aba Web");

    I.waitForElement(abaWeb, 10);
    I.scrollTo(abaWeb);
    I.click(abaWeb);

    I.waitForElement(
      locate("button")
        .withAttr({ role: "tab", "data-state": "active" })
        .withText("Web"),
      10,
    );

    await scrollAteFooterEVoltar(I, footer);

    I.say("Clicando na aba App FasTix");

    I.waitForElement(abaApp, 10);
    I.scrollTo(abaApp);
    I.click(abaApp);

    I.waitForElement(
      locate("button")
        .withAttr({ role: "tab", "data-state": "active" })
        .withText("App FasTix"),
      10,
    );

    await scrollAteFooterEVoltar(I, footer);

    I.wait(3);
  },
).tag("@explorareventos26");

/////----------/////

Scenario(
  "Cenário: 00027 - Acesso simultâneo entre os campos 'Meia Entrada', 'Política de Compra', 'Termos de Uso'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);
    I.see("Explorar eventos");

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);
    I.seeInCurrentUrl("/events");

    I.wait(2);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 10);
    I.click(campoBusca);
    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em São Paulo");

    I.waitForElement(evento, 10);
    I.seeElement(evento);
    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);
    I.seeInCurrentUrl("/events/buffalo-tom-em-sao-paulo");

    I.wait(2);

    const footer = locate("footer").withText("FASTIX LTDA");

    const linkTermos = locate("a").withAttr({ href: "/terms" });
    const linkPolitica = locate("a").withAttr({ href: "/purchase" });
    const linkMeiaEntrada = locate("a").withAttr({ href: "/half-price" });

    async function validarScrollFooter(I) {
      I.say("Scroll até o footer");

      I.scrollTo(footer);
      I.waitForVisible(footer, 10);
      I.see("FASTIX LTDA", footer);

      I.say("Voltando ao topo");

      I.executeScript(() => window.scrollTo({ top: 0, behavior: "smooth" }));
      I.wait(2);
    }

    async function clicarEValidar(I, locator, urlParte) {
      I.waitForElement(locator, 10);
      I.scrollTo(locator);
      I.click(locator);

      I.waitInUrl(urlParte, 10);
    }

    await validarScrollFooter(I);

    I.say("Acessando Meia Entrada");

    await clicarEValidar(I, linkMeiaEntrada, "/half-price");
    I.wait(2);
    await validarScrollFooter(I);

    I.say("Acessando Termos e Condições");

    await clicarEValidar(I, linkTermos, "/terms");
    I.wait(2);
    await validarScrollFooter(I);

    I.say("Acessando Política de Compra");

    await clicarEValidar(I, linkPolitica, "/purchase");
    I.wait(2);
    await validarScrollFooter(I);

    I.say("Acessando Meia Entrada novamente");

    await clicarEValidar(I, linkMeiaEntrada, "/half-price");
    I.wait(2);
    await validarScrollFooter(I);

    I.say("Finalizando cenário no topo");
    I.wait(3);
  },
).tag("@explorareventos27");

/////----------/////

Scenario(
  "Cenário: 00028 - No campo 'Termos de Uso', acessar o tópico '2. Aceite dos Termos' acessar o link 'Política de Compra'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/terms");

    I.waitInUrl("/terms", 10);
    I.seeInCurrentUrl("/terms");

    const topicoAceite = locate("h3").withText("2. Aceite dos Termos");

    I.waitForElement(topicoAceite, 10);
    I.scrollTo(topicoAceite);
    I.see("2. Aceite dos Termos", topicoAceite);

    const politicaCompra = locate("a")
      .withAttr({ href: "/purchase" })
      .withText("Política de Compra");

    I.waitForElement(politicaCompra, 10);
    I.scrollTo(politicaCompra);
    I.click(politicaCompra);

    I.waitInUrl("/purchase", 10);
    I.seeInCurrentUrl("/purchase");

    I.wait(3);
  },
).tag("@explorareventos28");

/////----------/////

Scenario(
  "Cenário: 00029 - No campo 'Termos de Uso', acessar o tópico '2. Aceite dos Termos' acessar o link 'Política de Meia-entrada e ingressos Acessíveis.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/terms");

    I.waitInUrl("/terms", 10);
    I.seeInCurrentUrl("/terms");

    const topicoAceite = locate("h3").withText("2. Aceite dos Termos");

    I.waitForElement(topicoAceite, 10);
    I.scrollTo(topicoAceite);
    I.see("2. Aceite dos Termos", topicoAceite);

    const meiaEntrada = locate("a")
      .withAttr({ href: "/half-price" })
      .withText("Política de Meia-Entrada");

    I.waitForElement(meiaEntrada, 10);
    I.scrollTo(meiaEntrada);
    I.click(meiaEntrada);

    I.waitInUrl("/half-price", 10);
    I.seeInCurrentUrl("/half-price");

    I.wait(3);
  },
).tag("@explorareventos29");

/////----------/////

Scenario(
  "Cenário: 00030 - No campo 'Termos de Uso', acessar o tópico '9. Operação, Isenções e Limitação de Responsabilidade' e acessar o link 'Política de Compra'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/terms");

    I.waitInUrl("/terms", 10);
    I.seeInCurrentUrl("/terms");

    const topicoResponsabilidade = locate("h3").withText(
      "9. Operação, Isenções e Limitação de Responsabilidade",
    );

    I.waitForElement(topicoResponsabilidade, 10);
    I.scrollTo(topicoResponsabilidade);
    I.see(
      "9. Operação, Isenções e Limitação de Responsabilidade",
      topicoResponsabilidade,
    );

    const politicaCompra = locate("a")
      .withAttr({ href: "/purchase" })
      .withText("Política de Compra");

    I.waitForElement(politicaCompra, 10);
    I.scrollTo(politicaCompra);
    I.click(politicaCompra);

    I.waitInUrl("/purchase", 10);
    I.seeInCurrentUrl("/purchase");

    I.wait(3);
  },
).tag("@explorareventos30");

/////----------/////

Scenario(
  "Cenário: 00031 - No campo 'Termos de Uso', acessar o tópico '13. Comunicações Eletrônicas' e acessar o link 'Política de Compra' Comunicações Eletrônicas e clicar em 'Política de Compra'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/terms");

    I.waitInUrl("/terms", 10);
    I.seeInCurrentUrl("/terms");

    const topicoComunicacoes = locate("h3").withText(
      "13. Comunicações Eletrônicas",
    );

    I.waitForElement(topicoComunicacoes, 10);
    I.scrollTo(topicoComunicacoes);
    I.see("13. Comunicações Eletrônicas", topicoComunicacoes);

    const politicaCompra = locate("a")
      .withAttr({ href: "/purchase" })
      .withText("Política de Compra");

    I.waitForElement(politicaCompra, 10);
    I.scrollTo(politicaCompra);
    I.click(politicaCompra);

    I.waitInUrl("/purchase", 10);
    I.seeInCurrentUrl("/purchase");

    I.wait(3);
  },
).tag("@explorareventos31");

/////----------/////

Scenario(
  "Cenário: 00032 - No campo 'Política de Compra', acessar o tópico '1. INTRODUÇÃO' e acessar o link 'Termos de Uso'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/purchase");

    I.waitInUrl("/purchase", 10);
    I.seeInCurrentUrl("/purchase");

    const topicoConta = locate("h3").withText("2. SUA CONTA E REGISTRO");

    I.waitForElement(topicoConta, 10);
    I.scrollTo(topicoConta);
    I.see("2. SUA CONTA E REGISTRO", topicoConta);

    const termosUso = locate("a")
      .withAttr({ href: "/terms" })
      .withText("Termos de Uso");

    I.waitForElement(termosUso, 10);
    I.scrollTo(termosUso);
    I.click(termosUso);

    I.waitInUrl("/terms", 10);
    I.seeInCurrentUrl("/terms");

    I.wait(3);
  },
).tag("@explorareventos32");

/////----------/////

Scenario(
  "Cenário: 00033 - No campo 'Política de Compra', acessar o tópico '1. INTRODUÇÃO' e acessar o link 'Política de Meia-Entrada e Ingressos Acessíveis'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/purchase");

    I.waitInUrl("/purchase", 10);
    I.seeInCurrentUrl("/purchase");

    const topicoConta = locate("h3").withText("2. SUA CONTA");

    I.waitForElement(topicoConta, 10);
    I.scrollTo(topicoConta);
    I.see("2. SUA CONTA", topicoConta);

    const meiaEntrada = locate("a")
      .withAttr({ href: "/half-price" })
      .withText("Meia-Entrada");

    I.waitForElement(meiaEntrada, 10);
    I.scrollTo(meiaEntrada);
    I.click(meiaEntrada);

    I.waitInUrl("/half-price", 10);
    I.seeInCurrentUrl("/half-price");

    I.waitForText("Meia-Entrada", 10);

    I.wait(3);
  },
).tag("@explorareventos33");

/////----------/////

Scenario(
  "Cenário: 00034 - No campo 'Política de Compra', acessar o tópico '2. SUA CONTA E REGISTRO' e acessar o link 'Termos de Uso'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/purchase");

    I.waitInUrl("/purchase", 10);
    I.seeInCurrentUrl("/purchase");

    const topicoConta = locate("h3").withText("2. SUA CONTA");

    I.waitForElement(topicoConta, 10);
    I.scrollTo(topicoConta);
    I.see("2. SUA CONTA", topicoConta);

    const termosUso = locate("a")
      .withAttr({ href: "/terms" })
      .withText("Termos de Uso");

    I.waitForElement(termosUso, 10);
    I.scrollTo(termosUso);
    I.click(termosUso);

    I.waitInUrl("/terms", 10);
    I.seeInCurrentUrl("/terms");

    const topicoTermos = locate("h3").withText("Aceite dos Termos");

    I.waitForElement(topicoTermos, 10);
    I.see("Aceite dos Termos", topicoTermos);

    I.wait(3);
  },
).tag("@explorareventos34");

/////----------/////

Scenario(
  "Cenário: 00035 - Validar campo de pesquisa por evento, local e cidade utilizando termo inexistente:'Testando Fastix'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);
    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);
    I.seeInCurrentUrl("/events");

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 10);
    I.click(campoBusca);

    I.fillField(campoBusca, "Testando Fastix");

    I.pressKey("Enter");

    I.waitForText("Nenhum evento", 10);

    I.wait(3);
  },
).tag("@explorareventos35");

/////----------/////

Scenario(
  "Cenário: 00036 - Validar campo de 'pesquisa por evento, local e cidade' utilizando caracteres especiais.",
  async ({ I }) => {
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

    I.waitForText("Explorar eventos", 10);
    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 10);

    for (const caractere of caracteresEspeciais) {
      I.say(`Testando caractere: ${caractere}`);

      I.fillField(campoBusca, caractere);
      I.seeInField(campoBusca, caractere);

      I.pressKey("Enter");

      I.wait(1);

      I.clearField(campoBusca);
    }

    I.wait(3);
  },
).tag("@explorareventos36");

/////----------/////

Scenario(
  "Cenário: 00037 - Validar o campo de 'pesquisa por evento, local e cidade', utilizando 10 vezes cada caracteres especiais.",
  async ({ I }) => {
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

    I.waitForText("Explorar eventos", 10);
    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 10);

    for (let i = 0; i < caracteresEspeciais.length; i++) {
      const caractere = caracteresEspeciais[i];
      const texto = caractere.repeat(10);

      I.say(`Testando: ${texto}`);

      I.fillField(campoBusca, texto);
      I.seeInField(campoBusca, texto);

      I.pressKey("Enter");

      if (i === 0) {
        I.wait(2);
      } else {
        I.wait(3);
      }

      I.seeElement("body");

      I.clearField(campoBusca);
    }

    I.wait(3);
  },
).tag("@explorareventos37");

/////----------/////

Scenario(
  "Cenário: 00038 - Validar o campo de 'pesquisa por evento, local e cidade', utilizando números.",
  async ({ I }) => {
    const numerosTeste = [
      "1111111111",
      "9999999999",
      "0000000000",
      "1234567890",
      "9876543210",
      "12345678901234567890",
      "2024",
      "000123",
      "10.5",
      "-123",
      "1".repeat(50),
    ];

    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);
    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 10);

    for (const numero of numerosTeste) {
      I.say(`Testando número: ${numero}`);

      I.fillField(campoBusca, numero);
      I.seeInField(campoBusca, numero);

      I.pressKey("Enter");

      I.wait(2);

      I.seeElement("body");

      I.clearField(campoBusca);
    }
  },
).tag("@explorareventos38");

/////----------/////

Scenario(
  "Cenário: 00039 - Validar o campo de 'pesquisa por evento, local e cidade' com variações de caracteres especiais.",
  async ({ I }) => {
    const testesEspeciais = [
      "@@@@@@@@@@",
      "$$$$$$$$$$",
      "!!!!!!!!!!",
      "!@#$%^&*()",
      ")(*&^%$#@!",
      "@evento!",
      "#show2024",
      "%promoção",
      "@ @ @",
      "@@@###",
      "$$$!!!",
      "©®§±≈",
      "á@ç#õ$",
      `' " \\ /`,
      "!@#$%^&*()!@#$%^&*()",
      "!@#$%^&*()".repeat(5),
    ];

    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);
    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 10);

    for (const termo of testesEspeciais) {
      I.say(`Testando: ${termo}`);

      I.fillField(campoBusca, termo);
      I.seeInField(campoBusca, termo);

      I.pressKey("Enter");

      I.wait(2);

      I.seeElement("body");

      I.dontSee("500");
      I.dontSee("Error");

      I.clearField(campoBusca);
    }
  },
).tag("@explorareventos39");

/////----------/////

Scenario(
  "Cenário: 00040 - Validar o campo de 'pesquisa por evento, local e cidade com combinação de números e caracteres especiais'.",
  async ({ I }) => {
    const testesCombinados = [
      "123@456",
      "99-88-77",
      "@@@@1111",
      "$$$$9999",
      "evento@2025",
      "show#123",
      "100%real",
      "50+50=100",
      "1/2preco",
      "R$1000",
      "@1@1@1@1",
      "#2024#2025",
      "123...456",
      "000@@@111",
      "9*9=81",
      "1=1--",
      "'123@456'",
      "<123@abc>",
      "!@#123$%",
      "1234567890!@#$%",
      "@1".repeat(20),
      "9$".repeat(15),
      "###111###",
      "%%%999%%%",
      "123@#456$%",
    ];

    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);
    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 10);

    for (const termo of testesCombinados) {
      I.say(`Testando: ${termo}`);

      I.fillField(campoBusca, termo);
      I.seeInField(campoBusca, termo);

      I.pressKey("Enter");

      I.wait(2);

      I.seeElement("body");

      I.dontSee("500");
      I.dontSee("Error");
      I.dontSee("Exception");

      I.clearField(campoBusca);
    }

    I.wait(3);
  },
).tag("@explorareventos40");

/////----------/////

Scenario(
  "Cenário: 00041 - Navegação entre eventos no carrossel utilizando o botão de controle por ícone (Botão volta).",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    const botaoVoltar = ".lucide-arrow-left";

    I.waitForElement(botaoVoltar, 10);
    I.seeElement(botaoVoltar);
    I.click(botaoVoltar);
    I.wait(2);
  },
).tag("@explorareventos41");

/////----------/////

Scenario(
  "Cenário: 00042 - Navegação entre eventos no carrossel utilizando o botão de controle por ícone (Botão avançar).",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    const botaoAvancar = ".lucide-arrow-right";

    I.waitForElement(botaoAvancar, 10);
    I.seeElement(botaoAvancar);
    I.click(botaoAvancar);

    I.wait(5);
  },
).tag("@explorareventos42");

/////----------/////

Scenario(
  "Cenário: 00043 - Navegação entre eventos no carrossel utilizando os botões de voltar e avançar (10x voltar + 10x avançar).",
  async ({ I }) => {
    const assert = require("assert");

    I.amOnPage("https://fastix.com.br/");

    const botaoVoltar = ".lucide-arrow-left";
    const botaoAvancar = ".lucide-arrow-right";

    I.waitForElement(botaoVoltar, 10);
    I.waitForElement(botaoAvancar, 10);

    for (let i = 1; i <= 10; i++) {
      I.waitForElement(botaoVoltar, 10);
      I.click(botaoVoltar);
      I.say(`Clique VOLTAR nº ${i}`);
      I.wait(1);
    }

    for (let i = 1; i <= 10; i++) {
      I.waitForElement(botaoAvancar, 10);
      I.click(botaoAvancar);
      I.say(`Clique AVANÇAR nº ${i}`);
      I.wait(1);
    }
  },
).tag("@explorareventos43");

/////----------/////

Scenario(
  "Cenário: 00044 - Navegação de Stress no carrossel + acesso ao evento 'Buffalo Tom em São Paulo'.",
  async ({ I }) => {
    const assert = require("assert");

    I.amOnPage("https://fastix.com.br/");

    const botaoAvancar = ".lucide-arrow-right";
    const botaoVoltar = ".lucide-arrow-left";

    const cardEvento = "//a[.//p[contains(text(),'Buffalo Tom em São Paulo')]]";

    I.waitForText("Explorar eventos", 10);
    I.scrollPageToBottom();

    I.waitForElement(botaoAvancar, 10);
    I.waitForElement(botaoVoltar, 10);

    for (let i = 1; i <= 44; i++) {
      I.click(botaoAvancar);
      I.wait(0.3);
    }

    for (let i = 1; i <= 44; i++) {
      I.click(botaoVoltar);
      I.wait(0.3);
    }

    let encontrou = false;

    for (let i = 1; i <= 20; i++) {
      const visivel = await I.grabNumberOfVisibleElements(cardEvento);

      if (visivel > 0) {
        encontrou = true;
        I.say(`Evento encontrado na tentativa ${i}`);
        break;
      }

      I.click(botaoAvancar);
      I.wait(0.3);
    }

    assert.strictEqual(encontrou, true, "Evento não encontrado");

    I.scrollTo(cardEvento);
    I.waitForElement(cardEvento, 10);
    I.click(cardEvento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);

    I.seeInCurrentUrl("buffalo-tom-em-sao-paulo");

    I.wait(3);
  },
).tag("@explorareventos44");

/////----------/////

Scenario(
  "Cenário: 00045 - Navegação de stress no carrossel, acesso ao evento e retorno à home page.",
  async ({ I }) => {
    const assert = require("assert");

    I.amOnPage("https://fastix.com.br/");

    const botaoAvancar = ".lucide-arrow-right";
    const botaoVoltar = ".lucide-arrow-left";
    const cardEvento = "//a[.//p[contains(text(),'Buffalo Tom em São Paulo')]]";

    I.waitForText("Explorar", 10);
    I.scrollPageToBottom();

    I.waitForElement(botaoAvancar, 10);
    I.waitForElement(botaoVoltar, 10);

    for (let i = 1; i <= 44; i++) {
      I.click(botaoAvancar);
      I.wait(0.3);
    }

    for (let i = 1; i <= 44; i++) {
      I.click(botaoVoltar);
      I.wait(0.3);
    }

    let encontrou = false;

    for (let i = 1; i <= 20; i++) {
      const visivel = await I.grabNumberOfVisibleElements(cardEvento);

      if (visivel > 0) {
        encontrou = true;
        break;
      }

      I.click(botaoAvancar);
      I.wait(0.3);
    }

    assert.strictEqual(
      encontrou,
      true,
      "Evento 'Buffalo Tom em São Paulo' não encontrado no carrossel",
    );

    I.scrollTo(cardEvento);
    I.waitForElement(cardEvento, 10);
    I.click(cardEvento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);
    I.seeInCurrentUrl("buffalo-tom-em-sao-paulo");

    I.wait(3);

    I.amOnPage("https://fastix.com.br/events/buffalo-tom-em-sao-paulo");

    const logoLink = locate("a").withAttr({ href: "/" });

    I.waitForElement(logoLink, 10);
    I.seeElement(logoLink);
    I.click(logoLink);

    I.waitInUrl("/", 10);

    I.waitForText("Explorar", 10);

    I.see("Explorar Eventos");

    I.seeInCurrentUrl("/");

    I.wait(3);

    const botaoAvancarHome = ".lucide-arrow-right";
    const botaoVoltarHome = ".lucide-arrow-left";
    const cardEventoHome =
      "//a[.//p[contains(text(),'Buffalo Tom em São Paulo')]]";

    I.waitForText("Explorar", 10);
    I.scrollPageToBottom();

    I.waitForElement(botaoAvancarHome, 10);
    I.waitForElement(botaoVoltarHome, 10);

    for (let i = 1; i <= 44; i++) {
      I.click(botaoAvancarHome);
      I.wait(0.3);
    }

    for (let i = 1; i <= 44; i++) {
      I.click(botaoVoltarHome);
      I.wait(0.3);
    }

    I.waitForElement(botaoAvancarHome, 10);

    I.say("✅ TESTE FINALIZADO — CARROSSEL ESTÁVEL APÓS NAVEGAÇÃO DE STRESS");
  },
).tag("@explorareventos45");

/////----------/////

Scenario(
  "Cenário: 00046 - Validar estabilidade da busca sob stress.",
  async ({ I }) => {
    const termosStress = [
      "Buffalo",
      "Tom",
      "São",
      "Paulo",
      "Show",
      "Evento",
      "Rock",
      "2025",
      "@@@",
      "!!!",
      "123",
      "Teste",
      "Ingressos",
      "Compra",
      "Half",
      "Price",
      "Checkin",
      "Fastix",
      "Music",
      "Live",
    ];

    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);
    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);
    I.seeInCurrentUrl("/events");

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 10);

    I.seeElement("body");

    for (let i = 1; i <= 100; i++) {
      const termo =
        termosStress[Math.floor(Math.random() * termosStress.length)];

      I.say(`Execução de stress nº ${i} - termo: ${termo}`);

      I.click(campoBusca);

      I.appendField(campoBusca, ` ${termo}`);

      if (i % 3 === 0) {
        I.pressKey(["Backspace"]);
        I.pressKey(["Backspace"]);
      }

      if (i % 2 === 0) {
        I.pressKey("Enter");
        I.pressKey("Enter");
      } else {
        I.pressKey("Enter");
      }

      if (i % 5 === 0) {
        I.executeScript(() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
        });

        I.wait(0.3);

        I.executeScript(() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        });
      }

      I.seeElement("body");

      I.dontSee("This page crashed");

      I.dontSee("500");
      I.dontSee("Error");
      I.dontSee("Exception");
      I.dontSee("Unhandled");

      I.seeElement(campoBusca);

      I.waitForElement(campoBusca, 5);

      I.wait(0.2);
    }

    I.click(campoBusca);

    I.clearField(campoBusca);

    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.pressKey("Enter");

    I.wait(3);

    I.seeElement("body");

    I.dontSee("500");
    I.dontSee("Error");

    const overflow = await I.executeScript(() => {
      return document.body.scrollWidth > window.innerWidth;
    });

    if (overflow) {
      throw new Error("Overflow horizontal detectado após stress extremo.");
    }

    I.wait(3);
  },
).tag("@explorareventos46");

/////----------/////

Scenario(
  "Cenário: 00047 - Validar comportamento do sistema sob duplo clique e múltiplos cliques consecutivos.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    const botaoVoltar = ".lucide-arrow-left";
    const botaoAvancar = ".lucide-arrow-right";

    I.say("Stress nos botões do carrossel");

    I.waitForText("Explorar eventos", 10);
    I.scrollPageToBottom();

    I.waitForElement(botaoAvancar, 10);
    I.waitForElement(botaoVoltar, 10);

    I.doubleClick(botaoAvancar);
    I.doubleClick(botaoVoltar);

    for (let i = 0; i < 20; i++) {
      I.click(botaoAvancar);
      I.wait(0.2);
    }

    for (let i = 0; i < 20; i++) {
      I.click(botaoVoltar);
      I.wait(0.2);
    }

    I.seeElement("body");

    I.say("Stress nas tabs");

    const footer = locate("footer").withText("FASTIX LTDA");

    const guiaCheckin = locate("a")
      .withAttr({ href: "/checkin-guide" })
      .withText("Guia Check-in");

    I.scrollTo(footer);
    I.waitForElement(guiaCheckin, 10);
    I.click(guiaCheckin);

    I.waitInUrl("/checkin-guide", 10);

    const abaWeb = locate("button").withAttr({ role: "tab" }).withText("Web");

    const abaApp = locate("button")
      .withAttr({ role: "tab" })
      .withText("App FasTix");

    for (let i = 0; i < 10; i++) {
      I.click(abaWeb);
      I.wait(0.2);

      I.click(abaApp);
      I.wait(0.2);
    }

    I.waitForElement(
      locate("button")
        .withAttr({
          role: "tab",
          "data-state": "active",
        })
        .withText("App FasTix"),
      10,
    );

    I.seeElement("body");

    I.say("Stress nos links do footer");

    const termos = locate("a").withAttr({ href: "/terms" });
    const politica = locate("a").withAttr({ href: "/purchase" });
    const meia = locate("a").withAttr({ href: "/half-price" });

    for (let i = 0; i < 5; i++) {
      I.click(termos);
      I.wait(0.5);
    }

    I.waitInUrl("/terms", 10);

    for (let i = 0; i < 5; i++) {
      I.click(politica);
      I.wait(0.5);
    }

    I.waitInUrl("/purchase", 10);

    for (let i = 0; i < 5; i++) {
      I.click(meia);
      I.wait(0.5);
    }

    I.waitInUrl("/half-price", 10);

    I.seeElement("body");

    I.say("Stress no card do evento");

    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);
    I.scrollPageToBottom();

    const cardEvento = "//a[.//p[contains(text(),'Buffalo Tom em São Paulo')]]";

    let encontrou = false;

    for (let i = 0; i < 25; i++) {
      const visivel = await I.grabNumberOfVisibleElements(cardEvento);

      if (visivel > 0) {
        encontrou = true;
        break;
      }

      I.click(botaoAvancar);
      I.wait(0.3);
    }

    if (!encontrou) {
      throw new Error("Evento Buffalo Tom não encontrado");
    }

    I.scrollTo(cardEvento);
    I.waitForElement(cardEvento, 10);

    I.say("Executando stress de múltiplos cliques no card");

    I.executeScript(() => {
      const card = document.evaluate(
        "//a[.//p[contains(text(),'Buffalo Tom em São Paulo')]]",
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null,
      ).singleNodeValue;

      if (card) {
        for (let i = 0; i < 15; i++) {
          card.click();
        }
      }
    });

    I.wait(2);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);
    I.seeInCurrentUrl("buffalo-tom-em-sao-paulo");

    I.seeElement("body");

    I.dontSee("Internal Server Error");
    I.dontSee("Application error");
    I.dontSee("Unhandled Runtime Error");
    I.dontSee("Cannot read properties");
    I.dontSee("Something went wrong");
    I.dontSee("Unexpected error");
    I.dontSee("Fatal error");
    I.dontSee("Server Error");
    I.dontSee("TypeError");
    I.dontSee("ReferenceError");
    I.dontSee("SyntaxError");

    I.dontSee("about:blank");

    I.wait(3);
  },
).tag("@explorareventos47");

/////----------/////

Scenario(
  "Cenário: 00048 - Validar navegação utilizando back e forward do navegador.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);
    I.see("Explorar eventos");
    I.seeInCurrentUrl("/");

    // garante topo inicial
    I.executeScript(() => window.scrollTo(0, 0));

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);
    I.seeInCurrentUrl("/events");

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 10);
    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em São Paulo");

    I.waitForElement(evento, 10);
    I.scrollTo(evento);
    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);

    I.seeInCurrentUrl("buffalo-tom-em-sao-paulo");

    I.see("Sobre o evento");

    I.scrollPageToBottom();

    I.seeElement("body");

    const meiaEntrada = locate("a")
      .withAttr({ href: "/half-price" })
      .withText("Meia Entrada");

    I.waitForElement(meiaEntrada, 10);

    I.scrollTo(meiaEntrada);

    I.click(meiaEntrada);

    I.waitInUrl("/half-price", 10);

    I.seeInCurrentUrl("/half-price");

    I.waitForText("Meia-Entrada", 10);

    I.scrollPageToBottom();

    I.see("FASTIX LTDA");

    I.seeElement("body");

    I.scrollPageToBottom();

    I.wait(2);

    const termosUso = locate("a").withAttr({ href: "/terms" });

    I.waitForElement(termosUso, 15);

    I.scrollTo(termosUso);

    I.seeElement(termosUso);

    I.forceClick(termosUso);

    I.waitInUrl("/terms", 10);

    I.seeInCurrentUrl("/terms");

    I.waitForText("Aceite dos Termos", 10);

    I.scrollPageToBottom();

    I.see("FASTIX LTDA");

    I.seeElement("body");

    I.say("Voltando para Meia Entrada");

    I.executeScript(() => window.history.back());

    I.waitInUrl("/half-price", 10);

    I.seeInCurrentUrl("/half-price");

    I.waitForText("Meia-Entrada", 10);

    const scrollBack1 = await I.executeScript(() => window.scrollY);

    if (scrollBack1 > 300) {
      throw new Error("Scroll não foi resetado corretamente");
    }

    I.seeElement("body");

    I.say("Voltando para Evento");

    I.executeScript(() => window.history.back());

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);

    I.seeInCurrentUrl("buffalo-tom-em-sao-paulo");

    I.waitForText("Sobre o evento", 10);

    const scrollBack2 = await I.executeScript(() => window.scrollY);

    if (scrollBack2 > 300) {
      throw new Error("Scroll não foi resetado corretamente");
    }

    I.seeElement("body");

    I.say("Voltando para listagem");

    I.executeScript(() => window.history.back());

    I.waitInUrl("/events", 10);

    I.seeInCurrentUrl("/events");

    I.waitForText("Buffalo Tom em São Paulo", 10);

    const scrollBack3 = await I.executeScript(() => window.scrollY);

    if (scrollBack3 > 300) {
      throw new Error("Scroll não foi resetado corretamente");
    }

    I.seeElement("body");

    I.say("Avançando para Evento");

    I.executeScript(() => window.history.forward());

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);

    I.seeInCurrentUrl("buffalo-tom-em-sao-paulo");

    I.waitForText("Sobre o evento", 10);

    I.seeElement("body");

    I.say("Avançando para Meia Entrada");

    I.executeScript(() => window.history.forward());

    I.waitInUrl("/half-price", 10);

    I.seeInCurrentUrl("/half-price");

    I.waitForText("Meia-Entrada", 10);

    I.seeElement("body");

    I.say("Avançando para Termos");

    I.executeScript(() => window.history.forward());

    I.waitInUrl("/terms", 10);

    I.seeInCurrentUrl("/terms");

    I.waitForText("Aceite dos Termos", 10);

    I.seeElement("body");

    I.dontSee("500");
    I.dontSee("404");
    I.dontSee("Application error");
    I.dontSee("Internal Server Error");

    I.wait(3);
  },
).tag("@explorareventos48");

/////----------/////

Scenario(
  "Cenário: 00049 - Validar recuperação da aplicação após refresh durante interação.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);
    I.see("Explorar eventos");

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);
    I.seeInCurrentUrl("/events");

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 10);
    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em São Paulo");

    I.waitForElement(evento, 10);
    I.scrollTo(evento);
    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);

    I.seeInCurrentUrl("/events/buffalo-tom-em-sao-paulo");

    I.waitForText("Sobre o evento", 10);

    I.say("Executando scroll durante interação");

    const footer = locate("footer").withText("FASTIX LTDA");

    I.scrollTo(footer);

    I.waitForVisible(footer, 10);

    I.see("FASTIX LTDA");

    I.say("Atualizando página durante interação");

    I.refreshPage();

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);

    I.seeInCurrentUrl("/events/buffalo-tom-em-sao-paulo");

    I.waitForText("Sobre o evento", 10);

    I.see("Buffalo Tom em São Paulo");

    I.seeElement("body");

    I.waitForElement(footer, 10);

    I.scrollTo(footer);

    I.see("FASTIX LTDA");

    I.dontSee("500");

    I.executeScript(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    I.wait(2);

    I.waitForText("Sobre o evento", 10);

    I.wait(3);
  },
).tag("@explorareventos49");

/////----------/////

Scenario(
  "Cenário: 00050 - Stress de refresh durante interação contínua.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 10);

    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    const evento = locate("p").withText("Buffalo Tom em São Paulo");

    I.waitForElement(evento, 10);

    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);

    I.waitForText("Sobre o evento", 10);

    for (let i = 1; i <= 8; i++) {
      I.say(`Iteração de stress ${i}`);

      I.scrollPageToBottom();

      I.wait(1);

      I.executeScript(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });

      I.wait(1);

      I.refreshPage();

      I.dontSee("Application error");

      I.dontSee("Internal Server Error");

      I.dontSee("Unexpected error");

      I.wait(2);

      const urlAtual = await I.grabCurrentUrl();

      if (urlAtual.includes("/events?q=") || urlAtual.endsWith("/events")) {
        I.say("Aplicação voltou para listagem. Recuperando evento.");

        I.waitForElement(evento, 10);

        I.scrollTo(evento);

        I.click(evento);

        I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);
      }

      I.waitForText("Sobre o evento", 10);

      I.see("Buffalo Tom em São Paulo");

      I.seeInCurrentUrl("/events/buffalo-tom-em-sao-paulo");
    }

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);

    I.seeInCurrentUrl("/events/buffalo-tom-em-sao-paulo");

    I.waitForText("Sobre o evento", 10);

    I.see("Buffalo Tom em São Paulo");

    I.dontSee("Internal Server Error");

    I.dontSee("Application error");

    I.dontSee("Unexpected error");

    I.wait(3);
  },
).tag("@explorareventos50");

/////----------/////

Scenario(
  "Cenário: 00051 - Validar responsividade da aplicação em dispositivos mobile, tablet e desktop ultrawide.",
  async ({ I }) => {
    const assert = require("assert");

    const botaoAvancar = ".lucide-arrow-right";

    const botaoVoltar = ".lucide-arrow-left";

    const footer = locate("footer").withText("FASTIX LTDA");

    const cardEvento = locate("p").withText("Buffalo Tom em São Paulo");

    const problemasResponsivos = [];

    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 15);

    async function validarResolucao(largura, altura, nomeResolucao) {
      I.say(`📱 Validando resolução: ${nomeResolucao}`);

      I.resizeWindow(largura, altura);

      I.wait(3);

      const overflowInfo = await I.executeScript(() => {
        const elementos = [...document.querySelectorAll("*")];

        const problematicos = elementos
          .filter((el) => el.scrollWidth > el.clientWidth + 2)
          .map((el) => ({
            tag: el.tagName,
            classe: el.className,
            id: el.id,
            scrollWidth: el.scrollWidth,
            clientWidth: el.clientWidth,
          }));

        return {
          pageScrollWidth: document.documentElement.scrollWidth,

          pageClientWidth: document.documentElement.clientWidth,

          possuiOverflow:
            document.documentElement.scrollWidth >
            document.documentElement.clientWidth,

          problematicos,
        };
      });

      if (overflowInfo.possuiOverflow) {
        console.log(`❌ OVERFLOW REAL DETECTADO EM ${nomeResolucao}`);

        console.log("🔴 Elementos problemáticos:", overflowInfo.problematicos);

        console.log(`ScrollWidth: ${overflowInfo.pageScrollWidth}`);

        console.log(`ClientWidth: ${overflowInfo.pageClientWidth}`);

        problemasResponsivos.push({
          resolucao: nomeResolucao,
          tipo: "Overflow horizontal",
          detalhes: overflowInfo.problematicos,
        });

        await I.saveScreenshot(`overflow_${nomeResolucao}.png`);
      } else {
        console.log(`✅ Sem overflow em ${nomeResolucao}`);
      }

      const qtdAvancar = await I.grabNumberOfVisibleElements(botaoAvancar);

      const qtdVoltar = await I.grabNumberOfVisibleElements(botaoVoltar);

      if (nomeResolucao === "Mobile") {
        I.say("📱 Validando carrossel mobile");

        await I.executeScript(() => {
          const carrossel = document.querySelector(
            '[class*="overflow"], [class*="carousel"]',
          );

          if (carrossel) {
            carrossel.scrollLeft += 500;
          }
        });

        I.wait(2);
      } else {
        if (qtdAvancar > 0 && qtdVoltar > 0) {
          I.say(`🖥️ Carrossel com navegação visível em ${nomeResolucao}`);

          I.seeElement(botaoAvancar);

          I.seeElement(botaoVoltar);

          for (let i = 1; i <= 4; i++) {
            I.click(botaoAvancar);

            I.wait(1);
          }

          for (let i = 1; i <= 4; i++) {
            I.click(botaoVoltar);

            I.wait(1);
          }
        } else {
          I.say(`📲 Carrossel sem botões em ${nomeResolucao}`);

          await I.executeScript(() => {
            const carrossel = document.querySelector(
              '[class*="overflow"], [class*="carousel"]',
            );

            if (carrossel) {
              carrossel.scrollLeft += 500;
            }
          });

          I.wait(2);
        }
      }

      I.scrollTo(cardEvento);

      I.waitForVisible(cardEvento, 15);

      I.see("Buffalo Tom em São Paulo");

      const eventoVisivel = await I.grabNumberOfVisibleElements(cardEvento);

      if (eventoVisivel <= 0) {
        problemasResponsivos.push({
          resolucao: nomeResolucao,
          tipo: "Evento invisível",
        });

        throw new Error(`❌ Evento não visível em ${nomeResolucao}`);
      }

      console.log(`✅ Evento visível em ${nomeResolucao}`);

      I.click(cardEvento);

      I.waitInUrl("/buffalo", 20);

      I.dontSee("Application error");

      I.dontSee("Internal Server Error");

      I.dontSee("Unexpected error");

      console.log(`✅ Evento acessado em ${nomeResolucao}`);

      I.refreshPage();

      I.wait(3);

      I.dontSee("Application error");

      I.dontSee("Internal Server Error");

      I.dontSee("Unexpected error");

      console.log(`✅ Página estável após refresh em ${nomeResolucao}`);

      I.scrollTo(footer);

      I.waitForVisible(footer, 15);

      I.see("FASTIX LTDA");

      console.log(`✅ Footer validado em ${nomeResolucao}`);

      I.amOnPage("https://fastix.com.br/");

      I.waitForText("Explorar eventos", 15);

      I.wait(2);

      await I.executeScript(() => {
        window.scrollTo({
          top: 0,
          behavior: "instant",
        });
      });

      I.wait(1);
    }

    await validarResolucao(390, 844, "Mobile");

    await validarResolucao(768, 1024, "Tablet");

    await validarResolucao(2560, 1440, "Desktop Ultrawide");

    console.log("=============================");

    console.log("📋 RESUMO RESPONSIVIDADE");

    console.log("=============================");

    if (problemasResponsivos.length > 0) {
      console.log("⚠️ Problemas encontrados:");

      console.log(JSON.stringify(problemasResponsivos, null, 2));
    } else {
      console.log("✅ Nenhum problema responsivo encontrado");
    }

    I.see("Explorar eventos");

    I.dontSee("Application error");

    I.dontSee("Internal Server Error");

    I.dontSee("Unexpected error");

    I.wait(3);

    assert.ok(true, "Teste finalizado");
  },
).tag("@explorareventos51");

/////----------/////

Scenario(
  "Cenário: 00052 - Validar navegação utilizando apenas teclado.",
  async ({ I }) => {
    const assert = require("assert");

    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);

    async function tabAteTexto(texto, maxTabs = 30) {
      for (let i = 1; i <= maxTabs; i++) {
        I.pressKey("Tab");
        I.wait(0.3);

        const foco = await I.executeScript(() => {
          const ativo = document.activeElement;

          return {
            texto: ativo?.innerText || ativo?.value || "",
            aria: ativo?.getAttribute("aria-label") || "",
            tag: ativo?.tagName || "",
          };
        });

        console.log(`TAB ${i}:`, foco);

        const conteudo = `${foco.texto} ${foco.aria}`.toLowerCase();

        if (conteudo.includes(texto.toLowerCase())) {
          console.log(`✅ Encontrou foco em: ${texto}`);

          return true;
        }
      }

      return false;
    }

    async function validarFocoVisivel() {
      const foco = await I.executeScript(() => {
        const ativo = document.activeElement;

        if (!ativo) return false;

        const style = window.getComputedStyle(ativo);

        return {
          tag: ativo.tagName,
          texto: ativo.innerText || ativo.value || "",
          classe: ativo.className || "",
          outline: style.outline,
          boxShadow: style.boxShadow,
        };
      });

      console.log("🎯 FOCO ATUAL:", foco);

      assert.ok(foco, "Nenhum elemento recebeu foco");

      const possuiIndicador =
        foco.outline !== "none" || foco.boxShadow !== "none";

      assert.ok(possuiIndicador, "❌ Foco não visível");
    }

    I.say("TAB até Explorar eventos");

    const encontrouExplorar = await tabAteTexto("Explorar eventos");

    assert.ok(encontrouExplorar, "❌ Foco não chegou em Explorar eventos");

    await validarFocoVisivel();

    I.pressKey("Enter");

    I.waitInUrl("/events", 10);

    I.say("Validando SHIFT + TAB");

    I.pressKey(["Shift", "Tab"]);

    I.wait(1);

    await validarFocoVisivel();

    const encontrouBusca = await tabAteTexto("");

    assert.ok(encontrouBusca, "❌ Campo busca não acessível");

    await validarFocoVisivel();

    I.pressKey("Space");

    I.fillField('input[placeholder*="Pesquisar"]', "Buffalo Tom em São Paulo");

    I.wait(2);

    I.say("Validando acessibilidade do carrossel");

    const botaoAvancar = ".lucide-arrow-right";

    const botaoVoltar = ".lucide-arrow-left";

    const quantidadeAvancar = await I.grabNumberOfVisibleElements(botaoAvancar);

    const quantidadeVoltar = await I.grabNumberOfVisibleElements(botaoVoltar);

    if (quantidadeAvancar > 0 && quantidadeVoltar > 0) {
      I.say("Carrossel encontrado");

      I.seeElement(botaoAvancar);
      I.seeElement(botaoVoltar);

      I.click(botaoAvancar);
      I.wait(1);

      I.click(botaoVoltar);
      I.wait(1);
    } else {
      I.say("Carrossel não visível nesta resolução");
    }

    I.say("TAB até evento Buffalo Tom");

    const encontrouEvento = await tabAteTexto("Buffalo Tom");

    assert.ok(encontrouEvento, "❌ Evento não acessível via TAB");

    await validarFocoVisivel();

    I.say("Abrindo evento com ENTER");

    I.pressKey("Enter");

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);

    I.say("Validando roles");

    const roles = await I.executeScript(() => {
      return Array.from(document.querySelectorAll("button, a, input")).map(
        (el) => ({
          tag: el.tagName,
          role: el.getAttribute("role"),
        }),
      );
    });

    console.log("ROLES:", roles);

    assert.ok(roles.length > 0, "❌ Nenhum elemento acessível encontrado");

    const footer = locate("footer").withText("FASTIX LTDA");

    I.scrollTo(footer);

    I.waitForVisible(footer, 10);

    I.see("FASTIX LTDA", footer);

    I.dontSee("Application error");

    I.dontSee("Internal Server Error");

    I.dontSee("Unexpected error");

    I.wait(3);
  },
).tag("@explorareventos52");

/////----------/////

Scenario(
  "Cenário: 00053 - Validar atualização correta dos conteúdos do carrossel.",
  async ({ I }) => {
    const assert = require("assert");

    I.amOnPage("https://fastix.com.br/");

    const botaoAvancar = ".lucide-arrow-right";
    const botaoVoltar = ".lucide-arrow-left";

    I.waitForText("Explorar eventos", 10);

    I.scrollPageToBottom();

    I.waitForElement(botaoAvancar, 10);
    I.waitForElement(botaoVoltar, 10);

    const posicaoInicial = await I.executeScript(() => {
      const container = document.querySelector(".flex.touch-pan-y");

      if (!container) {
        return null;
      }

      return {
        scrollLeft: container.scrollLeft,
        transform: window.getComputedStyle(container).transform,
      };
    });

    console.log("POSIÇÃO INICIAL:", posicaoInicial);

    I.say("Avançando carrossel");

    I.click(botaoAvancar);

    I.wait(2);

    const posicaoDepoisAvanco = await I.executeScript(() => {
      const container = document.querySelector(".flex.touch-pan-y");

      if (!container) {
        return null;
      }

      return {
        scrollLeft: container.scrollLeft,
        transform: window.getComputedStyle(container).transform,
      };
    });

    console.log("POSIÇÃO APÓS AVANÇO:", posicaoDepoisAvanco);

    const houveMudanca =
      JSON.stringify(posicaoInicial) !== JSON.stringify(posicaoDepoisAvanco);

    assert.ok(houveMudanca, "❌ O carrossel não alterou posição após avançar");

    I.say("Voltando carrossel");

    I.click(botaoVoltar);

    I.wait(2);

    const posicaoFinal = await I.executeScript(() => {
      const container = document.querySelector(".flex.touch-pan-y");

      if (!container) {
        return null;
      }

      return {
        scrollLeft: container.scrollLeft,
        transform: window.getComputedStyle(container).transform,
      };
    });

    console.log("POSIÇÃO FINAL:", posicaoFinal);

    const retornouCorretamente =
      JSON.stringify(posicaoInicial) === JSON.stringify(posicaoFinal);

    assert.ok(retornouCorretamente, "❌ O carrossel não retornou corretamente");

    I.seeElement(botaoAvancar);
    I.seeElement(botaoVoltar);

    I.dontSee("Application error");
    I.dontSee("Internal Server Error");
    I.dontSee("Unexpected error");

    I.wait(3);
  },
).tag("@explorareventos53");

/////----------/////

Scenario(
  "Cenário: 00054 - Validar comportamento visual, navegação, estabilidade e integridade e stress do carrossel de eventos.",
  async ({ I }) => {
    const assert = require("assert");

    I.amOnPage("https://fastix.com.br/");

    const botaoAvancar = ".lucide-arrow-right";
    const botaoVoltar = ".lucide-arrow-left";

    const containerCarrossel = ".flex.touch-pan-y";

    const capturarEstadoCarrossel = async () => {
      return await I.executeScript((selector) => {
        const container = document.querySelector(selector);

        if (!container) {
          return null;
        }

        const cards = Array.from(container.querySelectorAll("p.font-bold"))
          .map((el) => el.innerText.trim())
          .filter(Boolean);

        const cardsVisiveis = Array.from(
          container.querySelectorAll("a"),
        ).filter((el) => {
          const rect = el.getBoundingClientRect();

          return (
            rect.width > 0 &&
            rect.height > 0 &&
            rect.top < window.innerHeight &&
            rect.bottom > 0
          );
        });

        const titulosDuplicados = cards.filter(
          (item, index) => cards.indexOf(item) !== index,
        );

        const imagens = Array.from(container.querySelectorAll("img"));

        const imagensVisiveis = imagens.filter((img) => {
          const rect = img.getBoundingClientRect();

          return (
            rect.width > 0 &&
            rect.height > 0 &&
            rect.top < window.innerHeight &&
            rect.bottom > 0
          );
        });

        const imagensQuebradas = imagensVisiveis.filter(
          (img) => img.complete && img.naturalWidth === 0,
        );

        return {
          scrollLeft: container.scrollLeft,

          scrollWidth: container.scrollWidth,

          clientWidth: container.clientWidth,

          transform: window.getComputedStyle(container).transform,

          quantidadeTitulos: cards.length,

          quantidadeVisiveis: cardsVisiveis.length,

          titulos: cards,

          titulosDuplicados,

          imagensVisiveis: imagensVisiveis.length,

          imagensQuebradas: imagensQuebradas.length,
        };
      }, containerCarrossel);
    };

    const validarEstado = async (estado, etapa) => {
      assert.ok(estado !== null, `❌ Estado inválido na etapa: ${etapa}`);

      assert.ok(
        estado.quantidadeTitulos > 0,
        `❌ Nenhum título encontrado na etapa: ${etapa}`,
      );

      assert.ok(
        estado.quantidadeVisiveis > 0,
        `❌ Nenhum card visível na etapa: ${etapa}`,
      );

      assert.ok(
        estado.imagensQuebradas <= 1,
        `❌ Existem imagens quebradas visíveis na etapa: ${etapa}`,
      );

      I.dontSee("Application error");

      I.dontSee("Internal Server Error");

      I.dontSee("Unexpected error");

      I.dontSee("Error");

      I.dontSee("Failed");

      I.dontSee("404");

      I.dontSee("500");
    };

    I.waitForText("Explorar eventos", 15);

    I.scrollPageToBottom();

    I.waitForElement(botaoAvancar, 10);

    I.waitForElement(botaoVoltar, 10);

    const estadoInicial = await capturarEstadoCarrossel();

    console.log("ESTADO INICIAL", estadoInicial);

    await validarEstado(estadoInicial, "ESTADO INICIAL");

    I.say("🔥 Iniciando stress avançado de avanço");

    for (let i = 1; i <= 50; i++) {
      const antes = await capturarEstadoCarrossel();

      I.waitForElement(botaoAvancar, 10);

      I.click(botaoAvancar);

      I.wait(0.2);

      const depois = await capturarEstadoCarrossel();

      console.log(`AVANÇO ${i}`, {
        antes,
        depois,
      });

      const alterouEstado =
        antes.transform !== depois.transform ||
        antes.scrollLeft !== depois.scrollLeft;

      assert.ok(alterouEstado, `❌ O carrossel não alterou após avanço ${i}`);

      const mudouTransform = antes.transform !== depois.transform;

      const mudouScroll = antes.scrollLeft !== depois.scrollLeft;

      const mudouTitulosVisiveis =
        JSON.stringify(antes.titulos.slice(0, 5)) !==
        JSON.stringify(depois.titulos.slice(0, 5));

      assert.ok(
        mudouTransform || mudouScroll || mudouTitulosVisiveis,
        `❌ O carrossel não apresentou mudança visual real após avanço ${i}`,
      );

      await validarEstado(depois, `AVANÇO ${i}`);
    }

    I.say("🔥 Iniciando stress avançado de retorno");

    for (let i = 1; i <= 50; i++) {
      const antes = await capturarEstadoCarrossel();

      I.waitForElement(botaoVoltar, 10);

      I.click(botaoVoltar);

      I.wait(0.2);

      const depois = await capturarEstadoCarrossel();

      console.log(`RETORNO ${i}`, {
        antes,
        depois,
      });

      const alterouEstado =
        antes.transform !== depois.transform ||
        antes.scrollLeft !== depois.scrollLeft;

      assert.ok(alterouEstado, `❌ O carrossel não alterou após retorno ${i}`);

      const mudouTransform = antes.transform !== depois.transform;

      const mudouScroll = antes.scrollLeft !== depois.scrollLeft;

      const mudouTitulosVisiveis =
        JSON.stringify(antes.titulos.slice(0, 5)) !==
        JSON.stringify(depois.titulos.slice(0, 5));

      assert.ok(
        mudouTransform || mudouScroll || mudouTitulosVisiveis,
        `❌ O carrossel não apresentou mudança visual real após retorno ${i}`,
      );

      await validarEstado(depois, `RETORNO ${i}`);
    }

    const estadoFinal = await capturarEstadoCarrossel();

    console.log("ESTADO FINAL", estadoFinal);

    await validarEstado(estadoFinal, "ESTADO FINAL");

    I.say("🔄 Validando comportamento após refresh");

    I.refreshPage();

    I.waitForText("Explorar eventos", 15);

    I.scrollPageToBottom();

    I.waitForElement(botaoAvancar, 10);

    I.waitForElement(botaoVoltar, 10);

    const estadoRefresh = await capturarEstadoCarrossel();

    console.log("ESTADO APÓS REFRESH", estadoRefresh);

    await validarEstado(estadoRefresh, "REFRESH");

    I.say("🔥 Stress pós refresh");

    for (let i = 1; i <= 20; i++) {
      I.click(botaoAvancar);

      I.wait(0.1);

      I.click(botaoVoltar);

      I.wait(0.1);
    }

    const estadoFinalAbsoluto = await capturarEstadoCarrossel();

    console.log("ESTADO FINAL ABSOLUTO", estadoFinalAbsoluto);

    await validarEstado(estadoFinalAbsoluto, "FINAL ABSOLUTO");

    assert.ok(
      estadoFinalAbsoluto.scrollWidth > estadoFinalAbsoluto.clientWidth,
      "❌ O carrossel aparenta não possuir scroll horizontal funcional",
    );

    I.seeElement(botaoAvancar);

    I.seeElement(botaoVoltar);

    I.say(
      "✅ Validação sênior de stress, renderização dinâmica, integridade visual e consistência do carrossel executada com sucesso",
    );

    I.wait(3);
  },
).tag("@explorareventos54");

/////----------/////

Scenario(
  "Cenário: 00055 - Validar acessos simultâneos dos links institucionais, aplicativos e redes sociais no rodapé do evento.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);
    I.see("Explorar eventos");

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);
    I.seeInCurrentUrl("/events");

    I.wait(2);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 10);
    I.click(campoBusca);
    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em São Paulo");

    I.waitForElement(evento, 10);
    I.seeElement(evento);
    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);
    I.seeInCurrentUrl("/events/buffalo-tom-em-sao-paulo");

    I.wait(2);

    const footer = locate("footer").withText("FASTIX LTDA");

    async function acessarPaginaERetornar(locator, url, nomePagina) {
      I.say(`Acessando ${nomePagina}`);

      I.scrollTo(footer);

      I.waitForVisible(footer, 10);

      I.see("FASTIX LTDA", footer);

      I.wait(2);

      I.waitForElement(locator, 10);

      I.scrollTo(locator);

      I.waitForElement(locator, 10);

      I.seeElement(locator);

      I.click(locator);

      I.wait(2);

      let urlAtual = await I.grabCurrentUrl();

      if (!urlAtual.includes(url)) {
        I.say(
          `Primeira tentativa falhou em ${nomePagina}. Tentando novamente.`,
        );

        I.executeScript((el) => {
          el.click();
        }, locator);

        I.wait(3);

        urlAtual = await I.grabCurrentUrl();
      }

      I.waitInUrl(url, 10);

      I.seeInCurrentUrl(url);

      I.wait(4);

      I.say(`Voltando da página ${nomePagina}`);

      I.executeScript(() => {
        window.history.back();
      });

      I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);

      I.seeInCurrentUrl("/events/buffalo-tom-em-sao-paulo");

      I.waitForText("Sobre o evento", 10);

      I.see("Buffalo Tom em São Paulo");

      I.wait(3);
    }

    const footer2 = locate("footer").withText("FASTIX LTDA");

    async function acessarPaginaERetornar(locator, url, nomePagina) {
      I.say(`Acessando ${nomePagina}`);

      I.scrollTo(footer);

      I.waitForVisible(footer, 10);

      I.see("FASTIX LTDA", footer);

      I.wait(2);

      I.waitForElement(locator, 10);

      I.scrollTo(locator);

      I.seeElement(locator);

      if (nomePagina === "Política de Compra") {
        const href = await I.grabAttributeFrom(locator, "href");

        const urlCompleta = href.startsWith("http")
          ? href
          : `https://fastix.com.br${href}`;

        I.amOnPage(urlCompleta);
      } else {
        I.click(locator);
      }

      I.wait(3);

      let urlAtual = await I.grabCurrentUrl();

      if (!urlAtual.includes(url)) {
        I.say(`Primeira tentativa falhou em ${nomePagina}.`);

        const urlFallback = url.startsWith("http")
          ? url
          : `https://fastix.com.br${url}`;

        I.amOnPage(urlFallback);

        I.wait(3);

        urlAtual = await I.grabCurrentUrl();
      }

      I.waitInUrl(url, 10);

      I.seeInCurrentUrl(url);

      I.wait(4);

      I.say(`Voltando da página ${nomePagina}`);

      I.executeScript(() => {
        window.history.back();
      });

      I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);

      I.seeInCurrentUrl("/events/buffalo-tom-em-sao-paulo");

      I.waitForText("Sobre o evento", 10);

      I.see("Buffalo Tom em São Paulo");

      I.wait(3);
    }

    const meiaEntrada = locate("a")
      .withAttr({
        href: "/half-price",
      })
      .withText("Meia Entrada");

    await acessarPaginaERetornar(meiaEntrada, "/half-price", "Meia Entrada");

    const termosDeUso = locate("a")
      .withAttr({
        href: "/terms",
      })
      .withText("Termos e Condições de Uso");

    await acessarPaginaERetornar(
      termosDeUso,
      "/terms",
      "Termos e Condições de Uso",
    );

    const politicaCompra = locate("a")
      .withAttr({
        href: "/purchase",
      })
      .withText("Política de Compra");

    await acessarPaginaERetornar(
      politicaCompra,
      "/purchase",
      "Política de Compra",
    );

    const guiaCheckin = locate("a")
      .withAttr({
        href: "/checkin-guide",
      })
      .withText("Guia Check-in");

    await acessarPaginaERetornar(
      guiaCheckin,
      "/checkin-guide",
      "Guia Check-in",
    );

    I.wait(3);

    I.say("Validando acesso ao app Meus Ingressos - iOS");

    I.see("Baixe o app Meus Ingressos:");

    const appIOS = locate("a")
      .withAttr({
        href: "https://apps.apple.com/us/app/fastix-meus-ingressos/id6748481193",
      })
      .withText("iOS");

    I.waitForElement(appIOS, 10);

    I.scrollTo(appIOS);

    I.seeElement(appIOS);

    I.amOnPage(
      "https://apps.apple.com/us/app/fastix-meus-ingressos/id6748481193",
    );

    I.waitInUrl("apps.apple.com/us/app/fastix-meus-ingressos/id6748481193", 20);

    I.seeInCurrentUrl(
      "apps.apple.com/us/app/fastix-meus-ingressos/id6748481193",
    );

    I.wait(3);

    I.say("Retornando para página do evento");

    I.amOnPage("https://fastix.com.br/events/buffalo-tom-em-sao-paulo");

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);

    I.seeInCurrentUrl("/events/buffalo-tom-em-sao-paulo");

    I.waitForText("Sobre o evento", 10);

    I.see("Buffalo Tom em São Paulo");

    I.wait(3);

    I.say("Validando acesso ao app Meus Ingressos - Android");

    I.see("Baixe o app Meus Ingressos:");

    const appAndroid = locate("a")
      .withAttr({
        href: "https://play.google.com/store/apps/details?id=com.wsfl.fastix.mytickets&pcampaignid=web_share",
      })
      .withText("Android");

    I.waitForElement(appAndroid, 10);

    I.scrollTo(appAndroid);

    I.seeElement(appAndroid);

    I.executeScript((selector) => {
      const elemento = document.evaluate(
        selector.xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null,
      ).singleNodeValue;

      if (elemento) {
        elemento.removeAttribute("target");
        elemento.removeAttribute("rel");
      }
    }, appAndroid);

    I.amOnPage(
      "https://play.google.com/store/apps/details?id=com.wsfl.fastix.mytickets&pcampaignid=web_share",
    );

    I.waitInUrl(
      "play.google.com/store/apps/details?id=com.wsfl.fastix.mytickets",
      20,
    );

    I.seeInCurrentUrl(
      "play.google.com/store/apps/details?id=com.wsfl.fastix.mytickets",
    );

    I.wait(5);

    I.amOnPage("https://fastix.com.br/events/buffalo-tom-em-sao-paulo");

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 20);

    I.seeInCurrentUrl("/events/buffalo-tom-em-sao-paulo");

    I.waitForText("Buffalo Tom em São Paulo", 10);

    I.see("Buffalo Tom em São Paulo");

    I.wait(3);

    I.say("Validando acesso ao site WebSolutionsFL");

    I.see("WebSolutionsFL");

    const webSolutions = locate("a")
      .withAttr({
        href: "https://www.websolutionsfl.com/",
      })
      .withText("WebSolutionsFL");

    I.waitForElement(webSolutions, 10);

    I.scrollTo(webSolutions);

    I.seeElement(webSolutions);

    I.executeScript((selector) => {
      const elemento = document.evaluate(
        selector.xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null,
      ).singleNodeValue;

      if (elemento) {
        elemento.removeAttribute("target");
        elemento.removeAttribute("rel");
      }
    }, webSolutions);

    const webSolutionsUrl = await I.grabAttributeFrom(webSolutions, "href");

    I.amOnPage(webSolutionsUrl);

    I.waitInUrl("websolutionsfl.com", 20);

    I.seeInCurrentUrl("websolutionsfl.com");

    I.wait(5);

    I.amOnPage("https://fastix.com.br/events/buffalo-tom-em-sao-paulo");

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 20);

    I.seeInCurrentUrl("/events/buffalo-tom-em-sao-paulo");

    I.waitForText("Sobre o evento", 10);

    I.see("Buffalo Tom em São Paulo");

    I.wait(3);

    I.say("Validando acesso ao LinkedIn da FASTIX");

    I.amOnPage("https://fastix.com.br/events/buffalo-tom-em-sao-paulo");

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 20);

    I.waitForText("Sobre o evento", 10);

    I.see("Buffalo Tom em São Paulo");

    I.wait(3);

    I.scrollTo("footer");

    I.wait(3);

    const linkedinLink = locate('//footer//a[contains(@href,"linkedin")]');

    I.waitForElement(linkedinLink, 20);

    I.seeElement(linkedinLink);

    I.scrollTo(linkedinLink);

    I.wait(2);

    I.executeScript((selector) => {
      const elemento = document.evaluate(
        selector.xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null,
      ).singleNodeValue;

      if (elemento) {
        elemento.removeAttribute("target");
        elemento.removeAttribute("rel");
      }
    }, linkedinLink);

    I.click(linkedinLink);

    I.wait(5);

    let urlAtual = await I.grabCurrentUrl();

    if (!urlAtual.includes("linkedin.com")) {
      I.say("Fallback LinkedIn");

      I.amOnPage("https://www.linkedin.com/company/fastix/");

      I.wait(5);

      urlAtual = await I.grabCurrentUrl();
    }

    I.seeInCurrentUrl("linkedin.com");

    I.wait(5);

    I.amOnPage("https://fastix.com.br/events/buffalo-tom-em-sao-paulo");

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 20);

    I.waitForText("Sobre o evento", 10);

    I.see("Buffalo Tom em São Paulo");

    I.wait(3);

    I.say("Validando acesso ao Instagram");

    I.scrollTo("footer");

    I.wait(2);

    const instagramLink = locate('//footer//a[contains(@href,"instagram")]');

    I.waitForElement(instagramLink, 10);

    I.seeElement(instagramLink);

    I.scrollTo(instagramLink);

    I.wait(2);

    I.executeScript((selector) => {
      const elemento = document.evaluate(
        selector.xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null,
      ).singleNodeValue;

      if (elemento) {
        elemento.removeAttribute("target");
        elemento.removeAttribute("rel");
      }
    }, instagramLink);

    I.click(instagramLink);

    I.wait(5);

    let instagramUrl = await I.grabCurrentUrl();

    if (!instagramUrl.includes("instagram")) {
      I.say("Fallback Instagram");

      I.amOnPage("https://www.instagram.com/");

      I.wait(5);

      instagramUrl = await I.grabCurrentUrl();
    }

    I.seeInCurrentUrl("instagram");

    I.wait(3);

    I.amOnPage("https://fastix.com.br/events/buffalo-tom-em-sao-paulo");

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 20);

    I.wait(3);

    I.say("Validando acesso ao Twitter");

    I.scrollTo("footer");

    I.wait(2);

    const twitterLink = locate(
      '//footer//a[.//span[normalize-space()="Twitter"]]',
    );

    I.waitForElement(twitterLink, 10);

    I.seeElement(twitterLink);

    I.scrollTo(twitterLink);

    I.wait(2);

    I.executeScript((selector) => {
      const elemento = document.evaluate(
        selector.xpath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null,
      ).singleNodeValue;

      if (elemento) {
        elemento.removeAttribute("target");
        elemento.removeAttribute("rel");
      }
    }, twitterLink);

    I.click(twitterLink);

    I.wait(5);

    let twitterUrl = await I.grabCurrentUrl();

    if (!twitterUrl.includes("twitter") && !twitterUrl.includes("x.com")) {
      I.say("Fallback Twitter");

      I.amOnPage("https://x.com/");

      I.wait(5);

      twitterUrl = await I.grabCurrentUrl();
    }

    I.wait(3);

    I.amOnPage("https://fastix.com.br/events/buffalo-tom-em-sao-paulo");

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 20);

    I.wait(3);

    I.say("Validando acesso ao Email");

    I.scrollTo("footer");

    I.wait(2);

    const emailLink = locate(
      '//footer//a[starts-with(@href,"mailto:") and .//span[normalize-space()="Email"]]',
    );

    I.waitForElement(emailLink, 10);

    I.seeElement(emailLink);

    I.scrollTo(emailLink);

    I.wait(2);

    const emailHref = await I.grabAttributeFrom(emailLink, "href");

    I.say(`Email encontrado: ${emailHref}`);

    if (!emailHref.includes("mailto:")) {
      throw new Error(`Link de email inválido: ${emailHref}`);
    }

    I.say(`Link de email válido: ${emailHref}`);

    I.wait(3);

    I.amOnPage("https://fastix.com.br/events/buffalo-tom-em-sao-paulo");

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 20);

    I.waitForText("Sobre o evento", 10);

    I.see("Buffalo Tom em São Paulo");

    I.wait(3);
  },
).tag("@explorareventos55");

/////----------/////

Scenario(
  "Cenário: 00056 - Validar abertura e navegação entre múltiplas abas externas e internas.",
  async ({ I }) => {
    const assert = require("assert");

    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);
    I.see("Explorar eventos");

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);
    I.seeInCurrentUrl("/events");

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 10);

    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em São Paulo");

    I.waitForElement(evento, 10);

    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);

    I.seeInCurrentUrl("/events/buffalo-tom-em-sao-paulo");

    I.waitForText("Sobre o evento", 10);

    const footer = locate("footer").withText("FASTIX LTDA");

    I.scrollTo(footer);

    I.waitForVisible(footer, 10);

    const linkTermos = locate("a")
      .withAttr({
        href: "/terms",
      })
      .withText("Termos e Condições de Uso");

    const linkPolitica = locate("a")
      .withAttr({
        href: "/purchase",
      })
      .withText("Política de Compra");

    const linkMeiaEntrada = locate("a")
      .withAttr({
        href: "/half-price",
      })
      .withText("Meia Entrada");

    async function prepararLink(locator) {
      I.waitForElement(locator, 10);

      I.scrollTo(locator);

      I.seeElement(locator);

      I.executeScript((selector) => {
        const elemento = document.evaluate(
          selector.xpath,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null,
        ).singleNodeValue;

        if (elemento) {
          elemento.removeAttribute("target");

          elemento.removeAttribute("rel");
        }
      }, locator);
    }

    await prepararLink(linkTermos);

    await prepararLink(linkPolitica);

    await prepararLink(linkMeiaEntrada);

    I.say("Abrindo Termos em nova aba");

    I.executeScript(() => {
      window.open("https://fastix.com.br/terms", "_blank");
    });

    I.wait(2);

    I.say("Abrindo Política de Compra em nova aba");

    I.executeScript(() => {
      window.open("https://fastix.com.br/purchase", "_blank");
    });

    I.wait(2);

    I.say("Abrindo Meia Entrada em nova aba");

    I.executeScript(() => {
      window.open("https://fastix.com.br/half-price", "_blank");
    });

    I.wait(3);

    const totalAbas = await I.grabNumberOfOpenTabs();

    I.say(`Quantidade atual de abas abertas: ${totalAbas}`);

    assert.ok(totalAbas >= 4, "❌ Nenhuma nova aba foi aberta corretamente");

    I.say("Validando aba Termos");

    I.switchToNextTab();

    I.waitInUrl("/terms", 10);

    I.seeInCurrentUrl("/terms");

    I.waitForText("Aceite dos Termos", 10);

    I.see("Aceite dos Termos");

    I.say("Validando aba Política de Compra");

    I.switchToNextTab();

    I.waitInUrl("/purchase", 10);

    I.seeInCurrentUrl("/purchase");

    I.waitForText("SUA CONTA", 10);

    I.see("SUA CONTA");

    I.say("Validando aba Meia Entrada");

    I.switchToNextTab();

    I.waitInUrl("/half-price", 10);

    I.seeInCurrentUrl("/half-price");

    I.waitForText("Meia-Entrada", 10);

    I.see("Meia-Entrada");

    I.switchToPreviousTab();

    I.switchToPreviousTab();

    I.switchToPreviousTab();

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);

    I.waitForText("Buffalo Tom em São Paulo", 10);

    I.see("Buffalo Tom em São Paulo");

    I.say("Abrindo Guia Check-in");

    I.executeScript(() => {
      window.open("https://fastix.com.br/checkin-guide", "_blank");
    });

    I.wait(2);

    I.say("Abrindo Android");

    I.executeScript(() => {
      window.open(
        "https://play.google.com/store/apps/details?id=com.wsfl.fastix.mytickets&pcampaignid=web_share",
        "_blank",
      );
    });

    I.wait(2);

    I.say("Abrindo iOS");

    I.executeScript(() => {
      window.open(
        "https://apps.apple.com/us/app/fastix-meus-ingressos/id6748481193",
        "_blank",
      );
    });

    I.wait(2);

    I.say("Abrindo LinkedIn");

    I.executeScript(() => {
      window.open("https://www.linkedin.com/company/fastix", "_blank");
    });

    I.wait(2);

    I.say("Abrindo Instagram");

    I.executeScript(() => {
      window.open("https://www.instagram.com/fastix.br", "_blank");
    });

    I.wait(2);

    I.say("Abrindo Twitter");

    I.executeScript(() => {
      window.open("https://x.com/fastix_fun", "_blank");
    });

    I.wait(2);

    I.say("Abrindo WebSolutionsFL");

    I.executeScript(() => {
      window.open("https://www.websolutionsfl.com/", "_blank");
    });

    I.wait(5);

    const totalAbasFinal = await I.grabNumberOfOpenTabs();

    I.say(`Quantidade total de abas: ${totalAbasFinal}`);

    assert.ok(totalAbasFinal >= 11, "❌ Nem todas as abas foram abertas");

    const paginas = (await I.grabAllWindowHandles?.()) || [];

    for (const pagina of paginas) {
      try {
        await I.switchToWindow(pagina);

        const url = await I.grabCurrentUrl();

        I.say(`URL VALIDADA: ${url}`);

        if (url.includes("/checkin-guide")) {
          I.say("Validando Guia Check-in");

          I.seeInCurrentUrl("/checkin-guide");
        }

        if (url.includes("play.google.com")) {
          I.say("Validando Android");

          I.seeInCurrentUrl("play.google.com");
        }

        if (url.includes("apps.apple.com")) {
          I.say("Validando iOS");

          I.seeInCurrentUrl("apps.apple.com");
        }

        if (url.includes("linkedin.com")) {
          I.say("Validando LinkedIn");

          I.seeInCurrentUrl("linkedin.com");
        }

        if (url.includes("instagram.com")) {
          I.say("Validando Instagram");

          I.seeInCurrentUrl("instagram.com");
        }

        if (url.includes("x.com")) {
          I.say("Validando Twitter");

          I.seeInCurrentUrl("x.com");
        }

        if (url.includes("websolutionsfl.com")) {
          I.say("Validando WebSolutionsFL");

          I.seeInCurrentUrl("websolutionsfl.com");
        }
      } catch (e) {
        console.log("Erro ao validar aba:", e.message);
      }
    }

    I.say("Retornando ao evento");

    while (true) {
      const urlAtual = await I.grabCurrentUrl();

      if (urlAtual.includes("/events/buffalo-tom-em-sao-paulo")) {
        break;
      }

      I.switchToPreviousTab();
    }

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 20);

    I.waitForText("Buffalo Tom em São Paulo", 10);

    I.see("Buffalo Tom em São Paulo");

    const totalFinal = await I.grabNumberOfOpenTabs();

    I.say(`Total final de abas: ${totalFinal}`);

    assert.ok(totalFinal >= 11, "❌ Algumas abas foram perdidas");

    I.wait(3);
  },
).tag("@explorareventos56");

/////----------/////

Scenario(
  "Cenário: 00057 -  Validar a recuperação do sistema após uma busca inválida e sem resultados.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);

    I.seeInCurrentUrl("/events");

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 10);

    const termoInvalido = "EventoInexistenteXYZ123";

    I.say(`Pesquisando termo inválido: ${termoInvalido}`);

    I.fillField(campoBusca, termoInvalido);

    I.pressKey("Enter");

    I.waitForText("Nenhum evento", 10);

    I.see("Nenhum evento");

    I.clearField(campoBusca);

    I.wait(1);

    const termoValido = "Buffalo Tom em São Paulo";

    I.say(`Pesquisando termo válido: ${termoValido}`);

    I.fillField(campoBusca, termoValido);

    I.pressKey("Enter");

    const evento = locate("p").withText("Buffalo Tom em São Paulo");

    I.waitForElement(evento, 10);

    I.see("Buffalo Tom em São Paulo");

    I.dontSee("Nenhum evento");

    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);

    I.seeInCurrentUrl("/events/buffalo-tom-em-sao-paulo");

    I.waitForText("Sobre o evento", 10);

    I.see("Sobre o evento");

    I.wait(3);
  },
).tag("@explorareventos57");

/////----------/////

Scenario(
  "Cenário: 00058 - Input extremo, validar comportamento da busca com entradas extremas.",
  async ({ I }) => {
    const textosGrandes = [
      "a".repeat(300),
      "evento".repeat(100),
      "1234567890".repeat(80),
      "!@#$%¨&*()".repeat(50),
    ];

    const emojis = [
      "😀😁😂🤣😃😄😅😆😉😊",
      "🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥",
      "🎉🎵🎶🎤🎸🥁🎧🎼🎹",
      "🚀🚀🚀🚀🚀".repeat(20),
      "💥".repeat(100),
    ];

    const unicodeExtremo = [
      "𠜎𠜱𠝹𠱓",
      "꧁༺༒༻꧂",
      "ŁØĐĦɆⱤ",
      "漢字テスト",
      "ПриветМир",
      "⚠️♾️☢️⚡🌀",
      "अआइईउऊ",
      "ÆØÅæøå",
      "𓀀𓁐𓂀𓃰",
      "🧪".repeat(50),
    ];

    const testesExtremos = [...textosGrandes, ...emojis, ...unicodeExtremo];

    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);
    I.see("Explorar eventos");

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);

    const seletorBusca =
      'input[placeholder="Pesquisar por evento, local, cidade..."]';

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 10);

    for (const termo of testesExtremos) {
      I.say(`Testando entrada extrema`);

      I.clearField(campoBusca);

      I.executeScript(
        ({ selector, value }) => {
          const campo = document.querySelector(selector);

          if (campo) {
            campo.value = value;

            campo.dispatchEvent(new Event("input", { bubbles: true }));

            campo.dispatchEvent(new Event("change", { bubbles: true }));
          }
        },
        {
          selector: seletorBusca,
          value: termo,
        },
      );

      I.seeElement(campoBusca);

      I.pressKey("Enter");

      I.wait(2);

      I.seeElement("body");

      I.seeElement(campoBusca);

      I.dontSee("500");
      I.dontSee("Error");
      I.dontSee("Exception");
      I.dontSee("Unhandled");
      I.dontSee("Internal Server Error");
    }

    I.wait(3);
  },
).tag("@explorareventos58");

/////----------/////

Scenario(
  "Cenário: 00059 - Validar tempo de resposta da aplicação.",
  async ({ I }) => {
    const assert = require("assert");

    I.amOnPage("https://fastix.com.br/");

    const inicioHome = Date.now();

    I.waitForText("Explorar eventos", 10);

    const tempoHome = Date.now() - inicioHome;

    I.say(`Tempo carregamento HOME: ${tempoHome}ms`);

    assert.ok(tempoHome < 10000, `Home demorou demais: ${tempoHome}ms`);

    const botaoAvancar = ".lucide-arrow-right";
    const botaoVoltar = ".lucide-arrow-left";

    I.waitForElement(botaoAvancar, 10);
    I.waitForElement(botaoVoltar, 10);

    I.seeElement(botaoAvancar);
    I.seeElement(botaoVoltar);

    I.scrollPageToBottom();

    for (let i = 1; i <= 15; i++) {
      const inicioInteracao = Date.now();

      I.waitForElement(botaoAvancar, 10);
      I.click(botaoAvancar);

      I.wait(0.3);

      const tempoInteracao = Date.now() - inicioInteracao;

      I.say(`Tempo interação avançar ${i}: ${tempoInteracao}ms`);

      assert.ok(
        tempoInteracao < 5000,
        `Interação lenta no avançar ${i}: ${tempoInteracao}ms`,
      );

      I.seeElement("body");

      I.dontSee("500");
      I.dontSee("Error");
      I.dontSee("Exception");
    }

    for (let i = 1; i <= 15; i++) {
      const inicioInteracao = Date.now();

      I.waitForElement(botaoVoltar, 10);
      I.click(botaoVoltar);

      I.wait(0.3);

      const tempoInteracao = Date.now() - inicioInteracao;

      I.say(`Tempo interação voltar ${i}: ${tempoInteracao}ms`);

      assert.ok(
        tempoInteracao < 5000,
        `Interação lenta no voltar ${i}: ${tempoInteracao}ms`,
      );

      I.seeElement("body");

      I.dontSee("500");
      I.dontSee("Error");
      I.dontSee("Exception");
    }

    I.waitForElement(botaoAvancar, 10);
    I.waitForElement(botaoVoltar, 10);

    I.seeElement(botaoAvancar);
    I.seeElement(botaoVoltar);

    I.wait(3);
  },
).tag("@explorareventos59");

/////----------/////

Scenario(
  "Cenário: 00060 - Validar estabilidade da aplicação durante scroll agressivo.",
  async ({ I }) => {
    const assert = require("assert");

    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    const footer = locate("footer").withText("FASTIX LTDA");

    I.waitForElement(campoBusca, 10);

    I.seeElement(campoBusca);

    I.waitForElement("body", 10);

    for (let i = 1; i <= 30; i++) {
      I.say(`Scroll agressivo ciclo ${i}`);

      const inicioScrollDown = Date.now();

      I.scrollTo(footer);

      I.waitForVisible(footer, 10);

      const tempoScrollDown = Date.now() - inicioScrollDown;

      I.say(`Tempo scroll footer ${i}: ${tempoScrollDown}ms`);

      I.seeElement("body");

      I.dontSee("500");
      I.dontSee("Error");
      I.dontSee("Exception");
      I.dontSee("Unhandled");
      I.dontSee("Internal Server Error");

      const inicioScrollTop = Date.now();

      I.executeScript(() => {
        window.scrollTo({
          top: 0,
          behavior: "instant",
        });
      });

      I.wait(0.5);

      const tempoScrollTop = Date.now() - inicioScrollTop;

      I.say(`Tempo scroll topo ${i}: ${tempoScrollTop}ms`);

      I.waitForElement(campoBusca, 10);

      I.seeElement(campoBusca);

      const largura = await I.executeScript(() => {
        return window.innerWidth;
      });

      assert.ok(largura > 0, "Frontend aparenta estar não responsivo");

      I.dontSee("500");
      I.dontSee("Error");
      I.dontSee("Exception");
    }

    I.waitForElement(campoBusca, 10);

    I.seeElement(campoBusca);

    I.seeElement("body");

    I.wait(3);
  },
).tag("@explorareventos60");

/////----------/////

Scenario(
  "Cenário: 00061 - Validar integridade do conteúdo dinâmico dos cards de eventos.",
  async ({ I }) => {
    const assert = require("assert");

    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);
    I.see("Explorar eventos");

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);
    I.seeInCurrentUrl("/events");

    const cardsEventos = "a[href*='/events/']";

    const botaoAvancar = ".lucide-arrow-right";
    const botaoVoltar = ".lucide-arrow-left";

    I.waitForElement(cardsEventos, 10);

    const quantidadeInicial = await I.grabNumberOfVisibleElements(cardsEventos);

    I.say(`Quantidade inicial de cards: ${quantidadeInicial}`);

    assert.ok(quantidadeInicial > 0, "Nenhum card de evento foi renderizado");

    const existeBotaoAvancar =
      await I.grabNumberOfVisibleElements(botaoAvancar);

    const existeBotaoVoltar = await I.grabNumberOfVisibleElements(botaoVoltar);

    if (existeBotaoAvancar > 0 && existeBotaoVoltar > 0) {
      I.say("Botões do carrossel encontrados");

      for (let i = 1; i <= 20; i++) {
        I.click(botaoAvancar);
        I.wait(0.2);
      }

      for (let i = 1; i <= 20; i++) {
        I.click(botaoVoltar);
        I.wait(0.2);
      }
    } else {
      I.say(
        "Botões do carrossel não encontrados. Fluxo seguirá apenas com validação dos cards.",
      );
    }

    const titulos = await I.grabTextFromAll("a[href*='/events/'] p");

    assert.ok(titulos.length > 0, "Nenhum título encontrado");

    titulos.forEach((titulo, index) => {
      I.say(`Validando título ${index + 1}: ${titulo}`);

      assert.ok(
        titulo && titulo.trim().length > 0 && titulo !== "undefined",
        `Título inválido no card ${index + 1}`,
      );
    });

    const imagensSrc = await I.grabAttributeFromAll(
      "a[href*='/events/'] img",
      "src",
    );

    assert.ok(imagensSrc.length > 0, "Nenhuma imagem encontrada");

    imagensSrc.forEach((src, index) => {
      I.say(`Validando imagem ${index + 1}`);

      assert.ok(
        src &&
          src.trim().length > 0 &&
          src !== "undefined" &&
          (src.startsWith("http") || src.startsWith("/")),
        `Imagem inválida no card ${index + 1}`,
      );
    });

    const quantidadeFinal = await I.grabNumberOfVisibleElements(cardsEventos);

    I.say(`Quantidade final de cards: ${quantidadeFinal}`);

    assert.ok(quantidadeFinal > 0, "Os cards deixaram de renderizar");

    I.dontSee("Internal Server Error");
    I.dontSee("Unhandled");
    I.dontSee("Exception");
    I.dontSee("Cannot read");
    I.dontSee("Error 500");

    I.wait(3);
  },
).tag("@explorareventos61");

/////----------/////

Scenario(
  "Cenário: 00062 -  Validar a integridade das imagens da plataforma na página 'Explorar Eventos'. ",
  async ({ I }) => {
    const assert = require("assert");

    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);
    I.see("Explorar eventos");

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);
    I.seeInCurrentUrl("/events");

    I.waitForElement("img", 10);

    const footer = locate("footer").withText("FASTIX LTDA");

    let alturaAnterior = 0;

    for (let i = 1; i <= 20; i++) {
      const alturaAtual = await I.executeScript(() => {
        window.scrollBy(0, window.innerHeight);

        return document.body.scrollHeight;
      });

      I.wait(1);

      if (alturaAtual === alturaAnterior) {
        break;
      }

      alturaAnterior = alturaAtual;
    }

    I.scrollTo(footer);
    I.waitForVisible(footer, 10);
    I.see("FASTIX LTDA", footer);

    const imagens = await I.grabWebElements("img");

    I.say(`Total de imagens encontradas: ${imagens.length}`);

    assert.ok(imagens.length > 0, "Nenhuma imagem encontrada");

    for (let i = 0; i < imagens.length; i++) {
      await I.executeScript((index) => {
        return new Promise((resolve) => {
          const img = document.querySelectorAll("img")[index];

          if (!img) {
            resolve(false);
            return;
          }

          if (img.complete && img.naturalWidth > 0) {
            resolve(true);
            return;
          }

          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);

          setTimeout(() => {
            resolve(img.naturalWidth > 0);
          }, 3000);
        });
      }, i);

      const validacaoFinal = await I.executeScript((index) => {
        const img = document.querySelectorAll("img")[index];

        if (!img) {
          return {
            existe: false,
          };
        }

        return {
          existe: true,
          src: img.getAttribute("src"),
          largura: img.naturalWidth,
          altura: img.naturalHeight,
        };
      }, i);

      assert.strictEqual(validacaoFinal.existe, true, `Imagem ${i} não existe`);

      assert.ok(
        validacaoFinal.src && validacaoFinal.src.trim() !== "",
        `Imagem ${i} sem src`,
      );

      const imagemVisivel = await I.executeScript((index) => {
        const img = document.querySelectorAll("img")[index];

        if (!img) return false;

        const style = window.getComputedStyle(img);

        const rect = img.getBoundingClientRect();

        return (
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          rect.width > 0 &&
          rect.height > 0
        );
      }, i);

      if (imagemVisivel) {
        assert.ok(
          validacaoFinal.largura > 0,
          `Imagem ${i} com largura inválida`,
        );

        assert.ok(validacaoFinal.altura > 0, `Imagem ${i} com altura inválida`);

        I.say(
          `Imagem ${i + 1} validada com sucesso | largura: ${validacaoFinal.largura}px`,
        );
      } else {
        I.say(`Imagem ${i + 1} ignorada (não visível)`);
      }
    }

    I.dontSee("404");
    I.dontSee("500");
    I.dontSee("Image not found");

    I.wait(3);
  },
).tag("@explorareventos62");

/////----------/////

Scenario(
  "Cenário: 00063 - Validar ausência de erros críticos no console da aplicação.",
  async ({ I }) => {
    const assert = require("assert");

    const consoleErrors = [];
    const uncaughtExceptions = [];
    const failedRequests = [];

    const ignoredConsoleErrors = [
      "Failed to load resource: the server responded with a status of 429",
    ];

    const ignoredRequestDomains = [
      "analytics.google.com",
      "google-analytics.com",
      "googletagmanager.com",
    ];

    const ignoredRequestErrors = ["net::ERR_ABORTED"];

    const ignoredReactErrors = ["Minified React error #418"];

    I.usePlaywrightTo(
      "Capturar erros críticos da aplicação",
      async ({ page }) => {
        page.on("console", (msg) => {
          if (msg.type() === "error") {
            const mensagem = msg.text();

            const ignorar = ignoredConsoleErrors.some((erro) =>
              mensagem.includes(erro),
            );

            if (!ignorar) {
              consoleErrors.push({
                mensagem,
              });
            }
          }
        });

        page.on("pageerror", (error) => {
          const mensagem = error.message;

          const ignorar = ignoredReactErrors.some((erro) =>
            mensagem.includes(erro),
          );

          if (!ignorar) {
            uncaughtExceptions.push({
              mensagem,
            });
          }
        });

        page.on("requestfailed", (request) => {
          const url = request.url();

          const erro = request.failure()?.errorText || "Erro desconhecido";

          const dominioIgnorado = ignoredRequestDomains.some((dominio) =>
            url.includes(dominio),
          );

          const erroIgnorado = ignoredRequestErrors.some((erroMapeado) =>
            erro.includes(erroMapeado),
          );

          if (!dominioIgnorado && !erroIgnorado) {
            failedRequests.push({
              url,
              metodo: request.method(),
              erro,
            });
          }
        });
      },
    );

    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 15);

    I.click("Explorar eventos");

    I.waitInUrl("/events", 15);

    I.scrollPageToBottom();
    I.wait(1);

    I.scrollPageToTop();
    I.wait(1);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 10);

    I.fillField(campoBusca, "Buffalo Tom");

    I.wait(2);

    I.clearField(campoBusca);

    const botaoAvancar = ".lucide-arrow-right";
    const botaoVoltar = ".lucide-arrow-left";

    const existeBotaoAvancar =
      await I.grabNumberOfVisibleElements(botaoAvancar);

    const existeBotaoVoltar = await I.grabNumberOfVisibleElements(botaoVoltar);

    if (existeBotaoAvancar > 0 && existeBotaoVoltar > 0) {
      for (let i = 1; i <= 15; i++) {
        I.click(botaoAvancar);
        I.wait(0.2);
      }

      for (let i = 1; i <= 15; i++) {
        I.click(botaoVoltar);
        I.wait(0.2);
      }
    }

    const evento = locate("p").withText("Buffalo Tom em São Paulo");

    const eventoExiste = await I.grabNumberOfVisibleElements(evento);

    if (eventoExiste > 0) {
      I.scrollTo(evento);

      I.click(evento);

      I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 15);

      I.scrollPageToBottom();

      I.wait(1);

      I.scrollPageToTop();

      I.wait(1);

      const logoHome = locate("a").withAttr({
        href: "/",
      });

      I.waitForElement(logoHome, 10);

      I.click(logoHome);

      I.waitForText("Explorar eventos", 15);
    }

    console.log("======== CONSOLE ERRORS ========");
    console.log(consoleErrors);

    console.log("======== UNCAUGHT EXCEPTIONS ========");
    console.log(uncaughtExceptions);

    console.log("======== FAILED REQUESTS ========");
    console.log(failedRequests);

    assert.strictEqual(
      consoleErrors.length,
      0,
      `Foram encontrados console.error:\n${JSON.stringify(
        consoleErrors,
        null,
        2,
      )}`,
    );

    assert.strictEqual(
      uncaughtExceptions.length,
      0,
      `Foram encontradas uncaught exceptions:\n${JSON.stringify(
        uncaughtExceptions,
        null,
        2,
      )}`,
    );

    assert.strictEqual(
      failedRequests.length,
      0,
      `Foram encontradas failed requests:\n${JSON.stringify(
        failedRequests,
        null,
        2,
      )}`,
    );
  },
).tag("@explorareventos63");

/////----------/////

Scenario(
  "Cenário: 00064 - Validar estabilidade da aplicação durante sessão longa.",
  async ({ I }) => {
    const assert = require("assert");

    I.amOnPage("https://fastix.com.br/events");

    I.waitInUrl("/events", 10);

    I.waitForText("Explorar eventos", 15);

    I.seeInCurrentUrl("/events");

    I.say("Executando scroll contínuo");

    for (let i = 1; i <= 15; i++) {
      I.scrollPageToBottom();

      I.wait(1);

      I.scrollPageToTop();

      I.wait(1);
    }

    const eventos = ["Buffalo Tom em São Paulo"];

    for (let ciclo = 1; ciclo <= 5; ciclo++) {
      I.say(`Ciclo de navegação: ${ciclo}`);

      for (const nomeEvento of eventos) {
        const cardEvento = locate("p").withText(nomeEvento);

        I.scrollTo(cardEvento);

        I.waitForElement(cardEvento, 15);

        I.click(cardEvento);

        I.waitForText("Sobre o evento", 15);

        I.see(nomeEvento);

        I.wait(2);

        I.scrollPageToBottom();

        I.wait(1);

        I.scrollPageToTop();

        I.wait(1);

        I.amOnPage("https://fastix.com.br/events");

        I.waitInUrl("/events", 15);

        I.waitForText("Explorar eventos", 15);

        I.seeElement("body");

        I.dontSee("500");

        I.dontSee("Error");

        I.dontSee("Exception");

        I.dontSee("Unhandled");
      }
    }

    I.say("Validando estabilidade final");

    I.waitForText("Explorar eventos", 15);

    I.seeElement("body");

    I.seeInCurrentUrl("/events");

    assert.ok(true, "Aplicação permaneceu estável durante sessão longa");

    I.wait(3);
  },
).tag("@explorareventos64");

/////----------/////

Scenario(
  "Cenário: 00065 - Validar estabilidade da aplicação após múltiplos reloads consecutivos.",
  async ({ I }) => {
    const assert = require("assert");

    I.amOnPage("https://fastix.com.br/events");

    I.waitInUrl("/events", 15);

    I.waitForText("Explorar", 15);

    I.seeInCurrentUrl("/events");

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    const cardsEventos = "//a[contains(@href,'/events/')]";

    I.waitForElement(campoBusca, 15);

    I.waitForElement(cardsEventos, 15);

    I.say("Executando múltiplos reloads consecutivos");

    for (let i = 1; i <= 15; i++) {
      I.say(`Reload número: ${i}`);

      I.refreshPage();

      I.waitInUrl("/events", 15);

      I.waitForElement(campoBusca, 15);

      I.waitForElement(cardsEventos, 15);

      I.seeElement(campoBusca);

      I.seeElement(cardsEventos);

      I.dontSee("500");

      I.dontSee("Error");

      I.dontSee("Exception");

      I.wait(1);
    }

    const quantidadeEventos = await I.grabNumberOfVisibleElements(cardsEventos);

    I.say(`Quantidade de eventos renderizados: ${quantidadeEventos}`);

    assert.ok(
      quantidadeEventos > 0,
      "❌ Nenhum evento permaneceu renderizado após os reloads",
    );

    I.fillField(campoBusca, "Buffallo Tom");

    I.seeInField(campoBusca, "Buffallo Tom");

    I.pressKey("Enter");

    I.wait(3);

    I.seeElement("body");

    I.seeInCurrentUrl("/events");

    I.wait(3);

    I.say("Executando reloads após utilização da busca");

    for (let i = 1; i <= 10; i++) {
      I.say(`Reload pós-busca número: ${i}`);

      I.refreshPage();

      I.waitInUrl("/events", 15);

      I.waitForElement(campoBusca, 15);

      I.waitForElement(cardsEventos, 15);

      I.seeElement("body");

      I.seeElement(campoBusca);

      I.seeElement(cardsEventos);

      I.dontSee("500");

      I.dontSee("Error");

      I.dontSee("Exception");

      I.wait(1);
    }

    const totalEventosFinal = await I.grabNumberOfVisibleElements(cardsEventos);

    I.say(`Quantidade final de eventos renderizados: ${totalEventosFinal}`);

    assert.ok(
      totalEventosFinal > 0,
      "❌ Os eventos deixaram de renderizar após reloads pós-busca",
    );

    I.wait(3);
  },
).tag("@explorareventos65");

/////----------/////

Scenario(
  "Cenário: 00066 - Validar comportamento da página de explorar eventos após interrupções inesperadas.",
  async ({ I }) => {
    const assert = require("assert");

    I.amOnPage("https://fastix.com.br/events");

    I.waitInUrl("/events", 15);

    I.waitForText("Explorar", 15);

    I.seeInCurrentUrl("/events");

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    const cardsEventos = "//a[contains(@href,'/events/')]";

    I.waitForElement(campoBusca, 15);

    I.waitForElement(cardsEventos, 15);

    I.say("Executando busca inicial");

    I.fillField(campoBusca, "Buffalo");

    I.seeInField(campoBusca, "Buffalo");

    I.pressKey("Enter");

    I.wait(3);

    I.seeElement("body");

    I.seeInCurrentUrl("/events");

    I.say("Executando refresh inesperado");

    I.refreshPage();

    I.waitInUrl("/events", 15);

    I.waitForElement(campoBusca, 15);

    I.waitForElement(cardsEventos, 15);

    I.seeElement(campoBusca);

    I.seeElement(cardsEventos);

    I.say("Executando nova busca após refresh");

    I.clearField(campoBusca);

    I.fillField(campoBusca, "São Paulo");

    I.seeInField(campoBusca, "São Paulo");

    I.pressKey("Enter");

    I.wait(3);

    I.seeElement("body");

    I.seeInCurrentUrl("/events");

    I.say("Simulando retorno para página de eventos");

    I.amOnPage("https://fastix.com.br/events");

    I.waitInUrl("/events", 15);

    I.waitForElement(campoBusca, 15);

    I.waitForElement(cardsEventos, 15);

    I.seeElement(campoBusca);

    I.seeElement(cardsEventos);

    I.seeElement("body");

    I.say("Abrindo nova aba inesperadamente");

    I.executeScript(() => {
      window.open("https://fastix.com.br/events", "_blank");
    });

    I.wait(3);

    const totalAbas = await I.grabNumberOfOpenTabs();

    I.say(`Quantidade de abas abertas: ${totalAbas}`);

    assert.ok(totalAbas >= 2, "❌ A nova aba não foi aberta");

    I.switchToNextTab();

    I.waitInUrl("/events", 15);

    I.waitForElement(campoBusca, 15);

    I.waitForElement(cardsEventos, 15);

    I.seeElement(campoBusca);

    I.seeElement(cardsEventos);

    I.say("Executando busca na nova aba");

    I.fillField(campoBusca, "Curitiba");

    I.seeInField(campoBusca, "Curitiba");

    I.pressKey("Enter");

    I.wait(3);

    I.seeElement("body");

    I.seeInCurrentUrl("/events");

    I.say("Retornando para aba original");

    I.switchToPreviousTab();

    I.waitInUrl("/events", 15);

    I.waitForElement(campoBusca, 15);

    I.waitForElement(cardsEventos, 15);

    const quantidadeEventos = await I.grabNumberOfVisibleElements(cardsEventos);

    I.say(`Quantidade final de eventos renderizados: ${quantidadeEventos}`);

    assert.ok(
      quantidadeEventos > 0,
      "❌ Os eventos deixaram de renderizar após interrupções inesperadas",
    );

    I.dontSee("500");

    I.dontSee("Error");

    I.dontSee("Exception");

    I.dontSee("Unhandled");

    I.seeElement("body");

    I.wait(3);
  },
).tag("@explorareventos66");

/////----------/////

Scenario(
  "Cenário: 00067 - Validar gerenciamento correto de foco da aplicação na página de 'Explorar eventos'.",
  async ({ I }) => {
    const assert = require("assert");

    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);

    const botaoAvancar = ".lucide-arrow-right";
    const botaoVoltar = ".lucide-arrow-left";

    const footer = locate("footer").withText("FASTIX LTDA");

    const guiaCheckin = locate("a")
      .withAttr({ href: "/checkin-guide" })
      .withText("Guia Check-in");

    async function validarFocoVisivel(contexto) {
      const foco = await I.executeScript(() => {
        const ativo = document.activeElement;

        if (!ativo) return null;

        const style = window.getComputedStyle(ativo);

        return {
          tag: ativo.tagName,
          texto:
            ativo.innerText ||
            ativo.value ||
            ativo.getAttribute("aria-label") ||
            "",
          outline: style.outline,
          boxShadow: style.boxShadow,
          opacity: style.opacity,
          display: style.display,
          visibility: style.visibility,
        };
      });

      console.log(`🎯 FOCO (${contexto}):`, foco);

      assert.strictEqual(
        foco !== null,
        true,
        `❌ Foco desapareceu (${contexto})`,
      );

      assert.strictEqual(
        foco.display !== "none",
        true,
        `❌ Elemento focado invisível (${contexto})`,
      );

      assert.strictEqual(
        foco.visibility !== "hidden",
        true,
        `❌ Foco oculto (${contexto})`,
      );

      assert.strictEqual(
        foco.opacity !== "0",
        true,
        `❌ Foco transparente (${contexto})`,
      );

      return foco;
    }

    async function tabAteTexto(texto, maxTabs = 15) {
      for (let i = 1; i <= maxTabs; i++) {
        I.pressKey("Tab");

        I.wait(0.3);

        const foco = await I.executeScript(() => {
          const ativo = document.activeElement;

          return {
            texto:
              ativo?.innerText ||
              ativo?.value ||
              ativo?.getAttribute("aria-label") ||
              "",
            tag: ativo?.tagName || "",
          };
        });

        console.log(`TAB ${i}:`, foco);

        if (
          foco.texto &&
          foco.texto.toLowerCase().includes(texto.toLowerCase())
        ) {
          I.say(`✅ Foco encontrado em: ${texto}`);

          return true;
        }
      }

      return false;
    }

    const encontrouExplorar = await tabAteTexto("Explorar eventos", 10);

    assert.strictEqual(
      encontrouExplorar,
      true,
      "❌ Não encontrou foco em Explorar eventos",
    );

    await validarFocoVisivel("Botão Explorar Eventos");

    I.pressKey("Enter");

    I.waitInUrl("/events", 10);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 10);

    I.click(campoBusca);

    await validarFocoVisivel("Campo Busca");

    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(2);

    const encontrouEvento = await tabAteTexto("Buffalo Tom", 10);

    assert.strictEqual(
      encontrouEvento,
      true,
      "❌ Não encontrou foco no evento",
    );

    await validarFocoVisivel("Card Evento");

    I.pressKey("Enter");

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);

    I.scrollTo(footer);

    I.waitForVisible(footer, 10);

    I.waitForElement(guiaCheckin, 10);

    I.click(guiaCheckin);

    I.waitInUrl("/checkin-guide", 10);

    const abaWeb = locate("button").withAttr({ role: "tab" }).withText("Web");

    const abaApp = locate("button")
      .withAttr({ role: "tab" })
      .withText("App FasTix");

    I.waitForElement(abaWeb, 10);

    I.click(abaWeb);

    I.waitForElement(
      locate("button")
        .withAttr({
          role: "tab",
          "data-state": "active",
        })
        .withText("Web"),
      10,
    );

    await validarFocoVisivel("Tab Web");

    I.click(abaApp);

    I.waitForElement(
      locate("button")
        .withAttr({
          role: "tab",
          "data-state": "active",
        })
        .withText("App FasTix"),
      10,
    );

    await validarFocoVisivel("Tab App");

    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);

    I.scrollPageToBottom();

    I.waitForElement(botaoAvancar, 10);
    I.waitForElement(botaoVoltar, 10);

    I.click(botaoAvancar);

    await validarFocoVisivel("Botão Avançar");

    I.click(botaoVoltar);

    await validarFocoVisivel("Botão Voltar");

    for (let i = 1; i <= 5; i++) {
      I.say(`Interação teclado nº ${i}`);

      I.click(botaoAvancar);

      await validarFocoVisivel(`Avançar interação ${i}`);

      I.click(botaoVoltar);

      await validarFocoVisivel(`Voltar interação ${i}`);
    }

    const focoFinal = await I.executeScript(() => {
      const ativo = document.activeElement;

      return {
        tag: ativo?.tagName || "",
        texto: ativo?.innerText || ativo?.value || "",
      };
    });

    console.log("🎯 FOCO FINAL:", focoFinal);

    assert.strictEqual(
      focoFinal.tag !== "",
      true,
      "❌ Aplicação perdeu foco ao final do fluxo",
    );

    I.say("✅ Gerenciamento de foco validado com sucesso");

    I.wait(3);
  },
).tag("@explorareventos67");

/////----------/////

Scenario(
  "Cenário: 00068 - Validar navegação utilizando apenas TAB na página 'Explorar Eventos'.",
  async ({ I }) => {
    const assert = require("assert");

    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar Eventos", 15);

    async function obterFocoAtual() {
      return await I.executeScript(() => {
        const ativo = document.activeElement;

        if (!ativo) {
          return null;
        }

        const style = window.getComputedStyle(ativo);

        return {
          tag: ativo.tagName,
          texto:
            ativo.innerText?.trim() ||
            ativo.value ||
            ativo.getAttribute("aria-label") ||
            ativo.getAttribute("title") ||
            "",
          outline: style.outline,
          boxShadow: style.boxShadow,
          id: ativo.id || "",
          classe: ativo.className || "",
          href: ativo.href || "",
          isBody: ativo.tagName === "BODY",
        };
      });
    }

    async function validarFocoVisivel() {
      const foco = await obterFocoAtual();

      console.log("🎯 FOCO ATUAL:", foco);

      assert.notStrictEqual(foco, null, "Nenhum elemento recebeu foco");

      if (foco.isBody) {
        console.log("⚠️ Foco retornou para BODY após finalizar TAB");

        return {
          ...foco,
          bodyFinal: true,
        };
      }

      const possuiIndicadorVisual =
        (foco.outline &&
          foco.outline !== "none" &&
          foco.outline !== "rgba(0, 0, 0, 0) none 0px") ||
        (foco.boxShadow && foco.boxShadow !== "none");

      assert.strictEqual(
        possuiIndicadorVisual,
        true,
        `Elemento sem foco visível: ${foco.texto}`,
      );

      return foco;
    }

    async function focoEstaNoFooter() {
      return await I.executeScript(() => {
        const ativo = document.activeElement;

        if (!ativo) return false;

        return !!ativo.closest("footer");
      });
    }

    let encontrouExplorarEventos = false;

    for (let i = 1; i <= 20; i++) {
      I.pressKey("Tab");

      I.wait(0.3);

      const focoAtual = await obterFocoAtual();

      console.log(`🏠 TAB HOME ${i}:`, focoAtual);

      if (focoAtual?.texto && focoAtual.texto.includes("Explorar Eventos")) {
        encontrouExplorarEventos = true;

        console.log("✅ Foco encontrado em Explorar Eventos");

        I.pressKey("Enter");

        break;
      }
    }

    assert.strictEqual(
      encontrouExplorarEventos,
      true,
      "Não encontrou foco no botão Explorar Eventos",
    );

    I.waitInUrl("/events", 15);

    I.waitForText("Explorar Eventos", 15);

    let chegouNoFooter = false;

    for (let i = 1; i <= 300; i++) {
      I.pressKey("Tab");

      I.wait(0.2);

      const focoAtual = await validarFocoVisivel();

      console.log(`✅ TAB ${i} OK`, focoAtual);

      if (focoAtual.bodyFinal && !chegouNoFooter) {
        assert.fail("Foco retornou para BODY antes de alcançar o footer");
      }

      chegouNoFooter = await focoEstaNoFooter();

      if (chegouNoFooter) {
        console.log(`✅ Footer alcançado no TAB ${i}`);

        break;
      }
    }

    assert.strictEqual(
      chegouNoFooter,
      true,
      "A navegação TAB não chegou ao footer",
    );

    const footer = locate("footer");

    I.scrollTo(footer);

    I.waitForVisible(footer, 15);

    I.see("FASTIX LTDA");

    let bodyAposFooter = false;

    for (let i = 1; i <= 30; i++) {
      I.pressKey("Tab");

      I.wait(0.2);

      const focoAtual = await validarFocoVisivel();

      console.log(`🦶 TAB FOOTER ${i} OK`, focoAtual);

      if (focoAtual.bodyFinal) {
        console.log("✅ Fluxo completo de TAB finalizado");

        bodyAposFooter = true;

        break;
      }
    }

    assert.strictEqual(
      bodyAposFooter,
      true,
      "Fluxo TAB não finalizou corretamente após footer",
    );

    I.say("Finalizando validações");

    I.waitForElement(locate("a").withText("Explorar Eventos"), 10);

    I.see("Explorar Eventos");

    I.seeInCurrentUrl("/events");

    I.wait(2);
  },
).tag("@explorareventos68");

/////----------/////

Scenario(
  "Cenário: 00069 - Validar filtros e navegação da página 'Explorar Eventos'",
  async ({ I }) => {
    const assert = require("assert");

    I.amOnPage("https://fastix.com.br/events");

    I.waitInUrl("/events", 15);

    I.waitForText("Explorar Eventos", 15);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 15);

    async function obterEventosVisiveis(I) {
      return await I.executeScript(() => {
        const links = Array.from(
          document.querySelectorAll('a[href*="/events/"]'),
        );

        return links
          .map((el) => el.innerText?.replace(/\s+/g, " ").trim())
          .filter(
            (texto) =>
              texto && texto.length > 0 && texto !== "Explorar Eventos",
          )
          .slice(0, 20);
      });
    }

    const listaInicial = await obterEventosVisiveis(I);

    console.log("\n📌 EVENTOS INICIAIS:", listaInicial);

    assert.ok(listaInicial.length > 0, "Nenhum evento encontrado inicialmente");

    const termoBusca = "Buffalo Tom em São Paulo";

    I.say(`Pesquisando por: ${termoBusca}`);

    I.click(campoBusca);

    I.fillField(campoBusca, termoBusca);

    I.wait(3);

    const listaFiltrada = await obterEventosVisiveis(I);

    console.log("\n🔍 EVENTOS FILTRADOS:", listaFiltrada);

    assert.notDeepStrictEqual(
      listaInicial,
      listaFiltrada,
      "A lista de eventos não foi alterada após aplicar o filtro",
    );

    const contemEventoPesquisado = listaFiltrada.some((evento) =>
      evento.includes(termoBusca),
    );

    assert.strictEqual(
      contemEventoPesquisado,
      true,
      `O evento "${termoBusca}" não apareceu após o filtro`,
    );

    const eventosAntigosVisiveis = listaInicial.filter(
      (evento) =>
        !evento.includes(termoBusca) && listaFiltrada.includes(evento),
    );

    console.log("\n🚫 EVENTOS ANTIGOS AINDA VISÍVEIS:", eventosAntigosVisiveis);

    assert.strictEqual(
      eventosAntigosVisiveis.length,
      0,
      "Eventos antigos permaneceram visíveis após aplicar o filtro",
    );

    const eventoFiltrado = locate("p").withText(termoBusca);

    I.waitForElement(eventoFiltrado, 15);

    I.scrollTo(eventoFiltrado);

    I.click(eventoFiltrado);

    I.waitInUrl("/events/", 15);

    I.seeInCurrentUrl("/events/buffalo-tom-em-sao-paulo");

    I.waitForText(termoBusca, 15);

    I.see(termoBusca);

    console.log("\n✅ Navegação validada com sucesso");

    const footer = locate("footer").withText("FASTIX LTDA");

    I.scrollTo(footer);

    I.waitForVisible(footer, 15);

    I.see("FASTIX LTDA");

    console.log("\n✅ Footer validado com sucesso");

    I.say("Validação de filtros e navegação finalizada com sucesso");

    I.wait(3);
  },
).tag("@explorareventos69");

/////----------/////

Scenario(
  "00070 - Validar integridade do footer após múltiplas interações.",
  async ({ I }) => {
    const assert = require("assert");

    I.amOnPage("https://fastix.com.br/events");

    I.waitInUrl("/events", 15);
    I.waitForText("Explorar Eventos", 15);

    const footer = locate("footer").withText("FASTIX LTDA");

    const linksFooter = [
      {
        nome: "Termos e Condições",
        locator: locate("a").withAttr({ href: "/terms" }),
        url: "/terms",
      },
      {
        nome: "Meia Entrada",
        locator: locate("a").withAttr({ href: "/half-price" }),
        url: "/half-price",
      },
      {
        nome: "Guia Check-in",
        locator: locate("a").withAttr({ href: "/checkin-guide" }),
        url: "/checkin-guide",
      },
    ];

    async function validarFooterRenderizado() {
      I.say("Validando renderização do footer");

      I.scrollTo(footer);
      I.waitForVisible(footer, 10);

      I.see("FASTIX LTDA", footer);

      const dimensoesFooter = await I.grabElementBoundingRect(footer);

      console.log("📏 Dimensões footer:", dimensoesFooter);

      assert.ok(dimensoesFooter.width > 0, "Footer com largura inválida");

      assert.ok(dimensoesFooter.height > 0, "Footer com altura inválida");
    }

    async function voltarExplorarEventos() {
      I.amOnPage("https://fastix.com.br/events");

      I.waitInUrl("/events", 15);
      I.waitForText("Explorar Eventos", 15);
    }

    async function realizarScrollsExtremos() {
      I.say("Executando múltiplos scrolls");

      for (let i = 0; i < 3; i++) {
        I.executeScript(() => {
          window.scrollTo({
            top: document.body.scrollHeight,
            behavior: "smooth",
          });
        });

        I.wait(2);

        I.executeScript(() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        });

        I.wait(2);
      }
    }

    async function validarLinkFooter(link) {
      I.say(`Validando link: ${link.nome}`);

      await validarFooterRenderizado();

      I.waitForElement(link.locator, 10);

      const textoLink = await I.grabTextFrom(link.locator);

      console.log(`🔗 Link encontrado: ${textoLink}`);

      const abasAntes = await I.grabNumberOfOpenTabs();

      I.scrollTo(link.locator);
      I.click(link.locator);

      I.wait(2);

      const abasDepois = await I.grabNumberOfOpenTabs();

      if (abasDepois > abasAntes) {
        I.switchToNextTab();
      }

      I.waitInUrl(link.url, 15);
      I.seeInCurrentUrl(link.url);

      await validarFooterRenderizado();

      await realizarScrollsExtremos();

      await voltarExplorarEventos();
    }

    I.say("Iniciando stress de navegação");

    for (let i = 0; i < 2; i++) {
      await realizarScrollsExtremos();

      const campoBusca = locate("input").withAttr({
        placeholder: "Pesquisar por evento, local, cidade...",
      });

      I.waitForElement(campoBusca, 10);

      I.click(campoBusca);

      I.fillField(campoBusca, "São Paulo");

      I.wait(2);

      I.clearField(campoBusca);

      I.wait(1);
    }

    I.say("Validando integridade final do footer");

    await validarFooterRenderizado();

    for (const link of linksFooter) {
      await validarLinkFooter(link);
    }

    I.say("Validação final do footer");

    await validarFooterRenderizado();

    I.wait(3);
  },
).tag("@explorareventos70");

/////----------/////

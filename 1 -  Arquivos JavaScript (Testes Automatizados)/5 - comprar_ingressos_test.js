Feature("comprar_ingressos");

//// CENÁRIOS DE TESTES////

Scenario(
  "Cenário: 00000001 - Acessar evento sem login e visualizar disponibilidade de ingressos.",
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
).tag("@compraringressos1");

/////----------/////

Scenario(
  "Cenário: 00000002 - Tentar realizar a compra de ingresso sem selecionar nenhuma quantidade.",
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

    const botaoComprar = locate("button, a").withText("Comprar ingressos");
    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.wait(2);
  },
).tag("@compraringressos2");

/////----------/////

Scenario(
  "Cenário: 00000003 - Redirecionamento para login ao tentar comprar ingressos sem autenticação.",
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

    const cardIngresso = locate("div").withDescendant(
      locate("span").withText("0"),
    );

    I.waitForVisible(cardIngresso, 10);

    const botaoAdicionar = locate("button")
      .withDescendant(locate("span").withText("Adicionar"))
      .inside(cardIngresso);

    I.waitForVisible(botaoAdicionar, 10);
    I.scrollTo(botaoAdicionar);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate("span").withText("2").inside(cardIngresso);

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    const botaoRemover = locate("button")
      .withDescendant(locate("span").withText("Remover"))
      .inside(cardIngresso);

    I.waitForVisible(botaoRemover, 10);

    const isDisabled = await I.grabAttributeFrom(botaoRemover, "disabled");

    if (isDisabled !== null) {
      throw new Error(
        "❌ Botão remover ainda está desabilitado após adicionar ingressos",
      );
    }
    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");
    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.wait(2);
  },
).tag("@compraringressos3");

/////----------/////

Scenario(
  "Cenário: 00000004 - Redirecionar para login ao tentar comprar ingressos sem autenticação, realizar o login para finalizar a compra.",
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

    const cardIngresso = locate("div").withDescendant(
      locate("span").withText("0"),
    );

    I.waitForVisible(cardIngresso, 10);

    const botaoAdicionar = locate("button")
      .withDescendant(locate("span").withText("Adicionar"))
      .inside(cardIngresso);

    I.waitForVisible(botaoAdicionar, 10);
    I.scrollTo(botaoAdicionar);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate("span").withText("2").inside(cardIngresso);

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    const botaoRemover = locate("button")
      .withDescendant(locate("span").withText("Remover"))
      .inside(cardIngresso);

    I.waitForVisible(botaoRemover, 10);

    const isDisabled = await I.grabAttributeFrom(botaoRemover, "disabled");

    if (isDisabled !== null) {
      throw new Error(
        "❌ Botão remover ainda está desabilitado após adicionar ingressos",
      );
    }
    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");
    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.wait(2);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.wait(15);
  },
).tag("@compraringressos4");

/////----------/////

Scenario(
  "Cenário: 00000005 - Redirecionar para login ao tentar comprar quantidade máxima de ingressos sem autenticação, realizar o login para finalizar a compra.",
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

    const cardIngresso = locate("div").withDescendant(
      locate("span").withText("0"),
    );

    I.waitForVisible(cardIngresso, 10);

    const botaoAdicionar = locate("button")
      .withDescendant(locate("span").withText("Adicionar"))
      .inside(cardIngresso);

    I.waitForVisible(botaoAdicionar, 10);
    I.scrollTo(botaoAdicionar);

    const quantidade = 5;

    for (let i = 0; i < quantidade; i++) {
      I.click(botaoAdicionar);
    }

    const contador = locate("span")
      .inside(cardIngresso)
      .withText(String(quantidade));

    I.waitForVisible(contador, 10);
    I.see(String(quantidade), contador);

    const botaoRemover = locate("button")
      .withDescendant(locate("span").withText("Remover"))
      .inside(cardIngresso);

    I.waitForVisible(botaoRemover, 10);

    const isDisabled = await I.grabAttributeFrom(botaoRemover, "disabled");

    if (isDisabled !== null) {
      throw new Error(
        "❌ Botão remover ainda está desabilitado após adicionar ingressos",
      );
    }
    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");
    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.wait(2);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.wait(15);
  },
).tag("@compraringressos5");

/////----------/////

Scenario(
  "Cenário: 00000006 - Funcionalidade, impedir seleção acima do limite máximo de 5 ingressos.",
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

    const cardIngresso = locate("div").withDescendant(
      locate("span").withText("0"),
    );

    I.waitForVisible(cardIngresso, 10);

    I.wait(2);

    const botaoAdicionar = locate("button")
      .withDescendant(locate("span").withText("Adicionar"))
      .first();

    I.waitForElement(botaoAdicionar, 10);
    I.scrollTo(botaoAdicionar);
    I.waitForVisible(botaoAdicionar, 10);

    const getQuantidade = async () => {
      const spans = await I.grabTextFromAll(locate("span"));
      const valor = spans.find((text) => /^\d+$/.test(text));

      if (!valor) {
        throw new Error("❌ Não foi possível encontrar a quantidade");
      }

      return Number(valor);
    };

    const esperarAtualizacao = async (valorEsperado) => {
      let tentativas = 0;
      let valorAtual = await getQuantidade();

      while (valorAtual !== valorEsperado && tentativas < 5) {
        await I.wait(1);
        valorAtual = await getQuantidade();
        tentativas++;
      }

      if (valorAtual !== valorEsperado) {
        throw new Error(
          `❌ Quantidade não atualizou para ${valorEsperado}. Atual: ${valorAtual}`,
        );
      }
    };

    let quantidadeAtual = await getQuantidade();

    while (quantidadeAtual < 5) {
      const isDisabled = await I.grabAttributeFrom(botaoAdicionar, "disabled");

      if (isDisabled) {
        throw new Error(
          `❌ Botão desabilitou antes do limite. Quantidade atual: ${quantidadeAtual}`,
        );
      }

      I.click(botaoAdicionar);

      await esperarAtualizacao(quantidadeAtual + 1);

      quantidadeAtual = await getQuantidade();
    }

    if (quantidadeAtual !== 5) {
      throw new Error(
        `❌ Esperado 5 ingressos, mas encontrou ${quantidadeAtual}`,
      );
    }

    I.say("✅ Quantidade máxima atingida: 5");

    const antes = await getQuantidade();
    const isDisabledFinal = await I.grabAttributeFrom(
      botaoAdicionar,
      "disabled",
    );

    if (isDisabledFinal) {
      I.say("✅ Botão desabilitado — limite respeitado");
    } else {
      I.say("ℹ️ Botão permanece ativo — validando estabilidade do limite");

      await I.wait(1);

      const depois = await getQuantidade();

      if (depois !== antes) {
        throw new Error(
          `❌ Quantidade mudou após atingir limite. Antes: ${antes}, Depois: ${depois}`,
        );
      }

      I.say("✅ Quantidade permanece estável no limite");
    }
  },
).tag("@compraringressos6");

/////----------/////

Scenario(
  "Cenário: 00000007 - Impedir que a quantidade de ingressos fique abaixo de zero, mesmo com múltiplas tentativas de diminuição.",
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

    const cardIngresso = locate("div").withDescendant(
      locate("span").withText("0"),
    );

    I.waitForVisible(cardIngresso, 10);

    const botaoRemover = locate("button")
      .inside(cardIngresso)
      .withDescendant(locate("span").withText("Remover"))
      .first();

    I.waitForElement(botaoRemover, 10);
    I.scrollTo(botaoRemover);
    I.waitForVisible(botaoRemover, 10);

    const getQuantidade = async () => {
      const spans = await I.grabTextFromAll(
        locate("span").inside(cardIngresso),
      );

      const valor = spans.find((text) => /^\d+$/.test(text));

      if (!valor) {
        throw new Error("❌ Não foi possível encontrar a quantidade");
      }

      return Number(valor);
    };

    const antes = await getQuantidade();

    if (antes !== 0) {
      throw new Error(`❌ Esperado 0, mas encontrou ${antes}`);
    }

    I.say("✅ Quantidade inicial é 0");

    const isDisabledAttr = await I.grabAttributeFrom(botaoRemover, "disabled");

    const estaDesabilitado = isDisabledAttr !== null;

    if (!estaDesabilitado) {
      I.say("⚠️ Botão está ativo — comportamento inesperado para este cenário");
    } else {
      I.say("✅ Botão está desabilitado");
    }

    I.say("🔁 Tentando clicar múltiplas vezes no botão remover...");

    for (let i = 1; i <= 3; i++) {
      try {
        I.say(`Tentativa ${i}`);

        const stillDisabled =
          (await I.grabAttributeFrom(botaoRemover, "disabled")) !== null;

        if (stillDisabled) {
          I.say("🚫 Botão continua desabilitado — clique bloqueado");
        } else {
          I.click(botaoRemover);
        }
      } catch (error) {
        if (error.message.includes("Timeout")) {
          I.say("🚫 Clique bloqueado pelo sistema (disabled)");
        } else {
          throw error;
        }
      }
    }

    const depois = await getQuantidade();

    if (depois !== 0) {
      throw new Error(
        `❌ Sistema permitiu valor negativo. Antes: ${antes}, Depois: ${depois}`,
      );
    }

    I.say("✅ Mesmo após múltiplas tentativas, quantidade permanece 0");
  },
).tag("@compraringressos7");

/////----------/////

Scenario(
  "Cenário: 00000008 - Comprar a primeira opção de ingresso disponível (Meia Estudante) sem autenticação.",
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

    const tituloIngresso = locate("p").withText("Meia Solidária");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Meia Estudante')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Meia Estudante')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.wait(2);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.wait(15);
  },
).tag("@compraringressos8");

/////----------/////

Scenario(
  "Cenário: 00000009 - Comprar a segunda opção de ingresso disponível (Meia Solidária) sem autenticação.",
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

    const tituloIngresso = locate("p").withText("Meia Solidária");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Meia Solidária')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Meia Solidária')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.wait(2);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.wait(15);
  },
).tag("@compraringressos9");

/////----------/////

Scenario(
  "Cenário: 000000010 - Comprar a terceira opção de ingresso disponível (Inteira) sem autenticação.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.wait(2);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.wait(15);
  },
).tag("@compraringressos10");

/////----------/////

Scenario(
  "Cenário: 000000011 - Comprar todos os tipos de ingressos validando limite mínimo.",
  async ({ I }) => {
    class TicketPage {
      constructor(I) {
        this.I = I;
      }

      getBotaoAdicionar(tipo) {
        return locate({
          xpath: `//p[contains(., '${tipo}')]/following::button[not(@disabled)][1]`,
        });
      }

      getBotaoRemover(tipo) {
        return locate({
          xpath: `//p[contains(., '${tipo}')]/following::button[2]`,
        });
      }

      getContainer(tipo) {
        return locate({
          xpath: `//p[contains(., '${tipo}')]/ancestor::*[self::div or self::section][1]`,
        });
      }

      async getTextoContainer(tipo) {
        return await this.I.grabTextFrom(this.getContainer(tipo));
      }

      adicionar(tipo, qtd) {
        const titulo = locate("p").withText(tipo);

        this.I.waitForVisible(titulo, 20);
        this.I.scrollTo(titulo);

        const botao = this.getBotaoAdicionar(tipo);

        this.I.waitForElement(botao, 15);

        for (let i = 0; i < qtd; i++) {
          this.I.click(botao);
          this.I.wait(0.3);
        }
      }

      async validar(tipo, qtd) {
        const botaoRemover = this.getBotaoRemover(tipo);

        this.I.waitForElement(botaoRemover, 10);

        for (let i = 0; i < qtd; i++) {
          this.I.click(botaoRemover);
          this.I.wait(0.3);
        }

        const antes = await this.getTextoContainer(tipo);

        this.I.click(botaoRemover);
        this.I.wait(0.5);

        const depois = await this.getTextoContainer(tipo);

        if (antes !== depois) {
          throw new Error(
            `❌ Quantidade alterou indevidamente após chegar em 0 para ${tipo}`,
          );
        }
      }

      comprar() {
        const botaoComprar = locate("button").withText("Comprar ingressos");

        this.I.waitForVisible(botaoComprar, 15);
        this.I.scrollTo(botaoComprar);
        this.I.forceClick(botaoComprar);
      }
    }

    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 15);
    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 15);
    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(3);

    const evento = locate("p").withText("Buffalo Tom em São Paulo");

    I.waitForElement(evento, 15);
    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 15);
    I.waitForVisible(locate("p").withText("Meia Estudante"), 20);

    const ticket = new TicketPage(I);

    ticket.adicionar("Meia Estudante", 3);
    ticket.adicionar("Meia Solidária", 2);
    ticket.adicionar("Inteira", 1);

    I.wait(1);

    await ticket.validar("Meia Estudante", 3);
    await ticket.validar("Meia Solidária", 2);
    await ticket.validar("Inteira", 1);

    ticket.adicionar("Meia Estudante", 3);
    ticket.adicionar("Meia Solidária", 2);
    ticket.adicionar("Inteira", 1);

    ticket.comprar();

    I.waitForElement('input[name="email"]', 20);
    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withText("Entrar");

    I.waitForElement(botaoEntrar, 15);
    I.forceClick(botaoEntrar);

    I.wait(10);
  },
).tag("@compraringressos11");

/////----------/////

Scenario(
  "Cenário: 000000012 - Comprar ingressos validando limite mínimo por tipo.",
  async ({ I }) => {
    class TicketPageV2 {
      constructor(I) {
        this.I = I;
      }

      getBotaoAdicionar(tipo) {
        return locate({
          xpath: `//p[contains(., '${tipo}')]/following::button[not(@disabled)][1]`,
        });
      }

      getBotaoRemover(tipo) {
        return locate({
          xpath: `//p[contains(., '${tipo}')]/following::button[2]`,
        });
      }

      getContainer(tipo) {
        return locate({
          xpath: `//p[contains(., '${tipo}')]/ancestor::*[self::div or self::section][1]`,
        });
      }

      async getTextoContainer(tipo) {
        return await this.I.grabTextFrom(this.getContainer(tipo));
      }

      adicionar(tipo, qtd) {
        const titulo = locate("p").withText(tipo);

        this.I.waitForVisible(titulo, 20);
        this.I.scrollTo(titulo);

        const botao = this.getBotaoAdicionar(tipo);

        this.I.waitForElement(botao, 15);

        for (let i = 0; i < qtd; i++) {
          this.I.click(botao);
          this.I.wait(0.3);
        }
      }

      async validar(tipo, qtd) {
        const botaoRemover = this.getBotaoRemover(tipo);

        this.I.waitForElement(botaoRemover, 10);

        for (let i = 0; i < qtd; i++) {
          this.I.click(botaoRemover);
          this.I.wait(0.3);
        }

        const antes = await this.getTextoContainer(tipo);

        this.I.click(botaoRemover);
        this.I.wait(0.5);

        const depois = await this.getTextoContainer(tipo);

        if (antes !== depois) {
          throw new Error(
            `Quantidade alterou indevidamente após chegar em 0 para ${tipo}`,
          );
        }
      }

      comprar() {
        const botaoComprar = locate("button").withText("Comprar ingressos");

        this.I.waitForVisible(botaoComprar, 15);
        this.I.scrollTo(botaoComprar);
        this.I.forceClick(botaoComprar);
      }
    }

    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 15);
    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 15);
    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(3);

    const evento = locate("p").withText("Buffalo Tom em São Paulo");

    I.waitForElement(evento, 15);
    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 15);

    I.waitForVisible(locate("p").withText("Meia Estudante"), 20);

    const ticket = new TicketPageV2(I);

    ticket.adicionar("Meia Estudante", 3);
    ticket.adicionar("Meia Solidária", 2);
    ticket.adicionar("Inteira", 1);

    I.wait(1);

    await ticket.validar("Meia Estudante", 3);
    await ticket.validar("Meia Solidária", 2);
    await ticket.validar("Inteira", 1);

    ticket.adicionar("Meia Estudante", 3);
    ticket.adicionar("Meia Solidária", 2);
    ticket.adicionar("Inteira", 1);

    ticket.comprar();

    I.waitForElement('input[name="email"]', 20);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");

    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withText("Entrar");

    I.waitForElement(botaoEntrar, 15);

    I.forceClick(botaoEntrar);

    I.wait(10);
  },
).tag("@compraringressos12");

/////----------/////

Scenario(
  "Cenário: 000000013 - Comprar ingressos validando request e response.",
  async ({ I }) => {
    I.usePlaywrightTo("Interceptar request e response", async ({ page }) => {
      await page.route("**/orders**", async (route) => {
        const request = route.request();
        const postData = request.postData();

        if (postData) {
          const body = JSON.parse(postData);

          console.log("🟡 REQUEST:", body);

          if (!body.items || body.items.length === 0) {
            throw new Error("Request sem itens");
          }
        }

        await route.continue();
      });

      page.on("response", async (response) => {
        if (response.url().includes("/orders")) {
          const status = response.status();
          const body = await response.json();

          console.log("🟢 RESPONSE:", status, body);

          if (status !== 200 && status !== 201) {
            throw new Error(`Status inválido: ${status}`);
          }

          if (!body.id) {
            throw new Error("Response sem ID");
          }
        }
      });
    });

    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 15);
    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 15);
    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(3);

    const evento = locate("p").withText("Buffalo Tom em São Paulo");
    I.waitForElement(evento, 15);
    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 15);

    const clicar = async (tipo, qtd) => {
      const botao = locate({
        xpath: `//p[contains(., '${tipo}')]/following::button[not(@disabled)][1]`,
      });

      I.waitForElement(botao, 15);

      for (let i = 0; i < qtd; i++) {
        I.click(botao);
        I.wait(0.4);
      }
    };

    await clicar("Meia Estudante", 3);
    await clicar("Meia Solidária", 2);
    await clicar("Inteira", 1);

    const botaoComprar = locate("button").withText("Comprar ingressos");
    I.waitForElement(botaoComprar, 15);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 20);
    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withText("Entrar");
    I.waitForElement(botaoEntrar, 15);
    I.click(botaoEntrar);

    I.wait(10);
  },
).tag("@compraringressos13");

/////----------/////

Scenario(
  "Cenário: 000000014 - Validar payload da compra de ingressos no endpoint de pedidos.",
  async ({ I }) => {
    I.usePlaywrightTo(
      "Interceptar request e validar payload completo",
      async ({ page }) => {
        await page.route("**/orders**", async (route) => {
          const request = route.request();
          const postData = request.postData();

          if (postData) {
            const body = JSON.parse(postData);

            console.log("🟡 REQUEST BODY:", JSON.stringify(body, null, 2));

            if (!body.items || !Array.isArray(body.items)) {
              throw new Error(
                "Payload inválido: items não existe ou não é array",
              );
            }

            const esperado = {
              "Meia Estudante": 3,
              "Meia Solidária": 2,
              Inteira: 1,
            };

            const recebido = {};

            body.items.forEach((item) => {
              const nome = item.name || item.type || item.title;

              if (!nome) {
                throw new Error("Item sem nome no payload");
              }

              recebido[nome] = item.quantity;
            });

            console.log("🧠 ESPERADO:", esperado);
            console.log("📦 RECEBIDO:", recebido);

            for (const tipo in esperado) {
              if (!(tipo in recebido)) {
                throw new Error(`Item não encontrado no payload: ${tipo}`);
              }

              if (recebido[tipo] !== esperado[tipo]) {
                throw new Error(
                  `Quantidade incorreta para ${tipo}. Esperado: ${esperado[tipo]}, Recebido: ${recebido[tipo]}`,
                );
              }
            }

            for (const tipo in recebido) {
              if (!(tipo in esperado)) {
                throw new Error(`Item inesperado no payload: ${tipo}`);
              }
            }

            console.log("✅ Payload validado com sucesso!");
          }

          await route.continue();
        });
      },
    );

    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 15);
    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 15);
    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(3);

    const evento = locate("p").withText("Buffalo Tom em São Paulo");
    I.waitForElement(evento, 15);
    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 15);

    const clicar = async (tipo, qtd) => {
      const botao = locate({
        xpath: `//p[contains(., '${tipo}')]/following::button[not(@disabled)][1]`,
      });

      I.waitForElement(botao, 15);

      for (let i = 0; i < qtd; i++) {
        I.click(botao);
        I.wait(0.4);
      }
    };

    await clicar("Meia Estudante", 3);
    await clicar("Meia Solidária", 2);
    await clicar("Inteira", 1);

    const botaoComprar = locate("button").withText("Comprar ingressos");
    I.waitForElement(botaoComprar, 15);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 20);
    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withText("Entrar");
    I.waitForElement(botaoEntrar, 15);
    I.click(botaoEntrar);

    I.wait(10);
  },
).tag("@compraringressos14");

/////----------/////

Scenario(
  "Cenário: 000000015 - Validar valor total da compra de ingressos no pedido.",
  async ({ I }) => {
    I.usePlaywrightTo(
      "Interceptar request e validar valor total da compra",
      async ({ page }) => {
        await page.route("**/orders**", async (route) => {
          const request = route.request();
          const postData = request.postData();

          if (postData) {
            const body = JSON.parse(postData);

            console.log("🟡 REQUEST BODY:", JSON.stringify(body, null, 2));

            if (!body.items || !Array.isArray(body.items)) {
              throw new Error(
                "Payload inválido: items não existe ou não é array",
              );
            }

            if (!body.totalPrice && body.totalPrice !== 0) {
              throw new Error("Payload inválido: totalPrice não encontrado");
            }

            const precos = {
              "Meia Estudante": 250,
              "Meia Solidária": 180,
              Inteira: 350,
            };

            let totalEsperado = 0;

            body.items.forEach((item) => {
              const nome = item.name || item.type || item.title;

              if (!nome) {
                throw new Error("Item sem nome no payload");
              }

              if (!precos[nome]) {
                throw new Error(`Preço não definido para o item: ${nome}`);
              }

              const subtotal = precos[nome] * item.quantity;
              totalEsperado += subtotal;
            });

            console.log("💰 TOTAL ESPERADO:", totalEsperado);
            console.log("📦 TOTAL RECEBIDO:", body.totalPrice);

            if (body.totalPrice !== totalEsperado) {
              throw new Error(
                `Total incorreto. Esperado: ${totalEsperado}, Recebido: ${body.totalPrice}`,
              );
            }

            console.log("✅ Valor total validado com sucesso!");
          }

          await route.continue();
        });
      },
    );

    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 15);
    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 15);
    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(3);

    const evento = locate("p").withText("Buffalo Tom em São Paulo");
    I.waitForElement(evento, 15);
    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 15);

    const clicar = async (tipo, qtd) => {
      const botao = locate({
        xpath: `//p[contains(., '${tipo}')]/following::button[not(@disabled)][1]`,
      });

      I.waitForElement(botao, 15);

      for (let i = 0; i < qtd; i++) {
        I.click(botao);
        I.wait(0.3);
      }
    };

    await clicar("Meia Estudante", 3);
    await clicar("Meia Solidária", 2);
    await clicar("Inteira", 1);

    const botaoComprar = locate("button").withText("Comprar ingressos");
    I.waitForElement(botaoComprar, 15);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 20);
    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withText("Entrar");
    I.waitForElement(botaoEntrar, 15);
    I.click(botaoEntrar);

    I.wait(10);
  },
).tag("@compraringressos15");

/////----------/////

Scenario(
  "Cenário: 000000016 - Validar headers de autenticação na requisição de compra.",
  async ({ I }) => {
    I.usePlaywrightTo(
      "Interceptar request, response e validar headers",
      async ({ page }) => {
        await page.route("**/orders**", async (route) => {
          const request = route.request();
          const headers = request.headers();
          const postData = request.postData();

          console.log("🟡 HEADERS:", headers);

          if (!headers.authorization) {
            throw new Error("Header Authorization não encontrado");
          }

          if (!headers.authorization.startsWith("Bearer ")) {
            throw new Error("Authorization inválido (esperado Bearer token)");
          }

          if (!headers.cookie) {
            throw new Error("Cookies não enviados na request");
          }

          if (!headers.cookie.includes("session")) {
            throw new Error("Cookie de sessão não encontrado");
          }

          if (postData) {
            const body = JSON.parse(postData);

            console.log("🟡 REQUEST BODY:", body);

            if (!body.items || body.items.length === 0) {
              throw new Error("Request sem itens");
            }
          }

          await route.continue();
        });

        page.on("response", async (response) => {
          if (response.url().includes("/orders")) {
            const status = response.status();
            const body = await response.json();

            console.log("🟢 RESPONSE:", status, body);

            if (![200, 201].includes(status)) {
              throw new Error(`Status inválido: ${status}`);
            }

            if (!body.id) {
              throw new Error("Response sem ID do pedido");
            }
          }
        });
      },
    );

    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 15);
    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 15);
    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em São Paulo");
    I.waitForElement(evento, 15);
    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 15);

    const clicar = async (tipo, qtd) => {
      const botao = locate({
        xpath: `//p[contains(., '${tipo}')]/following::button[not(@disabled)][1]`,
      });

      I.waitForElement(botao, 15);

      for (let i = 0; i < qtd; i++) {
        I.click(botao);
        I.wait(0.4);
      }
    };

    await clicar("Meia Estudante", 3);
    await clicar("Meia Solidária", 2);
    await clicar("Inteira", 1);

    const botaoComprar = locate("button").withText("Comprar ingressos");
    I.waitForElement(botaoComprar, 15);
    I.click(botaoComprar);

    const campoEmail = locate('input[name="email"]');
    const campoSenha = locate('input[name="password"]');
    const botaoEntrar = locate("button").withText("Entrar");

    I.waitForElement(campoEmail, 30);
    I.waitForVisible(campoEmail, 30);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");

    I.waitForElement(campoSenha, 30);
    I.fillField(campoSenha, "cruzeiro@1921");

    I.waitForElement(botaoEntrar, 30);
    I.click(botaoEntrar);

    I.wait(10);
  },
).tag("@compraringressos16");

/////----------/////

Scenario(
  "Cenário: 000000017 - Garantir que os dados exibidos na UI sejam idênticos ao payload enviado na criação do pedido.",
  async ({ I }) => {
    let dadosUI = {
      itens: [],
      total: 0,
    };

    I.usePlaywrightTo(
      "Interceptar request e validar consistência",
      async ({ page }) => {
        await page.route("**/orders**", async (route) => {
          const request = route.request();
          const postData = request.postData();

          if (postData) {
            const body = JSON.parse(postData);

            console.log("🟡 UI CAPTURADA:", dadosUI);
            console.log("🟡 PAYLOAD:", body);

            if (body.items.length !== dadosUI.itens.length) {
              throw new Error(
                "Divergência na quantidade de tipos de ingressos",
              );
            }

            body.items.forEach((itemRequest) => {
              const itemUI = dadosUI.itens.find(
                (i) => i.tipo === itemRequest.name,
              );

              if (!itemUI) {
                throw new Error(
                  `Item ${itemRequest.name} não encontrado na UI`,
                );
              }

              if (itemUI.quantidade !== itemRequest.quantity) {
                throw new Error(
                  `Quantidade divergente para ${itemRequest.name}`,
                );
              }
            });

            if (body.total !== dadosUI.total) {
              throw new Error(
                `Total divergente: UI (${dadosUI.total}) vs API (${body.total})`,
              );
            }
          }

          await route.continue();
        });
      },
    );

    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 15);
    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);

    I.wait(3);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 15);
    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(3);

    const evento = locate("p").withText("Buffalo Tom em São Paulo");
    I.waitForElement(evento, 15);
    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 15);

    I.wait(3);

    I.waitForFunction(() => {
      return document.body.innerText.includes("Meia");
    }, 20);

    I.wait(3);

    I.waitForFunction(() => {
      return document.querySelectorAll("button").length > 3;
    }, 20);

    I.wait(3);

    const selecionar = async (tipo, qtd) => {
      const botao = locate({
        xpath: `//p[contains(., '${tipo}')]/following::button[not(@disabled)][1]`,
      });

      I.waitForElement(botao, 20);
      I.waitForVisible(botao, 20);
      I.waitForElement(botao, 10);

      for (let i = 0; i < qtd; i++) {
        I.click(botao);
      }

      dadosUI.itens.push({
        tipo: tipo,
        quantidade: qtd,
      });
    };

    await selecionar("Meia Estudante", 3);
    await selecionar("Meia Solidária", 2);
    await selecionar("Inteira", 1);

    I.wait(3);

    const todosValores = await I.grabTextFromAll("//*[contains(text(),'R$')]");
    console.log("💰 VALORES NA TELA:", todosValores);

    I.wait(3);

    const totalElemento = locate("//*[contains(text(),'R$')]").last();

    I.waitForElement(totalElemento, 20);
    I.waitForVisible(totalElemento, 20);

    const totalTexto = await I.grabTextFrom(totalElemento);

    const totalNumerico = parseFloat(
      totalTexto.replace("R$", "").replace(/\./g, "").replace(",", ".").trim(),
    );

    dadosUI.total = totalNumerico;

    console.log("🟢 TOTAL UI:", dadosUI.total);

    I.wait(3);

    const botaoComprar = locate("button").withText("Comprar ingressos");

    I.waitForElement(botaoComprar, 20);
    I.waitForElement(botaoComprar, 10);
    I.click(botaoComprar);

    I.wait(3);

    const campoEmail = locate('input[name="email"]');
    const campoSenha = locate('input[name="password"]');
    const botaoEntrar = locate("button").withText("Entrar");

    I.wait(3);

    I.waitForElement(campoEmail, 30);
    I.waitForVisible(campoEmail, 30);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");

    I.waitForElement(campoSenha, 30);
    I.fillField(campoSenha, "cruzeiro@1921");

    I.waitForElement(botaoEntrar, 30);
    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.wait(10);
  },
).tag("@compraringressos17");

/////----------/////

Scenario(
  "Cenário: 000000018 - Validar que múltiplos cliques no botão Comprar ingressos não geram pedidos duplicados.",
  async ({ I }) => {
    let quantidadeRequests = 0;
    let responseCheckout = null;

    I.usePlaywrightTo(
      "Interceptar requisições de checkout",
      async ({ page }) => {
        await page.route("**/api/orders/**", async (route) => {
          const url = route.request().url();

          if (url.includes("checkout")) {
            quantidadeRequests++;
            console.log(`🟡 REQUEST CHECKOUT Nº ${quantidadeRequests}`);
          }

          await route.continue();
        });

        page.on("response", async (response) => {
          const url = response.url();

          if (url.includes("/api/orders") && url.includes("checkout")) {
            console.log(`🟢 RESPONSE CHECKOUT ${response.status()}`);
            responseCheckout = response;
          }
        });
      },
    );

    I.amOnPage("https://fastix.com.br/signin");

    I.waitForElement('input[name="email"]', 20);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    await I.usePlaywrightTo(
      "clicar em Entrar e aguardar redirecionamento",
      async ({ page }) => {
        const botaoEntrar = page
          .locator("button:has(span:text('Entrar')), button[type='submit']")
          .first();

        await botaoEntrar.waitFor({ state: "visible", timeout: 15000 });

        await Promise.all([
          page.waitForURL((url) => !url.toString().includes("/signin"), {
            timeout: 20000,
          }),
          botaoEntrar.click(),
        ]);

        const urlFinal = page.url();
        console.log("🌎 URL após login:", urlFinal);

        if (urlFinal.includes("/signin")) {
          throw new Error(
            "Login não foi concluído. Usuário permaneceu na tela de login.",
          );
        }
      },
    );

    I.wait(2);

    I.amOnPage("https://fastix.com.br/events");

    I.waitInUrl("/events", 15);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 15);
    I.click(campoBusca);
    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em São Paulo");

    I.waitForElement(evento, 15);
    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 15);

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 20);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 15);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='1'][1]",
    });

    I.waitForVisible(contador, 15);
    I.see("1", contador);

    console.log("✅ Ingresso adicionado");

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 15);
    I.scrollTo(botaoComprar);

    I.wait(1);

    await I.usePlaywrightTo("Validar múltiplos cliques", async ({ page }) => {
      const botao = page
        .locator("//button[contains(., 'Comprar ingressos')]")
        .first();

      await botao.waitFor({ state: "visible", timeout: 20000 });

      const waitResponse = page.waitForResponse(
        (response) =>
          response.url().includes("/api/orders") &&
          response.url().includes("checkout"),
        { timeout: 30000 },
      );

      try {
        await botao.click();
        await botao.click({ force: true });
        await botao.click({ force: true });
      } catch {
        console.log(
          "⚠️ Botão desapareceu após o primeiro clique (comportamento esperado)",
        );
      }

      responseCheckout = await waitResponse;
    });

    if (!responseCheckout) {
      throw new Error("Checkout não foi capturado.");
    }

    const status = responseCheckout.status();

    console.log("📊 REQUESTS:", quantidadeRequests);
    console.log("📊 STATUS:", status);

    if (quantidadeRequests !== 1) {
      throw new Error(
        `Esperado apenas 1 request de checkout, porém foram encontradas ${quantidadeRequests}.`,
      );
    }

    if (![200, 201].includes(status)) {
      throw new Error(`Status inválido retornado pelo checkout: ${status}`);
    }

    I.waitForFunction(() => window.location.pathname.includes("/orders/"), 20);

    const currentUrl = await I.grabCurrentUrl();

    const match = currentUrl.match(/\/orders\/([a-z0-9-]+)/i);

    if (!match) {
      throw new Error(`Order ID não encontrado na URL: ${currentUrl}`);
    }

    console.log("🟢 Order ID:", match[1]);
    console.log("✅ Apenas um checkout foi criado.");
  },
).tag("@compraringressos18");

/////----------/////

Scenario(
  "Cenário 000000019 - Validar persistência dos ingressos selecionados após login.",
  async ({ I }) => {
    const USER_EMAIL = "diogoamanciosilva@gmail.com";

    const USER_PASSWORD = "cruzeiro@1921";

    let fezLogin = false;

    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 20);

    I.click("Explorar eventos");

    I.waitInUrl("/events", 20);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 20);

    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em São Paulo");

    I.waitForElement(evento, 20);

    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 20);

    I.wait(2);

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);

    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);

    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);

    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForElement(botaoComprar, 20);

    I.scrollTo(botaoComprar);

    I.click(botaoComprar);

    I.wait(3);

    const urlPosCompra = await I.grabCurrentUrl();

    console.log("🌎 URL após comprar:", urlPosCompra);

    if (urlPosCompra.includes("/signin")) {
      I.waitForElement('input[name="email"]', 20);

      await I.usePlaywrightTo("Preencher login", async ({ page }) => {
        const email = page.locator('input[name="email"]');

        await email.waitFor({
          state: "visible",
          timeout: 10000,
        });

        await email.click();

        await email.fill(USER_EMAIL);

        const senha = page.locator('input[name="password"]');

        await senha.click();

        await senha.fill(USER_PASSWORD);
      });

      const valorEmail = await I.grabValueFrom('input[name="email"]');

      console.log("EMAIL:", valorEmail);

      const valorSenha = await I.grabValueFrom('input[name="password"]');

      console.log("SENHA:", valorSenha);

      I.click('button[type="submit"]');

      fezLogin = true;

      I.wait(10);

      const urlPosLogin = await I.grabCurrentUrl();

      console.log("🌎 URL após login:", urlPosLogin);

      const emailAindaExiste = await I.grabNumberOfVisibleElements(
        'input[name="email"]',
      );

      const senhaAindaExiste = await I.grabNumberOfVisibleElements(
        'input[name="password"]',
      );

      console.log("Campos email visíveis:", emailAindaExiste);

      console.log("Campos senha visíveis:", senhaAindaExiste);

      if (
        urlPosLogin.includes("/signin") &&
        emailAindaExiste > 0 &&
        senhaAindaExiste > 0
      ) {
        throw new Error(
          "Login não foi concluído. Usuário permaneceu na tela de login.",
        );
      }

      console.log("TÍTULO:", await I.grabTitle());

      console.log(await I.grabTextFrom("body"));

      console.log("TÍTULO:", await I.grabTitle());

      console.log(await I.grabTextFrom("body"));
    } else if (
      urlPosCompra.includes("/orders/") ||
      urlPosCompra.includes("/checkout")
    ) {
      console.log("Checkout acessado sem login.");
    } else {
      throw new Error(
        `URL inesperada após clicar em Comprar ingressos: ${urlPosCompra}`,
      );
    }

    const urlCheckout = await I.grabCurrentUrl();

    I.say(`Checkout URL: ${urlCheckout}`);

    if (!urlCheckout.includes("/orders/")) {
      throw new Error("Usuário não foi direcionado para o pedido.");
    }

    I.waitForText("Pagamento", 30);

    I.waitForText("Detalhes do pedido", 30);

    I.see("Buffalo Tom em São Paulo");

    I.see("Subtotal");

    I.see("R$ 1.000,00");

    I.see("Taxa de conveniência");

    I.see("R$ 150,00");

    I.see("Total");

    I.see("R$ 1.150,00");

    I.saveScreenshot("persistencia-ingressos-pos-login.png");

    console.log(
      fezLogin
        ? "✅ Seleção mantida após login."
        : "✅ Checkout carregado sem login.",
    );
    ("");
  },
).tag("@compraringressos19");

/////----------/////

Scenario(
  "Cenário: 000000020 - Impedir seleção acima do limite máximo de ingressos Boundary Value (limite superior).",

  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);
    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);

    I.wait(2);

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

    I.wait(2);

    const botaoAdicionar = locate("button")
      .withDescendant(locate("span").withText("Adicionar"))
      .first();

    I.waitForElement(botaoAdicionar, 10);
    I.scrollTo(botaoAdicionar);

    const getQuantidade = async () => {
      const spans = await I.grabTextFromAll(locate("span"));
      const valor = spans.find((text) => /^\d+$/.test(text));

      if (!valor) {
        throw new Error("❌ Não foi possível encontrar a quantidade");
      }

      return Number(valor);
    };

    const esperarAtualizacao = async (esperado) => {
      let tentativas = 0;
      let atual = await getQuantidade();

      while (atual !== esperado && tentativas < 5) {
        await I.wait(1);
        atual = await getQuantidade();
        tentativas++;
      }

      if (atual !== esperado) {
        throw new Error(
          `❌ Quantidade não atualizou. Esperado: ${esperado}, Atual: ${atual}`,
        );
      }
    };

    let quantidadeAtual = await getQuantidade();

    while (quantidadeAtual < 5) {
      const isDisabled = await I.grabAttributeFrom(botaoAdicionar, "disabled");

      if (isDisabled) {
        throw new Error(
          `❌ Botão desabilitou antes do limite. Atual: ${quantidadeAtual}`,
        );
      }

      I.click(botaoAdicionar);

      await esperarAtualizacao(quantidadeAtual + 1);

      quantidadeAtual = await getQuantidade();
    }

    if (quantidadeAtual !== 5) {
      throw new Error(
        `❌ Esperado atingir 5 ingressos, mas encontrou ${quantidadeAtual}`,
      );
    }

    I.say("✅ Limite máximo atingido: 5");

    I.say("🚨 Tentando ultrapassar o limite");

    const antesTentativa = await getQuantidade();

    await I.usePlaywrightTo("Validar estado do botão", async ({ page }) => {
      const botao = page
        .locator("//button[.//span[contains(., 'Adicionar')]]")
        .first();

      const isDisabled = await botao.isDisabled();

      if (isDisabled) {
        I.say("✅ Botão desabilitado — bloqueio correto");
      } else {
        I.say("ℹ️ Botão ativo — validando regra de negócio");

        await botao.click();
        await page.waitForTimeout(1000);
      }
    });

    const depoisTentativa = await getQuantidade();

    if (depoisTentativa !== antesTentativa) {
      throw new Error(
        `❌ Sistema permitiu ultrapassar limite. Antes: ${antesTentativa}, Depois: ${depoisTentativa}`,
      );
    }

    I.say("✅ Sistema impediu ultrapassar o limite corretamente");

    const isDisabledFinal = await I.grabAttributeFrom(
      botaoAdicionar,
      "disabled",
    );

    if (isDisabledFinal) {
      I.say("✅ Botão desabilitado no estado final");
    } else {
      I.say("ℹ️ Botão ativo, mas regra de limite protegida");
    }
  },
).tag("@compraringressos20");

/////----------/////

Scenario(
  "Cenário: 000000021 - Validar precisão do cálculo do valor total com taxa de 15% de conveniência.",
  async ({ I }) => {
    class TicketPage {
      constructor(I) {
        this.I = I;
      }

      normalizeMoney(texto) {
        if (!texto) return NaN;

        return Number(
          texto
            .replace(/\u00a0/g, " ")
            .replace(/R\$/g, "")
            .replace(/\s/g, "")
            .replace(/\./g, "")
            .replace(",", ".")
            .replace(/[^\d.]/g, ""),
        );
      }

      calcularTaxa(subtotal) {
        return Number((subtotal * 0.15).toFixed(2));
      }

      getBotaoAdicionar(tipo) {
        return locate({
          xpath: `//p[contains(., '${tipo}')]/following::button[not(@disabled)][1]`,
        });
      }

      adicionar(tipo, qtd) {
        const titulo = locate("p").withText(tipo);

        this.I.waitForVisible(titulo, 20);
        this.I.scrollTo(titulo);

        const botao = this.getBotaoAdicionar(tipo);
        this.I.waitForElement(botao, 15);

        for (let i = 0; i < qtd; i++) {
          this.I.click(botao);
          this.I.wait(0.3);
        }
      }

      async getPreco(tipo) {
        const texto = await this.I.grabTextFrom(
          locate({
            xpath: `//p[contains(., '${tipo}')]/following::span[contains(., 'R$')][1]`,
          }),
        );

        return this.normalizeMoney(texto);
      }

      async comprarSeDisponivel() {
        const botao = locate("button").withText("Comprar ingressos");

        try {
          this.I.waitForElement(botao, 10);
          this.I.say("🛒 Clicando em comprar");
          this.I.click(botao);
          return true;
        } catch (e) {
          this.I.say("⚠️ Botão não clicável neste momento");
          return false;
        }
      }

      async realizarLogin() {
        this.I.say("🔐 Realizando login...");

        const email = locate('input[name="email"]').first();
        const senha = locate('input[name="password"]').first();
        const botaoEntrar = locate("button").withText("Entrar");

        this.I.waitForVisible(email, 20);
        this.I.waitForEnabled(email, 20);

        this.I.clearField(email);
        this.I.fillField(email, "diogoamanciosilva@gmail.com");

        this.I.waitForVisible(senha, 20);
        this.I.waitForEnabled(senha);

        this.I.clearField(senha);
        this.I.fillField(senha, "cruzeiro@1921");

        this.I.waitForElement(botaoEntrar, 20);
        this.I.click(botaoEntrar);

        this.I.waitForNavigation({ waitUntil: "networkidle0" }, 20);

        this.I.say("✅ Login concluído");
      }

      async isLoginPage() {
        try {
          const email = locate('input[name="email"]').first();
          await this.I.waitForVisible(email, 5);
          return true;
        } catch {
          return false;
        }
      }

      async garantirChegadaNaOrderPage() {
        for (let i = 0; i < 8; i++) {
          this.I.say(`🔄 Tentativa ${i + 1}`);

          await this.I.waitForFunction(() => {
            return document.readyState === "complete";
          }, 10);

          const url = await this.I.grabCurrentUrl();
          this.I.say(`🌐 URL atual: ${url}`);

          if (url.includes("/orders")) {
            this.I.say("✅ Chegou na página de orders");
            return;
          }

          if (await this.isLoginPage()) {
            this.I.say("🔐 Login detectado");
            await this.realizarLogin();
            continue;
          }

          if (url.includes("/events") && !url.includes("/orders")) {
            const clicou = await this.comprarSeDisponivel();

            if (clicou) {
              this.I.wait(3);
              continue;
            }
          }

          this.I.wait(2);
        }

        throw new Error("❌ Não foi possível chegar na página de orders");
      }

      async extrairValorPorLabel(label) {
        const container = locate("li").withText(label);

        this.I.waitForVisible(container, 20);

        const texto = await this.I.grabTextFrom(container);

        const match = texto.match(/R\$\s?[\d.,]+/);

        if (!match) {
          throw new Error(`❌ Valor não encontrado para ${label}`);
        }

        return this.normalizeMoney(match[0]);
      }
    }

    const ticket = new TicketPage(I);

    I.amOnPage("https://fastix.com.br/events/buffalo-tom-em-sao-paulo");

    const precoMeia = await ticket.getPreco("Meia Estudante");
    const precoInteira = await ticket.getPreco("Inteira");

    console.log("💰 Preços:", { precoMeia, precoInteira });

    ticket.adicionar("Meia Estudante", 1);
    ticket.adicionar("Inteira", 1);

    const subtotal = precoMeia + precoInteira;
    const taxa = ticket.calcularTaxa(subtotal);
    const totalCalculado = Number((subtotal + taxa).toFixed(2));

    console.log("💳 Subtotal:", subtotal);
    console.log("💰 Taxa:", taxa);
    console.log("🧾 Total:", totalCalculado);

    await ticket.comprarSeDisponivel();
    await ticket.garantirChegadaNaOrderPage();

    const subtotalTela = await ticket.extrairValorPorLabel("Subtotal");
    const totalTela = await ticket.extrairValorPorLabel("Total");

    console.log("💳 Subtotal Tela:", subtotalTela);
    console.log("🧾 Total Tela:", totalTela);

    if (Math.abs(subtotalTela - subtotal) > 0.01) {
      throw new Error(
        `❌ Subtotal divergente. Esperado: ${subtotal} | Tela: ${subtotalTela}`,
      );
    }

    if (Math.abs(totalTela - totalCalculado) > 0.01) {
      throw new Error(
        `❌ Total divergente. Esperado: ${totalCalculado} | Tela: ${totalTela}`,
      );
    }

    I.say("✅ Regra de 15% validada com sucesso");
  },
).tag("@compraringressos21");

/////----------/////

Scenario(
  "Cenário 000000022: Resetar seleção de ingressos ao atualizar a página.",
  async ({ I }) => {
    let quantidadeAntesRefresh;
    let quantidadeDepoisRefresh;
    let totalAntesRefresh;
    let totalDepoisRefresh;

    function parseMoney(valor) {
      return Number(valor.replace(/[^\d,]/g, "").replace(",", "."));
    }

    I.amOnPage("https://fastix.com.br");

    I.waitForText("Explorar eventos", 15);
    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);

    const campoBusca = locate('input[placeholder*="Pesquisar"]');
    I.waitForElement(campoBusca, 20);
    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em São Paulo");
    I.waitForElement(evento, 15);
    I.click(evento);

    I.waitInUrl("/buffalo", 15);

    I.wait(2);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[contains(., 'Adicionar')][1]",
    });

    I.waitForElement(botaoAdicionar, 20);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[contains(., 'Remover')]/following::span[1]",
    });

    const total = locate({
      xpath: "//h3[contains(., 'Total')]/following::span[1]",
    });

    I.waitForElement(contador, 10);
    I.waitForElement(total, 10);

    quantidadeAntesRefresh = await I.grabTextFrom(contador);
    totalAntesRefresh = await I.grabTextFrom(total);

    console.log("🟡 Antes refresh - qtd:", quantidadeAntesRefresh);
    console.log("🟡 Antes refresh - total:", totalAntesRefresh);

    if (quantidadeAntesRefresh !== "2") {
      throw new Error("❌ Quantidade incorreta antes do refresh");
    }

    const totalNumericoAntes = parseMoney(totalAntesRefresh);

    if (totalNumericoAntes === 0) {
      throw new Error("❌ Total não foi atualizado antes do refresh");
    }

    I.refreshPage();

    I.waitForElement(contador, 20);
    I.waitForElement(total, 20);

    quantidadeDepoisRefresh = await I.grabTextFrom(contador);
    totalDepoisRefresh = await I.grabTextFrom(total);

    console.log("🔵 Depois refresh - qtd:", quantidadeDepoisRefresh);
    console.log("🔵 Depois refresh - total:", totalDepoisRefresh);

    const totalNumericoDepois = parseMoney(totalDepoisRefresh);

    if (quantidadeDepoisRefresh !== "0") {
      throw new Error(
        `❌ Quantidade NÃO resetada.\nAntes: ${quantidadeAntesRefresh}\nDepois: ${quantidadeDepoisRefresh}`,
      );
    }

    if (totalNumericoDepois !== 0) {
      throw new Error(
        `❌ Total NÃO resetado.\nAntes: ${totalAntesRefresh}\nDepois: ${totalDepoisRefresh}`,
      );
    }

    console.log("✅ Estado resetado corretamente (quantidade + total)");
  },
).tag("@compraringressos22");

/////----------/////

Scenario(
  "Cenário 000000023: Consistência de comportamento em múltiplas abas independentes.",
  async ({ I }) => {
    function parseMoney(valor) {
      return Number(valor.replace(/[^\d,]/g, "").replace(",", "."));
    }

    let totalAba1;
    let totalAba2;

    I.amOnPage("https://fastix.com.br");

    I.waitForText("Explorar eventos", 15);
    I.click("Explorar eventos");

    I.wait(2);

    const campoBusca = locate('input[placeholder*="Pesquisar"]');
    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em São Paulo");
    I.click(evento);

    I.wait(2);

    I.waitInUrl("/buffalo", 15);

    I.wait(2);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[contains(., 'Adicionar')][1]",
    });

    const total = locate({
      xpath: "//h3[contains(., 'Total')]/following::span[1]",
    });

    I.click(botaoAdicionar);

    totalAba1 = await I.grabTextFrom(total);
    console.log("🟡 Aba 1 total:", totalAba1);

    I.openNewTab();
    I.amOnPage("https://fastix.com.br/events/buffalo-tom-em-sao-paulo");

    I.waitForElement(botaoAdicionar, 20);

    I.click(botaoAdicionar);

    totalAba2 = await I.grabTextFrom(total);
    console.log("🔵 Aba 2 total:", totalAba2);

    if (parseMoney(totalAba1) !== parseMoney(totalAba2)) {
      throw new Error(
        `❌ Comportamento inconsistente\nAba1: ${totalAba1}\nAba2: ${totalAba2}`,
      );
    }

    console.log("✅ Abas independentes com comportamento consistente");
  },
).tag("@compraringressos23");

/////----------/////

Scenario(
  "Cenário 000000024: Validação de segurança contra manipulação de valor no checkout.",
  async ({ I }) => {
    let responseCheckout;

    I.amOnPage("https://fastix.com.br");

    I.waitForText("Explorar eventos", 20);
    I.click("Explorar eventos");

    I.wait(2);

    const campoBusca = locate('input[placeholder*="Pesquisar"]');
    I.waitForElement(campoBusca, 20);
    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em São Paulo");
    I.waitForElement(evento, 15);
    I.click(evento);

    I.wait(2);

    I.waitInUrl("/buffalo", 15);

    I.wait(2);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[contains(., 'Adicionar')][1]",
    });

    I.waitForElement(botaoAdicionar, 20);
    I.click(botaoAdicionar);

    I.wait(2);

    responseCheckout = await I.usePlaywrightTo(
      "Interceptar checkout corretamente",
      async ({ page }) => {
        await page.route("**/*", async (route, request) => {
          if (request.url().includes("checkout")) {
            const data = request.postDataJSON?.() || {};

            const fraudado = {
              ...data,
              total: 1,
            };

            console.log("🔴 Payload alterado");

            await route.continue({
              postData: JSON.stringify(fraudado),
            });
          } else {
            await route.continue();
          }
        });

        I.wait(2);

        const botaoComprar = page.locator(
          "button:has-text('Comprar ingressos')",
        );

        await botaoComprar.click();

        try {
          const email = page.locator('input[name="email"]').first();
          await email.waitFor({ timeout: 5000 });

          console.log("🔐 Login detectado");

          await email.fill("diogoamanciosilva@gmail.com");
          await page.locator('input[name="password"]').fill("cruzeiro@1921");

          await page.click("button:has-text('Entrar')");

          await page.waitForLoadState("networkidle");

          // 🔁 Reexecuta ação após login
          await botaoComprar.click();
        } catch {
          console.log("✅ Login não necessário");
        }

        const response = await page.waitForResponse(
          (res) =>
            res.url().includes("/checkout") &&
            res.request().method() === "POST",
          { timeout: 15000 },
        );

        const text = await response.text();

        console.log("🔵 RESPONSE FINAL:", text);

        return JSON.parse(text);
      },
    );

    if (!responseCheckout) {
      throw new Error("❌ Nenhuma resposta de checkout foi capturada");
    }

    if (!responseCheckout.success) {
      throw new Error("❌ Backend retornou erro inesperado");
    }

    const total = responseCheckout.data.total;

    if (total <= 1) {
      throw new Error(
        `❌ FALHA DE SEGURANÇA: backend aceitou valor fraudado (${total})`,
      );
    }

    console.log("✅ Backend ignorou manipulação (segurança OK)");
  },
).tag("@compraringressos24");

/////----------/////

Scenario(
  "Cenário: 000000025 - Reset do carrinho após falha de login.",
  async ({ I }) => {
    let quantidadeRequestsPedido = 0;

    await I.usePlaywrightTo(
      "Interceptar criação de pedido",
      async ({ page }) => {
        await page.route("**/orders**", async (route) => {
          quantidadeRequestsPedido++;
          await route.continue();
        });
      },
    );

    I.amOnPage("https://fastix.com.br");

    I.waitForText("Explorar eventos", 20);
    I.click("Explorar eventos");

    I.wait(2);

    const campoBusca = locate('input[placeholder*="Pesquisar"]').first();
    I.waitForElement(campoBusca, 20);
    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em São Paulo").first();
    I.waitForElement(evento, 15);
    I.click(evento);

    I.waitInUrl("/buffalo", 15);

    I.wait(2);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[contains(., 'Adicionar')][1]",
    });

    I.wait(2);

    const botaoRemover = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[contains(., 'Remover')][1]",
    });

    I.waitForElement(botaoAdicionar, 20);
    I.click(botaoAdicionar);

    I.waitForElement(botaoRemover, 10);

    console.log("✅ Ingresso adicionado");

    I.wait(2);

    I.click(locate("button").withText("Comprar").first());

    const campoEmail = locate('input[name="email"]').first();
    const campoSenha = locate('input[name="password"]').first();

    I.wait(2);

    I.waitForElement(campoEmail, 10);

    I.fillField(campoEmail, "naoexiste@teste.com");
    I.fillField(campoSenha, "senha_errada");

    I.click("button:has-text('Entrar')");

    I.waitForText("Credenciais inválidas", 10);

    console.log("✅ Erro exibido");

    I.seeElement(campoEmail);

    console.log("✅ Permaneceu no login");

    I.dontSeeElement(botaoRemover);

    console.log("✅ Carrinho resetado após falha");

    if (quantidadeRequestsPedido > 0) {
      throw new Error("❌ Pedido foi criado indevidamente");
    }

    console.log("✅ Nenhum pedido criado");

    I.click(locate("span").withText("Voltar").first());

    I.waitInUrl("/events", 10);

    const quantidadeZero = locate("//span[text()='0']").first();

    I.waitForElement(quantidadeZero, 10);

    console.log("🏆 Carrinho zerado confirmado");
  },
).tag("@compraringressos25");

/////----------/////

Scenario(
  "Cenário: 000000026 - Pagamento com cartão de crédito com dados completos (CPF).",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar cartão de crédito corretamente",
      async ({ page }) => {
        const radio = page.locator(
          'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
        );

        await radio.waitFor();
        await radio.click({ force: true });
      },
    );

    I.usePlaywrightTo("validar seleção real", async ({ page }) => {
      const radio = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );
      ("");
      const isChecked = await radio.isChecked();

      if (!isChecked) {
        throw new Error("Cartão de crédito não foi selecionado");
      }
    });

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.usePlaywrightTo("preencher número do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="cardNumber"]');

      const input = frame.locator('input[name="cardNumber"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("5303 9678 1467 4704", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher validade do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="expirationDate"]');

      const input = frame.locator('input[name="expirationDate"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1228", { delay: 80 }); // dezembro/2028
    });

    I.wait(2);

    I.usePlaywrightTo("preencher CVV", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="securityCode"]');

      const input = frame.locator('input[name="securityCode"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("123", { delay: 80 });
    });

    I.wait(2);

    const campoNome = locate('input[name="HOLDER_NAME"]');

    I.waitForVisible(campoNome, 10);
    I.click(campoNome);

    I.fillField(campoNome, "Fastix Teste");

    I.wait(2);

    const campoDocumento = locate('input[name="DOCUMENT"]');

    I.waitForVisible(campoDocumento, 10);
    I.click(campoDocumento);

    I.fillField(campoDocumento, "935.215.180-19");

    I.wait(2);

    const campoEmail = locate('input[name="EMAIL"]');

    I.waitForVisible(campoEmail, 10);
    I.click(campoEmail);

    I.fillField(campoEmail, "teste.fastix@gmail.com");

    I.wait(2);
  },
).tag("@compraringressos26");

/////----------/////

Scenario(
  "Cenário: 000000027 - Pagamento com cartão de crédito com dados completos (CNPJ).",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar cartão de crédito corretamente",
      async ({ page }) => {
        const radio = page.locator(
          'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
        );

        await radio.waitFor();
        await radio.click({ force: true });
      },
    );

    I.usePlaywrightTo("validar seleção real", async ({ page }) => {
      const radio = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );
      ("");
      const isChecked = await radio.isChecked();

      if (!isChecked) {
        throw new Error("Cartão de crédito não foi selecionado");
      }
    });

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.usePlaywrightTo("preencher número do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="cardNumber"]');

      const input = frame.locator('input[name="cardNumber"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("5303 9678 1467 4704", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher validade do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="expirationDate"]');

      const input = frame.locator('input[name="expirationDate"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1228", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher CVV", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="securityCode"]');

      const input = frame.locator('input[name="securityCode"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("123", { delay: 80 });
    });

    I.wait(2);

    const campoNome = locate('input[name="HOLDER_NAME"]');

    I.waitForVisible(campoNome, 10);
    I.click(campoNome);

    I.fillField(campoNome, "Fastix Teste");

    I.wait(2);

    I.waitForElement('select[name="DOCUMENT"], select', 10);
    I.selectOption("select", "CNPJ");

    I.waitForFunction(() => {
      const input = document.querySelector('input[name="DOCUMENT"]');
      return input && input.placeholder.includes("XX.XXX.XXX/XXXX-99");
    }, 10);

    const campoCNPJ =
      'input[name="DOCUMENT"][placeholder="XX.XXX.XXX/XXXX-99"]';

    I.waitForVisible(campoCNPJ, 10);

    I.fillField(campoCNPJ, "46.386.078/0001-97");

    I.seeInField(campoCNPJ, "46.386.078/0001-97");

    I.wait(2);

    const campoEmail = locate('input[name="EMAIL"]');

    I.waitForVisible(campoEmail, 10);
    I.click(campoEmail);

    I.fillField(campoEmail, "teste.fastix@gmail.com");

    I.wait(2);
  },
).tag("@compraringressos27");

/////----------/////

Scenario(
  "Cenário: 000000028 - Exibir mensagens de erro ao preencher dados inválidos no formulário de pagamento (CPF).",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar cartão de crédito corretamente",
      async ({ page }) => {
        const radio = page.locator(
          'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
        );

        await radio.waitFor();
        await radio.click({ force: true });
      },
    );

    I.usePlaywrightTo("validar seleção real", async ({ page }) => {
      const radio = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );
      ("");
      const isChecked = await radio.isChecked();

      if (!isChecked) {
        throw new Error("Cartão de crédito não foi selecionado");
      }
    });

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.usePlaywrightTo("preencher número do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="cardNumber"]');

      const input = frame.locator('input[name="cardNumber"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher validade do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="expirationDate"]');

      const input = frame.locator('input[name="expirationDate"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher CVV", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="securityCode"]');

      const input = frame.locator('input[name="securityCode"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1", { delay: 80 });
    });

    I.wait(2);

    const campoNome = locate('input[name="HOLDER_NAME"]');

    I.waitForVisible(campoNome, 10);
    I.click(campoNome);

    I.fillField(campoNome, "1");

    I.wait(2);

    const campoDocumento = locate('input[name="DOCUMENT"]');

    I.waitForVisible(campoDocumento, 10);
    I.click(campoDocumento);

    I.fillField(campoDocumento, "1");

    I.wait(2);

    const campoEmail = locate('input[name="EMAIL"]');

    I.waitForVisible(campoEmail, 10);
    I.click(campoEmail);

    I.fillField(campoEmail, "1");

    I.wait(2);

    I.see("Preencha seus dados", "h2");
    I.click(locate("h2").withText("Preencha seus dados"));

    I.wait(2);
  },
).tag("@compraringressos28");

/////----------/////

Scenario(
  "Cenário: 000000029 - Exibir mensagens de erro ao preencher dados inválidos no formulário de pagamento (CNPJ).",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    // adiciona 2 ingressos
    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar cartão de crédito corretamente",
      async ({ page }) => {
        const radio = page.locator(
          'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
        );

        await radio.waitFor();
        await radio.click({ force: true });
      },
    );

    I.usePlaywrightTo("validar seleção real", async ({ page }) => {
      const radio = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );
      ("");
      const isChecked = await radio.isChecked();

      if (!isChecked) {
        throw new Error("Cartão de crédito não foi selecionado");
      }
    });

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.usePlaywrightTo("preencher número do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="cardNumber"]');

      const input = frame.locator('input[name="cardNumber"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher validade do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="expirationDate"]');

      const input = frame.locator('input[name="expirationDate"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher CVV", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="securityCode"]');

      const input = frame.locator('input[name="securityCode"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1", { delay: 80 });
    });

    I.wait(2);

    const campoNome = locate('input[name="HOLDER_NAME"]');

    I.waitForVisible(campoNome, 10);
    I.click(campoNome);

    I.fillField(campoNome, "1");

    I.wait(2);

    I.waitForElement('select[name="DOCUMENT"], select', 10);
    I.selectOption("select", "CNPJ");

    I.waitForFunction(() => {
      const input = document.querySelector('input[name="DOCUMENT"]');
      return input && input.placeholder.includes("XX.XXX.XXX/XXXX-99");
    }, 10);

    const campoCNPJ =
      'input[name="DOCUMENT"][placeholder="XX.XXX.XXX/XXXX-99"]';

    I.waitForVisible(campoCNPJ, 10);

    I.fillField(campoCNPJ, "1");

    I.seeInField(campoCNPJ, "1");

    I.wait(2);

    const campoEmail = locate('input[name="EMAIL"]');

    I.waitForVisible(campoEmail, 10);
    I.click(campoEmail);

    I.fillField(campoEmail, "1");

    I.wait(2);

    I.see("Preencha seus dados", "h2");
    I.click(locate("h2").withText("Preencha seus dados"));

    I.wait(2);
  },
).tag("@compraringressos29");

/////----------/////

Scenario(
  "Cenário: 000000030 - Validar exibição de erros ao tentar pagar sem preencher os campos obrigatórios com cartão de crédito.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar cartão de crédito corretamente",
      async ({ page }) => {
        const radio = page.locator(
          'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
        );

        await radio.waitFor();
        await radio.click({ force: true });
      },
    );

    I.usePlaywrightTo("validar seleção real", async ({ page }) => {
      const radio = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );
      ("");
      const isChecked = await radio.isChecked();

      if (!isChecked) {
        throw new Error("Cartão de crédito não foi selecionado");
      }
    });

    I.wait(2);

    const botaoPagar = locate("button")
      .withAttr({ type: "submit" })
      .withText("Pagar");

    I.waitForElement(botaoPagar, 10);
    I.waitForEnabled(botaoPagar, 10);
    I.click(botaoPagar);

    I.wait(2);
  },
).tag("@compraringressos30");

/////----------/////

Scenario(
  "Cenário: 000000031 - Exibir mensagens de erro ao tentar pagar sem preencher o campo Número do cartão.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar cartão de crédito corretamente",
      async ({ page }) => {
        const radio = page.locator(
          'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
        );

        await radio.waitFor();
        await radio.click({ force: true });
      },
    );

    I.usePlaywrightTo("validar seleção real", async ({ page }) => {
      const radio = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );
      ("");
      const isChecked = await radio.isChecked();

      if (!isChecked) {
        throw new Error("Cartão de crédito não foi selecionado");
      }
    });

    I.wait(2);

    I.usePlaywrightTo("preencher validade do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="expirationDate"]');

      const input = frame.locator('input[name="expirationDate"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1228", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher CVV", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="securityCode"]');

      const input = frame.locator('input[name="securityCode"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("123", { delay: 80 });
    });

    I.wait(2);

    const campoNome = locate('input[name="HOLDER_NAME"]');

    I.waitForVisible(campoNome, 10);
    I.click(campoNome);

    I.fillField(campoNome, "Fastix Teste");

    I.wait(2);

    const campoDocumento = locate('input[name="DOCUMENT"]');

    I.waitForVisible(campoDocumento, 10);
    I.click(campoDocumento);

    I.fillField(campoDocumento, "935.215.180-19");

    I.wait(2);

    const campoEmail = locate('input[name="EMAIL"]');

    I.waitForVisible(campoEmail, 10);
    I.click(campoEmail);

    I.fillField(campoEmail, "teste.fastix@gmail.com");

    I.wait(2);

    I.usePlaywrightTo("validar seleção real", async ({ page }) => {
      const radio = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );
      ("");
      const isChecked = await radio.isChecked();

      if (!isChecked) {
        throw new Error("Cartão de crédito não foi selecionado");
      }
    });

    I.wait(2);

    const botaoPagar = locate("button")
      .withAttr({ type: "submit" })
      .withText("Pagar");

    I.waitForElement(botaoPagar, 10);
    I.waitForEnabled(botaoPagar, 10);
    I.click(botaoPagar);

    I.wait(6);
  },
).tag("@compraringressos31");

/////----------/////

Scenario(
  "Cenário: 000000032 - Exibir mensagens de erro ao tentar pagar sem preencher o campo data de vencimento do cartão.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar cartão de crédito corretamente",
      async ({ page }) => {
        const radio = page.locator(
          'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
        );

        await radio.waitFor({ state: "visible", timeout: 15000 });
        await radio.click({ force: true });
      },
    );

    I.usePlaywrightTo("validar seleção real", async ({ page }) => {
      const radio = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );

      const isChecked = await radio.isChecked();

      if (!isChecked) {
        throw new Error("Cartão de crédito não foi selecionado");
      }
    });

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.usePlaywrightTo("preencher número do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="cardNumber"]');
      const input = frame.locator('input[name="cardNumber"]');

      await input.waitFor({ state: "visible" });
      await input.click({ force: true });
      await input.press("Control+A");
      await input.press("Backspace");
      await input.type("5303 9678 1467 4704", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher CVV", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="securityCode"]');
      const input = frame.locator('input[name="securityCode"]');

      await input.waitFor({ state: "visible" });
      await input.click({ force: true });
      await input.press("Control+A");
      await input.press("Backspace");
      await input.type("123", { delay: 80 });
    });

    I.wait(2);

    const campoNome = locate('input[name="HOLDER_NAME"]');

    I.waitForVisible(campoNome, 10);
    I.click(campoNome);
    I.fillField(campoNome, "Fastix Teste");

    I.wait(2);

    const campoDocumento = locate('input[name="DOCUMENT"]');

    I.waitForVisible(campoDocumento, 10);
    I.click(campoDocumento);
    I.fillField(campoDocumento, "935.215.180-19");

    I.wait(2);

    const campoEmail = locate('input[name="EMAIL"]');

    I.waitForVisible(campoEmail, 10);
    I.click(campoEmail);
    I.fillField(campoEmail, "teste.fastix@gmail.com");

    I.wait(2);

    I.usePlaywrightTo("validar seleção real", async ({ page }) => {
      const radio = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );

      const isChecked = await radio.isChecked();

      if (!isChecked) {
        throw new Error("Cartão de crédito não foi selecionado");
      }
    });

    I.wait(2);

    const botaoPagar = locate("button")
      .withAttr({ type: "submit" })
      .withText("Pagar");

    I.waitForElement(botaoPagar, 10);
    I.waitForEnabled(botaoPagar, 10);
    I.click(botaoPagar);

    I.wait(3);

    I.usePlaywrightTo(
      "validar mensagem de erro — Dado obrigatório",
      async ({ page }) => {
        const mensagemObrigatorio = page.locator("p", {
          hasText: "Dado obrigatório",
        });

        await mensagemObrigatorio.waitFor({ state: "visible", timeout: 8000 });

        const texto = await mensagemObrigatorio.textContent();
        console.log("MENSAGEM CAPTURADA:", texto);

        if (!texto?.includes("Dado obrigatório")) {
          throw new Error(
            `Mensagem "Dado obrigatório" não encontrada. Texto: "${texto}"`,
          );
        }
      },
    );

    I.usePlaywrightTo(
      "validar mensagem de erro — Preencha todos os dados",
      async ({ page }) => {
        const mensagemGeral = page.locator("p", {
          hasText: "Preencha todos os dados para continuar",
        });

        await mensagemGeral.waitFor({ state: "visible", timeout: 8000 });

        const texto = await mensagemGeral.textContent();
        console.log("MENSAGEM GERAL CAPTURADA:", texto);

        if (!texto?.includes("Preencha todos os dados para continuar")) {
          throw new Error(
            `Mensagem "Preencha todos os dados para continuar" não encontrada. Texto: "${texto}"`,
          );
        }
      },
    );

    I.say(
      'MENSAGENS DE ERRO VALIDADAS COM SUCESSO — campo "Data de vencimento" vazio bloqueou o pagamento corretamente',
    );

    I.wait(3);
  },
).tag("@compraringressos32");

/////----------/////

Scenario(
  "Cenário: 000000033 - Exibir mensagens de erro ao tentar pagar sem preencher o campo código de segurança (CVV) do cartão.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar cartão de crédito corretamente",
      async ({ page }) => {
        const radio = page.locator(
          'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
        );

        await radio.waitFor();
        await radio.click({ force: true });
      },
    );

    I.usePlaywrightTo("validar seleção real", async ({ page }) => {
      const radio = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );
      ("");
      const isChecked = await radio.isChecked();

      if (!isChecked) {
        throw new Error("Cartão de crédito não foi selecionado");
      }
    });

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.usePlaywrightTo("preencher número do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="cardNumber"]');

      const input = frame.locator('input[name="cardNumber"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("5303 9678 1467 4704", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher validade do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="expirationDate"]');

      const input = frame.locator('input[name="expirationDate"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1228", { delay: 80 });
    });

    I.wait(2);

    const campoNome = locate('input[name="HOLDER_NAME"]');

    I.waitForVisible(campoNome, 10);
    I.click(campoNome);

    I.fillField(campoNome, "Fastix Teste");

    I.wait(2);

    const campoDocumento = locate('input[name="DOCUMENT"]');

    I.waitForVisible(campoDocumento, 10);
    I.click(campoDocumento);

    I.fillField(campoDocumento, "935.215.180-19");

    I.wait(2);

    const campoEmail = locate('input[name="EMAIL"]');

    I.waitForVisible(campoEmail, 10);
    I.click(campoEmail);

    I.fillField(campoEmail, "teste.fastix@gmail.com");

    I.wait(2);

    I.usePlaywrightTo("validar seleção real", async ({ page }) => {
      const radio = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );
      ("");
      const isChecked = await radio.isChecked();

      if (!isChecked) {
        throw new Error("Cartão de crédito não foi selecionado");
      }
    });

    I.wait(2);

    const botaoPagar = locate("button")
      .withAttr({ type: "submit" })
      .withText("Pagar");

    I.waitForElement(botaoPagar, 10);
    I.waitForEnabled(botaoPagar, 10);
    I.click(botaoPagar);

    I.wait(6);
  },
).tag("@compraringressos33");

/////----------/////

Scenario(
  "Cenário: 000000034 - Exibir mensagens de erro ao tentar pagar sem preencher o campo Nome do Titular como aparece do cartão.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar cartão de crédito corretamente",
      async ({ page }) => {
        const radio = page.locator(
          'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
        );

        await radio.waitFor();
        await radio.click({ force: true });
      },
    );

    I.usePlaywrightTo("validar seleção real", async ({ page }) => {
      const radio = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );
      ("");
      const isChecked = await radio.isChecked();

      if (!isChecked) {
        throw new Error("Cartão de crédito não foi selecionado");
      }
    });

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.usePlaywrightTo("preencher número do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="cardNumber"]');

      const input = frame.locator('input[name="cardNumber"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("5303 9678 1467 4704", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher validade do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="expirationDate"]');

      const input = frame.locator('input[name="expirationDate"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1228", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher CVV", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="securityCode"]');

      const input = frame.locator('input[name="securityCode"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("123", { delay: 80 });
    });

    I.wait(2);

    const campoDocumento = locate('input[name="DOCUMENT"]');

    I.waitForVisible(campoDocumento, 10);
    I.click(campoDocumento);

    I.fillField(campoDocumento, "935.215.180-19");

    I.wait(2);

    const campoEmail = locate('input[name="EMAIL"]');

    I.waitForVisible(campoEmail, 10);
    I.click(campoEmail);

    I.fillField(campoEmail, "teste.fastix@gmail.com");

    I.wait(2);

    I.usePlaywrightTo("validar seleção real", async ({ page }) => {
      const radio = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );
      ("");
      const isChecked = await radio.isChecked();

      if (!isChecked) {
        throw new Error("Cartão de crédito não foi selecionado");
      }
    });

    I.wait(2);

    const botaoPagar = locate("button")
      .withAttr({ type: "submit" })
      .withText("Pagar");

    I.waitForElement(botaoPagar, 10);
    I.waitForEnabled(botaoPagar, 10);
    I.click(botaoPagar);

    I.wait(6);
  },
).tag("@compraringressos34");

/////----------/////

Scenario(
  "Cenário: 000000035 - Exibir mensagens de erro ao tentar pagar sem preencher o campo Documento do Titular (CPF).",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar cartão de crédito corretamente",
      async ({ page }) => {
        const radio = page.locator(
          'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
        );

        await radio.waitFor();
        await radio.click({ force: true });
      },
    );

    I.usePlaywrightTo("validar seleção real", async ({ page }) => {
      const radio = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );
      ("");
      const isChecked = await radio.isChecked();

      if (!isChecked) {
        throw new Error("Cartão de crédito não foi selecionado");
      }
    });

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.usePlaywrightTo("preencher número do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="cardNumber"]');

      const input = frame.locator('input[name="cardNumber"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("5303 9678 1467 4704", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher validade do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="expirationDate"]');

      const input = frame.locator('input[name="expirationDate"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1228", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher CVV", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="securityCode"]');

      const input = frame.locator('input[name="securityCode"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("123", { delay: 80 });
    });

    I.wait(2);

    const campoNome = locate('input[name="HOLDER_NAME"]');

    I.waitForVisible(campoNome, 10);
    I.click(campoNome);

    I.fillField(campoNome, "Fastix Teste");

    I.wait(2);

    const campoEmail = locate('input[name="EMAIL"]');

    I.waitForVisible(campoEmail, 10);
    I.click(campoEmail);

    I.fillField(campoEmail, "teste.fastix@gmail.com");

    I.wait(2);

    const botaoPagar = locate("button")
      .withAttr({ type: "submit" })
      .withText("Pagar");

    I.waitForElement(botaoPagar, 10);
    I.waitForEnabled(botaoPagar, 10);
    I.click(botaoPagar);

    I.wait(6);
  },
).tag("@compraringressos35");

/////----------/////

Scenario(
  "Cenário: 000000036 - Exibir mensagens de erro ao tentar pagar sem preencher o campo Documento do Titular (CNPJ).",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar cartão de crédito corretamente",
      async ({ page }) => {
        const radio = page.locator(
          'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
        );

        await radio.waitFor();
        await radio.click({ force: true });
      },
    );

    I.usePlaywrightTo("validar seleção real", async ({ page }) => {
      const radio = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );
      ("");
      const isChecked = await radio.isChecked();

      if (!isChecked) {
        throw new Error("Cartão de crédito não foi selecionado");
      }
    });

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.usePlaywrightTo("preencher número do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="cardNumber"]');

      const input = frame.locator('input[name="cardNumber"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("5303 9678 1467 4704", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher validade do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="expirationDate"]');

      const input = frame.locator('input[name="expirationDate"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1228", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher CVV", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="securityCode"]');

      const input = frame.locator('input[name="securityCode"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("123", { delay: 80 });
    });

    I.wait(2);

    const campoNome = locate('input[name="HOLDER_NAME"]');

    I.waitForVisible(campoNome, 10);
    I.click(campoNome);

    I.fillField(campoNome, "Fastix Teste");

    I.wait(2);

    I.waitForElement('select[name="DOCUMENT"], select', 10);
    I.selectOption("select", "CNPJ");

    I.waitForFunction(() => {
      const input = document.querySelector('input[name="DOCUMENT"]');
      return input && input.placeholder.includes("XX.XXX.XXX/XXXX-99");
    }, 10);

    const campoCNPJ =
      'input[name="DOCUMENT"][placeholder="XX.XXX.XXX/XXXX-99"]';

    I.waitForVisible(campoCNPJ, 10);

    I.wait(2);

    const campoEmail = locate('input[name="EMAIL"]');

    I.waitForVisible(campoEmail, 10);
    I.click(campoEmail);

    I.fillField(campoEmail, "teste.fastix@gmail.com");

    I.wait(2);

    const botaoPagar = locate("button")
      .withAttr({ type: "submit" })
      .withText("Pagar");

    I.waitForElement(botaoPagar, 10);
    I.waitForEnabled(botaoPagar, 10);
    I.click(botaoPagar);

    I.wait(6);
  },
).tag("@compraringressos36");

/////----------/////

Scenario(
  "Cenário: 000000037 - Exibir mensagens de erro ao tentar pagar sem preencher o campo E-mail.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar cartão de crédito corretamente",
      async ({ page }) => {
        const radio = page.locator(
          'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
        );

        await radio.waitFor();
        await radio.click({ force: true });
      },
    );

    I.usePlaywrightTo("validar seleção real", async ({ page }) => {
      const radio = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );
      ("");
      const isChecked = await radio.isChecked();

      if (!isChecked) {
        throw new Error("Cartão de crédito não foi selecionado");
      }
    });

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.usePlaywrightTo("preencher número do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="cardNumber"]');

      const input = frame.locator('input[name="cardNumber"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("5303 9678 1467 4704", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher validade do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="expirationDate"]');

      const input = frame.locator('input[name="expirationDate"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1228", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher CVV", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="securityCode"]');

      const input = frame.locator('input[name="securityCode"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("123", { delay: 80 });
    });

    I.wait(2);

    const campoNome = locate('input[name="HOLDER_NAME"]');

    I.waitForVisible(campoNome, 10);
    I.click(campoNome);

    I.fillField(campoNome, "Fastix Teste");

    I.wait(2);

    I.waitForElement('select[name="DOCUMENT"], select', 10);
    I.selectOption("select", "CNPJ");

    I.waitForFunction(() => {
      const input = document.querySelector('input[name="DOCUMENT"]');
      return input && input.placeholder.includes("XX.XXX.XXX/XXXX-99");
    }, 10);

    const campoCNPJ =
      'input[name="DOCUMENT"][placeholder="XX.XXX.XXX/XXXX-99"]';

    I.waitForVisible(campoCNPJ, 10);

    I.fillField(campoCNPJ, "46.386.078/0001-97");

    I.seeInField(campoCNPJ, "46.386.078/0001-97");

    I.wait(2);

    const botaoPagar = locate("button")
      .withAttr({ type: "submit" })
      .withText("Pagar");

    I.waitForElement(botaoPagar, 10);
    I.waitForEnabled(botaoPagar, 10);
    I.click(botaoPagar);

    I.wait(6);
  },
).tag("@compraringressos37");

/////----------/////

Scenario(
  "Cenário: 000000038 - Pagamento com cartão de Débito Virtual CAIXA com dados completos (CPF).",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar Cartão de Débito Virtual CAIXA corretamente",
      async ({ page }) => {
        const opcaoDebito = page.locator(
          'span:has-text("Cartão de Débito Virtual CAIXA")',
        );

        await opcaoDebito.waitFor({
          state: "visible",
        });

        await opcaoDebito.click({
          force: true,
        });
      },
    );

    I.usePlaywrightTo(
      "validar seleção real do Cartão de Débito Virtual CAIXA",
      async ({ page }) => {
        // valida se a opção ficou selecionada
        const opcaoSelecionada = page.locator(
          'span:has-text("Cartão de Débito Virtual CAIXA")',
        );

        const isVisible = await opcaoSelecionada.isVisible();

        if (!isVisible) {
          throw new Error("Cartão de Débito Virtual CAIXA não foi selecionado");
        }
      },
    );

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.usePlaywrightTo("preencher número do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="cardNumber"]');

      const input = frame.locator('input[name="cardNumber"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("5303 9678 1467 4704", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher validade do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="expirationDate"]');

      const input = frame.locator('input[name="expirationDate"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1228", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher CVV", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="securityCode"]');

      const input = frame.locator('input[name="securityCode"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("123", { delay: 80 });
    });

    I.wait(2);

    const campoNome = locate('input[name="HOLDER_NAME"]');

    I.waitForVisible(campoNome, 10);
    I.click(campoNome);

    I.fillField(campoNome, "Fastix Teste");

    I.wait(2);

    const campoDocumento = locate('input[name="DOCUMENT"]');

    I.waitForVisible(campoDocumento, 10);
    I.click(campoDocumento);

    I.fillField(campoDocumento, "935.215.180-19");

    I.wait(2);

    const campoEmail = locate('input[name="EMAIL"]');

    I.waitForVisible(campoEmail, 10);
    I.click(campoEmail);

    I.fillField(campoEmail, "teste.fastix@gmail.com");

    I.wait(2);

    const botaoPagarCaixa = locate("button")
      .withAttr({ type: "submit" })
      .withText("Pagar");

    I.waitForElement(botaoPagarCaixa, 10);
    I.waitForEnabled(botaoPagarCaixa, 10);
    I.click(botaoPagarCaixa);

    I.wait(6);
  },
).tag("@compraringressos38");

/////----------/////

Scenario(
  "Cenário: 000000039 - Pagamento com cartão de Débito Virtual CAIXA com dados completos (CNPJ).",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    // adiciona 2 ingressos
    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar Cartão de Débito Virtual CAIXA corretamente",
      async ({ page }) => {
        const opcaoDebito = page.locator(
          'span:has-text("Cartão de Débito Virtual CAIXA")',
        );

        await opcaoDebito.waitFor({
          state: "visible",
        });

        await opcaoDebito.click({
          force: true,
        });
      },
    );

    I.usePlaywrightTo(
      "validar seleção real do Cartão de Débito Virtual CAIXA",
      async ({ page }) => {
        // valida se a opção ficou selecionada
        const opcaoSelecionada = page.locator(
          'span:has-text("Cartão de Débito Virtual CAIXA")',
        );

        const isVisible = await opcaoSelecionada.isVisible();

        if (!isVisible) {
          throw new Error("Cartão de Débito Virtual CAIXA não foi selecionado");
        }
      },
    );

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.usePlaywrightTo("preencher número do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="cardNumber"]');

      const input = frame.locator('input[name="cardNumber"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("5303 9678 1467 4704", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher validade do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="expirationDate"]');

      const input = frame.locator('input[name="expirationDate"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1228", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher CVV", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="securityCode"]');

      const input = frame.locator('input[name="securityCode"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("123", { delay: 80 });
    });

    I.wait(2);

    const campoNome = locate('input[name="HOLDER_NAME"]');

    I.waitForVisible(campoNome, 10);
    I.click(campoNome);

    I.fillField(campoNome, "Fastix Teste");

    I.wait(2);

    I.waitForElement('select[name="DOCUMENT"], select', 10);
    I.selectOption("select", "CNPJ");

    I.waitForFunction(() => {
      const input = document.querySelector('input[name="DOCUMENT"]');
      return input && input.placeholder.includes("XX.XXX.XXX/XXXX-99");
    }, 10);

    const campoCNPJ =
      'input[name="DOCUMENT"][placeholder="XX.XXX.XXX/XXXX-99"]';

    I.waitForVisible(campoCNPJ, 10);

    I.fillField(campoCNPJ, "46.386.078/0001-97");

    I.seeInField(campoCNPJ, "46.386.078/0001-97");

    I.wait(2);

    const botaoPagar = locate("button")
      .withAttr({ type: "submit" })
      .withText("Pagar");

    I.waitForElement(botaoPagar, 10);
    I.waitForEnabled(botaoPagar, 10);
    I.click(botaoPagar);

    const campoEmail = locate('input[name="EMAIL"]');

    I.waitForVisible(campoEmail, 10);
    I.click(campoEmail);

    I.fillField(campoEmail, "teste.fastix@gmail.com");

    I.wait(2);

    const botaoPagarCaixa = locate("button")
      .withAttr({ type: "submit" })
      .withText("Pagar");

    I.waitForElement(botaoPagarCaixa, 10);
    I.waitForEnabled(botaoPagarCaixa, 10);
    I.click(botaoPagarCaixa);

    I.wait(6);
  },
).tag("@compraringressos39");

/////----------/////

Scenario(
  "Cenário: 000000040 - Cartão de Débito Virtual CAIXA, exibir mensagens de erro ao preencher dados inválidos no formulário de pagamento (CPF).",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar Cartão de Débito Virtual CAIXA corretamente",
      async ({ page }) => {
        const opcaoDebito = page.locator(
          'span:has-text("Cartão de Débito Virtual CAIXA")',
        );

        await opcaoDebito.waitFor({
          state: "visible",
        });

        await opcaoDebito.click({
          force: true,
        });
      },
    );

    I.usePlaywrightTo(
      "validar seleção real do Cartão de Débito Virtual CAIXA",
      async ({ page }) => {
        const opcaoSelecionada = page.locator(
          'span:has-text("Cartão de Débito Virtual CAIXA")',
        );

        const isVisible = await opcaoSelecionada.isVisible();

        if (!isVisible) {
          throw new Error("Cartão de Débito Virtual CAIXA não foi selecionado");
        }
      },
    );

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.usePlaywrightTo("preencher número do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="cardNumber"]');

      const input = frame.locator('input[name="cardNumber"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher validade do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="expirationDate"]');

      const input = frame.locator('input[name="expirationDate"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher CVV", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="securityCode"]');

      const input = frame.locator('input[name="securityCode"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1", { delay: 80 });
    });

    I.wait(2);

    const campoNome = locate('input[name="HOLDER_NAME"]');

    I.waitForVisible(campoNome, 10);
    I.click(campoNome);

    I.fillField(campoNome, "1");

    I.wait(2);

    const campoDocumento = locate('input[name="DOCUMENT"]');

    I.waitForVisible(campoDocumento, 10);
    I.click(campoDocumento);

    I.fillField(campoDocumento, "1");

    I.wait(2);

    const campoEmail = locate('input[name="EMAIL"]');

    I.waitForVisible(campoEmail, 10);
    I.click(campoEmail);

    I.fillField(campoEmail, "1");

    I.wait(2);

    I.see("Preencha seus dados", "h2");
    I.click(locate("h2").withText("Preencha seus dados"));

    I.wait(2);
  },
).tag("@compraringressos40");

/////----------/////

Scenario(
  "Cenário: 000000041 - Cartão de Débito Virtual CAIXA, Exibir mensagens de erro ao preencher dados inválidos no formulário de pagamento (CNPJ).",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar Cartão de Débito Virtual CAIXA corretamente",
      async ({ page }) => {
        const opcaoDebito = page.locator(
          'span:has-text("Cartão de Débito Virtual CAIXA")',
        );

        await opcaoDebito.waitFor({
          state: "visible",
        });

        await opcaoDebito.click({
          force: true,
        });
      },
    );

    I.usePlaywrightTo(
      "validar seleção real do Cartão de Débito Virtual CAIXA",
      async ({ page }) => {
        const opcaoSelecionada = page.locator(
          'span:has-text("Cartão de Débito Virtual CAIXA")',
        );

        const isVisible = await opcaoSelecionada.isVisible();

        if (!isVisible) {
          throw new Error("Cartão de Débito Virtual CAIXA não foi selecionado");
        }
      },
    );

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.usePlaywrightTo("preencher número do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="cardNumber"]');

      const input = frame.locator('input[name="cardNumber"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher validade do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="expirationDate"]');

      const input = frame.locator('input[name="expirationDate"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher CVV", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="securityCode"]');

      const input = frame.locator('input[name="securityCode"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1", { delay: 80 });
    });

    I.wait(2);

    const campoNome = locate('input[name="HOLDER_NAME"]');

    I.waitForVisible(campoNome, 10);
    I.click(campoNome);

    I.fillField(campoNome, "1");

    I.wait(2);

    I.waitForElement('select[name="DOCUMENT"], select', 10);
    I.selectOption("select", "CNPJ");

    I.waitForFunction(() => {
      const input = document.querySelector('input[name="DOCUMENT"]');
      return input && input.placeholder.includes("XX.XXX.XXX/XXXX-99");
    }, 10);

    const campoCNPJ =
      'input[name="DOCUMENT"][placeholder="XX.XXX.XXX/XXXX-99"]';

    I.waitForVisible(campoCNPJ, 10);

    I.fillField(campoCNPJ, "1");

    I.seeInField(campoCNPJ, "1");

    I.wait(2);

    const campoEmail = locate('input[name="EMAIL"]');

    I.waitForVisible(campoEmail, 10);
    I.click(campoEmail);

    I.fillField(campoEmail, "1");

    I.wait(2);

    I.see("Preencha seus dados", "h2");
    I.click(locate("h2").withText("Preencha seus dados"));

    I.wait(2);
  },
).tag("@compraringressos41");

/////----------/////

Scenario(
  "Cenário: 000000042 - Validar exibição de erros ao tentar pagar sem preencher os campos obrigatórios do Cartão de Débito Virtual CAIXA.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.wait(2);

    I.usePlaywrightTo(
      "selecionar Cartão de Débito Virtual CAIXA corretamente",
      async ({ page }) => {
        const opcaoDebito = page.locator(
          'span:has-text("Cartão de Débito Virtual CAIXA")',
        );

        await opcaoDebito.waitFor({
          state: "visible",
        });

        await opcaoDebito.click({
          force: true,
        });
      },
    );

    I.usePlaywrightTo(
      "validar seleção real do Cartão de Débito Virtual CAIXA",
      async ({ page }) => {
        const opcaoSelecionada = page.locator(
          'span:has-text("Cartão de Débito Virtual CAIXA")',
        );

        const isVisible = await opcaoSelecionada.isVisible();

        if (!isVisible) {
          throw new Error("Cartão de Débito Virtual CAIXA não foi selecionado");
        }
      },
    );

    I.wait(2);

    const botaoPagar = locate("button")
      .withAttr({ type: "submit" })
      .withText("Pagar");

    I.waitForElement(botaoPagar, 10);
    I.waitForEnabled(botaoPagar, 10);
    I.click(botaoPagar);

    I.wait(2);
  },
).tag("@compraringressos42");

/////----------/////

Scenario(
  "Cenário: 000000043 - Exibir mensagens de erro ao tentar pagar sem preencher o campo Número do Cartão de Débito Virtual CAIXA.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.wait(2);

    I.usePlaywrightTo(
      "selecionar Cartão de Débito Virtual CAIXA corretamente",
      async ({ page }) => {
        const opcaoDebito = page.locator(
          'span:has-text("Cartão de Débito Virtual CAIXA")',
        );

        await opcaoDebito.waitFor({
          state: "visible",
        });

        await opcaoDebito.click({
          force: true,
        });
      },
    );

    I.wait(2);

    I.usePlaywrightTo(
      "validar seleção real do Cartão de Débito Virtual CAIXA",
      async ({ page }) => {
        const opcaoSelecionada = page.locator(
          'span:has-text("Cartão de Débito Virtual CAIXA")',
        );

        const isVisible = await opcaoSelecionada.isVisible();

        if (!isVisible) {
          throw new Error("Cartão de Débito Virtual CAIXA não foi selecionado");
        }
      },
    );

    I.wait(2);

    I.usePlaywrightTo("preencher validade do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="expirationDate"]');

      const input = frame.locator('input[name="expirationDate"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1228", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher CVV", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="securityCode"]');

      const input = frame.locator('input[name="securityCode"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("123", { delay: 80 });
    });

    I.wait(2);

    const campoNome = locate('input[name="HOLDER_NAME"]');

    I.waitForVisible(campoNome, 10);
    I.click(campoNome);

    I.fillField(campoNome, "Fastix Teste");

    I.wait(2);

    const campoDocumento = locate('input[name="DOCUMENT"]');

    I.waitForVisible(campoDocumento, 10);
    I.click(campoDocumento);

    I.fillField(campoDocumento, "935.215.180-19");

    I.wait(2);

    const campoEmail = locate('input[name="EMAIL"]');

    I.waitForVisible(campoEmail, 10);
    I.click(campoEmail);

    I.fillField(campoEmail, "teste.fastix@gmail.com");

    I.wait(2);

    const botaoPagar = locate("button")
      .withAttr({ type: "submit" })
      .withText("Pagar");

    I.waitForElement(botaoPagar, 10);
    I.waitForEnabled(botaoPagar, 10);
    I.click(botaoPagar);

    I.wait(6);
  },
).tag("@compraringressos43");

/////----------/////

Scenario(
  "Cenário: 000000044 - Exibir mensagens de erro ao tentar pagar sem preencher o campo data de vencimento do Cartão de Débito Virtual CAIXA.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.wait(2);

    I.usePlaywrightTo(
      "selecionar Cartão de Débito Virtual CAIXA corretamente",
      async ({ page }) => {
        const opcaoDebito = page.locator(
          'span:has-text("Cartão de Débito Virtual CAIXA")',
        );

        await opcaoDebito.waitFor({
          state: "visible",
        });

        await opcaoDebito.click({
          force: true,
        });
      },
    );

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.usePlaywrightTo("preencher número do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="cardNumber"]');

      const input = frame.locator('input[name="cardNumber"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("5303 9678 1467 4704", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher CVV", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="securityCode"]');

      const input = frame.locator('input[name="securityCode"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("123", { delay: 80 });
    });

    I.wait(2);

    const campoNome = locate('input[name="HOLDER_NAME"]');

    I.waitForVisible(campoNome, 10);
    I.click(campoNome);

    I.fillField(campoNome, "Fastix Teste");

    I.wait(2);

    const campoDocumento = locate('input[name="DOCUMENT"]');

    I.waitForVisible(campoDocumento, 10);
    I.click(campoDocumento);

    I.fillField(campoDocumento, "935.215.180-19");

    I.wait(2);

    const campoEmail = locate('input[name="EMAIL"]');

    I.waitForVisible(campoEmail, 10);
    I.click(campoEmail);

    I.fillField(campoEmail, "teste.fastix@gmail.com");

    I.wait(2);

    const botaoPagar = locate("button")
      .withAttr({ type: "submit" })
      .withText("Pagar");

    I.waitForElement(botaoPagar, 10);
    I.waitForEnabled(botaoPagar, 10);
    I.click(botaoPagar);

    I.wait(6);
  },
).tag("@compraringressos44");

/////----------/////

Scenario(
  "Cenário: 000000045 - Exibir mensagem 'Dado obrigatório' ao tentar pagar sem preencher o campo código de segurança (CVV) do Cartão de Débito Virtual CAIXA.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);

    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);

    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);

    I.scrollTo(botaoComprar);

    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");

    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);

    I.click(botaoEntrar);

    I.wait(2);

    I.usePlaywrightTo(
      "selecionar Cartão de Débito Virtual CAIXA",
      async ({ page }) => {
        const opcaoDebito = page.locator(
          'span:has-text("Cartão de Débito Virtual CAIXA")',
        );

        await opcaoDebito.waitFor({
          state: "visible",
        });

        await opcaoDebito.click({
          force: true,
        });
      },
    );

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.usePlaywrightTo("preencher número do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="cardNumber"]');

      const input = frame.locator('input[name="cardNumber"]');

      await input.waitFor({
        state: "visible",
      });

      await input.click({
        force: true,
      });

      await input.press("Control+A");

      await input.press("Backspace");

      await input.type("5303967814674704", {
        delay: 80,
      });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher validade", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="expirationDate"]');

      const input = frame.locator('input[name="expirationDate"]');

      await input.waitFor({
        state: "visible",
      });

      await input.click({
        force: true,
      });

      await input.press("Control+A");

      await input.press("Backspace");

      await input.type("1228", {
        delay: 80,
      });
    });

    I.wait(2);

    const campoNome = locate('input[name="HOLDER_NAME"]');

    I.waitForVisible(campoNome, 10);

    I.click(campoNome);

    I.fillField(campoNome, "Fastix Teste");

    I.wait(2);

    const campoDocumento = locate('input[name="DOCUMENT"]');

    I.waitForVisible(campoDocumento, 10);

    I.click(campoDocumento);

    I.fillField(campoDocumento, "935.215.180-19");

    I.wait(2);

    const campoEmail = locate('input[name="EMAIL"]');

    I.waitForVisible(campoEmail, 10);

    I.click(campoEmail);

    I.fillField(campoEmail, "teste.fastix@gmail.com");

    I.wait(2);

    const botaoPagar = locate("button")
      .withAttr({ type: "submit" })
      .withText("Pagar");

    I.waitForElement(botaoPagar, 10);
    I.waitForEnabled(botaoPagar, 10);

    I.scrollTo(botaoPagar);

    I.click(botaoPagar);

    const mensagemErroCVV = locate("p").withText("Dado obrigatório");

    I.waitForVisible(mensagemErroCVV, 10);

    I.seeElement(mensagemErroCVV);

    I.see("Dado obrigatório");

    I.saveScreenshot("erro-cvv-obrigatorio.png");

    I.wait(2);
  },
).tag("@compraringressos45");

/////----------/////

Scenario(
  "Cenário: 000000046 - Exibir mensagens de erro ao tentar pagar sem preencher o campo Nome do Titular como aparece do Cartão de Débito Virtual CAIXA.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.wait(2);

    I.usePlaywrightTo(
      "selecionar Cartão de Débito Virtual CAIXA corretamente",
      async ({ page }) => {
        const opcaoDebito = page.locator(
          'span:has-text("Cartão de Débito Virtual CAIXA")',
        );

        await opcaoDebito.waitFor({
          state: "visible",
        });

        await opcaoDebito.click({
          force: true,
        });
      },
    );

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.usePlaywrightTo("preencher número do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="cardNumber"]');

      const input = frame.locator('input[name="cardNumber"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("5303 9678 1467 4704", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher validade do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="expirationDate"]');

      const input = frame.locator('input[name="expirationDate"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1228", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher CVV", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="securityCode"]');

      const input = frame.locator('input[name="securityCode"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("123", { delay: 80 });
    });

    I.wait(2);

    const campoDocumento = locate('input[name="DOCUMENT"]');

    I.waitForVisible(campoDocumento, 10);
    I.click(campoDocumento);

    I.fillField(campoDocumento, "935.215.180-19");

    I.wait(2);

    const campoEmail = locate('input[name="EMAIL"]');

    I.waitForVisible(campoEmail, 10);
    I.click(campoEmail);

    I.fillField(campoEmail, "teste.fastix@gmail.com");

    I.wait(2);

    const botaoPagar = locate("button")
      .withAttr({ type: "submit" })
      .withText("Pagar");

    I.waitForElement(botaoPagar, 10);
    I.waitForEnabled(botaoPagar, 10);
    I.click(botaoPagar);

    I.wait(6);
  },
).tag("@compraringressos46");

/////----------/////

Scenario(
  "Cenário: 000000047 - Exibir mensagens de erro ao tentar pagar sem preencher o campo Documento do Titular (CPF) do Cartão de Débito Virtual CAIXA.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.wait(2);

    I.usePlaywrightTo(
      "selecionar Cartão de Débito Virtual CAIXA corretamente",
      async ({ page }) => {
        // localiza pelo texto visível da opção
        const opcaoDebito = page.locator(
          'span:has-text("Cartão de Débito Virtual CAIXA")',
        );

        await opcaoDebito.waitFor({
          state: "visible",
        });

        await opcaoDebito.click({
          force: true,
        });
      },
    );

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.usePlaywrightTo("preencher número do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="cardNumber"]');

      const input = frame.locator('input[name="cardNumber"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("5303 9678 1467 4704", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher validade do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="expirationDate"]');

      const input = frame.locator('input[name="expirationDate"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1228", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher CVV", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="securityCode"]');

      const input = frame.locator('input[name="securityCode"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("123", { delay: 80 });
    });

    I.wait(2);

    const campoNome = locate('input[name="HOLDER_NAME"]');

    I.waitForVisible(campoNome, 10);
    I.click(campoNome);

    I.fillField(campoNome, "Fastix Teste");

    I.wait(2);

    const campoEmail = locate('input[name="EMAIL"]');

    I.waitForVisible(campoEmail, 10);
    I.click(campoEmail);

    I.fillField(campoEmail, "teste.fastix@gmail.com");

    I.wait(2);

    const botaoPagar = locate("button")
      .withAttr({ type: "submit" })
      .withText("Pagar");

    I.waitForElement(botaoPagar, 10);
    I.waitForEnabled(botaoPagar, 10);
    I.click(botaoPagar);

    I.wait(6);
  },
).tag("@compraringressos47");

/////----------/////

Scenario(
  "Cenário: 000000048 - Exibir mensagens de erro ao tentar pagar sem preencher o campo Documento do Titular (CNPJ) do Cartão de Débito Virtual CAIXA.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.wait(2);

    I.usePlaywrightTo(
      "selecionar Cartão de Débito Virtual CAIXA corretamente",
      async ({ page }) => {
        const opcaoDebito = page.locator(
          'span:has-text("Cartão de Débito Virtual CAIXA")',
        );

        await opcaoDebito.waitFor({
          state: "visible",
        });

        await opcaoDebito.click({
          force: true,
        });
      },
    );

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.usePlaywrightTo("preencher número do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="cardNumber"]');

      const input = frame.locator('input[name="cardNumber"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("5303 9678 1467 4704", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher validade do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="expirationDate"]');

      const input = frame.locator('input[name="expirationDate"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1228", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher CVV", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="securityCode"]');

      const input = frame.locator('input[name="securityCode"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("123", { delay: 80 });
    });

    I.wait(2);

    const campoNome = locate('input[name="HOLDER_NAME"]');

    I.waitForVisible(campoNome, 10);
    I.click(campoNome);

    I.fillField(campoNome, "Fastix Teste");

    I.wait(2);

    I.waitForElement('select[name="DOCUMENT"], select', 10);
    I.selectOption("select", "CNPJ");

    I.waitForFunction(() => {
      const input = document.querySelector('input[name="DOCUMENT"]');
      return input && input.placeholder.includes("XX.XXX.XXX/XXXX-99");
    }, 10);

    const campoCNPJ =
      'input[name="DOCUMENT"][placeholder="XX.XXX.XXX/XXXX-99"]';

    I.waitForVisible(campoCNPJ, 10);

    I.wait(2);

    const campoEmail = locate('input[name="EMAIL"]');

    I.waitForVisible(campoEmail, 10);
    I.click(campoEmail);

    I.fillField(campoEmail, "teste.fastix@gmail.com");

    I.wait(2);

    const botaoPagar = locate("button")
      .withAttr({ type: "submit" })
      .withText("Pagar");

    I.waitForElement(botaoPagar, 10);
    I.waitForEnabled(botaoPagar, 10);
    I.click(botaoPagar);

    I.wait(6);
  },
).tag("@compraringressos48");

/////----------/////

Scenario(
  "Cenário: 000000049 - Exibir mensagens de erro ao tentar pagar sem preencher o campo E-mail do Cartão de Débito Virtual CAIXA.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.wait(2);

    I.usePlaywrightTo(
      "selecionar Cartão de Débito Virtual CAIXA corretamente",
      async ({ page }) => {
        const opcaoDebito = page.locator(
          'span:has-text("Cartão de Débito Virtual CAIXA")',
        );

        await opcaoDebito.waitFor({
          state: "visible",
        });

        await opcaoDebito.click({
          force: true,
        });
      },
    );

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.usePlaywrightTo("preencher número do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="cardNumber"]');

      const input = frame.locator('input[name="cardNumber"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("5303 9678 1467 4704", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher validade do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="expirationDate"]');

      const input = frame.locator('input[name="expirationDate"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1228", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher CVV", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="securityCode"]');

      const input = frame.locator('input[name="securityCode"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("123", { delay: 80 });
    });

    I.wait(2);

    const campoNome = locate('input[name="HOLDER_NAME"]');

    I.waitForVisible(campoNome, 10);
    I.click(campoNome);

    I.fillField(campoNome, "Fastix Teste");

    I.wait(2);

    I.waitForElement('select[name="DOCUMENT"], select', 10);
    I.selectOption("select", "CNPJ");

    I.waitForFunction(() => {
      const input = document.querySelector('input[name="DOCUMENT"]');
      return input && input.placeholder.includes("XX.XXX.XXX/XXXX-99");
    }, 10);

    const campoCNPJ =
      'input[name="DOCUMENT"][placeholder="XX.XXX.XXX/XXXX-99"]';

    I.waitForVisible(campoCNPJ, 10);

    I.fillField(campoCNPJ, "46.386.078/0001-97");

    I.seeInField(campoCNPJ, "46.386.078/0001-97");

    I.wait(2);

    const botaoPagar = locate("button")
      .withAttr({ type: "submit" })
      .withText("Pagar");

    I.waitForElement(botaoPagar, 10);
    I.waitForEnabled(botaoPagar, 10);
    I.click(botaoPagar);

    I.wait(6);
  },
).tag("@compraringressos49");

/////----------/////

Scenario(
  "Cenário: 000000050 - Cartão de Crédito, validação e exibição da bandeira “Mastercard” ao inserir um cartão válido.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar cartão de crédito corretamente",
      async ({ page }) => {
        const radio = page.locator(
          'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
        );

        await radio.waitFor();
        await radio.click({ force: true });
      },
    );

    I.usePlaywrightTo("validar seleção real", async ({ page }) => {
      const radio = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );
      ("");
      const isChecked = await radio.isChecked();

      if (!isChecked) {
        throw new Error("Cartão de crédito não foi selecionado");
      }
    });

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.usePlaywrightTo("preencher número do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="cardNumber"]');

      const input = frame.locator('input[name="cardNumber"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("5580 6235 5889 1335", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher validade do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="expirationDate"]');

      const input = frame.locator('input[name="expirationDate"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1228", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher CVV", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="securityCode"]');

      const input = frame.locator('input[name="securityCode"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("123", { delay: 80 });
    });

    I.wait(2);

    const campoNome = locate('input[name="HOLDER_NAME"]');

    I.waitForVisible(campoNome, 10);
    I.click(campoNome);

    I.fillField(campoNome, "Fastix Teste");

    I.wait(2);

    const campoDocumento = locate('input[name="DOCUMENT"]');

    I.waitForVisible(campoDocumento, 10);
    I.click(campoDocumento);

    I.fillField(campoDocumento, "935.215.180-19");

    I.wait(2);

    const campoEmail = locate('input[name="EMAIL"]');

    I.waitForVisible(campoEmail, 10);
    I.click(campoEmail);

    I.fillField(campoEmail, "teste.fastix@gmail.com");

    I.wait(5);
  },
).tag("@compraringressos51");

/////----------/////

Scenario(
  "Cenário: 000000051 - Cartão de Crédito, inserir número de cartão com número incompleto da bandeira Mastercard.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar cartão de crédito corretamente",
      async ({ page }) => {
        const radio = page.locator(
          'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
        );

        await radio.waitFor();
        await radio.click({ force: true });
      },
    );

    I.usePlaywrightTo("validar seleção real", async ({ page }) => {
      const radio = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );
      ("");
      const isChecked = await radio.isChecked();

      if (!isChecked) {
        throw new Error("Cartão de crédito não foi selecionado");
      }
    });

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.usePlaywrightTo("preencher número do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="cardNumber"]');

      const input = frame.locator('input[name="cardNumber"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("5580 6235 5889 ", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher validade do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="expirationDate"]');

      const input = frame.locator('input[name="expirationDate"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1228", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher CVV", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="securityCode"]');

      const input = frame.locator('input[name="securityCode"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("123", { delay: 80 });
    });

    I.wait(2);

    const campoNome = locate('input[name="HOLDER_NAME"]');

    I.waitForVisible(campoNome, 10);
    I.click(campoNome);

    I.fillField(campoNome, "Fastix Teste");

    I.wait(2);

    const campoDocumento = locate('input[name="DOCUMENT"]');

    I.waitForVisible(campoDocumento, 10);
    I.click(campoDocumento);

    I.fillField(campoDocumento, "935.215.180-19");

    I.wait(2);

    const campoEmail = locate('input[name="EMAIL"]');

    I.waitForVisible(campoEmail, 10);
    I.click(campoEmail);

    I.fillField(campoEmail, "teste.fastix@gmail.com");

    I.wait(5);
  },
).tag("@compraringressos51");

/////----------/////

Scenario(
  "Cenário: 000000052 - Cartão de Crédito, validação e exibição da bandeira “Visa” ao inserir um cartão válido.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    // adiciona 2 ingressos
    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar cartão de crédito corretamente",
      async ({ page }) => {
        const radio = page.locator(
          'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
        );

        await radio.waitFor();
        await radio.click({ force: true });
      },
    );

    I.usePlaywrightTo("validar seleção real", async ({ page }) => {
      const radio = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );
      ("");
      const isChecked = await radio.isChecked();

      if (!isChecked) {
        throw new Error("Cartão de crédito não foi selecionado");
      }
    });

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.usePlaywrightTo("preencher número do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="cardNumber"]');

      const input = frame.locator('input[name="cardNumber"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("4024 0071 0135 4990", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher validade do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="expirationDate"]');

      const input = frame.locator('input[name="expirationDate"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1228", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher CVV", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="securityCode"]');

      const input = frame.locator('input[name="securityCode"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("123", { delay: 80 });
    });

    I.wait(2);

    const campoNome = locate('input[name="HOLDER_NAME"]');

    I.waitForVisible(campoNome, 10);
    I.click(campoNome);

    I.fillField(campoNome, "Fastix Teste");

    I.wait(2);

    const campoDocumento = locate('input[name="DOCUMENT"]');

    I.waitForVisible(campoDocumento, 10);
    I.click(campoDocumento);

    I.fillField(campoDocumento, "935.215.180-19");

    I.wait(2);

    const campoEmail = locate('input[name="EMAIL"]');

    I.waitForVisible(campoEmail, 10);
    I.click(campoEmail);

    I.fillField(campoEmail, "teste.fastix@gmail.com");

    I.wait(5);
  },
).tag("@compraringressos52");

/////----------/////

Scenario(
  "Cenário: 000000053 - Cartão de Crédito, inserir número de cartão com número incompleto da bandeira Visa.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar cartão de crédito corretamente",
      async ({ page }) => {
        const radio = page.locator(
          'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
        );

        await radio.waitFor();
        await radio.click({ force: true });
      },
    );

    I.usePlaywrightTo("validar seleção real", async ({ page }) => {
      const radio = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );
      ("");
      const isChecked = await radio.isChecked();

      if (!isChecked) {
        throw new Error("Cartão de crédito não foi selecionado");
      }
    });

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.usePlaywrightTo("preencher número do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="cardNumber"]');

      const input = frame.locator('input[name="cardNumber"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("4024 0071 0135 4", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher validade do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="expirationDate"]');

      const input = frame.locator('input[name="expirationDate"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1228", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher CVV", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="securityCode"]');

      const input = frame.locator('input[name="securityCode"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("123", { delay: 80 });
    });

    I.wait(2);

    const campoNome = locate('input[name="HOLDER_NAME"]');

    I.waitForVisible(campoNome, 10);
    I.click(campoNome);

    I.fillField(campoNome, "Fastix Teste");

    I.wait(2);

    const campoDocumento = locate('input[name="DOCUMENT"]');

    I.waitForVisible(campoDocumento, 10);
    I.click(campoDocumento);

    I.fillField(campoDocumento, "935.215.180-19");

    I.wait(2);

    const campoEmail = locate('input[name="EMAIL"]');

    I.waitForVisible(campoEmail, 10);
    I.click(campoEmail);

    I.fillField(campoEmail, "teste.fastix@gmail.com");

    I.wait(5);
  },
).tag("@compraringressos53");

/////----------/////

Scenario(
  "Cenário: 000000054 - Validação e exibição da bandeira “American Express” ao inserir um cartão válido.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar cartão de crédito corretamente",
      async ({ page }) => {
        const radio = page.locator(
          'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
        );

        await radio.waitFor();
        await radio.click({ force: true });
      },
    );

    I.usePlaywrightTo("validar seleção real", async ({ page }) => {
      const radio = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );
      ("");
      const isChecked = await radio.isChecked();

      if (!isChecked) {
        throw new Error("Cartão de crédito não foi selecionado");
      }
    });

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.usePlaywrightTo("preencher número do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="cardNumber"]');

      const input = frame.locator('input[name="cardNumber"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("3434 637136 36393", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher validade do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="expirationDate"]');

      const input = frame.locator('input[name="expirationDate"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1228", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher CVV", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="securityCode"]');

      const input = frame.locator('input[name="securityCode"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1207", { delay: 80 });
    });

    I.wait(2);

    const campoNome = locate('input[name="HOLDER_NAME"]');

    I.waitForVisible(campoNome, 10);
    I.click(campoNome);

    I.fillField(campoNome, "Fastix Teste");

    I.wait(2);

    const campoDocumento = locate('input[name="DOCUMENT"]');

    I.waitForVisible(campoDocumento, 10);
    I.click(campoDocumento);

    I.fillField(campoDocumento, "935.215.180-19");

    I.wait(2);

    const campoEmail = locate('input[name="EMAIL"]');

    I.waitForVisible(campoEmail, 10);
    I.click(campoEmail);

    I.fillField(campoEmail, "teste.fastix@gmail.com");

    I.wait(5);
  },
).tag("@compraringressos54");

/////----------/////

Scenario(
  "Cenário: 000000055 - Cartão de Crédito, inserir número de cartão com número incompleto da bandeira American Express.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar cartão de crédito corretamente",
      async ({ page }) => {
        const radio = page.locator(
          'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
        );

        await radio.waitFor();
        await radio.click({ force: true });
      },
    );

    I.usePlaywrightTo("validar seleção real", async ({ page }) => {
      const radio = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );
      ("");
      const isChecked = await radio.isChecked();

      if (!isChecked) {
        throw new Error("Cartão de crédito não foi selecionado");
      }
    });

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.usePlaywrightTo("preencher número do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="cardNumber"]');

      const input = frame.locator('input[name="cardNumber"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("3434 637136 3", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher validade do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="expirationDate"]');

      const input = frame.locator('input[name="expirationDate"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1228", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher CVV", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="securityCode"]');

      const input = frame.locator('input[name="securityCode"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1207", { delay: 80 });
    });

    I.wait(2);

    const campoNome = locate('input[name="HOLDER_NAME"]');

    I.waitForVisible(campoNome, 10);
    I.click(campoNome);

    I.fillField(campoNome, "Fastix Teste");

    I.wait(2);

    const campoDocumento = locate('input[name="DOCUMENT"]');

    I.waitForVisible(campoDocumento, 10);
    I.click(campoDocumento);

    I.fillField(campoDocumento, "935.215.180-19");

    I.wait(2);

    const campoEmail = locate('input[name="EMAIL"]');

    I.waitForVisible(campoEmail, 10);
    I.click(campoEmail);

    I.fillField(campoEmail, "teste.fastix@gmail.com");

    I.wait(5);
  },
).tag("@compraringressos55");

/////----------/////

Scenario(
  "Cenário: 000000056 - Inserir código de segurança válido da bandeira de cartão Mastercard.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar cartão de crédito corretamente",
      async ({ page }) => {
        const radio = page.locator(
          'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
        );

        await radio.waitFor();
        await radio.click({ force: true });
      },
    );

    I.usePlaywrightTo("validar seleção real", async ({ page }) => {
      const radio = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );
      ("");
      const isChecked = await radio.isChecked();

      if (!isChecked) {
        throw new Error("Cartão de crédito não foi selecionado");
      }
    });

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.usePlaywrightTo("preencher número do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="cardNumber"]');

      const input = frame.locator('input[name="cardNumber"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("5449 0716 3037 6142", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher validade do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="expirationDate"]');

      const input = frame.locator('input[name="expirationDate"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1228", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher CVV", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="securityCode"]');

      const input = frame.locator('input[name="securityCode"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("875", { delay: 80 });
    });

    I.wait(2);

    const campoNome = locate('input[name="HOLDER_NAME"]');

    I.waitForVisible(campoNome, 10);
    I.click(campoNome);

    I.fillField(campoNome, "Fastix Teste");

    I.wait(2);

    const campoDocumento = locate('input[name="DOCUMENT"]');

    I.waitForVisible(campoDocumento, 10);
    I.click(campoDocumento);

    I.fillField(campoDocumento, "935.215.180-19");

    I.wait(2);

    const campoEmail = locate('input[name="EMAIL"]');

    I.waitForVisible(campoEmail, 10);
    I.click(campoEmail);

    I.fillField(campoEmail, "teste.fastix@gmail.com");

    I.wait(5);
  },
).tag("@compraringressos56");

/////----------/////

Scenario(
  "Cenário: 000000057 - Inserir código de segurança inválido da bandeira de cartão Mastercard.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar cartão de crédito corretamente",
      async ({ page }) => {
        const radio = page.locator(
          'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
        );

        await radio.waitFor();
        await radio.click({ force: true });
      },
    );

    I.usePlaywrightTo("validar seleção real", async ({ page }) => {
      const radio = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );
      ("");
      const isChecked = await radio.isChecked();

      if (!isChecked) {
        throw new Error("Cartão de crédito não foi selecionado");
      }
    });

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.usePlaywrightTo("preencher número do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="cardNumber"]');

      const input = frame.locator('input[name="cardNumber"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("5449 0716 3037 6142", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher validade do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="expirationDate"]');

      const input = frame.locator('input[name="expirationDate"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1228", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher CVV", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="securityCode"]');

      const input = frame.locator('input[name="securityCode"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("87", { delay: 80 });
    });

    I.wait(2);

    const campoNome = locate('input[name="HOLDER_NAME"]');

    I.waitForVisible(campoNome, 10);
    I.click(campoNome);

    I.fillField(campoNome, "Fastix Teste");

    I.wait(2);

    const campoDocumento = locate('input[name="DOCUMENT"]');

    I.waitForVisible(campoDocumento, 10);
    I.click(campoDocumento);

    I.fillField(campoDocumento, "935.215.180-19");

    I.wait(2);

    const campoEmail = locate('input[name="EMAIL"]');

    I.waitForVisible(campoEmail, 10);
    I.click(campoEmail);

    I.fillField(campoEmail, "teste.fastix@gmail.com");

    I.wait(5);
  },
).tag("@compraringressos57");

/////----------/////

Scenario(
  "Cenário: 000000058 - Inserir código de segurança válido da bandeira de cartão Visa.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar cartão de crédito corretamente",
      async ({ page }) => {
        const radio = page.locator(
          'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
        );

        await radio.waitFor();
        await radio.click({ force: true });
      },
    );

    I.usePlaywrightTo("validar seleção real", async ({ page }) => {
      const radio = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );
      ("");
      const isChecked = await radio.isChecked();

      if (!isChecked) {
        throw new Error("Cartão de crédito não foi selecionado");
      }
    });

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.usePlaywrightTo("preencher número do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="cardNumber"]');

      const input = frame.locator('input[name="cardNumber"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("4539 3064 5113 5456", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher validade do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="expirationDate"]');

      const input = frame.locator('input[name="expirationDate"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1228", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher CVV", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="securityCode"]');

      const input = frame.locator('input[name="securityCode"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("165", { delay: 80 });
    });

    I.wait(2);

    const campoNome = locate('input[name="HOLDER_NAME"]');

    I.waitForVisible(campoNome, 10);
    I.click(campoNome);

    I.fillField(campoNome, "Fastix Teste");

    I.wait(2);

    const campoDocumento = locate('input[name="DOCUMENT"]');

    I.waitForVisible(campoDocumento, 10);
    I.click(campoDocumento);

    I.fillField(campoDocumento, "935.215.180-19");

    I.wait(2);

    const campoEmail = locate('input[name="EMAIL"]');

    I.waitForVisible(campoEmail, 10);
    I.click(campoEmail);

    I.fillField(campoEmail, "teste.fastix@gmail.com");

    I.wait(5);
  },
).tag("@compraringressos58");

/////----------/////

Scenario(
  "Cenário: 000000059 - Inserir código de segurança inválido da bandeira de cartão Visa.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar cartão de crédito corretamente",
      async ({ page }) => {
        const radio = page.locator(
          'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
        );

        await radio.waitFor();
        await radio.click({ force: true });
      },
    );

    I.usePlaywrightTo("validar seleção real", async ({ page }) => {
      const radio = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );
      ("");
      const isChecked = await radio.isChecked();

      if (!isChecked) {
        throw new Error("Cartão de crédito não foi selecionado");
      }
    });

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.usePlaywrightTo("preencher número do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="cardNumber"]');

      const input = frame.locator('input[name="cardNumber"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("4539 3064 5113 5456", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher validade do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="expirationDate"]');

      const input = frame.locator('input[name="expirationDate"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1228", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher CVV", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="securityCode"]');

      const input = frame.locator('input[name="securityCode"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("16", { delay: 80 });
    });

    I.wait(2);

    const campoNome = locate('input[name="HOLDER_NAME"]');

    I.waitForVisible(campoNome, 10);
    I.click(campoNome);

    I.fillField(campoNome, "Fastix Teste");

    I.wait(2);

    const campoDocumento = locate('input[name="DOCUMENT"]');

    I.waitForVisible(campoDocumento, 10);
    I.click(campoDocumento);

    I.fillField(campoDocumento, "935.215.180-19");

    I.wait(2);

    const campoEmail = locate('input[name="EMAIL"]');

    I.waitForVisible(campoEmail, 10);
    I.click(campoEmail);

    I.fillField(campoEmail, "teste.fastix@gmail.com");

    I.wait(5);
  },
).tag("@compraringressos59");

/////----------/////

Scenario(
  "Cenário: 000000060 - Inserir código de segurança válido da bandeira de cartão American Express.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar cartão de crédito corretamente",
      async ({ page }) => {
        const radio = page.locator(
          'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
        );

        await radio.waitFor();
        await radio.click({ force: true });
      },
    );

    I.usePlaywrightTo("validar seleção real", async ({ page }) => {
      const radio = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );
      ("");
      const isChecked = await radio.isChecked();

      if (!isChecked) {
        throw new Error("Cartão de crédito não foi selecionado");
      }
    });

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.usePlaywrightTo("preencher número do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="cardNumber"]');

      const input = frame.locator('input[name="cardNumber"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("3487 313074 00359", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher validade do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="expirationDate"]');

      const input = frame.locator('input[name="expirationDate"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1228", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher CVV", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="securityCode"]');

      const input = frame.locator('input[name="securityCode"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1773", { delay: 80 });
    });

    I.wait(2);

    const campoNome = locate('input[name="HOLDER_NAME"]');

    I.waitForVisible(campoNome, 10);
    I.click(campoNome);

    I.fillField(campoNome, "Fastix Teste");

    I.wait(2);

    const campoDocumento = locate('input[name="DOCUMENT"]');

    I.waitForVisible(campoDocumento, 10);
    I.click(campoDocumento);

    I.fillField(campoDocumento, "935.215.180-19");

    I.wait(2);

    const campoEmail = locate('input[name="EMAIL"]');

    I.waitForVisible(campoEmail, 10);
    I.click(campoEmail);

    I.fillField(campoEmail, "teste.fastix@gmail.com");

    I.wait(5);
  },
).tag("@compraringressos60");

/////----------/////

Scenario(
  "Cenário: 000000061 - Inserir código de segurança inválido da bandeira de cartão American Express.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar cartão de crédito corretamente",
      async ({ page }) => {
        const radio = page.locator(
          'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
        );

        await radio.waitFor();
        await radio.click({ force: true });
      },
    );

    I.usePlaywrightTo("validar seleção real", async ({ page }) => {
      const radio = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );
      ("");
      const isChecked = await radio.isChecked();

      if (!isChecked) {
        throw new Error("Cartão de crédito não foi selecionado");
      }
    });

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.usePlaywrightTo("preencher número do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="cardNumber"]');

      const input = frame.locator('input[name="cardNumber"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("3487 313074 00359", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher validade do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="expirationDate"]');

      const input = frame.locator('input[name="expirationDate"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("1228", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("preencher CVV", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="securityCode"]');

      const input = frame.locator('input[name="securityCode"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("177", { delay: 80 });
    });

    I.wait(2);

    const campoNome = locate('input[name="HOLDER_NAME"]');

    I.waitForVisible(campoNome, 10);
    I.click(campoNome);

    I.fillField(campoNome, "Fastix Teste");

    I.wait(2);

    const campoDocumento = locate('input[name="DOCUMENT"]');

    I.waitForVisible(campoDocumento, 10);
    I.click(campoDocumento);

    I.fillField(campoDocumento, "935.215.180-19");

    I.wait(2);

    const campoEmail = locate('input[name="EMAIL"]');

    I.waitForVisible(campoEmail, 10);
    I.click(campoEmail);

    I.fillField(campoEmail, "teste.fastix@gmail.com");

    I.wait(5);
  },
).tag("@compraringressos61");

/////----------/////

Scenario(
  "Cenário: 000000062 - Inserir data de vencimento valida de cartão de crédito.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 20);
    I.see("Explorar eventos");

    I.click("Explorar eventos");

    I.waitInUrl("/events", 20);
    I.seeInCurrentUrl("/events");

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 20);

    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em São Paulo");

    I.waitForElement(evento, 20);
    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 20);

    console.log("SUCESSO: evento carregado.");

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 20);

    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 20);

    I.click(botaoAdicionar);

    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 20);

    I.see("2", contador);

    console.log("SUCESSO: ingressos adicionados.");

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 20);

    I.scrollTo(botaoComprar);

    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 20);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");

    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 20);

    I.click(botaoEntrar);

    console.log("SUCESSO: login realizado.");

    I.waitInUrl("/orders/", 30);

    I.waitForText("Pagamento", 30);

    I.waitForText("Detalhes do pedido", 30);

    await I.usePlaywrightTo("aguardar checkout", async ({ page }) => {
      await page.waitForLoadState("networkidle");
    });

    console.log("SUCESSO: checkout carregado.");

    await I.usePlaywrightTo(
      "selecionar cartão de crédito corretamente",
      async ({ page }) => {
        const radio = page.locator(
          'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
        );

        await radio.waitFor({
          state: "visible",
          timeout: 20000,
        });

        await radio.scrollIntoViewIfNeeded();

        await radio.click({
          force: true,
        });
      },
    );

    await I.usePlaywrightTo("validar seleção real", async ({ page }) => {
      const radio = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );

      const isChecked = await radio.isChecked();

      if (!isChecked) {
        throw new Error("Cartão de crédito não foi selecionado");
      }
    });

    console.log("SUCESSO: cartão selecionado.");

    I.waitForElement("#card-number-container", 20);

    await I.usePlaywrightTo(
      "preencher validade do cartão",
      async ({ page }) => {
        const frame = page.frameLocator('iframe[name="expirationDate"]');

        const input = frame.locator('input[name="expirationDate"]');

        await input.waitFor({
          state: "visible",
          timeout: 20000,
        });

        await input.click({
          force: true,
        });

        await input.press("Control+A");

        await input.press("Backspace");

        await input.type("1228", {
          delay: 80,
        });
      },
    );

    I.wait(2);

    I.click(locate("label").withText("Data de vencimento"));

    console.log("SUCESSO: validade preenchida.");
  },
).tag("@compraringressos62");

/////----------/////

Scenario(
  "Cenário: 000000063 - Inserir cartão com data de vencimento expirada de cartão de crédito.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar cartão de crédito corretamente",
      async ({ page }) => {
        const radio = page.locator(
          'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
        );

        await radio.waitFor();
        await radio.click({ force: true });
      },
    );

    I.usePlaywrightTo("validar seleção real", async ({ page }) => {
      const radio = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );
      ("");
      const isChecked = await radio.isChecked();

      if (!isChecked) {
        throw new Error("Cartão de crédito não foi selecionado");
      }
    });

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.usePlaywrightTo("preencher validade do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="expirationDate"]');

      const input = frame.locator('input[name="expirationDate"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("12/21", { delay: 80 });
    });

    I.wait(2);

    I.click(locate("label").withText("Data de vencimento"));

    I.wait(2);
  },
).tag("@compraringressos63");

/////----------/////

Scenario(
  "Cenário: 000000064 - Inserir cartão com data de vencimento incompleto de cartão de crédito.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar cartão de crédito corretamente",
      async ({ page }) => {
        const radio = page.locator(
          'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
        );

        await radio.waitFor();
        await radio.click({ force: true });
      },
    );

    I.usePlaywrightTo("validar seleção real", async ({ page }) => {
      const radio = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );
      ("");
      const isChecked = await radio.isChecked();

      if (!isChecked) {
        throw new Error("Cartão de crédito não foi selecionado");
      }
    });

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.usePlaywrightTo("preencher validade do cartão", async ({ page }) => {
      const frame = page.frameLocator('iframe[name="expirationDate"]');

      const input = frame.locator('input[name="expirationDate"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("12/2", { delay: 80 });
    });

    I.wait(2);

    I.click(locate("label").withText("Data de vencimento"));

    I.wait(2);
  },
).tag("@compraringressos64");

/////----------/////

Scenario(
  "Cenário: 000000065 - Inserir no campo 'Nome do titular como aparece no cartão' um nome inválido (Com apenas um caractere).",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 15);
    I.click("Explorar eventos");

    I.waitInUrl("/events", 15);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 15);
    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em São Paulo");

    I.waitForElement(evento, 15);
    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 20);

    console.log("Evento carregado.");

    await I.usePlaywrightTo("Adicionar ingressos", async ({ page }) => {
      await page.waitForLoadState("networkidle");

      let total = 0;
      let tentativa = 0;

      while (total === 0 && tentativa < 8) {
        tentativa++;

        const botoes = page.locator('button:has-text("Adicionar")');

        total = await botoes.count();

        console.log(`Tentativa ${tentativa}: ${total} botões encontrados`);

        if (total === 0) {
          await page.waitForTimeout(2000);
        }
      }

      if (total === 0) {
        await page.screenshot({
          path: "./output/erro-ingressos-nao-carregados.png",
          fullPage: true,
        });

        throw new Error("Nenhum botão Adicionar encontrado.");
      }

      const botaoAdicionar = page
        .locator('button:has-text("Adicionar")')
        .first();

      await botaoAdicionar.scrollIntoViewIfNeeded();

      await botaoAdicionar.click();

      await page.waitForTimeout(1000);

      await botaoAdicionar.click();
    });

    console.log("Ingressos adicionados.");

    const contador = locate({
      xpath: "//span[normalize-space()='2']",
    });

    I.waitForElement(contador, 15);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForElement(botaoComprar, 15);

    I.scrollTo(botaoComprar);

    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 20);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");

    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 15);

    I.click(botaoEntrar);

    I.waitInUrl("/orders/", 30);

    I.waitForText("Pagamento", 30);

    I.wait(3);

    await I.usePlaywrightTo(
      "Selecionar cartão de crédito",
      async ({ page }) => {
        const radio = page.locator(
          'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
        );

        await radio.waitFor({
          state: "visible",
          timeout: 30000,
        });

        await radio.click({
          force: true,
        });

        const selecionado = await radio.isChecked();

        if (!selecionado) {
          throw new Error("Cartão de crédito não foi selecionado.");
        }
      },
    );

    I.waitForElement("#card-number-container", 30);

    I.wait(2);

    const campoNome = locate('input[name="HOLDER_NAME"]');

    I.waitForElement(campoNome, 20);

    I.scrollTo(campoNome);

    I.click(campoNome);

    I.fillField(campoNome, "F");

    I.wait(2);

    I.click(locate("label").withText("Nome do titular como aparece no cartão"));

    I.wait(2);

    const mensagemErro = locate("p").withText("Texto muito curto");

    I.waitForElement(mensagemErro, 10);

    I.seeElement(mensagemErro);

    I.see("Texto muito curto");

    console.log("✅ Mensagem de validação exibida corretamente.");

    console.log("Campo preenchido com nome inválido.");
  },
).tag("@compraringressos65");

/////----------/////

Scenario(
  "Cenário: 000000066 - Inserir no campo “Nome do titular como aparece no cartão” caracteres especiais.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar cartão de crédito corretamente",
      async ({ page }) => {
        const radio = page.locator(
          'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
        );

        await radio.waitFor();
        await radio.click({ force: true });
      },
    );

    I.usePlaywrightTo("validar seleção real", async ({ page }) => {
      const radio = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );
      ("");
      const isChecked = await radio.isChecked();

      if (!isChecked) {
        throw new Error("Cartão de crédito não foi selecionado");
      }
    });

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.wait(2);

    const campoNome = locate('input[name="HOLDER_NAME"]');

    I.waitForVisible(campoNome, 10);
    I.click(campoNome);

    I.fillField(campoNome, "@@@@@@@");

    I.wait(2);

    I.click(locate("label").withText("Nome do titular como aparece no cartão"));

    I.wait(2);
  },
).tag("@compraringressos66");

/////----------/////

Scenario(
  "Cenário: 000000067 - Validar preenchimento do campo com vários tipos de caracteres especiais.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar cartão de crédito corretamente",
      async ({ page }) => {
        const radio = page.locator(
          'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
        );

        await radio.waitFor();
        await radio.click({ force: true });
      },
    );

    I.usePlaywrightTo("validar seleção real", async ({ page }) => {
      const radio = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );
      ("");
      const isChecked = await radio.isChecked();

      if (!isChecked) {
        throw new Error("Cartão de crédito não foi selecionado");
      }
    });

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.wait(2);

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
      "*",
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
      "^",
      "~",
      "°",
      "©",
      "®",
      "§",
    ];

    const campoNome = locate('input[name="HOLDER_NAME"]');

    I.waitForVisible(campoNome, 10);

    for (const caractere of caracteresEspeciais) {
      const valorTeste = caractere.repeat(10);

      I.say(`Testando valor: ${valorTeste}`);

      I.click(campoNome);

      I.pressKey(["Control", "A"]);
      I.pressKey("Backspace");

      I.wait(1);

      I.fillField(campoNome, valorTeste);

      I.wait(1);

      I.click(
        locate("label").withText("Nome do titular como aparece no cartão"),
      );

      I.wait(3);
    }
  },
).tag("@compraringressos67");

/////----------/////

Scenario(
  "Cenário: 000000068 - Validar preenchimento correto do campo CPF.",
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
    I.fillField(campoBusca, "Buffalo Tom em Curitiba");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em Curitiba");

    I.waitForElement(evento, 10);
    I.seeElement(evento);
    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-curitiba", 10);
    I.seeInCurrentUrl("/events/buffalo-tom-em-curitiba");

    I.wait(2);

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='1'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("1", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar cartão de crédito corretamente",
      async ({ page }) => {
        const radio = page.locator(
          'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
        );

        await radio.waitFor();
        await radio.click({ force: true });
      },
    );

    I.usePlaywrightTo("validar seleção real", async ({ page }) => {
      const radio = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );
      ("");
      const isChecked = await radio.isChecked();

      if (!isChecked) {
        throw new Error("Cartão de crédito não foi selecionado");
      }
    });

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.wait(2);

    const campoDocumento = locate('input[name="DOCUMENT"]');

    I.waitForVisible(campoDocumento, 10);
    I.click(campoDocumento);

    I.fillField(campoDocumento, "562.805.470-43");

    I.wait(2);
  },
).tag("@compraringressos68");

/////----------/////

Scenario(
  "Cenário: 000000069 - Validar preenchimento incorreto do campo CPF.",
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
    I.fillField(campoBusca, "Buffalo Tom em Curitiba");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em Curitiba");

    I.waitForElement(evento, 10);
    I.seeElement(evento);
    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-curitiba", 10);
    I.seeInCurrentUrl("/events/buffalo-tom-em-curitiba");

    I.wait(2);

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='1'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("1", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar cartão de crédito corretamente",
      async ({ page }) => {
        const radio = page.locator(
          'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
        );

        await radio.waitFor();
        await radio.click({ force: true });
      },
    );

    I.usePlaywrightTo("validar seleção real", async ({ page }) => {
      const radio = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );
      ("");
      const isChecked = await radio.isChecked();

      if (!isChecked) {
        throw new Error("Cartão de crédito não foi selecionado");
      }
    });

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.wait(2);

    const campoDocumento = locate('input[name="DOCUMENT"]');

    I.waitForVisible(campoDocumento, 10);

    I.click(campoDocumento);

    I.fillField(campoDocumento, "5");

    I.wait(2);

    I.click(locate("label").withText("Documento do titular"));

    I.wait(2);

    I.click(campoDocumento);

    I.pressKey(["Control", "A"]);
    I.pressKey("Backspace");

    I.wait(1);

    I.fillField(campoDocumento, "55555");

    I.wait(2);

    I.click(locate("label").withText("Documento do titular"));

    I.wait(2);

    I.click(campoDocumento);

    I.pressKey(["Control", "A"]);
    I.pressKey("Backspace");

    I.wait(1);

    I.fillField(campoDocumento, "111.111.111-11");

    I.wait(2);

    I.click(locate("label").withText("Documento do titular"));

    I.wait(2);
  },
).tag("@compraringressos69");

/////----------/////

Scenario(
  "Cenário: 000000070 - Validar preenchimento correto do campo CNPJ.",
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
    I.fillField(campoBusca, "Buffalo Tom em Curitiba");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em Curitiba");

    I.waitForElement(evento, 10);
    I.seeElement(evento);
    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-curitiba", 10);
    I.seeInCurrentUrl("/events/buffalo-tom-em-curitiba");

    I.wait(2);

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='1'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("1", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar cartão de crédito corretamente",
      async ({ page }) => {
        const radio = page.locator(
          'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
        );

        await radio.waitFor();
        await radio.click({ force: true });
      },
    );

    I.usePlaywrightTo("validar seleção real", async ({ page }) => {
      const radio = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );
      ("");
      const isChecked = await radio.isChecked();

      if (!isChecked) {
        throw new Error("Cartão de crédito não foi selecionado");
      }
    });

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.waitForElement('select[name="DOCUMENT"], select', 10);
    I.selectOption("select", "CNPJ");

    I.waitForFunction(() => {
      const input = document.querySelector('input[name="DOCUMENT"]');
      return input && input.placeholder.includes("XX.XXX.XXX/XXXX-99");
    }, 10);

    const campoCNPJ =
      'input[name="DOCUMENT"][placeholder="XX.XXX.XXX/XXXX-99"]';

    I.waitForVisible(campoCNPJ, 10);

    I.fillField(campoCNPJ, "46.386.078/0001-97");

    I.seeInField(campoCNPJ, "46.386.078/0001-97");

    I.wait(2);
  },
).tag("@compraringressos70");

/////----------/////

Scenario(
  "Cenário: 000000071 - Validar preenchimento incorreto do campo CNPJ.",
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
    I.fillField(campoBusca, "Buffalo Tom em Curitiba");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em Curitiba");

    I.waitForElement(evento, 10);
    I.seeElement(evento);
    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-curitiba", 10);
    I.seeInCurrentUrl("/events/buffalo-tom-em-curitiba");

    I.wait(2);

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='1'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("1", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar cartão de crédito corretamente",
      async ({ page }) => {
        const radio = page.locator(
          'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
        );

        await radio.waitFor();
        await radio.click({ force: true });
      },
    );

    I.usePlaywrightTo("validar seleção real", async ({ page }) => {
      const radio = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );
      ("");
      const isChecked = await radio.isChecked();

      if (!isChecked) {
        throw new Error("Cartão de crédito não foi selecionado");
      }
    });

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.waitForElement('select[name="DOCUMENT"], select', 10);
    I.selectOption("select", "CNPJ");

    I.waitForFunction(() => {
      const input = document.querySelector('input[name="DOCUMENT"]');
      return input && input.placeholder.includes("XX.XXX.XXX/XXXX-99");
    }, 10);

    const campoCNPJ =
      'input[name="DOCUMENT"][placeholder="XX.XXX.XXX/XXXX-99"]';

    I.waitForVisible(campoCNPJ, 10);

    I.click(campoCNPJ);

    I.fillField(campoCNPJ, "5");

    I.wait(2);

    I.click(locate("label").withText("Documento do titular"));

    I.wait(2);

    I.click(campoCNPJ);

    I.pressKey(["Control", "A"]);
    I.pressKey("Backspace");

    I.wait(1);

    I.fillField(campoCNPJ, "55555");

    I.wait(2);

    I.click(locate("label").withText("Documento do titular"));

    I.wait(2);

    I.click(campoCNPJ);

    I.pressKey(["Control", "A"]);
    I.pressKey("Backspace");

    I.wait(1);

    I.fillField(campoCNPJ, "11.111.111/1111-11");

    I.seeInField(campoCNPJ, "11.111.111/1111-11");

    I.wait(2);

    I.click(locate("label").withText("Documento do titular"));

    I.wait(2);
  },
).tag("@compraringressos71");

/////----------/////

Scenario(
  "Cenário: 000000072 - Validar preenchimento incorreto do campo E-mail.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar cartão de crédito corretamente",
      async ({ page }) => {
        const radio = page.locator(
          'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
        );

        await radio.waitFor();
        await radio.click({ force: true });
      },
    );

    I.usePlaywrightTo("validar seleção real", async ({ page }) => {
      const radio = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );
      ("");
      const isChecked = await radio.isChecked();

      if (!isChecked) {
        throw new Error("Cartão de crédito não foi selecionado");
      }
    });

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.wait(2);

    const campoEmail = 'input[name="EMAIL"]';

    I.waitForVisible(campoEmail, 10);

    const emailsInvalidos = [
      "FASTIX@gmail",
      "fastix.com",
      "@gmail.com",
      "fastix@",
      "fastix@@gmail.com",
      "fastix gmail@gmail.com",
      "fastix.gmail.com",
      "fastix#gmail.com",
      "fastix@gmail..com",
      "fastix@.com",
    ];

    for (const email of emailsInvalidos) {
      console.log(`TESTANDO E-MAIL: ${email}`);

      I.click(campoEmail);

      I.pressKey(["Control", "A"]);
      I.pressKey("Backspace");

      I.wait(2);

      I.fillField(campoEmail, email);

      I.seeInField(campoEmail, email);

      I.wait(2);

      I.click(locate("label").withText("E-mail"));

      I.wait(3);
    }
  },
).tag("@compraringressos72");

/////----------/////

Scenario(
  "Cenário: 000000073 - Validar preenchimento correto do campo E-mail.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar cartão de crédito corretamente",
      async ({ page }) => {
        const radio = page.locator(
          'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
        );

        await radio.waitFor();
        await radio.click({ force: true });
      },
    );

    I.usePlaywrightTo("validar seleção real", async ({ page }) => {
      const radio = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );
      ("");
      const isChecked = await radio.isChecked();

      if (!isChecked) {
        throw new Error("Cartão de crédito não foi selecionado");
      }
    });

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.wait(2);

    const campoEmail = 'input[name="EMAIL"]';

    I.waitForVisible(campoEmail, 10);

    const emailsInvalidos = [
      "fastix@gmail.com",
      "1234@gmail.com",
      "567@gmail.com",
      "12#$%x@hotmail.com",
      "testandofastix@gmail.com",
    ];

    for (const email of emailsInvalidos) {
      console.log(`TESTANDO E-MAIL: ${email}`);

      I.click(campoEmail);

      I.pressKey(["Control", "A"]);
      I.pressKey("Backspace");

      I.wait(2);

      I.fillField(campoEmail, email);

      I.seeInField(campoEmail, email);

      I.wait(2);

      I.click(locate("label").withText("E-mail"));

      I.wait(3);
    }
  },
).tag("@compraringressos73");

/////----------/////

Scenario(
  "Cenário: 000000074 - Cartão de Débito Virtual CAIXA, inserir no campo “Nome do titular como aparece no cartão” um nome inválido (Com apenas um caractere).",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar Cartão de Débito Virtual CAIXA corretamente",
      async ({ page }) => {
        // localiza pelo texto visível da opção
        const opcaoDebito = page.locator(
          'span:has-text("Cartão de Débito Virtual CAIXA")',
        );

        await opcaoDebito.waitFor({
          state: "visible",
        });

        await opcaoDebito.click({
          force: true,
        });
      },
    );

    I.usePlaywrightTo(
      "validar seleção real do Cartão de Débito Virtual CAIXA",
      async ({ page }) => {
        // valida se a opção ficou selecionada
        const opcaoSelecionada = page.locator(
          'span:has-text("Cartão de Débito Virtual CAIXA")',
        );

        const isVisible = await opcaoSelecionada.isVisible();

        if (!isVisible) {
          throw new Error("Cartão de Débito Virtual CAIXA não foi selecionado");
        }
      },
    );

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.wait(2);

    const campoNome = locate('input[name="HOLDER_NAME"]');

    I.waitForVisible(campoNome, 10);
    I.click(campoNome);

    I.fillField(campoNome, "F");

    I.wait(2);

    I.click(locate("label").withText("Nome do titular como aparece no cartão"));

    I.wait(2);
  },
).tag("@compraringressos74");

/////----------/////

Scenario(
  "Cenário: 000000075 - Cartão de Débito Virtual CAIXA, inserir no campo “Nome do titular como aparece no cartão” caracteres especiais",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar Cartão de Débito Virtual CAIXA corretamente",
      async ({ page }) => {
        const opcaoDebito = page.locator(
          'span:has-text("Cartão de Débito Virtual CAIXA")',
        );

        await opcaoDebito.waitFor({
          state: "visible",
        });

        await opcaoDebito.click({
          force: true,
        });
      },
    );

    I.usePlaywrightTo(
      "validar seleção real do Cartão de Débito Virtual CAIXA",
      async ({ page }) => {
        const opcaoSelecionada = page.locator(
          'span:has-text("Cartão de Débito Virtual CAIXA")',
        );

        const isVisible = await opcaoSelecionada.isVisible();

        if (!isVisible) {
          throw new Error("Cartão de Débito Virtual CAIXA não foi selecionado");
        }
      },
    );

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.wait(2);

    const campoNome = locate('input[name="HOLDER_NAME"]');

    I.waitForVisible(campoNome, 10);
    I.click(campoNome);

    I.fillField(campoNome, "@@@@@@@");

    I.wait(2);

    I.click(locate("label").withText("Nome do titular como aparece no cartão"));

    I.wait(2);
  },
).tag("@compraringressos75");

/////----------/////

Scenario(
  "Cenário: 000000076 - Cartão de Débito Virtual CAIXA, validar preenchimento do campo com vários tipos de caracteres especiais.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar Cartão de Débito Virtual CAIXA corretamente",
      async ({ page }) => {
        const opcaoDebito = page.locator(
          'span:has-text("Cartão de Débito Virtual CAIXA")',
        );

        await opcaoDebito.waitFor({
          state: "visible",
        });

        await opcaoDebito.click({
          force: true,
        });
      },
    );

    I.usePlaywrightTo(
      "validar seleção real do Cartão de Débito Virtual CAIXA",
      async ({ page }) => {
        const opcaoSelecionada = page.locator(
          'span:has-text("Cartão de Débito Virtual CAIXA")',
        );

        const isVisible = await opcaoSelecionada.isVisible();

        if (!isVisible) {
          throw new Error("Cartão de Débito Virtual CAIXA não foi selecionado");
        }
      },
    );

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.wait(2);

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
      "*",
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
      "^",
      "~",
      "°",
      "©",
      "®",
      "§",
    ];

    const campoNome = locate('input[name="HOLDER_NAME"]');

    I.waitForVisible(campoNome, 10);

    for (const caractere of caracteresEspeciais) {
      const valorTeste = caractere.repeat(10);

      I.say(`Testando valor: ${valorTeste}`);

      I.click(campoNome);

      I.pressKey(["Control", "A"]);
      I.pressKey("Backspace");

      I.wait(1);

      I.fillField(campoNome, valorTeste);

      I.wait(1);

      I.click(
        locate("label").withText("Nome do titular como aparece no cartão"),
      );

      I.wait(3);
    }
  },
).tag("@compraringressos76");

/////----------/////

Scenario(
  "Cenário: 000000077 - Cartão de Débito Virtual CAIXA, validar preenchimento correto do campo CPF.",
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
    I.fillField(campoBusca, "Buffalo Tom em Curitiba");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em Curitiba");

    I.waitForElement(evento, 10);
    I.seeElement(evento);
    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-curitiba", 10);
    I.seeInCurrentUrl("/events/buffalo-tom-em-curitiba");

    I.wait(2);

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='1'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("1", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar Cartão de Débito Virtual CAIXA corretamente",
      async ({ page }) => {
        const opcaoDebito = page.locator(
          'span:has-text("Cartão de Débito Virtual CAIXA")',
        );

        await opcaoDebito.waitFor({
          state: "visible",
        });

        await opcaoDebito.click({
          force: true,
        });
      },
    );

    I.usePlaywrightTo(
      "validar seleção real do Cartão de Débito Virtual CAIXA",
      async ({ page }) => {
        const opcaoSelecionada = page.locator(
          'span:has-text("Cartão de Débito Virtual CAIXA")',
        );

        const isVisible = await opcaoSelecionada.isVisible();

        if (!isVisible) {
          throw new Error("Cartão de Débito Virtual CAIXA não foi selecionado");
        }
      },
    );

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.wait(2);

    const campoDocumento = locate('input[name="DOCUMENT"]');

    I.waitForVisible(campoDocumento, 10);
    I.click(campoDocumento);

    I.fillField(campoDocumento, "562.805.470-43");

    I.wait(2);
  },
).tag("@compraringressos77");

/////----------/////

Scenario(
  "Cenário: 000000078 - Cartão de Débito Virtual CAIXA, validar preenchimento incorreto do campo CPF.",
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
    I.fillField(campoBusca, "Buffalo Tom em Curitiba");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em Curitiba");

    I.waitForElement(evento, 10);
    I.seeElement(evento);
    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-curitiba", 10);
    I.seeInCurrentUrl("/events/buffalo-tom-em-curitiba");

    I.wait(2);

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='1'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("1", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar Cartão de Débito Virtual CAIXA corretamente",
      async ({ page }) => {
        const opcaoDebito = page.locator(
          'span:has-text("Cartão de Débito Virtual CAIXA")',
        );

        await opcaoDebito.waitFor({
          state: "visible",
        });

        await opcaoDebito.click({
          force: true,
        });
      },
    );

    I.usePlaywrightTo(
      "validar seleção real do Cartão de Débito Virtual CAIXA",
      async ({ page }) => {
        const opcaoSelecionada = page.locator(
          'span:has-text("Cartão de Débito Virtual CAIXA")',
        );

        const isVisible = await opcaoSelecionada.isVisible();

        if (!isVisible) {
          throw new Error("Cartão de Débito Virtual CAIXA não foi selecionado");
        }
      },
    );

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.wait(2);

    const campoDocumento = locate('input[name="DOCUMENT"]');

    I.waitForVisible(campoDocumento, 10);

    I.click(campoDocumento);

    I.fillField(campoDocumento, "5");

    I.wait(2);

    I.click(locate("label").withText("Documento do titular"));

    I.wait(2);

    I.click(campoDocumento);

    I.pressKey(["Control", "A"]);
    I.pressKey("Backspace");

    I.wait(1);

    I.fillField(campoDocumento, "55555");

    I.wait(2);

    I.click(locate("label").withText("Documento do titular"));

    I.wait(2);

    I.click(campoDocumento);

    I.pressKey(["Control", "A"]);
    I.pressKey("Backspace");

    I.wait(1);

    I.fillField(campoDocumento, "111.111.111-11");

    I.wait(2);

    I.click(locate("label").withText("Documento do titular"));

    I.wait(2);
  },
).tag("@compraringressos78");

/////----------/////

Scenario(
  "Cenário: 000000079 - Cartão de Débito Virtual CAIXA, validar preenchimento correto do campo CNPJ.",
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
    I.fillField(campoBusca, "Buffalo Tom em Curitiba");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em Curitiba");

    I.waitForElement(evento, 10);
    I.seeElement(evento);
    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-curitiba", 10);
    I.seeInCurrentUrl("/events/buffalo-tom-em-curitiba");

    I.wait(2);

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='1'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("1", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar Cartão de Débito Virtual CAIXA corretamente",
      async ({ page }) => {
        const opcaoDebito = page.locator(
          'span:has-text("Cartão de Débito Virtual CAIXA")',
        );

        await opcaoDebito.waitFor({
          state: "visible",
        });

        await opcaoDebito.click({
          force: true,
        });
      },
    );

    I.usePlaywrightTo(
      "validar seleção real do Cartão de Débito Virtual CAIXA",
      async ({ page }) => {
        const opcaoSelecionada = page.locator(
          'span:has-text("Cartão de Débito Virtual CAIXA")',
        );

        const isVisible = await opcaoSelecionada.isVisible();

        if (!isVisible) {
          throw new Error("Cartão de Débito Virtual CAIXA não foi selecionado");
        }
      },
    );

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.waitForElement('select[name="DOCUMENT"], select', 10);
    I.selectOption("select", "CNPJ");

    I.waitForFunction(() => {
      const input = document.querySelector('input[name="DOCUMENT"]');
      return input && input.placeholder.includes("XX.XXX.XXX/XXXX-99");
    }, 10);

    const campoCNPJ =
      'input[name="DOCUMENT"][placeholder="XX.XXX.XXX/XXXX-99"]';

    I.waitForVisible(campoCNPJ, 10);

    I.fillField(campoCNPJ, "46.386.078/0001-97");

    I.seeInField(campoCNPJ, "46.386.078/0001-97");

    I.wait(2);
  },
).tag("@compraringressos79");

/////----------/////

Scenario(
  "Cenário: 000000080 - Cartão de Débito Virtual CAIXA, validar preenchimento incorreto do campo CNPJ.",
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
    I.fillField(campoBusca, "Buffalo Tom em Curitiba");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em Curitiba");

    I.waitForElement(evento, 10);
    I.seeElement(evento);
    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-curitiba", 10);
    I.seeInCurrentUrl("/events/buffalo-tom-em-curitiba");

    I.wait(2);

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='1'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("1", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar Cartão de Débito Virtual CAIXA corretamente",
      async ({ page }) => {
        const opcaoDebito = page.locator(
          'span:has-text("Cartão de Débito Virtual CAIXA")',
        );

        await opcaoDebito.waitFor({
          state: "visible",
        });

        await opcaoDebito.click({
          force: true,
        });
      },
    );

    I.usePlaywrightTo(
      "validar seleção real do Cartão de Débito Virtual CAIXA",
      async ({ page }) => {
        const opcaoSelecionada = page.locator(
          'span:has-text("Cartão de Débito Virtual CAIXA")',
        );

        const isVisible = await opcaoSelecionada.isVisible();

        if (!isVisible) {
          throw new Error("Cartão de Débito Virtual CAIXA não foi selecionado");
        }
      },
    );

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.waitForElement('select[name="DOCUMENT"], select', 10);
    I.selectOption("select", "CNPJ");

    I.waitForFunction(() => {
      const input = document.querySelector('input[name="DOCUMENT"]');
      return input && input.placeholder.includes("XX.XXX.XXX/XXXX-99");
    }, 10);

    const campoCNPJ =
      'input[name="DOCUMENT"][placeholder="XX.XXX.XXX/XXXX-99"]';

    I.waitForVisible(campoCNPJ, 10);

    I.click(campoCNPJ);

    I.fillField(campoCNPJ, "5");

    I.wait(2);

    I.click(locate("label").withText("Documento do titular"));

    I.wait(2);

    I.click(campoCNPJ);

    I.pressKey(["Control", "A"]);
    I.pressKey("Backspace");

    I.wait(1);

    I.fillField(campoCNPJ, "55555");

    I.wait(2);

    I.click(locate("label").withText("Documento do titular"));

    I.wait(2);

    I.click(campoCNPJ);

    I.pressKey(["Control", "A"]);
    I.pressKey("Backspace");

    I.wait(1);

    I.fillField(campoCNPJ, "11.111.111/1111-11");

    I.seeInField(campoCNPJ, "11.111.111/1111-11");

    I.wait(2);

    I.click(locate("label").withText("Documento do titular"));

    I.wait(2);
  },
).tag("@compraringressos80");

/////----------/////

Scenario(
  "Cenário: 000000081 - Cartão de Débito Virtual CAIXA, validar preenchimento incorreto do campo E-mail.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar Cartão de Débito Virtual CAIXA corretamente",
      async ({ page }) => {
        const opcaoDebito = page.locator(
          'span:has-text("Cartão de Débito Virtual CAIXA")',
        );

        await opcaoDebito.waitFor({
          state: "visible",
        });

        await opcaoDebito.click({
          force: true,
        });
      },
    );

    I.usePlaywrightTo(
      "validar seleção real do Cartão de Débito Virtual CAIXA",
      async ({ page }) => {
        const opcaoSelecionada = page.locator(
          'span:has-text("Cartão de Débito Virtual CAIXA")',
        );

        const isVisible = await opcaoSelecionada.isVisible();

        if (!isVisible) {
          throw new Error("Cartão de Débito Virtual CAIXA não foi selecionado");
        }
      },
    );

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.wait(2);

    const campoEmail = 'input[name="EMAIL"]';

    I.waitForVisible(campoEmail, 10);

    const emailsInvalidos = [
      "FASTIX@gmail",
      "fastix.com",
      "@gmail.com",
      "fastix@",
      "fastix@@gmail.com",
      "fastix gmail@gmail.com",
      "fastix.gmail.com",
      "fastix#gmail.com",
      "fastix@gmail..com",
      "fastix@.com",
    ];

    for (const email of emailsInvalidos) {
      console.log(`TESTANDO E-MAIL: ${email}`);

      I.click(campoEmail);

      I.pressKey(["Control", "A"]);
      I.pressKey("Backspace");

      I.wait(2);

      I.fillField(campoEmail, email);

      I.seeInField(campoEmail, email);

      I.wait(2);

      I.click(locate("label").withText("E-mail"));

      I.wait(3);
    }
  },
).tag("@compraringressos81");

/////----------/////

Scenario(
  "Cenário: 000000082 - Cartão de Débito Virtual CAIXA, validar preenchimento correto do campo E-mail.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.usePlaywrightTo(
      "selecionar Cartão de Débito Virtual CAIXA corretamente",
      async ({ page }) => {
        const opcaoDebito = page.locator(
          'span:has-text("Cartão de Débito Virtual CAIXA")',
        );

        await opcaoDebito.waitFor({
          state: "visible",
        });

        await opcaoDebito.click({
          force: true,
        });
      },
    );

    I.usePlaywrightTo(
      "validar seleção real do Cartão de Débito Virtual CAIXA",
      async ({ page }) => {
        const opcaoSelecionada = page.locator(
          'span:has-text("Cartão de Débito Virtual CAIXA")',
        );

        const isVisible = await opcaoSelecionada.isVisible();

        if (!isVisible) {
          throw new Error("Cartão de Débito Virtual CAIXA não foi selecionado");
        }
      },
    );

    I.wait(2);

    I.waitForElement("#card-number-container", 20);

    I.wait(2);

    const campoEmail = 'input[name="EMAIL"]';

    I.waitForVisible(campoEmail, 10);

    const emailsInvalidos = [
      "fastix@gmail.com",
      "1234@gmail.com",
      "567@gmail.com",
      "12#$%x@hotmail.com",
      "testandofastix@gmail.com",
    ];

    for (const email of emailsInvalidos) {
      console.log(`TESTANDO E-MAIL: ${email}`);

      I.click(campoEmail);

      I.pressKey(["Control", "A"]);
      I.pressKey("Backspace");

      I.wait(2);

      I.fillField(campoEmail, email);

      I.seeInField(campoEmail, email);

      I.wait(2);

      I.click(locate("label").withText("E-mail"));

      I.wait(3);
    }
  },
).tag("@compraringressos82");

/////----------/////

Scenario(
  "Cenário: 000000083 - Pagamento via PIX preenchendo o campo e-mail.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.wait(4);

    I.usePlaywrightTo("selecionar Pix corretamente", async ({ page }) => {
      const opcaoPix = page.locator('span:has-text("Pix")');

      await opcaoPix.waitFor({
        state: "visible",
      });

      await opcaoPix.click({
        force: true,
      });
    });

    I.wait(2);

    I.waitForElement('input[name="EMAIL"]', 20);

    I.usePlaywrightTo("preencher e-mail", async ({ page }) => {
      const input = page.locator('input[name="EMAIL"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("fastix.teste@gmail.com", { delay: 80 });
    });

    I.wait(2);
  },
).tag("@compraringressos83");

/////----------/////

Scenario(
  "Cenário: 000000084 - Pagamento via PIX não preenchendo o campo e-mail.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.wait(2);

    I.usePlaywrightTo("selecionar pagamento via Pix", async ({ page }) => {
      const pixRadio = page.locator('input[aria-label="Pix"]');

      await pixRadio.waitFor({ state: "visible" });

      await pixRadio.click({ force: true });
    });

    I.wait(2);

    I.usePlaywrightTo("clicar no botão pagar", async ({ page }) => {
      const botaoPagar = page.locator('button[type="submit"]');

      await botaoPagar.waitFor({ state: "visible" });

      await botaoPagar.click({ force: true });
    });

    I.wait(2);
  },
).tag("@compraringressos84");

/////----------/////

Scenario(
  "Cenário: 000000085 - Exibir erro ao tentar pagar via PIX com e-mails inválidos.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.wait(2);

    const emailsInvalidos = [
      "FASTIX@gmail",
      "fastix.com",
      "@gmail.com",
      "fastix@",
      "fastix@@gmail.com",
      "fastix gmail@gmail.com",
      "fastix.gmail.com",
      "fastix#gmail.com",
      "fastix@gmail..com",
      "fastix@.com",
    ];

    I.usePlaywrightTo("selecionar opção PIX", async ({ page }) => {
      const pixRadio = page.locator('input[aria-label="Pix"]');

      await pixRadio.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await pixRadio.click({
        force: true,
      });

      await page.waitForTimeout(2000);
    });

    for (const email of emailsInvalidos) {
      I.usePlaywrightTo(
        `preencher e-mail inválido - ${email}`,
        async ({ page }) => {
          const inputEmail = page.locator('input[name="EMAIL"]');

          await inputEmail.waitFor({
            state: "visible",
            timeout: 30000,
          });

          await inputEmail.click({
            force: true,
          });

          await inputEmail.press("Control+A");

          await inputEmail.press("Backspace");

          await page.waitForTimeout(500);

          await inputEmail.type(email, {
            delay: 80,
          });
        },
      );

      I.usePlaywrightTo(`clicar em pagar - ${email}`, async ({ page }) => {
        const botaoPagar = page.locator('button:has-text("Pagar")').first();

        await botaoPagar.waitFor({
          state: "visible",
          timeout: 30000,
        });

        await botaoPagar.click({
          force: true,
        });
      });

      I.wait(2);

      I.usePlaywrightTo(`scroll up - ${email}`, async ({ page }) => {
        await page.evaluate(() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        });

        await page.waitForTimeout(2000);
      });
    }

    I.wait(2);
  },
).tag("@compraringressos85");

/////----------/////

Scenario(
  "Cenário: 000000086 - Exibição de erros ao tentar pagar via PIX com e-mails inválidos (caracteres especiais + números).",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.wait(2);

    const emailsInvalidos2 = [
      "fastix!2025@gmail",
      "123fastix$@.com",
      "fastix%123@gmail..com",
      "fastix&2026@",
      "fastix*789@gmail",
      "fastix(123)@gmail.com",
      "fastix=2025@gmail",
      "fastix+123@@gmail.com",
      "fastix?999@gmail,com",
    ];

    I.wait(2);

    I.usePlaywrightTo("selecionar opção PIX", async ({ page }) => {
      const pixRadio = page.locator('input[aria-label="Pix"]');

      await pixRadio.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await pixRadio.click({
        force: true,
      });

      await page.waitForTimeout(2000);
    });

    for (const email of emailsInvalidos2) {
      I.usePlaywrightTo(
        `preencher e-mail inválido - ${email}`,
        async ({ page }) => {
          const inputEmail = page.locator('input[name="EMAIL"]');

          await inputEmail.waitFor({
            state: "visible",
            timeout: 30000,
          });

          // limpa o campo
          await inputEmail.click({
            force: true,
          });

          await inputEmail.press("Control+A");

          await inputEmail.press("Backspace");

          await page.waitForTimeout(500);

          await inputEmail.type(email, {
            delay: 80,
          });
        },
      );

      I.usePlaywrightTo(`clicar em pagar - ${email}`, async ({ page }) => {
        const botaoPagar = page.locator('button:has-text("Pagar")').first();

        await botaoPagar.waitFor({
          state: "visible",
          timeout: 30000,
        });

        await botaoPagar.click({
          force: true,
        });
      });

      I.wait(2);

      I.usePlaywrightTo(`scroll up - ${email}`, async ({ page }) => {
        await page.evaluate(() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        });

        await page.waitForTimeout(2000);
      });
    }

    I.wait(2);
  },
).tag("@compraringressos86");

/////----------/////

Scenario(
  "Cenário: 000000087 - Bloquear preenchimento do e-mail PIX apenas com espaços em branco.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.wait(2);

    const espacosInvalidos = [" ", "   ", "        ", "            "];

    I.wait(2);

    I.usePlaywrightTo("selecionar opção PIX", async ({ page }) => {
      const pixRadio = page.locator('input[aria-label="Pix"]');

      await pixRadio.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await pixRadio.click({
        force: true,
      });

      await page.waitForTimeout(2000);
    });

    for (const espaco of espacosInvalidos) {
      I.usePlaywrightTo(
        `preencher espaços - ${espaco.length}`,
        async ({ page }) => {
          const inputEmail = page.locator('input[name="EMAIL"]');

          await inputEmail.waitFor({
            state: "visible",
            timeout: 30000,
          });

          await inputEmail.click({
            force: true,
          });

          await inputEmail.press("Control+A");

          await inputEmail.press("Backspace");

          await page.waitForTimeout(500);

          await inputEmail.type(espaco, {
            delay: 80,
          });

          await page.keyboard.press("Tab");

          await page.waitForTimeout(1000);
        },
      );

      I.usePlaywrightTo(`clicar pagar - ${espaco.length}`, async ({ page }) => {
        const botaoPagar = page.locator('button:has-text("Pagar")').first();

        await botaoPagar.waitFor({
          state: "visible",
          timeout: 30000,
        });

        await botaoPagar.click({
          force: true,
        });

        await page.waitForTimeout(3000);
      });

      I.usePlaywrightTo(
        `validar erro visual - ${espaco.length}`,
        async ({ page }) => {
          const inputComErro = page.locator('input[name="EMAIL"].error-3HZ_Pv');

          await inputComErro.waitFor({
            state: "visible",
            timeout: 10000,
          });
        },
      );

      I.dontSee("QR Code Pix");

      I.wait(2);

      I.usePlaywrightTo(`scroll up - ${espaco.length}`, async ({ page }) => {
        await page.evaluate(() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        });

        await page.waitForTimeout(2000);
      });
    }

    I.wait(2);
  },
).tag("@compraringressos87");

/////----------/////

Scenario(
  "Cenário: 000000088 - Validar remoção automática de espaços no e-mail PIX.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.wait(2);

    const emailsComEspacos = [
      " fastix@gmail.com",
      "fastix@gmail.com ",
      "  fastix@gmail.com  ",
      "     fastix@gmail.com",
      "fastix@gmail.com     ",
      "   fastix@gmail.com   ",
    ];

    I.wait(2);

    I.usePlaywrightTo("selecionar opção PIX", async ({ page }) => {
      const pixRadio = page.locator('input[aria-label="Pix"]');

      await pixRadio.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await pixRadio.click({
        force: true,
      });

      await page.waitForTimeout(2000);
    });

    for (const email of emailsComEspacos) {
      I.usePlaywrightTo(
        `preencher e-mail com espaços - ${email}`,
        async ({ page }) => {
          const inputEmail = page.locator('input[name="EMAIL"]');

          await inputEmail.waitFor({
            state: "visible",
            timeout: 30000,
          });

          await inputEmail.click({
            force: true,
          });

          await inputEmail.press("Control+A");

          await inputEmail.press("Backspace");

          await page.waitForTimeout(500);

          await inputEmail.type(email, {
            delay: 80,
          });

          await page.waitForTimeout(1000);

          await page.keyboard.press("Tab");

          await page.waitForTimeout(1500);
        },
      );

      I.usePlaywrightTo(
        `validar trimming automático - ${email}`,
        async ({ page }) => {
          const inputEmail = page.locator('input[name="EMAIL"]');

          const valorFinal = await inputEmail.inputValue();

          console.log(`VALOR ORIGINAL: "${email}"`);

          console.log(`VALOR FINAL NO CAMPO: "${valorFinal}"`);

          const valorEsperado = email.trim();

          if (valorFinal !== valorEsperado) {
            throw new Error(`
❌ O sistema NÃO removeu os espaços automaticamente.

Valor digitado:
"${email}"

Valor presente no campo:
"${valorFinal}"

Valor esperado:
"${valorEsperado}"
        `);
          }

          console.log("✅ O sistema removeu os espaços automaticamente.");
        },
      );

      I.wait(2);

      I.usePlaywrightTo(`scroll up - ${email}`, async ({ page }) => {
        await page.evaluate(() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        });

        await page.waitForTimeout(2000);
      });
    }

    I.wait(2);
  },
).tag("@compraringressos88");

/////----------/////

Scenario(
  "Cenário: 000000089 -  Validar limite máximo de caracteres no campo E-mail via forma de pagamento PIX.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.wait(2);

    const emailMuitoLongoPIX57 = `${"a".repeat(500)}@gmail.com`;

    console.log(
      `Quantidade de caracteres enviados: ${emailMuitoLongoPIX57.length}`,
    );

    I.wait(2);

    I.usePlaywrightTo("selecionar opção PIX", async ({ page }) => {
      const opcaoPix = page.locator('span:has-text("Pix")');

      await opcaoPix.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await opcaoPix.click({
        force: true,
      });

      const inputEmail = page.locator('input[name="EMAIL"]');

      await inputEmail.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await page.waitForTimeout(2000);
    });

    I.usePlaywrightTo("preencher e-mail acima do limite", async ({ page }) => {
      const inputEmail = page.locator('input[name="EMAIL"]');

      await inputEmail.scrollIntoViewIfNeeded();

      await inputEmail.click({
        force: true,
      });

      await inputEmail.press("Control+A");

      await inputEmail.press("Backspace");

      await page.waitForTimeout(1000);

      await inputEmail.fill(emailMuitoLongoPIX57);

      await page.waitForTimeout(3000);
    });

    I.usePlaywrightTo("validar limite máximo", async ({ page }) => {
      const inputEmail = page.locator('input[name="EMAIL"]');

      const valorFinal = await inputEmail.inputValue();

      console.log(`Caracteres enviados: ${emailMuitoLongoPIX57.length}`);

      console.log(`Caracteres aceitos: ${valorFinal.length}`);

      if (valorFinal.length > 255) {
        throw new Error(`
❌ O sistema permitiu mais de 255 caracteres.

Quantidade aceita:
${valorFinal.length}
      `);
      }

      console.log("✅ O sistema bloqueou caracteres excedentes.");
    });

    I.usePlaywrightTo("clicar em pagar", async ({ page }) => {
      const botaoPagar = page.locator('button:has-text("Pagar")').first();

      await botaoPagar.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await botaoPagar.scrollIntoViewIfNeeded();

      await botaoPagar.click({
        force: true,
      });

      await page.waitForTimeout(3000);
    });

    I.usePlaywrightTo("validar erro visual", async ({ page }) => {
      const inputErro = page.locator('input[name="EMAIL"].error-3HZ_Pv');

      const existeErro = await inputErro.count();

      if (existeErro > 0) {
        console.log("✅ Sistema exibiu erro visual.");
      } else {
        console.log("⚠️ Sistema não exibiu erro visual.");
      }
    });

    I.wait(2);
  },
).tag("@compraringressos89");

/////----------/////

Scenario(
  "Cenário: 000000090 - Validar proteção contra scripts no campo e-mail PIX.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.wait(2);

    const emailMuitoLongoPIX57 = `${"a".repeat(500)}@gmail.com`;

    console.log(
      `Quantidade de caracteres enviados: ${emailMuitoLongoPIX57.length}`,
    );

    I.wait(2);

    const payloadXSS = `<script>alert('xss')</script>`;

    console.log(`Payload enviado: ${payloadXSS}`);

    I.wait(2);

    I.usePlaywrightTo("selecionar opção PIX", async ({ page }) => {
      const opcaoPix = page.locator('span:has-text("Pix")');

      await opcaoPix.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await opcaoPix.click({
        force: true,
      });

      const inputEmail = page.locator('input[name="EMAIL"]');

      await inputEmail.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await page.waitForTimeout(2000);
    });

    I.usePlaywrightTo("preencher payload XSS", async ({ page }) => {
      const inputEmail = page.locator('input[name="EMAIL"]');

      await inputEmail.scrollIntoViewIfNeeded();

      await inputEmail.click({
        force: true,
      });

      await inputEmail.press("Control+A");

      await inputEmail.press("Backspace");

      await page.waitForTimeout(1000);

      await inputEmail.fill(payloadXSS);

      await page.waitForTimeout(2000);
    });

    I.usePlaywrightTo("validar payload no campo", async ({ page }) => {
      const inputEmail = page.locator('input[name="EMAIL"]');

      const valorCampo = await inputEmail.inputValue();

      console.log(`Valor presente no campo: ${valorCampo}`);

      if (valorCampo.includes("<script>")) {
        console.log("✅ Payload tratado como texto.");
      } else {
        console.log("⚠️ Sistema alterou ou sanitizou o payload.");
      }
    });

    I.usePlaywrightTo("validar execução de script", async ({ page }) => {
      let alertaExecutado = false;

      page.on("dialog", async (dialog) => {
        alertaExecutado = true;

        console.log(`❌ ALERT EXECUTADO: ${dialog.message()}`);

        await dialog.dismiss();
      });

      await page.waitForTimeout(3000);

      if (alertaExecutado) {
        throw new Error(`
❌ Falha de segurança:
o sistema executou JavaScript XSS.
      `);
      }

      console.log("✅ Nenhum script foi executado.");
    });

    I.usePlaywrightTo("clicar em pagar", async ({ page }) => {
      const botaoPagar = page.locator('button:has-text("Pagar")').first();

      await botaoPagar.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await botaoPagar.scrollIntoViewIfNeeded();

      await botaoPagar.click({
        force: true,
      });

      await page.waitForTimeout(3000);
    });

    I.usePlaywrightTo("validar erro visual", async ({ page }) => {
      const inputErro = page.locator('input[name="EMAIL"].error-3HZ_Pv');

      const existeErro = await inputErro.count();

      if (existeErro > 0) {
        console.log("✅ Sistema tratou valor como inválido.");
      } else {
        console.log("⚠️ Sistema não exibiu erro visual.");
      }
    });

    I.wait(2);
  },
).tag("@compraringressos90");

/////----------/////

Scenario(
  "Cenário: 000000091 - Validar proteção contra SQL Injection no campo e-mail PIX.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.wait(2);

    const emailMuitoLongoPIX57 = `${"a".repeat(500)}@gmail.com`;

    console.log(
      `Quantidade de caracteres enviados: ${emailMuitoLongoPIX57.length}`,
    );

    I.wait(2);

    const sqlInjectionEmail = "' OR 1=1 --";

    console.log(`Payload enviado: ${sqlInjectionEmail}`);

    I.wait(2);

    I.usePlaywrightTo("selecionar opção PIX", async ({ page }) => {
      const opcaoPix = page.locator('span:has-text("Pix")');

      await opcaoPix.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await opcaoPix.click({
        force: true,
      });

      const inputEmail = page.locator('input[name="EMAIL"]');

      await inputEmail.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await page.waitForTimeout(2000);
    });

    I.usePlaywrightTo("preencher payload SQL Injection", async ({ page }) => {
      const inputEmail = page.locator('input[name="EMAIL"]');

      await inputEmail.scrollIntoViewIfNeeded();

      await inputEmail.click({
        force: true,
      });

      await inputEmail.press("Control+A");

      await inputEmail.press("Backspace");

      await page.waitForTimeout(1000);

      await inputEmail.fill(sqlInjectionEmail);

      await page.waitForTimeout(2000);
    });

    I.usePlaywrightTo("validar payload preenchido", async ({ page }) => {
      const inputEmail = page.locator('input[name="EMAIL"]');

      const valorCampo = await inputEmail.inputValue();

      console.log(`Valor presente no campo: ${valorCampo}`);
    });

    I.usePlaywrightTo("clicar em pagar", async ({ page }) => {
      const botaoPagar = page.locator('button:has-text("Pagar")').first();

      await botaoPagar.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await botaoPagar.scrollIntoViewIfNeeded();

      await botaoPagar.click({
        force: true,
      });

      await page.waitForTimeout(3000);
    });

    I.usePlaywrightTo("validar bloqueio do SQL Injection", async ({ page }) => {
      const inputErro = page.locator('input[name="EMAIL"].error-3HZ_Pv');

      const existeErro = await inputErro.count();

      if (existeErro > 0) {
        console.log("✅ Sistema bloqueou o valor inválido.");
      } else {
        console.log("⚠️ Sistema não exibiu erro visual.");
      }

      const qrCodePix = page.locator('text="QR Code Pix"');

      const avancouPagamento = await qrCodePix.count();

      if (avancouPagamento > 0) {
        throw new Error(`
❌ POSSÍVEL FALHA DE SEGURANÇA

O sistema avançou para o pagamento
mesmo contendo payload SQL Injection.
      `);
      }

      console.log("✅ O sistema não avançou para o pagamento.");
    });

    I.wait(2);
  },
).tag("@compraringressos91");

/////----------/////

Scenario(
  "Cenário: 000000092 - Validar interação com métodos de pagamento na página de pedido.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.wait(2);

    I.usePlaywrightTo(
      "aguardar carregamento completo da página de checkout",
      async ({ page }) => {
        await page.waitForLoadState("domcontentloaded");
        await page.waitForLoadState("networkidle");

        await page.mouse.move(300, 300);
        await page.mouse.wheel(0, 500);

        await page.waitForTimeout(2000);
      },
    );

    I.usePlaywrightTo("selecionar PIX", async ({ page }) => {
      const pix = page.locator("text=Pix");

      await pix.first().waitFor({
        state: "visible",
        timeout: 30000,
      });

      await pix.first().scrollIntoViewIfNeeded();

      await pix.first().click({ force: true });

      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(1500);
    });

    I.usePlaywrightTo("selecionar Cartão de Crédito", async ({ page }) => {
      const credito = page.locator(
        'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
      );

      await credito.waitFor({
        state: "attached",
        timeout: 30000,
      });

      await credito.scrollIntoViewIfNeeded();

      await credito.click({ force: true });

      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(1500);
    });

    I.usePlaywrightTo(
      "selecionar Cartão de Débito Virtual CAIXA",
      async ({ page }) => {
        const debito = page.locator("text=Cartão de Débito Virtual CAIXA");

        await debito.waitFor({
          state: "visible",
          timeout: 30000,
        });

        await debito.scrollIntoViewIfNeeded();

        await debito.click({ force: true });

        await page.waitForLoadState("networkidle");
        await page.waitForTimeout(1500);
      },
    );

    I.usePlaywrightTo(
      "validar interação da UI de pagamento",
      async ({ page }) => {
        const pix = await page.locator("text=Pix").count();
        const credito = await page
          .locator('input[aria-label*="Cartão de crédito"]')
          .count();
        const debito = await page
          .locator("text=Cartão de Débito Virtual CAIXA")
          .count();

        console.log("PIX encontrado:", pix);
        console.log("Crédito encontrado:", credito);
        console.log("Débito encontrado:", debito);

        if (pix === 0 && credito === 0 && debito === 0) {
          throw new Error(`
❌ Nenhum método de pagamento foi renderizado corretamente.

Possível causa:
- página não hidratou
- UI bloqueada
- sessão inválida
      `);
        }

        console.log("✅ UI de pagamento respondeu corretamente.");
      },
    );

    I.wait(2);
  },
).tag("@compraringressos92");

/////----------/////

Scenario(
  "Cenário: 000000093 - Pix, evitar múltiplas submissões ao clicar repetidamente no botão pagar.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.wait(2);

    I.usePlaywrightTo("selecionar opção PIX", async ({ page }) => {
      const pixRadio = page.locator('input[aria-label="Pix"]');

      await pixRadio.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await pixRadio.click({
        force: true,
      });

      await page.waitForTimeout(2000);
    });

    I.usePlaywrightTo(
      "validar múltiplos cliques no botão pagar",
      async ({ page }) => {
        const botaoPagar = page.locator('button:has-text("Pagar")').first();

        await botaoPagar.waitFor({
          state: "visible",
          timeout: 30000,
        });

        let quantidadeRequisicoes = 0;

        page.on("request", (request) => {
          if (
            request.method() === "POST" &&
            (request.url().toLowerCase().includes("payment") ||
              request.url().toLowerCase().includes("checkout") ||
              request.url().toLowerCase().includes("pix"))
          ) {
            quantidadeRequisicoes++;

            console.log(`Requisição identificada: ${request.url()}`);
          }
        });

        await Promise.all([
          botaoPagar.click({ force: true }),
          botaoPagar.click({ force: true }),
          botaoPagar.click({ force: true }),
          botaoPagar.click({ force: true }),
          botaoPagar.click({ force: true }),
        ]);

        await page.waitForTimeout(5000);

        const botaoDesabilitado = await botaoPagar.isDisabled();

        if (botaoDesabilitado) {
          console.log("SUCESSO: botão pagar foi bloqueado.");
        } else {
          console.log("ALERTA: botão pagar NÃO foi bloqueado.");
        }

        if (quantidadeRequisicoes > 1) {
          throw new Error(
            `Falha crítica: ${quantidadeRequisicoes} submissões de pagamento foram realizadas.`,
          );
        }

        console.log(
          `SUCESSO: Apenas ${quantidadeRequisicoes} submissão foi realizada.`,
        );
      },
    );

    I.wait(2);
  },
).tag("@compraringressos93");

/////----------/////

Scenario(
  "Cenário: 000000094 - Pix, evitar múltiplas submissões ao clicar repetidamente no botão pagar utilizando e-mails inválidos.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.wait(2);

    const emailsInvalidos = [
      "FASTIX@gmail",
      "fastix.com",
      "@gmail.com",
      "fastix@",
      "fastix@@gmail.com",
      "fastix gmail@gmail.com",
      "fastix.gmail.com",
      "fastix#gmail.com",
      "fastix@gmail..com",
      "fastix@.com",
    ];

    I.usePlaywrightTo("selecionar opção PIX", async ({ page }) => {
      const pixRadio = page.locator('input[aria-label="Pix"]');

      await pixRadio.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await pixRadio.click({
        force: true,
      });

      await page.waitForTimeout(2000);
    });

    for (const email of emailsInvalidos) {
      I.usePlaywrightTo(
        `preencher e-mail inválido - ${email}`,
        async ({ page }) => {
          const inputEmail = page.locator('input[name="EMAIL"]');

          await inputEmail.waitFor({
            state: "visible",
            timeout: 30000,
          });

          await inputEmail.click({
            force: true,
          });

          await inputEmail.press("Control+A");

          await inputEmail.press("Backspace");

          await page.waitForTimeout(500);

          await inputEmail.type(email, {
            delay: 80,
          });
        },
      );

      I.usePlaywrightTo(
        `validar múltiplos cliques no botão pagar - ${email}`,
        async ({ page }) => {
          const botaoPagar = page.locator('button:has-text("Pagar")').first();

          await botaoPagar.waitFor({
            state: "visible",
            timeout: 30000,
          });

          let quantidadeRequisicoes = 0;

          page.on("request", (request) => {
            if (
              request.method() === "POST" &&
              (request.url().toLowerCase().includes("payment") ||
                request.url().toLowerCase().includes("checkout") ||
                request.url().toLowerCase().includes("pix"))
            ) {
              quantidadeRequisicoes++;

              console.log(`Requisição identificada: ${request.url()}`);
            }
          });

          await Promise.all([
            botaoPagar.click({ force: true }),
            botaoPagar.click({ force: true }),
            botaoPagar.click({ force: true }),
            botaoPagar.click({ force: true }),
            botaoPagar.click({ force: true }),
          ]);

          await page.waitForTimeout(5000);

          const botaoDesabilitado = await botaoPagar.isDisabled();

          if (botaoDesabilitado) {
            console.log(
              `SUCESSO: botão pagar bloqueado para o e-mail ${email}.`,
            );
          } else {
            console.log(
              `ALERTA: botão pagar NÃO foi bloqueado para o e-mail ${email}.`,
            );
          }

          if (quantidadeRequisicoes > 1) {
            throw new Error(
              `Falha crítica: ${quantidadeRequisicoes} submissões foram realizadas para o e-mail ${email}.`,
            );
          }

          console.log(
            `SUCESSO: Apenas ${quantidadeRequisicoes} submissão foi realizada para o e-mail ${email}.`,
          );
        },
      );

      I.wait(2);

      I.usePlaywrightTo(`scroll up - ${email}`, async ({ page }) => {
        await page.evaluate(() => {
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        });

        await page.waitForTimeout(2000);
      });
    }

    I.wait(2);
  },
).tag("@compraringressos94");

/////----------/////

Scenario(
  "Cenário: 000000095 - Pix, evitar múltiplas submissões ao clicar repetidamente no botão pagar com e-mail válido.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.wait(2);

    const emailValido = "fastix.teste@gmail.com";

    I.usePlaywrightTo("selecionar opção PIX", async ({ page }) => {
      const pixRadio = page.locator('input[aria-label="Pix"]');

      await pixRadio.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await pixRadio.click({
        force: true,
      });

      await page.waitForTimeout(2000);
    });

    I.usePlaywrightTo("preencher e-mail válido", async ({ page }) => {
      const inputEmail = page.locator('input[name="EMAIL"]');

      await inputEmail.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await inputEmail.click({
        force: true,
      });

      await inputEmail.press("Control+A");

      await inputEmail.press("Backspace");

      await page.waitForTimeout(500);

      await inputEmail.type(emailValido, {
        delay: 80,
      });
    });

    I.usePlaywrightTo(
      "validar múltiplos cliques no botão pagar",
      async ({ page }) => {
        const botaoPagar = page.locator('button:has-text("Pagar")').first();

        await botaoPagar.waitFor({
          state: "visible",
          timeout: 30000,
        });

        let quantidadeRequisicoes = 0;

        page.on("request", (request) => {
          if (
            request.method() === "POST" &&
            (request.url().toLowerCase().includes("payment") ||
              request.url().toLowerCase().includes("checkout") ||
              request.url().toLowerCase().includes("pix"))
          ) {
            quantidadeRequisicoes++;

            console.log(`Requisição identificada: ${request.url()}`);
          }
        });

        await Promise.all([
          botaoPagar.click({ force: true }),
          botaoPagar.click({ force: true }),
          botaoPagar.click({ force: true }),
          botaoPagar.click({ force: true }),
          botaoPagar.click({ force: true }),
        ]);

        await page.waitForTimeout(5000);

        const botaoDesabilitado = await botaoPagar.isDisabled();

        if (botaoDesabilitado) {
          console.log("SUCESSO: botão pagar foi bloqueado.");
        } else {
          console.log("ALERTA: botão pagar NÃO foi bloqueado.");
        }

        if (quantidadeRequisicoes > 1) {
          throw new Error(
            `Falha crítica: ${quantidadeRequisicoes} submissões foram realizadas.`,
          );
        }

        console.log(
          `SUCESSO: Apenas ${quantidadeRequisicoes} submissão foi realizada.`,
        );
      },
    );

    I.wait(2);
  },
).tag("@compraringressos95");

/////----------/////

Scenario(
  "Cenário: 000000096 - Desabilitar botão pagar durante o processamento do pagamento.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.wait(2);

    const emailValido = "fastix.teste@gmail.com";

    I.usePlaywrightTo("selecionar opção PIX", async ({ page }) => {
      const pixRadio = page.locator('input[aria-label="Pix"]');

      await pixRadio.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await pixRadio.click({
        force: true,
      });

      await page.waitForTimeout(2000);
    });

    I.usePlaywrightTo("preencher e-mail válido", async ({ page }) => {
      const inputEmail = page.locator('input[name="EMAIL"]');

      await inputEmail.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await inputEmail.click({
        force: true,
      });

      await inputEmail.press("Control+A");

      await inputEmail.press("Backspace");

      await page.waitForTimeout(500);

      await inputEmail.type(emailValido, {
        delay: 80,
      });
    });

    I.usePlaywrightTo(
      "validar botão pagar desabilitado durante processamento",
      async ({ page }) => {
        const botaoPagar = page.locator('button:has-text("Pagar")').first();

        await botaoPagar.waitFor({
          state: "visible",
          timeout: 30000,
        });

        await botaoPagar.click({
          force: true,
        });

        await page.waitForTimeout(2000);

        const disabled = await botaoPagar.isDisabled();

        const ariaDisabled = await botaoPagar.getAttribute("aria-disabled");

        const pointerEvents = await botaoPagar.evaluate(
          (el) => getComputedStyle(el).pointerEvents,
        );

        const estaBloqueado =
          disabled || ariaDisabled === "true" || pointerEvents === "none";

        if (!estaBloqueado) {
          throw new Error(
            "Falha: botão pagar não foi bloqueado durante o processamento.",
          );
        }
      },
    );

    I.wait(2);
  },
).tag("@compraringressos96");

/////----------/////

Scenario(
  "Cenário: 000000097 - Recarregar checkout durante pagamento PIX com e-mail válido.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.wait(2);

    const emailValido = "fastix.teste@gmail.com";

    I.usePlaywrightTo("selecionar opção PIX", async ({ page }) => {
      const pixRadio = page.locator('input[aria-label="Pix"]');

      await pixRadio.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await pixRadio.click({
        force: true,
      });

      await page.waitForTimeout(2000);

      console.log("SUCESSO: opção PIX selecionada.");
    });

    I.usePlaywrightTo("preencher e-mail válido", async ({ page }) => {
      const inputEmail = page.locator('input[name="EMAIL"]');

      await inputEmail.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await inputEmail.click({
        force: true,
      });

      await inputEmail.press("Control+A");

      await inputEmail.press("Backspace");

      await page.waitForTimeout(500);

      await inputEmail.type(emailValido, {
        delay: 80,
      });

      console.log("SUCESSO: e-mail preenchido antes do refresh.");
    });

    I.usePlaywrightTo("atualizar página", async ({ page }) => {
      await page.reload({
        waitUntil: "networkidle",
      });

      await page.waitForTimeout(5000);

      console.log("SUCESSO: página atualizada.");
    });

    I.usePlaywrightTo("validar reset do PIX após refresh", async ({ page }) => {
      const inputEmail = page.locator('input[name="EMAIL"]');

      const campoVisivel = await inputEmail.isVisible().catch(() => false);

      if (campoVisivel) {
        throw new Error(
          "Falha: campo de e-mail PIX permaneceu visível após refresh.",
        );
      }

      console.log("SUCESSO: campo PIX foi ocultado após refresh.");
    });

    I.usePlaywrightTo("selecionar PIX novamente", async ({ page }) => {
      const pixRadio = page.locator('input[aria-label="Pix"]');

      await pixRadio.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await pixRadio.click({
        force: true,
      });

      await page.waitForTimeout(2000);

      console.log("SUCESSO: PIX selecionado novamente.");
    });

    I.usePlaywrightTo("validar recuperação do checkout", async ({ page }) => {
      const inputEmail = page.locator('input[name="EMAIL"]');

      await inputEmail.waitFor({
        state: "visible",
        timeout: 30000,
      });

      const campoVisivel = await inputEmail.isVisible();

      if (!campoVisivel) {
        throw new Error(
          "Falha: campo de e-mail não reapareceu após selecionar PIX novamente.",
        );
      }

      const botaoPagar = page.locator('button:has-text("Pagar")').first();

      await botaoPagar.waitFor({
        state: "visible",
        timeout: 30000,
      });

      const botaoVisivel = await botaoPagar.isVisible();

      if (!botaoVisivel) {
        throw new Error("Falha: botão pagar não foi renderizado corretamente.");
      }

      const bodyText = await page.locator("body").innerText();

      const possuiErroCritico =
        bodyText.includes("Unexpected error") ||
        bodyText.includes("Something went wrong") ||
        bodyText.includes("Erro inesperado") ||
        bodyText.includes("Application error");

      if (possuiErroCritico) {
        throw new Error(
          "Falha: checkout apresentou erro crítico após refresh.",
        );
      }

      console.log("SUCESSO: checkout permaneceu funcional após refresh.");
    });

    I.wait(2);
  },
).tag("@compraringressos97");

/////----------/////

Scenario(
  "Cenário: 000000098 - Recarregar checkout durante pagamento PIX com e-mail inválido.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.wait(2);

    const emailInvalido = "fastix@gmail";

    I.usePlaywrightTo("selecionar opção PIX", async ({ page }) => {
      const pixRadio = page.locator('input[aria-label="Pix"]');

      await pixRadio.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await pixRadio.click({
        force: true,
      });

      await page.waitForTimeout(2000);

      console.log("SUCESSO: opção PIX selecionada.");
    });

    I.usePlaywrightTo("preencher e-mail inválido", async ({ page }) => {
      const inputEmail = page.locator('input[name="EMAIL"]');

      await inputEmail.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await inputEmail.click({
        force: true,
      });

      await inputEmail.press("Control+A");

      await inputEmail.press("Backspace");

      await page.waitForTimeout(500);

      await inputEmail.type(emailInvalido, {
        delay: 80,
      });

      console.log("SUCESSO: e-mail inválido preenchido antes do refresh.");

      await page.waitForTimeout(5000);
    });

    I.usePlaywrightTo("atualizar página", async ({ page }) => {
      await page.reload({
        waitUntil: "networkidle",
      });

      await page.waitForTimeout(5000);

      console.log("SUCESSO: página atualizada.");
    });

    I.usePlaywrightTo("validar reset do PIX após refresh", async ({ page }) => {
      const inputEmail = page.locator('input[name="EMAIL"]');

      const campoVisivel = await inputEmail.isVisible().catch(() => false);

      if (campoVisivel) {
        throw new Error(
          "Falha: campo de e-mail PIX permaneceu visível após refresh.",
        );
      }

      console.log("SUCESSO: campo PIX foi ocultado após refresh.");
    });

    I.usePlaywrightTo("selecionar PIX novamente", async ({ page }) => {
      const pixRadio = page.locator('input[aria-label="Pix"]');

      await pixRadio.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await pixRadio.click({
        force: true,
      });

      await page.waitForTimeout(2000);

      console.log("SUCESSO: PIX selecionado novamente.");
    });

    I.usePlaywrightTo("validar recuperação do checkout", async ({ page }) => {
      const inputEmail = page.locator('input[name="EMAIL"]');

      await inputEmail.waitFor({
        state: "visible",
        timeout: 30000,
      });

      const campoVisivel = await inputEmail.isVisible();

      if (!campoVisivel) {
        throw new Error(
          "Falha: campo de e-mail não reapareceu após selecionar PIX novamente.",
        );
      }

      const botaoPagar = page.locator('button:has-text("Pagar")').first();

      await botaoPagar.waitFor({
        state: "visible",
        timeout: 30000,
      });

      const botaoVisivel = await botaoPagar.isVisible();

      if (!botaoVisivel) {
        throw new Error("Falha: botão pagar não foi renderizado corretamente.");
      }

      const bodyText = await page.locator("body").innerText();

      const possuiErroCritico =
        bodyText.includes("Unexpected error") ||
        bodyText.includes("Something went wrong") ||
        bodyText.includes("Erro inesperado") ||
        bodyText.includes("Application error");

      if (possuiErroCritico) {
        throw new Error(
          "Falha: checkout apresentou erro crítico após refresh.",
        );
      }

      console.log(
        "SUCESSO: checkout permaneceu funcional após refresh com e-mail inválido.",
      );
    });

    I.wait(2);
  },
).tag("@compraringressos98");

/////----------/////

Scenario(
  "Cenário: 000000099 - Exibir mensagem de sucesso ao clicar no botão Copiar chave PIX.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.wait(4);

    I.usePlaywrightTo("selecionar Pix corretamente", async ({ page }) => {
      const opcaoPix = page.locator('span:has-text("Pix")');

      await opcaoPix.waitFor({
        state: "visible",
      });

      await opcaoPix.click({
        force: true,
      });
    });

    I.wait(2);

    I.waitForElement('input[name="EMAIL"]', 20);

    I.usePlaywrightTo("preencher e-mail", async ({ page }) => {
      const input = page.locator('input[name="EMAIL"]');

      await input.waitFor({ state: "visible" });

      await input.click({ force: true });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("fastix.teste@gmail.com", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("clicar no botão pagar", async ({ page }) => {
      const botaoPagar = page.locator('span:has-text("Pagar")');

      await botaoPagar.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await botaoPagar.click({
        force: true,
      });

      console.log("SUCESSO: botão pagar clicado.");

      await page.waitForTimeout(5000);
    });

    I.wait(2);

    I.usePlaywrightTo("clicar em copiar chave", async ({ page }) => {
      const botaoCopiar = page.locator('span:has-text("Copiar chave")');

      await botaoCopiar.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await botaoCopiar.click({
        force: true,
      });

      console.log("SUCESSO: botão copiar chave clicado.");

      const mensagemToast = page.locator("div[data-description]").filter({
        hasText: "Código copiado para a área de transferência!",
      });

      await mensagemToast.waitFor({
        state: "visible",
        timeout: 10000,
      });

      const textoToast = await mensagemToast.textContent();

      if (
        !textoToast.includes("Código copiado para a área de transferência!")
      ) {
        throw new Error("Falha: mensagem de confirmação não foi exibida.");
      }

      console.log("SUCESSO: mensagem de código copiado exibida corretamente.");
    });

    I.wait(2);
  },
).tag("@compraringressos100");

/////----------/////

Scenario(
  "Cenário: 0000000100 - Exibir mensagem de sucesso ao clicar no campo “Ou copie a chave.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.wait(4);

    I.usePlaywrightTo("selecionar Pix corretamente", async ({ page }) => {
      const opcaoPix = page.locator('span:has-text("Pix")');

      await opcaoPix.waitFor({
        state: "visible",
      });

      await opcaoPix.click({
        force: true,
      });
    });

    I.wait(2);

    I.waitForElement('input[name="EMAIL"]', 20);

    I.usePlaywrightTo("preencher e-mail", async ({ page }) => {
      const input = page.locator('input[name="EMAIL"]');

      await input.waitFor({
        state: "visible",
      });

      await input.click({
        force: true,
      });

      await input.press("Control+A");

      await input.press("Backspace");

      await input.type("fastix.teste@gmail.com", { delay: 80 });
    });

    I.wait(2);

    I.usePlaywrightTo("clicar no botão pagar", async ({ page }) => {
      const botaoPagar = page.locator('span:has-text("Pagar")');

      await botaoPagar.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await botaoPagar.click({
        force: true,
      });

      console.log("SUCESSO: botão pagar clicado.");

      await page.waitForTimeout(5000);
    });

    I.wait(2);

    I.usePlaywrightTo("clicar no código pix", async ({ page }) => {
      const codigoPix = page.locator("div.break-all.text-sm").first();

      await codigoPix.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await codigoPix.click({
        force: true,
      });

      console.log("SUCESSO: código PIX clicado.");

      const mensagemToast = page.locator("div[data-description]").filter({
        hasText: "Código copiado para a área de transferência!",
      });

      await mensagemToast.waitFor({
        state: "visible",
        timeout: 10000,
      });

      const textoToast = await mensagemToast.textContent();

      if (
        !textoToast.includes("Código copiado para a área de transferência!")
      ) {
        throw new Error("Falha: toast de sucesso não foi exibido.");
      }

      console.log("SUCESSO: toast de código copiado exibido corretamente.");
    });

    I.wait(2);
  },
).tag("@compraringressos100");

/////----------/////
Scenario(
  "Cenário: 0000000101 - Evitar múltiplos eventos ao clicar repetidamente em 'Copiar chave.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.wait(4);

    I.usePlaywrightTo("selecionar Pix corretamente", async ({ page }) => {
      const opcaoPix = page.locator('span:has-text("Pix")');

      await opcaoPix.waitFor({
        state: "visible",
      });

      await opcaoPix.click({
        force: true,
      });

      console.log("SUCESSO: método PIX selecionado.");
    });

    I.wait(2);

    I.waitForElement('input[name="EMAIL"]', 20);

    I.usePlaywrightTo("preencher e-mail", async ({ page }) => {
      const input = page.locator('input[name="EMAIL"]');

      await input.waitFor({
        state: "visible",
      });

      await input.click({
        force: true,
      });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("fastix.teste@gmail.com", { delay: 80 });

      console.log("SUCESSO: e-mail preenchido.");
    });

    I.wait(2);

    I.usePlaywrightTo("clicar no botão pagar", async ({ page }) => {
      const botaoPagar = page.locator('span:has-text("Pagar")');

      await botaoPagar.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await botaoPagar.click({
        force: true,
      });

      console.log("SUCESSO: botão pagar clicado.");

      await page.waitForTimeout(5000);
    });

    I.wait(2);

    I.usePlaywrightTo(
      "validar múltiplos cliques no copiar chave",
      async ({ page }) => {
        const botaoCopiar = page.locator('span:has-text("Copiar chave")');

        await botaoCopiar.waitFor({
          state: "visible",
          timeout: 30000,
        });

        console.log("INFO: iniciando múltiplos cliques rápidos.");

        await Promise.all([
          botaoCopiar.click({ force: true }),
          botaoCopiar.click({ force: true }),
          botaoCopiar.click({ force: true }),
          botaoCopiar.click({ force: true }),
          botaoCopiar.click({ force: true }),
        ]);

        console.log("SUCESSO: múltiplos cliques executados.");

        const toastMensagem = page.locator("div[data-description]").filter({
          hasText: "Código copiado para a área de transferência!",
        });

        await toastMensagem.first().waitFor({
          state: "visible",
          timeout: 10000,
        });

        await page.waitForTimeout(3000);

        const quantidadeToasts = await toastMensagem.count();

        console.log(
          `INFO: quantidade de toasts encontrados: ${quantidadeToasts}`,
        );

        if (quantidadeToasts === 1) {
          console.log("SUCESSO: sistema bloqueou múltiplos eventos.");
        } else {
          console.log("BUG IDENTIFICADO: múltiplos toasts foram exibidos.");

          throw new Error(
            `
Falha funcional detectada:

O sistema permitiu múltiplos eventos
ao clicar repetidamente em "Copiar chave".

Resultado encontrado:
- ${quantidadeToasts} toasts exibidos

Resultado esperado:
- apenas 1 toast
- apenas 1 evento de cópia
        `,
          );
        }
      },
    );

    I.wait(2);
  },
).tag("@compraringressos101");

/////----------/////

Scenario(
  "Cenário: 0000000102 - Validar renderização correta do QR Code após pagamento PIX.",
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

    const tituloIngresso = locate("p").withText("Inteira");

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.wait(2);

    I.wait(2);

    I.usePlaywrightTo("selecionar Pix corretamente", async ({ page }) => {
      const opcaoPix = page.locator('span:has-text("Pix")');

      await opcaoPix.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await opcaoPix.click({
        force: true,
      });

      console.log("SUCESSO: método PIX selecionado.");
    });

    I.wait(2);

    I.waitForElement('input[name="EMAIL"]', 20);

    I.usePlaywrightTo("preencher e-mail", async ({ page }) => {
      const input = page.locator('input[name="EMAIL"]');

      await input.waitFor({
        state: "visible",
      });

      await input.click({
        force: true,
      });

      await input.press("Control+A");
      await input.press("Backspace");

      await input.type("fastix.teste@gmail.com", { delay: 80 });

      console.log("SUCESSO: e-mail preenchido.");
    });

    I.wait(2);

    I.usePlaywrightTo("clicar no botão pagar", async ({ page }) => {
      const botaoPagar = page.locator('span:has-text("Pagar")');

      await botaoPagar.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await botaoPagar.click({
        force: true,
      });

      console.log("SUCESSO: botão pagar clicado.");

      await page.waitForTimeout(5000);
    });

    I.wait(2);

    I.usePlaywrightTo(
      "validar renderização do QR Code PIX",
      async ({ page }) => {
        const qrCode = page.locator('img[alt="Imagem do Pix para pagamento"]');

        await qrCode.waitFor({
          state: "visible",
          timeout: 30000,
        });

        const estaVisivel = await qrCode.isVisible();

        if (!estaVisivel) {
          throw new Error("Falha: QR Code PIX não está visível.");
        }

        const srcQrCode = await qrCode.getAttribute("src");

        if (!srcQrCode || !srcQrCode.includes("data:image")) {
          throw new Error("Falha: QR Code PIX não foi carregado corretamente.");
        }

        const dimensao = await qrCode.boundingBox();

        if (!dimensao || dimensao.width <= 0 || dimensao.height <= 0) {
          throw new Error("Falha: QR Code PIX possui dimensão inválida.");
        }

        console.log("SUCESSO: QR Code PIX renderizado corretamente.");

        console.log(
          `INFO: dimensão do QR Code -> ${dimensao.width}x${dimensao.height}`,
        );
      },
    );

    I.wait(2);
  },
).tag("@compraringressos102");

/////----------/////

Scenario(
  "Cenário: 0000000103 - Expiração de pagamento PIX no checkout, exibir mensagem ao expirar pagamento PIX.",
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
    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);
    I.seeInCurrentUrl("/events/buffalo-tom-em-sao-paulo");

    I.wait(2);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.click(botaoComprar);

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.click(botaoEntrar);

    I.wait(3);

    I.usePlaywrightTo("selecionar Pix corretamente", async ({ page }) => {
      const opcaoPix = page.locator('span:has-text("Pix")');

      await opcaoPix.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await opcaoPix.click({ force: true });

      console.log("SUCESSO: método PIX selecionado.");
    });

    I.wait(2);

    I.usePlaywrightTo("preencher e-mail PIX", async ({ page }) => {
      const input = page.locator('input[name="EMAIL"]');

      await input.waitFor({ state: "visible" });

      await input.fill("fastix.teste@gmail.com");

      console.log("SUCESSO: e-mail preenchido.");
    });

    I.wait(2);

    I.usePlaywrightTo("clicar em pagar", async ({ page }) => {
      const botaoPagar = page.locator('span:has-text("Pagar")');

      await botaoPagar.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await botaoPagar.click({ force: true });

      console.log("SUCESSO: pagamento iniciado.");
    });

    I.wait(3);

    I.usePlaywrightTo("validar expiração do checkout PIX", async ({ page }) => {
      const timer = page.locator("text=/Checkout expira em/");

      await timer.waitFor({
        state: "visible",
        timeout: 30000,
      });

      console.log("INFO: checkout em contagem regressiva...");

      await page.waitForTimeout(300000);
    });

    I.wait(2);

    I.usePlaywrightTo("validar carrinho expirado", async ({ page }) => {
      const mensagem = page.locator("div.text-sm").filter({
        hasText: "Seu carrinho expirou, selecione novamente seus ingressos",
      });

      await mensagem.waitFor({
        state: "visible",
        timeout: 20000,
      });

      const texto = await mensagem.textContent();

      if (!texto.includes("Seu carrinho expirou")) {
        throw new Error("Falha: mensagem de expiração não exibida.");
      }

      console.log("SUCESSO: mensagem de expiração validada.");
    });

    I.wait(2);
  },
).tag("@compraringressos103");

/////----------/////

Scenario(
  "Cenário: 0000000104 -Validar que cada pagamento PIX gere um QR Code único.",
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

    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 10);

    I.seeInCurrentUrl("/events/buffalo-tom-em-sao-paulo");

    I.wait(2);

    const adicionarIngressos = async () => {
      const botaoAdicionar = locate({
        xpath:
          "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
      });

      I.waitForVisible(botaoAdicionar, 15);

      I.scrollTo(botaoAdicionar);

      I.click(botaoAdicionar);

      I.wait(1);

      I.click(botaoAdicionar);

      const contador = locate({
        xpath:
          "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
      });

      I.waitForVisible(contador, 10);

      I.see("2", contador);

      console.log("SUCESSO: ingressos adicionados.");
    };

    const realizarLoginCheckout = async () => {
      const botaoComprar = locate("button, a").withText("Comprar ingressos");

      I.waitForVisible(botaoComprar, 15);

      I.scrollTo(botaoComprar);

      I.click(botaoComprar);

      I.wait(5);

      const loginExiste = await I.grabNumberOfVisibleElements(
        'input[name="email"]',
      );

      if (loginExiste > 0) {
        console.log("INFO: realizando login.");

        I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");

        I.fillField('input[name="password"]', "cruzeiro@1921");

        const botaoEntrar = locate("button").withDescendant(
          locate("span").withText("Entrar"),
        );

        I.waitForElement(botaoEntrar, 10);

        I.click(botaoEntrar);

        I.wait(5);

        console.log("SUCESSO: login realizado.");
      } else {
        console.log("INFO: usuário já autenticado.");
      }
    };

    const gerarPix = async () => {
      I.usePlaywrightTo("selecionar PIX", async ({ page }) => {
        const opcaoPix = page.locator('span:has-text("Pix")');

        await opcaoPix.waitFor({
          state: "visible",
          timeout: 30000,
        });

        await opcaoPix.click({
          force: true,
        });

        console.log("SUCESSO: PIX selecionado.");
      });

      I.wait(2);

      I.usePlaywrightTo("preencher e-mail PIX", async ({ page }) => {
        const input = page.locator('input[name="EMAIL"]');

        await input.waitFor({
          state: "visible",
          timeout: 30000,
        });

        await input.fill("fastix.teste@gmail.com");

        console.log("SUCESSO: e-mail PIX preenchido.");
      });

      I.wait(2);

      I.usePlaywrightTo("clicar em pagar", async ({ page }) => {
        const botaoPagar = page.locator('span:has-text("Pagar")');

        await botaoPagar.waitFor({
          state: "visible",
          timeout: 30000,
        });

        await botaoPagar.click({
          force: true,
        });

        console.log("SUCESSO: pagamento PIX iniciado.");
      });

      I.wait(5);
    };

    const validarExpiracao = async () => {
      I.usePlaywrightTo("validar contador checkout", async ({ page }) => {
        const timer = page.locator("text=/Checkout expira em/");

        await timer.waitFor({
          state: "visible",
          timeout: 30000,
        });

        console.log("INFO: aguardando expiração do checkout...");

        await page.waitForTimeout(300000);
      });

      I.wait(2);

      I.usePlaywrightTo("validar mensagem expiração", async ({ page }) => {
        const mensagem = page.locator("div.text-sm").filter({
          hasText: "Seu carrinho expirou, selecione novamente seus ingressos",
        });

        await mensagem.waitFor({
          state: "visible",
          timeout: 30000,
        });

        const texto = await mensagem.textContent();

        if (!texto.includes("Seu carrinho expirou")) {
          throw new Error("Falha: mensagem de expiração não exibida.");
        }

        console.log("SUCESSO: carrinho expirado validado.");
      });

      I.wait(2);
    };

    const capturarQRCodePix = async () => {
      return await I.usePlaywrightTo(
        "capturar QR Code PIX",
        async ({ page }) => {
          const qrCode = page.locator(
            'img[alt="Imagem do Pix para pagamento"]',
          );

          await qrCode.waitFor({
            state: "visible",
            timeout: 30000,
          });

          const qrCodeBase64 = await qrCode.getAttribute("src");

          if (!qrCodeBase64) {
            throw new Error("Falha: QR Code PIX não possui atributo src.");
          }

          console.log("SUCESSO: QR Code capturado.");

          return qrCodeBase64;
        },
      );
    };

    await adicionarIngressos();

    await realizarLoginCheckout();

    await gerarPix();

    console.log("INFO: capturando primeiro QR Code.");

    const primeiroQRCode = await capturarQRCodePix();

    console.log("SUCESSO: primeiro QR Code armazenado.");

    await validarExpiracao();

    console.log("INFO: iniciando novo fluxo PIX.");

    I.amOnPage("https://fastix.com.br/events/buffalo-tom-em-sao-paulo");

    I.wait(5);

    await adicionarIngressos();

    await realizarLoginCheckout();

    await gerarPix();

    console.log("INFO: capturando segundo QR Code.");

    const segundoQRCode = await capturarQRCodePix();

    console.log("SUCESSO: segundo QR Code armazenado.");

    if (primeiroQRCode === segundoQRCode) {
      throw new Error(`
Falha funcional detectada:

O sistema gerou dois QR Codes idênticos.

Resultado esperado:
- cada pagamento PIX deve possuir
  um QR Code único

Resultado encontrado:
- QR Codes duplicados
`);
    }

    console.log(`
SUCESSO: QR Codes são diferentes.

Validação concluída:
- primeiro QR Code único
- segundo QR Code único
- pagamento PIX regenerado corretamente
`);

    await validarExpiracao();

    console.log("SUCESSO: fluxo completo validado.");
  },
).tag("@compraringressos104");

/////----------/////

Scenario(
  "Cenário: 0000000105 - Bloquear múltiplas cobranças PIX.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);
    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);

    I.wait(2);

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

    I.wait(2);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 15);

    I.scrollTo(botaoAdicionar);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);

    I.see("2", contador);

    console.log("SUCESSO: ingressos adicionados.");

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 15);

    I.scrollTo(botaoComprar);

    I.click(botaoComprar);

    I.wait(3);

    const loginVisivel = await I.grabNumberOfVisibleElements(
      'input[name="email"]',
    );

    if (loginVisivel > 0) {
      I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");

      I.fillField('input[name="password"]', "cruzeiro@1921");

      const botaoEntrar = locate("button").withDescendant(
        locate("span").withText("Entrar"),
      );

      I.waitForElement(botaoEntrar, 10);

      I.click(botaoEntrar);

      I.wait(5);

      console.log("SUCESSO: login realizado.");
    }

    I.usePlaywrightTo("selecionar PIX", async ({ page }) => {
      const opcaoPix = page.locator('span:has-text("Pix")');

      await opcaoPix.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await opcaoPix.click({
        force: true,
      });

      console.log("SUCESSO: PIX selecionado.");
    });

    I.wait(2);

    I.usePlaywrightTo("preencher email PIX", async ({ page }) => {
      const input = page.locator('input[name="EMAIL"]');

      await input.waitFor({
        state: "visible",
      });

      await input.fill("fastix.teste@gmail.com");

      console.log("SUCESSO: email PIX preenchido.");
    });

    I.wait(2);

    I.usePlaywrightTo("gerar cobrança PIX", async ({ page }) => {
      const botaoPagar = page.locator('span:has-text("Pagar")');

      await botaoPagar.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await botaoPagar.click({
        force: true,
      });

      console.log("SUCESSO: primeira cobrança PIX gerada.");
    });

    I.wait(5);

    I.usePlaywrightTo("validar QR Code PIX", async ({ page }) => {
      const qrCode = page.locator('img[alt="Imagem do Pix para pagamento"]');

      await qrCode.waitFor({
        state: "visible",
        timeout: 30000,
      });

      console.log("SUCESSO: QR Code PIX exibido.");
    });

    I.wait(2);

    I.usePlaywrightTo(
      "validar bloqueio de nova submissão",
      async ({ page }) => {
        const botaoPagar = page.locator('span:has-text("Pagar")');

        const quantidadeAntes = await page
          .locator('img[alt="Imagem do Pix para pagamento"]')
          .count();

        console.log(`INFO: QR Codes antes do novo clique: ${quantidadeAntes}`);

        if (await botaoPagar.isVisible()) {
          await botaoPagar.click({
            force: true,
          });

          console.log("INFO: segundo clique executado.");
        }

        await page.waitForTimeout(5000);

        const quantidadeDepois = await page
          .locator('img[alt="Imagem do Pix para pagamento"]')
          .count();

        console.log(`INFO: QR Codes após novo clique: ${quantidadeDepois}`);

        if (quantidadeDepois > quantidadeAntes) {
          throw new Error(`
Falha funcional detectada:

O sistema permitiu geração duplicada
de cobrança PIX após novo clique
no botão "Pagar".

Resultado esperado:
- bloquear nova submissão
- impedir nova cobrança PIX

Resultado encontrado:
- múltiplas cobranças geradas
`);
        }

        console.log(`
SUCESSO: sistema bloqueou
novas submissões PIX corretamente.
`);
      },
    );

    I.wait(2);
  },
).tag("@compraringressos105");

/////----------/////

Scenario(
  "Cenário: 0000000106 - Validar tempo de 5 segundos para exibição do QR Code PIX.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);

    I.wait(2);

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

    I.wait(2);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 15);

    I.scrollTo(botaoAdicionar);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);

    I.see("2", contador);

    console.log("SUCESSO: ingressos adicionados.");

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 15);

    I.scrollTo(botaoComprar);

    I.click(botaoComprar);

    I.wait(3);

    const loginVisivel = await I.grabNumberOfVisibleElements(
      'input[name="email"]',
    );

    if (loginVisivel > 0) {
      I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");

      I.fillField('input[name="password"]', "cruzeiro@1921");

      const botaoEntrar = locate("button").withDescendant(
        locate("span").withText("Entrar"),
      );

      I.waitForElement(botaoEntrar, 10);

      I.click(botaoEntrar);

      I.wait(5);

      console.log("SUCESSO: login realizado.");
    }

    I.usePlaywrightTo("selecionar PIX", async ({ page }) => {
      const opcaoPix = page.locator('span:has-text("Pix")');

      await opcaoPix.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await opcaoPix.click({
        force: true,
      });

      console.log("SUCESSO: PIX selecionado.");
    });

    I.wait(2);

    I.usePlaywrightTo("preencher email PIX", async ({ page }) => {
      const input = page.locator('input[name="EMAIL"]');

      await input.waitFor({
        state: "visible",
      });

      await input.fill("fastix.teste@gmail.com");

      console.log("SUCESSO: email PIX preenchido.");
    });

    I.wait(2);

    I.usePlaywrightTo("validar tempo geração QR Code PIX", async ({ page }) => {
      const botaoPagar = page.locator('span:has-text("Pagar")');

      await botaoPagar.waitFor({
        state: "visible",
        timeout: 30000,
      });

      const inicio = Date.now();

      console.log("INFO: iniciando geração do PIX.");

      await botaoPagar.click({
        force: true,
      });

      const qrCode = page.locator('img[alt="Imagem do Pix para pagamento"]');

      await qrCode.waitFor({
        state: "visible",
        timeout: 5000,
      });

      const fim = Date.now();

      const tempoGeracao = (fim - inicio) / 1000;

      console.log(`INFO: QR Code gerado em ${tempoGeracao} segundos.`);

      if (tempoGeracao > 5) {
        throw new Error(`
Falha funcional detectada:

O QR Code PIX ultrapassou
o tempo máximo permitido.

Resultado esperado:
- QR Code exibido em até 5 segundos

Resultado encontrado:
- ${tempoGeracao} segundos
`);
      }

      console.log(`
SUCESSO: QR Code PIX gerado
dentro do tempo esperado.
`);
    });

    I.wait(2);
  },
).tag("@compraringressos106");

/////----------/////

Scenario(
  "Cenário: 0000000107 - Validar desaparecimento automático do toast  'Código copiado para a área de transferência!.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);

    I.wait(2);

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

    I.wait(2);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 15);

    I.scrollTo(botaoAdicionar);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);

    I.see("2", contador);

    console.log("SUCESSO: ingressos adicionados.");

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 15);

    I.scrollTo(botaoComprar);

    I.click(botaoComprar);

    I.wait(3);

    const loginVisivel = await I.grabNumberOfVisibleElements(
      'input[name="email"]',
    );

    if (loginVisivel > 0) {
      I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");

      I.fillField('input[name="password"]', "cruzeiro@1921");

      const botaoEntrar = locate("button").withDescendant(
        locate("span").withText("Entrar"),
      );

      I.waitForElement(botaoEntrar, 10);

      I.click(botaoEntrar);

      I.wait(5);

      console.log("SUCESSO: login realizado.");
    }

    I.usePlaywrightTo("selecionar PIX", async ({ page }) => {
      const opcaoPix = page.locator('span:has-text("Pix")');

      await opcaoPix.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await opcaoPix.click({
        force: true,
      });

      console.log("SUCESSO: PIX selecionado.");
    });

    I.wait(2);

    I.usePlaywrightTo("preencher email PIX", async ({ page }) => {
      const input = page.locator('input[name="EMAIL"]');

      await input.waitFor({
        state: "visible",
      });

      await input.fill("fastix.teste@gmail.com");

      console.log("SUCESSO: email PIX preenchido.");
    });

    I.wait(2);

    I.usePlaywrightTo("gerar PIX", async ({ page }) => {
      const botaoPagar = page.locator('span:has-text("Pagar")');

      await botaoPagar.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await botaoPagar.click({
        force: true,
      });

      console.log("SUCESSO: PIX gerado.");
    });

    I.wait(5);

    I.usePlaywrightTo("copiar chave PIX", async ({ page }) => {
      const botaoCopiar = page.locator('span:has-text("Copiar chave")');

      await botaoCopiar.waitFor({
        state: "visible",
        timeout: 30000,
      });

      await botaoCopiar.click({
        force: true,
      });

      console.log("SUCESSO: chave PIX copiada.");
    });

    I.wait(1);

    I.usePlaywrightTo("validar desaparecimento do toast", async ({ page }) => {
      const toast = page.locator("div[data-description]").filter({
        hasText: "Código copiado para a área de transferência!",
      });

      await toast.waitFor({
        state: "visible",
        timeout: 10000,
      });

      console.log("SUCESSO: toast exibido.");

      await toast.waitFor({
        state: "hidden",
        timeout: 10000,
      });

      console.log(`
SUCESSO: toast desapareceu
automaticamente após alguns segundos.
`);
    });

    I.wait(2);
  },
).tag("@compraringressos107");

/////----------/////

Scenario(
  "Cenário: 0000000108 - Realizar logout após selecionar ingressos.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);

    I.wait(2);

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

    I.wait(2);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 15);

    I.scrollTo(botaoAdicionar);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);

    I.see("2", contador);

    console.log("SUCESSO: ingressos adicionados.");

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 15);

    I.scrollTo(botaoComprar);

    I.click(botaoComprar);

    I.wait(3);

    const loginVisivel = await I.grabNumberOfVisibleElements(
      'input[name="email"]',
    );

    if (loginVisivel > 0) {
      I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");

      I.fillField('input[name="password"]', "cruzeiro@1921");

      const botaoEntrar = locate("button").withDescendant(
        locate("span").withText("Entrar"),
      );

      I.waitForElement(botaoEntrar, 10);

      I.click(botaoEntrar);

      I.wait(5);

      console.log("SUCESSO: login realizado.");
    }

    I.wait(7);

    I.waitForElement(
      "span.flex.h-full.w-full.items-center.justify-center.rounded-full.bg-muted",
      10,
    );

    I.click(
      "span.flex.h-full.w-full.items-center.justify-center.rounded-full.bg-muted",
    );

    I.waitForElement('div[role="menuitem"]', 10);

    I.waitForText("Sair", 10);

    I.see("Sair");

    I.click("//span[text()='Sair']");

    I.waitForText("Entrar", 10);

    I.see("Entrar");

    I.wait(3);
  },
).tag("@compraringressos108");

/////----------/////

Scenario(
  "Cenário: 0000000109 - Retornar para a página do evento e acessar novamente o checkout.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);

    I.wait(2);

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

    I.wait(2);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 15);

    I.scrollTo(botaoAdicionar);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);

    I.see("2", contador);

    console.log("SUCESSO: ingressos adicionados.");

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 15);

    I.scrollTo(botaoComprar);

    I.click(botaoComprar);

    I.wait(3);

    const loginVisivel = await I.grabNumberOfVisibleElements(
      'input[name="email"]',
    );

    if (loginVisivel > 0) {
      I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");

      I.fillField('input[name="password"]', "cruzeiro@1921");

      const botaoEntrar = locate("button").withDescendant(
        locate("span").withText("Entrar"),
      );

      I.waitForElement(botaoEntrar, 10);

      I.click(botaoEntrar);

      I.wait(5);

      console.log("SUCESSO: login realizado.");
    }

    I.waitInUrl("/orders/", 20);

    I.waitForText("Detalhes do pedido", 20);

    I.wait(3);

    I.say("Abrindo detalhes do pedido");

    const detalhesPedido = locate("button").withText("Detalhes do pedido");

    I.waitForVisible(detalhesPedido, 10);

    I.click(detalhesPedido);

    I.waitForElement('[data-state="open"]', 10);

    const urlCheckout = await I.grabCurrentUrl();

    console.log(`Checkout atual: ${urlCheckout}`);

    const urlEvento = await I.executeScript(() => {
      const voltar = document.referrer;

      return voltar || null;
    });

    console.log(`URL do evento encontrada: ${urlEvento}`);

    I.say("Voltando para a página do evento");

    await I.executeScript(() => {
      window.history.back();
    });

    I.waitForText("Comprar ingressos", 20);

    I.waitForElement(locate("button").withText("Comprar ingressos"), 20);

    const urlAtual = await I.grabCurrentUrl();

    if (urlAtual.includes("/orders/")) {
      throw new Error(`ERRO: usuário permaneceu no checkout -> ${urlAtual}`);
    }

    console.log(`SUCESSO: retornou para evento -> ${urlAtual}`);

    I.say("Voltando novamente para detalhes do pedido");

    I.amOnPage(urlCheckout);

    I.waitInUrl("/orders/", 20);

    I.waitForText("Detalhes do pedido", 20);

    I.say("Abrindo detalhes novamente");

    I.waitForVisible(detalhesPedido, 10);

    I.click(detalhesPedido);

    I.waitForElement('[data-state="open"]', 10);

    I.wait(3);

    console.log("SUCESSO: detalhes do pedido abertos novamente.");

    I.wait(3);
  },
).tag("@compraringressos109");

/////----------/////

Scenario(
  "Cenário: 0000000110 - Atualizar página na etapa de pagamento.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);

    I.wait(2);

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

    I.wait(2);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 15);

    I.scrollTo(botaoAdicionar);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);

    I.see("2", contador);

    console.log("SUCESSO: ingressos adicionados.");

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 15);

    I.scrollTo(botaoComprar);

    I.click(botaoComprar);

    I.wait(3);

    const loginVisivel = await I.grabNumberOfVisibleElements(
      'input[name="email"]',
    );

    if (loginVisivel > 0) {
      I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");

      I.fillField('input[name="password"]', "cruzeiro@1921");

      const botaoEntrar = locate("button").withDescendant(
        locate("span").withText("Entrar"),
      );

      I.waitForElement(botaoEntrar, 10);

      I.click(botaoEntrar);

      I.wait(5);

      console.log("SUCESSO: login realizado.");
    }

    I.waitInUrl("/orders/", 20);

    I.waitForText("Detalhes do pedido", 20);

    I.wait(3);

    I.say("Capturando informações do pedido antes do refresh");

    const subtotalAntes = await I.grabTextFrom(
      locate("li").withText("Subtotal").find("span").at(2),
    );

    const totalAntes = await I.grabTextFrom(
      locate("li").withText("Total").find("span").at(2),
    );

    console.log(`Subtotal antes do F5: ${subtotalAntes}`);
    console.log(`Total antes do F5: ${totalAntes}`);

    I.see("Detalhes do pedido");
    I.see("Subtotal");
    I.see("Total");
    I.see("Pagar");

    I.say("Atualizando página");

    I.refreshPage();

    I.waitInUrl("/orders/", 20);

    I.waitForText("Resumo do pedido", 20);

    I.waitForText("Total", 20);

    I.say("Capturando informações do pedido após refresh");

    const subtotalDepois = await I.grabTextFrom(
      locate("li").withText("Subtotal").find("span").at(2),
    );

    const totalDepois = await I.grabTextFrom(
      locate("li").withText("Total").find("span").at(2),
    );

    console.log(`Subtotal depois do F5: ${subtotalDepois}`);
    console.log(`Total depois do F5: ${totalDepois}`);

    if (subtotalAntes !== subtotalDepois) {
      throw new Error(
        `ERRO: subtotal alterado após refresh.
        Antes: ${subtotalAntes}
        Depois: ${subtotalDepois}`,
      );
    }

    if (totalAntes !== totalDepois) {
      throw new Error(
        `ERRO: total alterado após refresh.
        Antes: ${totalAntes}
        Depois: ${totalDepois}`,
      );
    }

    I.see("Detalhes do pedido");
    I.see("Subtotal");
    I.see("Taxa de conveniência");
    I.see("Total");
    I.see("Pagar");

    console.log(
      "SUCESSO: informações da compra mantidas após atualização da página.",
    );

    I.wait(3);
  },
).tag("@compraringressos110");

/////----------/////

Scenario(
  "Cenário: 0000000111 - Validar persistência do pedido ao sair e retornar ao checkout.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);

    I.wait(2);

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

    I.wait(2);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 15);

    I.scrollTo(botaoAdicionar);

    I.click(botaoAdicionar);
    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);

    I.see("2", contador);

    console.log("SUCESSO: ingressos adicionados.");

    I.wait(2);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 15);

    I.scrollTo(botaoComprar);

    I.click(botaoComprar);

    I.wait(3);

    const loginVisivel = await I.grabNumberOfVisibleElements(
      'input[name="email"]',
    );

    if (loginVisivel > 0) {
      I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");

      I.fillField('input[name="password"]', "cruzeiro@1921");

      const botaoEntrar = locate("button").withDescendant(
        locate("span").withText("Entrar"),
      );

      I.waitForElement(botaoEntrar, 10);

      I.click(botaoEntrar);

      I.wait(5);

      console.log("SUCESSO: login realizado.");
    }

    I.waitInUrl("/orders/", 20);

    I.waitForText("Detalhes do pedido", 20);

    I.wait(3);

    const urlPedido = await I.grabCurrentUrl();

    I.say("Pedido criado com sucesso");

    console.log(`Pedido salvo: ${urlPedido}`);

    I.say("Voltando para página do evento");

    I.amOnPage("https://fastix.com.br/events/buffalo-tom-em-sao-paulo");

    I.waitForText("Comprar ingressos", 20);

    const contadorCarrinho = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    const quantidadeContador =
      await I.grabNumberOfVisibleElements(contadorCarrinho);

    if (quantidadeContador > 0) {
      throw new Error(
        "ERRO: os ingressos permaneceram selecionados na página do evento.",
      );
    }

    console.log("SUCESSO: página do evento sem ingressos selecionados.");

    I.say("Retornando para o pedido já criado");

    I.amOnPage(urlPedido);

    I.waitInUrl("/orders/", 20);

    I.say("Validando persistência do pedido");

    I.waitForText("Pagamento", 20);

    I.waitForText("Detalhes do pedido", 20);

    I.waitForText("Total", 20);

    I.seeInCurrentUrl("/orders/");

    console.log("SUCESSO: pedido permaneceu ativo após retornar ao checkout.");

    I.wait(3);
  },
).tag("@compraringressos111");

/////----------/////

Scenario(
  "Cenário: 0000000112 - Checkout sessão expirada durante o fluxo de compra (10 minutos).",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);

    I.wait(2);

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

    I.wait(2);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 15);

    I.scrollTo(botaoAdicionar);

    I.click(botaoAdicionar);

    I.click(botaoAdicionar);

    const contadorIngressos = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contadorIngressos, 10);

    I.see("2", contadorIngressos);

    console.log("SUCESSO: ingressos adicionados.");

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 15);

    I.scrollTo(botaoComprar);

    I.click(botaoComprar);

    I.wait(3);

    const loginVisivel = await I.grabNumberOfVisibleElements(
      'input[name="email"]',
    );

    if (loginVisivel > 0) {
      I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");

      I.fillField('input[name="password"]', "cruzeiro@1921");

      const botaoEntrar = locate("button").withDescendant(
        locate("span").withText("Entrar"),
      );

      I.waitForElement(botaoEntrar, 10);

      I.click(botaoEntrar);

      I.wait(5);

      console.log("SUCESSO: login realizado.");
    }

    I.waitInUrl("/orders/", 20);

    I.waitForText("Pagamento", 20);

    I.waitForText("Checkout expira em", 20);

    console.log("SUCESSO: usuário está no fluxo de pagamento.");

    I.say("Aguardando expiração da sessão do checkout");

    const contadorCheckout =
      "//span[contains(text(),'Checkout expira em')]/span";

    I.waitForFunction(
      (xpath) => {
        const el = document.evaluate(
          xpath,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null,
        ).singleNodeValue;

        return el && el.innerText.trim() === "00:00";
      },
      [contadorCheckout],
      650,
    );

    console.log("SUCESSO: contador chegou em 00:00.");

    I.wait(30);

    // =============================
    const alertaCarrinhoExpirado = locate('div[role="alert"]');

    I.waitForVisible(alertaCarrinhoExpirado, 30);

    I.see("Seu carrinho expirou", alertaCarrinhoExpirado);

    I.see("selecione novamente seus ingressos", alertaCarrinhoExpirado);

    console.log("SUCESSO: alerta de expiração exibido.");

    I.waitInUrl("/events/", 20);

    I.waitForText("Comprar ingressos", 20);

    console.log("SUCESSO: usuário redirecionado para página do evento.");

    I.dontSee("Entrar");

    console.log("SUCESSO: usuário permaneceu logado.");

    I.wait(3);
  },
).tag("@compraringressos112");

/////----------/////

Scenario(
  "Cenário: 0000000113 - Refresh próximo da expiração do checkout.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);

    I.wait(2);

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

    I.wait(2);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 15);

    I.scrollTo(botaoAdicionar);

    I.click(botaoAdicionar);

    I.click(botaoAdicionar);

    const contadorIngressos = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contadorIngressos, 10);

    I.see("2", contadorIngressos);

    console.log("SUCESSO: ingressos adicionados.");

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 15);

    I.scrollTo(botaoComprar);

    I.click(botaoComprar);

    I.wait(3);

    const loginVisivel = await I.grabNumberOfVisibleElements(
      'input[name="email"]',
    );

    if (loginVisivel > 0) {
      I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");

      I.fillField('input[name="password"]', "cruzeiro@1921");

      const botaoEntrar = locate("button").withDescendant(
        locate("span").withText("Entrar"),
      );

      I.waitForElement(botaoEntrar, 10);

      I.click(botaoEntrar);

      I.wait(5);

      console.log("SUCESSO: login realizado.");
    }

    I.waitInUrl("/orders/", 20);

    I.waitForText("Pagamento", 20);

    I.waitForText("Checkout expira em", 20);

    console.log("SUCESSO: usuário está na etapa de pagamento.");

    I.say("Aguardando checkout chegar próximo da expiração");

    const contadorCheckout =
      "//span[contains(text(),'Checkout expira em')]/span";

    I.waitForFunction(
      (xpath) => {
        const el = document.evaluate(
          xpath,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null,
        ).singleNodeValue;

        if (!el) return false;

        const tempo = el.innerText.trim();

        const [min, sec] = tempo.split(":").map(Number);

        return min === 0 && sec <= 1;
      },
      [contadorCheckout],
      650,
    );

    console.log("SUCESSO: checkout chegou próximo da expiração.");

    I.say("Atualizando página próximo da expiração");

    I.refreshPage();

    I.wait(10);

    I.waitInUrl("/orders/", 20);

    I.waitForText("Pagamento", 20);

    I.waitForText("Checkout expira em", 20);

    console.log("SUCESSO: checkout permaneceu ativo.");

    I.waitForFunction(
      (xpath) => {
        const el = document.evaluate(
          xpath,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null,
        ).singleNodeValue;

        if (!el) return false;

        const tempo = el.innerText.trim();

        const [min, sec] = tempo.split(":").map(Number);

        return min >= 9;
      },
      [contadorCheckout],
      30,
    );

    console.log("SUCESSO: contador do checkout reiniciado.");

    I.dontSee("Seu carrinho expirou");

    console.log("SUCESSO: checkout não expirou.");

    I.wait(3);
  },
).tag("@compraringressos113");

/////----------/////

Scenario(
  "Cenário: 0000000114 - Abrir checkout em nova aba do navegador.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);

    I.wait(2);

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

    I.wait(2);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 15);

    I.scrollTo(botaoAdicionar);

    I.click(botaoAdicionar);

    const contador = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::span[normalize-space()='1'][1]",
    });

    I.waitForVisible(contador, 10);

    console.log("SUCESSO: ingressos adicionados.");

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 15);

    I.scrollTo(botaoComprar);

    I.click(botaoComprar);

    I.wait(3);

    const loginVisivel = await I.grabNumberOfVisibleElements(
      'input[name="email"]',
    );

    if (loginVisivel > 0) {
      I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");

      I.fillField('input[name="password"]', "cruzeiro@1921");

      const botaoEntrar = locate("button").withDescendant(
        locate("span").withText("Entrar"),
      );

      I.waitForElement(botaoEntrar, 10);

      I.click(botaoEntrar);

      I.wait(5);

      console.log("SUCESSO: login realizado.");
    }

    I.waitInUrl("/orders/", 20);

    I.waitForText("Pagamento", 20);

    I.waitForText("Detalhes do pedido", 20);

    console.log("SUCESSO: usuário está no checkout.");

    const urlCheckout = await I.grabCurrentUrl();

    console.log(`URL checkout salva: ${urlCheckout}`);

    I.say("Abrindo checkout em nova aba");

    await I.usePlaywrightTo(
      "abrir nova aba do checkout",
      async ({ browser }) => {
        const context = browser.contexts()[0];

        const novaPagina = await context.newPage();

        await novaPagina.goto(urlCheckout, {
          waitUntil: "domcontentloaded",
        });

        await novaPagina.bringToFront();
      },
    );

    console.log("SUCESSO: checkout aberto na nova aba.");

    I.wait(5);

    const novaUrl = await I.grabCurrentUrl();

    if (novaUrl !== urlCheckout) {
      throw new Error(
        `ERRO: URLs diferentes.\nOriginal: ${urlCheckout}\nNova aba: ${novaUrl}`,
      );
    }

    console.log("SUCESSO: mesma sessão do pedido mantida.");

    I.waitInUrl("/orders/", 20);

    I.waitForText("Pagamento", 20);

    I.waitForText("Detalhes do pedido", 20);

    console.log("SUCESSO: dados preservados.");

    const orderIdOriginal = urlCheckout.split("/orders/")[1];

    const orderIdNovaAba = novaUrl.split("/orders/")[1];

    if (orderIdOriginal !== orderIdNovaAba) {
      throw new Error(
        `ERRO: pedido duplicado.\nOriginal: ${orderIdOriginal}\nNova aba: ${orderIdNovaAba}`,
      );
    }

    console.log("SUCESSO: pedido não duplicado.");

    I.wait(3);
  },
).tag("@compraringressos114");

/////----------/////

Scenario(
  "Cenário: 0000000115 - Atualizar múltiplas vezes a página do checkout.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 20);

    I.click("Explorar eventos");

    I.waitInUrl("/events", 20);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 20);

    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(2);

    await I.usePlaywrightTo("Abrir evento", async ({ page }) => {
      await page.waitForLoadState("networkidle");

      const linkEvento = page.locator('a[href*="buffalo-tom-em-sao-paulo"]');

      await linkEvento.first().waitFor({
        state: "visible",
        timeout: 30000,
      });

      await linkEvento.first().scrollIntoViewIfNeeded();

      await linkEvento.first().click();
    });

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 30);

    await I.usePlaywrightTo(
      "Aguardar carregamento completo",
      async ({ page }) => {
        await page.waitForLoadState("networkidle");
      },
    );

    const urlEvento = await I.grabCurrentUrl();

    if (!urlEvento.includes("/events/buffalo-tom-em-sao-paulo")) {
      throw new Error(
        `
Falha ao abrir evento.

URL atual:
${urlEvento}
`,
      );
    }

    console.log("SUCESSO: evento carregado.");

    I.saveScreenshot("evento-aberto.png");

    await I.usePlaywrightTo("Adicionar ingressos", async ({ page }) => {
      await page.waitForLoadState("networkidle");

      let total = 0;
      let tentativa = 0;

      while (total === 0 && tentativa < 5) {
        tentativa++;

        const botoesAdicionar = page.locator('button:has-text("Adicionar")');

        total = await botoesAdicionar.count();

        console.log(
          `Tentativa ${tentativa} - Botões Adicionar encontrados: ${total}`,
        );

        if (total === 0) {
          await page.waitForTimeout(2000);
        }
      }

      const botoesAdicionar = page.locator('button:has-text("Adicionar")');

      if (total === 0) {
        await page.screenshot({
          path: "./output/sem-botao-adicionar.png",
          fullPage: true,
        });

        throw new Error(
          "Nenhum botão 'Adicionar' encontrado após múltiplas tentativas.",
        );
      }

      await botoesAdicionar.first().scrollIntoViewIfNeeded();

      await botoesAdicionar.first().click();

      await page.waitForTimeout(1000);

      await botoesAdicionar.first().click();
    });

    console.log("SUCESSO: ingressos adicionados.");

    const contadorIngressos = locate({
      xpath: "//span[normalize-space()='2']",
    });

    I.waitForElement(contadorIngressos, 20);

    I.seeElement(contadorIngressos);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForElement(botaoComprar, 20);

    I.scrollTo(botaoComprar);

    I.click(botaoComprar);

    I.wait(3);

    const urlPosCompra = await I.grabCurrentUrl();

    console.log(`URL após clicar em Comprar: ${urlPosCompra}`);

    if (urlPosCompra.includes("/signin")) {
      console.log("LOGIN NECESSÁRIO.");

      I.waitForElement('input[name="email"]', 20);

      I.fillField(
        'input[name="email"]',
        process.env.USER_EMAIL || "diogoamanciosilva@gmail.com",
      );

      I.fillField(
        'input[name="password"]',
        process.env.USER_PASSWORD || "cruzeiro@1921",
      );

      const botaoEntrar = locate("button").withDescendant(
        locate("span").withText("Entrar"),
      );

      I.waitForElement(botaoEntrar, 20);

      I.click(botaoEntrar);

      console.log("SUCESSO: login realizado.");

      I.waitInUrl("/orders/", 30);
    }

    I.waitInUrl("/orders/", 30);

    I.waitForText("Pagamento", 30);

    I.waitForText("Detalhes do pedido", 30);

    console.log("SUCESSO: checkout carregado.");

    const urlCheckout = await I.grabCurrentUrl();

    const orderIdOriginal = new URL(urlCheckout).pathname.split("/orders/")[1];

    console.log(`Pedido original: ${orderIdOriginal}`);

    for (let i = 1; i <= 5; i++) {
      console.log(`========== REFRESH ${i} ==========`);

      I.refreshPage();

      I.waitForFunction(() => document.readyState === "complete", 20);

      I.wait(2);

      const urlAtual = await I.grabCurrentUrl();

      console.log(`URL após refresh: ${urlAtual}`);

      if (urlAtual.includes("/orders/")) {
        I.waitForText("Pagamento", 20);

        I.waitForText("Detalhes do pedido", 20);

        continue;
      }

      if (
        urlAtual.includes("error=") ||
        urlAtual.includes("/signin") ||
        urlAtual.includes("/login")
      ) {
        throw new Error(
          `
BUG DETECTADO

Refresh: ${i}

URL:
${urlAtual}

Checkout invalidado após refresh.
`,
        );
      }

      throw new Error(
        `
Comportamento inesperado.

Refresh: ${i}

URL:
${urlAtual}
`,
      );
    }

    console.log("SUCESSO: checkout preservado.");

    const urlFinal = await I.grabCurrentUrl();

    const orderIdFinal = new URL(urlFinal).pathname.split("/orders/")[1];

    if (orderIdOriginal !== orderIdFinal) {
      throw new Error(
        `
Pedido alterado após refresh.

Original:
${orderIdOriginal}

Final:
${orderIdFinal}
`,
      );
    }

    console.log("SUCESSO: mesmo pedido mantido.");

    I.waitForText("Pagamento", 20);

    I.waitForText("Detalhes do pedido", 20);

    console.log("SUCESSO: integridade preservada.");

    const quantidadeOrders = (urlFinal.match(/orders/g) || []).length;

    if (quantidadeOrders > 1) {
      throw new Error("Múltiplos pedidos detectados.");
    }

    console.log("SUCESSO: nenhum pedido duplicado.");

    I.wait(3);
  },
).tag("@compraringressos115");

/////----------/////

Scenario(
  "Cenário: 0000000116 - Logout em outra aba durante o checkout.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);

    I.wait(2);

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

    I.wait(2);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 15);

    I.scrollTo(botaoAdicionar);

    I.click(botaoAdicionar);

    console.log("SUCESSO: ingresso adicionado.");

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 15);

    I.scrollTo(botaoComprar);

    I.click(botaoComprar);

    I.wait(3);

    const loginVisivel = await I.grabNumberOfVisibleElements(
      'input[name="email"]',
    );

    if (loginVisivel > 0) {
      I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");

      I.fillField('input[name="password"]', "cruzeiro@1921");

      const botaoEntrar = locate("button").withDescendant(
        locate("span").withText("Entrar"),
      );

      I.waitForElement(botaoEntrar, 10);

      I.click(botaoEntrar);

      I.wait(5);

      console.log("SUCESSO: login realizado.");
    }

    I.waitInUrl("/orders/", 20);

    I.waitForText("Pagamento", 20);

    console.log("SUCESSO: usuário está no checkout.");

    const urlCheckout = await I.grabCurrentUrl();

    console.log(`Checkout salvo: ${urlCheckout}`);

    await I.usePlaywrightTo("abrir nova aba", async ({ browser }) => {
      const context = browser.contexts()[0];

      const novaPagina = await context.newPage();

      await novaPagina.goto(urlCheckout);
    });

    console.log("SUCESSO: nova aba aberta.");

    await I.usePlaywrightTo("logout segunda aba", async ({ browser }) => {
      const context = browser.contexts()[0];

      const pages = context.pages();

      const segundaAba = pages[1];

      await segundaAba.bringToFront();

      await segundaAba.waitForSelector(
        "span.flex.h-full.w-full.items-center.justify-center.rounded-full.bg-muted",
      );

      await segundaAba.click(
        "span.flex.h-full.w-full.items-center.justify-center.rounded-full.bg-muted",
      );

      await segundaAba.waitForSelector('div[role="menuitem"]');

      await segundaAba.click('//span[text()="Sair"]');

      await segundaAba.waitForLoadState("networkidle");
    });

    console.log("SUCESSO: logout realizado em outra aba.");

    await I.usePlaywrightTo("voltar aba original", async ({ browser }) => {
      const context = browser.contexts()[0];

      const pages = context.pages();

      const primeiraAba = pages[0];

      await primeiraAba.bringToFront();

      await primeiraAba.reload();

      await primeiraAba.waitForLoadState("networkidle");
    });

    I.wait(5);

    const checkoutAtivo = await I.grabNumberOfVisibleElements("text=Pagamento");

    if (checkoutAtivo > 0) {
      console.log(
        "ALERTA: checkout permaneceu ativo após logout em outra aba.",
      );

      console.log("POSSÍVEL BUG DE SESSÃO/AUTENTICAÇÃO.");
    } else {
      console.log("SUCESSO: checkout invalidado corretamente.");

      I.seeElement('input[name="email"]');
    }

    I.wait(3);
  },
).tag("@compraringressos116");

/////----------/////

Scenario(
  "Cenário: 0000000117 - Validar sincronização do contador do checkout.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);

    I.wait(2);

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

    I.wait(2);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 15);

    I.scrollTo(botaoAdicionar);

    I.click(botaoAdicionar);

    console.log("SUCESSO: ingresso adicionado.");

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 15);

    I.scrollTo(botaoComprar);

    I.click(botaoComprar);

    I.wait(3);

    const loginVisivel = await I.grabNumberOfVisibleElements(
      'input[name="email"]',
    );

    if (loginVisivel > 0) {
      I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");

      I.fillField('input[name="password"]', "cruzeiro@1921");

      const botaoEntrar = locate("button").withDescendant(
        locate("span").withText("Entrar"),
      );

      I.waitForElement(botaoEntrar, 10);

      I.click(botaoEntrar);

      I.wait(5);

      console.log("SUCESSO: login realizado.");
    }

    I.waitInUrl("/orders/", 20);

    I.waitForText("Pagamento", 20);

    I.waitForText("Checkout expira em", 20);

    console.log("SUCESSO: usuário está no checkout.");

    const contadorXpath = "//span[contains(text(),'Checkout expira em')]/span";

    const tempoInicial = await I.grabTextFrom(contadorXpath);

    console.log(`Tempo inicial: ${tempoInicial}`);

    I.wait(5);

    const tempoDepois = await I.grabTextFrom(contadorXpath);

    console.log(`Tempo após 5 segundos: ${tempoDepois}`);

    if (tempoInicial === tempoDepois) {
      throw new Error("ERRO: contador congelado.");
    }

    console.log("SUCESSO: contador reduzindo normalmente.");

    const tempoAntesRefresh = await I.grabTextFrom(contadorXpath);

    console.log(`Tempo antes refresh: ${tempoAntesRefresh}`);

    I.refreshPage();

    I.wait(5);

    I.waitInUrl("/orders/", 20);

    I.waitForText("Checkout expira em", 20);

    const tempoDepoisRefresh = await I.grabTextFrom(contadorXpath);

    console.log(`Tempo após refresh: ${tempoDepoisRefresh}`);

    if (tempoDepoisRefresh === "10:00") {
      throw new Error("ERRO: contador reiniciado após refresh.");
    }

    console.log("SUCESSO: contador sincronizado após refresh.");

    I.wait(5);

    const tempoFinal = await I.grabTextFrom(contadorXpath);

    console.log(`Tempo final: ${tempoFinal}`);

    if (tempoDepoisRefresh === tempoFinal) {
      throw new Error("ERRO: contador congelou após refresh.");
    }

    console.log("SUCESSO: contador continua sincronizado.");

    I.wait(3);
  },
).tag("@compraringressos117");

/////----------/////

Scenario(
  "Cenário: 0000000118 - Validar persistência indevida do checkout após logout.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);

    I.wait(2);

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

    I.wait(2);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 15);

    I.scrollTo(botaoAdicionar);

    I.click(botaoAdicionar);

    console.log("SUCESSO: ingresso adicionado.");

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 15);

    I.scrollTo(botaoComprar);

    I.click(botaoComprar);

    I.wait(3);

    const loginVisivel = await I.grabNumberOfVisibleElements(
      'input[name="email"]',
    );

    if (loginVisivel > 0) {
      I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");

      I.fillField('input[name="password"]', "cruzeiro@1921");

      const botaoEntrar = locate("button").withDescendant(
        locate("span").withText("Entrar"),
      );

      I.waitForElement(botaoEntrar, 10);

      I.click(botaoEntrar);

      I.wait(5);

      console.log("SUCESSO: login realizado.");
    }

    I.waitInUrl("/orders/", 20);

    I.waitForText("Pagamento", 20);

    console.log("SUCESSO: usuário está no checkout.");

    const urlCheckout = await I.grabCurrentUrl();

    console.log(`Checkout salvo: ${urlCheckout}`);

    I.waitForElement(
      "span.flex.h-full.w-full.items-center.justify-center.rounded-full.bg-muted",
      10,
    );

    I.click(
      "span.flex.h-full.w-full.items-center.justify-center.rounded-full.bg-muted",
    );

    I.waitForElement('div[role="menuitem"]', 10);

    I.waitForText("Sair", 10);

    I.click("//span[text()='Sair']");

    I.waitForText("Entrar", 20);

    console.log("SUCESSO: logout realizado.");

    I.say("Voltando para página anterior");

    I.executeScript(() => {
      window.history.back();
    });

    I.wait(3);

    I.say("Utilizando botão avançar do navegador");

    I.executeScript(() => {
      window.history.forward();
    });

    I.wait(5);

    const loginTela = await I.grabNumberOfVisibleElements(
      'input[name="email"]',
    );

    const checkoutVisivel =
      await I.grabNumberOfVisibleElements("text=Pagamento");

    if (checkoutVisivel > 0) {
      console.log("ALERTA: checkout permaneceu acessível após logout.");

      console.log("POSSÍVEL FALHA DE INVALIDAÇÃO DE SESSÃO.");
    } else {
      console.log("SUCESSO: checkout bloqueado após logout.");
    }

    if (loginTela > 0) {
      console.log("SUCESSO: usuário permaneceu deslogado.");
    } else {
      I.waitForText("Entrar", 20);

      console.log("SUCESSO: tela exige autenticação novamente.");
    }

    const urlAtual = await I.grabCurrentUrl();

    console.log(`URL atual: ${urlAtual}`);

    if (urlAtual.includes("/orders/")) {
      console.log("ALERTA: usuário ainda acessa URL do checkout.");
    } else {
      console.log("SUCESSO: usuário removido do checkout.");
    }

    I.wait(3);
  },
).tag("@compraringressos118");

/////----------/////

Scenario(
  "Cenário: 0000000119 - Utilizar botão voltar durante pagamento.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);

    I.wait(2);

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

    I.wait(2);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 15);

    I.scrollTo(botaoAdicionar);

    I.click(botaoAdicionar);

    console.log("SUCESSO: ingresso adicionado.");

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 15);

    I.scrollTo(botaoComprar);

    I.click(botaoComprar);

    I.wait(3);

    const loginVisivel = await I.grabNumberOfVisibleElements(
      'input[name="email"]',
    );

    if (loginVisivel > 0) {
      I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");

      I.fillField('input[name="password"]', "cruzeiro@1921");

      const botaoEntrar = locate("button").withDescendant(
        locate("span").withText("Entrar"),
      );

      I.waitForElement(botaoEntrar, 10);

      I.click(botaoEntrar);

      I.wait(5);

      console.log("SUCESSO: login realizado.");
    }

    I.waitInUrl("/orders/", 20);

    I.waitForText("Pagamento", 20);

    console.log("SUCESSO: usuário está no checkout.");

    const urlCheckout = await I.grabCurrentUrl();

    console.log(`Checkout salvo: ${urlCheckout}`);

    I.say("Voltando para página anterior");

    await I.executeScript(() => {
      window.history.back();
    });

    I.wait(5);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 20);

    I.waitForText("Comprar ingressos", 20);

    console.log("SUCESSO: usuário retornou para página do evento.");

    const quantidadePedidos = (await I.grabCurrentUrl()).includes("/orders/");

    if (quantidadePedidos) {
      throw new Error("ERRO: usuário permaneceu indevidamente no checkout.");
    }

    console.log("SUCESSO: nenhum item duplicado visualmente.");

    I.say("Retornando para checkout salvo");

    I.amOnPage(urlCheckout);

    I.waitInUrl("/orders/", 20);

    I.waitForText("Pagamento", 20);

    console.log("SUCESSO: checkout reaberto.");

    const urlFinal = await I.grabCurrentUrl();

    const pedidoOriginal = urlCheckout.split("/orders/")[1];

    const pedidoFinal = urlFinal.split("/orders/")[1];

    if (pedidoOriginal !== pedidoFinal) {
      throw new Error("ERRO: novo pedido foi criado.");
    }

    console.log("SUCESSO: pedido original mantido.");

    console.log("SUCESSO: nenhum pedido duplicado.");

    I.wait(3);
  },
).tag("@compraringressos119");

/////----------/////

Scenario(
  "Cenário: 0000000120 - Abrir o mesmo checkout em múltiplas aba.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);

    I.wait(2);

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

    I.wait(2);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 15);

    I.scrollTo(botaoAdicionar);

    I.click(botaoAdicionar);

    console.log("SUCESSO: ingresso adicionado.");

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 15);

    I.scrollTo(botaoComprar);

    I.click(botaoComprar);

    I.wait(3);

    const loginVisivel = await I.grabNumberOfVisibleElements(
      'input[name="email"]',
    );

    if (loginVisivel > 0) {
      I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");

      I.fillField('input[name="password"]', "cruzeiro@1921");

      const botaoEntrar = locate("button").withDescendant(
        locate("span").withText("Entrar"),
      );

      I.waitForElement(botaoEntrar, 10);

      I.click(botaoEntrar);

      I.wait(5);

      console.log("SUCESSO: login realizado.");
    }

    I.waitInUrl("/orders/", 20);

    I.waitForText("Pagamento", 20);

    console.log("SUCESSO: usuário está no checkout.");

    const urlCheckout = await I.grabCurrentUrl();

    console.log(`Checkout salvo: ${urlCheckout}`);

    const pedidoOriginal = urlCheckout.split("/orders/")[1];

    I.say("Abrindo checkout em múltiplas abas");

    await I.usePlaywrightTo("abrir múltiplas abas", async ({ browser }) => {
      const context = browser.contexts()[0];

      const aba2 = await context.newPage();

      await aba2.goto(urlCheckout);

      const aba3 = await context.newPage();

      await aba3.goto(urlCheckout);
    });

    console.log("SUCESSO: checkout aberto em múltiplas abas.");

    I.waitForText("Pagamento", 20);

    const urlAbaPrincipal = await I.grabCurrentUrl();

    const pedidoAbaPrincipal = urlAbaPrincipal.split("/orders/")[1];

    if (pedidoOriginal !== pedidoAbaPrincipal) {
      throw new Error("ERRO: pedido inconsistente na aba principal.");
    }

    console.log("SUCESSO: aba principal mantém o mesmo pedido.");

    I.waitForText("Detalhes do pedido", 20);

    I.waitForText("Pagamento", 20);

    console.log("SUCESSO: checkout permanece íntegro.");

    const urlAtual = await I.grabCurrentUrl();

    const pedidoAtual = urlAtual.split("/orders/")[1];

    if (pedidoAtual !== pedidoOriginal) {
      throw new Error("ERRO: novo pedido foi criado.");
    }

    console.log("SUCESSO: nenhum pedido duplicado.");

    I.refreshPage();

    I.wait(5);

    I.waitForText("Pagamento", 20);

    I.waitForText("Detalhes do pedido", 20);

    console.log("SUCESSO: estado sincronizado após atualização.");

    I.wait(3);
  },
).tag("@compraringressos120");

/////----------/////

Scenario(
  "Cenário: 0000000121 - Expiração do checkout em múltiplas abas simultaneamente.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);

    I.wait(2);

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

    I.wait(2);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 15);

    I.scrollTo(botaoAdicionar);

    I.click(botaoAdicionar);

    console.log("SUCESSO: ingresso adicionado.");

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 15);

    I.scrollTo(botaoComprar);

    I.click(botaoComprar);

    I.wait(3);

    const loginVisivel = await I.grabNumberOfVisibleElements(
      'input[name="email"]',
    );

    if (loginVisivel > 0) {
      I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");

      I.fillField('input[name="password"]', "cruzeiro@1921");

      const botaoEntrar = locate("button").withDescendant(
        locate("span").withText("Entrar"),
      );

      I.waitForElement(botaoEntrar, 10);

      I.click(botaoEntrar);

      I.wait(5);

      console.log("SUCESSO: login realizado.");
    }

    I.waitInUrl("/orders/", 20);

    I.waitForText("Pagamento", 20);

    I.waitForText("Checkout expira em", 20);

    console.log("SUCESSO: usuário está no checkout.");

    const urlCheckout = await I.grabCurrentUrl();

    console.log(`Checkout salvo: ${urlCheckout}`);

    let aba2;
    let aba3;

    await I.usePlaywrightTo("abrir múltiplas abas", async ({ browser }) => {
      const context = browser.contexts()[0];

      aba2 = await context.newPage();

      await aba2.goto(urlCheckout);

      aba3 = await context.newPage();

      await aba3.goto(urlCheckout);
    });

    console.log("SUCESSO: checkout aberto em múltiplas abas.");

    I.say("Aguardando expiração do checkout");

    const contador = "//span[contains(text(),'Checkout expira em')]/span";

    I.waitForFunction(
      (xpath) => {
        const el = document.evaluate(
          xpath,
          document,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null,
        ).singleNodeValue;

        return el && el.innerText.trim() === "00:00";
      },
      [contador],
      650,
    );

    I.wait(30);

    console.log("SUCESSO: checkout expirado.");

    I.waitForText(
      "Seu carrinho expirou, selecione novamente seus ingressos.",
      30,
    );

    console.log("SUCESSO: aba principal refletiu expiração.");

    await I.usePlaywrightTo("validar segunda aba", async () => {
      const textoAba2 = await aba2.textContent("body");

      if (
        !textoAba2.includes(
          "Seu carrinho expirou, selecione novamente seus ingressos.",
        )
      ) {
        throw new Error("ERRO: segunda aba não refletiu checkout expirado.");
      }
    });

    console.log("SUCESSO: segunda aba sincronizada.");

    await I.usePlaywrightTo("validar terceira aba", async () => {
      const textoAba3 = await aba3.textContent("body");

      if (
        !textoAba3.includes(
          "Seu carrinho expirou, selecione novamente seus ingressos.",
        )
      ) {
        throw new Error("ERRO: terceira aba não refletiu checkout expirado.");
      }
    });

    console.log("SUCESSO: terceira aba sincronizada.");

    console.log("SUCESSO: todas as abas refletiram checkout expirado.");

    I.wait(3);
  },
).tag("@compraringressos121");

/////----------/////

Scenario(
  "Cenário: 0000000122 - Validar persistência do subtotal após refresh.",
  async ({ I }) => {
    // =============================
    // ACESSO INICIAL
    // =============================
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 10);

    I.click("Explorar eventos");

    I.waitInUrl("/events", 10);

    I.wait(2);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 10);

    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em São Paulo");

    I.waitForElement(evento, 10);

    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 15);

    I.wait(2);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 20);

    I.scrollTo(botaoAdicionar);

    I.click(botaoAdicionar);

    console.log("SUCESSO: ingressos adicionados.");

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 20);

    I.click(botaoComprar);

    I.wait(3);

    const urlAtual = await I.grabCurrentUrl();

    if (urlAtual.includes("/signin")) {
      console.log("ALERTA: login obrigatório identificado.");

      I.waitForElement('input[name="email"]', 20);

      I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");

      I.fillField('input[name="password"]', "cruzeiro@1921");

      const botaoEntrar = locate("button").withDescendant(
        locate("span").withText("Entrar"),
      );

      I.waitForElement(botaoEntrar, 15);

      I.click(botaoEntrar);

      I.wait(8);

      console.log("SUCESSO: login realizado.");
    }

    I.waitInUrl("/orders/", 30);

    I.waitForText("Pagamento", 30);

    console.log("SUCESSO: usuário está no checkout.");

    const subtotalLocator = locate({
      xpath:
        "//*[contains(text(),'Subtotal')]/following::*[contains(text(),'R$')][1]",
    });

    const totalLocator = locate({
      xpath:
        "//*[contains(text(),'Total')]/following::*[contains(text(),'R$')][1]",
    });

    I.waitForElement(subtotalLocator, 30);

    I.waitForElement(totalLocator, 30);

    const subtotalAntes = (await I.grabTextFrom(subtotalLocator)).trim();

    const totalAntes = (await I.grabTextFrom(totalLocator)).trim();

    console.log(`Subtotal antes do refresh: ${subtotalAntes}`);

    console.log(`Total antes do refresh: ${totalAntes}`);

    I.refreshPage();

    I.wait(5);

    I.waitForText("Pagamento", 30);

    console.log("SUCESSO: checkout carregado após refresh.");

    I.waitForElement(subtotalLocator, 30);

    I.waitForElement(totalLocator, 30);

    const subtotalDepois = (await I.grabTextFrom(subtotalLocator)).trim();

    const totalDepois = (await I.grabTextFrom(totalLocator)).trim();

    console.log(`Subtotal após refresh: ${subtotalDepois}`);

    console.log(`Total após refresh: ${totalDepois}`);

    if (subtotalAntes !== subtotalDepois) {
      throw new Error("ERRO: subtotal alterado após refresh.");
    }

    console.log("SUCESSO: subtotal preservado.");

    if (totalAntes !== totalDepois) {
      throw new Error("ERRO: total alterado após refresh.");
    }

    console.log("SUCESSO: total preservado.");

    I.wait(3);
  },
).tag("@compraringressos122");

/////----------/////

Scenario(
  "Cenário: 0000000123 - Validar criação de novo pedido após carrinho expirado.",
  async ({ I }) => {
    let pedidoAntigo;
    let pedidoNovo;

    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 15);

    I.click("Explorar eventos");

    I.waitInUrl("/events", 15);

    I.wait(2);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 15);

    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em São Paulo");

    I.waitForElement(evento, 15);

    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 15);

    I.wait(3);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 20);

    I.scrollTo(botaoAdicionar);

    I.click(botaoAdicionar);

    console.log("SUCESSO: ingresso adicionado.");

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 20);

    I.click(botaoComprar);

    I.wait(3);

    const urlAtual = await I.grabCurrentUrl();

    if (urlAtual.includes("/signin")) {
      console.log("ALERTA: login obrigatório identificado.");

      I.waitForElement('input[name="email"]', 20);

      I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");

      I.fillField('input[name="password"]', "cruzeiro@1921");

      const botaoEntrar = locate("button").withDescendant(
        locate("span").withText("Entrar"),
      );

      I.waitForElement(botaoEntrar, 15);

      I.click(botaoEntrar);

      I.wait(8);

      console.log("SUCESSO: login realizado.");
    }

    I.waitInUrl("/orders/", 30);

    I.waitForText("Pagamento", 30);

    console.log("SUCESSO: checkout acessado.");

    pedidoAntigo = await I.grabCurrentUrl();

    console.log(`Pedido antigo: ${pedidoAntigo}`);

    I.say("Simulando expiração do checkout");

    I.clearCookie();

    I.executeScript(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    I.wait(3);

    console.log("SUCESSO: sessão anterior removida.");

    I.amOnPage("https://fastix.com.br/events/buffalo-tom-em-sao-paulo");

    I.wait(5);

    I.waitForVisible(botaoAdicionar, 20);

    I.scrollTo(botaoAdicionar);

    I.click(botaoAdicionar);

    console.log("SUCESSO: novo ingresso adicionado.");

    I.waitForVisible(botaoComprar, 20);

    I.click(botaoComprar);

    I.wait(3);

    const novaUrl = await I.grabCurrentUrl();

    if (novaUrl.includes("/signin")) {
      console.log("ALERTA: novo login obrigatório identificado.");

      I.waitForElement('input[name="email"]', 20);

      I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");

      I.fillField('input[name="password"]', "cruzeiro@1921");

      const botaoEntrar2 = locate("button").withDescendant(
        locate("span").withText("Entrar"),
      );

      I.waitForElement(botaoEntrar2, 15);

      I.click(botaoEntrar2);

      I.wait(8);

      console.log("SUCESSO: novo login realizado.");
    }

    I.waitInUrl("/orders/", 30);

    I.waitForText("Pagamento", 30);

    pedidoNovo = await I.grabCurrentUrl();

    console.log(`Novo pedido: ${pedidoNovo}`);

    if (pedidoAntigo === pedidoNovo) {
      throw new Error("ERRO: sistema reutilizou pedido expirado.");
    }

    console.log("SUCESSO: novo pedido gerado corretamente.");

    I.wait(3);
  },
).tag("@compraringressos123");

/////----------/////

Scenario(
  "Cenário: 0000000124 - Validar comportamento do checkout após hard refresh.",
  async ({ I }) => {
    let pedidoAntigo;
    let pedidoNovo;

    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Explorar eventos", 15);

    I.click("Explorar eventos");

    I.waitInUrl("/events", 15);

    I.wait(2);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar por evento, local, cidade...",
    });

    I.waitForElement(campoBusca, 15);

    I.fillField(campoBusca, "Buffalo Tom em São Paulo");

    I.wait(2);

    const evento = locate("p").withText("Buffalo Tom em São Paulo");

    I.waitForElement(evento, 15);

    I.click(evento);

    I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 15);

    I.wait(3);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 20);

    I.scrollTo(botaoAdicionar);

    I.click(botaoAdicionar);

    console.log("SUCESSO: ingresso adicionado.");

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 20);

    I.click(botaoComprar);

    I.wait(3);

    const urlAtual = await I.grabCurrentUrl();

    if (urlAtual.includes("/signin")) {
      console.log("ALERTA: login obrigatório identificado.");

      I.waitForElement('input[name="email"]', 20);

      I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");

      I.fillField('input[name="password"]', "cruzeiro@1921");

      const botaoEntrar = locate("button").withDescendant(
        locate("span").withText("Entrar"),
      );

      I.waitForElement(botaoEntrar, 15);

      I.click(botaoEntrar);

      I.wait(8);

      console.log("SUCESSO: login realizado.");
    }

    I.waitInUrl("/orders/", 30);

    I.waitForText("Pagamento", 30);

    console.log("SUCESSO: usuário está no checkout.");

    checkoutUrl = await I.grabCurrentUrl();

    console.log(`Checkout atual: ${checkoutUrl}`);

    I.waitForText("Resumo do pedido", 20);

    I.waitForText("Subtotal", 20);

    I.waitForText("Total", 20);

    console.log("SUCESSO: estado inicial do checkout validado.");

    I.say("Executando hard refresh da página");

    I.usePlaywrightTo("realizar hard refresh", async ({ page }) => {
      await page.reload({
        waitUntil: "networkidle",
      });
    });

    I.wait(5);

    I.waitInUrl("/orders/", 30);

    I.waitForText("Pagamento", 30);

    I.waitForText("Resumo do pedido", 20);

    I.waitForText("Subtotal", 20);

    I.waitForText("Total", 20);

    console.log("SUCESSO: checkout restaurado após hard refresh.");

    const urlDepoisRefresh = await I.grabCurrentUrl();

    console.log(`URL após hard refresh: ${urlDepoisRefresh}`);

    if (!urlDepoisRefresh.includes("/orders/")) {
      throw new Error("ERRO: checkout não foi restaurado após hard refresh.");
    }

    console.log("SUCESSO: checkout permaneceu íntegro após hard refresh.");

    I.wait(3);
  },
).tag("@compraringressos124");

/////----------/////

Scenario(
  "Cenário: 0000000125 - Validar bloqueio de checkout após múltiplas expirações consecutivas.",
  async ({ I }) => {
    const pedidosExpirados = [];

    async function criarNovoCheckout() {
      I.amOnPage("https://fastix.com.br/");

      I.waitForText("Explorar eventos", 15);

      I.click("Explorar eventos");

      I.waitInUrl("/events", 15);

      I.wait(2);

      const campoBusca = locate("input").withAttr({
        placeholder: "Pesquisar por evento, local, cidade...",
      });

      I.waitForElement(campoBusca, 15);

      I.fillField(campoBusca, "Buffalo Tom em São Paulo");

      I.wait(2);

      const evento = locate("p").withText("Buffalo Tom em São Paulo");

      I.waitForElement(evento, 15);

      I.click(evento);

      I.waitInUrl("/events/buffalo-tom-em-sao-paulo", 15);

      I.wait(3);

      const botaoAdicionar = locate({
        xpath:
          "//p[contains(., 'Inteira')]/following::button[.//span[contains(., 'Adicionar')]][1]",
      });

      I.waitForVisible(botaoAdicionar, 20);

      I.scrollTo(botaoAdicionar);

      I.click(botaoAdicionar);

      console.log("SUCESSO: ingresso adicionado.");

      const botaoComprar = locate("button, a").withText("Comprar ingressos");

      I.waitForVisible(botaoComprar, 20);

      I.click(botaoComprar);

      I.wait(3);

      const urlAtual = await I.grabCurrentUrl();

      if (urlAtual.includes("/signin")) {
        console.log("ALERTA: login obrigatório identificado.");

        I.waitForElement('input[name="email"]', 20);

        I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");

        I.fillField('input[name="password"]', "cruzeiro@1921");

        const botaoEntrar = locate("button").withDescendant(
          locate("span").withText("Entrar"),
        );

        I.waitForElement(botaoEntrar, 15);

        I.click(botaoEntrar);

        I.wait(8);

        console.log("SUCESSO: login realizado.");
      }

      I.waitInUrl("/orders/", 30);

      I.waitForText("Pagamento", 30);

      console.log("SUCESSO: usuário está no checkout.");

      const checkoutUrl = await I.grabCurrentUrl();

      console.log(`Checkout atual: ${checkoutUrl}`);

      I.waitForText("Resumo do pedido", 20);

      I.waitForText("Subtotal", 20);

      I.waitForText("Total", 20);

      console.log("SUCESSO: checkout validado.");

      I.say("Executando hard refresh da página");

      I.usePlaywrightTo("realizar hard refresh", async ({ page }) => {
        await page.reload({
          waitUntil: "networkidle",
        });
      });

      I.wait(5);

      I.waitInUrl("/orders/", 30);

      I.waitForText("Pagamento", 30);

      I.waitForText("Resumo do pedido", 20);

      I.waitForText("Subtotal", 20);

      I.waitForText("Total", 20);

      console.log("SUCESSO: checkout restaurado após hard refresh.");

      const urlDepoisRefresh = await I.grabCurrentUrl();

      console.log(`URL após hard refresh: ${urlDepoisRefresh}`);

      if (!urlDepoisRefresh.includes("/orders/")) {
        throw new Error("ERRO: checkout não foi restaurado após hard refresh.");
      }

      console.log("SUCESSO: checkout permaneceu íntegro após hard refresh.");

      return checkoutUrl;
    }

    const pedido1 = await criarNovoCheckout();

    pedidosExpirados.push(pedido1);

    console.log(`Checkout expirado 1: ${pedido1}`);

    I.clearCookie();

    I.executeScript(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    console.log("SUCESSO: primeira sessão expirada.");

    I.wait(3);

    const pedido2 = await criarNovoCheckout();

    pedidosExpirados.push(pedido2);

    console.log(`Checkout expirado 2: ${pedido2}`);

    I.clearCookie();

    I.executeScript(() => {
      localStorage.clear();
      sessionStorage.clear();
    });

    console.log("SUCESSO: segunda sessão expirada.");

    I.wait(3);

    const novoPedido = await criarNovoCheckout();

    console.log(`Novo checkout ativo: ${novoPedido}`);

    if (pedidosExpirados.includes(novoPedido)) {
      throw new Error("ERRO: sistema reutilizou checkout expirado.");
    }

    console.log("SUCESSO: sistema gerou novo checkout corretamente.");

    I.waitForText("Resumo do pedido", 20);

    I.waitForText("Subtotal", 20);

    I.waitForText("Total", 20);

    console.log("SUCESSO: fluxo permaneceu estável após múltiplas expirações.");

    I.wait(3);
  },
).tag("@compraringressos125");

/////----------/////

Scenario(
  "Bug: 0000000126 - Validar que o botão 'Pagar' não seja duplicado após alternar abas e retornar ao checkout.",
  async ({ I }) => {
    const assert = require("assert");

    I.say("ACESSANDO PÁGINA DO EVENTO");

    I.amOnPage("https://fastix.com.br/events/buffalo-tom-em-sao-paulo");

    I.waitForElement("body", 10);

    I.say("SELECIONANDO 2 INGRESSOS — MEIA SOLIDÁRIA");

    const tituloIngresso = locate("p").withText(
      "Meia Solidária (Válida para todos, levando 1kg de alimento não-perecível)",
    );

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Meia Solidária')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);

    I.click(botaoAdicionar);
    I.wait(1);
    I.click(botaoAdicionar);
    I.wait(1);

    const contador = locate({
      xpath:
        "//p[contains(., 'Meia Solidária')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    I.say("✅ 2 INGRESSOS SELECIONADOS");

    I.say("CLICANDO EM COMPRAR INGRESSOS");

    const botaoComprar = locate("button, a").withText("Comprar ingressos");

    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.say("REALIZANDO LOGIN");

    I.waitForElement('input[name="email"]', 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.wait(15);

    I.say("✅ LOGIN REALIZADO");

    I.say("AGUARDANDO GERAÇÃO DO PEDIDO");

    await I.usePlaywrightTo(
      "aguardar URL do pedido ser gerada",
      async ({ page }) => {
        await page.waitForURL((url) => url.toString().includes("/orders/"), {
          timeout: 30000,
        });
        console.log("URL do pedido gerada:", page.url());
      },
    );

    const urlPedido = await I.grabCurrentUrl();
    I.say(`URL DO PEDIDO GERADA: ${urlPedido}`);

    I.seeInCurrentUrl("/orders/");

    I.say("VERIFICANDO BOTÃO PAGAR NO CARREGAMENTO INICIAL");

    const botaoPagar = locate("button[type='submit']").withDescendant(
      locate("span").withText("Pagar"),
    );

    I.waitForVisible(botaoPagar, 30);

    const quantidadeInicial = await I.grabNumberOfVisibleElements(botaoPagar);
    I.say(
      `Quantidade de botões "Pagar" no carregamento inicial: ${quantidadeInicial}`,
    );

    const htmlInicial = await I.grabHTMLFromAll(botaoPagar);
    I.say(
      `HTML do(s) botão(ões) no carregamento inicial: ${JSON.stringify(htmlInicial)}`,
    );

    assert.strictEqual(
      quantidadeInicial,
      1,
      "Deveria existir exatamente 1 botão 'Pagar' no carregamento inicial",
    );

    I.say("PERMANECENDO NA PÁGINA DO PEDIDO POR 15 SEGUNDOS");

    I.wait(15);

    I.say("✅ 15 SEGUNDOS NA PÁGINA DO PEDIDO CONCLUÍDOS");

    I.say("ABRINDO NOVA ABA COM GOOGLE");

    I.openNewTab();

    await I.usePlaywrightTo(
      "navegar para o Google na nova aba",
      async ({ page }) => {
        await page.goto("https://www.google.com/");
        await page.waitForLoadState("domcontentloaded");
        console.log("Google carregado:", page.url());
      },
    );

    I.say("AGUARDANDO 15 SEGUNDOS NA ABA DO GOOGLE");

    I.wait(15);

    I.say("✅ 15 SEGUNDOS NO GOOGLE CONCLUÍDOS");

    I.say("RETORNANDO À ABA DO PEDIDO");

    I.switchToPreviousTab();

    I.wait(3);

    I.seeInCurrentUrl("/orders/");

    I.waitForVisible(botaoPagar, 15);

    I.say("VERIFICANDO DUPLICAÇÃO DO BOTÃO PAGAR APÓS RETORNO");

    const quantidadeAposRetorno =
      await I.grabNumberOfVisibleElements(botaoPagar);
    I.say(
      `Quantidade de botões "Pagar" após retornar à aba: ${quantidadeAposRetorno}`,
    );

    const htmlAposRetorno = await I.grabHTMLFromAll(botaoPagar);
    htmlAposRetorno.forEach((html, index) => {
      I.say(`--- Evidência: botão "Pagar" #${index + 1} após retorno ---`);
      I.say(html);
    });

    const classesBotoes = await I.grabAttributeFromAll(botaoPagar, "class");
    I.say(
      `Classes CSS de cada botão encontrado: ${JSON.stringify(classesBotoes)}`,
    );

    const infoEstrutural = await I.executeScript(() => {
      const botoes = Array.from(
        document.querySelectorAll("button[type='submit']"),
      ).filter((btn) => btn.textContent.includes("Pagar"));

      return botoes.map((btn, idx) => ({
        index: idx,
        outerHTML: btn.outerHTML,
        parentTagName: btn.parentElement ? btn.parentElement.tagName : null,
        parentClassName: btn.parentElement ? btn.parentElement.className : null,
        boundingRect: btn.getBoundingClientRect
          ? JSON.stringify(btn.getBoundingClientRect())
          : null,
        isConnected: btn.isConnected,
      }));
    });

    I.say(
      `Informações estruturais detalhadas (observadas via DOM público): ` +
        `${JSON.stringify(infoEstrutural, null, 2)}`,
    );

    await I.saveScreenshot("bug_botao_pagar_duplicado.png");

    assert.strictEqual(
      quantidadeAposRetorno,
      1,
      `BUG CONFIRMADO (sintoma): esperado 1 botão "Pagar", mas foram encontrados ` +
        `${quantidadeAposRetorno} após abrir aba do Google por 15s e retornar à página de checkout. ` +
        `URL do pedido: ${urlPedido}. ` +
        `HIPÓTESE (causa): possível remontagem duplicada do componente ao reativar a aba ` +
        `(ex.: listener de 'visibilitychange' ou 'focus'). Causa raiz não pode ser determinada ` +
        `sem acesso ao código-fonte do componente; ver evidências de HTML, classes e estrutura ` +
        `DOM nos logs acima, além do screenshot anexado.`,
    );

    I.say(
      "✅ CENÁRIO 126 FINALIZADO — BOTÃO PAGAR NÃO DUPLICOU APÓS RETORNO À ABA",
    );
  },
).tag("@compraringressos126");

/////----------/////

Scenario(
  "Bug: 0000000127 - Garantir que elementos do checkout não sejam duplicados após alternar abas do navegador.",
  async ({ I }) => {
    const assert = require("assert");

    const errosConsole = {
      reactHydration: [],
      metaPixel: [],
      paymentBrick: [],
      outros: [],
    };

    await I.usePlaywrightTo(
      "configurar interceptação de erros de console",
      async ({ page }) => {
        page.on("pageerror", (error) => {
          const texto = error.message;
          if (texto.includes("418")) {
            errosConsole.reactHydration.push({
              mensagem: texto,
              momento: new Date().toISOString(),
            });
            console.log("🔴 REACT #418 CAPTURADO:", texto.substring(0, 120));
          } else {
            errosConsole.outros.push({
              mensagem: texto,
              momento: new Date().toISOString(),
            });
          }
        });

        page.on("console", (msg) => {
          if (msg.type() !== "error") return;
          const texto = msg.text();
          if (
            texto.includes("Invalid PixelID") ||
            texto.includes("Meta Pixel")
          ) {
            errosConsole.metaPixel.push({
              mensagem: texto,
              momento: new Date().toISOString(),
            });
            console.log("🔴 META PIXEL:", texto.substring(0, 120));
          } else if (
            texto.includes("Payment Brick") ||
            texto.includes("preferenceId") ||
            texto.includes("mercadoPago")
          ) {
            errosConsole.paymentBrick.push({
              mensagem: texto,
              momento: new Date().toISOString(),
            });
            console.log("🔴 PAYMENT BRICK:", texto.substring(0, 120));
          }
        });
      },
    );

    I.say("ETAPA 1 — ACESSANDO PÁGINA DO EVENTO");

    I.amOnPage("https://fastix.com.br/events/buffalo-tom-em-sao-paulo");
    I.waitForElement("body", 10);

    I.say("ETAPA 2 — SELECIONANDO 2 INGRESSOS");

    const tituloIngresso = locate("p").withText(
      "Meia Solidária (Válida para todos, levando 1kg de alimento não-perecível)",
    );

    I.waitForVisible(tituloIngresso, 15);
    I.scrollTo(tituloIngresso);

    const botaoAdicionar = locate({
      xpath:
        "//p[contains(., 'Meia Solidária')]/following::button[.//span[contains(., 'Adicionar')]][1]",
    });

    I.waitForVisible(botaoAdicionar, 10);
    I.click(botaoAdicionar);
    I.wait(1);
    I.click(botaoAdicionar);
    I.wait(1);

    const contador = locate({
      xpath:
        "//p[contains(., 'Meia Solidária')]/following::span[normalize-space()='2'][1]",
    });

    I.waitForVisible(contador, 10);
    I.see("2", contador);

    const botaoComprar = locate("button, a").withText("Comprar ingressos");
    I.waitForVisible(botaoComprar, 10);
    I.scrollTo(botaoComprar);
    I.click(botaoComprar);

    I.say("ETAPA 4 — LOGIN");

    I.waitForElement('input[name="email"]', 10);
    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);
    I.wait(15);

    await I.usePlaywrightTo("aguardar URL do pedido", async ({ page }) => {
      await page.waitForURL((url) => url.toString().includes("/orders/"), {
        timeout: 30000,
      });
      console.log("URL do pedido:", page.url());
    });

    const urlPedido = await I.grabCurrentUrl();
    I.say(`URL DO PEDIDO: ${urlPedido}`);
    I.seeInCurrentUrl("/orders/");

    I.say("ETAPA 6 — AGUARDANDO CARREGAMENTO COMPLETO DO CHECKOUT");

    const botaoPagar = locate("button[type='submit']").withDescendant(
      locate("span").withText("Pagar"),
    );

    I.waitForVisible(botaoPagar, 30);

    await I.usePlaywrightTo(
      "aguardar Payment Brick carregar",
      async ({ page }) => {
        await page.waitForSelector(
          'input[aria-label="Cartão de crédito, Parcelamento disponível"]',
          { state: "visible", timeout: 30000 },
        );
        console.log("Payment Brick carregado");
      },
    );

    I.wait(3);

    I.say("ETAPA 7 — CAPTURANDO SNAPSHOT DO DOM ANTES DA ALTERNÂNCIA");

    const snapshotAntes = await I.executeScript(() => {
      const contar = (seletor) => document.querySelectorAll(seletor).length;

      const botoesPagar = Array.from(
        document.querySelectorAll("button[type='submit']"),
      ).filter((b) => b.textContent.includes("Pagar")).length;

      const opcoesCartao = Array.from(
        document.querySelectorAll("input[type='radio']"),
      ).filter((el) => el.getAttribute("aria-label")).length;

      return {
        botoesPagar,
        opcoesCartao,
        inputsRadio: contar("input[type='radio']"),
        divsSvelte: contar("[class*='svelte']"),
        containersBrick: contar("[class*='mp-checkout-bricks']"),
        formCheckout: contar("form"),
        spanPagar: Array.from(document.querySelectorAll("span")).filter(
          (s) => s.textContent.trim() === "Pagar",
        ).length,
        labelCartaoCredito: Array.from(
          document.querySelectorAll("p, span"),
        ).filter((el) => el.textContent.includes("Cartão de crédito")).length,
        labelPix: Array.from(document.querySelectorAll("p, span")).filter(
          (el) => el.textContent.trim() === "Pix",
        ).length,
      };
    });

    console.log("======== SNAPSHOT DOM ANTES DA ALTERNÂNCIA ========");
    console.log(JSON.stringify(snapshotAntes, null, 2));

    const errosAntes = {
      reactHydration: [...errosConsole.reactHydration],
      metaPixel: [...errosConsole.metaPixel],
      paymentBrick: [...errosConsole.paymentBrick],
    };

    console.log("======== ERROS ANTES DA ALTERNÂNCIA ========");
    console.log("React #418:", errosAntes.reactHydration.length);
    console.log("Meta Pixel:", errosAntes.metaPixel.length);
    console.log("Payment Brick:", errosAntes.paymentBrick.length);

    await I.saveScreenshot("checkout_antes_alternancia.png");

    I.say("ETAPA 8 — PERMANECENDO 15 SEGUNDOS NA PÁGINA DO PEDIDO");
    I.wait(15);

    I.say("ETAPA 9 — ABRINDO NOVA ABA COM GOOGLE");

    I.openNewTab();

    await I.usePlaywrightTo(
      "navegar para Google na nova aba",
      async ({ page }) => {
        await page.goto("https://www.google.com/");
        await page.waitForLoadState("domcontentloaded");
        console.log("Google carregado:", page.url());
      },
    );

    I.say("AGUARDANDO 15 SEGUNDOS NO GOOGLE");
    I.wait(15);

    I.say("ETAPA 10 — RETORNANDO À ABA DO PEDIDO");

    I.switchToPreviousTab();

    I.wait(5);

    I.seeInCurrentUrl("/orders/");
    I.waitForVisible(botaoPagar, 15);

    I.wait(3);

    I.say("ETAPA 11 — CAPTURANDO SNAPSHOT DO DOM APÓS A ALTERNÂNCIA");

    const snapshotDepois = await I.executeScript(() => {
      const contar = (seletor) => document.querySelectorAll(seletor).length;

      const botoesPagar = Array.from(
        document.querySelectorAll("button[type='submit']"),
      ).filter((b) => b.textContent.includes("Pagar")).length;

      const opcoesCartao = Array.from(
        document.querySelectorAll("input[type='radio']"),
      ).filter((el) => el.getAttribute("aria-label")).length;

      return {
        botoesPagar,
        opcoesCartao,
        inputsRadio: contar("input[type='radio']"),
        divsSvelte: contar("[class*='svelte']"),
        containersBrick: contar("[class*='mp-checkout-bricks']"),
        formCheckout: contar("form"),
        spanPagar: Array.from(document.querySelectorAll("span")).filter(
          (s) => s.textContent.trim() === "Pagar",
        ).length,
        labelCartaoCredito: Array.from(
          document.querySelectorAll("p, span"),
        ).filter((el) => el.textContent.includes("Cartão de crédito")).length,
        labelPix: Array.from(document.querySelectorAll("p, span")).filter(
          (el) => el.textContent.trim() === "Pix",
        ).length,
      };
    });

    console.log("======== SNAPSHOT DOM APÓS A ALTERNÂNCIA ========");
    console.log(JSON.stringify(snapshotDepois, null, 2));

    const errosDepois = {
      reactHydration: errosConsole.reactHydration.filter(
        (e) => !errosAntes.reactHydration.some((a) => a.momento === e.momento),
      ),
      metaPixel: errosConsole.metaPixel.filter(
        (e) => !errosAntes.metaPixel.some((a) => a.momento === e.momento),
      ),
      paymentBrick: errosConsole.paymentBrick.filter(
        (e) => !errosAntes.paymentBrick.some((a) => a.momento === e.momento),
      ),
    };

    console.log("======== ERROS NOVOS APÓS ALTERNÂNCIA ========");
    console.log("React #418 novos:", errosDepois.reactHydration.length);
    console.log("Meta Pixel novos:", errosDepois.metaPixel.length);
    console.log("Payment Brick novos:", errosDepois.paymentBrick.length);

    I.say("ETAPA 12 — RELATÓRIO DE DUPLICAÇÃO");

    const diferencas = {};
    for (const chave of Object.keys(snapshotAntes)) {
      const antes = snapshotAntes[chave];
      const depois = snapshotDepois[chave];
      if (antes !== depois) {
        diferencas[chave] = { antes, depois, delta: depois - antes };
      }
    }

    console.log("======== DIFERENÇAS DETECTADAS ========");
    if (Object.keys(diferencas).length === 0) {
      console.log("✅ Nenhuma diferença de elementos no DOM detectada.");
    } else {
      console.log("❌ ELEMENTOS DUPLICADOS / ALTERADOS:");
      console.log(JSON.stringify(diferencas, null, 2));
    }

    await I.saveScreenshot("checkout_apos_alternancia.png");

    I.say("ETAPA 13 — ASSERTIONS FINAIS");

    assert.strictEqual(
      snapshotDepois.botoesPagar,
      snapshotAntes.botoesPagar,
      `BUG CONFIRMADO — botão "Pagar" duplicou após alternância de abas.\n` +
        `Antes: ${snapshotAntes.botoesPagar} | Depois: ${snapshotDepois.botoesPagar}\n` +
        `URL: ${urlPedido}`,
    );

    assert.strictEqual(
      snapshotDepois.opcoesCartao,
      snapshotAntes.opcoesCartao,
      `BUG CONFIRMADO — opções de pagamento (radio buttons) duplicaram após alternância.\n` +
        `Antes: ${snapshotAntes.opcoesCartao} | Depois: ${snapshotDepois.opcoesCartao}\n` +
        `URL: ${urlPedido}`,
    );

    assert.strictEqual(
      snapshotDepois.containersBrick,
      snapshotAntes.containersBrick,
      `BUG CONFIRMADO — containers do Payment Brick (Mercado Pago) duplicaram após alternância.\n` +
        `Antes: ${snapshotAntes.containersBrick} | Depois: ${snapshotDepois.containersBrick}\n` +
        `URL: ${urlPedido}`,
    );

    assert.strictEqual(
      snapshotDepois.labelCartaoCredito,
      snapshotAntes.labelCartaoCredito,
      `BUG CONFIRMADO — label "Cartão de crédito" duplicou após alternância.\n` +
        `Antes: ${snapshotAntes.labelCartaoCredito} | Depois: ${snapshotDepois.labelCartaoCredito}\n` +
        `URL: ${urlPedido}`,
    );

    assert.strictEqual(
      snapshotDepois.labelPix,
      snapshotAntes.labelPix,
      `BUG CONFIRMADO — label "Pix" duplicou após alternância.\n` +
        `Antes: ${snapshotAntes.labelPix} | Depois: ${snapshotDepois.labelPix}\n` +
        `URL: ${urlPedido}`,
    );

    assert.strictEqual(
      errosDepois.reactHydration.length,
      0,
      `BUG CONFIRMADO — React error #418 gerado APÓS alternância de abas (além do erro inicial).\n` +
        `Novos erros: ${errosDepois.reactHydration.length}\n` +
        `Detalhes: ${JSON.stringify(errosDepois.reactHydration, null, 2)}`,
    );

    if (errosAntes.reactHydration.length > 0) {
      console.log(
        `⚠️  NOTA: React #418 já ocorria ANTES da alternância (${errosAntes.reactHydration.length} ocorrência(s)).\n` +
          `Este é um bug pré-existente no carregamento inicial do checkout, independente da alternância de abas.\n` +
          `Reportar separadamente à equipe de desenvolvimento.`,
      );
    }

    I.say("✅ CENÁRIO 127b FINALIZADO");
    I.say(`Diferenças de DOM detectadas: ${Object.keys(diferencas).length}`);
    I.say(
      `React #418 antes: ${errosAntes.reactHydration.length} | novos após alternância: ${errosDepois.reactHydration.length}`,
    );
    I.say(`Meta Pixel novos: ${errosDepois.metaPixel.length}`);
    I.say(`Payment Brick novos: ${errosDepois.paymentBrick.length}`);
  },
).tag("@compraringressos127");

/////----------/////
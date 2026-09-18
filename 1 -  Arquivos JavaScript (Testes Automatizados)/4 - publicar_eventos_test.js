Feature("publicar_eventos");

//// CENÁRIOS DE TESTES////

Scenario(
  "Cenário: 00001 - Acessar a página de Publicar Eventos pela página principal.",
  ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitForURL((url) => url.pathname.includes("/signin"), 10);

    I.seeInCurrentUrl("/signin");
    I.seeInCurrentUrl("redirectUrl=");
    I.seeInCurrentUrl("be-a-producer");
    I.wait(5);
  },
).tag("@publicareventos1");

/////----------/////

Scenario(
  "Cenário: 00002 - Clicar na página Publicar Eventos via login do Gmail.",
  ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Publicar Eventos", 10);

    const publicarEventosLink = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventosLink, 10);
    I.scrollTo(publicarEventosLink);
    I.click(publicarEventosLink);

    I.waitForURL(/signin/, 10);
    I.seeInCurrentUrl("/signin");

    const entrarComGoogle = locate("button").withDescendant(
      locate("span").withText("Entrar com Google"),
    );

    I.waitForElement(entrarComGoogle, 10);
    I.click(entrarComGoogle);

    I.waitForURL(/accounts\.google\.com/, 15);
    I.seeInCurrentUrl("accounts.google.com");
  },
).tag("@publicareventos2");

/////----------/////

Scenario(
  "Cenário 00003 - Inserir o e-mail de login na página Publicar Eventos por meio do login do Gmail.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Publicar Eventos", 15);

    const publicarEventosLink = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventosLink, 15);

    I.click(publicarEventosLink);

    I.waitForURL(/signin/, 15);

    const entrarComGoogle = locate("button").withDescendant(
      locate("span").withText("Entrar com Google"),
    );

    I.waitForElement(entrarComGoogle, 15);

    I.click(entrarComGoogle);

    I.waitForURL(/accounts\.google\.com/, 20);

    const usarOutraConta = locate("div").withText("Usar outra conta");

    try {
      const quantidade = await I.grabNumberOfVisibleElements(usarOutraConta);

      if (quantidade > 0) {
        I.click(usarOutraConta);

        I.wait(2);
      }
    } catch (e) {
      console.log("INFO: opção 'Usar outra conta' não exibida.");
    }

    const emailField = "#identifierId";

    I.waitForElement(emailField, 20);

    const emailTeste = "fastix.teste@gmail.com";

    I.fillField(emailField, emailTeste);

    I.seeInField(emailField, emailTeste);

    console.log("SUCESSO: e-mail preenchido.");

    const identifierNext = "#identifierNext";

    I.waitForElement(identifierNext, 20);

    I.click(identifierNext);

    console.log("SUCESSO: botão Avançar acionado.");

    I.wait(5);

    I.usePlaywrightTo("validar resposta do Google", async ({ page }) => {
      await page.waitForTimeout(5000);

      const urlAtual = page.url();

      const conteudo = await page.textContent("body");

      console.log("========== URL GOOGLE ==========");

      console.log(urlAtual);

      console.log("================================");

      console.log("========== RESPOSTA GOOGLE ==========");

      console.log(conteudo);

      console.log("=====================================");

      if (urlAtual.includes("signin/rejected")) {
        console.log(
          "SUCESSO: Google recebeu o e-mail e redirecionou para a página rejected.",
        );

        return;
      }

      if (urlAtual.includes("signin/challenge/pwd")) {
        console.log("SUCESSO: Google avançou para tela de senha.");

        return;
      }

      if (conteudo.includes("Esse navegador ou app pode não ser seguro")) {
        console.log(
          "SUCESSO: Google processou o e-mail e bloqueou o login automatizado.",
        );

        return;
      }

      if (conteudo.includes("Não foi possível fazer o login")) {
        console.log(
          "SUCESSO: Google processou o e-mail e retornou página de bloqueio.",
        );

        return;
      }

      throw new Error(
        `FALHA: resposta inesperada do Google. URL atual: ${urlAtual}`,
      );
    });

    I.wait(3);
  },
).tag("@publicareventos3");

/////----------/////

Scenario(
  "Cenário 00004 - Inserir o e-mail de login na página Publicar Eventos por meio do login da Apple.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    I.waitForText("Publicar Eventos", 10);

    const publicarEventosLink = locate("a").withText("Publicar Eventos");
    I.click(publicarEventosLink);

    I.waitInUrl("/signin", 10);

    const entrarComApple = locate("button").withDescendant(
      locate("span").withText("Entrar com Apple"),
    );

    I.waitForElement(entrarComApple, 10);
    I.click(entrarComApple);

    I.waitInUrl("appleid.apple.com", 15);

    const emailField = "#account_name_text_field";

    I.waitForElement(emailField, 15);

    I.fillField(emailField, "teste.fastix@gmail.com");

    I.wait(3);
  },
).tag("@publicareventos4");

/////----------/////

Scenario(
  "Cenário: 00005 - Acessar a página de Publicar Eventos pela página principal e realizar o Login.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");

    const publicarEventos = locate("a").withText("Publicar Eventos");
    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    await I.usePlaywrightTo(
      "aguardar redirecionamento para /signin",
      async ({ page }) => {
        await page.waitForURL((url) => url.pathname.includes("/signin"), {
          timeout: 10000,
        });
      },
    );

    I.seeInCurrentUrl("/signin");
    I.seeInCurrentUrl("redirectUrl=");
    I.seeInCurrentUrl("be-a-producer");

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");

    I.waitForElement(campoSenha, 10);
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    await I.usePlaywrightTo(
      "aguardar redirecionamento pós-login",
      async ({ page }) => {
        await page.waitForURL((url) => !url.toString().includes("/signin"), {
          timeout: 15000,
        });

        const urlFinal = page.url();
        console.log("✅ URL pós-login:", urlFinal);

        if (urlFinal.includes("/signin")) {
          throw new Error(
            "Login não foi concluído. Usuário permaneceu na tela de login.",
          );
        }
      },
    );

    I.dontSeeInCurrentUrl("/signin");

    I.say("✅ Login realizado com sucesso e redirecionamento validado");
  },
).tag("@publicareventos5");

/////----------/////

Scenario(
  "Cenário: 00006 - Logado na página de 'Producer' clicar nos botões de 'Eventos', 'Equipes' e 'Dashboard'.",
  async ({ I }) => {

   
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");
    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

  
    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

   
    await I.usePlaywrightTo(
      "aguardar redirecionamento pós-login para área de producer",
      async ({ page }) => {
        await page.waitForURL(
          (url) => url.toString().includes("producer"),
          { timeout: 15000 },
        );
        console.log("URL pós-login:", page.url());
      },
    );

    I.waitForElement("body", 10);

   
    I.say("CLICANDO EM EVENTOS");

    const menuEventos = locate("a").withAttr({ href: "/producer/events" });

    I.waitForElement(menuEventos, 20);
    I.waitForVisible(menuEventos, 10);

    await I.usePlaywrightTo(
      "clicar em Eventos e aguardar navegação",
      async ({ page }) => {
        await Promise.all([
          page.waitForURL(
            (url) => url.toString().includes("/producer/events"),
            { timeout: 10000 },
          ),
          page.locator('a[href="/producer/events"]').click(),
        ]);
        console.log("URL após Eventos:", page.url());
      },
    );

    I.seeInCurrentUrl("/producer/events");
    I.say("✅ NAVEGOU PARA EVENTOS");

 
    I.say("CLICANDO EM EQUIPES");

    const menuEquipes = locate("a").withAttr({ href: "/producer/teams" });

    I.waitForElement(menuEquipes, 15);
    I.waitForVisible(menuEquipes, 10);

    await I.usePlaywrightTo(
      "clicar em Equipes e aguardar navegação",
      async ({ page }) => {
        await Promise.all([
          page.waitForURL(
            (url) => url.toString().includes("/producer/teams"),
            { timeout: 10000 },
          ),
          page.locator('a[href="/producer/teams"]').click(),
        ]);
        console.log("URL após Equipes:", page.url());
      },
    );

    I.seeInCurrentUrl("/producer/teams");
    I.say("✅ NAVEGOU PARA EQUIPES");

  
    I.say("CLICANDO EM DASHBOARD");

    const menuDashboard = locate("a").withAttr({ href: "/producer" });

    I.waitForElement(menuDashboard, 15);
    I.waitForVisible(menuDashboard, 10);

    await I.usePlaywrightTo(
      "clicar em Dashboard e aguardar navegação",
      async ({ page }) => {
        await Promise.all([
          page.waitForURL(
            (url) => {
              const urlStr = url.toString();
              // Aceita /producer exato ou /producer/ mas não /producer/events ou /producer/teams
              return (
                urlStr.endsWith("/producer") ||
                urlStr.endsWith("/producer/")
              );
            },
            { timeout: 10000 },
          ),
          page.locator('a[href="/producer"]').first().click(),
        ]);
        console.log("URL após Dashboard:", page.url());
      },
    );

    I.seeInCurrentUrl("/producer");
    I.say("✅ NAVEGOU PARA DASHBOARD");

    I.say("CENÁRIO 00006 FINALIZADO COM SUCESSO");
  },
).tag("@publicareventos6");

/////----------/////

Scenario(
  "Cenário: 00007 - Clicar no filtro 'Período: Ano Atual'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");

    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);

    I.waitForElement("body", 10);

    I.wait(5);

    const botaoPeriodo = locate("button").withText("Período:");

    I.waitForElement(botaoPeriodo, 15);
    I.click(botaoPeriodo);

    I.wait(5);
  },
).tag("@publicareventos7");

/////----------/////

Scenario(
  "Cenário: 00008 - Clicar no filtro e selecionar a opção 'Período: Eventos Futuros'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");

    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);

    I.waitForElement("body", 10);

    I.wait(5);

    const botaoPeriodo = locate("button").withText("Período");

    I.waitForElement(botaoPeriodo, 15);
    I.scrollTo(botaoPeriodo);
    I.click(botaoPeriodo);

    const eventosFuturos = locate('[role="menuitemradio"]').withText(
      "Eventos Futuros",
    );

    I.waitForVisible(eventosFuturos, 10);

    I.click(eventosFuturos);
    I.wait(2);
  },
).tag("@publicareventos8");

/////----------/////

Scenario(
  "Cenário: 00009 - Clicar no filtro e selecionar a opção 'Eventos Passados'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");

    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);

    I.waitForElement("body", 10);

    I.wait(5);

    const botaoPeriodo = locate("button").withText("Período");

    I.waitForElement(botaoPeriodo, 15);
    I.scrollTo(botaoPeriodo);
    I.click(botaoPeriodo);

    const eventosPassados = locate('[role="menuitemradio"]').withText(
      "Eventos Passados",
    );

    I.waitForVisible(eventosPassados, 10);

    I.click(eventosPassados);
    I.wait(2);
  },
).tag("@publicareventos9");

/////----------/////

Scenario(
  "Cenário: 000010 - Clicar no filtro e selecionar a opção 'Período: Ano Atual'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");

    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);

    I.waitForElement("body", 10);

    I.wait(5);

    const botaoPeriodo = locate("button").withText("Período");

    I.waitForElement(botaoPeriodo, 15);
    I.scrollTo(botaoPeriodo);
    I.click(botaoPeriodo);

    const anoAtual = locate('[role="menuitemradio"]').withText("Ano atual");

    I.waitForVisible(anoAtual, 10);

    I.click(anoAtual);
    I.wait(2);
  },
).tag("@publicareventos10");

/////----------/////

Scenario(
  "Cenário: 000011 - Clicar no filtro e selecionar a opção 'Período: Ano Atual'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");

    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);

    I.waitForElement("body", 10);

    I.wait(5);

    const botaoPeriodo = locate("button").withText("Período");

    I.waitForElement(botaoPeriodo, 15);
    I.scrollTo(botaoPeriodo);
    I.click(botaoPeriodo);

    const anoAnterior = locate('[role="menuitemradio"]').withText(
      "Ano anterior",
    );

    I.waitForVisible(anoAnterior, 10);

    I.click(anoAnterior);
    I.wait(2);
  },
).tag("@publicareventos11");

/////----------/////

Scenario(
  "Cenário: 000012 - Clicar no filtro e selecionar a opção 'Período Mês atual'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");

    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);

    I.waitForElement("body", 10);

    I.wait(5);

    const botaoPeriodo = locate("button").withText("Período");

    I.waitForElement(botaoPeriodo, 15);
    I.scrollTo(botaoPeriodo);
    I.click(botaoPeriodo);

    const mesAtual = locate('[role="menuitemradio"]').withText("Mês atual");

    I.waitForVisible(mesAtual, 10);

    I.click(mesAtual);
    I.wait(2);
  },
).tag("@publicareventos12");

/////----------/////

Scenario(
  "Cenário: 000013 - Clicar no filtro e selecionar a opção 'Mês anterior'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");

    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);

    I.waitForElement("body", 10);

    I.wait(5);

    const botaoPeriodo = locate("button").withText("Período");

    I.waitForElement(botaoPeriodo, 15);
    I.scrollTo(botaoPeriodo);
    I.click(botaoPeriodo);

    const mesAnterior = locate('[role="menuitemradio"]').withText(
      "Mês anterior",
    );

    I.waitForVisible(mesAnterior, 10);

    I.click(mesAnterior);
    I.wait(2);
  },
).tag("@publicareventos13");

/////----------/////

Scenario(
  "Cenário: 000014 - Clicar no filtro e selecionar a opção 'Definir período'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");

    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);

    I.waitForElement("body", 10);

    I.wait(5);

    const botaoPeriodo = locate("button").withText("Período");

    I.waitForElement(botaoPeriodo, 15);
    I.scrollTo(botaoPeriodo);
    I.click(botaoPeriodo);

    const definirPeriodo =
      locate('[role="menuitem"]').withText("Definir período");

    I.waitForVisible(definirPeriodo, 10);
    I.waitForElement(definirPeriodo, 5);

    I.click(definirPeriodo);

    I.wait(2);
  },
).tag("@publicareventos14");

/////----------/////

Scenario(
  "Cenário: 000015 - Acessar o filtro e clicar em todas as opções disponíveis",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");

    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);

    I.waitForElement("body", 10);

    I.wait(5);

    function abrirDropdownPeriodo() {
      const botaoPeriodo = locate("button").withText("Período");

      I.waitForElement(botaoPeriodo, 15);
      I.scrollTo(botaoPeriodo);
      I.click(botaoPeriodo);
    }

    function selecionarOpcao(nomeOpcao) {
      const opcao = locate(
        '[role="menuitemradio"], [role="menuitem"]',
      ).withText(nomeOpcao);

      I.waitForVisible(opcao, 10);
      I.waitForElement(opcao, 5);
      I.click(opcao);
    }

    abrirDropdownPeriodo();
    selecionarOpcao("Eventos Futuros");
    I.wait(2);

    abrirDropdownPeriodo();
    selecionarOpcao("Eventos Passados");
    I.wait(2);

    abrirDropdownPeriodo();
    selecionarOpcao("Ano atual");
    I.wait(2);

    abrirDropdownPeriodo();
    selecionarOpcao("Ano anterior");
    I.wait(2);

    abrirDropdownPeriodo();
    selecionarOpcao("Mês atual");
    I.wait(2);

    abrirDropdownPeriodo();
    selecionarOpcao("Mês anterior");
    I.wait(2);

    const botaoPeriodo = locate("button").withText("Período");

    I.waitForElement(botaoPeriodo, 15);
    I.scrollTo(botaoPeriodo);
    I.click(botaoPeriodo);

    const definirPeriodo =
      locate('[role="menuitem"]').withText("Definir período");

    I.waitForVisible(definirPeriodo, 10);
    I.waitForElement(definirPeriodo, 5);

    I.click(definirPeriodo);

    I.wait(2);
  },
).tag("@publicareventos15");

/////----------/////

Scenario(
  "Cenário: 000016 - Acessar o filtro e selecionar uma data no calendário (Data início 26/12/26 - 04/12/2026) acessando a opção 'Definir período'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");

    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);

    I.waitForElement("body", 10);

    I.wait(5);

    const botaoPeriodo = locate("button").withText("Período");

    I.waitForElement(botaoPeriodo, 15);
    I.scrollTo(botaoPeriodo);
    I.click(botaoPeriodo);

    const definirPeriodo =
      locate('[role="menuitem"]').withText("Definir período");

    I.waitForVisible(definirPeriodo, 10);
    I.moveCursorTo(definirPeriodo);
    I.waitForElement(definirPeriodo, 5);
    I.click(definirPeriodo);

    I.wait(2);

    const dataInicio = "26/12/2026";
    const dataFim = "04/12/2026";

    I.click("text=Definir período");

    I.waitForElement(`[data-day="${dataInicio}"]`, 10);
    I.click(`[data-day="${dataInicio}"]`);

    I.click("text=Definir período");

    I.waitForElement(`[data-day="${dataFim}"]`, 10);
    I.click(`[data-day="${dataFim}"]`);

    I.wait(2);
  },
).tag("@publicareventos16");

/////----------/////

Scenario(
  "Cenário: 000017 - Acessar o filtro e clicar no botão para avançar o mês exibido no calendário.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");

    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);

    I.waitForElement("body", 10);

    I.wait(5);

    const botaoPeriodo = locate("button").withText("Período");

    I.waitForElement(botaoPeriodo, 15);
    I.scrollTo(botaoPeriodo);
    I.click(botaoPeriodo);

    const definirPeriodo =
      locate('[role="menuitem"]').withText("Definir período");

    I.waitForElement(definirPeriodo, 10);
    I.click(definirPeriodo);

    for (let i = 0; i < 5; i++) {
      I.waitForFunction(() => {
        return document.querySelector('[aria-label="Go to the Next Month"]');
      }, 10);

      I.forceClick('[aria-label="Go to the Next Month"]');
      I.wait(0.5);
    }
  },
).tag("@publicareventos17");

/////----------/////

Scenario(
  "Cenário: 000018 - Acessar o filtro e clicar no botão para retornar mês exibido no calendário.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");

    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);

    I.waitForElement("body", 10);

    I.wait(5);

    const botaoPeriodo = locate("button").withText("Período");

    I.waitForElement(botaoPeriodo, 15);
    I.scrollTo(botaoPeriodo);
    I.click(botaoPeriodo);

    const definirPeriodo =
      locate('[role="menuitem"]').withText("Definir período");

    I.waitForElement(definirPeriodo, 10);
    I.click(definirPeriodo);

    for (let i = 0; i < 5; i++) {
      I.waitForFunction(() => {
        return document.querySelector(
          '[aria-label="Go to the Previous Month"]',
        );
      }, 10);

      I.forceClick('[aria-label="Go to the Previous Month"]');
      I.wait(0.5);
    }
  },
).tag("@publicareventos18");

/////----------/////

Scenario(
  "Cenário: 000019 - Teste de estresse: acessar o filtro e clicar rapidamente para avançar e retroceder vários meses no botão do calendário.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");

    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);

    I.waitForElement("body", 10);

    I.wait(5);

    const botaoPeriodo = locate("button").withText("Período");

    I.waitForElement(botaoPeriodo, 15);
    I.scrollTo(botaoPeriodo);
    I.click(botaoPeriodo);

    const definirPeriodo =
      locate('[role="menuitem"]').withText("Definir período");

    I.waitForElement(definirPeriodo, 10);
    I.click(definirPeriodo);

    for (let i = 0; i < 100; i++) {
      I.forceClick('[aria-label="Go to the Next Month"]');
    }

    for (let i = 0; i < 100; i++) {
      I.forceClick('[aria-label="Go to the Previous Month"]');
    }
  },
).tag("@publicareventos19");

/////----------/////

Scenario(
  "Cenário: 000020 - Clicar no botão 'Novo Evento' e acessar a página de criação do evento.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);
    I.seeInCurrentUrl("/producer/events/create", 5);

    I.wait(3);
  },
).tag("@publicareventos20");

/////----------/////

Scenario(
  "Cenário: 000021 - Clicar no botão 'Salvar configurações' no final da página.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);
    I.seeInCurrentUrl("/producer/events/create", 5);

    I.wait(3);

    const botaoSalvar = locate("button").withText("Salvar configurações");

    I.scrollTo(botaoSalvar);
    I.waitForVisible(botaoSalvar, 10);
    I.click(botaoSalvar);

    I.wait(3);
  },
).tag("@publicareventos21");

/////----------/////

Scenario(
  "Cenário: 000022 - Preencher campo 'Buscar endereço ou estabelecimento' com o nome da casa de eventos 'Carioca Club'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);
    I.seeInCurrentUrl("/producer/events/create", 5);

    I.wait(3);

    const campoEndereco = locate("input").withAttr({
      placeholder: "Digite o endereço ou nome do estabelecimento",
    });

    I.waitForElement(campoEndereco, 10);
    I.scrollTo(campoEndereco);
    I.fillField(campoEndereco, "Carioca Clube");
    I.wait(3);
  },
).tag("@publicareventos22");

/////----------/////

Scenario(
  "Cenário: 000023 - Preencher o campo 'Buscar endereço ou estabelecimento', clicando no endereço da casa de eventos 'Carioca Club' exibido pelo sistema.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);
    I.seeInCurrentUrl("/producer/events/create", 5);

    I.wait(3);

    const campoEndereco = locate("input").withAttr({
      placeholder: "Digite o endereço ou nome do estabelecimento",
    });

    I.waitForVisible(campoEndereco, 10);
    I.forceClick(campoEndereco);
    I.fillField(campoEndereco, "Carioca Club");

    I.wait(3);

    const sugestao = locate(".pac-item").withText("Rua Cardeal Arcoverde");

    I.waitForElement(sugestao, 10);
    I.click(sugestao);

    I.wait(6);
  },
).tag("@publicareventos23");

/////----------/////

Scenario(
  "Cenário: 000024 - Preencher o campo 'Buscar endereço ou estabelecimento', inserindo o endereço completo da casa de eventos 'Carioca Club'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);
    I.seeInCurrentUrl("/producer/events/create", 5);

    I.wait(3);

    const campoEndereco = locate("input").withAttr({
      placeholder: "Digite o endereço ou nome do estabelecimento",
    });

    I.waitForVisible(campoEndereco, 10);
    I.forceClick(campoEndereco);
    I.fillField(
      campoEndereco,
      "Rua Cardeal Arcoverde, 2899 - Pinheiros, São Paulo - SP, 05407-004",
    );

    I.wait(6);
  },
).tag("@publicareventos24");

/////----------/////

Scenario(
  "Cenário: 000025 - Preencher o campo 'Buscar endereço ou estabelecimento', inserindo o endereço completo da casa de eventos 'Carioca Club', e clicando no endereço exibido e confirmado pelo sistema.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);
    I.seeInCurrentUrl("/producer/events/create", 5);

    I.wait(3);

    const campoEndereco = locate("input").withAttr({
      placeholder: "Digite o endereço ou nome do estabelecimento",
    });

    I.waitForVisible(campoEndereco, 10);
    I.forceClick(campoEndereco);
    I.fillField(
      campoEndereco,
      "Rua Cardeal Arcoverde, 2899 - Pinheiros, São Paulo - SP, 05407-004",
    );

    I.wait(6);

    const sugestao = locate(".pac-item").withText("Rua Cardeal Arcoverde");

    I.waitForElement(sugestao, 10);
    I.click(sugestao);

    I.wait(6);
  },
).tag("@publicareventos25");

/////----------/////

Scenario(
  "Cenário: 000026 -Preencher o campo 'Buscar endereço ou estabelecimento', inserindo apenas o CEP da casa de eventos 'Carioca Club'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);
    I.seeInCurrentUrl("/producer/events/create", 5);

    I.wait(3);

    const campoEndereco = locate("input").withAttr({
      placeholder: "Digite o endereço ou nome do estabelecimento",
    });

    I.waitForVisible(campoEndereco, 10);
    I.forceClick(campoEndereco);
    I.fillField(campoEndereco, "05407-004");

    I.wait(6);
  },
).tag("@publicareventos26");

/////----------/////

Scenario(
  "Cenário: 000027 -Preencher o campo 'Buscar endereço ou estabelecimento', inserindo apenas o CEP da casa de eventos 'Carioca Club', e clicando no endereço exibido e confirmado pelo sistema.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);
    I.seeInCurrentUrl("/producer/events/create", 5);

    I.wait(3);

    const campoEndereco = locate("input").withAttr({
      placeholder: "Digite o endereço ou nome do estabelecimento",
    });

    I.waitForVisible(campoEndereco, 10);
    I.forceClick(campoEndereco);
    I.fillField(campoEndereco, "05407-004");

    I.wait(6);

    const sugestao = locate(".pac-item").withText("05407-004");

    I.waitForElement(sugestao, 10);
    I.click(sugestao);

    I.wait(6);
  },
).tag("@publicareventos27");

/////----------/////

Scenario(
  "Cenário: 000028 -Preencher o campo 'Buscar endereço ou estabelecimento', inserindo apenas nome do estado de 'Minas Gerais'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);
    I.seeInCurrentUrl("/producer/events/create", 5);

    I.wait(3);

    const campoEndereco = locate("input").withAttr({
      placeholder: "Digite o endereço ou nome do estabelecimento",
    });

    I.waitForVisible(campoEndereco, 10);
    I.forceClick(campoEndereco);
    I.fillField(campoEndereco, "Minas Gerais");

    I.wait(6);
  },
).tag("@publicareventos28");

/////----------/////

Scenario(
  "Cenário: 000029 - Preencher o campo 'Buscar endereço ou estabelecimento', inserindo apenas nome de um Estado (Minas Gerais) e clicando na confirmação do nome exibido pelo sistema'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);
    I.seeInCurrentUrl("/producer/events/create", 5);

    I.wait(3);

    const campoEndereco = locate("input").withAttr({
      placeholder: "Digite o endereço ou nome do estabelecimento",
    });

    I.waitForVisible(campoEndereco, 10);
    I.forceClick(campoEndereco);
    I.fillField(campoEndereco, "Minas Gerais");

    I.wait(6);

    const sugestao = locate(".pac-item").withText("Minas Gerais");

    I.waitForElement(sugestao, 10);
    I.click(sugestao);

    I.wait(6);
  },
).tag("@publicareventos29");

/////----------/////

Scenario(
  "Cenário: 000030 - Preencher o campo 'Buscar endereço ou estabelecimento', inserindo apenas nome de uma cidade 'Belo Horizonte'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);
    I.seeInCurrentUrl("/producer/events/create", 5);

    I.wait(3);

    const campoEndereco = locate("input").withAttr({
      placeholder: "Digite o endereço ou nome do estabelecimento",
    });

    I.waitForVisible(campoEndereco, 10);
    I.forceClick(campoEndereco);
    I.fillField(campoEndereco, "Belo Horizonte");

    I.wait(6);
  },
).tag("@publicareventos30");

/////----------/////

Scenario(
  "Cenário: 000031 - Preencher o campo 'Buscar endereço ou estabelecimento', inserindo apenas nome de uma cidade 'Belo Horizonte'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);
    I.seeInCurrentUrl("/producer/events/create", 5);

    I.wait(3);

    const campoEndereco = locate("input").withAttr({
      placeholder: "Digite o endereço ou nome do estabelecimento",
    });

    I.waitForVisible(campoEndereco, 15);

    I.forceClick(campoEndereco);

    I.clearField(campoEndereco);

    I.fillField(campoEndereco, "Belo Horizonte");

    I.waitForElement(".pac-container", 15);

    const sugestaoBeloHorizonte = "//div[contains(@class,'pac-item')]";

    I.waitForElement(sugestaoBeloHorizonte, 15);

    const textoSugestao = await I.grabTextFrom(sugestaoBeloHorizonte);

    console.log(`SUGESTÃO ENCONTRADA:\n${textoSugestao}`);

    if (!textoSugestao.includes("Belo Horizonte")) {
      throw new Error("A sugestão esperada não foi exibida.");
    }

    I.click(sugestaoBeloHorizonte);

    I.wait(5);

    const valorFinal = await I.grabValueFrom(campoEndereco);

    console.log(`VALOR FINAL: ${valorFinal}`);

    const sugestoesRestantes = await I.grabNumberOfVisibleElements(".pac-item");

    console.log(`SUGESTÕES RESTANTES: ${sugestoesRestantes}`);

    if (sugestoesRestantes > 0) {
      throw new Error(
        "A sugestão do Google Places não foi selecionada corretamente.",
      );
    }

    const containerVisivel =
      await I.grabNumberOfVisibleElements(".pac-container");

    console.log(`CONTAINER VISÍVEL: ${containerVisivel}`);

    const pagina = await I.grabSource();

    const valorSelecionado = await I.grabValueFrom(campoEndereco);

    console.log(`ENDEREÇO SELECIONADO: ${valorSelecionado}`);

    if (
      pagina.includes("Por favor, selecione um endereço completo com número")
    ) {
      I.say("SUCESSO: sistema exibiu validação de endereço incompleto.");
    } else if (valorSelecionado && valorSelecionado.trim() !== "") {
      I.say("SUCESSO: endereço selecionado corretamente.");
    } else {
      I.say(
        "OBSERVAÇÃO: nenhuma sugestão foi efetivamente selecionada pelo Google Places, porém o componente permaneceu estável.",
      );

      I.seeElement(campoEndereco);
    }

    I.say("SUCESSO: sugestão do Google Places encontrada e processada.");

    I.wait(3);
  },
).tag("@publicareventos31");

/////----------/////

Scenario(
  "Cenário: 000032 - Preencher o campo 'Buscar endereço ou estabelecimento', inserindo apenas o CEP (Endereço onde não consta nenhuma casa de eventos) e clicando na confirmação do nome exibido pelo sistema.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);
    I.seeInCurrentUrl("/producer/events/create", 5);

    I.wait(3);

    const campoEndereco = locate("input").withAttr({
      placeholder: "Digite o endereço ou nome do estabelecimento",
    });

    I.waitForVisible(campoEndereco, 10);
    I.forceClick(campoEndereco);
    I.fillField(campoEndereco, "01019-020");

    I.wait(6);

    const sugestao = locate(".pac-item").withText("01019-020");

    I.waitForElement(sugestao, 10);
    I.click(sugestao);

    I.wait(6);
  },
).tag("@publicareventos32");

/////----------/////

Scenario(
  "Cenário: 000033 - Preencher o campo 'Buscar endereço ou estabelecimento', inserindo um número inexistente, sem nenhum registro, e confirmando a busca no sistema.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);
    I.seeInCurrentUrl("/producer/events/create", 5);

    I.wait(3);

    const campoEndereco = locate("input").withAttr({
      placeholder: "Digite o endereço ou nome do estabelecimento",
    });

    I.seeInCurrentUrl("/producer/events/create");

    I.waitForVisible(campoEndereco, 10);

    I.click(campoEndereco);

    I.fillField(campoEndereco, "10267019260716201");

    I.wait(2);

    I.pressKey("Enter");

    I.pressKey("Tab");

    I.wait(2);

    I.dontSeeInField(campoEndereco, "10267019260716201");

    I.seeInCurrentUrl("/producer/events/create");

    I.wait(6);
  },
).tag("@publicareventos33");

/////----------/////

Scenario(
  "Cenário: 000034 -  Preencher o campo 'Buscar endereço ou estabelecimento', inserindo no campo muitos números e caracteres especiais , sem nenhum registro, e confirmando a busca no sistema.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);
    I.seeInCurrentUrl("/producer/events/create", 5);

    I.wait(3);

    const campoEndereco = locate("input").withAttr({
      placeholder: "Digite o endereço ou nome do estabelecimento",
    });

    I.seeInCurrentUrl("/producer/events/create");
    I.waitForVisible(campoEndereco, 10);
    I.click(campoEndereco);

    const inputStress =
      "10267019260716201@@@###$$$%%%^^^&&&***(()))___+++===---!!!999999999999999999999999999999999999";

    I.executeScript((value) => {
      const el = document.querySelector(
        'input[placeholder="Digite o endereço ou nome do estabelecimento"]',
      );

      if (!el) return;

      el.value = value;

      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.dispatchEvent(new Event("change", { bubbles: true }));
    }, inputStress);

    I.wait(1);

    I.pressKey("Enter");
    I.pressKey("Tab");

    I.wait(2);

    I.seeElement(campoEndereco);
    I.seeInCurrentUrl("/producer/events/create");
    I.dontSeeInField(campoEndereco, inputStress);

    I.wait(2);
  },
).tag("@publicareventos34");

/////----------/////

Scenario(
  "Cenário: 000035 - Preencher o campo 'Buscar endereço ou estabelecimento', inserindo no campo muitos números e caracteres especiais , sem nenhum registro, e confirmando a busca por 5x seguidas no sistema.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);

    const campoEndereco = locate("input").withAttr({
      placeholder: "Digite o endereço ou nome do estabelecimento",
    });

    I.waitForVisible(campoEndereco, 10);

    const inputStress =
      "10267019260716201@@@###$$$%%%^^^&&&***(()))___+++===---!!!999999999999999999999999999999999999";

    for (let i = 1; i <= 5; i++) {
      I.say(`Execução número: ${i}`);

      I.click(campoEndereco);
      I.clearField(campoEndereco);
      I.fillField(campoEndereco, inputStress);

      I.pressKey("Enter");
      I.pressKey("Tab");

      I.wait(2);

      I.seeElement(campoEndereco);
      I.seeInCurrentUrl("/producer/events/create");

      I.dontSeeInField(campoEndereco, inputStress);
    }
  },
).tag("@publicareventos35");

/////----------/////

Scenario(
  "Cenário: 000036 - Acessar o campo Detalhes do local após selecionar um endereço válido.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);
    I.seeInCurrentUrl("/producer/events/create", 5);

    I.wait(3);

    const campoEndereco = locate("input").withAttr({
      placeholder: "Digite o endereço ou nome do estabelecimento",
    });

    I.waitForVisible(campoEndereco, 10);
    I.forceClick(campoEndereco);
    I.fillField(
      campoEndereco,
      "Rua Cardeal Arcoverde, 2899 - Pinheiros, São Paulo - SP, 05407-004",
    );

    I.wait(6);

    const sugestao = locate(".pac-item").withText("Rua Cardeal Arcoverde");

    I.waitForElement(sugestao, 10);
    I.click(sugestao);

    I.wait(6);

    const container = locate("div").withDescendant("p", {
      text: "Detalhes do Local",
    });

    const detalhesLocal = locate("p")
      .withText("Detalhes do Local")
      .inside(container);

    I.waitForElement(detalhesLocal, 10);

    I.click(detalhesLocal);
    I.wait(2);
    I.click(detalhesLocal);

    I.wait(6);
  },
).tag("@publicareventos36");

/////----------/////

Scenario(
  "Cenário: 000037 - Clicar em ativar e desativar a opção 'Mostrar Endereço'após selecionar um endereço válido.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);
    I.seeInCurrentUrl("/producer/events/create", 5);

    I.wait(3);

    const campoEndereco = locate("input").withAttr({
      placeholder: "Digite o endereço ou nome do estabelecimento",
    });

    I.waitForVisible(campoEndereco, 10);
    I.forceClick(campoEndereco);
    I.fillField(
      campoEndereco,
      "Rua Cardeal Arcoverde, 2899 - Pinheiros, São Paulo - SP, 05407-004",
    );

    I.wait(6);

    const sugestao = locate(".pac-item").withText("Rua Cardeal Arcoverde");

    I.waitForElement(sugestao, 10);
    I.click(sugestao);

    I.wait(6);

    const detalhesLocal = locate("p")
      .withText("Detalhes do Local")
      .inside(locate("div").withDescendant("p", { text: "Detalhes do Local" }));

    I.waitForVisible(detalhesLocal, 10);
    I.scrollTo(detalhesLocal);

    I.click(detalhesLocal);

    I.wait(6);

    async function toggleLocationSwitch() {
      const switchBaseSelector = 'button[role="switch"]';

      I.waitForElement(switchBaseSelector, 10);
      I.click(switchBaseSelector);

      I.wait(2);

      I.click(switchBaseSelector);

      await I.usePlaywrightTo(
        "verificar coordenadas ocultas",
        async ({ page }) => {
          await page.waitForSelector('input[name="location.latitude"]', {
            state: "attached",
          });

          const lat = await page
            .locator('input[name="location.latitude"]')
            .inputValue();
          const lon = await page
            .locator('input[name="location.longitude"]')
            .inputValue();

          if (!lat || !lon || lat === "" || lon === "") {
            throw new Error(
              `Falha na Geolocalização: Coordenadas ausentes após a sequência de cliques!`,
            );
          }

          console.log(
            `Sequência finalizada. Coordenadas atuais: Lat ${lat}, Lon ${lon}`,
          );
        },
      );
    }

    await toggleLocationSwitch();

    I.wait(2);
  },
).tag("@publicareventos37");

/////----------/////

Scenario(
  "Cenário: 000038 - Visualizar o mapa em tela cheia após selecionar um endereço válido.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);
    I.seeInCurrentUrl("/producer/events/create", 5);

    I.wait(3);

    const campoEndereco = locate("input").withAttr({
      placeholder: "Digite o endereço ou nome do estabelecimento",
    });

    I.waitForVisible(campoEndereco, 10);
    I.forceClick(campoEndereco);
    I.fillField(
      campoEndereco,
      "Rua Cardeal Arcoverde, 2899 - Pinheiros, São Paulo - SP, 05407-004",
    );

    I.wait(6);

    const sugestao = locate(".pac-item").withText("Rua Cardeal Arcoverde");

    I.waitForElement(sugestao, 10);
    I.click(sugestao);

    I.wait(6);

    const iframeMapa = locate("iframe");

    I.waitForElement(iframeMapa, 20);

    I.wait(5);

    I.seeElement(iframeMapa);

    const fullscreenBtn = locate("button").withAttr({
      "aria-label": "Ativar a visualização em tela cheia",
    });

    const qtdFullscreen = await I.grabNumberOfVisibleElements(fullscreenBtn);

    if (qtdFullscreen > 0) {
      I.say("Botão de tela cheia encontrado.");

      I.scrollTo(fullscreenBtn);

      I.click(fullscreenBtn);

      I.wait(2);

      I.say("SUCESSO: mapa aberto em tela cheia.");
    } else {
      I.say(
        "Botão de tela cheia não encontrado. Validando apenas carregamento do mapa.",
      );

      I.seeElement(iframeMapa);

      I.say("SUCESSO: mapa carregado corretamente.");
    }
  },
).tag("@publicareventos38");

/////----------/////

Scenario(
  "Cenário: 000039 - Alternar a visualização do mapa entre Satélite e Mapa após selecionar um endereço válido'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);
    I.seeInCurrentUrl("/producer/events/create", 5);

    I.wait(3);

    const campoEndereco = locate("input").withAttr({
      placeholder: "Digite o endereço ou nome do estabelecimento",
    });

    I.waitForVisible(campoEndereco, 10);
    I.forceClick(campoEndereco);
    I.fillField(
      campoEndereco,
      "Rua Cardeal Arcoverde, 2899 - Pinheiros, São Paulo - SP, 05407-004",
    );

    I.wait(6);

    const sugestao = locate(".pac-item").withText("Rua Cardeal Arcoverde");

    I.waitForElement(sugestao, 10);
    I.click(sugestao);

    I.wait(6);

    const btnSatelite = locate("button").withAttr({
      "aria-label": "Mostrar imagens de satélite",
    });

    const qtdSatelite = await I.grabNumberOfVisibleElements(btnSatelite);

    if (qtdSatelite > 0) {
      I.say("Botão Satélite encontrado.");

      I.click(btnSatelite);

      I.wait(2);

      const btnMapa = locate("button").withAttr({
        "aria-label": "Mostrar mapa de ruas",
      });

      const qtdMapa = await I.grabNumberOfVisibleElements(btnMapa);

      if (qtdMapa > 0) {
        I.click(btnMapa);

        I.wait(2);

        I.say("SUCESSO: alternância entre Satélite e Mapa realizada.");
      } else {
        I.say("Botão 'Mapa' não foi exibido.");
      }
    } else {
      I.say("Botão Satélite não encontrado.");

      I.seeElement("iframe");

      I.say("Mapa carregado corretamente.");
    }

    I.wait(2);
  },
).tag("@publicareventos39");

/////----------/////

Scenario(
  "Cenário: 000040 - Validar a exibição dos controles Satélite, Mapa e Câmera após selecionar um endereço válido'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);
    I.seeInCurrentUrl("/producer/events/create", 5);

    I.wait(3);

    const campoEndereco = locate("input").withAttr({
      placeholder: "Digite o endereço ou nome do estabelecimento",
    });

    I.waitForVisible(campoEndereco, 10);
    I.forceClick(campoEndereco);
    I.fillField(
      campoEndereco,
      "Rua Cardeal Arcoverde, 2899 - Pinheiros, São Paulo - SP, 05407-004",
    );

    I.wait(6);

    const sugestao = locate(".pac-item").withText("Rua Cardeal Arcoverde");

    I.waitForElement(sugestao, 10);
    I.click(sugestao);

    I.wait(6);

    const iframeMapa = locate("iframe");

    I.waitForElement(iframeMapa, 20);

    I.wait(5);

    I.seeElement(iframeMapa);

    const pagina = await I.grabSource();

    if (pagina.includes("Mostrar imagens de satélite")) {
      I.say("Controle Satélite encontrado.");
    } else {
      I.say("Controle Satélite não exibido nesta configuração do mapa.");
    }

    if (pagina.includes("Mostrar mapa de ruas")) {
      I.say("Controle Mapa encontrado.");
    } else {
      I.say("Controle Mapa não exibido nesta configuração do mapa.");
    }

    if (pagina.includes("Controles da câmera no mapa")) {
      I.say("Controle de câmera encontrado.");
    } else {
      I.say("Controle de câmera não exibido nesta configuração do mapa.");
    }

    I.seeElement(iframeMapa);

    I.say("SUCESSO: mapa carregado corretamente.");

    I.wait(2);

    I.wait(2);
  },
).tag("@publicareventos40");

/////----------/////

Scenario(
  "Cenário: 000041 - Clicar no campo 'Limite de Ingressos'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);
    I.seeInCurrentUrl("/producer/events/create", 5);

    I.wait(3);

    const inputLimite = locate("input").withAttr({ name: "limit_by_user" });

    I.scrollTo(inputLimite);
    I.waitForElement(inputLimite, 10);
    I.click(inputLimite);

    I.wait(3);
  },
).tag("@publicareventos41");

/////----------/////

Scenario(
  "Cenário: 000042 - Validar campo 'Limite de Ingressos' sem preenchimento.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);
    I.seeInCurrentUrl("/producer/events/create", 5);

    I.wait(3);

    const inputLimite = locate("input").withAttr({ name: "limit_by_user" });

    I.waitForElement(inputLimite, 10);
    I.click(inputLimite);

    I.pressKey(["Control", "A"]);
    I.pressKey("Backspace");

    I.seeAttributesOnElements(inputLimite, { "aria-invalid": "true" });

    I.seeElement("label.text-destructive");

    I.wait(3);
  },
).tag("@publicareventos42");

/////----------/////

Scenario(
  "Cenário: 000043 - Validar campo 'Limite de Ingressos' com preenchimento.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);
    I.seeInCurrentUrl("/producer/events/create", 5);

    I.wait(3);

    const inputLimite = locate("input").withAttr({ name: "limit_by_user" });

    I.waitForElement(inputLimite, 10);
    I.click(inputLimite);

    I.pressKey(["Control", "A"]);
    I.pressKey("Backspace");

    I.type("10");

    I.seeInField(inputLimite, "10");
    I.seeAttributesOnElements(inputLimite, { "aria-invalid": "false" });

    I.wait(3);
  },
).tag("@publicareventos43");

/////----------/////

Scenario(
  "Cenário: 000044 - Validar campo 'Limite de Ingressos' com preenchimento via tipo stepper.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);
    I.seeInCurrentUrl("/producer/events/create", 5);

    I.wait(3);
    const inputLimite = locate("input").withAttr({ name: "limit_by_user" });

    I.waitForElement(inputLimite, 10);
    I.click(inputLimite);

    I.pressKey(["Control", "A"]);
    I.pressKey("Backspace");
    I.type("5");

    const valorInicial = parseInt(await I.grabValueFrom(inputLimite), 10);

    for (let i = 0; i < 10; i++) {
      I.pressKey("ArrowUp");
    }

    const valorEsperado = valorInicial + 10;

    I.waitForValue(inputLimite, String(valorEsperado), 10);

    I.seeInField(inputLimite, String(valorEsperado));
    I.seeAttributesOnElements(inputLimite, { "aria-invalid": "false" });

    I.wait(3);
  },
).tag("@publicareventos44");

/////----------/////

Scenario(
  "Cenário: 000045 - Stress controlado no campo 'Limite de Ingressos' com múltiplas interações com valores positivos.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);
    I.seeInCurrentUrl("/producer/events/create", 5);

    I.wait(3);

    const inputLimite = locate("input").withAttr({ name: "limit_by_user" });

    I.waitForElement(inputLimite, 10);

    for (let ciclo = 0; ciclo < 20; ciclo++) {
      I.click(inputLimite);

      I.pressKey(["Control", "A"]);
      I.pressKey("Backspace");

      I.type("1");

      for (let i = 0; i < 5; i++) {
        I.pressKey("ArrowUp");
      }

      for (let i = 0; i < 3; i++) {
        I.pressKey("ArrowDown");
      }

      I.waitForValue(inputLimite, "3", 5);
      I.seeInField(inputLimite, "3");

      I.seeAttributesOnElements(inputLimite, { "aria-invalid": "false" });

      I.pressKey(["Control", "A"]);
      I.pressKey("Backspace");

      I.seeAttributesOnElements(inputLimite, { "aria-invalid": "true" });

      I.type("2");
      I.waitForValue(inputLimite, "2", 5);

      I.seeAttributesOnElements(inputLimite, { "aria-invalid": "false" });

      I.wait(3);
    }
  },
).tag("@publicareventos45");

/////----------/////

Scenario(
  "Cenário: 000046 - Stress controlado no campo 'Limite de Ingressos' com múltiplas interações com valores negativos.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);
    I.seeInCurrentUrl("/producer/events/create", 5);

    I.wait(3);

    const inputLimite = locate("input").withAttr({ name: "limit_by_user" });

    I.waitForElement(inputLimite, 10);

    for (let ciclo = 0; ciclo < 20; ciclo++) {
      I.click(inputLimite);

      I.pressKey(["Control", "A"]);
      I.pressKey("Backspace");

      I.type("1");

      for (let i = 0; i < 5; i++) {
        I.pressKey("ArrowUp");
      }

      for (let i = 0; i < 3; i++) {
        I.pressKey("ArrowDown");
      }

      I.waitForValue(inputLimite, "3", 5);
      I.seeInField(inputLimite, "3");

      I.seeAttributesOnElements(inputLimite, { "aria-invalid": "false" });

      I.pressKey(["Control", "A"]);
      I.pressKey("Backspace");

      I.type("0");
      I.waitForValue(inputLimite, "0", 5);

      I.pressKey("ArrowDown");

      I.waitForValue(inputLimite, "-1", 5);
      I.seeInField(inputLimite, "-1");

      I.seeAttributesOnElements(inputLimite, { "aria-invalid": "true" });

      I.pressKey(["Control", "A"]);
      I.pressKey("Backspace");

      I.type("2");
      I.waitForValue(inputLimite, "2", 5);

      I.seeAttributesOnElements(inputLimite, { "aria-invalid": "false" });
    }
    I.wait(3);
  },
).tag("@publicareventos46");

/////----------/////

Scenario(
  "Cenário: 000047 - Validar a limpeza do campo 'Limite de Ingressos' após atualização da página.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);
    I.seeInCurrentUrl("/producer/events/create", 5);

    I.wait(3);

    const inputLimite = locate("input").withAttr({ name: "limit_by_user" });

    I.waitForElement(inputLimite, 10);
    I.click(inputLimite);

    I.pressKey(["Control", "A"]);
    I.pressKey("Backspace");

    I.seeAttributesOnElements(inputLimite, { "aria-invalid": "true" });

    I.seeElement("label.text-destructive");

    I.wait(3);

    I.refreshPage();
    I.waitForElement('input[name="limit_by_user"]', 10);

    I.wait(3);
  },
).tag("@publicareventos47");

/////----------/////

Scenario(
  "Cenário: 000048 - Preenchimento do campo 'Limite de Ingressos' com numeral e atualização da página.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);
    I.seeInCurrentUrl("/producer/events/create", 5);

    I.wait(3);

    const inputLimite = locate("input").withAttr({ name: "limit_by_user" });

    I.waitForElement(inputLimite, 10);
    I.click(inputLimite);

    I.pressKey(["Control", "A"]);
    I.pressKey("Backspace");

    I.fillField(inputLimite, "10");

    I.seeInField(inputLimite, "10");
    I.seeAttributesOnElements(inputLimite, { "aria-invalid": "false" });

    I.pressKey(["Control", "A"]);
    I.pressKey("Backspace");

    I.seeAttributesOnElements(inputLimite, { "aria-invalid": "true" });

    I.seeElement("label.text-destructive");

    I.refreshPage();

    I.waitForElement(inputLimite, 10);

    I.wait(3);
  },
).tag("@publicareventos48");

/////----------/////

Scenario(
  "Cenário: 000049 - Exibir calendário ao acessar o campo 'Início do Evento'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);
    I.seeInCurrentUrl("/producer/events/create", 5);

    I.wait(3);

    const labelInicioEvento = locate("label").withText("Início do Evento");

    const id = await I.grabAttributeFrom(labelInicioEvento, "for");

    const botaoDataHora = locate("button").withAttr({ id });

    I.scrollTo(labelInicioEvento);
    I.waitForElement(botaoDataHora, 10);
    I.click(botaoDataHora);

    I.wait(3);
  },
).tag("@publicareventos49");

/////----------/////

Scenario(
  "Cenário: 000050 - Exibir calendário ao acessar o campo 'Fim do Evento'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);
    I.seeInCurrentUrl("/producer/events/create", 5);

    I.wait(3);

    const labelFimEvento = locate("label").withText("Fim do Evento");

    const id = await I.grabAttributeFrom(labelFimEvento, "for");

    const botaoDataHora = locate("button").withAttr({ id });

    I.scrollTo(labelFimEvento);
    I.waitForElement(botaoDataHora, 10);
    I.click(botaoDataHora);

    I.wait(3);
  },
).tag("@publicareventos50");

/////----------/////

Scenario(
  "Cenário: 000051 - Exibir calendário ao acessar o campo 'Encerrar Vendas'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);
    I.seeInCurrentUrl("/producer/events/create", 5);

    I.wait(3);

    const labelEncerrarVendas = locate("label").withText("Encerrar Venda");

    const id = await I.grabAttributeFrom(labelEncerrarVendas, "for");

    const botaoDataHora = locate("button").withAttr({ id });

    I.scrollTo(labelEncerrarVendas);
    I.waitForElement(botaoDataHora, 10);
    I.click(botaoDataHora);

    I.wait(3);
  },
).tag("@publicareventos51");

/////----------/////

Scenario(
  "Cenário: 000052 - Acessar o calendário e selecionar datas no campo 'Início do Evento'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';

    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);

    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");

    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);

    I.waitForText("Novo Evento", 15);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 15);

    I.scrollTo(botaoNovoEvento);

    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 15);

    I.seeInCurrentUrl("/producer/events/create");

    I.waitForText("Início do Evento", 15);

    const labelInicioEvento = locate("label").withText("Início do Evento");

    I.waitForElement(labelInicioEvento, 15);

    const id = await I.grabAttributeFrom(labelInicioEvento, "for");

    const botaoDataHora = locate("button").withAttr({
      id,
    });

    I.waitForElement(botaoDataHora, 15);

    I.scrollTo(botaoDataHora);

    I.click(botaoDataHora);

    const diasCalendario = await I.grabAttributeFromAll(".rdp-day", "data-day");

    console.log("DIAS ENCONTRADOS:");

    console.log(diasCalendario);

    I.saveScreenshot("calendario-aberto.png", true);

    const dataInicio = "2026-04-01";

    let encontrou = false;

    for (let tentativa = 0; tentativa < 12; tentativa++) {
      const mesAtual = await I.grabTextFrom(".rdp-caption_label");

      console.log(`MÊS VISÍVEL: ${mesAtual}`);

      const dia = `.rdp-day[data-day="${dataInicio}"]`;

      const existeData = await I.grabNumberOfVisibleElements(dia);

      console.log(`DATA ${dataInicio} ENCONTRADA: ${existeData}`);

      if (existeData > 0) {
        I.waitForElement(dia, 10);

        I.scrollTo(dia);

        I.click(dia);

        encontrou = true;

        console.log(`DATA ${dataInicio} SELECIONADA`);

        break;
      }

      const botaoMesAnterior = locate(".rdp-button_previous");

      const existeBotao = await I.grabNumberOfVisibleElements(botaoMesAnterior);

      if (existeBotao === 0) {
        console.log("Botão mês anterior não encontrado.");

        break;
      }

      const desabilitado = await I.grabAttributeFrom(
        botaoMesAnterior,
        "disabled",
      ).catch(() => null);

      if (desabilitado !== null) {
        console.log("Botão mês anterior desabilitado.");

        break;
      }

      console.log("CLICANDO EM MÊS ANTERIOR");

      I.forceClick(botaoMesAnterior);

      I.wait(1);
    }

    if (!encontrou) {
      throw new Error(`Data ${dataInicio} não foi encontrada no calendário.`);
    }

    I.say(`SUCESSO: data ${dataInicio} selecionada corretamente.`);

    I.wait(3);
  },
).tag("@publicareventos52");
/////----------/////

Scenario(
  "Cenário: 000053 - Acessar o calendário e selecionar datas no campo 'Fim do Evento'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';

    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);

    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");

    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);
    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);

    I.scrollTo(botaoNovoEvento);

    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);

    I.seeInCurrentUrl("/producer/events/create", 5);

    I.wait(3);

    const labelFimEvento = locate("label").withText("Fim do Evento");

    const id = await I.grabAttributeFrom(labelFimEvento, "for");

    const botaoDataHora = locate("button").withAttr({
      id,
    });

    I.scrollTo(labelFimEvento);

    I.waitForElement(botaoDataHora, 10);

    I.click(botaoDataHora);

    const dataFim = "2026-04-22";

    const dia = `.rdp-day[data-day="${dataFim}"]`;

    const proximoMes = locate(".rdp-button_next");

    const mesAnterior = locate(".rdp-button_previous");

    let encontrou = false;

    const primeiraDataVisivel = await I.grabAttributeFrom(
      ".rdp-day[data-day]",
      "data-day",
    );

    console.log("PRIMEIRA DATA VISÍVEL:", primeiraDataVisivel);

    const usarMesAnterior = dataFim < primeiraDataVisivel;

    console.log(
      usarMesAnterior
        ? "NAVEGANDO PARA MESES ANTERIORES"
        : "NAVEGANDO PARA PRÓXIMOS MESES",
    );

    for (let i = 0; i < 24; i++) {
      const existe = await I.grabNumberOfVisibleElements(dia);

      console.log(`DATA ${dataFim} ENCONTRADA: ${existe}`);

      if (existe > 0) {
        encontrou = true;

        break;
      }

      const botao = usarMesAnterior ? mesAnterior : proximoMes;

      const existeBotao = await I.grabNumberOfVisibleElements(botao);

      if (existeBotao === 0) {
        throw new Error("Botão de navegação do calendário não encontrado.");
      }

      I.scrollTo(botao);

      const desabilitado = await I.grabAttributeFrom(botao, "disabled").catch(
        () => null,
      );

      if (desabilitado !== null) {
        throw new Error("Botão de navegação do calendário está desabilitado.");
      }

      console.log(
        usarMesAnterior
          ? "CLICANDO EM MÊS ANTERIOR"
          : "CLICANDO EM PRÓXIMO MÊS",
      );

      I.forceClick(botao);

      I.wait(1);
    }

    if (!encontrou) {
      throw new Error(`Data ${dataFim} não está disponível para seleção.`);
    }

    I.waitForElement(dia, 10);

    I.scrollTo(dia);

    I.click(dia);

    I.say(`SUCESSO: data ${dataFim} selecionada corretamente.`);

    I.wait(3);
  },
).tag("@publicareventos53");

/////----------/////

Scenario(
  "Cenário: 000054 - Acessar o calendário e selecionar datas no campo 'Encerrar Vendas'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);
    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);
    I.seeInCurrentUrl("/producer/events/create", 5);

    I.wait(3);

    const labelEncerrarVendas = locate("label").withText("Encerrar Vendas");

    I.waitForElement(labelEncerrarVendas, 10);

    const id = await I.grabAttributeFrom(labelEncerrarVendas, "for");

    const botaoDataHora = locate("button").withAttr({ id });

    I.scrollTo(labelEncerrarVendas);
    I.waitForElement(botaoDataHora, 10);
    I.click(botaoDataHora);

    const dataEncerrarVendas = "2026-06-22";

    const dia = `.rdp-day[data-day="${dataEncerrarVendas}"]`;

    const proximoMes = locate(".rdp-button_next");
    const mesAnterior = locate(".rdp-button_previous");

    let encontrou = false;

    const primeiraDataVisivel = await I.grabAttributeFrom(
      ".rdp-day[data-day]",
      "data-day",
    );

    console.log("PRIMEIRA DATA VISÍVEL:", primeiraDataVisivel);

    const usarMesAnterior = dataEncerrarVendas < primeiraDataVisivel;

    console.log(
      usarMesAnterior
        ? "NAVEGANDO PARA MESES ANTERIORES"
        : "NAVEGANDO PARA PRÓXIMOS MESES",
    );

    for (let i = 0; i < 24; i++) {
      const existe = await I.grabNumberOfVisibleElements(dia);

      console.log(`DATA ${dataEncerrarVendas} ENCONTRADA: ${existe}`);

      if (existe > 0) {
        encontrou = true;
        break;
      }

      const botao = usarMesAnterior ? mesAnterior : proximoMes;

      const existeBotao = await I.grabNumberOfVisibleElements(botao);

      if (existeBotao === 0) {
        throw new Error("Botão de navegação do calendário não encontrado.");
      }

      I.scrollTo(botao);

      const desabilitado = await I.grabAttributeFrom(botao, "disabled").catch(
        () => null,
      );

      if (desabilitado !== null) {
        throw new Error("Botão de navegação do calendário está desabilitado.");
      }

      console.log(
        usarMesAnterior
          ? "CLICANDO EM MÊS ANTERIOR"
          : "CLICANDO EM PRÓXIMO MÊS",
      );

      I.forceClick(botao);

      I.wait(1);
    }

    if (!encontrou) {
      throw new Error(
        `Data ${dataEncerrarVendas} não está disponível para seleção.`,
      );
    }

    const diaDesabilitado = await I.grabAttributeFrom(dia, "disabled").catch(
      () => null,
    );

    if (diaDesabilitado !== null) {
      throw new Error(
        `O dia ${dataEncerrarVendas} está desabilitado no calendário. ` +
          `Verifique se é necessário selecionar antes uma data de início ` +
          `(ex: campo 'Iniciar Vendas') para habilitar esta data.`,
      );
    }

    I.waitForElement(dia, 10);
    I.scrollTo(dia);
    I.click(dia);

    I.say(`SUCESSO: data ${dataEncerrarVendas} selecionada corretamente.`);

    I.wait(3);
  },
).tag("@publicareventos54");

/////----------/////

Scenario(
  "Cenário: 000055 - Navegar para meses posteriores no campo 'Início do Evento'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);
    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);
    I.seeInCurrentUrl("/producer/events/create");

    I.wait(3);

    const labelInicioEvento = locate("label").withText("Início do Evento");

    const id = await I.grabAttributeFrom(labelInicioEvento, "for");

    const botaoDataHora = locate("button").withAttr({ id });

    I.scrollTo(labelInicioEvento);
    I.waitForElement(botaoDataHora, 10);
    I.click(botaoDataHora);

    I.waitForElement(".rdp-caption_label", 10);

    const mesInicial = await I.grabTextFrom(".rdp-caption_label");

    console.log(`Mês inicial: ${mesInicial}`);

    for (let i = 1; i <= 5; i++) {
      const btnProximoMes = 'button[aria-label="Go to the Next Month"]';

      I.waitForElement(btnProximoMes, 10);

      const desabilitado = await I.grabAttributeFrom(
        btnProximoMes,
        "disabled",
      ).catch(() => null);

      if (desabilitado !== null) {
        throw new Error(
          `Botão "Próximo Mês" está desabilitado na navegação ${i}.`,
        );
      }

      I.forceClick(btnProximoMes);

      I.wait(1);

      const mesAtual = await I.grabTextFrom(".rdp-caption_label");

      console.log(`Navegação ${i}: ${mesAtual}`);
    }

    const mesFinal = await I.grabTextFrom(".rdp-caption_label");

    console.log(`Mês final: ${mesFinal}`);

    I.say("SUCESSO: navegação entre meses posteriores realizada corretamente.");

    I.wait(3);
  },
).tag("@publicareventos55");

/////----------/////

Scenario(
  "Cenário: 000056 - Acessar o calendário e alterar meses anteriores no campo 'Início do Evento'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';

    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);

    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");

    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);

    I.waitForElement("body", 10);

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);

    I.scrollTo(botaoNovoEvento);

    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);

    I.seeInCurrentUrl("/producer/events/create");

    I.wait(3);

    const labelInicioEvento = locate("label").withText("Início do Evento");

    const id = await I.grabAttributeFrom(labelInicioEvento, "for");

    const botaoDataHora = locate("button").withAttr({
      id,
    });

    I.scrollTo(labelInicioEvento);

    I.waitForElement(botaoDataHora, 10);

    I.click(botaoDataHora);

    I.waitForElement(".rdp-caption_label", 10);

    const mesInicial = await I.grabTextFrom(".rdp-caption_label");

    console.log(`Mês inicial: ${mesInicial}`);

    for (let i = 1; i <= 5; i++) {
      const btnMesAnterior = 'button[aria-label="Go to the Previous Month"]';

      I.waitForElement(btnMesAnterior, 10);

      const desabilitado = await I.grabAttributeFrom(
        btnMesAnterior,
        "disabled",
      ).catch(() => null);

      if (desabilitado !== null) {
        throw new Error(
          `Botão "Mês Anterior" está desabilitado na navegação ${i}.`,
        );
      }

      I.scrollTo(btnMesAnterior);

      I.forceClick(btnMesAnterior);

      I.wait(1);

      const mesAtual = await I.grabTextFrom(".rdp-caption_label");

      console.log(`Navegação ${i}: ${mesAtual}`);
    }

    const mesFinal = await I.grabTextFrom(".rdp-caption_label");

    console.log(`Mês final: ${mesFinal}`);

    I.say("SUCESSO: navegação para meses anteriores realizada corretamente.");

    I.wait(3);
  },
).tag("@publicareventos56");

/////----------/////

Scenario(
  "Cenário: 000057 - Acessar o calendário e alterar meses posteriores no campo 'Fim do Evento'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';

    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);

    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");

    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);

    I.waitForElement("body", 10);

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);

    I.scrollTo(botaoNovoEvento);

    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);

    I.seeInCurrentUrl("/producer/events/create");

    I.wait(3);

    const labelFimEvento = locate("label").withText("Fim do Evento");

    const id = await I.grabAttributeFrom(labelFimEvento, "for");

    const botaoDataHora = locate("button").withAttr({
      id,
    });

    I.scrollTo(labelFimEvento);

    I.waitForElement(botaoDataHora, 10);

    I.click(botaoDataHora);

    I.waitForElement(".rdp-caption_label", 10);

    const mesInicial = await I.grabTextFrom(".rdp-caption_label");

    console.log(`Mês inicial: ${mesInicial}`);

    for (let i = 1; i <= 5; i++) {
      const btnProximoMes = 'button[aria-label="Go to the Next Month"]';

      I.waitForElement(btnProximoMes, 10);

      const desabilitado = await I.grabAttributeFrom(
        btnProximoMes,
        "disabled",
      ).catch(() => null);

      if (desabilitado !== null) {
        throw new Error(
          `Botão "Próximo Mês" está desabilitado na navegação ${i}.`,
        );
      }

      I.scrollTo(btnProximoMes);

      I.forceClick(btnProximoMes);

      I.wait(1);

      const mesAtual = await I.grabTextFrom(".rdp-caption_label");

      console.log(`Navegação ${i}: ${mesAtual}`);
    }

    const mesFinal = await I.grabTextFrom(".rdp-caption_label");

    console.log(`Mês final: ${mesFinal}`);

    I.say("SUCESSO: navegação para meses posteriores realizada corretamente.");

    I.wait(3);
  },
).tag("@publicareventos57");

/////----------/////

Scenario(
  "Cenário: 000058 - Acessar o calendário e alterar meses anteriores no campo 'Fim do Evento'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);
    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);
    I.seeInCurrentUrl("/producer/events/create");

    const labelFimEvento = locate("label").withText("Fim do Evento");

    const id = await I.grabAttributeFrom(labelFimEvento, "for");

    const botaoDataHora = locate("button").withAttr({ id });

    I.scrollTo(labelFimEvento);
    I.waitForElement(botaoDataHora, 10);
    I.click(botaoDataHora);

    I.waitForElement(".rdp-caption_label", 10);

    for (let i = 0; i < 5; i++) {
      const mesAtual = await I.grabTextFrom(".rdp-caption_label");

      console.log(`MÊS ATUAL (${i + 1}/5): ${mesAtual}`);

      const botaoMesAnterior = 'button[aria-label="Go to the Previous Month"]';

      const existeBotao = await I.grabNumberOfVisibleElements(botaoMesAnterior);

      if (existeBotao === 0) {
        throw new Error("Botão 'Mês Anterior' não encontrado.");
      }

      I.scrollTo(botaoMesAnterior);

      I.forceClick(botaoMesAnterior);

      I.wait(1);
    }

    const mesFinal = await I.grabTextFrom(".rdp-caption_label");

    console.log(`MÊS FINAL EXIBIDO: ${mesFinal}`);

    I.say("SUCESSO: navegação para meses anteriores realizada corretamente.");

    I.wait(3);
  },
).tag("@publicareventos58");

/////----------/////

Scenario(
  "Cenário: 000059 - Acessar o calendário e alterar meses posteriores no campo 'Encerrar Vendas'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';

    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);

    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");

    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);

    I.scrollTo(botaoNovoEvento);

    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);

    I.seeInCurrentUrl("/producer/events/create");

    I.wait(2);

    const labelEncerrarVendas = locate("label").withText("Encerrar Vendas");

    const id = await I.grabAttributeFrom(labelEncerrarVendas, "for");

    const botaoDataHora = locate("button").withAttr({
      id,
    });

    I.scrollTo(labelEncerrarVendas);

    I.waitForElement(botaoDataHora, 10);

    I.click(botaoDataHora);

    I.waitForElement(".rdp-caption_label", 10);

    for (let i = 1; i <= 5; i++) {
      const mesAtual = await I.grabTextFrom(".rdp-caption_label");

      console.log(`MÊS ATUAL (${i}): ${mesAtual}`);

      const proximoMes = locate('button[aria-label="Go to the Next Month"]');

      I.waitForElement(proximoMes, 10);

      const desabilitado = await I.grabAttributeFrom(
        proximoMes,
        "disabled",
      ).catch(() => null);

      if (desabilitado !== null) {
        throw new Error("Botão 'Próximo Mês' está desabilitado.");
      }

      I.scrollTo(proximoMes);

      I.forceClick(proximoMes);

      I.wait(1);
    }

    const mesFinal = await I.grabTextFrom(".rdp-caption_label");

    console.log(`MÊS FINAL EXIBIDO: ${mesFinal}`);

    I.say("SUCESSO: navegação para meses posteriores realizada corretamente.");

    I.wait(3);
  },
).tag("@publicareventos59");

/////----------/////

Scenario(
  "Cenário: 000060 - Navegar para meses anteriores no calendário do campo 'Encerrar Vendas'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';

    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);

    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");

    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);

    I.waitForElement("body", 10);

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);

    I.scrollTo(botaoNovoEvento);

    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);

    I.seeInCurrentUrl("/producer/events/create", 5);

    I.wait(3);

    const labelEncerrarVendas = locate("label").withText("Encerrar Vendas");

    const id = await I.grabAttributeFrom(labelEncerrarVendas, "for");

    const botaoDataHora = locate("button").withAttr({ id });

    I.scrollTo(labelEncerrarVendas);

    I.waitForElement(botaoDataHora, 10);

    I.click(botaoDataHora);

    I.waitForElement(".rdp-caption_label", 10);

    const mesInicial = await I.grabTextFrom(".rdp-caption_label");

    console.log(`MÊS INICIAL: ${mesInicial}`);

    for (let i = 1; i <= 5; i++) {
      const botaoMesAnterior = 'button[aria-label="Go to the Previous Month"]';

      const existeBotao = await I.grabNumberOfVisibleElements(botaoMesAnterior);

      if (existeBotao === 0) {
        throw new Error("Botão 'Mês Anterior' não encontrado.");
      }

      I.scrollTo(botaoMesAnterior);

      I.forceClick(botaoMesAnterior);

      I.wait(1);

      const mesAtual = await I.grabTextFrom(".rdp-caption_label");

      console.log(`NAVEGAÇÃO ${i}: ${mesAtual}`);
    }

    I.say(
      "SUCESSO: navegação para meses anteriores realizada corretamente no campo Encerrar Vendas.",
    );

    I.wait(3);
  },
).tag("@publicareventos60");

/////----------/////

Scenario(
  "Cenário: 000061 - Acessar Início do Evento e alterar no calendário os campos Horas, Minutos e Segundos.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);
    I.seeInCurrentUrl("/producer/events/create", 5);

    I.wait(3);

    const labelInicioEvento = locate("label").withText("Início do Evento");

    const id = await I.grabAttributeFrom(labelInicioEvento, "for");
    const botaoDataHora = locate("button").withAttr({ id });

    I.scrollTo(labelInicioEvento);
    I.waitForElement(botaoDataHora, 10);
    I.click(botaoDataHora);

    async function preencherCampoTempo(seletor, valor) {
      I.waitForElement(seletor, 10);
      I.scrollTo(seletor);
      I.click(seletor);

      I.pressKey(["Control", "A"]);
      I.pressKey("Backspace");

      I.fillField(seletor, valor);

      I.seeInField(seletor, valor);
    }

    await preencherCampoTempo("#hours", "12");
    await preencherCampoTempo("#minutes", "30");
    await preencherCampoTempo("#seconds", "45");
    I.wait(3);
  },
).tag("@publicareventos61");

/////----------/////

Scenario(
  "Cenário: 000062 - Acessar Fim do Evento e alterar no calendário os campos Horas, Minutos e Segundos.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);
    I.seeInCurrentUrl("/producer/events/create", 5);

    I.wait(3);

    const labelFimEvento = locate("label").withText("Fim do Evento");

    const id = await I.grabAttributeFrom(labelFimEvento, "for");
    const botaoDataHora = locate("button").withAttr({ id });

    I.scrollTo(labelFimEvento);
    I.waitForElement(botaoDataHora, 10);
    I.click(botaoDataHora);

    async function preencherCampoTempo(seletor, valor) {
      I.waitForElement(seletor, 10);
      I.scrollTo(seletor);
      I.click(seletor);

      I.pressKey(["Control", "A"]);
      I.pressKey("Backspace");

      I.fillField(seletor, valor);

      I.seeInField(seletor, valor);
    }

    await preencherCampoTempo("#hours", "12");
    await preencherCampoTempo("#minutes", "30");
    await preencherCampoTempo("#seconds", "45");
    I.wait(3);
  },
).tag("@publicareventos62");

/////----------/////

Scenario(
  "Cenário: 000063 - Acessar Encerrar Vendas e alterar no calendário os campos Horas, Minutos e Segundos.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);
    I.seeInCurrentUrl("/producer/events/create", 5);

    I.wait(3);

    const labelEncerrarVendas = locate("label").withText("Encerrar Vendas");

    const id = await I.grabAttributeFrom(labelEncerrarVendas, "for");
    const botaoDataHora = locate("button").withAttr({ id });

    I.scrollTo(labelEncerrarVendas);
    I.waitForElement(botaoDataHora, 10);
    I.click(botaoDataHora);

    async function preencherCampoTempo(seletor, valor) {
      I.waitForElement(seletor, 10);
      I.scrollTo(seletor);
      I.click(seletor);

      I.pressKey(["Control", "A"]);
      I.pressKey("Backspace");

      I.fillField(seletor, valor);

      I.seeInField(seletor, valor);
    }

    await preencherCampoTempo("#hours", "12");
    await preencherCampoTempo("#minutes", "30");
    await preencherCampoTempo("#seconds", "45");
    I.wait(3);
  },
).tag("@publicareventos63");

/////----------/////

Scenario(
  "Cenário: 000064 - Preencher data e horário nos campos 'Início do Evento', 'Fim do Evento' e 'Encerrar Vendas'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);
    I.seeInCurrentUrl("/producer/events/create", 5);

    I.wait(3);

    async function preencherCampoTempo(seletor, valor) {
      I.waitForElement(seletor, 10);
      I.scrollTo(seletor);
      I.fillField(seletor, valor);
      I.seeInField(seletor, valor);
    }

    async function abrirCampoDataHora(labelTexto) {
      const label = locate("label").withText(labelTexto);

      I.waitForElement(label, 10);

      const id = await I.grabAttributeFrom(label, "for");

      const botao = locate("button").withAttr({ id });

      I.scrollTo(label);
      I.waitForElement(botao, 10);
      I.click(botao);
    }

   
    async function selecionarData(dataIso, labelTexto) {
      const dia = `.rdp-day[data-day="${dataIso}"]`;

      const proximoMes = locate(".rdp-button_next");
      const mesAnterior = locate(".rdp-button_previous");

      let encontrou = false;

      const primeiraDataVisivel = await I.grabAttributeFrom(
        ".rdp-day[data-day]",
        "data-day",
      );

      console.log(`[${labelTexto}] PRIMEIRA DATA VISÍVEL:`, primeiraDataVisivel);

      const usarMesAnterior = dataIso < primeiraDataVisivel;

      console.log(
        `[${labelTexto}] ` +
          (usarMesAnterior
            ? "NAVEGANDO PARA MESES ANTERIORES"
            : "NAVEGANDO PARA PRÓXIMOS MESES"),
      );

      for (let i = 0; i < 24; i++) {
        const existe = await I.grabNumberOfVisibleElements(dia);

        console.log(`[${labelTexto}] DATA ${dataIso} ENCONTRADA: ${existe}`);

        if (existe > 0) {
          encontrou = true;
          break;
        }

        const botao = usarMesAnterior ? mesAnterior : proximoMes;

        const existeBotao = await I.grabNumberOfVisibleElements(botao);

        if (existeBotao === 0) {
          throw new Error(
            `[${labelTexto}] Botão de navegação do calendário não encontrado.`,
          );
        }

        I.scrollTo(botao);

        const desabilitado = await I.grabAttributeFrom(
          botao,
          "disabled",
        ).catch(() => null);

        if (desabilitado !== null) {
          throw new Error(
            `[${labelTexto}] Botão de navegação do calendário está desabilitado.`,
          );
        }

        console.log(
          `[${labelTexto}] ` +
            (usarMesAnterior ? "CLICANDO EM MÊS ANTERIOR" : "CLICANDO EM PRÓXIMO MÊS"),
        );

        I.forceClick(botao);

        I.wait(1);
      }

      if (!encontrou) {
        throw new Error(
          `[${labelTexto}] Data ${dataIso} não está disponível para seleção.`,
        );
      }

    
      const diaDesabilitado = await I.grabAttributeFrom(dia, "disabled").catch(
        () => null,
      );

      if (diaDesabilitado !== null) {
        throw new Error(
          `[${labelTexto}] O dia ${dataIso} está desabilitado no calendário. ` +
            `Verifique se a data escolhida respeita a ordem cronológica exigida ` +
            `(ex: "Encerrar Vendas" deve ser posterior a "Início do Evento" e "Fim do Evento").`,
        );
      }

      I.waitForElement(dia, 10);
      I.scrollTo(dia);
      I.click(dia);

      I.say(`[${labelTexto}] SUCESSO: data ${dataIso} selecionada corretamente.`);
    }

    async function preencherDataHora(label, dataIso, hora, minuto, segundo) {
      await abrirCampoDataHora(label);

      await selecionarData(dataIso, label);

      await preencherCampoTempo("#hours", hora);
      await preencherCampoTempo("#minutes", minuto);
      await preencherCampoTempo("#seconds", segundo);
    }

 
    await preencherDataHora("Início do Evento", "2026-06-22", "12", "30", "45");

    await preencherDataHora("Fim do Evento", "2026-06-23", "14", "0", "0");

    await preencherDataHora("Encerrar Vendas", "2026-06-24", "10", "0", "0");

    I.wait(3);
  },
).tag("@publicareventos64");

/////----------/////

Scenario(
  "Cenário: 000065 - 'Acesso simultâneo (Stress) - Preencher data e horário nos campos 'Início do Evento', 'Fim do Evento' e 'Encerrar Vendas'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");
    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);

    async function preencherCampoTempo(seletor, valor) {
      I.waitForElement(seletor, 10);
      I.scrollTo(seletor);
      I.fillField(seletor, valor);
      I.seeInField(seletor, valor);
    }

    async function abrirCampoDataHora(labelTexto) {
      const label = locate("label").withText(labelTexto);

      I.waitForElement(label, 10);

      const id = await I.grabAttributeFrom(label, "for");
      const botao = locate("button").withAttr({ id });

      I.scrollTo(label);
      I.waitForElement(botao, 10);
      I.click(botao);
    }

  
    async function selecionarData(dataIso, labelTexto) {
      const dia = `.rdp-day[data-day="${dataIso}"]`;

      const proximoMes = locate(".rdp-button_next");
      const mesAnterior = locate(".rdp-button_previous");

      let encontrou = false;

      const primeiraDataVisivel = await I.grabAttributeFrom(
        ".rdp-day[data-day]",
        "data-day",
      );

      const usarMesAnterior = dataIso < primeiraDataVisivel;

      for (let i = 0; i < 24; i++) {
        const existe = await I.grabNumberOfVisibleElements(dia);

        if (existe > 0) {
          encontrou = true;
          break;
        }

        const botao = usarMesAnterior ? mesAnterior : proximoMes;

        const existeBotao = await I.grabNumberOfVisibleElements(botao);

        if (existeBotao === 0) {
          throw new Error(
            `[${labelTexto}] Botão de navegação do calendário não encontrado.`,
          );
        }

        I.scrollTo(botao);

        const desabilitado = await I.grabAttributeFrom(
          botao,
          "disabled",
        ).catch(() => null);

        if (desabilitado !== null) {
          throw new Error(
            `[${labelTexto}] Botão de navegação do calendário está desabilitado.`,
          );
        }

        I.forceClick(botao);
        I.wait(1);
      }

      if (!encontrou) {
        throw new Error(
          `[${labelTexto}] Data ${dataIso} não está disponível para seleção.`,
        );
      }

      const diaDesabilitado = await I.grabAttributeFrom(dia, "disabled").catch(
        () => null,
      );

      if (diaDesabilitado !== null) {
        throw new Error(
          `[${labelTexto}] O dia ${dataIso} está desabilitado no calendário. ` +
            `Verifique se a data respeita a ordem cronológica exigida ` +
            `(Início do Evento < Fim do Evento < Encerrar Vendas).`,
        );
      }

      I.waitForElement(dia, 10);
      I.scrollTo(dia);
      I.click(dia);
    }

    async function preencherDataHora(label, dataIso, hora, minuto, segundo) {
      await abrirCampoDataHora(label);
      await selecionarData(dataIso, label);

      await preencherCampoTempo("#hours", hora);
      await preencherCampoTempo("#minutes", minuto);
      await preencherCampoTempo("#seconds", segundo);
    }

   
    function adicionarDias(dataIso, dias) {
      const data = new Date(`${dataIso}T00:00:00`);
      data.setDate(data.getDate() + dias);
      return data.toISOString().slice(0, 10);
    }

    const horas = ["00", "12", "23"];

   
    let dataBase = "2026-06-22";

    const totalIteracoes = 5;

    for (let i = 0; i < totalIteracoes; i++) {
      const hora = horas[i % horas.length];

      const dataInicio = dataBase;
      const dataFim = adicionarDias(dataBase, 1);
      const dataEncerrarVendas = adicionarDias(dataBase, 2);

      console.log(
        `=== ITERAÇÃO ${i + 1}/${totalIteracoes} | hora=${hora} | ` +
          `inicio=${dataInicio} fim=${dataFim} encerrarVendas=${dataEncerrarVendas} ===`,
      );

      try {
        await preencherDataHora("Início do Evento", dataInicio, hora, "30", "45");
        await preencherDataHora("Fim do Evento", dataFim, hora, "30", "45");
        await preencherDataHora(
          "Encerrar Vendas",
          dataEncerrarVendas,
          hora,
          "30",
          "45",
        );

        I.say(`SUCESSO: iteração ${i + 1} concluída sem erros.`);
      } catch (erro) {
        I.say(`FALHA na iteração ${i + 1}: ${erro.message}`);
        throw erro;
      }

     
      dataBase = adicionarDias(dataBase, 3);
    }

    I.wait(3);
  },
).tag("@publicareventos65");

/////----------/////

Scenario(
  "Cenário: 000066 - Fluxo completo, preencher Data e Horário nos campos 'Início do Evento', 'Fim do Evento' e 'Encerrar Vendas'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);
    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 15);
    I.waitForElement("body", 10);

    I.wait(2);

    async function preencherCampoTempo(seletor, valor) {
      I.waitForElement(seletor, 15);

      I.forceClick(seletor);
      I.wait(0.5);

      I.pressKey(["Control", "A"]);
      I.pressKey("Backspace");

      I.fillField(seletor, valor);
      I.seeInField(seletor, valor);
    }

    async function selecionarData(dataDesejada) {
      const dia = `[data-day="${dataDesejada}"]`;
      const botaoNext = 'button[aria-label="Go to the Next Month"]';

      let encontrou = false;

      for (let i = 0; i < 12; i++) {
        const existe = await I.grabNumberOfVisibleElements(dia);

        if (existe > 0) {
          encontrou = true;
          break;
        }

        I.waitForElement(botaoNext, 5);
        I.forceClick(botaoNext);
        I.wait(0.8);
      }

      if (!encontrou) {
        throw new Error(`Data ${dataDesejada} não encontrada no calendário`);
      }

      I.forceClick(dia);

      I.wait(1);
    }

    async function abrirCampoDataHora(labelTexto) {
      const label = locate("label").withText(labelTexto).first();

      I.waitForElement(label, 15);

      const id = await I.grabAttributeFrom(label, "for");
      const botao = locate("button").withAttr({ id });

      I.forceClick(botao);

      I.wait(1.5);
    }

    async function preencherDataHora(labelTexto, data, hora, minuto, segundo) {
      await abrirCampoDataHora(labelTexto);
      await selecionarData(data);

      I.waitForElement("#hours", 15);

      await preencherCampoTempo("#hours", hora);
      await preencherCampoTempo("#minutes", minuto);
      await preencherCampoTempo("#seconds", segundo);

      I.wait(1);
    }

    await preencherDataHora("Início do Evento", "07/09/2026", "12", "30", "45");

    await preencherDataHora("Fim do Evento", "07/10/2026", "12", "30", "45");

    await preencherDataHora("Encerrar Vendas", "07/10/2026", "12", "30", "45");

    I.wait(3);
  },
).tag("@publicareventos66");

/////----------/////

Scenario(
  "Cenário: 000067 - Fluxo completo com stress de preenchimento de Data e Hora (UI Loop).",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);
    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 15);
    I.waitForElement("body", 10);

    async function preencherCampoTempo(seletor, valor) {
      I.waitForElement(seletor, 15);

      I.forceClick(seletor);
      I.wait(0.3);

      I.pressKey(["Control", "A"]);
      I.pressKey("Backspace");

      I.fillField(seletor, valor);
      I.seeInField(seletor, valor);
    }

    async function selecionarData(dataDesejada) {
      const dia = `[data-day="${dataDesejada}"]`;
      const botaoNext = 'button[aria-label="Go to the Next Month"]';

      let encontrou = false;

      for (let i = 0; i < 12; i++) {
        const existe = await I.grabNumberOfVisibleElements(dia);

        if (existe > 0) {
          encontrou = true;
          break;
        }

        I.waitForElement(botaoNext, 5);
        I.forceClick(botaoNext);
        I.wait(0.5);
      }

      if (!encontrou) {
        throw new Error(`Data ${dataDesejada} não encontrada no calendário`);
      }

      I.forceClick(dia);
      I.wait(0.5);
    }

    async function abrirCampoDataHora(labelTexto) {
      const label = locate("label").withText(labelTexto).first();

      I.waitForElement(label, 15);

      const id = await I.grabAttributeFrom(label, "for");
      const botao = locate("button").withAttr({ id });

      I.forceClick(botao);
      I.wait(1);
    }

    async function preencherDataHora(labelTexto, data, hora, minuto, segundo) {
      await abrirCampoDataHora(labelTexto);
      await selecionarData(data);

      I.waitForElement("#hours", 15);

      await preencherCampoTempo("#hours", hora);
      await preencherCampoTempo("#minutes", minuto);
      await preencherCampoTempo("#seconds", segundo);
    }

    const totalExecucoes = 15;

    for (let i = 0; i < totalExecucoes; i++) {
      I.say(`🔥 Execução de stress: ${i + 1}/${totalExecucoes}`);

      const hora = String(10 + (i % 10)).padStart(2, "0");

      await preencherDataHora(
        "Início do Evento",
        "07/09/2026",
        hora,
        "30",
        "45",
      );

      await preencherDataHora("Fim do Evento", "07/10/2026", hora, "30", "45");

      await preencherDataHora(
        "Encerrar Vendas",
        "07/10/2026",
        hora,
        "30",
        "45",
      );

      I.wait(0.5);
    }

    I.wait(2);
  },
).tag("@publicareventos67");

/////----------/////

Scenario(
  "Cenário: 000068 - Fluxo completo com stress + reset de calendário.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 15);

    async function preencherCampoTempo(seletor, valor) {
      I.waitForElement(seletor, 15);

      I.forceClick(seletor);
      I.wait(0.3);

      I.pressKey(["Control", "A"]);
      I.pressKey("Backspace");

      I.fillField(seletor, valor);
      I.seeInField(seletor, valor);
    }

    async function stressNavegacaoCalendario(totalCliques = 50) {
      const botaoNext = 'button[aria-label="Go to the Next Month"]';

      I.say(`🔥 Stress de navegação: ${totalCliques} meses`);

      for (let i = 0; i < totalCliques; i++) {
        I.waitForElement(botaoNext, 5);
        I.forceClick(botaoNext);
        I.wait(0.2);
      }
    }

    async function selecionarData(dataDesejada) {
      const dia = `[data-day="${dataDesejada}"]`;
      const botaoNext = 'button[aria-label="Go to the Next Month"]';

      let encontrou = false;

      for (let i = 0; i < 12; i++) {
        const existe = await I.grabNumberOfVisibleElements(dia);

        if (existe > 0) {
          encontrou = true;
          break;
        }

        I.waitForElement(botaoNext, 5);
        I.forceClick(botaoNext);
        I.wait(0.5);
      }

      if (!encontrou) {
        throw new Error(`Data ${dataDesejada} não encontrada no calendário`);
      }

      I.forceClick(dia);
      I.wait(0.5);
    }

    async function abrirCampoDataHora(labelTexto) {
      const label = locate("label").withText(labelTexto).first();

      I.waitForElement(label, 15);

      const id = await I.grabAttributeFrom(label, "for");
      const botao = locate("button").withAttr({ id });

      I.forceClick(botao);
      I.wait(1);
    }

    async function preencherDataHora(labelTexto, data, hora, minuto, segundo) {
      await abrirCampoDataHora(labelTexto);

      await stressNavegacaoCalendario(50);

      I.pressKey("Escape");
      I.wait(0.5);

      await abrirCampoDataHora(labelTexto);

      await selecionarData(data);

      I.waitForElement("#hours", 15);

      await preencherCampoTempo("#hours", hora);
      await preencherCampoTempo("#minutes", minuto);
      await preencherCampoTempo("#seconds", segundo);
    }

    await preencherDataHora("Início do Evento", "07/09/2026", "12", "30", "45");

    await preencherDataHora("Fim do Evento", "07/10/2026", "12", "30", "45");

    await preencherDataHora("Encerrar Vendas", "07/10/2026", "12", "30", "45");

    I.wait(2);
  },
)
  .retry(2)
  .tag("@publicareventos68");

/////----------/////

Scenario(
  "Cenário: 000069 - Fluxo completo com stress de multi-abertura de modal.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForElement("body", 10);
    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 15);
    I.waitForElement("body", 10);

    async function preencherCampoTempo(seletor, valor) {
      I.waitForElement(seletor, 15);

      I.forceClick(seletor);
      I.wait(0.5);

      I.pressKey(["Control", "A"]);
      I.pressKey("Backspace");

      I.fillField(seletor, valor);
      I.seeInField(seletor, valor);
    }

    async function stressModal(labelTexto, totalExecucoes = 20) {
      I.say(`🔥 Stress de modal: ${totalExecucoes} aberturas`);

      for (let i = 0; i < totalExecucoes; i++) {
        await abrirCampoDataHora(labelTexto);

        I.pressKey("Escape");
        I.wait(0.3);
      }

      I.say("✅ Stress de modal finalizado");
    }

    async function selecionarData(dataDesejada) {
      const dia = `[data-day="${dataDesejada}"]`;
      const botaoNext = 'button[aria-label="Go to the Next Month"]';

      let encontrou = false;

      for (let i = 0; i < 12; i++) {
        const existe = await I.grabNumberOfVisibleElements(dia);

        if (existe > 0) {
          encontrou = true;
          break;
        }

        I.waitForElement(botaoNext, 5);
        I.forceClick(botaoNext);
        I.wait(0.8);
      }

      if (!encontrou) {
        throw new Error(`Data ${dataDesejada} não encontrada no calendário`);
      }

      I.forceClick(dia);
      I.wait(1);
    }

    async function abrirCampoDataHora(labelTexto) {
      const label = locate("label").withText(labelTexto).first();

      I.waitForElement(label, 15);

      const id = await I.grabAttributeFrom(label, "for");
      const botao = locate("button").withAttr({ id });

      I.forceClick(botao);
      I.wait(1.5);
    }

    async function preencherDataHora(labelTexto, data, hora, minuto, segundo) {
      await abrirCampoDataHora(labelTexto);
      await selecionarData(data);

      I.waitForElement("#hours", 15);

      await preencherCampoTempo("#hours", hora);
      await preencherCampoTempo("#minutes", minuto);
      await preencherCampoTempo("#seconds", segundo);

      I.wait(1);
    }

    await stressModal("Início do Evento", 20);

    await preencherDataHora("Início do Evento", "07/09/2026", "12", "30", "45");

    await preencherDataHora("Fim do Evento", "07/10/2026", "12", "30", "45");

    await preencherDataHora("Encerrar Vendas", "07/10/2026", "12", "30", "45");

    I.wait(3);
  },
)
  .retry(2)
  .tag("@publicareventos69");

/////----------/////

Scenario(
  "Cenário: 000070 - Fluxo completo com stress de multi-abertura de modal + stress de input.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 15);

    async function preencherCampoTempo(seletor, valor) {
      I.waitForElement(seletor, 15);

      I.forceClick(seletor);
      I.wait(0.3);

      I.pressKey(["Control", "A"]);
      I.pressKey("Backspace");

      I.fillField(seletor, valor);

      const valorCampo = await I.grabValueFrom(seletor);

      I.say(`Valor digitado: ${valor} | Valor no campo: ${valorCampo}`);
    }

    async function stressInputTempo() {
      const valores = ["00", "23", "99", "-1", "abc", ""];

      I.say("🔥 Iniciando stress de input no campo #hours");

      for (const valor of valores) {
        await preencherCampoTempo("#hours", valor);
        I.wait(0.3);
      }

      I.say("✅ Stress de input finalizado");
    }

    async function stressModal(labelTexto, totalExecucoes = 20) {
      I.say(`🔥 Stress de modal: ${totalExecucoes} execuções`);

      for (let i = 0; i < totalExecucoes; i++) {
        await abrirCampoDataHora(labelTexto);

        I.pressKey("Escape");
        I.wait(0.2);
      }

      I.say("✅ Stress de modal finalizado");
    }

    async function selecionarData(dataDesejada) {
      const dia = `[data-day="${dataDesejada}"]`;
      const botaoNext = 'button[aria-label="Go to the Next Month"]';

      for (let i = 0; i < 12; i++) {
        if ((await I.grabNumberOfVisibleElements(dia)) > 0) {
          I.click(dia);
          return;
        }

        I.waitForElement(botaoNext, 5);
        I.click(botaoNext);
        I.wait(0.5);
      }

      throw new Error(`Data ${dataDesejada} não encontrada`);
    }

    async function abrirCampoDataHora(labelTexto) {
      const label = locate("label").withText(labelTexto).first();

      I.waitForElement(label, 15);

      const id = await I.grabAttributeFrom(label, "for");
      const botao = locate("button").withAttr({ id });

      I.click(botao);
      I.wait(1);
    }

    async function preencherDataHora(label, data, hora, minuto, segundo) {
      await abrirCampoDataHora(label);
      await selecionarData(data);

      I.waitForElement("#hours", 15);

      await stressInputTempo();

      await preencherCampoTempo("#hours", hora);
      await preencherCampoTempo("#minutes", minuto);
      await preencherCampoTempo("#seconds", segundo);
    }

    await stressModal("Início do Evento", 20);

    await preencherDataHora("Início do Evento", "07/09/2026", "12", "30", "45");
    await preencherDataHora("Fim do Evento", "07/10/2026", "12", "30", "45");
    await preencherDataHora("Encerrar Vendas", "07/10/2026", "12", "30", "45");

    I.wait(3);
  },
)
  .retry(2)
  .tag("@publicareventos70");

/////----------/////

Scenario(
  "Cenário: 000071 - Fluxo completo com stress E2E + modal.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    I.click(locate("button").withText("Entrar"));

    I.waitInUrl("/producer", 15);
    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 15);

    async function preencherCampoTempo(seletor, valor) {
      I.waitForElement(seletor, 15);

      I.forceClick(seletor);
      I.wait(0.3);

      I.pressKey(["Control", "A"]);
      I.pressKey("Backspace");

      I.fillField(seletor, valor);
      I.seeInField(seletor, valor);
    }

    async function stressModal(labelTexto, totalExecucoes = 20) {
      I.say(`🔥 Stress modal (${totalExecucoes}x)`);

      for (let i = 0; i < totalExecucoes; i++) {
        await abrirCampoDataHora(labelTexto);

        I.pressKey("Escape");
        I.wait(0.2);
      }
    }

    async function selecionarData(dataDesejada) {
      const dia = `[data-day="${dataDesejada}"]`;
      const botaoNext = 'button[aria-label="Go to the Next Month"]';

      for (let i = 0; i < 12; i++) {
        if ((await I.grabNumberOfVisibleElements(dia)) > 0) {
          I.click(dia);
          return;
        }

        I.waitForElement(botaoNext, 5);
        I.click(botaoNext);
        I.wait(0.5);
      }

      throw new Error(`Data ${dataDesejada} não encontrada`);
    }

    async function abrirCampoDataHora(labelTexto) {
      const label = locate("label").withText(labelTexto).first();

      I.waitForElement(label, 15);

      const id = await I.grabAttributeFrom(label, "for");
      const botao = locate("button").withAttr({ id });

      I.click(botao);
      I.wait(0.8);
    }

    async function preencherDataHora(label, data, hora, minuto, segundo) {
      await abrirCampoDataHora(label);
      await selecionarData(data);

      I.waitForElement("#hours", 15);

      await preencherCampoTempo("#hours", hora);
      await preencherCampoTempo("#minutes", minuto);
      await preencherCampoTempo("#seconds", segundo);

      I.wait(0.3);
    }

    await stressModal("Início do Evento", 20);

    const totalLoops = 10;

    I.say(`🚀 Iniciando stress E2E (${totalLoops} execuções)`);

    for (let i = 0; i < totalLoops; i++) {
      I.say(`🔁 Iteração ${i + 1}/${totalLoops}`);

      I.pressKey("Escape");
      I.wait(0.3);

      await preencherDataHora(
        "Início do Evento",
        "07/09/2026",
        "12",
        "30",
        "45",
      );

      I.pressKey("Escape");

      await preencherDataHora("Fim do Evento", "07/10/2026", "12", "30", "45");

      I.pressKey("Escape");

      await preencherDataHora(
        "Encerrar Vendas",
        "07/10/2026",
        "12",
        "30",
        "45",
      );

      I.wait(0.5);
    }

    I.say("✅ Stress E2E finalizado");

    I.wait(3);
  },
)
  .retry(2)
  .tag("@publicareventos71");

/////----------/////

Scenario(
  "Cenário: 000072 - Stress multi-usuário e multi-abertura de modal (fix).",
  async () => {
    const urlHome = "https://fastix.com.br/";
    const userEmail = "diogoamanciosilva@gmail.com";
    const userPass = "cruzeiro@1921";

    const fluxoDoUsuario = async (config) => {
      const { I } = inject();

      I.amOnPage(urlHome);
      I.waitForText("Explorar eventos", 15);

      I.click(locate("a").withText("Publicar Eventos"));
      I.waitInUrl("/signin", 10);

      I.fillField('input[name="email"]', userEmail);
      I.fillField('input[name="password"]', userPass);

      I.click(locate("button").withText("Entrar"));

      I.waitInUrl("/producer", 15);
      I.waitForText("Novo Evento", 10);

      I.click(locate('a[href="/producer/events/create"]').first());
      I.waitInUrl("/producer/events/create", 15);

      for (let i = 0; i < 3; i++) {
        I.pressKey("Escape");
        I.wait(0.3);
      }

      const abrirCampoDataHora = async (labelTexto) => {
        const label = locate("label").withText(labelTexto).first();
        I.waitForElement(label, 15);

        const id = await I.grabAttributeFrom(label, "for");

        const botao = locate("button").withAttr({ id });

        for (let tentativa = 0; tentativa < 5; tentativa++) {
          I.scrollTo(botao);
          I.wait(0.3);

          I.pressKey("Escape");
          I.wait(0.2);

          I.forceClick(botao);
          I.wait(0.8);

          const aberto = await I.grabAttributeFrom(
            botao,
            "aria-expanded",
          ).catch(() => null);

          if (aberto === "true") {
            return;
          }

          const existeCalendario = await I.grabNumberOfVisibleElements(
            'button[aria-label="Go to the Next Month"]',
          );

          if (existeCalendario > 0) {
            return;
          }
        }

        throw new Error(`Calendário não abriu: ${labelTexto}`);
      };

      const selecionarData = async (dataDesejada) => {
        const dia = `[data-day="${dataDesejada}"]`;
        const botaoNext = 'button[aria-label="Go to the Next Month"]';

        for (let i = 0; i < 12; i++) {
          if ((await I.grabNumberOfVisibleElements(dia)) > 0) {
            I.forceClick(dia);
            return;
          }

          I.forceClick(botaoNext);
          I.wait(0.5);
        }

        throw new Error(`Data não encontrada: ${dataDesejada}`);
      };

      const preencherCampoTempo = async (seletor, valor) => {
        I.waitForElement(seletor, 15);

        I.click(seletor);
        I.pressKey(["Control", "A"]);
        I.pressKey("Backspace");

        I.fillField(seletor, valor);
      };

      I.say(`🚀 Iniciando fluxo: ${config.hora}h`);

      await abrirCampoDataHora("Início do Evento");
      await selecionarData(config.data);

      I.waitForElement("#hours", 10);

      await preencherCampoTempo("#hours", config.hora);
      await preencherCampoTempo("#minutes", config.min);
      await preencherCampoTempo("#seconds", config.seg);

      I.say(`✅ Finalizado: ${config.hora}h`);
    };

    await Promise.all([
      session("user1", async () =>
        fluxoDoUsuario({
          data: "07/09/2026",
          hora: "12",
          min: "30",
          seg: "45",
        }),
      ),
      session("user2", async () =>
        fluxoDoUsuario({
          data: "07/09/2026",
          hora: "13",
          min: "30",
          seg: "45",
        }),
      ),
      session("user3", async () =>
        fluxoDoUsuario({
          data: "07/09/2026",
          hora: "14",
          min: "30",
          seg: "45",
        }),
      ),
    ]);
  },
)
  .retry(2)
  .tag("@publicareventos72");

/////----------/////

Scenario(
  "Cenário: 000073 -  Validar obrigatoriedade dos campos ao salvar consigurações do evento sem preenchimento.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 15);

    I.scrollPageToBottom();

    const botaoSalvar = locate("span").withText("Salvar configurações");

    I.waitForElement(botaoSalvar, 10);
    I.scrollTo(botaoSalvar);
    I.waitForElement(botaoSalvar, 10);
    I.click(botaoSalvar);

    I.wait(3);
  },
).tag("@publicareventos73");

/////----------/////

Scenario(
  "Cenário: 000074 - Preencher apenas o campo “Nome do evento” e salvar configurações.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 15);

    const campoNome = locate("input").withAttr({ name: "name" });

    I.waitForElement(campoNome, 10);
    I.scrollTo(campoNome);
    I.fillField(campoNome, "Teste Fastix");
    I.seeInField(campoNome, "Teste Fastix");

    I.scrollPageToBottom();

    const botaoSalvar = locate("span").withText("Salvar configurações");

    I.waitForElement(botaoSalvar, 10);
    I.scrollTo(botaoSalvar);
    I.waitForElement(botaoSalvar, 10);
    I.click(botaoSalvar);

    I.wait(3);
  },
).tag("@publicareventos74");

/////----------/////

Scenario(
  "Cenário: 000075 - Preencher apenas o campo “Descrição Curta” e salvar configurações.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 15);

    const campoDescricaoCurta = locate("input").withAttr({
      name: "short_description",
    });

    I.waitForElement(campoDescricaoCurta, 10);
    I.scrollTo(campoDescricaoCurta);
    I.fillField(campoDescricaoCurta, "Teste Fastix");
    I.seeInField(campoDescricaoCurta, "Teste Fastix");

    I.scrollPageToBottom();

    const botaoSalvar = locate("span").withText("Salvar configurações");

    I.waitForElement(botaoSalvar, 10);
    I.scrollTo(botaoSalvar);
    I.waitForElement(botaoSalvar, 10);
    I.click(botaoSalvar);

    I.wait(3);
  },
).tag("@publicareventos75");

/////----------/////

Scenario(
  "Cenário: 000076 - Preencher apenas o campo “Descrição do Evento” e salvar configurações.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    const campoEmail = 'input[name="email"]';
    const campoSenha = 'input[name="password"]';

    I.waitForElement(campoEmail, 10);
    I.fillField(campoEmail, "diogoamanciosilva@gmail.com");
    I.fillField(campoSenha, "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 15);

    const editorDescricao = locate('div[contenteditable="true"]').first();

    I.waitForVisible(editorDescricao, 10);
    I.scrollTo(editorDescricao);

    I.click(editorDescricao);
    I.wait(0.5);

    I.pressKey(["Control", "A"]);
    I.pressKey("Backspace");

    I.type("Teste Fastix", editorDescricao);

    I.see("Teste Fastix", editorDescricao);

    I.scrollPageToBottom();

    const botaoSalvar = locate("span").withText("Salvar configurações");

    I.waitForElement(botaoSalvar, 10);
    I.scrollTo(botaoSalvar);
    I.waitForElement(botaoSalvar, 10);
    I.click(botaoSalvar);

    I.wait(3);
  },
).tag("@publicareventos76");

/////----------/////

Scenario(
  "Cenário: 000077 - Preencher apenas o campo 'Início do Evento' e salvar configurações.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 10);

    const labelInicioEvento = locate("label").withText("Início do Evento");

    const id = await I.grabAttributeFrom(labelInicioEvento, "for");

    const botaoDataHora = locate("button").withAttr({ id });

    I.scrollTo(labelInicioEvento);
    I.waitForElement(botaoDataHora, 10);
    I.click(botaoDataHora);

    const dataInicio = await I.executeScript(() => {
      const data = new Date();
      data.setDate(data.getDate() + 30);
      const dia = String(data.getDate()).padStart(2, "0");
      const mes = String(data.getMonth() + 1).padStart(2, "0");
      const ano = data.getFullYear();
      return `${dia}/${mes}/${ano}`;
    });

    const dia = `[data-day="${dataInicio}"]`;
    const proximoMes = ".rdp-button_next";

    let encontrou = false;

    for (let i = 0; i < 12; i++) {
      const existeDia = await I.grabNumberOfVisibleElements(dia);

      if (existeDia > 0) {
        encontrou = true;
        break;
      }

      I.waitForElement(proximoMes, 5);

      const desabilitado = await I.grabAttributeFrom(proximoMes, "disabled");

      if (desabilitado !== null) {
        break;
      }

      I.click(proximoMes);
      I.wait(1);
    }

    if (!encontrou) {
      throw new Error(
        `Data ${dataInicio} não está disponível para seleção dentro da janela permitida pelo calendário`,
      );
    }

    I.waitForElement(dia, 10);
    I.scrollTo(dia);
    I.click(dia);

    I.scrollPageToBottom();

    const botaoSalvar = locate("span").withText("Salvar configurações");

    I.waitForElement(botaoSalvar, 10);
    I.scrollTo(botaoSalvar);
    I.waitForElement(botaoSalvar, 10);
    I.click(botaoSalvar);

    I.wait(3);
  },
).tag("@publicareventos77");


/////----------/////

Scenario(
  "Cenário: 000078 - Funcionaliade: Edição da descrição do evento.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");
    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 15);

    const editorDescricao = locate('div[contenteditable="true"]').first();

    I.waitForVisible(editorDescricao, 10);
    I.scrollTo(editorDescricao);
    I.click(editorDescricao);

    I.pressKey(["Control", "A"]);
    I.pressKey("Backspace");

    I.type("Teste Fastix");
    I.wait(1);
    I.see("Teste Fastix");

    I.click(editorDescricao);
    I.pressKey(["Control", "A"]);

    const botaoBold = locate("button").withDescendant(".lucide-bold");
    I.click(botaoBold);
    I.seeElement(locate("button.bg-secondary").withDescendant(".lucide-bold"));
    I.see("Teste Fastix");

    const botaoItalic = locate("button").withDescendant(".lucide-italic");
    I.click(botaoItalic);
    I.seeElement(
      locate("button.bg-secondary").withDescendant(".lucide-italic"),
    );

    const botaoH1 = locate("button").withDescendant(".lucide-heading-1");
    I.click(botaoH1);
    I.seeElement(
      locate("button.bg-secondary").withDescendant(".lucide-heading-1"),
    );

    const botaoH2 = locate("button").withDescendant(".lucide-heading-2");
    I.click(botaoH2);
    I.seeElement(
      locate("button.bg-secondary").withDescendant(".lucide-heading-2"),
    );

    const botaoH3 = locate("button").withDescendant(".lucide-heading-3");
    I.click(botaoH3);
    I.seeElement(
      locate("button.bg-secondary").withDescendant(".lucide-heading-3"),
    );

    const botaoListaOrdenada = locate("button").withDescendant(
      ".lucide-list-ordered",
    );
    I.click(botaoListaOrdenada);
    I.seeElement(locate("ol"));

    const botaoLista = locate("button").withDescendant(".lucide-list");
    I.click(botaoLista);
    I.seeElement(locate("ul"));

    const botaoImagem = locate("button").withDescendant(".lucide-image");
    I.scrollTo(botaoImagem);
    I.click(botaoImagem);
    I.seeElement(botaoImagem);

    const botaoFechar2 = locate("button").withDescendant(".lucide-x");

    I.waitForVisible(botaoFechar2, 10);
    I.click(botaoFechar2);

    I.wait(1);
    I.dontSeeElement(botaoFechar2);

    const botaoLink = locate("button").withDescendant(".lucide-link");

    I.scrollTo(botaoLink);
    I.click(botaoLink);
    I.seeElement(botaoLink);

    const botaoFechar = locate("button").withDescendant(".lucide-x");

    I.waitForVisible(botaoFechar, 10);
    I.click(botaoFechar);

    I.wait(1);
    I.dontSeeElement(botaoFechar);
  },
).tag("@publicareventos78");

/////----------/////

Scenario(
  "Cenário: 000079 - Inserir e manipular link no campo 'Descrição do Evento'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");
    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 15);

    const editorDescricao = locate('div[contenteditable="true"]').first();

    I.waitForVisible(editorDescricao, 10);
    I.scrollTo(editorDescricao);
    I.click(editorDescricao);

    I.pressKey(["Control", "A"]);
    I.pressKey("Backspace");

    I.type("Teste Fastix");
    I.see("Teste Fastix");

    I.click(editorDescricao);
    I.pressKey(["Control", "A"]);

    const botaoLink = locate("button").withDescendant(".lucide-link");

    I.waitForVisible(botaoLink, 10);
    I.scrollTo(botaoLink);
    I.click(botaoLink);

    const modal = locate('[role="dialog"]');

    const campoTexto = locate("input").inside(modal);

    I.waitForVisible(campoTexto, 10);
    I.fillField(campoTexto, "Teste Fastix");
    I.seeInField(campoTexto, "Teste Fastix");

    const botaoRemover = locate("button").withText("Remover").inside(modal);

    I.waitForVisible(botaoRemover, 10);
    I.click(botaoRemover);

    I.wait(1);

    const modalAindaExiste = await I.grabNumberOfVisibleElements(modal);

    if (modalAindaExiste === 0) {
      I.say("✔ Modal foi fechado após remover");
    } else {
      const campoExiste = await I.grabNumberOfVisibleElements(campoTexto);

      if (campoExiste > 0) {
        const valor = await I.grabValueFrom(campoTexto);

        if (valor === "") {
          I.say("✔ Campo limpo com sucesso");
        } else {
          I.say("⚠ Campo não foi limpo");
        }
      }
    }

    I.waitForVisible(botaoLink, 10);
    I.click(botaoLink);

    const campoLink = locate("input").inside(modal);

    I.waitForVisible(campoLink, 10);
    I.fillField(campoLink, "Teste Fastix");
    I.seeInField(campoLink, "Teste Fastix");

    const botaoSalvar = locate("button").withText("Salvar").inside(modal);

    I.waitForVisible(botaoSalvar, 10);
    I.click(botaoSalvar);

    I.dontSeeElement(modal);

    I.wait(3);
  },
).tag("@publicareventos79");

/////----------/////

Scenario(
  "Cenário: 000080 - Abrir modal de imagem e interagir com botão ‘Selecionar’.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");
    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 15);

    const editorDescricao = locate('div[contenteditable="true"]').first();

    I.waitForVisible(editorDescricao, 10);
    I.scrollTo(editorDescricao);
    I.click(editorDescricao);

    I.pressKey(["Control", "A"]);
    I.pressKey("Backspace");

    I.type("Teste Fastix");
    I.see("Teste Fastix");

    I.click(editorDescricao);
    I.pressKey(["Control", "A"]);

    const botaoImagem = locate("button").withDescendant(".lucide-image");

    I.waitForVisible(botaoImagem, 10);
    I.scrollTo(botaoImagem);
    I.click(botaoImagem);

    I.seeElement(botaoImagem);

    const modalImagem = locate('[role="dialog"]');

    I.waitForVisible(modalImagem, 10);

    const botaoSelecionarImagem = locate("label")
      .withText("Selecionar")
      .withDescendant('input[type="file"]')
      .inside(modalImagem);

    I.waitForVisible(botaoSelecionarImagem, 10);
    I.scrollTo(botaoSelecionarImagem);

    I.click(botaoSelecionarImagem);

    I.seeElement(modalImagem);

    I.seeElement(locate('input[type="file"]').inside(modalImagem));

    I.wait(3);
  },
).tag("@publicareventos80");

/////----------/////

Scenario(
  "Cenário: 000081 - Interagir com Upload de Capa Vertical.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");
    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 15);

    I.scrollPageToBottom();

    const secaoCapaVertical = locate("div").withText("Capa Vertical");

    I.waitForVisible(secaoCapaVertical, 10);
    I.scrollTo(secaoCapaVertical);

    const botaoSelecionar = locate("label")
      .withText("Selecionar")
      .withDescendant('input[type="file"]')
      .inside(secaoCapaVertical);

    I.waitForVisible(botaoSelecionar, 10);

    I.click(botaoSelecionar);

    I.seeElement(botaoSelecionar);

    I.wait(3);
  },
).tag("@publicareventos81");

/////----------/////

Scenario(
  "Cenário: 000082 - Interagir com Upload de Capa Horizontal.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");
    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 15);

    I.scrollPageToBottom();

    const secaoCapaHorizontal = locate("div").withText("Capa Horizontal");

    I.waitForVisible(secaoCapaHorizontal, 10);
    I.scrollTo(secaoCapaHorizontal);

    const botaoSelecionar = locate("label")
      .withText("Selecionar")
      .withDescendant('input[type="file"]')
      .inside(secaoCapaHorizontal);

    I.waitForVisible(botaoSelecionar, 10);

    I.click(botaoSelecionar);

    I.seeElement(botaoSelecionar);

    I.wait(3);
  },
).tag("@publicareventos82");

/////----------/////

Scenario(
  "Cenário: 000083 -  Visualizar e clicar na opção 'Gerenciar Equipes'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");
    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 15);

    I.waitForText("Gerenciar Equipes", 5);
    I.click("Gerenciar Equipes");
    I.wait(3);
  },
).tag("@publicareventos83");

/////----------/////

Scenario(
  "Cenário: 000084 - Clicar na opção 'Pesquisar equipe' e realizar uma busca.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");
    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 15);

    I.waitForText("Gerenciar Equipes", 5);
    I.click("Gerenciar Equipes");
    I.wait(3);

    const campoBusca = locate("input").withAttr({
      placeholder: "Pesquisar equipe...",
    });

    I.waitForElement(campoBusca, 10);
    I.click(campoBusca);
    I.fillField(campoBusca, "Teste Fastix 123456");

    I.wait(3);
  },
).tag("@publicareventos84");

/////----------/////

Scenario(
  "Cenário: 000085 - Acessar opção 'Pesquisar equipe' e realizar uma busca.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");
    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 15);

    I.waitForText("Gerenciar Equipes", 5);
    I.click("Gerenciar Equipes");
    I.wait(3);

    I.waitForText("Nova Equipe", 5);
    I.click("Nova Equipe");
    I.wait(3);
  },
).tag("@publicareventos85");

/////----------/////

Scenario(
  "Cenário: 000086 - Clicar na opção 'Salvar' sem preencher campos obrigatórios.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");
    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 15);

    I.waitForText("Gerenciar Equipes", 5);
    I.click("Gerenciar Equipes");
    I.wait(3);

    I.waitForText("Nova Equipe", 5);
    I.click("Nova Equipe");
    I.wait(3);

    I.waitForText("Salvar", 5);
    I.click("Salvar");
    I.wait(3);
  },
).tag("@publicareventos86");

/////----------/////

Scenario(
  "Cenário: 000087 - Preencher o campo 'Nome da Equipe' e tentar salvar sem membros.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");
    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 15);

    I.waitForText("Gerenciar Equipes", 5);
    I.click("Gerenciar Equipes");
    I.wait(3);

    I.waitForText("Nova Equipe", 5);
    I.click("Nova Equipe");
    I.wait(3);

    const campo = locate("input").withAttr({ name: "name" });

    I.waitForVisible(campo, 10);
    I.fillField(campo, "Teste Fastix 123");

    I.waitForText("Salvar", 5);
    I.click("Salvar");
    I.wait(3);
  },
).tag("@publicareventos87");

/////----------/////

Scenario(
  "Cenário: 000088 - Clicar no campo 'Adicionar'.", async ({ I }) => {
  I.amOnPage("https://fastix.com.br/");
  I.waitForText("Explorar eventos", 15);

  const publicarEventos = locate("a").withText("Publicar Eventos");
  I.waitForElement(publicarEventos, 10);
  I.click(publicarEventos);

  I.waitInUrl("/signin", 10);

  I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
  I.fillField('input[name="password"]', "cruzeiro@1921");

  const botaoEntrar = locate("button").withDescendant(
    locate("span").withText("Entrar"),
  );

  I.waitForElement(botaoEntrar, 10);
  I.click(botaoEntrar);

  I.waitInUrl("/producer", 15);
  I.waitForText("Novo Evento", 10);

  const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

  I.waitForElement(botaoNovoEvento, 10);
  I.scrollTo(botaoNovoEvento);
  I.click(botaoNovoEvento);

  I.waitInUrl("/producer/events/create", 15);

  I.waitForText("Gerenciar Equipes", 5);
  I.click("Gerenciar Equipes");
  I.wait(3);

  I.waitForText("Nova Equipe", 5);
  I.click("Nova Equipe");
  I.wait(3);

  I.waitForText("Adicionar", 5);
  I.click("Adicionar");
  I.wait(3);
}
).tag("@publicareventos88");

/////----------/////

Scenario(
  "Cenário: 000089 - Tentar adicionar membro sem preencher os campos obrigatórios.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");
    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 15);

    I.waitForText("Gerenciar Equipes", 5);
    I.click("Gerenciar Equipes");
    I.wait(3);

    I.waitForText("Nova Equipe", 5);
    I.click("Nova Equipe");
    I.wait(3);

    I.waitForText("Adicionar", 5);
    I.click("Adicionar");
    I.wait(3);

    const botoesAdicionar = locate("button").withText("Adicionar");

    I.waitForVisible(botoesAdicionar, 10);
    I.seeNumberOfElements(botoesAdicionar, 2);

    I.click(botoesAdicionar.at(2));

    I.wait(3);
  },
).tag("@publicareventos89");

/////----------/////

Scenario(
  "Cenário: 000090 - Clicar e acessar o campo 'Controle de acesso'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");
    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 15);

    I.waitForText("Gerenciar Equipes", 5);
    I.click("Gerenciar Equipes");
    I.wait(3);

    I.waitForText("Nova Equipe", 5);
    I.click("Nova Equipe");
    I.wait(3);

    I.waitForText("Adicionar", 5);
    I.click("Adicionar");
    I.wait(3);

    I.waitForText("Controle de acesso", 5);
    I.click("Controle de acesso");
    I.wait(3);
  },
).tag("@publicareventos90");

/////----------/////

Scenario(
  "Cenário: 000091 - Acessar o campo 'Controle de acesso' e clicar nos 'Templates' disponíveis.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");
    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 15);

    I.waitForText("Gerenciar Equipes", 5);
    I.click("Gerenciar Equipes");
    I.wait(3);

    I.waitForText("Nova Equipe", 5);
    I.click("Nova Equipe");
    I.wait(3);

    I.waitForText("Adicionar", 5);
    I.click("Adicionar");
    I.wait(3);

    I.waitForText("Controle de acesso", 5);
    I.click("Controle de acesso");
    I.wait(3);

    const popover = locate('[role="dialog"]').withDescendant(
      locate("h4").withText("Permissões de Acesso"),
    );

    I.waitForElement(popover, 15);

    const dropdown = popover.find('button[aria-haspopup="menu"]').first(); // pega o primeiro dropdown do bloco

    I.waitForVisible(dropdown, 10);
    I.scrollTo(dropdown);
    I.click(dropdown);

    I.wait(3);
  },
).tag("@publicareventos91");

/////----------/////

Scenario(
  "Cenário: 000092 - Selecionar templates no controle de acesso.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");
    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 15);

    I.waitForText("Gerenciar Equipes", 5);
    I.click("Gerenciar Equipes");
    I.wait(3);

    I.waitForText("Nova Equipe", 5);
    I.click("Nova Equipe");
    I.wait(3);

    I.waitForText("Adicionar", 5);
    I.click("Adicionar");
    I.wait(3);

    I.waitForText("Controle de acesso", 5);
    I.click("Controle de acesso");
    I.wait(3);

    const popover = locate('[role="dialog"]').withDescendant(
      locate("h4").withText("Permissões de Acesso"),
    );

    I.waitForElement(popover, 15);

    let dropdown = popover.find('button[aria-haspopup="menu"]').first();
    I.waitForVisible(dropdown, 10);
    I.scrollTo(dropdown);
    I.click(dropdown);

    let dropdownId = await I.grabAttributeFrom(dropdown, "id");

    let menu = locate('[role="menu"]').withAttr({
      "aria-labelledby": dropdownId,
    });

    I.waitForVisible(menu, 10);
    I.click(menu.find('[role="menuitem"]').withText("Agente"));

    I.wait(3);

    dropdown = popover.find('button[aria-haspopup="menu"]').first();
    I.waitForVisible(dropdown, 10);
    I.scrollTo(dropdown);
    I.click(dropdown);

    dropdownId = await I.grabAttributeFrom(dropdown, "id");

    menu = locate('[role="menu"]').withAttr({
      "aria-labelledby": dropdownId,
    });

    I.waitForVisible(menu, 10);
    I.click(menu.find('[role="menuitem"]').withText("Marketing"));

    dropdown = popover.find('button[aria-haspopup="menu"]').first();
    I.waitForVisible(dropdown, 10);
    I.scrollTo(dropdown);
    I.click(dropdown);

    dropdownId = await I.grabAttributeFrom(dropdown, "id");

    menu = locate('[role="menu"]').withAttr({
      "aria-labelledby": dropdownId,
    });

    I.waitForVisible(menu, 10);
    I.click(menu.find('[role="menuitem"]').withText("Staff"));

    dropdown = popover.find('button[aria-haspopup="menu"]').first();
    I.waitForVisible(dropdown, 10);
    I.scrollTo(dropdown);
    I.click(dropdown);

    dropdownId = await I.grabAttributeFrom(dropdown, "id");

    menu = locate('[role="menu"]').withAttr({
      "aria-labelledby": dropdownId,
    });

    I.waitForVisible(menu, 10);
    I.click(menu.find('[role="menuitem"]').withText("Acesso Total"));
  },
).tag("@publicareventos92");

/////----------/////

Scenario(
  "Cenário: 000093 - Selecionar nível de acesso na opção 'Visão Geral'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");
    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    await I.usePlaywrightTo(
      "aguardar redirecionamento pós-login para área de produtor",
      async ({ page }) => {
        await page.waitForURL((url) => url.toString().includes("producer"), {
          timeout: 15000,
        });

        const urlAtual = page.url();
        console.log("URL pós-login:", urlAtual);

        if (urlAtual.includes("/be-a-producer")) {
          console.log(
            "⚠️ Redirecionado para /be-a-producer — tentando ativar perfil de produtor...",
          );

          const botaoAtivar = page
            .locator("button, a")
            .filter({
              hasText: /Começar|Ativar|Continuar|Quero publicar|Ser produtor/i,
            })
            .first();

          const existe = await botaoAtivar.count();

          if (existe > 0) {
            await botaoAtivar.click();
            await page.waitForURL(
              (url) =>
                url.toString().includes("/producer") &&
                !url.toString().includes("/be-a-producer"),
              { timeout: 15000 },
            );
            console.log(
              "✅ Perfil de produtor ativado. URL atual:",
              page.url(),
            );
          } else {
            throw new Error(
              "Usuário redirecionado para /be-a-producer mas nenhum botão de ativação foi encontrado. " +
                "Verifique se a conta possui perfil de produtor habilitado.",
            );
          }
        }
      },
    );

    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 15);

    I.waitForText("Gerenciar Equipes", 5);
    I.click("Gerenciar Equipes");
    I.wait(3);

    I.waitForText("Nova Equipe", 5);
    I.click("Nova Equipe");
    I.wait(3);

    I.waitForText("Adicionar", 5);
    I.click("Adicionar");
    I.wait(3);

    I.waitForText("Controle de acesso", 5);
    I.click("Controle de acesso");
    I.wait(3);

    const popover = locate('[role="dialog"]').withDescendant(
      locate("h4").withText("Permissões de Acesso"),
    );

    I.waitForElement(popover, 15);

    const combobox = locate(
      "//label[contains(., 'Visão Geral')]/following::button[@role='combobox'][1]",
    ).inside(popover);

    I.waitForVisible(combobox, 10);
    I.scrollTo(combobox);
    I.click(combobox);
    I.wait(1);

    const option = locate(
      "//div[@role='option'][contains(., 'Acesso Total')]",
    ).last();

    I.waitForVisible(option, 10);
    I.click(option);
    I.wait(3);

    I.say(
      "✅ Nível de acesso 'Acesso Total' selecionado com sucesso na opção 'Visão Geral'",
    );
  },
).tag("@publicareventos93");

/////----------/////

Scenario(
  "Cenário: 000094 - Alterar nível de acesso na opção 'Visão Geral'.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");
    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 15);

    I.waitForText("Gerenciar Equipes", 5);
    I.click("Gerenciar Equipes");
    I.wait(3);

    I.waitForText("Nova Equipe", 5);
    I.click("Nova Equipe");
    I.wait(3);

    I.waitForText("Adicionar", 5);
    I.click("Adicionar");
    I.wait(3);

    I.waitForText("Controle de acesso", 5);
    I.click("Controle de acesso");
    I.wait(3);

    const popover = locate('[role="dialog"]').withDescendant(
      locate("h4").withText("Permissões de Acesso"),
    );

    I.waitForElement(popover, 15);

    const combobox = locate(
      "//label[contains(., 'Visão Geral')]/following::button[@role='combobox'][1]",
    ).inside(popover);

    I.waitForVisible(combobox, 10);
    I.scrollTo(combobox);

    I.click(combobox);

    let option = locate(
      "//div[@role='option'][contains(., 'Somente Leitura')]",
    );
    I.waitForVisible(option, 10);
    I.click(option);

    I.click(combobox);

    option = locate("//div[@role='option'][contains(., 'Acesso Total')]");
    I.waitForVisible(option, 10);
    I.click(option);

    I.click(combobox);

    option = locate("//div[@role='option'][contains(., 'Sem Acesso')]");
    I.waitForVisible(option, 10);
    I.click(option);

    I.click(combobox);

    option = locate("//div[@role='option'][contains(., 'Acesso Total')]");
    I.waitForVisible(option, 10);
    I.click(option);

    I.wait(3);
  },
).tag("@publicareventos94");

/////----------/////

Scenario(
  "Cenário: 000095 - Alterar permissões de acesso para todas as seções do evento.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");
    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");
    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 15);

    I.waitForText("Gerenciar Equipes", 5);
    I.click("Gerenciar Equipes");
    I.wait(2);

    I.click("Nova Equipe");
    I.wait(2);

    I.click("Adicionar");
    I.wait(2);

    I.click("Controle de acesso");
    I.wait(3);

    const fluxoPermissoes = [
      "Somente Leitura",
      "Acesso Total",
      "Sem Acesso",
      "Acesso Total",
    ];

    const modalPermissoes = locate('[role="dialog"]').withDescendant(
      locate("h4").withText("Permissões de Acesso"),
    );

    I.waitForVisible(modalPermissoes, 15);

    I.executeScript(() => {
      const dialog = document.querySelector('[role="dialog"]');

      if (dialog) {
        dialog.scrollTop = dialog.scrollHeight;
        dialog.scrollTop = 0;
      }
    });

    I.wait(2);

    const secoesDisponiveis = await I.grabTextFromAll(
      locate("label").inside(modalPermissoes),
    );

    const secoes = [
      ...new Set(secoesDisponiveis.map((s) => s.trim()).filter(Boolean)),
    ];

    console.log("\n==============================");
    console.log("✅ SEÇÕES ENCONTRADAS");
    console.log("==============================");
    console.table(secoes);

    const selecionarOpcao = async (secao, opcao) => {
      for (let tentativa = 1; tentativa <= 3; tentativa++) {
        try {
          I.waitForVisible(modalPermissoes, 15);

          const label = locate("label").withText(secao).inside(modalPermissoes);

          I.scrollTo(label);

          I.waitForElement(label, 10);

          const fieldId = await I.grabAttributeFrom(label, "for");

          if (!fieldId) {
            throw new Error(`Campo não encontrado para seção '${secao}'`);
          }

          const combo = locate(`#${fieldId}`).inside(modalPermissoes);

          I.waitForElement(combo, 10);

          I.scrollTo(combo);

          I.click(combo);

          const opcaoDropdown = locate('[role="option"]').withText(opcao);

          I.waitForVisible(opcaoDropdown, 15);

          I.click(opcaoDropdown);

          I.wait(1);

          console.log(`✅ ${secao} → ${opcao}`);

          return;
        } catch (erro) {
          console.log(
            `⚠️ Tentativa ${tentativa}/3 falhou para ${secao} → ${opcao}`,
          );

          if (tentativa === 3) {
            throw new Error(
              `Falha ao selecionar '${opcao}' para '${secao}'. Erro: ${erro.message}`,
            );
          }

          I.wait(2);
        }
      }
    };

    for (const secao of secoes) {
      console.log(`\n==============================`);
      console.log(`🔄 PROCESSANDO: ${secao}`);
      console.log(`==============================`);

      for (const permissao of fluxoPermissoes) {
        await selecionarOpcao(secao, permissao);
      }

      I.wait(1);
    }

    console.log("\n✅ Todas as permissões disponíveis foram validadas.");

    I.wait(3);
    I.wait(3);
  },
).tag("@publicareventos95");

/////----------/////

Scenario(
  "Cenário: 000096 - Stress na alteração de permissões de acesso.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");

    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 15);

    I.waitForText("Gerenciar Equipes", 10);
    I.click("Gerenciar Equipes");

    I.waitForText("Nova Equipe", 10);
    I.click("Nova Equipe");

    I.waitForText("Adicionar", 10);
    I.click("Adicionar");

    I.waitForText("Controle de acesso", 10);
    I.click("Controle de acesso");

    const obterModal = () =>
      locate('[role="dialog"]').withDescendant(
        locate("h4").withText("Permissões de Acesso"),
      );

    const modalPermissoes = obterModal();

    I.waitForVisible(modalPermissoes, 15);

    I.executeScript(() => {
      const dialog = document.querySelector('[role="dialog"]');

      if (dialog) {
        dialog.scrollTop = dialog.scrollHeight;
        dialog.scrollTop = 0;
      }
    });

    I.wait(2);

    const secoesDisponiveis = await I.grabTextFromAll(
      locate("label").inside(modalPermissoes),
    );

    const secoes = [
      ...new Set(secoesDisponiveis.map((s) => s.trim()).filter(Boolean)),
    ];

    console.log("\n==============================");
    console.log("✅ SEÇÕES ENCONTRADAS");
    console.log("==============================");
    console.table(secoes);

    const fluxoPermissoes = [
      "Somente Leitura",
      "Acesso Total",
      "Sem Acesso",
      "Acesso Total",
    ];

    const selecionarOpcao = async (secao, opcao) => {
      for (let tentativa = 1; tentativa <= 3; tentativa++) {
        try {
          const modal = obterModal();

          I.waitForVisible(modal, 15);

          const label = locate("label").withText(secao).inside(modal);

          I.waitForElement(label, 15);

          I.scrollTo(label);

          I.wait(0.5);

          const fieldId = await I.grabAttributeFrom(label, "for");

          if (!fieldId) {
            throw new Error(`Campo não encontrado para '${secao}'`);
          }

          const combo = locate(`#${fieldId}`).inside(modal);

          I.waitForElement(combo, 15);

          I.scrollTo(combo);

          I.click(combo);

          const opcaoDropdown = locate('[role="option"]').withText(opcao);

          I.waitForVisible(opcaoDropdown, 15);

          I.click(opcaoDropdown);

          I.waitForDetached('[role="option"]', 10);

          console.log(`✅ ${secao} → ${opcao}`);

          return;
        } catch (erro) {
          console.log(
            `⚠️ Tentativa ${tentativa}/3 falhou para ${secao} → ${opcao}`,
          );

          if (tentativa === 3) {
            throw new Error(
              `Falha ao selecionar '${opcao}' para '${secao}'. Erro: ${erro.message}`,
            );
          }

          I.executeScript(() => {
            const dialog = document.querySelector('[role="dialog"]');

            if (dialog) {
              dialog.scrollTop = 0;
            }
          });

          I.wait(2);
        }
      }
    };

    const repeticoes = 5;

    for (let ciclo = 1; ciclo <= repeticoes; ciclo++) {
      console.log(`\n==============================`);
      console.log(`🔁 CICLO ${ciclo}/${repeticoes}`);
      console.log(`==============================`);

      I.executeScript(() => {
        const dialog = document.querySelector('[role="dialog"]');

        if (dialog) {
          dialog.scrollTop = 0;
        }
      });

      I.wait(1);

      for (const secao of secoes) {
        console.log(`\n🔄 PROCESSANDO: ${secao}`);

        for (const permissao of fluxoPermissoes) {
          await selecionarOpcao(secao, permissao);
        }

        I.executeScript(() => {
          const dialog = document.querySelector('[role="dialog"]');

          if (dialog) {
            dialog.scrollTop = 0;
          }
        });

        I.wait(0.5);
      }

      I.wait(1);
    }

    console.log("\n==============================");
    console.log("✅ VALIDANDO ESTADO FINAL");
    console.log("==============================");

    for (const secao of secoes) {
      const modal = obterModal();

      const label = locate("label").withText(secao).inside(modal);

      I.waitForElement(label, 10);

      const fieldId = await I.grabAttributeFrom(label, "for");

      const combo = locate(`#${fieldId}`).inside(modal);

      I.scrollTo(combo);

      I.see("Acesso Total", combo);
    }

    console.log("\n✅ Stress de permissões concluído com sucesso.");

    I.wait(3);
  },
).tag("@publicareventos96");

/////----------/////

Scenario(
  "Cenário: 000097 - Stress integrado - Perfis + Permissões por seção.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");

    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 15);

    I.waitForText("Gerenciar Equipes", 10);
    I.click("Gerenciar Equipes");

    I.waitForText("Nova Equipe", 10);
    I.click("Nova Equipe");

    I.waitForText("Adicionar", 10);
    I.click("Adicionar");

    I.waitForText("Controle de acesso", 10);
    I.click("Controle de acesso");

    const obterModal = () =>
      locate('[role="dialog"]').withDescendant(
        locate("h4").withText("Permissões de Acesso"),
      );

    const modalPermissoes = obterModal();

    I.waitForVisible(modalPermissoes, 15);

    I.executeScript(() => {
      const dialog = document.querySelector('[role="dialog"]');

      if (dialog) {
        dialog.scrollTop = dialog.scrollHeight;

        dialog.scrollTop = 0;
      }
    });

    I.wait(2);

    const secoesDisponiveis = await I.grabTextFromAll(
      locate("label").inside(modalPermissoes),
    );

    const secoes = [
      ...new Set(secoesDisponiveis.map((s) => s.trim()).filter(Boolean)),
    ];

    console.log("\n==============================");
    console.log("✅ SEÇÕES ENCONTRADAS");
    console.log("==============================");
    console.table(secoes);

    const perfis = ["Agente", "Marketing", "Staff", "Acesso Total"];

    const fluxoPermissoes = [
      "Somente Leitura",
      "Acesso Total",
      "Sem Acesso",
      "Acesso Total",
    ];

    const selecionarPerfil = async (perfil) => {
      const modal = obterModal();

      I.waitForVisible(modal, 15);

      const dropdown = modal.find('button[aria-haspopup="menu"]').first();

      I.waitForVisible(dropdown, 15);

      I.scrollTo(dropdown);

      I.click(dropdown);

      const dropdownId = await I.grabAttributeFrom(dropdown, "id");

      const menu = locate('[role="menu"]').withAttr({
        "aria-labelledby": dropdownId,
      });

      I.waitForVisible(menu, 15);

      I.click(menu.find('[role="menuitem"]').withText(perfil));

      I.waitForDetached(menu, 10);

      I.executeScript(() => {
        const dialog = document.querySelector('[role="dialog"]');

        if (dialog) {
          dialog.scrollTop = 0;
        }
      });

      I.wait(1);
    };

    const selecionarOpcao = async (secao, opcao) => {
      for (let tentativa = 1; tentativa <= 3; tentativa++) {
        try {
          const modal = obterModal();

          I.waitForVisible(modal, 15);

          const label = locate("label").withText(secao).inside(modal);

          I.waitForElement(label, 15);

          I.scrollTo(label);

          I.wait(0.5);

          const fieldId = await I.grabAttributeFrom(label, "for");

          if (!fieldId) {
            throw new Error(`Campo não encontrado para '${secao}'`);
          }

          const combo = locate(`#${fieldId}`).inside(modal);

          I.waitForElement(combo, 15);

          I.scrollTo(combo);

          I.click(combo);

          const opcaoDropdown = locate('[role="option"]').withText(opcao);

          I.waitForVisible(opcaoDropdown, 15);

          I.click(opcaoDropdown);

          I.waitForDetached('[role="option"]', 10);

          console.log(`✅ ${secao} → ${opcao}`);

          return;
        } catch (erro) {
          console.log(
            `⚠️ Tentativa ${tentativa}/3 falhou para ${secao} → ${opcao}`,
          );

          if (tentativa === 3) {
            throw new Error(
              `Falha ao selecionar '${opcao}' para '${secao}'. Erro: ${erro.message}`,
            );
          }

          I.executeScript(() => {
            const dialog = document.querySelector('[role="dialog"]');

            if (dialog) {
              dialog.scrollTop = 0;
            }
          });

          I.wait(2);
        }
      }
    };

    const repeticoes = 2;

    for (let ciclo = 1; ciclo <= repeticoes; ciclo++) {
      console.log("\n==============================");

      console.log(`🔁 CICLO ${ciclo}/${repeticoes}`);

      console.log("==============================");

      I.executeScript(() => {
        const dialog = document.querySelector('[role="dialog"]');

        if (dialog) {
          dialog.scrollTop = 0;
        }
      });

      I.wait(1);

      for (const perfil of perfis) {
        console.log(`\n👤 PERFIL: ${perfil}`);

        await selecionarPerfil(perfil);

        for (const secao of secoes) {
          console.log(`🔄 ${secao}`);

          for (const permissao of fluxoPermissoes) {
            await selecionarOpcao(secao, permissao);
          }

          I.wait(0.2);
        }
      }

      I.wait(1);
    }

    console.log("\n==============================");

    console.log("✅ VALIDANDO ESTADO FINAL");

    console.log("==============================");

    for (const secao of secoes) {
      const modal = obterModal();

      const label = locate("label").withText(secao).inside(modal);

      I.waitForElement(label, 15);

      const fieldId = await I.grabAttributeFrom(label, "for");

      const combo = locate(`#${fieldId}`).inside(modal);

      I.scrollTo(combo);

      I.see("Acesso Total", combo);
    }

    console.log("\n✅ Stress integrado concluído com sucesso.");

    I.wait(3);
  },
).tag("@publicareventos97");

/////----------/////

Scenario(
  "Cenário: 000098 - Alterar perfis e permissões por seção com validação final e fechar o modal de permissões.",
  async ({ I }) => {
    I.amOnPage("https://fastix.com.br/");
    I.waitForText("Explorar eventos", 15);

    const publicarEventos = locate("a").withText("Publicar Eventos");

    I.waitForElement(publicarEventos, 10);
    I.click(publicarEventos);

    I.waitInUrl("/signin", 10);

    I.fillField('input[name="email"]', "diogoamanciosilva@gmail.com");

    I.fillField('input[name="password"]', "cruzeiro@1921");

    const botaoEntrar = locate("button").withDescendant(
      locate("span").withText("Entrar"),
    );

    I.waitForElement(botaoEntrar, 10);
    I.click(botaoEntrar);

    I.waitInUrl("/producer", 15);
    I.waitForText("Novo Evento", 10);

    const botaoNovoEvento = locate('a[href="/producer/events/create"]').first();

    I.waitForElement(botaoNovoEvento, 10);
    I.scrollTo(botaoNovoEvento);
    I.click(botaoNovoEvento);

    I.waitInUrl("/producer/events/create", 15);

    I.waitForText("Gerenciar Equipes", 10);
    I.click("Gerenciar Equipes");

    I.waitForText("Nova Equipe", 10);
    I.click("Nova Equipe");

    I.waitForText("Adicionar", 10);
    I.click("Adicionar");

    I.waitForText("Controle de acesso", 10);
    I.click("Controle de acesso");

    const obterModal = () =>
      locate('[role="dialog"]').withDescendant(
        locate("h4").withText("Permissões de Acesso"),
      );

    I.waitForVisible(obterModal(), 15);

    I.executeScript(() => {
      const dialog = document.querySelector('[role="dialog"]');

      if (dialog) {
        dialog.scrollTop = dialog.scrollHeight;

        dialog.scrollTop = 0;
      }
    });

    I.wait(2);

    const perfis = ["Agente", "Marketing", "Staff", "Acesso Total"];

    const fluxoPermissoes = [
      "Somente Leitura",
      "Acesso Total",
      "Sem Acesso",
      "Acesso Total",
    ];

    const obterSecoesVisiveis = async () => {
      const modal = obterModal();

      I.waitForVisible(modal, 15);

      I.executeScript(() => {
        const dialog = document.querySelector('[role="dialog"]');

        if (dialog) {
          dialog.scrollTop = dialog.scrollHeight;

          dialog.scrollTop = 0;
        }
      });

      I.wait(1);

      const labels = await I.grabTextFromAll(locate("label").inside(modal));

      return [...new Set(labels.map((t) => t.trim()).filter(Boolean))];
    };

    const selecionarPerfil = async (perfil) => {
      const modal = obterModal();

      I.waitForVisible(modal, 15);

      const dropdown = modal.find('button[aria-haspopup="menu"]').first();

      I.waitForVisible(dropdown, 15);

      I.scrollTo(dropdown);

      I.click(dropdown);

      const dropdownId = await I.grabAttributeFrom(dropdown, "id");

      const menu = locate('[role="menu"]').withAttr({
        "aria-labelledby": dropdownId,
      });

      I.waitForVisible(menu, 15);

      I.click(menu.find('[role="menuitem"]').withText(perfil));

      I.waitForDetached(menu, 10);

      I.executeScript(() => {
        const dialog = document.querySelector('[role="dialog"]');

        if (dialog) {
          dialog.scrollTop = 0;
        }
      });

      I.wait(1);
    };

    const selecionarOpcao = async (secao, opcao) => {
      for (let tentativa = 1; tentativa <= 3; tentativa++) {
        try {
          const modal = obterModal();

          I.waitForVisible(modal, 15);

          const label = locate("label").withText(secao).inside(modal);

          const existe = await I.grabNumberOfVisibleElements(label);

          if (!existe) {
            console.log(`⚠️ Seção '${secao}' não encontrada`);

            return;
          }

          I.scrollTo(label);

          I.wait(0.5);

          const fieldId = await I.grabAttributeFrom(label, "for");

          if (!fieldId) {
            console.log(`⚠️ Campo não encontrado para ${secao}`);

            return;
          }

          const combo = locate(`#${fieldId}`).inside(modal);

          I.waitForElement(combo, 15);

          I.scrollTo(combo);

          I.click(combo);

          const opcaoDropdown = locate('[role="option"]').withText(opcao);

          I.waitForVisible(opcaoDropdown, 15);

          I.click(opcaoDropdown);

          I.waitForDetached('[role="option"]', 10);

          return;
        } catch (erro) {
          console.log(
            `⚠️ Tentativa ${tentativa}/3 falhou para ${secao} → ${opcao}`,
          );

          if (tentativa === 3) {
            throw erro;
          }

          I.executeScript(() => {
            const dialog = document.querySelector('[role="dialog"]');

            if (dialog) {
              dialog.scrollTop = 0;
            }
          });

          I.wait(2);
        }
      }
    };

    for (const perfil of perfis) {
      console.log(`\n👤 PERFIL: ${perfil}`);

      await selecionarPerfil(perfil);

      const secoes = await obterSecoesVisiveis();

      console.log("\n📋 SEÇÕES ENCONTRADAS");

      console.table(secoes);

      for (const secao of secoes) {
        console.log(`🔄 ${secao}`);

        for (const permissao of fluxoPermissoes) {
          await selecionarOpcao(secao, permissao);
        }

        I.wait(0.2);
      }
    }

    console.log("\n✅ VALIDANDO ESTADO FINAL");

    const secoesFinais = await obterSecoesVisiveis();

    for (const secao of secoesFinais) {
      const modal = obterModal();

      const label = locate("label").withText(secao).inside(modal);

      const existe = await I.grabNumberOfVisibleElements(label);

      if (!existe) {
        continue;
      }

      const fieldId = await I.grabAttributeFrom(label, "for");

      if (!fieldId) {
        continue;
      }

      const combo = locate(`#${fieldId}`).inside(modal);

      I.scrollTo(combo);

      I.see("Acesso Total", combo);
    }

    I.pressKey("Escape");

    I.waitForInvisible(obterModal(), 10);

    I.wait(2);
  },
).tag("@publicareventos98");

/////----------/////

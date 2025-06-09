# 🛒 E‑commerce Front‑End

Este projeto é um e‑commerce moderno desenvolvido com **React + Vite + TypeScript**.  
A aplicação possui layout responsivo, gerenciamento global de estado, carrosséis de produtos e validações robustas de formulários.  
É ideal para praticar um fluxo completo de compra online com design atual e arquitetura escalável.

## 🚀 Tecnologias utilizadas

- **React**  
- **Vite**  
- **TypeScript**  
- **TailwindCSS**  
- **Zustand** (estado global)  
- **React Router DOM**  
- **React Hook Form** + **Zod** (validação)  
- **Radix UI** – coleção de componentes acessíveis  
- **Swiper** & **Embla Carousel**  
- **Lucide Icons**  
- **Sonner** (toasts)  
- **Axios**

## 📦 Instalação

```bash
# 1. Clone o repositório
git clone https://github.com/ChrystianStrummiello/e-commerce.git

# 2. Entre na pasta
cd e-commerce

# 3. Instale as dependências
npm install      # ou yarn

# 4. Inicie o servidor de desenvolvimento
npm run start    # ou yarn start
```

> ⚠️ Caso utilize PNPM ou outro gerenciador, adapte os comandos.

## 🔧 Scripts disponíveis

| Comando            | Descrição                                                          |
|--------------------|--------------------------------------------------------------------|
| `npm run start`    | Inicia o projeto em modo desenvolvimento (Vite)                    |
| `npm run build`    | Gera a build de produção na pasta `dist/`                          |
| `npm run preview`  | Servidor local para pré‑visualizar a build de produção             |
| `npm run lint`     | Executa o ESLint com as regras definidas                           |

## 🗂️ Estrutura (sugerida)

```
src/
├── assets/             # Imagens, ícones, fontes
├── components/         # Componentes reutilizáveis
├── pages/              # Páginas (Home, Produto, Checkout…)
├── store/              # Zustand stores (estado global)
├── services/           # Configuração e chamadas Axios
├── hooks/              # Hooks customizados
├── utils/              # Funções auxiliares
├── types/              # Definições TypeScript globais
├── App.tsx
└── main.tsx
```

> A estrutura pode variar; ajuste conforme a organização real do projeto.

## ✅ Funcionalidades implementadas

- [x] Layout responsivo com TailwindCSS  
- [x] Carrossel de banners e produtos  
- [x] Lista de produtos por categoria  
- [x] Carrinho de compras com Zustand  
- [x] Formulários de checkout com validação Zod  
- [x] Feedback ao usuário via toasts (Sonner)

## 🚧 Roadmap

- [ ] Integração com API de pagamento (ex.: Stripe)  
- [ ] Histórico de pedidos do usuário  
- [ ] Autenticação e perfil  
- [ ] Filtragem avançada por atributos (preço, tamanho, marca…)  
- [ ] Backend real para produtos e pedidos

## 🧠 Aprendizados

Este projeto foca em:

1. **Boas práticas** com React e TypeScript  
2. **Arquitetura escalável** em front‑end moderno  
3. Uso de **bibliotecas UI** acessíveis (Radix)  
4. **Experiência do usuário** com carrosséis e animações suaves  
5. **Validação robusta** de formulários

## 🤝 Contribuindo

1. Faça um fork do projeto  
2. Crie sua branch: `git checkout -b feature/nova-funcionalidade`  
3. Commit suas mudanças: `git commit -m 'feat: nova funcionalidade'`  
4. Faça push para a sua branch: `git push origin feature/nova-funcionalidade`  
5. Abra um Pull Request

## 📄 Licença

Distribuído sob a licença MIT. Consulte `LICENSE` para mais informações.

## 🎥 Demonstração

![Demonstração do app](./src/assets/demostracao.gif)

---

Feito com 💻 por [Chrystian Strummiello](https://github.com/ChrystianStrummiello)

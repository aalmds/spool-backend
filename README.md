# spool-backend

## Executando o Backend

### Linkando com o Banco de Dados: 

1. Crie uma pasta ``.env`` com as configurações necessárias para executar o projeto e conectar com o banco de dados na nuvem.
2. Faça as instalações necessárias do Kubernetes seguindo o passo-a-passo: https://kubernetes.io/docs/tasks/tools/ (só seguir a opção do SO que você está usando). 
3. Salvar o arquivo ``config`` do projeto na pasta .kube, geralmente fica na home ($HOME/.kube). Se não existe, você pode criar e colocar o arquivo ``config``. 
4. Depois, rode o comando ``kubectl port-forward ...`` do projeto para conectar a sua porta 5432 e seu banco de dados local com o remoto.

### Executando o Backend com Docker

1. Instalar o [Docker](https://docs.docker.com/engine/install/)
2. Executar o Backend com Docker

```bash
docker compose up --build
```

### Executando o Backend localmente com Node

1. Instalar o [Node.js](https://nodejs.org/en/download) na versão 22
2. Seguir os passos:

```bash
npm install
npx prisma generate
npm run dev
```

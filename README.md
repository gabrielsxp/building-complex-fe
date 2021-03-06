# building-complex-fe
<p align="center">
   <img src="https://github.com/gabrielsxp/building-complex-fe/blob/master/building.gif" alt="Demo of Building Complex"></img>
</p>

A API REST utilizada como base para esta aplicação se encontra em [Building Complex Node JS API REST](https://github.com/gabrielsxp/project-building-api)

## Requisitos
> Considere um grande e movimentado complexo de edifícios comerciais de escritórios. Por
motivos de segurança, é necessário realizar o controle de acesso de todas as pessoas que
frequentam o complexo habitual (funcionários) ou esporadicamente (visitantes, clientes etc.).
Políticas de acesso diferentes são aplicáveis a funcionários da administração do condomínio,
funcionários das empresas que possuem escritórios no local e visitantes em geral. Na entrada do
complexo, há um conjunto de pontos de acesso (como catracas eletrônicas), por meio dos quais
as pessoas se identificam (usando biometria, por exemplo) antes de serem autorizadas a entrar
nas instalações. Pontos de acesso também são instalados na entrada de cada prédio e na
entrada de cada andar de um prédio, uma vez que funcionários das empresas condôminas,
assim como os visitantes, só devem ter acesso a certas partes do complexo. Finalmente,
também por motivos de segurança em caso de emergências, o complexo possui uma
capacidade de lotação máxima total, por prédio e por andar. Desta forma, um visitante, mesmo
que possua as credenciais necessárias, só pode ser admitido no complexo, prédio ou andar se
as respectivas capacidades máximas não tiverem sido excedidas. Note que funcionários não
estão sujeitos a este controle de lotação, embora devam ser contados para fins de cálculo da
capacidade de ocupação disponível. Os parâmetros do sistema, em particular as políticas de
acesso aplicáveis aos três tipos de ocupantes do edifício e as capacidades máximas (dos
complexo, dos edifícios e de cada andar), devem ser definidos no início da operação do sistema
pelo(a) administrador(a) do condomínio, podendo ser reajustados por ele(a) a qualquer momento.

## Tecnologias utilizadas
- HTML5
- CSS3
- Javascript
- React JS

## Instalação
1. Tenha o node e o npm instalados. Caso queira executar localmente, tenha também o MongoDB instalado.
2. Clone o repositório via terminal.
3. Acesse a pasta de destino via cd project-building-api
4. Execute sudo npm install
5. Execute sudo npm start
6. Acesse a aplicação localmente em (http://127.0.0.1:3000/)

## Funcionalidades
- A imagem de cada prédio é alterada de acordo com a quantidade de andares presentes
- O prédio não permite a entrada de outros usuários quando a lotação é atingida
- Permite a criação de prédios aleatórios, com níveis de acesso e quantidade de andares diferentes
- Permite a destruição total de todos os prédios e expulsão de todas as pessoas presentes nos mesmos
- Nível de requisição de credenciais customizada para cada tipo de nível de acesso
- Possibilidade de sair de um andar e entrar em qualquer outro, desde que possua o nível de acesso adequado
- Possibilidade de sair de um prédio e entrar em outro, desde que o mesmo permita o acesso
- Permite a simulação de vários usuários simultâneos em um edifício
- No modo de administração, o usuário que possuir tais credenciais poderá alterar o nível de acesso de qualquer andar para qualquer nível de acesso
- Distribui a requisição para cada servidor presente na lista de servidores na pasta de constantes de forma circular.

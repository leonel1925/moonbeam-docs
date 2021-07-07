---
title: Collators
description: Instrucciones sobre cómo convertirse en un collator en Moonbeam Network una vez que esté ejecutando un nodo
---

# Ejecutar un Collator en Moonbeam

![Collator Moonbeam Banner](/images/fullnode/collator-banner.png)

## Introducción

Los Collators son miembros de la red que mantienen las parachain en las que participan. Ejecutan un nodo completo (tanto para su parachain particular como para la relay chain), y producen la prueba de transición de estado para los validadores de relay chain.

Con el lanzamiento de Moonbase Alpha v6, los usuarios pueden activar nodos completos y activar la `collate` función y participar en el ecosistema como collators.

Moonbeam utiliza el [Nimbus Parachain Consensus Framework](/learn/consensus/). Esto proporciona un filtro de dos pasos para asignar collators a una ranura de producción de bloques:

 - El filtro de staking de parachain selecciona los principales collators {{ networks.moonbase.staking.max_collators }} en términos de tokens apostados en la red. Este grupo filtrado se denomina candidatos seleccionados, y los candidatos seleccionados se rotan en cada ronda.
 - El filtro de subconjunto de tamaño fijo elige un subconjunto pseudoaleatorio de los candidatos previamente seleccionados para cada espacio de producción de bloques

Esta guía lo llevará a través de los siguientes pasos:

 - **[Requisitos técnicos](#technical-requirements)** — le muestra los criterios que debe cumplir desde una perspectiva técnica
 - **[Cuentas y requisitos de participación](#accounts-and-staking-requirements)** — pasa por el proceso de configuración de su cuenta y tokens de bonos para convertirse en un candidato de collator
 - **[Generar claves de sesión](#generate-session-keys)** — explica cómo generar claves de sesión, que se utilizan para mapear su ID de autor con su cuenta H160.
 - **[Asignar ID de autor a su cuenta](#map-author-id-to-your-account)** — describe los pasos para asignar su clave de sesión pública a su cuenta H160, donde se pagarán las recompensas en bloque

## Requerimientos técnicos

Desde una perspectiva técnica, las collators deben cumplir los siguientes requisitos:

 - Tener un nodo completo ejecutándose con las opciones de collation. Para hacerlo, siga el [tutorial completo de un nodo](/node-operators/networks/full-node/), considerando los fragmentos de código específicos para los collators
 - Habilite el servidor de telemetría para su nodo completo. Para hacerlo, siga el [tutorial de telemetría](/node-operators/networks/telemetry/)

## Cuentas y requisitos de participación

Al igual que los validadores Polkadot, debe crear una cuenta. Para Moonbeam, esta es una cuenta H160 o básicamente una cuenta estilo Ethereum de la que tiene las claves privadas. Además, necesita una participación nominada (tokens DEV) para recopilar. Actualmente, los espacios están limitados a {{ networks.moonbase.collators_slots }} pero pueden aumentar con el tiempo.  

Los Collators deben tener un mínimo de {{ networks.moonbase.staking.collator_min_stake }} DEV para ser considerados elegibles (convertirse en candidatos). Solo los mejores collators de {{ networks.moonbase.staking.max_collators }} por participación nominada estarán en el conjunto activo.  

### Cuenta en PolkadotJS

Un collator tiene una cuenta asociada con sus actividades de collation. Esta cuenta se asignó a una identificación de autor para identificarlo como un productor de bloque y enviar los pagos de las recompensas de bloque.

Actualmente, tiene dos formas de proceder con respecto a tener una cuenta en [PolkadotJS](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fwss.testnet.moonbeam.network#/accounts):

 - Importar una cuenta H160 existente (o crear una nueva) desde carteras o servicios externos como [MetaMask](/integrations/wallets/metamask/) y [MathWallet](/integrations/wallets/mathwallet/)
 - Cree una nueva cuenta H160 con [PolkadotJS](/integrations/wallets/polkadotjs/)

Una vez que tenga una cuenta H160 importada a PolkadotJS, debería verla en la pestaña "Cuentas". Asegúrese de tener su dirección pública a mano (`PUBLIC_KEY`), ya que es necesaria para configurar el [despliegue de su nodo completo](/node-operators/networks/full-node/) con las opciones de collation.

![Account in PolkadotJS](/images/fullnode/collator-polkadotjs1.png)

## Conviértase en candidato a Collator

### Obtenga el tamaño del Pool de candidatos

Primero, debe obtener el `candidatePool` tamaño (esto puede cambiar a través de la gobernanza), ya que deberá enviar este parámetro en una transacción posterior. Para hacerlo, deberá ejecutar el siguiente fragmento de código JavaScript desde [PolkadotJS](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fwss.testnet.moonbeam.network#/js):

```js
// Simple script to get candidate pool size
const candidatePool = await api.query.parachainStaking.candidatePool();
console.log(`Candidate pool size is: ${candidatePool.length}`);
```

 1. Dirígete a la pestaña "Desarrollador"
 2. Haga clic en "JavaScript"
 3. Copie el código del fragmento anterior y péguelo dentro del cuadro del editor de código
 4. (Opcional) Haga clic en el icono de guardar y establezca un nombre para el fragmento de código, por ejemplo, "Get candidatePool size". Esto guardará el fragmento de código localmente
 5. Haga clic en el botón Ejecutar. Esto ejecutará el código desde el cuadro del editor.
 6. Copie el resultado, ya que lo necesitará cuando se una al pool de candidatos

![Get Number of Candidates](/images/fullnode/collator-polkadotjs2.png)

### Únase al pool de candidatos

Una vez que su nodo se está ejecutando y sincronizado con la red, se convierte en un candidato de collator (y se une al pool de candidatos) siguiendo los pasos a continuación en PolkadotJS : [PolkadotJS](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fwss.testnet.moonbeam.network#/extrinsics):

 1. Vaya a la pestaña "Desarrolladores" y haga clic en "Extrinsics"
 2. Seleccione la cuenta que desea asociar con sus actividades de collation
 3. Confirme que su cuenta de collator esté financiada con al menos {{ networks.moonbase.staking.collator_min_stake }} tokens DEV más algunos adicionales por tarifas de transacción
 4. Seleccione la `parachainStaking` pallet en el menú "enviar los siguientes elementos extrinsics"
 5. Abra el menú desplegable, que enumera todos los elementos extrinsics posibles relacionados con el staking, y seleccione la `joinCandidates()` función
 6. Establezca el vínculo en al menos {{ networks.moonbase.staking.collator_min_stake }} tokens DEV, que es la cantidad mínima para ser considerado candidato a  collator en Moonbase Alpha. Para este cheque, solo cuenta la fianza de alistador. Las nominaciones adicionales no cuentan
 7. Establezca el recuento de candidatos como el tamaño del pool de candidatos. Para saber cómo recuperar este valor, consulte [esta sección](#get-the-size-of-the-candidate-pool)
 8. Envíe la transacción. Siga el asistente y firme la transacción con la contraseña que estableció para la cuenta.

![Join Collators pool PolkadotJS](/images/fullnode/collator-polkadotjs3.png)

!!! note
    Los nombres de las funciones y el requisito de fianza mínima están sujetos a cambios en versiones futuras.

Como se mencionó anteriormente, solo los mejores collators de {{ networks.moonbase.staking.max_collators }} por participación nominada estarán en el conjunto activo. 

### Stop Collating

Similar a la `chill()` función de Polkadot , para salir del pool de candidatos del collator's, siga los mismos pasos que antes, pero seleccione la `leaveCandidates()` función en el paso 5.


### Tiempos

TLa siguiente tabla presenta algunos de los tiempos con respecto a las diferentes acciones relacionadas con las actividades de collation:

|                Acción               |   |   Rondas  |   |   Horas  |
|:-----------------------------------:|:-:|:---------:|:-:|:--------:|
|  Unirse/dejar candidatos de collator    |   |     2     |   |    4     |
|      Agregar/eliminar nominaciones      |   |     1     |   |    2     |
|Pagos de recompensas (después de la ronda actual)|   |     2     |   |    4     |


!!! note 
     Los valores presentados en la tabla anterior están sujetos a cambios en versiones futuras.

## Claves de sesión

Con el lanzamiento de [Moonbase Alpha v8](/networks/testnet/), los collators firmarán bloques usando una identificación de autor, que es básicamente una [clave de sesión](https://wiki.polkadot.network/docs/learn-keys#session-keys). Para igualar el estándar de sustrato, las claves de sesión de Moonbeam collator son [SR25519](https://wiki.polkadot.network/docs/learn-keys#what-is-sr25519-and-where-did-it-come-from). Esta guía le mostrará cómo puede crear / rotar sus claves de sesión asociadas a su nodo collator.

Primero, asegúrese de que está [ejecutando un nodo de collator](/node-operators/networks/full-node/) y que ha expuesto los puertos RPC. Una vez que tenga su nodo collator en ejecución, su terminal debería imprimir registros similares:

![Collator Terminal Logs](/images/fullnode/collator-terminal1.png)

A continuación, las claves de sesión se pueden rotar enviando una llamada RPC al extremo HTTP con el `author_rotateKeys` método. Como referencia, si el extremo HTTP de su collator's está en el puerto `9933`, la llamada JSON-RPC podría verse así:

```
curl http://127.0.0.1:9933 -H \
"Content-Type:application/json;charset=utf-8" -d \
  '{
    "jsonrpc":"2.0",
    "id":1,
    "method":"author_rotateKeys",
    "params": []
  }'
```

El nodo collator debe responder con la clave pública correspondiente del nuevo ID de autor (clave de sesión).

![Collator Terminal Logs RPC Rotate Keys](/images/fullnode/collator-terminal2.png)

Asegúrese de anotar esta clave pública del ID del autor. A continuación, esto se asignará a una dirección de estilo H160 Ethereum a la que se pagan las recompensas en bloque.

## Asignar ID de autor a su cuenta

Una vez que haya generado su ID de autor (claves de sesión), el siguiente paso es asignarlo a su cuenta H160 (una dirección de estilo Ethereum). Asegúrese de tener las claves privadas de esta cuenta, ya que aquí es donde se pagan las recompensas del bloque.

Hay un enlace de tokens DEV de {{ networks.moonbase.staking.collator_map_bond }} que se envía al mapear su ID de autorización con su cuenta. Este vínculo es por identificación de autor registrada.

El `authorMapping` módulo tiene programadas las siguientes extrinsics:

 - **addAssociation**(*dirección* authorID) — asigna su ID de autor a la cuenta H160 desde la que se envía la transacción, lo que garantiza que sea el verdadero propietario de sus claves privadas. Requiere un enlace de tokens DEV de {{ networks.moonbase.staking.collator_map_bond }} 
 - **clearAssociation**(*dirección* authorID) — borra la asociación de una ID de autor a la cuenta H160 desde la que se envía la transacción, que debe ser el propietario de esa ID de autor. También reembolsa el bono de tokens DEV de {{ networks.moonbase.staking.collator_map_bond }}
 - **updateAssociation**(*dirección* oldAuthorID, *dirección* newAuthorID) —  actualiza la asignación de una ID de autor antigua a una nueva. Útil después de una rotación o migración de claves. Ejecuta las extrinsics de asociación `add` y de forma `clear` atómica, lo que permite la rotación de teclas sin necesidad de un segundo enlace

El módulo también agrega las siguientes llamadas RPC (estado de cadena):

- **Mapping**(*dirección* optionalAuthorID) — muestra todos los Mappings almacenados en cadena, o solo los relacionados con la entrada, si se proporcionan
- 
### Mapping Extrinsic

TPara asignar su ID de autor a su cuenta, debe estar dentro del [pool de candidatos ](#become-a-collator-candidate).Una vez que sea candidato a collator , debe enviar un mapeo extrinsic (transacción). Tenga en cuenta que esto vinculará {{ networks.moonbase.staking.collator_map_bond }}  tokens DEV, y esto es por ID de autor registrado. Para hacerlo, siga los siguientes pasos:

 1. Dirígete a la pestaña "Desarrollador"
 2. Seleccione la opción "Extrinsics"
 3. Elija la cuenta a la que desea asignar su ID de autor para asociarlo, desde la cual firmará esta transacción
 4. Seleccione el `authorMapping` extrinsic
 5. Establezca el método en `addAssociation()`
 6. Ingrese la identificación del autor. En este caso, se obtuvo a través de la llamada RPC `author_rotateKeys` en el apartado anterior.
 7. Haga clic en "Enviar transacción"

![Author ID Mapping to Account Extrinsic](/images/fullnode/collator-polkadotjs4.png)

Si la transacción es exitosa, verá una notificación de confirmación en su pantalla. Por el contrario, asegúrese de unirse al [pool de candidatos](#become-a-collator-candidate).

![Author ID Mapping to Account Extrinsic Successful](/images/fullnode/collator-polkadotjs5.png)

### Comprobación de las asignaciones

También puede verificar las asignaciones actuales en cadena verificando el estado de la cadena. Para hacerlo, siga los siguientes pasos:

 1. Dirígete a la pestaña "Desarrollador"
 2. Seleccione la opción "Estado de la cadena"
 3. Elija `authorMapping` como el estado para consultar
 4. Seleccione el `mappingWithDeposit` método
 5. Proporcione una identificación de autor para realizar la consulta. Opcionalmente, puede deshabilitar el control deslizante para recuperar todas las asignaciones 
 6. Haga clic en el botón "+" para enviar la llamada RPC

![Author ID Mapping Chain State](/images/fullnode/collator-polkadotjs6.png)

Debería poder ver la cuenta H160 asociada con la ID de autor proporcionada. Si no se incluyó un ID de autor, esto devolvería todas las asignaciones almacenadas en la cadena.

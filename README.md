# mimic-ui

Web UI for mimic mock server that provides a mocks management toolset.
You can easily create, edit and delete your mocks from the simple UI.

![ui example](https://user-images.githubusercontent.com/9018434/61359727-9e368280-a885-11e9-948f-9912e4ddf983.png)

## Features

- Safe your time with an editor which has built-in JSON schema validator
- Navigate through your mocks
- Create, update and delete your mocks

## How to use it

Mimic UI is available as a docker image: `zhikiri/mimic-ui`.
You can add it as a service into your compose file.

Example of the `docker-compose.yml` file:

```yaml
services:
  mimic-api:
    image: zhikiri/mimic:[MIMIC_VERSION]
    container_name: mimic
    volumes:
      - ./mocks:/mimic/mocks
    environment:
      - API_PORT=8080
      - MOCKS_PATH=/mimic/mocks
    ports:
      - 8080:8080

  mimic-ui:
    image: zhikiri/mimic-ui:[UI_VERSION]
    container_name: mimic-static-ui
    ports:
      - 8888:80
    depends_on:
      - mimic-api
```

**Notice:** `zhikiri/mimic` container should have `mimic` as a name. It very important for nginx configuration.

Of course you can use different container name, but for this you will need to inject a nginx configuration into the container (nginx congiration path `/etc/nginx/`).


# Проект мониторинга веб-приложения с помощью связки Prometheus + Grafana
__Важно:__
Проект я доделал не до конца, остановился на этапе автоматизации развертывания.
---
# Компоненты подсистемы:
   - __Веб-приложение Node.js:__ Это мое основное приложение, которое я мониторил.
   - __Prometheus:__ Открытая система мониторинга и алертинга, которая собирала и хранила метрики моего приложения.
   - __Grafana:__ Инструмент для визуализации и анализа данных, который позволял создавать красивые и информативные дашборды на основе метрик, собранных Prometheus.
   - __Exporter:__ Компонент, который собирал метрики из моего приложения и предоставлял их в формате, понятном Prometheus.
# Что мониторим?
 Метрики. Я добавил 5 метрик для экспортирования и визуализации данных, но оказалось нужной только одна (___myapp_requests_total___):
  -  ___myapp_requests_total___ - количество запросов
  - ___myapp_response_time_seconds___ - время ответа
  - ___myapp_errors_total___ - количество ошибок
  - ___myapp_memory_usage_bytes___ - использование памяти
  - ___myapp_cpu_usage_percent___ - использование CPU
 # Этапы:
  - __Веб-приложение__: Создал проект, перед написанием когда установил нужные пакеты (__express__ и __prom-client__)
```
npm install express

npm install prom-client
```                                                                            
  __express__ является популярным фреймворком для Node.js

  __prom-client__ -  это пакет, который позволяет интегрировать метрики Prometheus в ваше веб-приложение на Node.js.  
  
__Запуск__

Перейти в директорию __app__

Выполнить

```
node index.js
```

Перейти по http://localhost:3010

Если перейти по http://localhost:3010/metrics, то можно увидеть список всех метрик


  - __Prometheus__: Перешел по данной ссылке https://prometheus.io/download/ и скачал самую свежую версию. Распаковал zip-файл в удобное мне место. Для установки скачал утилиту https://nssm.cc/. С её помощью установил Prometheus. Затем отредактировал yml-файл:

![image](https://github.com/BlambaFlame/node.js_monitoring/assets/90152889/4b9b9328-52d0-40f6-af4d-54664fda2e6e)
__Запуск__

Запускаем командную строку, переходим в директорию, в которой расположен сам Prometheus, а затем пишем:

```
prometheus.exe
```
Переходим по адресу http://localhost:9090

![image](https://github.com/BlambaFlame/node.js_monitoring/assets/90152889/d3948703-5035-4046-aee0-f1858c12cf7e)
Если нажать __Status__, а потом __Targets__, то можно увидеть откуда Prometheus берёт данные

![image](https://github.com/BlambaFlame/node.js_monitoring/assets/90152889/87f94c03-5f97-4fd5-836f-0cf01c96343d)
  - __Grafana__: Вклчюил VPN, так как Grafana ограничила возможность скачивания своего продукта для граждан России, перешел по ссылке https://grafana.com/grafana/download?platform=windows. Скачал и установил файл. 

__Запуск__ 

Переходим по адресу http://localhost:3000, __login__: admin, __password__: makuc

![image](https://github.com/BlambaFlame/node.js_monitoring/assets/90152889/16d3977b-ab07-4fb7-81ea-8a0f029b5af2)
__Настройка__

В разделе __Administration__ переходим в __Data sources__, жмем кнопку __Add data source__ и выбираем Prometheus. В окне __URL__ пишем адрес нашего Prometheus (http://localhost:9090) и жмем кнопку __Save and test__.

![image](https://github.com/BlambaFlame/node.js_monitoring/assets/90152889/89c5f86a-3243-4470-bdaa-9844216b8b70)

__Dashboards__

![image](https://github.com/BlambaFlame/node.js_monitoring/assets/90152889/6f27c3be-8b92-4fe2-9876-be0044c4223e)

![image](https://github.com/BlambaFlame/node.js_monitoring/assets/90152889/db2b595e-76f9-4951-bafd-d4dde29d3507)

![image](https://github.com/BlambaFlame/node.js_monitoring/assets/90152889/2fc20f36-c1bc-4695-9d68-fc9931f487bd)

![image](https://github.com/BlambaFlame/node.js_monitoring/assets/90152889/7aa391e7-4780-4a81-a221-67e33f1ebda5)

![image](https://github.com/BlambaFlame/node.js_monitoring/assets/90152889/4e5eff2c-6350-496d-a10d-9642ccc50a5b)

![image](https://github.com/BlambaFlame/node.js_monitoring/assets/90152889/b4e3d399-cb0b-4b40-9600-7243f0c840c7)















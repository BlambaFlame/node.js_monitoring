const express = require('express');
const prometheus = require('prom-client');

// Создаем экземпляр приложения Express
const app = express();

// Создаем реестр метрик Prometheus
const registry = new prometheus.Registry();

// Создаем счетчик метрик для количества запросов
const requestCounter = new prometheus.Counter({
    name: 'myapp_requests_total',
    help: 'Total number of requests',
    registers: [registry],
});

// Создаем гистограмму метрик для времени ответа
const responseTimeHistogram = new prometheus.Histogram({
    name: 'myapp_response_time_seconds',
    help: 'Response time in seconds',
    registers: [registry],
    buckets: [0.1, 0.5, 1, 2, 5], // Задаем интервалы для гистограммы
});

// Создаем счетчик метрик для количества ошибок
const errorCounter = new prometheus.Counter({
    name: 'myapp_errors_total',
    help: 'Total number of errors',
    registers: [registry],
});

// Создаем гистограмму метрик для использования памяти
const memoryUsageHistogram = new prometheus.Histogram({
    name: 'myapp_memory_usage_bytes',
    help: 'Memory usage in bytes',
    registers: [registry],
    buckets: [1000000, 5000000, 10000000, 50000000], // Задаем интервалы для гистограммы
});

// Создаем гистограмму метрик для использования CPU
const cpuUsageHistogram = new prometheus.Histogram({
    name: 'myapp_cpu_usage_percent',
    help: 'CPU usage in percent',
    registers: [registry],
    buckets: [10, 30, 50, 70, 90], // Задаем интервалы для гистограммы
});

// Регистрируем метрики в реестре
registry.registerMetric(requestCounter);
registry.registerMetric(responseTimeHistogram);
registry.registerMetric(errorCounter);
registry.registerMetric(memoryUsageHistogram);
registry.registerMetric(cpuUsageHistogram);

// Маршрут для обработки запросов
app.get('/', (req, res) => {
    // Увеличиваем счетчик метрик при каждом запросе
    requestCounter.inc();

    // Имитируем задержку для тестирования гистограммы
    const delay = Math.random() * 5;
    setTimeout(() => {
        // Отправляем ответ клиенту
        res.send('Hello, Metrics!');
    }, delay * 1000);
});

// Маршрут для обработки ошибок
app.get('/error', (req, res) => {
    // Увеличиваем счетчик метрик ошибок
    errorCounter.inc();

    // Генерируем ошибку
    throw new Error('Something went wrong');
});

// Маршрут для экспорта метрик в формате Prometheus
app.get('/metrics', (req, res) => {
    // Получаем текст с метриками в формате Prometheus
    registry.metrics().then((metrics) => {
        // Отправляем метрики клиенту
        res.set('Content-Type', prometheus.register.contentType);
        res.send(metrics);
    });
});

// Запускаем сервер на порту 3010
app.listen(3010, () => {
    console.log('Server started on port 3010');
});
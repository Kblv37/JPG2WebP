# JPG → WEBP Converter

Минималистичный сервис для конвертации JPG в WEBP  
Frontend + Flask backend.

## 🚀 Возможности

- Загрузка JPG
- Выбор качества (100–20)
- Конвертация в WEBP
- Прямое скачивание результата

## 🛠 Backend

**Flask + Pillow**

### `GET /`
Проверка работы сервера.

### `POST /analyze`
Возвращает размеры файла для разных качеств.

### `POST /convert`
Конвертирует JPG в WEBP.

Параметры:
- `file` — изображение
- `quality` — качество (по умолчанию 80)

## ▶ Запуск

```bash
pip install flask flask-cors pillow
python app.py
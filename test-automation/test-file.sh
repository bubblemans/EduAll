curl -X POST -F file=@docker-compose.yml http://127.0.0.1:5000/file/docker-compose.yml
curl -X GET 'http://127.0.0.1:5000/file/docker-compose.yml?token=cfcd208495d565ef66e7dff9f98764da' --output test.yml
curl -X GET http://localhost:5000/file?token=cfcd208495d565ef66e7dff9f98764da

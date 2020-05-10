# Backend
python3 -m pip install django django_rest_framwework  
cd backend 
python manage.py makemigrations  
python manage.py migarate  
python manage.py runserver  

# Frontend
cd frontend  
npm install  
npm start  

# Docker

## Quick start

* Install docker and docker-compose
* Start application

```bash
cp .env.dist .env
docker-compose up -d
```

* Open http://localhost

## Proxy config

* http://localhost/api -> django
* http://localhost/static -> django
* http://localhost/api/search -> solr
* Everything else -> `frontend/public/`
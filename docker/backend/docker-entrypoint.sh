#!/bin/bash

pip install --progress-bar off --prefix /django/.dependencies -r /django/requirements.txt
/django/manage.py migrate --no-input
/django/manage.py collectstatic --no-input

/django/.dependencies/bin/gunicorn ${GUNICORN_WSGI}\
    --pythonpath /django\
    --workers ${GUNICORN_WORKERS:-2}\
    --bind :8000

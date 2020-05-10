FROM python:3.7.3-stretch

# Init
ARG USER_ID
ARG GROUP_ID
RUN mkdir -p /django &&\
    groupadd --gid ${GROUP_ID:-1000} django &&\
    useradd --uid ${USER_ID:-1000} --gid ${GROUP_ID:-1000}\
            --create-home --home-dir /home/django django &&\
    echo "/django/.dependencies/lib/python3.7/site-packages" > /usr/local/lib/python3.7/site-packages/django-vendor.pth &&\
    PATH=$PATH:~/django/.dependencies/bin &&\
    pip install --upgrade pip
WORKDIR /django

# Install common packages
RUN apt-get update && apt-get install -y \
    nano vim less htop

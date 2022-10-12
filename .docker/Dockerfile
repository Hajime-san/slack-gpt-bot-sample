FROM python:3.7.14
USER root

RUN apt-get update
RUN apt-get -y install locales && \
    localedef -f UTF-8 -i ja_JP ja_JP.UTF-8
ENV LANG ja_JP.UTF-8
ENV LANGUAGE ja_JP:ja
ENV LC_ALL ja_JP.UTF-8
ENV TZ JST-9
ENV TERM xterm
ENV PYTHONUNBUFFERED True
ENV PORT 8080

RUN apt-get install -y vim less
RUN pip install --upgrade pip==21.1.3
RUN pip install --upgrade setuptools

WORKDIR /opt
# install gpt2-japanese
RUN git clone https://github.com/tanreinama/gpt2-japanese && \
    cd gpt2-japanese && \
    pip install -r requirements.txt

WORKDIR /

# copy repository and model
COPY /opt/gpt2-japanese ./opt/gpt2-japanese

# install web app
COPY /opt/web ./opt/web
RUN pip install -r opt/web/requirements.txt

# start web server
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 --preload opt.web.index:app

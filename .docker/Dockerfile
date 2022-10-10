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

RUN apt-get install -y vim less
RUN pip install --upgrade pip==21.1.3
RUN pip install --upgrade setuptools

# install gpt2-japanese
RUN cd opt && \
    git clone https://github.com/tanreinama/gpt2-japanese && \
    cd gpt2-japanese && \
    pip install -r requirements.txt

# install web app
COPY /opt/web/requirements.txt ./opt/web/requirements.txt
RUN pip install -r opt/web/requirements.txt

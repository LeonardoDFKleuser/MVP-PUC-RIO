FROM python:3.11.5

WORKDIR /usr/src/app/back

COPY Sprint-1/meu_app_api/requirements.txt ./
RUN python3 -m venv env
RUN env/Scripts/activate
RUN (env)$ pip install -r requirements.txt

COPY Sprint-1/meu_app_api/ .

CMD [ "flask", "run --host 0.0.0.0 --port 5000"]
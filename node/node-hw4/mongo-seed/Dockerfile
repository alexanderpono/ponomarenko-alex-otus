FROM mongo

COPY user.json /user.json
CMD mongoimport --host mongodb --db courses --collection user --type json --file /user.json --jsonArray


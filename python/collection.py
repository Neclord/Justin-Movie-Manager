#!/usr/bin/python
import MySQLdb
import flask
from flask import jsonify

hostname = 'moviemanager.czhjpv0dbrky.us-east-2.rds.amazonaws.com::3306'
username = 'jteats'
password = 'Suikoden1'
database = 'dev'

# Simple routine to run a query on a database and print the results:
def doQuery( conn ) :
    cur = conn.cursor()

    cur.execute( "SELECT * FROM dev.movies" )

    data = cur.fetchone()
   # response = HttpResponse(json.dumps(data), content_type = "application/json")      
	return jsonify(data)

    cur.close()

cnx = mysql.connector.connect(user=username, password=password,
                              host=hostname,
                              database=database)

doQuery(cnx)
cnx.close()
#! /bin/bash

COUNT=5

LOG_FILE=$1

if ! [ -e $LOG_FILE ]; then
    echo "File \"${LOG_FILE}\" doesn't exist!"
    exit 1
fi

# field 1 is the IP address
echo "Top ${COUNT} IP addresses with the most requests:"
awk '{print $1}' "${LOG_FILE}" | sort | uniq -c | sort -nr | awk '{print "    " $2 " - " $1 " requests"}' | head -n ${COUNT}
echo

# field 7 is the request path
echo "Top ${COUNT} most requested paths:"
awk '{print $7}' "${LOG_FILE}" | sort | uniq -c | sort -nr | awk '{print "    " $2 " - " $1 " requests"}' | head -n ${COUNT}
echo

# field 9 is the status code
echo "Top ${COUNT} response status codes:"
awk '{print $9}' "${LOG_FILE}" | sort | uniq -c | sort -nr | awk '{print "    " $2 " - " $1 " requests"}' | head -n ${COUNT}
echo

echo "Top ${COUNT} user agents:"

# Funky formating in the first 'awk' for the second 'awk' to make it easier to read
awk -F '"' '{print "\""$6"\""}' "${LOG_FILE}" | sort | uniq -c | sort -nr | awk -F '"' '{print $1 "requests" " - " $2 }' | head -n ${COUNT}